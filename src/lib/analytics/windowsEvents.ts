type Payload = Record<string, string | number | boolean | undefined>

export function trackWindowsEvent(name: string, payload: Payload): void {
  if (typeof window === 'undefined') return
  console.log('[windows-event]', name, payload)
}
