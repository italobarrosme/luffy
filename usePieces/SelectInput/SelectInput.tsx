export type SelectInputProps = {
  label: string
  name: string
  options: []
}

export const SelectInput = ({ label, name, options}: SelectInputProps) => {


  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className='text-sm font-medium'>{label}</label>
      <select id={name} name={name} className='rounded-md border-brand-primary h-9 w-80 border-1 text-brand-dark'>
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )

}