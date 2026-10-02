import { useState } from 'react'
import { apiRequest } from '../../lib/api'

const emptyItem = { title: '', description: '', image: '', alt: '', sort_order: 0 }

export default function ItemsManager({ title, type, items, onChanged }) {
  const [draft, setDraft] = useState(emptyItem)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')
  const [uploading, setUploading] = useState(false)

  function edit(item) {
    setEditingId(item.id)
    setDraft({ title: item.title, description: item.description || '', image: item.image || '', alt: item.alt || '', sort_order: item.sort_order || 0 })
  }

  function reset() {
    setEditingId(null)
    setDraft(emptyItem)
  }

  async function submit(event) {
    event.preventDefault()
    setStatus('')
    const path = editingId ? `/api/admin/items/${type}/${editingId}` : `/api/admin/items/${type}`
    try {
      const result = await apiRequest(path, { method: editingId ? 'PUT' : 'POST', body: JSON.stringify(draft) })
      onChanged(result.content)
      setStatus(result.message)
      reset()
    } catch (error) { setStatus(error.message) }
  }

  async function remove(item) {
    if (!window.confirm(`Hapus “${item.title}”? Tindakan ini tidak dapat dibatalkan.`)) return
    try {
      const result = await apiRequest(`/api/admin/items/${type}/${item.id}`, { method: 'DELETE' })
      onChanged(result.content)
      setStatus(result.message)
      if (editingId === item.id) reset()
    } catch (error) { setStatus(error.message) }
  }

  async function uploadImage(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    const body = new FormData()
    body.append('image', file)
    try {
      const result = await apiRequest('/api/admin/upload', { method: 'POST', body })
      setDraft((current) => ({ ...current, image: result.url }))
    } catch (error) { setStatus(error.message) }
    finally { setUploading(false) }
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
      <h2 className="text-xl font-bold text-primary-dark">{title}</h2>
      <form onSubmit={submit} className="mt-5 rounded-lg bg-gray-50 p-4">
        <h3 className="font-bold">{editingId ? 'Edit data' : 'Tambah data baru'}</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold">Judul<input required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-normal" /></label>
          <label className="text-sm font-semibold">Urutan<input type="number" value={draft.sort_order} onChange={(event) => setDraft({ ...draft, sort_order: event.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-normal" /></label>
          <label className="text-sm font-semibold md:col-span-2">Deskripsi<textarea rows="3" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-normal" /></label>
          <label className="text-sm font-semibold">URL gambar<input value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-normal" /></label>
          <label className="text-sm font-semibold">Teks alternatif gambar<input value={draft.alt} onChange={(event) => setDraft({ ...draft, alt: event.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-normal" /></label>
          <label className="text-sm font-semibold md:col-span-2">Unggah gambar<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={uploadImage} className="mt-1 block w-full text-sm font-normal" />{uploading && <span className="text-gray-500">Mengunggah…</span>}</label>
        </div>
        <div className="mt-4 flex flex-wrap gap-3"><button type="submit" className="btn-primary">{editingId ? 'Simpan Edit' : 'Tambahkan'}</button>{editingId && <button type="button" onClick={reset} className="rounded-lg border border-gray-300 px-5 py-2 font-semibold">Batal</button>}</div>
      </form>
      {status && <p className="mt-4 rounded bg-primary-light p-3 text-sm text-primary-dark" role="status">{status}</p>}
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <article key={item.id || item.title} className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center">
            <img src={item.image || '/images/gallery-1-placeholder.svg'} alt="" className="h-20 w-28 rounded object-cover" />
            <div className="min-w-0 flex-1"><h3 className="font-bold">{item.title}</h3><p className="line-clamp-2 text-sm text-gray-600">{item.description || item.alt}</p></div>
            <div className="flex gap-2"><button type="button" onClick={() => edit(item)} className="rounded bg-gray-100 px-4 py-2 text-sm font-semibold hover:bg-gray-200">Edit</button><button type="button" onClick={() => remove(item)} className="rounded bg-red-100 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-200">Hapus</button></div>
          </article>
        ))}
      </div>
    </section>
  )
}
