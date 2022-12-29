import clxs from 'clsx'
import style from './ListToast.module.scss'
import { useEffect, MouseEvent } from 'react'
import { useStoreListToast } from '@/store/useStoreListToast'

import { Toast, UnitToastProps } from '@/usePieces/Toast/'

export type PositionScreen = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export type ListToastProps = {
  list: UnitToastProps[] | []
  position: PositionScreen
}

export const ListToast = ({
  list,
  position,
}:ListToastProps) => {
  const { removeToast } = useStoreListToast()

  useEffect(() => {
    list.filter(item => {
      const timer = setTimeout(() => {
        removeToast(item)
      }, item.duration)

      return () => clearTimeout(timer)
    })
  }, [list, removeToast])

  const CloseToast = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault()
    list.map((item, i) => {
        if (i === index) {
          item.duration = 0
          removeToast(item)
        }
        return item
      })
  }

  return (
    <>
        <ul className={clxs(style.toastContainer, style[position])} role='list'>
      {list.map((toast, index) => (
         <Toast key={index} {...toast} closeToast={event => CloseToast(event, index)} />
          ))}
          </ul>
    </>
  )
}