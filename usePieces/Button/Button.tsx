import clsx from "clsx"

export type ButtonProps = {
  label?: string
  onClick: () => void
  className?: string
}

export const Button = ({onClick, label, className}: ButtonProps) => {



  return (
    <button
      type="button"
      className={clsx(className, 'bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded whitespace-nowrap')}
      onClick={onClick}
    >
      <p>{label}</p>
    </button>
  )
}