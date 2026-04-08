'use client'

import * as React from 'react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { Input } from '@/components/ui/Input'
import type { WindowSegment, WindowsV2JourneyState } from './types'
import { formatPhone } from './utils'

interface Props {
  state: WindowsV2JourneyState
  segment: WindowSegment
  canContinue: boolean
  onBack: () => void
  onNext: () => void
  onUpdate: (patch: Partial<WindowsV2JourneyState>) => void
}

function valueMessageForSegment(segment: WindowSegment): string {
  switch (segment) {
    case 'VIP_URGENT':
      return 'You could receive quotes from top contractors within minutes'
    case 'SENSITIVE':
      return 'We’ll text a rough estimate first—add your mobile so we can reach you.'
    case 'PLANNED':
      return 'We’ll match you with providers based on your chosen consultation window.'
    case 'CURIOUS':
      return 'Get your personalized project report by email—explore options at your own pace.'
    default:
      return 'Tell us how to reach you'
  }
}

export function Step6_UserDetails({ state, segment, canContinue, onBack, onNext, onUpdate }: Props) {
  const [vipSecondsLeft, setVipSecondsLeft] = React.useState<number | null>(null)
  const vipCompleteRef = React.useRef(false)
  const isVip = segment === 'VIP_URGENT'
  const isCurious = segment === 'CURIOUS'

  React.useEffect(() => {
    if (vipSecondsLeft === null || vipSecondsLeft <= 0) return
    const t = window.setTimeout(() => setVipSecondsLeft((s) => (s === null ? null : s - 1)), 1000)
    return () => clearTimeout(t)
  }, [vipSecondsLeft])

  React.useEffect(() => {
    if (vipSecondsLeft !== 0 || !isVip || vipCompleteRef.current) return
    vipCompleteRef.current = true
    onNext()
  }, [vipSecondsLeft, isVip, onNext])

  const startVipCountdown = () => {
    if (!canContinue) return
    vipCompleteRef.current = false
    onUpdate({ vipCallTriggered: true })
    setVipSecondsLeft(30)
  }

  const showPhone = !isCurious
  const piiReady = canContinue
  const vipWaiting = isVip && vipSecondsLeft !== null && vipSecondsLeft > 0

  return (
    <FormLayout currentStep={8} totalSteps={8} onBack={onBack}>
      <div className='space-y-7 has-sticky-button'>
        <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
          {isCurious ? 'Send my project report' : 'Tell us where to send your matches'}
        </h1>
        <div className='rounded-lg border border-primary-700 bg-primary-300 px-4 py-3 text-primary-700 text-sm font-semibold'>
          {valueMessageForSegment(segment)}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <Input label='First Name' value={state.firstName} onChange={(e) => onUpdate({ firstName: e.target.value })} />
          <Input label='Last Name' value={state.lastName} onChange={(e) => onUpdate({ lastName: e.target.value })} />
        </div>
        <Input label='Email' type='email' value={state.email} onChange={(e) => onUpdate({ email: e.target.value })} />
        {showPhone ? (
          <Input
            label='Phone Number'
            value={state.phone}
            inputMode='numeric'
            onChange={(e) => onUpdate({ phone: formatPhone(e.target.value) })}
          />
        ) : null}

        {isVip ? (
          <div className='rounded-lg border border-neutral-200 bg-neutral-50 p-4 space-y-3'>
            <p className='text-body-sm text-neutral-700'>
              When you&apos;re ready, start your priority call window. We&apos;ll queue a contractor to reach you.
            </p>
            <Button type='button' fullWidth disabled={!piiReady || vipWaiting} onClick={startVipCountdown}>
              Click to receive your priority quote call.
            </Button>
            {vipWaiting ? (
              <p className='text-sm font-semibold text-primary-700 text-center'>
                Priority call window: {vipSecondsLeft}s
              </p>
            ) : null}
          </div>
        ) : null}

        <StickyButtonContainer>
          {isVip ? null : (
            <Button fullWidth showTrailingIcon disabled={!canContinue} onClick={onNext}>
              See my matches
            </Button>
          )}
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
