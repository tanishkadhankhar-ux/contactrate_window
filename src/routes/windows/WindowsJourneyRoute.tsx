'use client'

import * as React from 'react'
import {
  Step1_ProjectType,
  Step2_WindowsCount,
  Step3_Zip,
  Step4_Intent,
  Step5_Results,
  Step6_PreContact,
  Step7_Complete,
} from '@/components/screens/windows'
import { trackWindowsEvent } from '@/lib/analytics/windowsEvents'
import { getWindowsVariant, getWindowsVariantConfig } from '@/lib/experiments/windowsVariants'
import { classifyIntent } from '@/lib/windowsIntent'
import { useWindowsJourneyState } from './useWindowsJourneyState'

type Step =
  | 'step1_project_type'
  | 'step2_windows_count'
  | 'step3_zip'
  | 'step4_intent'
  | 'step5_results'
  | 'step6_pre_contact'
  | 'step7_complete'

const ORDER: Step[] = [
  'step1_project_type',
  'step2_windows_count',
  'step3_zip',
  'step4_intent',
  'step5_results',
  'step6_pre_contact',
  'step7_complete',
]

export function WindowsJourneyRoute() {
  const [step, setStep] = React.useState<Step>('step1_project_type')
  const variant = React.useMemo(() => getWindowsVariant('windows-route-v1'), [])
  const variantConfig = React.useMemo(() => getWindowsVariantConfig(variant), [variant])
  const { data, update, addEngagement } = useWindowsJourneyState()

  const next = () => {
    const idx = ORDER.indexOf(step)
    if (idx < ORDER.length - 1) setStep(ORDER[idx + 1])
  }

  const back = () => {
    const idx = ORDER.indexOf(step)
    if (idx > 0) setStep(ORDER[idx - 1])
  }

  React.useEffect(() => {
    trackWindowsEvent('windows_step_view', { step, variant, intent: data.intentRoute })
  }, [step, variant, data.intentRoute])

  if (step === 'step1_project_type') {
    return (
      <Step1_ProjectType
        value={data.projectType}
        onNext={(projectType) => {
          update({ projectType })
          trackWindowsEvent('windows_step_submit', { step, projectType })
          next()
        }}
      />
    )
  }

  if (step === 'step2_windows_count') {
    return (
      <Step2_WindowsCount
        value={data.windowsCount}
        onBack={back}
        onNext={(windowsCount) => {
          update({ windowsCount })
          trackWindowsEvent('windows_step_submit', { step, windowsCount })
          next()
        }}
      />
    )
  }

  if (step === 'step3_zip') {
    return (
      <Step3_Zip
        value={data.zipCode}
        onBack={back}
        onNext={(zipCode) => {
          update({ zipCode })
          trackWindowsEvent('windows_step_submit', { step, zipCode })
          next()
        }}
      />
    )
  }

  if (step === 'step4_intent') {
    return (
      <Step4_Intent
        timeline={data.timeline}
        budget={data.budget}
        decisionStage={data.decisionStage}
        onBack={back}
        onNext={({ timeline, budget, decisionStage }) => {
          const intentRoute = classifyIntent(timeline, budget)
          update({ timeline, budget, decisionStage, intentRoute })
          trackWindowsEvent('windows_intent_classified', { timeline, budget, decisionStage, intentRoute })
          next()
        }}
      />
    )
  }

  if (step === 'step5_results') {
    return (
      <Step5_Results
        intentRoute={data.intentRoute ?? 'low_intent'}
          variant={variant}
          ctaLabel={variantConfig.resultsCtaByIntent[data.intentRoute ?? 'low_intent']}
        budget={data.budget}
        onBack={back}
        onNext={next}
        onEngage={(points) => {
          addEngagement(points)
            trackWindowsEvent('windows_results_engagement', { points, score: data.engagementScore + points, variant, intent: data.intentRoute })
        }}
      />
    )
  }

  if (step === 'step6_pre_contact') {
    return (
      <Step6_PreContact
        intentRoute={data.intentRoute ?? 'low_intent'}
        variant={variant}
        continueLabel={variantConfig.preContactContinueCta}
        value={data.contactPreference}
        onBack={back}
        onSubmit={(contactPreference) => {
          update({ contactPreference })
          trackWindowsEvent('windows_precontact_submit', { contactPreference, intent: data.intentRoute, variant })
          next()
        }}
      />
    )
  }

  return (
    <Step7_Complete
      intentRoute={data.intentRoute ?? 'low_intent'}
      onRestart={() => {
        setStep('step1_project_type')
        update({
          projectType: undefined,
          windowsCount: undefined,
          zipCode: undefined,
          timeline: undefined,
          budget: undefined,
          decisionStage: undefined,
          intentRoute: undefined,
          contactPreference: undefined,
          engagementScore: 0,
        })
      }}
    />
  )
}
