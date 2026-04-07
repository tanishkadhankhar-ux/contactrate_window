import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, id, style, ...props }: InputProps) {
  const inputId = id ?? props.name ?? label ?? 'input'
  return (
    <label htmlFor={inputId} className='grid gap-1.5'>
      {label ? <span className='text-body-sm text-neutral-700'>{label}</span> : null}
      <input
        id={inputId}
        {...props}
        style={{
          width: '100%',
          ...style,
        }}
        className='input'
      />
    </label>
  )
}
