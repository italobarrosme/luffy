import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

export type ButtonProps = {
  label?: string
  onClick: () => void
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({onClick, label, className, type}: ButtonProps) => {



  return (
    <button
      type={type}
      className={clsx(className, 'bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded whitespace-nowrap')}
      onClick={onClick}
    >
      <p>{label}</p>
    </button>
  )
}