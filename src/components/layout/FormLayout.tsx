import type { ReactNode } from 'react'

interface FormLayoutProps {
  children: ReactNode
  currentStep?: number
  onBack?: () => void
}

export function FormLayout({ children, currentStep, onBack }: FormLayoutProps) {
  return (
    <main className='min-h-screen bg-white'>
      <div className='border-b border-neutral-200 bg-white'>
        <div className='max-w-content mx-auto px-4 sm:px-6 py-3 text-sm text-neutral-500'>
          Forbes Advisor
        </div>
      </div>
      <div className='sticky top-0 z-30 bg-white border-b border-neutral-200'>
        <div className='max-w-content mx-auto px-4 sm:px-6 py-3 flex items-center gap-3'>
          {onBack ? (
            <button
              type='button'
              onClick={onBack}
              className='w-9 h-9 rounded-full border border-neutral-200 text-neutral-800 hover:bg-neutral-100'
            >
              {'<'}
            </button>
          ) : null}
          <div className='text-body-sm text-neutral-500'>
            {currentStep ? `Step ${currentStep} of 7` : 'Journey'}
          </div>
        </div>
        <div className='h-1 bg-neutral-100'>
          <div
            className='h-1 bg-primary-700 transition-all'
            style={{ width: `${Math.min(100, ((currentStep ?? 1) / 7) * 100)}%` }}
          />
        </div>
      </div>

      <div className='max-w-content mx-auto px-4 sm:px-6 py-7 sm:py-8'>{children}</div>
    </main>
  )
}
