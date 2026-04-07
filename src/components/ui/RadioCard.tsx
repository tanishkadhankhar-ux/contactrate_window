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
      <div style={{ display: 'grid', gap: 10 }}>{children}</div>
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
      style={{
        textAlign: 'left',
        borderRadius: 10,
        border: checked ? '1px solid #007ac8' : '1px solid #cbd5e1',
        background: checked ? '#ecf1ff' : '#fff',
        padding: '10px 12px',
      }}
    >
      {letter ? <span style={{ marginRight: 8, color: '#64748b' }}>{letter}</span> : null}
      {children}
    </button>
  )
}
