'use client'

import * as React from 'react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { RadioGroup, RadioListItem } from '@/components/ui/RadioCard'
import type { ContactOption, IntentRoute } from '@/types/windowsFunnel'
import type { WindowsVariant } from '@/lib/experiments/windowsVariants'

interface Props {
  intentRoute: IntentRoute
  variant: WindowsVariant
  value?: ContactOption
  onBack: () => void
  onSubmit: (value: ContactOption) => void
  continueLabel?: string
}

const OPTIONS: Array<{ value: ContactOption; label: string }> = [
  { value: 'call_now', label: 'Call me now' },
  { value: 'schedule_call', label: 'Schedule a call' },
  { value: 'sms', label: 'Text me instead' },
]

function OptionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className='ml-2 inline-flex rounded-full bg-primary-300 px-2 py-0.5 text-xs font-medium text-primary-700'>
      {children}
    </span>
  )
}

export function Step6_PreContact({ intentRoute, variant, value, onBack, onSubmit, continueLabel }: Props) {
  const [selected, setSelected] = React.useState<ContactOption | undefined>(value)
  const whenLine = intentRoute === 'high_intent'
    ? 'Within 30 minutes'
    : 'Based on your selection'

  return (
    <FormLayout currentStep={6} onBack={onBack}>
      <div className='space-y-6 has-sticky-button'>
        <h1 className='font-display text-display sm:text-display-lg text-neutral-900'>Here&apos;s what happens next</h1>
        <div className='rounded-lg border border-neutral-200 bg-neutral-50 p-4 space-y-2'>
          <p className='text-sm text-neutral-800'><strong>Who:</strong> A Forbes Advisor verified partner</p>
          <p className='text-sm text-neutral-800'><strong>When:</strong> {whenLine}</p>
          <p className='text-sm text-neutral-800'><strong>Why:</strong> To review options, not a sales call</p>
        </div>

        <RadioGroup value={selected} onValueChange={(v) => setSelected(v as ContactOption)}>
          {OPTIONS.map((opt, idx) => (
            <RadioListItem key={opt.value} value={opt.value}>
              <span className='inline-flex items-center'>
                {opt.label}
                {idx === 0 ? <OptionBadge>Recommended</OptionBadge> : null}
                {idx === 1 ? <OptionBadge>Most popular</OptionBadge> : null}
              </span>
            </RadioListItem>
          ))}
        </RadioGroup>
        {variant === 'cta_b' ? (
          <p className='text-xs text-neutral-500'>You stay in control and can adjust your contact preference later.</p>
        ) : null}

        <StickyButtonContainer>
          <Button fullWidth showTrailingIcon disabled={!selected} onClick={() => selected && onSubmit(selected)}>
            {continueLabel ?? 'Finish'}
          </Button>
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
