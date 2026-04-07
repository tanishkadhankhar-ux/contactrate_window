'use client'

import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import type { IntentRoute } from '@/types/windowsFunnel'

interface Props {
  intentRoute: IntentRoute
  onRestart: () => void
}

export function Step7_Complete({ intentRoute, onRestart }: Props) {
  const summary = intentRoute === 'high_intent'
    ? 'Fast-track contact flow selected.'
    : intentRoute === 'mid_intent'
      ? 'Comparison and scheduled follow-up flow selected.'
      : 'Educational and email-first flow selected.'

  return (
    <FormLayout currentStep={7}>
      <div className="space-y-6 has-sticky-button">
        <h1 className="font-display text-display sm:text-display-lg text-neutral-900">
          Prototype complete
        </h1>
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 space-y-2">
          <p className="text-sm text-neutral-800">This click-through prototype captured the full Windows journey.</p>
          <p className="text-sm text-neutral-800"><strong>Path:</strong> {summary}</p>
        </div>
        <StickyButtonContainer>
          <Button fullWidth showTrailingIcon onClick={onRestart}>
            Restart prototype
          </Button>
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
