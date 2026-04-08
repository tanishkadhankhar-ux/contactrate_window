export type ProjectType = 'replace' | 'repair' | 'install'
export type WindowCountOption = '1' | '2_4' | '5_6' | '6_plus'
export type Timeline = 'immediately' | 'within_1_month' | 'one_to_three_months' | 'just_exploring'
export type Budget = 'under_2k' | '2k_to_5k' | '5k_to_10k' | 'not_sure'
export type IntentRoute = 'high_intent' | 'mid_intent' | 'low_intent'

/** Propensity segment after Timeline + Budget (propensity-adjusted engine). */
export type WindowSegment = 'VIP_URGENT' | 'SENSITIVE' | 'PLANNED' | 'CURIOUS'
export type ContactPreference =
  | 'call_now'
  | 'schedule_30'
  | 'schedule_1h'
  | 'schedule_weekend'
  | 'text_me'
  | 'email_options'
  | 'text_updates'
  | 'call_later'

export type WindowsV2Step = 0 | 1 | 2 | 3 | 'interstitial' | 4 | 5 | 6 | 7

export interface WindowsV2JourneyState {
  projectType?: ProjectType
  windowsCount?: WindowCountOption
  zipCode: string
  timeline?: Timeline
  budget?: Budget
  /** Segmentation after budget (VIP / SENSITIVE / PLANNED / CURIOUS). */
  windowSegment?: WindowSegment
  intentRoute?: IntentRoute
  firstName: string
  lastName: string
  email: string
  phone: string
  textUpdatesOptIn: boolean
  contactPreference?: ContactPreference
  /** VIP: user tapped priority call on PII; drives results messaging. */
  vipCallTriggered?: boolean
}

export const initialWindowsV2State: WindowsV2JourneyState = {
  zipCode: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  textUpdatesOptIn: false,
}

export const PROJECT_OPTIONS: Array<{ value: ProjectType; label: string }> = [
  { value: 'replace', label: 'Replace old windows' },
  { value: 'repair', label: 'Repair existing windows' },
  { value: 'install', label: 'Install windows in a new area' },
]

export const TIMELINE_OPTIONS: Array<{ value: Timeline; label: string }> = [
  { value: 'immediately', label: 'Immediately' },
  { value: 'within_1_month', label: 'Within 1 month' },
  { value: 'one_to_three_months', label: '1 to 3 months' },
  { value: 'just_exploring', label: 'Just exploring' },
]

export const BUDGET_OPTIONS: Array<{ value: Budget; label: string }> = [
  { value: 'under_2k', label: '<$2k' },
  { value: '2k_to_5k', label: '$2k-$5k' },
  { value: '5k_to_10k', label: '$5k-$10k' },
  { value: 'not_sure', label: 'Not sure' },
]

export const WINDOW_COUNT_OPTIONS: Array<{ value: WindowCountOption; label: string }> = [
  { value: '1', label: '1' },
  { value: '2_4', label: '2-4' },
  { value: '5_6', label: '5-6' },
  { value: '6_plus', label: '6+' },
]
