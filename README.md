# OBS VN

A TypeScript-based visual novel system with separate Express backend and React frontend.

## Project Structure

```
obs_vn/
├── src/
│   ├── frontend/     # React + Vite frontend
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── ControlsPage.tsx    # /controls route
│   │   │   │   └── DisplayPage.tsx     # /display route
│   │   │   ├── components/
│   │   │   ├── types/
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   └── index.css
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── backend/      # Express server
│       ├── src/
│       │   ├── server.ts
│       │   └── legacy.ts    # Saved code from previous version
│       ├── package.json
│       └── tsconfig.json
├── Backup/           # Previous version backup
└── package.json      # Root package with convenience scripts
```

## Quick Start

**One command does it all:**

```bash
npm run dev
```

That's it! This single command will:
1. ✅ Install frontend modules (if needed)
2. ✅ Install backend modules (if needed)
3. ✅ Build the frontend (if needed)
4. ✅ Start both servers concurrently

The setup runs automatically before starting development servers. If dependencies are already installed and the frontend is already built, it skips those steps.

This starts:
- Frontend dev server on http://localhost:3000
- Backend API server on http://localhost:5001

### Other Commands

- `npm run dev:frontend` - Run only frontend dev server
- `npm run dev:backend` - Run only backend dev server
- `npm run build:frontend` - Build frontend for production
- `npm start` - Run production server (serves built frontend + API)

## Routes

- **Frontend:**
  - `/controls` - Control page
  - `/display` - Display page

- **Backend API:**
  - `/api/health` - Health check endpoint
  - `/api/example` - Example API endpoint

## Technologies

- **Frontend:** React 18, TypeScript, Vite, React Router, Tailwind CSS
- **Backend:** Express, TypeScript, Node.js
