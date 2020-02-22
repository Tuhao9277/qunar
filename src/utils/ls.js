export function lsSave(key, value) {
  if (typeof value === 'string') {
    localStorage.setItem(key, value)
  } else {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
export function lsRemove(key) {
  return localStorage.removeItem(key)
}
export function lsReadObj(key) {
  const t = localStorage.getItem(key)
  if (t) {
    try {
      const result = JSON.parse(t)
      return result
    } catch {
      lsRemove(key)
      return undefined
    }
  } else {
    return undefined
  }
}

export function lsReadStr(key) {
  return localStorage.getItem(key) || ''
}


