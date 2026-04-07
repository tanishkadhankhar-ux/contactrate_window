import type { ReactNode } from 'react'

interface FormLayoutProps {
  children: ReactNode
  currentStep?: number
  onBack?: () => void
}

export function FormLayout({ children, currentStep, onBack }: FormLayoutProps) {
  return (
    <main style={{ padding: 16, maxWidth: 720, margin: '0 auto' }}>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        {onBack ? (
          <button type='button' onClick={onBack} style={{ padding: '6px 10px' }}>
            Back
          </button>
        ) : null}
        <span style={{ fontSize: 14, color: '#475569' }}>
          {currentStep ? `Step ${currentStep}` : 'Journey'}
        </span>
      </div>
      {children}
    </main>
  )
}
