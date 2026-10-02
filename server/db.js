import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { village } from '../src/data/desa.js'
import { headOfficial } from '../src/data/pemerintahan.js'
import { statistics } from '../src/data/statistik.js'
import { featuredPotentials } from '../src/data/potensi.js'
import { galleryPreview } from '../src/data/galeri.js'
import { initialBusinesses } from '../src/data/umkm.js'

const serverDir = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(serverDir, 'data')
fs.mkdirSync(dataDir, { recursive: true })

export const db = new Database(path.join(dataDir, 'matani2.db'))
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role = 'admin'),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sections (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK(type IN ('potentials', 'galleries')),
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    alt TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS businesses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    name TEXT NOT NULL DEFAULT '',
    owner TEXT NOT NULL DEFAULT '',
    address TEXT NOT NULL DEFAULT '',
    phone TEXT NOT NULL DEFAULT '',
    info TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`)

const insertSection = db.prepare('INSERT OR IGNORE INTO sections (key, value) VALUES (?, ?)')
insertSection.run('village', JSON.stringify(village))
insertSection.run('headOfficial', JSON.stringify(headOfficial))
insertSection.run('statistics', JSON.stringify(statistics))

const itemCount = db.prepare('SELECT COUNT(*) AS total FROM items').get().total
if (itemCount === 0) {
  const insertItem = db.prepare(`
    INSERT INTO items (type, title, description, image, alt, sort_order)
    VALUES (@type, @title, @description, @image, @alt, @sort_order)
  `)

  const seedItems = db.transaction(() => {
    featuredPotentials.forEach((item, index) => insertItem.run({
      type: 'potentials', title: item.title, description: item.description,
      image: item.image, alt: '', sort_order: index,
    }))
    galleryPreview.forEach((item, index) => insertItem.run({
      type: 'galleries', title: item.title, description: '',
      image: item.image, alt: item.alt, sort_order: index,
    }))
  })
  seedItems()
}

const businessCount = db.prepare('SELECT COUNT(*) AS total FROM businesses').get().total
if (businessCount === 0) {
  const insertBusiness = db.prepare(`
    INSERT INTO businesses (category, name, owner, address, phone, info, notes, sort_order)
    VALUES (@category, @name, @owner, @address, @phone, @info, @notes, @sort_order)
  `)
  const seedBusinesses = db.transaction(() => {
    initialBusinesses.forEach((business, index) => insertBusiness.run({ ...business, sort_order: index }))
  })
  seedBusinesses()
}

export function ensureAdmin(username, password) {
  const existing = db.prepare('SELECT id, username, password_hash FROM users WHERE role = ?').get('admin')
  if (existing) {
    if (existing.username !== username || !bcrypt.compareSync(password, existing.password_hash)) {
      db.prepare('UPDATE users SET username = ?, password_hash = ? WHERE id = ?')
        .run(username, bcrypt.hashSync(password, 12), existing.id)
      console.log(`Kredensial admin diselaraskan untuk username: ${username}`)
    }
    return
  }

  const passwordHash = bcrypt.hashSync(password, 12)
  db.prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)')
    .run(username, passwordHash, 'admin')
  console.log(`Akun admin awal dibuat untuk username: ${username}`)
}

export function getPublicContent() {
  const sections = Object.fromEntries(
    db.prepare('SELECT key, value FROM sections').all().map((row) => [row.key, JSON.parse(row.value)]),
  )
  const items = db.prepare('SELECT id, type, title, description, image, alt, sort_order FROM items ORDER BY sort_order, id').all()
  const businesses = db.prepare('SELECT id, category, name, owner, address, phone, info, notes, sort_order FROM businesses ORDER BY sort_order, id').all()

  return {
    ...sections,
    featuredPotentials: items.filter((item) => item.type === 'potentials'),
    galleryPreview: items.filter((item) => item.type === 'galleries'),
    businesses,
  }
}
