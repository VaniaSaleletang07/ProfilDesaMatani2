import { useState } from 'react'
import { apiRequest } from '../../lib/api'

const emptyBusiness = { category: '', name: '', owner: '', address: '', phone: '', info: '', notes: '', sort_order: 0 }
const fields = [
  ['category', 'Jenis potensi'], ['name', 'Nama usaha/aktivitas'], ['owner', 'Nama pemilik'],
  ['address', 'Alamat lengkap'], ['phone', 'Nomor telepon'], ['info', 'Informasi usaha'],
  ['notes', 'Keterangan'], ['sort_order', 'Urutan'],
]

export default function BusinessesManager({ businesses, onChanged }) {
  const [draft, setDraft] = useState(emptyBusiness)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')

  function edit(item) {
    setEditingId(item.id)
    setDraft({ category: item.category, name: item.name, owner: item.owner, address: item.address, phone: item.phone, info: item.info, notes: item.notes, sort_order: item.sort_order })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function reset() {
    setEditingId(null)
    setDraft(emptyBusiness)
  }

  async function submit(event) {
    event.preventDefault()
    setStatus('')
    try {
      const result = await apiRequest(editingId ? `/api/admin/businesses/${editingId}` : '/api/admin/businesses', {
        method: editingId ? 'PUT' : 'POST', body: JSON.stringify(draft),
      })
      onChanged(result.content)
      setStatus(result.message)
      reset()
    } catch (error) { setStatus(error.message) }
  }

  async function remove(item) {
    const label = item.name || item.owner
    if (!window.confirm(`Hapus data “${label}”? Tindakan ini tidak dapat dibatalkan.`)) return
    try {
      const result = await apiRequest(`/api/admin/businesses/${item.id}`, { method: 'DELETE' })
      onChanged(result.content)
      setStatus(result.message)
      if (editingId === item.id) reset()
    } catch (error) { setStatus(error.message) }
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
      <h2 className="text-xl font-bold text-primary-dark">Data Usaha dan Potensi Pendapatan</h2>
      <p className="mt-2 text-sm text-gray-600">Kelola daftar usaha yang ditampilkan pada halaman Potensi.</p>
      <form onSubmit={submit} className="mt-5 rounded-lg bg-gray-50 p-4">
        <h3 className="font-bold">{editingId ? 'Edit data usaha' : 'Tambah data usaha'}</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {fields.map(([key, label]) => (
            <label key={key} className="text-sm font-semibold">{label}
              <input type={key === 'sort_order' ? 'number' : key === 'phone' ? 'tel' : 'text'} required={key === 'category'} value={draft[key] ?? ''} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-normal" />
            </label>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3"><button type="submit" className="btn-primary">{editingId ? 'Simpan Edit' : 'Tambahkan'}</button>{editingId && <button type="button" onClick={reset} className="rounded-lg border border-gray-300 px-5 py-2 font-semibold">Batal</button>}</div>
      </form>
      {status && <p className="mt-4 rounded bg-primary-light p-3 text-sm text-primary-dark" role="status">{status}</p>}
      <div className="mt-5 overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-gray-100"><tr><th className="px-4 py-3">Usaha/Pemilik</th><th className="px-4 py-3">Kategori</th><th className="px-4 py-3">Alamat</th><th className="px-4 py-3">Telepon</th><th className="px-4 py-3">Aksi</th></tr></thead>
          <tbody className="divide-y divide-gray-200">
            {businesses.map((item) => <tr key={item.id}><td className="px-4 py-3"><span className="block font-semibold">{item.name || '—'}</span><span className="text-gray-500">{item.owner || '—'}</span></td><td className="px-4 py-3">{item.category}</td><td className="px-4 py-3">{item.address || '—'}</td><td className="px-4 py-3">{item.phone || '—'}</td><td className="px-4 py-3"><div className="flex gap-2"><button type="button" onClick={() => edit(item)} className="rounded bg-gray-100 px-3 py-2 font-semibold">Edit</button><button type="button" onClick={() => remove(item)} className="rounded bg-red-100 px-3 py-2 font-semibold text-red-800">Hapus</button></div></td></tr>)}
          </tbody>
        </table>
      </div>
    </section>
  )
}
