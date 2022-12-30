export type ButtonProps = {
  label: string
  onClick: () => void
}

export const Button = ({onClick, label}: ButtonProps) => {



  return (
    <button
      type="button"
      className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {label}
    </button>
  )
}