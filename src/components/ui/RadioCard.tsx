import * as React from 'react'
import type { ReactNode } from 'react'

interface RadioGroupProps {
  value?: string
  onValueChange: (value: string) => void
  children: ReactNode
}

interface RadioListItemProps {
  value: string
  children: ReactNode
  letter?: string
}

const RadioGroupContext = React.createContext<{ value?: string; onValueChange: (value: string) => void } | null>(null)

export function RadioGroup({ value, onValueChange, children }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div className='grid gap-2.5'>{children}</div>
    </RadioGroupContext.Provider>
  )
}

export function RadioListItem({ value, children, letter }: RadioListItemProps) {
  const context = React.useContext(RadioGroupContext)
  const checked = context?.value === value

  return (
    <button
      type='button'
      onClick={() => context?.onValueChange(value)}
      className={`radio-card text-left ${checked ? 'border-primary-700 bg-primary-300' : ''}`}
    >
      {letter ? <span className='mr-2 text-neutral-500'>{letter}</span> : null}
      {children}
    </button>
  )
}
