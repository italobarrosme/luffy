import create from 'zustand'
import { ListToastProps, PositionScreen } from '@/useComponents/ListToast'
import { UnitToastProps } from '@/usePieces/Toast'

type StoreListToast = {
  data: ListToastProps, 
  addToast: (toast: UnitToastProps, position?: PositionScreen) => void, 
  removeToast: (toast: UnitToastProps) => void
}

export const useStoreListToast = create<StoreListToast>(set => ({
  data: {
    list: [],
    position: 'top-right',
  },
  addToast: (toast: UnitToastProps, position?: PositionScreen ) => set(state => ({
    data: {
      ...state.data,
      list: [...state.data.list, toast],
      position: position ? position : state.data.position,
    },
  })),
  removeToast: (toast: UnitToastProps) => set(state => ({
    data: {
      ...state.data,
      list: state.data.list.filter(item => item !== toast),
    },
  })),
}))