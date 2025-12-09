import dotenv from 'dotenv';
import path from 'path';

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import express from 'express'
import http from "http";
import cors from 'cors'
import { ChatGodManager } from './chatgod-js/src/services/ChatGodManager'

const app = express()
const server = http.createServer(app);
const PORT = process.env.PORT || 5001

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Example API route
app.get('/api/example', (req, res) => {
  res.json({ message: 'This is an example API endpoint' })
})

// Serve the built frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../../dist/frontend'))
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: '../../dist/frontend' })
  })
}

// Backend process start
const VNManager = new VNMana

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
