export type ProjectType = 'repair' | 'replace' | 'install'

export type TimelineOption = 'asap' | 'one_to_three_months' | 'just_exploring'

export type BudgetOption = 'under_2k' | '2k_to_5k' | '5k_to_10k' | 'not_sure'

export type IntentRoute = 'high_intent' | 'mid_intent' | 'low_intent'

export type ContactOption = 'call_now' | 'schedule_call' | 'sms' | 'email_first'

export interface WindowsJourneyData {
  projectType?: ProjectType
  windowsCount?: number
  zipCode?: string
  timeline?: TimelineOption
  budget?: BudgetOption
  intentRoute?: IntentRoute
  contactPreference?: ContactOption
  engagementScore: number
}

export const PROJECT_TYPE_OPTIONS: Array<{ value: ProjectType; label: string }> = [
  { value: 'repair', label: 'Repair' },
  { value: 'replace', label: 'Replace' },
  { value: 'install', label: 'Install' },
]

export const TIMELINE_OPTIONS: Array<{ value: TimelineOption; label: string }> = [
  { value: 'asap', label: 'ASAP' },
  { value: 'one_to_three_months', label: '1-3 months' },
  { value: 'just_exploring', label: 'Just exploring' },
]

export const BUDGET_OPTIONS: Array<{ value: BudgetOption; label: string }> = [
  { value: 'under_2k', label: '<$2k' },
  { value: '2k_to_5k', label: '$2k-$5k' },
  { value: '5k_to_10k', label: '$5k-$10k' },
  { value: 'not_sure', label: 'Not sure' },
]
