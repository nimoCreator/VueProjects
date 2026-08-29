export function formatDateTime(ms) {
  try {
    return new Intl.DateTimeFormat('pl-PL', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ms))
  } catch {
    return new Date(ms).toLocaleString()
  }
}

export function clampInt(n, min, max) {
  const v = Math.floor(Number(n))
  if (!Number.isFinite(v)) return min
  return Math.min(max, Math.max(min, v))
}

