'use client'

import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { Input } from '@/components/ui/Input'

interface Props {
  zipCode: string
  canContinue: boolean
  onBack: () => void
  onNext: () => void
  onZipChange: (zipCode: string) => void
}

export function Step0_Landing({ zipCode, canContinue, onBack, onNext, onZipChange }: Props) {
  return (
    <FormLayout currentStep={1} totalSteps={8} onBack={onBack}>
      <div className='space-y-7 has-sticky-button animate-slide-up'>
        <div className='rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6 space-y-5'>
          <div className='space-y-2'>
            <h1 className='font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900'>
              Compare Top Window Contractors in One Click
            </h1>
            <p className='text-body text-neutral-500 max-w-[640px]'>
              Looking for a quick fix or installation? Enter your ZIP code to find the best options near you
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end'>
            <Input
              label='ZIP Code'
              value={zipCode}
              placeholder='Enter ZIP code'
              inputMode='numeric'
              maxLength={5}
              onChange={(e) => onZipChange(e.target.value)}
            />
            <Button fullWidth showTrailingIcon disabled={!canContinue} onClick={onNext}>
              Find contractors near me
            </Button>
          </div>

          <p className='text-body-sm text-neutral-500'>Free to use • No credit card required • Takes about 2 minutes</p>
        </div>

        <div className='rounded-xl border border-neutral-200 bg-white p-5 sm:p-6'>
          <div className='flex flex-wrap gap-2 mb-4'>
            <span className='rounded-full bg-primary-300 text-primary-700 text-xs font-semibold px-3 py-1'>Forbes Advisor</span>
            <span className='rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold px-3 py-1'>Verified contractors</span>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            <div className='rounded-lg bg-neutral-50 border border-neutral-200 p-4'>
              <p className='text-body-sm text-neutral-500'>Average project cost</p>
              <p className='text-headline-md text-primary-700 font-semibold mt-1'>$10,000-$20,000*</p>
            </div>
            <div className='rounded-lg bg-neutral-50 border border-neutral-200 p-4'>
              <p className='text-body-sm text-neutral-500'>Homeowners matched</p>
              <p className='text-headline-md text-neutral-900 font-semibold mt-1'>100k+</p>
            </div>
            <div className='rounded-lg bg-neutral-50 border border-neutral-200 p-4'>
              <p className='text-body-sm text-neutral-500'>Confidential service</p>
              <p className='text-headline-md text-neutral-900 font-semibold mt-1'>100% free</p>
            </div>
          </div>
          <p className='text-caption text-neutral-500 mt-4'>
            *National estimate range for common residential window projects. Final estimates vary by ZIP and scope.
          </p>
        </div>

        <div className='rounded-lg border border-neutral-200 bg-neutral-100 p-4 flex flex-wrap items-center justify-between gap-3 text-body-sm text-neutral-700'>
          <span>Answer a few questions</span>
          <span>View side-by-side quotes</span>
          <span>Book with confidence</span>
        </div>

        <StickyButtonContainer>
          <Button fullWidth showTrailingIcon disabled={!canContinue} onClick={onNext}>
            Find contractors near me
          </Button>
        </StickyButtonContainer>
      </div>
    </FormLayout>
  )
}
