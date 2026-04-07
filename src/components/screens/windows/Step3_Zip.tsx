'use client'

import * as React from 'react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { Input } from '@/components/ui/Input'

interface Props {
  value?: string
  onBack: () => void
  onNext: (value: string) => void
}

export function Step3_Zip({ value, onBack, onNext }: Props) {
  const [zip, setZip] = React.useState(value ?? '')
  const cleaned = zip.replace(/\D/g, '').slice(0, 5)

  return (
    <FormLayout currentStep={3} onBack={onBack}>
      <div className='space-y-6 has-sticky-button'>
        <h1 className='font-display text-display sm:text-display-lg text-neutral-900'>Your ZIP code</h1>
        <Input
          label='ZIP code'
          placeholder='e.g. 10001'
          value={cleaned}
          onChange={(e) => setZip(e.target.value)}
          maxLength={5}
          inputMode='numeric'
        />
        <StickyButtonContainer>
          <Button fullWidth showTrailingIcon disabled={cleaned.length !== 5} onClick={() => onNext(cleaned)}>
            Continue
          </Button>
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
