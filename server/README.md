# Sandbox API

A production-grade NestJS API server with cookie-based sessions, CSRF protection, and WebAuthn passkeys.

## Features

- **NestJS + TypeScript** - Modern, scalable Node.js framework
- **PostgreSQL + Drizzle ORM** - Type-safe database access with migrations
- **Cookie-based Sessions** - Secure session management
- **CSRF Protection** - Double-submit cookie pattern
- **WebAuthn Passkeys** - Full passkey registration and authentication
- **Argon2 Password Hashing** - Industry-standard password security
- **Rate Limiting** - Throttle protection
- **Structured Logging** - Pino logger with pretty printing
- **Swagger Documentation** - Auto-generated API docs
- **Helmet Security Headers** - Secure HTTP headers

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or pnpm

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```
DATABASE_URL=postgres://reglook:reglook@localhost:5432/sandbox
```

### 3. Create Database

Make sure PostgreSQL is running and create the database:

```sql
CREATE DATABASE sandbox;
CREATE USER reglook WITH PASSWORD 'reglook';
GRANT ALL PRIVILEGES ON DATABASE sandbox TO reglook;
```

### 4. Run Migrations

Generate and run database migrations:

```bash
npm run db:generate
npm run db:migrate
```

### 5. Start the Server

```bash
npm run dev
```

The server will start at http://localhost:9000

Swagger documentation is available at http://localhost:9000/docs

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `9000` |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |
| `SESSION_TTL_SECONDS` | Session lifetime | `604800` (7 days) |
| `COOKIE_SECURE` | Secure cookie flag | `false` |
| `COOKIE_SAMESITE` | SameSite cookie policy | `lax` |
| `RP_NAME` | WebAuthn Relying Party name | `Sandbox` |
| `RP_ID` | WebAuthn Relying Party ID | `localhost` |
| `RP_ORIGIN` | WebAuthn origin | `http://localhost:3000` |
| `WEBAUTHN_CHALLENGE_TTL_SECONDS` | Challenge expiry | `300` |

## API Endpoints

### Health
- `GET /` - Health check

### Auth
- `GET /auth/csrf` - Get CSRF token
- `POST /auth/signup/start` - Start signup
- `POST /auth/signup/password` - Complete signup with password
- `POST /auth/login/password` - Login with password
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user

### Passkeys
- `POST /auth/signup/passkey/start` - Start passkey registration (signup)
- `POST /auth/signup/passkey/finish` - Complete passkey registration (signup)
- `POST /auth/login/passkey/start` - Start passkey authentication
- `POST /auth/login/passkey/finish` - Complete passkey authentication

### Users
- `GET /users/me` - Get profile
- `PATCH /users/me` - Update profile
- `GET /users/me/passkeys` - List passkeys
- `POST /users/me/passkeys/start` - Register new passkey
- `POST /users/me/passkeys/finish` - Complete passkey registration
- `DELETE /users/me/passkeys/:id` - Delete passkey

### Projects
- `POST /projects` - Create project
- `GET /projects` - List projects
- `GET /projects/:id` - Get project
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Management (Admin only)
- `GET /management/users` - List all users
- `PATCH /management/users/:id/role` - Set user role

## Authentication Flow

### Cookie Session + CSRF

This API uses a **cookie-based session** with **double-submit CSRF protection**:

1. **Session Cookie (`sid`)**
   - HttpOnly: `true` (JavaScript cannot read)
   - Secure: Based on `COOKIE_SECURE` env
   - SameSite: Based on `COOKIE_SAMESITE` env
   - Contains the session ID

2. **CSRF Cookie (`csrf_token`)**
   - HttpOnly: `false` (JavaScript CAN read)
   - Must be sent as `x-csrf-token` header
   - Rotated on login/logout

### Password Authentication

```javascript
// 1. Get CSRF token
await fetch('/auth/csrf', { credentials: 'include' });

// 2. Signup
const { userId } = await fetch('/auth/signup/start', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    username: 'johndoe',
  }),
}).then(r => r.json());

// 3. Set password
await fetch('/auth/signup/password', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId, password: 'SecurePassword123!' }),
});
```

## Testing Passkeys in Browser

**Important:** Passkeys (WebAuthn) require browser APIs and cannot be tested in Postman.

Use this HTML/JavaScript snippet to test passkeys:

### Passkey Registration

