const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const DEFAULT_DATA = {
  trainees: [],
  submissions: [],
  pinUnlocks: [],
};

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DATA, null, 2));
  }
}

function readDb() {
  ensureDataFile();
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  let missingKey = false;
  for (const key of Object.keys(DEFAULT_DATA)) {
    if (!(key in data)) {
      data[key] = DEFAULT_DATA[key];
      missingKey = true;
    }
  }
  if (missingKey) writeDb(data);
  return data;
}

function writeDb(data) {
  ensureDataFile();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function genId(prefix) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

module.exports = { readDb, writeDb, genId };
