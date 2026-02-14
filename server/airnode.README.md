# Airnode Control Plane

The Airnode Control Plane is a master server that manages a fleet of Airnode deployment nodes. It handles deployment orchestration, node registration, scheduling, and artifact management.

## Architecture

The system consists of:
- **Control Plane**: Master server that orchestrates deployments
- **Data Plane**: Multiple nodes (airnode1, airnode2, airnode3...) that run the actual deployments
- Each node runs:
  - `airnode-agent`: Pulls tasks, builds in Docker, uploads artifacts to R2, runs containers
  - `Traefik`: Routes hostnames to containers by Docker labels

## Hostname Scheme

Apps are assigned hostnames in the format:
```
<username>-<appSlug>.airnodeX.reglook.com
```
Where `airnodeX` is the node chosen at first placement. Placement is sticky by default.

## Setup

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Cloudflare R2 account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
# Port for Airnode Control Plane
AIRNODE_PORT=9100

# Database
DATABASE_URL=postgres://reglook:reglook@localhost:5432/airnode

# Token signing/hashing
TOKEN_PEPPER=change-me-long-random

# R2 Configuration
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
R2_BUCKET=airnode
R2_PUBLIC_BASE_URL=https://<your-public-r2-domain-or-empty>
R2_REGION=auto

# Domain Configuration
BASE_DOMAIN=reglook.com
NODE_SUBDOMAIN_SUFFIX=reglook.com
DEFAULT_NODE_NAME=airnode1
HOSTNAME_STYLE=node

# Scheduler Configuration
HEARTBEAT_STALE_SECONDS=15
WEBAUTHN_NOT_USED=true

# Admin Configuration
ADMIN_USERNAMES=admin,user1
```

4. Run database migrations:
```bash
npm run db:generate
npm run db:migrate
```

5. Start the server:
```bash
npm run dev
```

The server will start on port 9100 (or as configured in `AIRNODE_PORT`).

## Usage

### Device Login Flow (Development)

1. Start device flow:
```bash
curl -X POST http://178.156.223.139:9100/cli/auth/device/start
```

2. Visit the verification URL with the user code to approve the device

3. Poll for access token:
```bash
curl -X POST http://178.156.223.139:9100/cli/auth/device/poll \
  -H "Content-Type: application/json" \
  -d '{"deviceCode": "YOUR_DEVICE_CODE"}'
```

### Create a Project

```bash
curl -X POST http://178.156.223.139:9100/airnode/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "My App", "slug": "my-app"}'
```

### Create a Deployment

```bash
curl -X POST http://178.156.223.139:9100/airnode/deployments \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "PROJECT_ID",
    "environmentName": "production",
    "sourceHash": "SOURCE_HASH",
    "depsHash": "DEPS_HASH"
  }'
```

### Agent Endpoints

Agents authenticate using `X-Agent-Name` and `X-Agent-Key` headers:

- `POST /agent/tasks/poll` - Poll for tasks
- `POST /agent/tasks/:id/lease/extend` - Extend task lease
- `POST /agent/tasks/:id/status` - Update task status
- `POST /agent/deployments/:deploymentId/logs` - Send logs
- `POST /agent/deployments/:deploymentId/runtime/ready` - Mark runtime ready
- `POST /agent/deployments/:deploymentId/runtime/failed` - Report runtime failure

## Deployment Process

1. CLI creates deployment via `/airnode/deployments`
2. Control plane selects node using scheduler (sticky placement by default)
3. Returns deployment ID, assigned node, hostname, and presigned R2 URL
4. Agent polls for tasks via `/agent/tasks/poll`
5. Agent downloads source, builds, uploads artifact to R2
6. Agent sends logs via `/agent/deployments/:id/logs`
7. Agent marks runtime ready via `/agent/deployments/:id/runtime/ready`
8. Traefik routing is updated via Docker labels

## Sticky Placement

By default, deployments stick to the same node unless:
- Node becomes unhealthy/stale
- Node is disabled/draining
- Node has no available resources

## Blue/Green Deployments

Deployments use Blue/Green strategy:
- Each new deployment runs as a new container (new ID, new port internally)
- When healthy, Traefik routing swaps (by labels on the new container)
- Old container is stopped and removed (optionally keep last 2-3 for rollback)