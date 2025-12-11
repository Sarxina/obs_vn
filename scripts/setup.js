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
  const binPath = path.join(dir, 'node_modules', '.bin');
  // If .bin doesn't exist or is empty, need to install
  if (!fs.existsSync(binPath)) return true;
  try {
    const binContents = fs.readdirSync(binPath);
    return binContents.length === 0;
  } catch (e) {
    return true;
  }
}

function needsBuild() {
  return !fs.existsSync(distDir);
}

// Always install root dependencies to ensure everything is up to date
log('Installing root dependencies...');
run('npm install', rootDir);

// Always install frontend dependencies (npm is smart about skipping if nothing changed)
log('Installing frontend dependencies...');
run('npm install', frontendDir);

// Always install backend dependencies
log('Installing backend dependencies...');
run('npm install', backendDir);

// Install chatgod-js dependencies if needed
if (fs.existsSync(chatgodDir)) {
  log('Installing chatgod-js dependencies...');
  run('npm install', chatgodDir);
}

// Build frontend if needed
if (needsBuild()) {
  log('Building frontend for production...');
  run('npm run build', frontendDir);
} else {
  log('Frontend already built ✓');
}

log('Setup complete! Starting development servers...');
