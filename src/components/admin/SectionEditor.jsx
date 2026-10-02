import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/api'

export default function SectionEditor({ title, section, value, fields, onSaved }) {
  const [form, setForm] = useState(value)
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => setForm(value), [value])

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setStatus('')
    try {
      const result = await apiRequest(`/api/admin/sections/${section}`, { method: 'PUT', body: JSON.stringify({ value: form }) })
      onSaved(result.content)
      setStatus(result.message)
    } catch (error) {
      setStatus(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
      <h2 className="text-xl font-bold text-primary-dark">{title}</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className={`block text-sm font-semibold text-gray-700 ${field.multiline ? 'md:col-span-2' : ''}`}>
            {field.label}
            {field.multiline ? (
              <textarea rows="4" value={form[field.key] || ''} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal" />
            ) : (
              <input type="text" value={form[field.key] || ''} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal" />
            )}
          </label>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">{saving ? 'Menyimpan…' : 'Simpan Perubahan'}</button>
        {status && <p className="text-sm text-gray-600" role="status">{status}</p>}
      </div>
    </form>
  )
}
