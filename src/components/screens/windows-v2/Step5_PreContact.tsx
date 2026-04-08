'use client'

import * as React from 'react'
import { FormLayout } from '@/components/layout/FormLayout'
import type { ContactPreference, WindowSegment } from './types'

interface Props {
  segment: WindowSegment
  value?: ContactPreference
  onBack: () => void
  onSelect: (value: ContactPreference) => void
  textUpdatesOptIn: boolean
  onTextUpdatesOptInChange: (checked: boolean) => void
}

function Divider() {
  return <div className='h-px w-full bg-neutral-200' aria-hidden />
}

function ActionCardButton({
  title,
  description,
  onClick,
  variant = 'default',
}: {
  title: string
  description?: string
  onClick: () => void
  variant?: 'default' | 'primary'
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`w-full rounded-lg border p-4 text-left shadow-card transition-colors ${
        variant === 'primary'
          ? 'border-primary-700 bg-primary-300 hover:bg-primary-300/90'
          : 'border-neutral-200 bg-white hover:bg-neutral-50'
      }`}
    >
      <div className='text-sm font-semibold text-neutral-900'>{title}</div>
      {description ? <div className='mt-1 text-xs text-neutral-500 leading-relaxed'>{description}</div> : null}
    </button>
  )
}

export function Step5_PreContact({
  segment,
  value,
  onBack,
  onSelect,
  textUpdatesOptIn,
  onTextUpdatesOptInChange,
}: Props) {
  const [scheduleOpen, setScheduleOpen] = React.useState(false)
  const scheduleId = React.useId()

  React.useEffect(() => {
    setScheduleOpen(false)
  }, [segment])

  if (segment === 'VIP_URGENT') {
    return null
  }

  if (segment === 'SENSITIVE') {
    return (
      <FormLayout currentStep={7} totalSteps={8} onBack={onBack}>
        <div className='space-y-7'>
          <div className='space-y-2'>
            <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
              Choose how you&apos;d like to connect
            </h1>
            <p className='text-body text-neutral-500'>
              Flexible options—get help now, schedule a quick call, or start with email/SMS.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <ActionCardButton
              variant='primary'
              title='Connect me to a contractor now'
              description='We&apos;ll collect your details and connect you as soon as possible.'
              onClick={() => onSelect('call_now')}
            />

            <ActionCardButton
              title='Schedule a Call'
              description='Pick a time that works for you.'
              onClick={() => setScheduleOpen((v) => !v)}
            />

            <div
              id={scheduleId}
              className={`sm:col-span-2 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 transition-[max-height,opacity] duration-200 ease-out ${
                scheduleOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 border-transparent'
              }`}
              aria-hidden={!scheduleOpen}
            >
              <div className='p-4'>
                <div className='text-body-sm text-neutral-500 mb-3'>Available slots</div>
                <div className='space-y-2'>
                  <button
                    type='button'
                    onClick={() => onSelect('schedule_1h')}
                    className='w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left text-sm text-neutral-800 hover:bg-neutral-50'
                  >
                    In one hour
                  </button>
                  <Divider />
                  <button
                    type='button'
                    onClick={() => onSelect('schedule_48h')}
                    className='w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left text-sm text-neutral-800 hover:bg-neutral-50'
                  >
                    In the next 48 hrs
                  </button>
                  <Divider />
                  <button
                    type='button'
                    onClick={() => onSelect('schedule_weekend')}
                    className='w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left text-sm text-neutral-800 hover:bg-neutral-50'
                  >
                    On the weekend
                  </button>
                </div>
              </div>
            </div>

            <ActionCardButton
              title='Email me my guide'
              description='Nurture path—pricing trends and a project checklist.'
              onClick={() => onSelect('email_guide')}
            />
            <ActionCardButton
              title='Get an SMS from contractor'
              description='Low-friction contact—no phone call required.'
              onClick={() => onSelect('sms_from_contractor')}
            />
          </div>
        </div>
      </FormLayout>
    )
  }

  if (segment === 'PLANNED') {
    return (
      <FormLayout currentStep={7} totalSteps={8} onBack={onBack}>
        <div className='space-y-7'>
          <div className='space-y-2'>
            <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
              How would you like to continue?
            </h1>
            <p className='text-body text-neutral-500'>
              Planned projects work best with flexible, low-pressure next steps.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <ActionCardButton
              variant='primary'
              title='Email me my guide'
              description='Get pricing trends and project checklists.'
              onClick={() => onSelect('email_guide')}
            />
            <ActionCardButton
              title='Get an SMS from contractor'
              description='For future contact when you are ready, without the phone call.'
              onClick={() => onSelect('sms_from_contractor')}
            />
          </div>
        </div>
      </FormLayout>
    )
  }

  /* CURIOUS */
  return (
    <FormLayout currentStep={7} totalSteps={8} onBack={onBack}>
      <div className='space-y-7'>
        <div className='space-y-2'>
          <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
            Your Window Project Hub is ready.
          </h1>
          <p className='text-body text-neutral-500'>
            Where should we send your Educational Series and Cost Breakdown?
          </p>
        </div>

        <div className='rounded-lg border border-neutral-200 bg-white shadow-card p-4'>
          <div className='text-body-sm font-semibold text-neutral-900 mb-3'>Value preview</div>
          <div className='space-y-2'>
            {[
              'Window styles and what affects total cost',
              'Energy-efficiency upgrades that pay back fastest',
              'A step-by-step checklist for getting quotes',
            ].map((t) => (
              <div
                key={t}
                className='rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 blur-[2px]'
                aria-hidden
              >
                {t}
              </div>
            ))}
          </div>
          <p className='text-xs text-neutral-500 mt-3'>
            We&apos;ll unlock this after you enter your email on the next step.
          </p>
        </div>

        <ActionCardButton
          variant='primary'
          title='Continue'
          description='Send my hub by email.'
          onClick={() => onSelect('email_guide')}
        />

        <label className='flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4'>
          <input
            type='checkbox'
            checked={textUpdatesOptIn}
            onChange={(e) => onTextUpdatesOptInChange(e.target.checked)}
            className='mt-1'
          />
          <span className='text-xs text-neutral-600'>Text me updates (optional)</span>
        </label>
      </div>
    </FormLayout>
  )
}
