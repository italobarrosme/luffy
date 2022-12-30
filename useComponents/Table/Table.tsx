import { Icon } from '@iconify/react'
import { ReactNode } from 'react'
import { InputSearch } from "@/usePieces/InputSearch"
import { ChangeEvent } from 'react'

export type itemsHeader = {
  title: string
  fn: () => void
}

export type TableProps = {
  title: string
  headerItems: itemsHeader[]
  children: ReactNode
  onChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Table = ({title, headerItems, children, onChangeSearch}: TableProps) => {
  return (
    <div className="w-full p-2 mx-auto sm:p-4">
      <div className='flex items-center mb-2 gap-4 justify-between'>
        <h2 className="text-2xl font-semibold leading-tight">{title}</h2>
        <InputSearch placeholder="Filtro" onChange={onChangeSearch}/>
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className="text-xs w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-brand-soft text-brand-light">
              {headerItems?.map((item) => (
                <th key={item.title} className="p-3 font-semibold text-left">
                  <p className='flex items-center gap-1'>
                  {item.title}
                  <span>
                    <button onClick={item.fn}>
                      <Icon icon='ic:baseline-expand-more' width={18} />
                    </button>
                  </span>
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  )
}


