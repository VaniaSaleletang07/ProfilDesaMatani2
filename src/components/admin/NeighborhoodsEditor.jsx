import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/api'

export default function NeighborhoodsEditor({ neighborhoods, onSaved }) {
  const [rows, setRows] = useState(neighborhoods)
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => setRows(neighborhoods), [neighborhoods])

  function change(index, key, value) {
    setRows((current) => current.map((row, rowIndex) => rowIndex === index ? { ...row, [key]: value } : row))
  }

  async function save(event) {
    event.preventDefault()
    setSaving(true)
    setStatus('')
    try {
      const result = await apiRequest('/api/admin/sections/neighborhoods', { method: 'PUT', body: JSON.stringify({ value: rows }) })
      onSaved(result.content)
      setStatus(result.message)
    } catch (error) {
      setStatus(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={save} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
      <h2 className="text-xl font-bold text-primary-dark">Informasi Lingkungan</h2>
      <p className="mt-2 text-sm text-gray-600">Isi nama dan kontak Kepala Lingkungan serta Wakil Kepala Lingkungan untuk setiap lingkungan.</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {rows.map((row, index) => <fieldset key={row.id} className="rounded-lg border border-gray-200 p-4"><legend className="px-1 text-sm font-bold text-primary-dark">{row.label}</legend><div className="grid gap-3 sm:grid-cols-2"><Field label="Kepala Lingkungan" value={row.headName} onChange={(value) => change(index, 'headName', value)} /><Field label="Kontak Kepala" value={row.headPhone} onChange={(value) => change(index, 'headPhone', value)} /><Field label="Wakil Kepala Lingkungan" value={row.deputyName} onChange={(value) => change(index, 'deputyName', value)} /><Field label="Kontak Wakil" value={row.deputyPhone} onChange={(value) => change(index, 'deputyPhone', value)} /></div></fieldset>)}
      </div>
      <div className="mt-5 flex items-center gap-4"><button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">{saving ? 'Menyimpan...' : 'Simpan Informasi Lingkungan'}</button>{status && <p className="text-sm text-gray-600" role="status">{status}</p>}</div>
    </form>
  )
}

function Field({ label, value, onChange }) {
  return <label className="text-xs font-semibold text-gray-700">{label}<input type="text" value={value || ''} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal" /></label>
}
