'use client'

import { FormLayout } from '@/components/layout/FormLayout'

interface Props {
  onBack: () => void
}

export function InterstitialMatching({ onBack }: Props) {
  return (
    <FormLayout currentStep={5} totalSteps={8} onBack={onBack}>
      <div className='space-y-6'>
        <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
          Finding available contractors based on your needs...
        </h1>
        <div className='rounded-lg border border-neutral-200 bg-neutral-50 p-6 space-y-4'>
          <div className='h-2 w-full rounded bg-neutral-200 overflow-hidden'>
            <div className='h-2 w-2/3 bg-primary-700 animate-pulse' />
          </div>
          <p className='text-body-sm text-neutral-500'>Secure &amp; Private</p>
          <p className='text-body-sm text-neutral-500'>No obligation</p>
          <p className='text-body-sm text-neutral-500'>Forbes Advisor verified network</p>
        </div>
      </div>
    </FormLayout>
  )
}
