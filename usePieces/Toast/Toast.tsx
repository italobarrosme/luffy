import style from './Toast.module.scss'
import clxs from 'clsx'
import {Icon} from '@iconify/react'

import { MouseEvent } from 'react'

export type UnitToastProps = {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration: number
  title: string
  closeToast?: (event: MouseEvent<HTMLButtonElement>, params?: number) => void
}

const mapIcon = {
  success: 'akar-icons:check',
  error: 'eva:alert-circle-outline',
  warning: 'eva:alert-triangle-outline',
  info: 'carbon:information',
};


export const Toast = ({
  type,
  message,
  duration,
  title,
  closeToast,
}:UnitToastProps) => {


  return (
    <li className={clxs(style.toast, style[type])} style={{ animationDuration: `${duration + 300}ms`, 
         animationTimingFunction: 'ease-in-out', 
         animationFillMode: 'forwards' }} role='status'>
          <div className={style.toastContent}>
            <div className={style.toastHeader}>
              <Icon className={'text-white'} icon={mapIcon[type]} width={24}/>
              <div className={style.toastTitle}>{title}</div>
            </div>
            {closeToast && (
            <button className={style['toastBtn']} onClick={event => closeToast(event)}>
              <Icon className={'text-white'} icon={'akar-icons:circle-x'} width={24}/>
            </button>
            )}
          </div>
          <div className={style.toastMessage}>{message}</div>
    </li>
  ) 
}