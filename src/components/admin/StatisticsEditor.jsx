import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/api'

export default function StatisticsEditor({ statistics, onSaved }) {
  const [rows, setRows] = useState(statistics)
  const [status, setStatus] = useState('')
  useEffect(() => setRows(statistics), [statistics])

  function update(index, key, value) {
    setRows(rows.map((row, rowIndex) => rowIndex === index ? { ...row, [key]: value } : row))
  }

  async function save(event) {
    event.preventDefault()
    setStatus('')
    try {
      const result = await apiRequest('/api/admin/sections/statistics', { method: 'PUT', body: JSON.stringify({ value: rows }) })
      onSaved(result.content)
      setStatus(result.message)
    } catch (error) { setStatus(error.message) }
  }

  return (
    <form onSubmit={save} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
      <h2 className="text-xl font-bold text-primary-dark">Ringkasan Angka</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {rows.map((row, index) => (
          <fieldset key={row.icon} className="rounded-lg border border-gray-200 p-4">
            <legend className="px-2 text-sm font-bold text-gray-700">Kartu {index + 1}</legend>
            <label className="block text-sm">Label<input value={row.label} onChange={(event) => update(index, 'label', event.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" /></label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="block text-sm">Nilai<input value={row.value} onChange={(event) => update(index, 'value', event.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" /></label>
              <label className="block text-sm">Satuan<input value={row.unit} onChange={(event) => update(index, 'unit', event.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" /></label>
            </div>
          </fieldset>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-4"><button type="submit" className="btn-primary">Simpan Statistik</button>{status && <p className="text-sm text-gray-600">{status}</p>}</div>
    </form>
  )
}
