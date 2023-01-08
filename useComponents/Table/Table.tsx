import { Icon } from '@iconify/react'
import { ReactNode } from 'react'
import { InputSearch } from "@/usePieces/InputSearch"
import { ChangeEvent } from 'react'
import { Button } from '@/usePieces/Button'

export type itemsHeader = {
  title: string
  fn: () => void
}

export type TableProps = {
  title?: string
  headerItems: itemsHeader[]
  children: ReactNode
  onChangeSearch?: (event: ChangeEvent<HTMLInputElement>) => void
  actionHeadButton?: () => void
  labelButtonHeader?: string
}

export const Table = ({title, headerItems, children, onChangeSearch, actionHeadButton, labelButtonHeader}: TableProps) => {
  return (
    <div className="w-full">
      <div className='flex items-center mb-2 gap-4 justify-between'>
        <h2 className="text-2xl font-semibold leading-tight w-full">{title}</h2>
        <div className='flex gap-4 w-full items-center mb-2 justify-between'>
          {actionHeadButton && <Button onClick={actionHeadButton} label={labelButtonHeader} />}
          {onChangeSearch && <InputSearch placeholder="Filtro" onChange={onChangeSearch}/>}
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto rounded-lg h-auto">
        <table className="text-xs w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-brand-secondary text-brand-light">
              {headerItems?.map((item) => (
                <th key={item.title} className="p-3 font-semibold text-left">
                  <p className='flex items-center gap-1'>
                  {item.title}
                  {item.title && <span>
                    <button onClick={item.fn}>
                      <Icon icon='ic:baseline-expand-more' width={18} />
                    </button>
                  </span>}
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


