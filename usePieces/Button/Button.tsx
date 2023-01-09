import { Icon } from "@iconify/react"
import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

export type ButtonProps = {
  label?: string
  onClick: () => void
  className?: string
  icon?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({onClick, label, className, type, icon = ''}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(className, 'bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded whitespace-nowrap flex items-center gap-4')}
      onClick={onClick}
    >
      {icon ? <Icon icon={icon} width={24} /> : null}
      <p>{label}</p>
    </button>
  )
}