import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import bcrypt from 'bcryptjs'
import multer from 'multer'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { clearSession, createSession, requireAdmin } from './auth.js'
import { db, ensureAdmin, getPublicContent } from './db.js'

const port = Number(process.env.PORT || 4174)
const jwtSecret = process.env.JWT_SECRET
const adminUsername = process.env.ADMIN_USERNAME
const adminPassword = process.env.ADMIN_PASSWORD

if (!jwtSecret || jwtSecret.length < 32 || !adminUsername || !adminPassword || adminPassword.length < 12) {
  console.error('Konfigurasi admin belum aman. Isi JWT_SECRET (min. 32 karakter), ADMIN_USERNAME, dan ADMIN_PASSWORD (min. 12 karakter) di file .env.')
  process.exit(1)
}

ensureAdmin(adminUsername, adminPassword)

const app = express()
const serverDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(serverDir, '..')
const uploadsDir = path.join(rootDir, 'public', 'uploads')
fs.mkdirSync(uploadsDir, { recursive: true })

app.disable('x-powered-by')
app.use(helmet({ contentSecurityPolicy: false }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use('/uploads', express.static(uploadsDir, { fallthrough: false, maxAge: '7d' }))

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Terlalu banyak percobaan login. Coba kembali dalam 15 menit.' },
})
const adminOnly = requireAdmin(jwtSecret)

app.get('/api/public/content', (_req, res) => res.json(getPublicContent()))

app.post('/api/auth/login', loginLimiter, (req, res) => {
  const username = String(req.body?.username || '').trim()
  const password = String(req.body?.password || '')
  const user = db.prepare('SELECT id, username, password_hash, role FROM users WHERE username = ?').get(username)

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ message: 'Username atau password salah.' })
  }

  createSession(res, user, jwtSecret)
  res.json({ user: { username: user.username, role: user.role } })
})

app.post('/api/auth/logout', (_req, res) => {
  clearSession(res)
  res.status(204).end()
})

app.get('/api/auth/session', adminOnly, (req, res) => {
  const user = db.prepare('SELECT username, role FROM users WHERE id = ?').get(req.admin.sub)
  if (!user) return res.status(401).json({ message: 'Akun tidak ditemukan.' })
  res.json({ user })
})

const allowedSections = new Set(['village', 'headOfficial', 'organization', 'neighborhoods', 'statistics'])
app.put('/api/admin/sections/:section', adminOnly, (req, res) => {
  const { section } = req.params
  if (!allowedSections.has(section)) return res.status(400).json({ message: 'Bagian data tidak valid.' })
  if (req.body?.value === undefined) return res.status(400).json({ message: 'Data tidak boleh kosong.' })
  if (section === 'village') {
    const mapUrl = String(req.body.value?.mapEmbedUrl || '')
    const isPlaceholder = mapUrl.startsWith('[ISI:')
    const isEmbedUrl = mapUrl.includes('/maps/embed') || mapUrl.includes('output=embed')
    if (mapUrl && !isPlaceholder && !isEmbedUrl) {
      return res.status(400).json({ message: 'Gunakan URL Google Maps khusus embed, bukan link Bagikan atau maps.app.goo.gl.' })
    }
  }

  db.prepare(`UPDATE sections SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?`)
    .run(JSON.stringify(req.body.value), section)
  res.json({ message: 'Perubahan berhasil disimpan.', content: getPublicContent() })
})

const allowedTypes = new Set(['potentials', 'galleries'])
function cleanItem(body) {
  return {
    title: String(body.title || '').trim(),
    description: String(body.description || '').trim(),
    image: String(body.image || '').trim(),
    alt: String(body.alt || '').trim(),
    sort_order: Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 0,
  }
}

app.post('/api/admin/items/:type', adminOnly, (req, res) => {
  const { type } = req.params
  if (!allowedTypes.has(type)) return res.status(400).json({ message: 'Jenis data tidak valid.' })
  const item = cleanItem(req.body || {})
  if (!item.title) return res.status(400).json({ message: 'Judul wajib diisi.' })

  const result = db.prepare(`INSERT INTO items (type, title, description, image, alt, sort_order) VALUES (?, ?, ?, ?, ?, ?)`)
    .run(type, item.title, item.description, item.image, item.alt, item.sort_order)
  res.status(201).json({ id: result.lastInsertRowid, message: 'Data berhasil ditambahkan.', content: getPublicContent() })
})

