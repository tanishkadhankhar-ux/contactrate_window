'use client'

import * as React from 'react'
import {
  InterstitialMatching,
  Step0_Landing,
  Step1_ProjectType,
  Step2_WindowCount,
  Step3_Timeline,
  Step4_Budget,
  Step5_PreContact,
  Step6_UserDetails,
  Step7_Results,
} from '@/components/screens/windows-v2'
import { initialWindowsV2State, type WindowsV2JourneyState, type WindowsV2Step } from '@/components/screens/windows-v2/types'
import {
  canProceedStepOne,
  canProceedStepSeven,
  classifyIntent,
} from '@/components/screens/windows-v2/utils'
import { getWindowsVariant, getWindowsVariantConfig } from '@/lib/experiments/windowsVariants'
import { trackWindowsEvent } from '@/lib/analytics/windowsEvents'

export default function WindowsJourneyV2Route() {
  const [step, setStep] = React.useState<WindowsV2Step>(0)
  const [state, setState] = React.useState<WindowsV2JourneyState>(initialWindowsV2State)
  const variant = React.useMemo(() => getWindowsVariant('windows-v2-route'), [])
  const variantConfig = React.useMemo(() => getWindowsVariantConfig(variant), [variant])

  const update = (patch: Partial<WindowsV2JourneyState>) => setState((prev) => ({ ...prev, ...patch }))
  const next = () => {
    const order: WindowsV2Step[] = [0, 1, 2, 3, 'interstitial', 4, 5, 6, 7]
    const idx = order.indexOf(step)
    if (idx >= 0 && idx < order.length - 1) setStep(order[idx + 1])
  }
  const back = () => {
    if (step === 6 && state.intentRoute === 'high_intent') {
      setStep(4)
      return
    }
    const order: WindowsV2Step[] = [0, 1, 2, 3, 'interstitial', 4, 5, 6, 7]
    const idx = order.indexOf(step)
    if (idx > 0) setStep(order[idx - 1])
  }
  const restart = () => {
    setState(initialWindowsV2State)
    setStep(0)
  }

  React.useEffect(() => {
    trackWindowsEvent('windows_v2_step_view', { step, variant, intent: state.intentRoute })
  }, [step, variant, state.intentRoute])

  React.useEffect(() => {
    if (step !== 'interstitial') return
    const timer = window.setTimeout(() => setStep(4), 1400)
    return () => window.clearTimeout(timer)
  }, [step])

  if (step === 0) {
    return (
      <Step0_Landing
        zipCode={state.zipCode.replace(/\D/g, '').slice(0, 5)}
        canContinue={canProceedStepOne(state)}
        onBack={() => {
          window.location.href = '/'
        }}
        onNext={next}
        onZipChange={(zipCode) => update({ zipCode })}
      />
    )
  }

  if (step === 1) {
    return (
      <Step1_ProjectType
        value={state.projectType}
        onBack={back}
        onSelect={(projectType) => {
          update({ projectType })
          window.setTimeout(() => next(), 180)
        }}
      />
    )
  }

  if (step === 2) {
    return (
      <Step2_WindowCount
        value={state.windowsCount}
        onBack={back}
        onSelect={(windowsCount) => {
          update({ windowsCount })
          window.setTimeout(() => next(), 180)
        }}
      />
    )
  }

  if (step === 3) {
    return (
      <Step3_Timeline
        value={state.timeline}
        onBack={back}
        onSelect={(timeline) => {
          update({ timeline })
          window.setTimeout(() => setStep('interstitial'), 180)
        }}
      />
    )
  }

  if (step === 'interstitial') {
    return <InterstitialMatching onBack={back} />
  }

  if (step === 4) {
    return (
      <Step4_Budget
        value={state.budget}
        onBack={back}
        onSelect={(budget) => {
          update({ budget })
          const intentRoute = classifyIntent(state.timeline, budget)
          update({ intentRoute })
          window.setTimeout(() => {
            if (intentRoute === 'high_intent') {
              setStep(6)
              return
            }
            next()
          }, 180)
        }}
      />
    )
  }

  if (step === 5) {
    const route = state.intentRoute ?? 'low_intent'

    return (
      <Step5_PreContact
        intentRoute={route}
        value={state.contactPreference}
        textUpdatesOptIn={state.textUpdatesOptIn}
        onBack={back}
        onSelect={(contactPreference) => {
          update({ contactPreference })
          window.setTimeout(() => next(), 180)
        }}
        onTextUpdatesOptInChange={(textUpdatesOptIn) => update({ textUpdatesOptIn })}
      />
    )
  }

  if (step === 6) {
    return (
      <Step6_UserDetails
        state={state}
        intentRoute={state.intentRoute ?? 'low_intent'}
        canContinue={canProceedStepSeven(state)}
        onBack={back}
        onNext={next}
        onUpdate={update}
      />
    )
  }

  const route = state.intentRoute ?? 'low_intent'
  const resultsPrimaryCta = variantConfig.resultsCtaByIntent[route]

  return <Step7_Results intentRoute={route} primaryCta={resultsPrimaryCta} onBack={back} onRestart={restart} />
}
