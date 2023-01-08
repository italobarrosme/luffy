import { Icon } from '@iconify/react'

export type ButtonIconProps = {
  label?: string
  icon: string
  onClick: () => void
  width?: number
  height?: number
}

export const ButtonIcon = ({onClick, label, icon, height = 24, width = 24}: ButtonIconProps) => {
  return (
    <>
        <button
          type="button"
          id="buttonIcon"
          className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-2 rounded-full flex items-center gap-2"
          onClick={onClick}
        > 
          {label ? <label htmlFor="buttonIcon" className='font-bold'>
          {label}
          </label> : null} 
          <Icon icon={icon} width={width} height={height} />
        </button>
    </>
  )
}