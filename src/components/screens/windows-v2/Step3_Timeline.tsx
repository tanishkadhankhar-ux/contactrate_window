'use client'

import { FormLayout } from '@/components/layout/FormLayout'
import { RadioGroup, RadioListItem } from '@/components/ui/RadioCard'
import { TIMELINE_OPTIONS, type Timeline } from './types'

interface Props {
  value?: Timeline
  onBack: () => void
  onSelect: (value: Timeline) => void
}

export function Step3_Timeline({ value, onBack, onSelect }: Props) {
  return (
    <FormLayout currentStep={4} totalSteps={8} onBack={onBack}>
      <div className='space-y-7'>
        <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
          When are you planning to start this project?
        </h1>
        <RadioGroup value={value} onValueChange={(v) => onSelect(v as Timeline)}>
          {TIMELINE_OPTIONS.map((option) => (
            <RadioListItem key={option.value} value={option.value}>
              <span className='inline-flex items-center'>
                {option.label}
                {option.value === 'immediately' ? (
                  <span className='ml-2 inline-flex rounded-full bg-primary-300 px-2 py-0.5 text-xs font-medium text-primary-700'>
                    Most popular
                  </span>
                ) : null}
              </span>
            </RadioListItem>
          ))}
        </RadioGroup>
        <div className='rounded-lg border border-neutral-200 bg-neutral-50 p-4'>
          <p className='text-body-sm text-neutral-700'>Contractor availability updates in real time based on your timeline.</p>
        </div>
      </div>
    </FormLayout>
  )
}
