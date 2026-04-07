'use client'

import * as React from 'react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { RadioGroup, RadioListItem } from '@/components/ui/RadioCard'
import { BUDGET_OPTIONS, TIMELINE_OPTIONS, type BudgetOption, type TimelineOption } from '@/types/windowsFunnel'

interface Props {
  timeline?: TimelineOption
  budget?: BudgetOption
  onBack: () => void
  onNext: (payload: { timeline: TimelineOption; budget: BudgetOption }) => void
}

export function Step4_Intent({ timeline, budget, onBack, onNext }: Props) {
  const [localTimeline, setLocalTimeline] = React.useState<TimelineOption | undefined>(timeline)
  const [localBudget, setLocalBudget] = React.useState<BudgetOption | undefined>(budget)

  return (
    <FormLayout currentStep={4} onBack={onBack}>
      <div className='space-y-7 has-sticky-button'>
        <div className='space-y-3'>
          <h1 className='font-display text-display sm:text-display-lg text-neutral-900'>Project timing</h1>
          <RadioGroup value={localTimeline} onValueChange={(v) => setLocalTimeline(v as TimelineOption)}>
            {TIMELINE_OPTIONS.map((option) => (
              <RadioListItem key={option.value} value={option.value}>{option.label}</RadioListItem>
            ))}
          </RadioGroup>
        </div>

        <div className='space-y-3'>
          <h2 className='font-semibold text-neutral-900'>Expected budget</h2>
          <RadioGroup value={localBudget} onValueChange={(v) => setLocalBudget(v as BudgetOption)}>
            {BUDGET_OPTIONS.map((option) => (
              <RadioListItem key={option.value} value={option.value}>{option.label}</RadioListItem>
            ))}
          </RadioGroup>
        </div>

        <StickyButtonContainer>
          <Button
            fullWidth
            showTrailingIcon
            disabled={!localTimeline || !localBudget}
            onClick={() => localTimeline && localBudget && onNext({ timeline: localTimeline, budget: localBudget })}
          >
            See my results
          </Button>
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
