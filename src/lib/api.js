export async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'same-origin',
    headers: options.body instanceof FormData ? options.headers : { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  if (response.status === 204) return null
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Permintaan tidak dapat diproses.')
  return data
}

export const adminEntryPath = import.meta.env.VITE_ADMIN_ENTRY_PATH || '/ruang-internal-m2-ubah-kode-ini'
export const adminPanelPath = `${adminEntryPath}/panel-kelola`
