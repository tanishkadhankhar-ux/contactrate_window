'use client'

import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { Input } from '@/components/ui/Input'
import type { IntentRoute, WindowsV2JourneyState } from './types'
import { formatPhone } from './utils'

interface Props {
  state: WindowsV2JourneyState
  intentRoute: IntentRoute
  canContinue: boolean
  onBack: () => void
  onNext: () => void
  onUpdate: (patch: Partial<WindowsV2JourneyState>) => void
}

export function Step6_UserDetails({ state, intentRoute, canContinue, onBack, onNext, onUpdate }: Props) {
  const valueMessage =
    intentRoute === 'high_intent'
      ? 'You could receive quotes from top contractors within minutes'
      : intentRoute === 'mid_intent'
        ? 'We’ll match you with providers based on your needs and schedule'
        : 'Get personalized estimates and explore options at your own pace'

  return (
    <FormLayout currentStep={7} totalSteps={8} onBack={onBack}>
      <div className='space-y-7 has-sticky-button'>
        <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>Tell us where to send your matches</h1>
        <div className='rounded-lg border border-primary-700 bg-primary-300 px-4 py-3 text-primary-700 text-sm font-semibold'>
          {valueMessage}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <Input label='First Name' value={state.firstName} onChange={(e) => onUpdate({ firstName: e.target.value })} />
          <Input label='Last Name' value={state.lastName} onChange={(e) => onUpdate({ lastName: e.target.value })} />
        </div>
        <Input label='Email' type='email' value={state.email} onChange={(e) => onUpdate({ email: e.target.value })} />
        <Input
          label='Phone Number'
          value={state.phone}
          inputMode='numeric'
          onChange={(e) => onUpdate({ phone: formatPhone(e.target.value) })}
        />
        <StickyButtonContainer>
          <Button fullWidth showTrailingIcon disabled={!canContinue} onClick={onNext}>
            See my matches
          </Button>
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
