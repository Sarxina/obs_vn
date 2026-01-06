# OBS VN

A visual novel where chat are the characters and make the choices

## tl;dr

0: Install Node.js (v16 or higher) and ensure you can run it from the command line
1: Copy .env.example to .env and set all the required parameters.
Azure is not required, but greatly enhances the experience
2: Run `npm run dev` to install all depencies, build the frontend, and start both servers
3: Open http://localhost:3000/controls to open the control page
4: In OBS, you can display the game in one of two ways
    - Display the entire game by adding a Browser Source pointing to http://localhost:3000/display
    - Display the front and back of the game separately by adding two Browser Sources
        - Front: http://localhost:3000/display/front
        - Back: http://localhost:3000/display/back
    - This is so you can put your VTuber model or other overlays in between the front and back of the game
5: Control the game from the control page (http://localhost:3000/controls)

## Controls

### Locations
Locations are the backgrounds of the visual novel.
*Location Name* does not effect the game, but helps you keep track
*Location Image* refers to the image in the `src/frontend/public/locations` folder
*Active* will switch to this background

### Characters

Characters utilize the `chatgod-js` module

*Name* is the name of the character. Different chatters will control the same character throughout the game
*Chatter*

### Choices



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
