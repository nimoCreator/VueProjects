export function createLocalStoragePlugin({ keyPrefix = '' } = {}) {
  return ({ store }) => {
    if (typeof window === 'undefined') return

    const key = `${keyPrefix}${store.$id}`
    const raw = window.localStorage.getItem(key)

    if (raw) {
      try {
        store.$patch(JSON.parse(raw))
      } catch {
        // ignore corrupted local state
      }
    }

    store.$subscribe(
      (_mutation, state) => {
        try {
          window.localStorage.setItem(key, JSON.stringify(state))
        } catch {
          // ignore quota errors
        }
      },
      { detached: true },
    )
  }
}

