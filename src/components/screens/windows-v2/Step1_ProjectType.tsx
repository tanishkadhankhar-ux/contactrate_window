'use client'

import { FormLayout } from '@/components/layout/FormLayout'
import { RadioGroup, RadioListItem } from '@/components/ui/RadioCard'
import { PROJECT_OPTIONS, type ProjectType } from './types'

interface Props {
  value?: ProjectType
  onBack: () => void
  onSelect: (value: ProjectType) => void
}

export function Step1_ProjectType({ value, onBack, onSelect }: Props) {
  return (
    <FormLayout currentStep={2} totalSteps={8} onBack={onBack}>
      <div className='space-y-7'>
        <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
          What type of window project are you considering?
        </h1>
        <RadioGroup value={value} onValueChange={(v) => onSelect(v as ProjectType)}>
          {PROJECT_OPTIONS.map((option) => (
            <RadioListItem key={option.value} value={option.value}>
              {option.value === 'repair' ? 'Repair' : option.value === 'replace' ? 'Replace' : 'Install'}
            </RadioListItem>
          ))}
        </RadioGroup>
        <div className='rounded-lg border border-neutral-200 bg-neutral-50 p-4'>
          <p className='text-body-sm text-neutral-700'>
            Trusted network: 100k+ homeowners matched with Forbes Advisor contractors.
          </p>
        </div>
      </div>
    </FormLayout>
  )
}
