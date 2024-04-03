/**
 * Browser caching method
 */

const STORAGE_KEY = 'afctrm_' // Ensure that the key of the same domain name does not conflict with this item

/**
 * window.localStorage
 */
export const Local = {
  set<T>(key: string, val: T) {
    window.localStorage.setItem(STORAGE_KEY + key, JSON.stringify(val))
  },
  get<T>(key: string): T | null {
    const jsonStr = window.localStorage.getItem(STORAGE_KEY + key)
    if (jsonStr) {
      return JSON.parse(jsonStr)
    } else {
      return null
    }
  },
  remove(key: string) {
    window.localStorage.removeItem(STORAGE_KEY + key)
  },
  clear() {
    window.localStorage.clear()
  }
}

/**
 * window.sessionStorage
 */
export const Session = {
  set<T>(key: string, val: T) {
    window.sessionStorage.setItem(STORAGE_KEY + key, JSON.stringify(val))
  },
  get<T>(key: string): T | null {
    const jsonStr = window.sessionStorage.getItem(STORAGE_KEY + key)
    if (jsonStr) {
      return JSON.parse(jsonStr)
    } else {
      return null
    }
  },
  remove(key: string) {
    window.sessionStorage.removeItem(STORAGE_KEY + key)
  },
  clear() {
    window.sessionStorage.clear()
  }
}
