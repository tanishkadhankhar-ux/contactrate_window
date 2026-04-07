import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  children: ReactNode
  fullWidth?: boolean
  showTrailingIcon?: boolean
  variant?: Variant
  size?: 'sm' | 'md'
}

export function Button({
  children,
  fullWidth,
  showTrailingIcon,
  variant = 'primary',
  size = 'md',
  style,
  className,
  ...props
}: ButtonProps) {
  const base: CSSProperties = {
    padding: size === 'sm' ? '6px 10px' : '10px 14px',
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
    <button
      {...props}
      className={className}
      style={{ ...base, ...themed, ...style, opacity: props.disabled ? 0.6 : 1 }}
    >
      {children}
      {showTrailingIcon ? ' ->' : ''}
    </button>
  )
}

export function StickyButtonContainer({ children }: { children: ReactNode }) {
  return <div style={{ marginTop: 16 }}>{children}</div>
}
