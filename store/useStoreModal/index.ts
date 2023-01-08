import create from 'zustand'

export type StoreModalProps = {
  store: {
    modal: {
      role: string
      isOpen: boolean
    }
  }
  setModal: (modal: StoreModalProps['store']['modal']) => void
}

export const useStoreModal = create<StoreModalProps>((set) => ({
  // State
  store: {
    modal: {
      role: '',
      isOpen: false,
    },
  },
  // Actions
  setModal: (modal: StoreModalProps['store']['modal']) =>
    set((state) => ({
      store: {
        ...state.store,
        modal,
      },
    })),
}))