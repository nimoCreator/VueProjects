export async function sha256(text) {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function randomId() {
  if (typeof crypto?.randomUUID === 'function') return crypto.randomUUID()
  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`
}

