import * as React from 'react'
import type { WindowsJourneyData } from '@/types/windowsFunnel'

const initialState: WindowsJourneyData = {
  engagementScore: 0,
}

export function useWindowsJourneyState() {
  const [data, setData] = React.useState<WindowsJourneyData>(initialState)
  const update = React.useCallback((patch: Partial<WindowsJourneyData>) => {
    setData((prev) => ({ ...prev, ...patch }))
  }, [])

  const addEngagement = React.useCallback((points: number) => {
    setData((prev) => ({ ...prev, engagementScore: prev.engagementScore + points }))
  }, [])

  return { data, update, addEngagement }
}