```html
<!DOCTYPE html>
<html>
<body>
  <button onclick="registerPasskey()">Register Passkey</button>
  <script>
    const API = 'http://localhost:9000';
    let userId = null;
    
    async function registerPasskey() {
      // First, create a user (or use existing userId)
      if (!userId) {
        const signupRes = await fetch(`${API}/auth/signup/start`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: 'Test',
            lastName: 'User',
            email: `test${Date.now()}@example.com`,
            username: `testuser${Date.now()}`,
          }),
        });
        const data = await signupRes.json();
        userId = data.userId;
        console.log('Created user:', userId);
      }
      
      // Start registration
      const optionsRes = await fetch(`${API}/auth/signup/passkey/start`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const options = await optionsRes.json();
      console.log('Registration options:', options);
      
      // Convert base64url to ArrayBuffer for WebAuthn
      options.challenge = base64urlToBuffer(options.challenge);
      options.user.id = base64urlToBuffer(options.user.id);
      if (options.excludeCredentials) {
        options.excludeCredentials = options.excludeCredentials.map(c => ({
          ...c,
          id: base64urlToBuffer(c.id),
        }));
      }
      
      // Create credential
      const credential = await navigator.credentials.create({ publicKey: options });
      console.log('Credential created:', credential);
      
      // Prepare response for server
      const response = {
        id: credential.id,
        rawId: bufferToBase64url(credential.rawId),
        type: credential.type,
        response: {
          clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
          attestationObject: bufferToBase64url(credential.response.attestationObject),
          transports: credential.response.getTransports?.() || [],
        },
        clientExtensionResults: credential.getClientExtensionResults(),
      };
      
      // Finish registration
      const finishRes = await fetch(`${API}/auth/signup/passkey/finish`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, data: response }),
      });
      const result = await finishRes.json();
      console.log('Registration result:', result);
    }
    
    function base64urlToBuffer(base64url) {
      const padding = '='.repeat((4 - base64url.length % 4) % 4);
      const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/') + padding;
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes.buffer;
    }
    
    function bufferToBase64url(buffer) {
      const bytes = new Uint8Array(buffer);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }
  </script>
</body>
</html>
```

### Passkey Login

```html
<!DOCTYPE html>
<html>
<body>
  <input type="text" id="username" placeholder="Username" value="testuser" />
  <button onclick="loginWithPasskey()">Login with Passkey</button>
  <script>
    const API = 'http://localhost:9000';
    
    async function loginWithPasskey() {
      const username = document.getElementById('username').value;
      
      // Start authentication
      const optionsRes = await fetch(`${API}/auth/login/passkey/start`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: username }),
      });
      const options = await optionsRes.json();
      console.log('Authentication options:', options);
      
      // Convert base64url to ArrayBuffer
      options.challenge = base64urlToBuffer(options.challenge);
      if (options.allowCredentials) {
        options.allowCredentials = options.allowCredentials.map(c => ({
          ...c,
          id: base64urlToBuffer(c.id),
        }));
      }
      
      // Get credential
      const credential = await navigator.credentials.get({ publicKey: options });
      console.log('Credential retrieved:', credential);
      
      // Prepare response
      const response = {
        id: credential.id,
        rawId: bufferToBase64url(credential.rawId),
        type: credential.type,
        response: {
          clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
          authenticatorData: bufferToBase64url(credential.response.authenticatorData),
          signature: bufferToBase64url(credential.response.signature),
          userHandle: credential.response.userHandle 
            ? bufferToBase64url(credential.response.userHandle) 
            : null,
        },
        clientExtensionResults: credential.getClientExtensionResults(),
      };
      
      // Finish authentication
      const finishRes = await fetch(`${API}/auth/login/passkey/finish`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: username, data: response }),
      });
      const result = await finishRes.json();
      console.log('Login result:', result);
    }
    
    function base64urlToBuffer(base64url) {
      const padding = '='.repeat((4 - base64url.length % 4) % 4);
      const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/') + padding;
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes.buffer;
    }
    
    function bufferToBase64url(buffer) {
      const bytes = new Uint8Array(buffer);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }
  </script>
</body>
</html>
```

## Testing with Postman

1. Import `postman.collection.json`
2. The collection has pre-request scripts that automatically:
   - Read the `csrf_token` cookie
   - Set the `x-csrf-token` header

**Workflow:**
1. Call `GET /auth/csrf` to get initial CSRF token
2. Call `POST /auth/signup/start` to create a user
3. Call `POST /auth/signup/password` to set password and login
4. The `sid` cookie is now set - you're authenticated!
5. For protected endpoints, the CSRF token header is auto-added

**Note:** Passkey endpoints cannot be tested in Postman as they require browser WebAuthn APIs.

## NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Run Drizzle migrations |

## Error Format

All errors follow a consistent format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

Common error codes:
- `VALIDATION_ERROR` - Request validation failed
- `UNAUTHORIZED` - Not authenticated
- `SESSION_REQUIRED` - Session cookie missing
- `SESSION_INVALID` - Session expired or revoked
- `CSRF_INVALID` - CSRF token mismatch
- `INVALID_CREDENTIALS` - Wrong username/password
- `USER_NOT_FOUND` - User doesn't exist
- `EMAIL_EXISTS` - Email already registered
- `USERNAME_EXISTS` - Username already taken
- `PASSKEY_NOT_FOUND` - Passkey doesn't exist
- `CHALLENGE_NOT_FOUND` - WebAuthn challenge expired

## Project Structure

```
src/
├── main.ts                    # Application entry point
├── app.module.ts              # Root module
├── config/                    # Configuration
│   ├── config.module.ts
│   └── env.schema.ts
├── platform/                  # Platform services
│   ├── http/
│   │   ├── http.module.ts
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── decorators/
│   │   └── types/
│   ├── security/
│   │   ├── csrf/
│   │   └── cookies/
│   └── logging/
├── db/                        # Database
│   ├── db.module.ts
│   └── drizzle/
│       ├── drizzle.service.ts
│       ├── schema/
│       └── migrations/
├── modules/                   # Feature modules
│   ├── health/
│   ├── auth/
│   │   ├── dto/
│   │   └── passkeys/
│   ├── users/
│   │   └── dto/
│   ├── projects/
│   │   └── dto/
│   └── management/
│       └── dto/
└── common/                    # Shared utilities
    ├── constants/
    └── utils/
```

## License

MIT
