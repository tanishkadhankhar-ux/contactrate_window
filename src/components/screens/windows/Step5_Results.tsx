'use client'

import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import type { BudgetOption, IntentRoute } from '@/types/windowsFunnel'
import type { WindowsVariant } from '@/lib/experiments/windowsVariants'

interface Props {
  intentRoute: IntentRoute
  variant: WindowsVariant
  budget?: BudgetOption
  onBack: () => void
  onNext: () => void
  onEngage?: (points: number) => void
  ctaLabel?: string
}

export function Step5_Results({ intentRoute, variant, budget, onBack, onNext, onEngage, ctaLabel }: Props) {
  const isPremiumBudget = budget === '5k_to_10k'
  const title = intentRoute === 'high_intent'
    ? 'Matched providers ready now'
    : intentRoute === 'mid_intent'
      ? 'Build confidence before you connect'
      : 'Explore and save your options for later'

  const cta = ctaLabel ?? (intentRoute === 'high_intent'
    ? 'Get quotes now'
    : intentRoute === 'mid_intent'
      ? 'Speak to an expert'
      : 'Save my options')

  return (
    <FormLayout currentStep={5} onBack={onBack}>
      <div className='space-y-7 has-sticky-button'>
        <div className='rounded-lg border border-primary-700 bg-primary-300 px-4 py-3 text-primary-700 font-semibold'>
          Recommended by Forbes Advisor {variant === 'cta_b' ? ' - Top contractors' : ''}
        </div>
        <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>{title}</h1>
        <div className='space-y-3'>
          <div className='rounded-lg border border-neutral-200 p-4 bg-white shadow-card'>
            <p className='font-semibold text-neutral-900'>{isPremiumBudget ? 'Premium provider network' : 'Budget-friendly provider network'}</p>
            <p className='text-sm text-neutral-600 mt-1'>Providers shown based on your budget segment and timeline.</p>
            <Button className='mt-3' variant='secondary' onClick={() => onEngage?.(2)}>View provider details</Button>
          </div>
          {intentRoute === 'high_intent' ? (
            <div className='rounded-lg border border-primary-700 p-4 bg-primary-300'>
              <p className='text-sm text-primary-700 font-semibold'>A verified partner will contact you shortly.</p>
            </div>
          ) : null}
          {intentRoute === 'mid_intent' ? (
            <>
              <div className='rounded-lg border border-neutral-200 p-4 bg-neutral-50 shadow-card'>
                <p className='text-sm text-neutral-700'>Pricing ranges: compare expected costs by project size and material.</p>
                <Button className='mt-3' size='sm' variant='secondary' onClick={() => onEngage?.(1)}>View pricing ranges</Button>
              </div>
              <div className='rounded-lg border border-neutral-200 p-4 bg-neutral-50 shadow-card'>
                <p className='text-sm text-neutral-700'>What to expect: timeline, installation process, and prep checklist.</p>
                <Button className='mt-3' size='sm' variant='secondary' onClick={() => onEngage?.(1)}>See what to expect</Button>
              </div>
              <div className='rounded-lg border border-neutral-200 p-4 bg-neutral-50 shadow-card'>
                <p className='text-sm text-neutral-700'>Provider comparisons: review service highlights side by side.</p>
                <Button className='mt-3' size='sm' variant='secondary' onClick={() => onEngage?.(1)}>Compare providers</Button>
              </div>
            </>
          ) : null}
          {intentRoute === 'low_intent' ? (
            <>
              <div className='rounded-lg border border-neutral-200 p-4 bg-neutral-50 shadow-card'>
                <p className='text-sm text-neutral-700'>Educational content: understand repair vs replacement options.</p>
                <Button className='mt-3' size='sm' variant='secondary' onClick={() => onEngage?.(1)}>Read guide</Button>
              </div>
              <div className='rounded-lg border border-neutral-200 p-4 bg-neutral-50 shadow-card'>
                <p className='text-sm text-neutral-700'>Cost breakdown: typical price drivers, labor, and material ranges.</p>
                <Button className='mt-3' size='sm' variant='secondary' onClick={() => onEngage?.(1)}>View cost breakdown</Button>
              </div>
              <div className='rounded-lg border border-neutral-200 p-4 bg-neutral-50 shadow-card'>
                <p className='text-sm text-neutral-700'>Guides: homeowner checklist and estimate-planning tips.</p>
                <Button className='mt-3' size='sm' variant='secondary' onClick={() => onEngage?.(1)}>Open planning guide</Button>
              </div>
            </>
          ) : null}
        </div>
        <StickyButtonContainer>
          <div className='space-y-2'>
            <Button fullWidth showTrailingIcon onClick={() => { onEngage?.(3); onNext() }}>{cta}</Button>
            {intentRoute === 'low_intent' ? (
              <Button fullWidth variant='secondary' onClick={() => { onEngage?.(2); onNext() }}>Get estimates later</Button>
            ) : null}
          </div>
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
