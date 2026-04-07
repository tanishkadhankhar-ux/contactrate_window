'use client'

import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { RadioGroup, RadioListItem } from '@/components/ui/RadioCard'
import { PROJECT_TYPE_OPTIONS, type ProjectType } from '@/types/windowsFunnel'

interface Props {
  value?: ProjectType
  onBack?: () => void
  onNext: (value: ProjectType) => void
}

export function Step1_ProjectType({ value, onBack, onNext }: Props) {
  return (
    <FormLayout currentStep={1} onBack={onBack}>
      <div className='space-y-6 has-sticky-button'>
        <h1 className='font-display text-display sm:text-display-lg text-neutral-900'>Project type</h1>
        <p className='text-body text-neutral-500 -mt-3'>Choose the option that best describes your window project.</p>
        <RadioGroup value={value} onValueChange={(v) => onNext(v as ProjectType)}>
          {PROJECT_TYPE_OPTIONS.map((option, idx) => (
            <RadioListItem key={option.value} value={option.value} letter={String.fromCharCode(65 + idx)}>
              {option.label}
            </RadioListItem>
          ))}
        </RadioGroup>
        <StickyButtonContainer>
          <Button fullWidth disabled>
            Select an option
          </Button>
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
