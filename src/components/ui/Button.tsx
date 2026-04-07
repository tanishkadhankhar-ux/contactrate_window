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
    padding: size === 'sm' ? '8px 12px' : '12px 16px',
    borderRadius: 8,
    border: '1px solid',
    cursor: 'pointer',
    width: fullWidth ? '100%' : undefined,
    fontWeight: 600,
    minHeight: size === 'sm' ? 38 : 48,
  }

  const themed: CSSProperties =
    variant === 'secondary'
      ? { background: '#fff', borderColor: '#EDEDED', color: '#333333' }
      : { background: '#007AC8', borderColor: '#007AC8', color: '#fff' }

  const variantClass = variant === 'primary' ? 'btn-continue' : ''

  return (
    <button
      {...props}
      className={`${variantClass} ${className ?? ''}`.trim()}
      style={{ ...base, ...themed, ...style, opacity: props.disabled ? 0.6 : 1 }}
    >
      {children}
      {showTrailingIcon ? <span className='btn-arrow'> {'->'}</span> : ''}
    </button>
  )
}

export function StickyButtonContainer({ children }: { children: ReactNode }) {
  return <div style={{ marginTop: 16 }}>{children}</div>
}
