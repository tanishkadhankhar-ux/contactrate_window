import type { ReactNode } from 'react'

interface FormLayoutProps {
  children: ReactNode
  currentStep?: number
  onBack?: () => void
  totalSteps?: number
}

export function FormLayout({ children, currentStep, onBack, totalSteps = 7 }: FormLayoutProps) {
  const progressPct = Math.max(0, Math.min(100, Math.round(((currentStep ?? 1) / totalSteps) * 100)))

  return (
    <main className='min-h-screen bg-white flex flex-col'>
      <div className='w-full sticky top-14 z-40 px-4 sm:px-6 py-3 bg-white'>
        <div className='max-w-content mx-auto flex items-center gap-3'>
          {onBack ? (
            <button
              type='button'
              onClick={onBack}
              className='flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
            >
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                <path d='M12 4L6 10L12 16' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
          ) : null}

          <div className='flex-1 h-[6px] rounded-full overflow-hidden bg-neutral-200'>
            <div
              className='h-full rounded-full transition-[width] duration-700 ease-out bg-neutral-800'
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      <div className='max-w-content mx-auto w-full px-4 sm:px-6 py-7 sm:py-8 flex-1'>{children}</div>

      <div className='border-t border-neutral-200 bg-neutral-100'>
        <div className='max-w-content mx-auto px-4 sm:px-6 py-3 text-body-sm text-neutral-500 flex flex-wrap items-center justify-between gap-2'>
          <span>Excellent Trustpilot</span>
          <span>Soft credit pull to start</span>
          <span>No obligation</span>
        </div>
      </div>
    </main>
  )
}
