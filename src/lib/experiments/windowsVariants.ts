export type WindowsVariant = 'control' | 'cta_b'

export function getWindowsVariant(seed = 'windows-default'): WindowsVariant {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return hash % 2 === 0 ? 'control' : 'cta_b'
}
