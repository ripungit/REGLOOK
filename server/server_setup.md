# 🌐 Master Server setup guide

This guide walks you through setting up the **Airnode Master Server** from absolute zero on a fresh Ubuntu 22.04 or 24.04 server.

---

# 🧱 PHASE 0 — SSH into Master Server

```bash
ssh root@MASTER_SERVER_IP
```

---

# 🧱 PHASE 1 — System prep

```bash
apt update && apt upgrade -y
apt install -y curl git ca-certificates gnupg lsb-release build-essential
```

---

# 🐘 PHASE 2 — Install PostgreSQL

```bash
apt install -y postgresql postgresql-contrib
systemctl enable postgresql
systemctl start postgresql
```

### Create Database & User
```bash
sudo -u postgres psql
```

Inside the PSQL prompt:
```sql
CREATE DATABASE sandbox;
CREATE USER reglook WITH PASSWORD 'your_secure_db_password';
GRANT ALL PRIVILEGES ON DATABASE sandbox TO reglook;
-- For Drizzle migrations
ALTER USER reglook WITH SUPERUSER; 
\q
```

---

# 🧠 PHASE 3 — Install Node.js & pnpm

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pnpm
node -v
```

---

# 📦 PHASE 4 — Deploy Server Code

```bash
mkdir -p /opt/airnode-server
cd /opt/airnode-server
git clone <YOUR_SERVER_REPO_URL> .
```

Install dependencies:
```bash
pnpm install
```

---

# ⚙️ PHASE 5 — Configure Environment

```bash
cp .env.example .env
nano .env
```

### Required `.env` items:
```env
NODE_ENV=production
PORT=9100

# Database
DATABASE_URL=postgres://reglook:your_secure_db_password@localhost:5432/sandbox

# CORS (Change to your main domain or *)
CORS_ORIGIN=http://your-domain.com

# Core Security
TOKEN_PEPPER=a-long-random-string-used-for-hashing

# Cookies & URL
RP_ID=your-domain.com
RP_NAME=Airnode
RP_ORIGIN=https://your-domain.com

# R2 Configuration (for storing deployment artifacts)
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=sandbox-airnode
```

---

# 🏗️ PHASE 6 — Build & Migrate

```bash
# Generate migrations
pnpm run db:generate

# Push migrations to database
npx drizzle-kit push

# Run migrations to setup schema 
# pnpm run db:migrate (NO NEED TO RUN THIS)

# Build the project
pnpm run build
```

---

# 🚀 PHASE 7 — Run with PM2

Install PM2 globally:
```bash
npm install -g pm2
```

Start the server:
```bash
pm2 start dist/src/main.js --name airnode-server
```

Save the process list and setup startup:
```bash
pm2 save 
pm2 startup
# Copy and paste the command PM2 gives you (it starts with "sudo env...")
```

---

# 🚦 PHASE 8 — Reverse Proxy (Nginx)

```bash
apt install -y nginx
```

Create config:
```bash
nano /etc/nginx/sites-available/airnode
```

Paste:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://178.156.223.139:9100;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable & Certbot:
```bash
ln -s /etc/nginx/sites-available/airnode /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
systemctl restart nginx

# SSL
apt install -y python3-certbot-nginx
certbot --nginx -d your-domain.com
```

---

# ✅ PHASE 9 — Add Initial Node (CLI)

Once the server is running, you need to register your first agent node:

```bash
# On the server machine
npx ts-node -r tsconfig-paths/register register-node.ts
```

---

# 🏁 Summary

1. **VPS**: Ubuntu 22.04+ (2GB RAM recommended)
2. **DB**: Postgres 14+
3. **Runtime**: Node.js 20 + pnpm
4. **Daemon**: PM2
5. **Gateway**: Nginx + Certbot

Your master server is now ready to receive heartbeats and deploy tasks!
