import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  fullWidth?: boolean
  showTrailingIcon?: boolean
  variant?: Variant
}

export function Button({
  children,
  fullWidth,
  showTrailingIcon,
  variant = 'primary',
  style,
  ...props
}: ButtonProps) {
  const base: CSSProperties = {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid transparent',
    cursor: 'pointer',
    width: fullWidth ? '100%' : undefined,
  }

  const themed: CSSProperties =
    variant === 'secondary'
      ? { background: '#fff', borderColor: '#cbd5e1', color: '#0f172a' }
      : { background: '#007ac8', color: '#fff' }

  return (
    <button {...props} style={{ ...base, ...themed, ...style }}>
      {children}
      {showTrailingIcon ? ' ->' : ''}
    </button>
  )
}

export function StickyButtonContainer({ children }: { children: ReactNode }) {
  return <div style={{ marginTop: 16 }}>{children}</div>
}
