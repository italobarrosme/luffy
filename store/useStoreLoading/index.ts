import create from 'zustand'

type StoreLoading = {
  store:  {
    isLoading: boolean
  }
  setLoading: (isLoading: boolean) => void
}

export const useStoreLoading = create<StoreLoading>((set) => ({
  // State
  store: {
    isLoading: false,
  },

  // Actions
  setLoading: (isLoading: boolean) =>
  {
    if (!isLoading) {
      setTimeout(() => {
        set((state) => ({
          store: {
            isLoading: false,
          },
        }))
      }, 1000)
    } else {
      set((state) => ({
        store: {
          isLoading: true,
        },
      }))
    }
  }

}))