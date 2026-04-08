'use client'

import * as React from 'react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import type { IntentRoute } from './types'

interface Props {
  intentRoute: IntentRoute
  primaryCta: string
  onBack: () => void
  onRestart: () => void
}

export function Step7_Results({ intentRoute, primaryCta, onBack, onRestart }: Props) {
  const [secondsLeft, setSecondsLeft] = React.useState(30)

  React.useEffect(() => {
    if (intentRoute !== 'high_intent') return
    if (secondsLeft <= 0) return
    const timer = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [intentRoute, secondsLeft])

  return (
    <FormLayout currentStep={8} totalSteps={8} onBack={onBack}>
      <div className='space-y-7 has-sticky-button'>
        <div className='rounded-lg border border-primary-700 bg-primary-300 px-4 py-3 text-primary-700 font-semibold'>
          Recommended by Forbes Advisor
        </div>
        <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>Your matched providers are ready</h1>

        {intentRoute === 'high_intent' ? (
          <div className='rounded-lg border border-primary-700 bg-primary-300 p-4 space-y-2'>
            <p className='text-sm text-primary-700 font-semibold'>
              Keep your phone ready. A Forbes Advisor contractor will call you in: {secondsLeft} seconds
            </p>
            <button type='button' className='text-sm underline text-primary-700'>
              Give me more time
            </button>
          </div>
        ) : null}

        <div className='rounded-lg border border-neutral-200 p-4 bg-white shadow-card'>
          {intentRoute === 'high_intent' ? (
            <p className='text-sm text-neutral-700'>Contractors are ready to contact you now.</p>
          ) : null}
          {intentRoute === 'mid_intent' ? (
            <ul className='space-y-2 text-sm text-neutral-700'>
              <li>Pricing ranges tailored to your project size</li>
              <li>What to expect during contractor outreach</li>
              <li>Provider comparisons to help you decide</li>
            </ul>
          ) : null}
          {intentRoute === 'low_intent' ? (
            <ul className='space-y-2 text-sm text-neutral-700'>
              <li>Educational content to compare approaches</li>
              <li>Cost breakdown by project scope</li>
              <li>Guides to plan your next steps</li>
            </ul>
          ) : null}
        </div>

        <StickyButtonContainer>
          <div className='space-y-2'>
            <Button fullWidth showTrailingIcon>
              {primaryCta}
            </Button>
            {intentRoute === 'low_intent' ? (
              <Button fullWidth variant='secondary'>
                Get estimates later
              </Button>
            ) : null}
            <Button fullWidth variant='secondary' onClick={onRestart}>
              Restart journey
            </Button>
          </div>
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
