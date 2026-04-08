'use client'

import * as React from 'react'
import { FormLayout } from '@/components/layout/FormLayout'
import { RadioGroup, RadioListItem } from '@/components/ui/RadioCard'
import type { ContactPreference, IntentRoute } from './types'

interface Props {
  intentRoute: IntentRoute
  value?: ContactPreference
  onBack: () => void
  onSelect: (value: ContactPreference) => void
  textUpdatesOptIn: boolean
  onTextUpdatesOptInChange: (checked: boolean) => void
}

export function Step5_PreContact({
  intentRoute,
  value,
  onBack,
  onSelect,
  textUpdatesOptIn,
  onTextUpdatesOptInChange,
}: Props) {
  const isMid = intentRoute === 'mid_intent'
  const isLow = intentRoute === 'low_intent'
  const [midPrimary, setMidPrimary] = React.useState<'call_now' | 'schedule' | 'text_me'>(() => {
    if (value === 'call_now') return 'call_now'
    if (value === 'text_me') return 'text_me'
    if (value === 'schedule_30' || value === 'schedule_1h' || value === 'schedule_weekend') return 'schedule'
    return 'call_now'
  })

  return (
    <FormLayout currentStep={6} totalSteps={8} onBack={onBack}>
      <div className='space-y-7'>
        <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
          {isLow ? 'How would you like us to follow up?' : "Choose how you'd like to connect"}
        </h1>
        {isMid ? (
          <div className='space-y-3'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <button
                type='button'
                onClick={() => {
                  setMidPrimary('call_now')
                  onSelect('call_now')
                }}
                className={`radio-card text-left ${value === 'call_now' ? 'border-primary-700 bg-primary-300' : ''}`}
              >
                Call me now
              </button>
              <button
                type='button'
                onClick={() => setMidPrimary('schedule')}
                className={`radio-card text-left ${
                  midPrimary === 'schedule' ? 'border-primary-700 bg-primary-300' : ''
                }`}
              >
                Schedule call
              </button>
            </div>

            {midPrimary === 'schedule' ? (
              <div className='rounded-lg border border-neutral-200 bg-neutral-50 p-4'>
                <div className='text-body-sm text-neutral-500 mb-3 pb-3 border-b border-neutral-200'>Choose a time</div>
                <RadioGroup value={value} onValueChange={(v) => onSelect(v as ContactPreference)}>
                  <RadioListItem value='schedule_30'>In 30 minutes</RadioListItem>
                  <RadioListItem value='schedule_1h'>In 1 hour</RadioListItem>
                  <RadioListItem value='schedule_weekend'>Weekend</RadioListItem>
                </RadioGroup>
              </div>
            ) : null}

            <button
              type='button'
              onClick={() => {
                setMidPrimary('text_me')
                onSelect('text_me')
              }}
              className={`radio-card text-left ${value === 'text_me' ? 'border-primary-700 bg-primary-300' : ''}`}
            >
              Text me instead
            </button>
          </div>
        ) : null}

        {isLow ? (
          <RadioGroup value={value} onValueChange={(v) => onSelect(v as ContactPreference)}>
            <RadioListItem value='email_options'>Email me my options</RadioListItem>
            <RadioListItem value='call_later'>Call me later</RadioListItem>
          </RadioGroup>
        ) : null}

        {isLow ? (
          <label className='flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4'>
            <input
              type='checkbox'
              checked={textUpdatesOptIn}
              onChange={(e) => onTextUpdatesOptInChange(e.target.checked)}
              className='mt-1'
            />
            <span className='text-xs text-neutral-600'>Text me updates (optional)</span>
          </label>
        ) : null}
      </div>
    </FormLayout>
  )
}
