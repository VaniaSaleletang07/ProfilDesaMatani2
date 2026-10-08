import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { village } from '../src/data/desa.js'
import { headOfficial, organization } from '../src/data/pemerintahan.js'
import { statistics } from '../src/data/statistik.js'
import { featuredPotentials } from '../src/data/potensi.js'
import { galleryPreview } from '../src/data/galeri.js'
import { initialBusinesses } from '../src/data/umkm.js'
import { neighborhoods } from '../src/data/lingkungan.js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Konfigurasi Supabase belum lengkap. Isi SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di file .env.')
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

function throwIfError(error) {
  if (error) throw error
}

async function countRows(table) {
  const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true })
  throwIfError(error)
  return count || 0
}

export async function initializeDatabase() {
  const defaultSections = [
    ['village', village],
    ['headOfficial', headOfficial],
    ['organization', organization],
    ['neighborhoods', neighborhoods],
    ['statistics', statistics],
  ].map(([key, value]) => ({ key, value }))
  const { error: sectionError } = await supabase.from('sections').upsert(defaultSections, { onConflict: 'key', ignoreDuplicates: true })
  throwIfError(sectionError)

  const { data: storedNeighborhoods, error: neighborhoodError } = await supabase.from('sections').select('value').eq('key', 'neighborhoods').maybeSingle()
  throwIfError(neighborhoodError)
  const savedNeighborhoods = storedNeighborhoods?.value
  const hasNoContacts = Array.isArray(savedNeighborhoods) && savedNeighborhoods.every((item) => !item.headName && !item.deputyName && !item.headPhone && !item.deputyPhone)
  if (hasNoContacts) {
    const { error } = await supabase.from('sections').update({ value: neighborhoods, updated_at: new Date().toISOString() }).eq('key', 'neighborhoods')
    throwIfError(error)
  }

  if (await countRows('items') === 0) {
    const seedItems = [
      ...featuredPotentials.map((item, index) => ({ type: 'potentials', title: item.title, description: item.description, image: item.image, alt: '', sort_order: index })),
      ...galleryPreview.map((item, index) => ({ type: 'galleries', title: item.title, description: '', image: item.image, alt: item.alt, sort_order: index })),
    ]
    const { error } = await supabase.from('items').insert(seedItems)
    throwIfError(error)
  }

  if (await countRows('businesses') === 0) {
    const { error } = await supabase.from('businesses').insert(initialBusinesses.map((business, index) => ({ ...business, sort_order: index })))
    throwIfError(error)
  }
}

export async function ensureAdmin(username, password) {
  const { data: existing, error } = await supabase.from('users').select('id, username, password_hash').eq('role', 'admin').limit(1).maybeSingle()
  throwIfError(error)
  if (existing) {
    if (existing.username !== username || !bcrypt.compareSync(password, existing.password_hash)) {
      const { error: updateError } = await supabase.from('users').update({ username, password_hash: bcrypt.hashSync(password, 12) }).eq('id', existing.id)
      throwIfError(updateError)
      console.log(`Kredensial admin diselaraskan untuk username: ${username}`)
    }
    return
  }

  const { error: insertError } = await supabase.from('users').insert({ username, password_hash: bcrypt.hashSync(password, 12), role: 'admin' })
  throwIfError(insertError)
  console.log(`Akun admin awal dibuat untuk username: ${username}`)
}

export async function getPublicContent() {
  const [sectionsResult, itemsResult, businessesResult] = await Promise.all([
    supabase.from('sections').select('key, value'),
    supabase.from('items').select('id, type, title, description, image, alt, sort_order').order('sort_order').order('id'),
    supabase.from('businesses').select('id, category, name, owner, address, phone, info, notes, sort_order').order('sort_order').order('id'),
  ])
  throwIfError(sectionsResult.error)
  throwIfError(itemsResult.error)
  throwIfError(businessesResult.error)

  const sections = Object.fromEntries((sectionsResult.data || []).map((row) => [row.key, row.value]))
  const items = itemsResult.data || []
  return {
    ...sections,
    featuredPotentials: items.filter((item) => item.type === 'potentials'),
    galleryPreview: items.filter((item) => item.type === 'galleries'),
    businesses: businessesResult.data || [],
  }
}
