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
  canProceedPii,
  classifyWindowSegment,
  getInterstitialDurationMs,
  mapSegmentToIntent,
} from '@/components/screens/windows-v2/utils'
import { getWindowsVariant, getWindowsVariantConfig } from '@/lib/experiments/windowsVariants'
import { trackWindowsEvent } from '@/lib/analytics/windowsEvents'

const STEP_ORDER: WindowsV2Step[] = [0, 1, 2, 3, 4, 'interstitial', 5, 6, 7]

export default function WindowsJourneyV2Route() {
  const [step, setStep] = React.useState<WindowsV2Step>(0)
  const [state, setState] = React.useState<WindowsV2JourneyState>(initialWindowsV2State)
  const variant = React.useMemo(() => getWindowsVariant('windows-v2-route'), [])
  const variantConfig = React.useMemo(() => getWindowsVariantConfig(variant), [variant])

  const update = (patch: Partial<WindowsV2JourneyState>) => setState((prev) => ({ ...prev, ...patch }))
  const next = () => {
    const idx = STEP_ORDER.indexOf(step)
    if (idx >= 0 && idx < STEP_ORDER.length - 1) setStep(STEP_ORDER[idx + 1])
  }

  const back = () => {
    if (step === 6) {
      if (state.windowSegment === 'VIP_URGENT') {
        setStep(4)
        return
      }
      setStep(5)
      return
    }
    if (step === 5) {
      setStep(4)
      return
    }
    if (step === 'interstitial') {
      setStep(4)
      return
    }
    const idx = STEP_ORDER.indexOf(step)
    if (idx > 0) setStep(STEP_ORDER[idx - 1])
  }

  const restart = () => {
    setState(initialWindowsV2State)
    setStep(0)
  }

  React.useEffect(() => {
    trackWindowsEvent('windows_v2_step_view', {
      step,
      variant,
      intent: state.intentRoute,
      segment: state.windowSegment,
    })
  }, [step, variant, state.intentRoute, state.windowSegment])

  React.useEffect(() => {
    if (step === 5 && state.windowSegment === 'VIP_URGENT') {
      setStep(6)
    }
  }, [step, state.windowSegment])

  React.useEffect(() => {
    if (step !== 'interstitial') return
    const segment = state.windowSegment
    if (!segment) {
      setStep(4)
      return
    }
    const duration = getInterstitialDurationMs(segment)
    const timer = window.setTimeout(() => {
      if (segment === 'VIP_URGENT') setStep(6)
      else setStep(5)
    }, duration)
    return () => clearTimeout(timer)
  }, [step, state.windowSegment])

  const zipDisplay = state.zipCode.replace(/\D/g, '').slice(0, 5)

  if (step === 0) {
    return (
      <Step0_Landing
        zipCode={zipDisplay}
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
          window.setTimeout(() => next(), 180)
        }}
      />
    )
  }

  if (step === 4) {
    return (
      <Step4_Budget
        value={state.budget}
        onBack={back}
        onSelect={(budget) => {
          const windowSegment = classifyWindowSegment(state.timeline, budget)
          const intentRoute = mapSegmentToIntent(windowSegment)
          update({ budget, windowSegment, intentRoute })
          window.setTimeout(() => setStep('interstitial'), 180)
        }}
      />
    )
  }

  if (step === 'interstitial') {
    const segment = state.windowSegment ?? 'PLANNED'
    return <InterstitialMatching segment={segment} onBack={back} />
  }

  if (step === 5) {
    const segment = state.windowSegment ?? 'PLANNED'
    if (segment === 'VIP_URGENT') {
      return null
    }
    return (
      <Step5_PreContact
        segment={segment}
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
    const segment = state.windowSegment ?? 'PLANNED'
    return (
      <Step6_UserDetails
        state={state}
        segment={segment}
        canContinue={canProceedPii(state)}
        onBack={back}
        onNext={next}
        onUpdate={update}
      />
    )
  }

  const segment = state.windowSegment ?? 'PLANNED'
  const intentRoute = state.intentRoute ?? mapSegmentToIntent(segment)
  const resultsPrimaryCta = variantConfig.resultsCtaByIntent[intentRoute]

  return (
    <Step7_Results
      segment={segment}
      intentRoute={intentRoute}
      primaryCta={resultsPrimaryCta}
      zipDisplay={zipDisplay || 'your area'}
      vipCallTriggered={state.vipCallTriggered}
      onBack={back}
      onRestart={restart}
    />
  )
}
