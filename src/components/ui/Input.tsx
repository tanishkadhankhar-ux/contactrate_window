import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, id, style, ...props }: InputProps) {
  const inputId = id ?? props.name ?? label ?? 'input'
  return (
    <label htmlFor={inputId} style={{ display: 'grid', gap: 6 }}>
      {label ? <span style={{ fontSize: 14, color: '#334155' }}>{label}</span> : null}
      <input
        id={inputId}
        {...props}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #cbd5e1',
          borderRadius: 8,
          ...style,
        }}
      />
    </label>
  )
}
