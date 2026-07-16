# Cyber-Rage-Panel

Modern VLESS Gateway with WebSocket and XHTTP transport support. Deploy on Railway for free.

## Features

- **VLESS over WebSocket** — Classic WS transport
- **XHTTP Transport** — packet-up and stream-up modes for better censorship resistance
- **Admin Dashboard** — Cyberpunk-themed UI with real-time monitoring
- **Config Management** — Create unlimited configs with traffic/speed/IP limits
- **Subscription Groups** — Group configs and generate public subscription pages
- **Traffic Monitoring** — Hourly traffic charts and live connection tracking
- **Bandwidth Throttling** — Per-config speed limits (Mbps)
- **IP Limits** — Max concurrent IPs per config
- **Auto Expiry** — Config expiration by days
- **Persistent Storage** — State saved to disk (requires Volume on Railway)
- **HTTP Proxy** — Built-in proxy endpoint

## Deploy on Railway

1. Fork this repository
2. Go to [Railway.app](https://railway.app/) → New Project → Deploy from GitHub repo
3. Select your forked repo
4. Enable a **Public Domain** in service settings
5. Add a **Volume** mounted at `/data` for persistent storage

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `ADMIN_PASSWORD` | Panel login password | `CYBERRAGE` |
| `SECRET_KEY` | Secret for session/password hashing (auto-persisted if empty) | — |
| `DATA_DIR` | State storage path (needs Volume) | `/data` |
| `RAILWAY_PUBLIC_DOMAIN` | Auto-set by Railway | `localhost` |

## Default Credentials

- **Password:** `CYBERRAGE`

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/login` | GET | Login page |
| `/dashboard` | GET | Admin dashboard |
| `/api/login` | POST | Authenticate |
| `/api/logout` | POST | Logout |
| `/api/links` | GET/POST | List/create configs |
| `/api/links/{uid}` | PATCH/DELETE | Update/delete config |
| `/api/subs` | GET/POST | List/create groups |
| `/api/subs/{id}` | PATCH/DELETE | Update/delete group |
| `/api/connections` | GET | Live connections |
| `/api/activity` | GET | Activity logs |
| `/stats` | GET | Dashboard stats |
| `/sub/{uuid}` | GET | Single config subscription |
| `/sub-group/{key}` | GET | Group subscription |
| `/p/{key}` | GET | Public group page |
| `/ws/{uuid}` | WS | WebSocket tunnel |
| `/xhttp-siz10/{mode}/{uuid}/{sid}` | GET | XHTTP downlink |
| `/proxy/{url}` | * | HTTP proxy |

## Tech Stack

- **Backend:** Python 3.11+ / FastAPI / Uvicorn
- **Frontend:** Vanilla JS / Chart.js
- **Transport:** VLESS over WebSocket & XHTTP
- **Storage:** JSON file on disk
