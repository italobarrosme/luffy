import { ChangeEvent, InputHTMLAttributes} from 'react'

export type InputTextProps = {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>



export const InputText = ({ label, value, name }: InputTextProps) => {

  return (
    <>
      <div className='flex flex-col gap-2'>
      <label htmlFor={name} className='text-sm font-medium'>{label}</label>
       <input id={name} name={name} type="text" value={value} className='rounded-md h-9 p-2 text-brand-dark' />
      </div>
    </>
  )
}