app.put('/api/admin/items/:type/:id', adminOnly, (req, res) => {
  const { type, id } = req.params
  if (!allowedTypes.has(type)) return res.status(400).json({ message: 'Jenis data tidak valid.' })
  const item = cleanItem(req.body || {})
  if (!item.title) return res.status(400).json({ message: 'Judul wajib diisi.' })

  const result = db.prepare(`UPDATE items SET title = ?, description = ?, image = ?, alt = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND type = ?`)
    .run(item.title, item.description, item.image, item.alt, item.sort_order, Number(id), type)
  if (!result.changes) return res.status(404).json({ message: 'Data tidak ditemukan.' })
  res.json({ message: 'Data berhasil diperbarui.', content: getPublicContent() })
})

app.delete('/api/admin/items/:type/:id', adminOnly, (req, res) => {
  const { type, id } = req.params
  if (!allowedTypes.has(type)) return res.status(400).json({ message: 'Jenis data tidak valid.' })
  const result = db.prepare('DELETE FROM items WHERE id = ? AND type = ?').run(Number(id), type)
  if (!result.changes) return res.status(404).json({ message: 'Data tidak ditemukan.' })
  res.json({ message: 'Data berhasil dihapus.', content: getPublicContent() })
})

function cleanBusiness(body) {
  return {
    category: String(body.category || '').trim(),
    name: String(body.name || '').trim(),
    owner: String(body.owner || '').trim(),
    address: String(body.address || '').trim(),
    phone: String(body.phone || '').trim(),
    info: String(body.info || '').trim(),
    notes: String(body.notes || '').trim(),
    sort_order: Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 0,
  }
}

app.post('/api/admin/businesses', adminOnly, (req, res) => {
  const business = cleanBusiness(req.body || {})
  if (!business.category || (!business.name && !business.owner)) {
    return res.status(400).json({ message: 'Kategori serta nama usaha atau pemilik wajib diisi.' })
  }
  const result = db.prepare(`
    INSERT INTO businesses (category, name, owner, address, phone, info, notes, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(business.category, business.name, business.owner, business.address, business.phone, business.info, business.notes, business.sort_order)
  res.status(201).json({ id: result.lastInsertRowid, message: 'Data usaha berhasil ditambahkan.', content: getPublicContent() })
})

app.put('/api/admin/businesses/:id', adminOnly, (req, res) => {
  const business = cleanBusiness(req.body || {})
  if (!business.category || (!business.name && !business.owner)) {
    return res.status(400).json({ message: 'Kategori serta nama usaha atau pemilik wajib diisi.' })
  }
  const result = db.prepare(`
    UPDATE businesses SET category = ?, name = ?, owner = ?, address = ?, phone = ?, info = ?, notes = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(business.category, business.name, business.owner, business.address, business.phone, business.info, business.notes, business.sort_order, Number(req.params.id))
  if (!result.changes) return res.status(404).json({ message: 'Data usaha tidak ditemukan.' })
  res.json({ message: 'Data usaha berhasil diperbarui.', content: getPublicContent() })
})

app.delete('/api/admin/businesses/:id', adminOnly, (req, res) => {
  const result = db.prepare('DELETE FROM businesses WHERE id = ?').run(Number(req.params.id))
  if (!result.changes) return res.status(404).json({ message: 'Data usaha tidak ditemukan.' })
  res.json({ message: 'Data usaha berhasil dihapus.', content: getPublicContent() })
})

const allowedMimeTypes = new Map([
  ['image/jpeg', '.jpg'], ['image/png', '.png'], ['image/webp', '.webp'], ['image/gif', '.gif'],
])
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (_req, file, callback) => callback(null, `${Date.now()}-${crypto.randomUUID()}${allowedMimeTypes.get(file.mimetype) || ''}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => callback(null, allowedMimeTypes.has(file.mimetype)),
})

app.post('/api/admin/upload', adminOnly, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Pilih gambar JPG, PNG, WebP, atau GIF.' })
  res.status(201).json({ url: `/uploads/${req.file.filename}` })
})

if (process.env.NODE_ENV === 'production') {
  const distDir = path.join(rootDir, 'dist')
  app.use(express.static(distDir))
  app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')))
}

app.use((error, _req, res, _next) => {
  console.error(error)
  if (error instanceof multer.MulterError) return res.status(400).json({ message: 'Ukuran gambar maksimal 5 MB.' })
  res.status(500).json({ message: 'Terjadi kesalahan pada server.' })
})

app.listen(port, '127.0.0.1', () => {
  console.log(`API Matani 2 berjalan di http://127.0.0.1:${port}`)
})
