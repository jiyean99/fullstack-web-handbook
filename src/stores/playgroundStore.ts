import { create } from 'zustand'

interface PlaygroundState {
  // 상태 데모용
  counter: number
  increment: () => void
  decrement: () => void
  reset: () => void

  // 입력 데모용
  inputValue: string
  setInputValue: (value: string) => void

  // 로딩 데모용
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
  reset: () => set({ counter: 0 }),

  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),

  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}))
