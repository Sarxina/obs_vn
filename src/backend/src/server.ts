import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs'

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import express from 'express'
import http from "http";
import cors from 'cors';
import { VNManager } from './VNManager';

const app = express()
const server = http.createServer(app);
server.setMaxListeners(0);

console.log('Starting Server')


// Serve the built frontend
app.use(express.static(path.join(__dirname, '../../../dist/frontend')))
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../../../dist/frontend') })
})

// get endpoint for getting the list of available location and character files
app.get('/locationFiles', (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, '../../frontend/public/locations'));
  res.json(files)
})
app.get('/characterFiles', (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, '../../frontend/public/characters'));
  res.json(files)
})

// Backend process start
const BACKEND_PORT = Number(process.env.BACKEND_PORT) || 5001;
const vnManager = new VNManager(server)

server.listen(BACKEND_PORT, () => {
    console.log(`✅ Backend running at http://localhost:${BACKEND_PORT}`);
    console.log(`\n📺 Visit:\n   Display: http://localhost:3000/display\n   Control: http://localhost:3000/controls\n`);
});
