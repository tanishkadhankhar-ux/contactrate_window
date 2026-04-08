'use client'

import { FormLayout } from '@/components/layout/FormLayout'
import { RadioGroup, RadioListItem } from '@/components/ui/RadioCard'
import type { ContactPreference, WindowSegment } from './types'

interface Props {
  segment: WindowSegment
  value?: ContactPreference
  onBack: () => void
  onSelect: (value: ContactPreference) => void
  textUpdatesOptIn: boolean
  onTextUpdatesOptInChange: (checked: boolean) => void
}

export function Step5_PreContact({
  segment,
  value,
  onBack,
  onSelect,
  textUpdatesOptIn,
  onTextUpdatesOptInChange,
}: Props) {
  if (segment === 'VIP_URGENT') {
    return null
  }

  if (segment === 'SENSITIVE') {
    return (
      <FormLayout currentStep={7} totalSteps={8} onBack={onBack}>
        <div className='space-y-7'>
          <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
            Get your estimate by text
          </h1>
          <p className='text-body text-neutral-500 -mt-3'>
            Get a rough estimate via text in 2 minutes.
          </p>
          <RadioGroup value={value} onValueChange={(v) => onSelect(v as ContactPreference)}>
            <RadioListItem value='text_me'>Text me a rough estimate</RadioListItem>
            <RadioListItem value='email_options'>Email me instead</RadioListItem>
            <RadioListItem value='call_later'>Call me later</RadioListItem>
          </RadioGroup>
        </div>
      </FormLayout>
    )
  }

  if (segment === 'PLANNED') {
    return (
      <FormLayout currentStep={7} totalSteps={8} onBack={onBack}>
        <div className='space-y-7'>
          <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
            Schedule your consultation
          </h1>
          <p className='text-body text-neutral-500 -mt-3'>
            Pick a time for a 5-minute price consultation.
          </p>
          <div className='space-y-3'>
            <div className='rounded-lg border border-neutral-200 bg-neutral-50 p-4'>
              <div className='text-body-sm text-neutral-500 mb-3 pb-3 border-b border-neutral-200'>
                Available slots
              </div>
              <RadioGroup value={value} onValueChange={(v) => onSelect(v as ContactPreference)}>
                <RadioListItem value='schedule_30'>In 30 minutes</RadioListItem>
                <RadioListItem value='schedule_1h'>In 1 hour</RadioListItem>
                <RadioListItem value='schedule_weekend'>Weekend</RadioListItem>
              </RadioGroup>
            </div>
            <button
              type='button'
              onClick={() => {
                onSelect('text_me')
              }}
              className={`radio-card text-left ${value === 'text_me' ? 'border-primary-700 bg-primary-300' : ''}`}
            >
              Text me instead
            </button>
          </div>
        </div>
      </FormLayout>
    )
  }

  /* CURIOUS */
  return (
    <FormLayout currentStep={7} totalSteps={8} onBack={onBack}>
      <div className='space-y-7'>
        <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
          Where should we send your project report?
        </h1>
        <p className='text-body text-neutral-500 -mt-3'>
          We&apos;ll email your personalized window project summary—no phone required for this step.
        </p>
        <RadioGroup value={value} onValueChange={(v) => onSelect(v as ContactPreference)}>
          <RadioListItem value='email_options'>Email my project report</RadioListItem>
        </RadioGroup>
        <label className='flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4'>
          <input
            type='checkbox'
            checked={textUpdatesOptIn}
            onChange={(e) => onTextUpdatesOptInChange(e.target.checked)}
            className='mt-1'
          />
          <span className='text-xs text-neutral-600'>Text me updates (optional)</span>
        </label>
      </div>
    </FormLayout>
  )
}
