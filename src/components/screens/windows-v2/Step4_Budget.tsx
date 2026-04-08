'use client'

import { FormLayout } from '@/components/layout/FormLayout'
import { RadioGroup, RadioListItem } from '@/components/ui/RadioCard'
import { BUDGET_OPTIONS, type Budget } from './types'

interface Props {
  value?: Budget
  onBack: () => void
  onSelect: (value: Budget) => void
}

export function Step4_Budget({ value, onBack, onSelect }: Props) {
  return (
    <FormLayout currentStep={5} totalSteps={8} onBack={onBack}>
      <div className='space-y-7'>
        <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
          What is your expected budget range?
        </h1>
        <RadioGroup value={value} onValueChange={(v) => onSelect(v as Budget)}>
          {BUDGET_OPTIONS.map((option) => (
            <RadioListItem key={option.value} value={option.value}>
              <span className='inline-flex items-center'>
                {option.label}
                {option.value === '2k_to_5k' ? (
                  <span className='ml-2 inline-flex rounded-full bg-primary-300 px-2 py-0.5 text-xs font-medium text-primary-700'>
                    Recommended
                  </span>
                ) : null}
              </span>
            </RadioListItem>
          ))}
        </RadioGroup>
        <p className='text-body-sm text-neutral-500'>
          A typical window repair or replacement in your area falls within this range. We&apos;ll match you with contractors
          aligned to your expectations.
        </p>
        <div className='rounded-lg border border-neutral-200 bg-neutral-50 p-4'>
          <p className='text-body-sm text-neutral-700'>Providers quoted through Forbes Advisor report up to 30% cost variance by scope.</p>
        </div>
      </div>
    </FormLayout>
  )
}
