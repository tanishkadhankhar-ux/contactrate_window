'use client'

import * as React from 'react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import type { IntentRoute, WindowSegment } from './types'

interface Props {
  segment: WindowSegment
  intentRoute: IntentRoute
  primaryCta: string
  zipDisplay: string
  vipCallTriggered?: boolean
  onBack: () => void
  onRestart: () => void
}

const VERIFICATION_LINES = (zip: string) =>
  [
    'Verified Local Licenses',
    'Insurance & Bonded Status',
    `Recent 5-Star Reviews in ${zip}`,
  ] as const

export function Step7_Results({
  segment,
  intentRoute,
  primaryCta,
  zipDisplay,
  vipCallTriggered,
  onBack,
  onRestart,
}: Props) {
  const [visibleCards, setVisibleCards] = React.useState(0)

  React.useEffect(() => {
    setVisibleCards(0)
    const ids = [
      window.setTimeout(() => setVisibleCards(1), 500),
      window.setTimeout(() => setVisibleCards(2), 1000),
      window.setTimeout(() => setVisibleCards(3), 1500),
    ]
    return () => ids.forEach((id) => clearTimeout(id))
  }, [zipDisplay])

  const lines = VERIFICATION_LINES(zipDisplay || 'your area')

  return (
    <FormLayout currentStep={8} totalSteps={8} onBack={onBack}>
      <div className='space-y-7 has-sticky-button'>
        <div className='rounded-lg border border-primary-700 bg-primary-300 px-4 py-3 text-primary-700 font-semibold'>
          Recommended by Forbes Advisor
        </div>
        <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
          {segment === 'VIP_URGENT' && vipCallTriggered ? 'Connecting you with a Pro now...' : 'Your matched providers are ready'}
        </h1>

        {segment === 'VIP_URGENT' && vipCallTriggered ? (
          <div className='rounded-lg border border-primary-700 bg-primary-300 p-4'>
            <p className='text-sm text-primary-700 font-semibold'>
              Your priority quote call is queued. Keep your phone nearby—an advisor may reach out shortly.
            </p>
          </div>
        ) : null}

        <div className='space-y-3'>
          <p className='text-body-sm font-semibold text-neutral-900'>Live match verification</p>
          {lines.slice(0, visibleCards).map((label, i) => (
            <div
              key={label}
              className='animate-fade-in rounded-lg border border-neutral-200 bg-white p-4 shadow-card flex items-center justify-between gap-3'
            >
              <span className='text-sm text-neutral-800'>{label}</span>
              <span className='text-feedback-success font-semibold text-sm shrink-0'>✓</span>
            </div>
          ))}
        </div>

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
