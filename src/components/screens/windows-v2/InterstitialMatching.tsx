'use client'

import * as React from 'react'
import { FormLayout } from '@/components/layout/FormLayout'
import type { WindowSegment } from './types'
import { getInterstitialDurationMs } from './utils'

type ChecklistState = 'done' | 'active' | 'pending'

interface SegmentLoaderConfig {
  title: string
  subtitle: string
  steps: [string, string, string, string]
  trustLead: React.ReactNode
  trustSource: string
}

const SEGMENT_CONFIG: Record<WindowSegment, SegmentLoaderConfig> = {
  VIP_URGENT: {
    title: 'Finding your best match...',
    subtitle: 'Prioritizing contractors available for calls now based on your project.',
    steps: [
      'Verifying live availability in your ZIP...',
      'Ranking top-rated local window pros...',
      'Reserving priority callback slots...',
      'Finalizing your match queue...',
    ],
    trustLead: (
      <>
        Forbes Advisor partners have completed <span className='font-bold text-feedback-success'>100k+</span> window
        projects. Priority matches typically hear back in <span className='font-bold text-feedback-success'>under 5 minutes</span>.
      </>
    ),
    trustSource: 'Source: Forbes Advisor partner network performance data',
  },
  PLANNED: {
    title: 'Analyzing local market rates...',
    subtitle: 'Calculating pricing trends for your project window and timeline.',
    steps: [
      'Gathering regional labor and material averages...',
      'Comparing recent scopes near you...',
      'Modeling timeline for your window count...',
      'Locking consultation-ready matches...',
    ],
    trustLead: (
      <>
        Homeowners in similar markets report saving an average of{' '}
        <span className='font-bold text-feedback-success'>25–35%</span> by comparing vetted quotes before they book.
      </>
    ),
    trustSource: 'Source: Industry pricing surveys & partner-reported outcomes',
  },
  CURIOUS: {
    title: 'Building your window buying guide...',
    subtitle: "We're curating educational content tailored to your answers.",
    steps: [
      'Organizing resources for your project type...',
      'Summarizing cost factors by window style...',
      'Drafting your custom planning checklist...',
      'Preparing your downloadable project snapshot...',
    ],
    trustLead: (
      <>
        <span className='font-bold text-feedback-success'>4 in 5</span> readers who request a guide also compare at
        least <span className='font-bold text-feedback-success'>3 quotes</span> before choosing a contractor.
      </>
    ),
    trustSource: 'Source: Forbes Advisor reader engagement benchmarks',
  },
  SENSITIVE: {
    title: 'Preparing your estimate path...',
    subtitle: 'Tailoring SMS-friendly options and rough pricing for your budget signal.',
    steps: [
      'Scoping a rough estimate range...',
      'Finding pros who text estimates quickly...',
      'Checking SMS eligibility in your area...',
      'Almost ready to connect you...',
    ],
    trustLead: (
      <>
        Text-first estimates often arrive in <span className='font-bold text-feedback-success'>about 2 minutes</span>—no
        call required until you&apos;re ready.
      </>
    ),
    trustSource: 'Source: Partner SLA averages for SMS estimate flows',
  },
}

