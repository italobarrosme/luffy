import clsx from 'clsx'
import { InputHTMLAttributes} from 'react'

export type InputTextProps = {
  label?: string
  className?: string
} & InputHTMLAttributes<HTMLInputElement>



export const InputText = ({ label, value, name, className, type = 'text' }: InputTextProps) => {

  return (
    <>
      <div className={clsx(className, 'flex flex-col gap-2')}>
      <label htmlFor={name} className='text-sm font-medium'>{label}</label>
       <input id={name} name={name} type={type} value={value} className='rounded-md h-9 p-2 text-brand-dark' />
      </div>
    </>
  )
}