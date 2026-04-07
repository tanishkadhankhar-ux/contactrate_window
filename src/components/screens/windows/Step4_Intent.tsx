'use client'

import * as React from 'react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { RadioGroup, RadioListItem } from '@/components/ui/RadioCard'
import {
  BUDGET_OPTIONS,
  DECISION_STAGE_OPTIONS,
  TIMELINE_OPTIONS,
  type BudgetOption,
  type DecisionStageOption,
  type TimelineOption,
} from '@/types/windowsFunnel'

interface Props {
  timeline?: TimelineOption
  budget?: BudgetOption
  decisionStage?: DecisionStageOption
  onBack: () => void
  onNext: (payload: { timeline: TimelineOption; budget: BudgetOption; decisionStage?: DecisionStageOption }) => void
}

function OptionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className='ml-2 inline-flex rounded-full bg-primary-300 px-2 py-0.5 text-xs font-medium text-primary-700'>
      {children}
    </span>
  )
}

export function Step4_Intent({ timeline, budget, decisionStage, onBack, onNext }: Props) {
  const [localTimeline, setLocalTimeline] = React.useState<TimelineOption | undefined>(timeline)
  const [localBudget, setLocalBudget] = React.useState<BudgetOption | undefined>(budget)
  const [localDecisionStage, setLocalDecisionStage] = React.useState<DecisionStageOption | undefined>(decisionStage)

  return (
    <FormLayout currentStep={4} onBack={onBack}>
      <div className='space-y-7 has-sticky-button'>
        <div className='space-y-3'>
          <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
            When are you planning to start this project?
          </h1>
          <RadioGroup value={localTimeline} onValueChange={(v) => setLocalTimeline(v as TimelineOption)}>
            {TIMELINE_OPTIONS.map((option, idx) => (
              <RadioListItem key={option.value} value={option.value}>
                <span className='inline-flex items-center'>
                  {option.label}
                  {idx === 0 ? <OptionBadge>Recommended</OptionBadge> : null}
                </span>
              </RadioListItem>
            ))}
          </RadioGroup>
        </div>

        <div className='space-y-3'>
          <h2 className='font-semibold text-neutral-900'>What is your expected budget range?</h2>
          <RadioGroup value={localBudget} onValueChange={(v) => setLocalBudget(v as BudgetOption)}>
            {BUDGET_OPTIONS.map((option, idx) => (
              <RadioListItem key={option.value} value={option.value}>
                <span className='inline-flex items-center'>
                  {option.label}
                  {idx === 1 ? <OptionBadge>Most popular</OptionBadge> : null}
                </span>
              </RadioListItem>
            ))}
          </RadioGroup>
        </div>

        <div className='space-y-3'>
          <h2 className='font-semibold text-neutral-900'>Where are you in your decision process? (optional)</h2>
          <RadioGroup value={localDecisionStage} onValueChange={(v) => setLocalDecisionStage(v as DecisionStageOption)}>
            {DECISION_STAGE_OPTIONS.map((option, idx) => (
              <RadioListItem key={option.value} value={option.value}>
                <span className='inline-flex items-center'>
                  {option.label}
                  {idx === 2 ? <OptionBadge>Better contractors</OptionBadge> : null}
                </span>
              </RadioListItem>
            ))}
          </RadioGroup>
        </div>

        <StickyButtonContainer>
          <Button
            fullWidth
            showTrailingIcon
            disabled={!localTimeline || !localBudget}
            onClick={() =>
              localTimeline &&
              localBudget &&
              onNext({ timeline: localTimeline, budget: localBudget, decisionStage: localDecisionStage })
            }
          >
            See my results
          </Button>
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
