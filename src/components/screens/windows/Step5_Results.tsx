'use client'

import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import type { BudgetOption, IntentRoute } from '@/types/windowsFunnel'

interface Props {
  intentRoute: IntentRoute
  budget?: BudgetOption
  onBack: () => void
  onNext: () => void
  onEngage?: (points: number) => void
}

export function Step5_Results({ intentRoute, budget, onBack, onNext, onEngage }: Props) {
  const isPremiumBudget = budget === '5k_to_10k'
  const title = intentRoute === 'high_intent'
    ? 'Matched providers ready now'
    : intentRoute === 'mid_intent'
      ? 'Compare your best-fit providers'
      : 'Learn and save your options'

  const cta = intentRoute === 'high_intent'
    ? 'Get quotes now'
    : intentRoute === 'mid_intent'
      ? 'Schedule or get SMS updates'
      : 'Email me options first'

  return (
    <FormLayout currentStep={5} onBack={onBack}>
      <div className='space-y-6 has-sticky-button'>
        <div className='rounded-lg border border-primary-700 bg-primary-300 px-4 py-3 text-primary-700 font-semibold'>
          Recommended by Forbes Advisor
        </div>
        <h1 className='font-display text-display sm:text-display-lg text-neutral-900'>{title}</h1>
        <div className='space-y-3'>
          <div className='rounded-lg border border-neutral-200 p-4 bg-white'>
            <p className='font-semibold text-neutral-900'>{isPremiumBudget ? 'Premium provider network' : 'Budget-friendly provider network'}</p>
            <p className='text-sm text-neutral-600 mt-1'>Providers shown based on your budget segment and timeline.</p>
            <Button className='mt-3' variant='secondary' onClick={() => onEngage?.(2)}>View provider details</Button>
          </div>
          {intentRoute !== 'high_intent' ? (
            <div className='rounded-lg border border-neutral-200 p-4 bg-neutral-50'>
              <p className='text-sm text-neutral-700'>
                {intentRoute === 'mid_intent'
                  ? 'See pricing ranges, what to expect, and provider comparisons.'
                  : 'Read guides, cost breakdowns, and save estimates for later.'}
              </p>
            </div>
          ) : null}
        </div>
        <StickyButtonContainer>
          <Button fullWidth showTrailingIcon onClick={onNext}>{cta}</Button>
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
