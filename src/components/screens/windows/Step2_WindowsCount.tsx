'use client'

import * as React from 'react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { Input } from '@/components/ui/Input'

interface Props {
  value?: number
  onBack: () => void
  onNext: (value: number) => void
}

export function Step2_WindowsCount({ value, onBack, onNext }: Props) {
  const [count, setCount] = React.useState(value ? String(value) : '')

  return (
    <FormLayout currentStep={2} onBack={onBack}>
      <div className='space-y-6 has-sticky-button'>
        <h1 className='font-display text-display sm:text-display-lg text-neutral-900'>How many windows?</h1>
        <Input
          label='Number of windows'
          type='number'
          min={1}
          placeholder='e.g. 8'
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <StickyButtonContainer>
          <Button
            fullWidth
            showTrailingIcon
            disabled={!count || Number(count) < 1}
            onClick={() => onNext(Number(count))}
          >
            Continue
          </Button>
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
