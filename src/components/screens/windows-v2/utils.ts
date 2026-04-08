import type { Budget, IntentRoute, Timeline, WindowsV2JourneyState } from './types'

export function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, '').slice(0, 10)
  if (numbers.length <= 3) return numbers
  if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`
}

export function estimateSavings(count: number, budget?: Budget) {
  const multiplier = budget === '5k_to_10k' ? 420 : budget === '2k_to_5k' ? 300 : 210
  const savings = Math.max(900, count * multiplier)
  return Math.round(savings / 50) * 50
}

export function canProceedStepOne(state: WindowsV2JourneyState) {
  const zip = state.zipCode.replace(/\D/g, '')
  return zip.length === 5
}

export function canProceedStepTwo(state: WindowsV2JourneyState) {
  return Boolean(state.projectType)
}

export function canProceedStepThree(state: WindowsV2JourneyState) {
  return Boolean(state.windowsCount)
}

export function canProceedStepFour(state: WindowsV2JourneyState) {
  return Boolean(state.timeline)
}

export function canProceedStepFive(state: WindowsV2JourneyState) {
  return Boolean(state.budget)
}

export function canProceedStepSix(state: WindowsV2JourneyState) {
  return Boolean(state.contactPreference)
}

export function canProceedStepSeven(state: WindowsV2JourneyState) {
  const emailValid = /\S+@\S+\.\S+/.test(state.email)
  const digits = state.phone.replace(/\D/g, '')
  return Boolean(state.firstName.trim()) && Boolean(state.lastName.trim()) && emailValid && digits.length === 10
}

export function classifyIntent(timeline?: Timeline, budget?: Budget): IntentRoute {
  if (timeline === 'immediately' && budget && budget !== 'not_sure') return 'high_intent'
  if (timeline === 'within_1_month' || timeline === 'one_to_three_months') return 'mid_intent'
  return 'low_intent'
}

export function windowCountToNumber(value?: WindowsV2JourneyState['windowsCount']) {
  if (value === '1') return 1
  if (value === '2_4') return 3
  if (value === '5_6') return 5
  if (value === '6_plus') return 7
  return 1
}
