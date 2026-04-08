'use client'

import { FormLayout } from '@/components/layout/FormLayout'
import { RadioGroup, RadioListItem } from '@/components/ui/RadioCard'
import { WINDOW_COUNT_OPTIONS, type WindowCountOption } from './types'

interface Props {
  value?: WindowCountOption
  onBack: () => void
  onSelect: (value: WindowCountOption) => void
}

export function Step2_WindowCount({ value, onBack, onSelect }: Props) {
  return (
    <FormLayout currentStep={3} totalSteps={8} onBack={onBack}>
      <div className='space-y-7'>
        <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
          How many windows are you working on?
        </h1>
        <RadioGroup value={value} onValueChange={(v) => onSelect(v as WindowCountOption)}>
          {WINDOW_COUNT_OPTIONS.map((option) => (
            <RadioListItem key={option.value} value={option.value}>
              {option.label}
            </RadioListItem>
          ))}
        </RadioGroup>
        <div className='rounded-lg border border-neutral-200 bg-neutral-50 p-4'>
          <p className='text-body-sm text-neutral-700'>Most users complete this step in under 10 seconds.</p>
        </div>
      </div>
    </FormLayout>
  )
}
