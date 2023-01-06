import { InputHTMLAttributes } from "react"

export type InputDateProps = {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const InputDate = ({label, name, defaultValue, onChange, value}:InputDateProps) => {


  return (
    <>
      <div className='flex flex-col gap-2'>
        <label htmlFor={name} className='text-sm font-medium'>{label}</label>
        <input id={name} name={name} type="date" className='rounded-md h-9 p-2 text-brand-dark font-semibold cursor-pointer'
         defaultValue={defaultValue} onChange={onChange} value={value}/>
      </div>
    </>
  )
}