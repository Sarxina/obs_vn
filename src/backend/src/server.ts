import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import express from "express";
import http from "http";
import cors from "cors";
import { VNManager } from "./VNManager.js";

const app = express();
app.use(cors());
const server = http.createServer(app);
server.setMaxListeners(0);

console.log("Starting Server");

// Serve the built frontend
app.use(express.static(path.join(__dirname, "../../../dist/frontend")));
app.get("*", (_req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../dist/frontend") });
});

// get endpoint for getting the list of available location and character files
app.get("/locationFiles", (_req, res) => {
    const files = fs.readdirSync(path.join(__dirname, "../../frontend/public/locations"));
    res.json(files);
});
app.get("/characterFiles", (_req, res) => {
    const files = fs.readdirSync(path.join(__dirname, "../../frontend/public/characters"));
    res.json(files);
});

// Backend process start
const BACKEND_PORT = Number(process.env["BACKEND_PORT"]) || 5001;
// Constructed for its side effects (registers websocket handlers and chat listeners)
new VNManager(server);

server.listen(BACKEND_PORT, () => {
    console.log(`✅ Backend running at http://localhost:${BACKEND_PORT}`);
    console.log(`\n📺 Visit:\n   Display: http://localhost:3000/display\n   Control: http://localhost:3000/controls\n`);
});
