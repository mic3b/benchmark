import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { MoreHorizIcon, AddCircleIcon, BarChartIcon } from './icons'

/* ------------------------------------------------------------------ */
/* Surface                                                            */
/* ------------------------------------------------------------------ */

type CardProps = { children: ReactNode; className?: string; padding?: 'default' | 'none' | 'compact' }

const padFor = { default: 'p-6', compact: 'p-4', none: '' } as const

export function Card({ children, className = '', padding = 'default' }: CardProps) {
  return (
    <div className={`rounded-3xl bg-white shadow-card ${padFor[padding]} ${className}`}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Buttons                                                            */
/* ------------------------------------------------------------------ */

const baseChip =
  'flex size-9 items-center justify-center rounded-xl bg-page text-brand transition hover:bg-chip-hover'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }

export function IconButton({ label, children, className = '', ...rest }: IconButtonProps) {
  return (
    <button type="button" aria-label={label} className={`${baseChip} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export function MoreButton(props: Omit<IconButtonProps, 'label' | 'children'>) {
  return (
    <IconButton label="More options" {...props}>
      <MoreHorizIcon />
    </IconButton>
  )
}

export function AddButton(props: Omit<IconButtonProps, 'label' | 'children'>) {
  return (
    <IconButton label="Add" {...props}>
      <AddCircleIcon />
    </IconButton>
  )
}

export function BarChartButton(props: Omit<IconButtonProps, 'label' | 'children'>) {
  return (
    <IconButton label="View as chart" {...props}>
      <BarChartIcon />
    </IconButton>
  )
}

/* ------------------------------------------------------------------ */
/* Form primitives — used by Sign In and a couple of table rows       */
/* ------------------------------------------------------------------ */

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function Checkbox({ className = '', ...rest }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={`size-[18px] cursor-pointer accent-brand ${className}`}
      {...rest}
    />
  )
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement>

export function TextInput({ className = '', ...rest }: TextInputProps) {
  return (
    <input
      className={`h-[50px] rounded-2xl border border-line bg-white px-6 text-sm text-heading placeholder:text-muted outline-none transition focus:border-brand ${className}`}
      {...rest}
    />
  )
}

export function FieldLabel({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return (
    <span className="text-sm font-medium text-heading tracking-[-0.28px]">
      {children}
      {required && <span className="text-brand">*</span>}
    </span>
  )
}