function CheckIcon() {
  return (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none' aria-hidden>
      <path d='M2.5 7L5.5 10L11.5 4' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

function ChecklistRow({ label, state }: { label: string; state: ChecklistState }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex h-6 w-6 flex-shrink-0 items-center justify-center'>
        {state === 'done' ? (
          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-feedback-success animate-fade-in'>
            <CheckIcon />
          </div>
        ) : state === 'active' ? (
          <div className='h-6 w-6 rounded-full border-2 border-primary-700 border-t-transparent animate-spin' />
        ) : (
          <div className='h-6 w-6 rounded-full border-2 border-neutral-200' aria-hidden />
        )}
      </div>
      <span
        className={`text-[15px] leading-snug ${
          state === 'pending' ? 'text-neutral-400' : 'text-neutral-800'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

function ShieldIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='text-neutral-500' aria-hidden>
      <path
        d='M8 1L3 3v4.5c0 3.1 2.1 6 5 6.5 2.9-.5 5-3.4 5-6.5V3L8 1z'
        stroke='currentColor'
        strokeWidth='1.2'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function FooterCheckIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='text-neutral-500' aria-hidden>
      <path d='M4 8l2.5 2.5L12 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  )
}

function PeopleIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='text-neutral-500' aria-hidden>
      <circle cx='6' cy='5' r='2' stroke='currentColor' strokeWidth='1.2' />
      <path d='M2 13v-1c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v1' stroke='currentColor' strokeWidth='1.2' />
      <circle cx='11' cy='4.5' r='1.5' stroke='currentColor' strokeWidth='1.2' />
      <path d='M14 13v-.5c0-.8-.7-1.5-1.5-1.5h-2' stroke='currentColor' strokeWidth='1.2' />
    </svg>
  )
}

interface Props {
  segment: WindowSegment
  onBack: () => void
}

export function InterstitialMatching({ segment, onBack }: Props) {
  const config = SEGMENT_CONFIG[segment]
  const totalMs = getInterstitialDurationMs(segment)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [smoothProgress, setSmoothProgress] = React.useState(0)

  const stepCount = config.steps.length
  const stepDuration = totalMs / stepCount

  React.useEffect(() => {
    let cancelled = false
    setActiveIndex(0)
    setSmoothProgress(0)
    const stepStart = Date.now()
    let raf = 0

    const tick = () => {
      if (cancelled) return
      const elapsed = Date.now() - stepStart
      const slice = totalMs / stepCount
      const idx = Math.min(stepCount - 1, Math.floor(elapsed / slice))
      setActiveIndex(idx)

      const base = (idx / stepCount) * 100
      const sliceElapsed = elapsed - idx * slice
      const t = Math.min(1, sliceElapsed / slice)
      const eased = t * (2 - t)
      setSmoothProgress(Math.min(99, Math.round(base + (eased * 100) / stepCount)))

      if (elapsed < totalMs) {
        raf = requestAnimationFrame(tick)
      } else {
        setSmoothProgress(100)
        setActiveIndex(stepCount)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [segment, totalMs, stepCount])

  const rowState = (i: number): ChecklistState => {
    if (activeIndex >= stepCount) return 'done'
    if (activeIndex > i) return 'done'
    if (activeIndex === i) return 'active'
    return 'pending'
  }

  const percentLabel = activeIndex >= stepCount ? 100 : smoothProgress

  return (
    <FormLayout currentStep={6} totalSteps={8} onBack={onBack}>
      <div className='mx-auto max-w-[520px] animate-fade-in px-0 py-2 text-center sm:py-4'>
        <h1 className='font-display text-display sm:text-display-md text-neutral-900 mb-3'>{config.title}</h1>
        <p className='text-base text-neutral-500 mb-10 max-w-md mx-auto'>{config.subtitle}</p>

        <div className='space-y-4 text-left max-w-sm mx-auto mb-8'>
          {config.steps.map((label, i) => (
            <ChecklistRow key={label} label={label} state={rowState(i)} />
          ))}
        </div>

        <div className='max-w-sm mx-auto mb-2'>
          <div className='h-2 w-full rounded-full bg-neutral-100 overflow-hidden'>
            <div
              className='h-full rounded-full bg-feedback-success transition-[width] duration-150 ease-out'
              style={{ width: `${percentLabel}%` }}
            />
          </div>
          <p className='text-[13px] text-neutral-500 mt-2'>{percentLabel}% complete</p>
        </div>

        <div className='mt-10 rounded-xl border border-neutral-200 bg-primary-300/80 p-5 text-left'>
          <div className='flex items-start gap-3'>
            <span className='text-2xl leading-none flex-shrink-0' aria-hidden>
              ⏰
            </span>
            <div>
              <p className='text-sm text-neutral-700 leading-relaxed'>{config.trustLead}</p>
              <p className='text-xs text-neutral-400 mt-2'>{config.trustSource}</p>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center gap-8 mt-12 flex-wrap text-neutral-500'>
          <div className='flex items-center gap-1.5'>
            <ShieldIcon />
            <span className='text-[13px]'>Secure &amp; Private</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <FooterCheckIcon />
            <span className='text-[13px]'>No credit impact</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <PeopleIcon />
            <span className='text-[13px]'>100% Free</span>
          </div>
        </div>
      </div>
    </FormLayout>
  )
}
