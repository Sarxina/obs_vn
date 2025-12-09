#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const frontendDir = path.join(rootDir, 'src', 'frontend');
const backendDir = path.join(rootDir, 'src', 'backend');
const chatgodDir = path.join(backendDir, 'src', 'chatgod-js');
const distDir = path.join(rootDir, 'dist', 'frontend');

function log(message) {
  console.log(`\n🔧 ${message}\n`);
}

function run(command, cwd) {
  execSync(command, { cwd, stdio: 'inherit' });
}

function needsInstall(dir) {
  return !fs.existsSync(path.join(dir, 'node_modules'));
}

function needsBuild() {
  return !fs.existsSync(distDir);
}

// Install root dependencies if needed
if (needsInstall(rootDir)) {
  log('Installing root dependencies...');
  run('npm install', rootDir);
} else {
  log('Root dependencies already installed ✓');
}

// Install frontend dependencies if needed
if (needsInstall(frontendDir)) {
  log('Installing frontend dependencies...');
  run('npm install', frontendDir);
} else {
  log('Frontend dependencies already installed ✓');
}

// Install backend dependencies if needed
if (needsInstall(backendDir)) {
  log('Installing backend dependencies...');
  run('npm install', backendDir);
} else {
  log('Backend dependencies already installed ✓');
}

// Install chatgod-js dependencies if needed
if (fs.existsSync(chatgodDir) && needsInstall(chatgodDir)) {
  log('Installing chatgod-js dependencies...');
  run('npm install', chatgodDir);
} else if (fs.existsSync(chatgodDir)) {
  log('Chatgod-js dependencies already installed ✓');
}

// Build frontend if needed
if (needsBuild()) {
  log('Building frontend for production...');
  run('npm run build', frontendDir);
} else {
  log('Frontend already built ✓');
}

log('Setup complete! Starting development servers...');
