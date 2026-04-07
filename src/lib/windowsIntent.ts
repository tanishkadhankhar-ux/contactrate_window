import type { BudgetOption, IntentRoute, TimelineOption } from '@/types/windowsFunnel'

export function classifyIntent(timeline?: TimelineOption, budget?: BudgetOption): IntentRoute {
  if (timeline === 'asap' && budget && budget !== 'not_sure') return 'high_intent'
  if (timeline === 'within_1_month' || timeline === 'one_to_three_months' || budget === 'not_sure') return 'mid_intent'
  return 'low_intent'
}
