'use client'

import * as React from 'react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { RadioGroup, RadioListItem } from '@/components/ui/RadioCard'
import type { ContactOption, IntentRoute } from '@/types/windowsFunnel'

interface Props {
  intentRoute: IntentRoute
  value?: ContactOption
  onBack: () => void
  onSubmit: (value: ContactOption) => void
}

const OPTIONS: Record<IntentRoute, Array<{ value: ContactOption; label: string }>> = {
  high_intent: [
    { value: 'call_now', label: 'Call me now' },
    { value: 'schedule_call', label: 'Schedule call (30 mins / 1 hr)' },
  ],
  mid_intent: [
    { value: 'schedule_call', label: 'Schedule call' },
    { value: 'sms', label: 'SMS follow-up' },
  ],
  low_intent: [
    { value: 'email_first', label: 'Email-first updates' },
    { value: 'sms', label: 'Optional SMS' },
  ],
}

export function Step6_PreContact({ intentRoute, value, onBack, onSubmit }: Props) {
  const [selected, setSelected] = React.useState<ContactOption | undefined>(value)

  return (
    <FormLayout currentStep={6} onBack={onBack}>
      <div className='space-y-6 has-sticky-button'>
        <h1 className='font-display text-display sm:text-display-lg text-neutral-900'>Here is what happens next</h1>
        <div className='rounded-lg border border-neutral-200 bg-neutral-50 p-4 space-y-2'>
          <p className='text-sm text-neutral-800'><strong>Who:</strong> A Forbes Advisor verified partner</p>
          <p className='text-sm text-neutral-800'><strong>When:</strong> Based on your selected option</p>
          <p className='text-sm text-neutral-800'><strong>Why:</strong> To review options, not a sales call</p>
        </div>

        <RadioGroup value={selected} onValueChange={(v) => setSelected(v as ContactOption)}>
          {OPTIONS[intentRoute].map((opt) => (
            <RadioListItem key={opt.value} value={opt.value}>{opt.label}</RadioListItem>
          ))}
        </RadioGroup>

        <StickyButtonContainer>
          <Button fullWidth showTrailingIcon disabled={!selected} onClick={() => selected && onSubmit(selected)}>
            Finish
          </Button>
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
