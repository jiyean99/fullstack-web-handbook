import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Todo {
  id: number
  text: string
  done: boolean
}

interface PlaygroundState {
  // 상태 데모용
  counter: number
  increment: () => void
  decrement: () => void
  reset: () => void

  // 입력 데모용
  inputValue: string
  setInputValue: (value: string) => void

  // 로딩 / 비동기 데모용
  isLoading: boolean
  setLoading: (loading: boolean) => void
  randomValue: number | null
  fetchRandom: () => Promise<void>

  // 리스트(Todo) 데모용
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
}

let todoSeq = 3

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
  reset: () => set({ counter: 0 }),

  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),

  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  randomValue: null,
  fetchRandom: async () => {
    set({ isLoading: true })
    // 실제 API 호출을 흉내 낸 비동기 지연
    await new Promise((resolve) => setTimeout(resolve, 800))
    const value = Math.floor(Math.random() * 100)
    set({ randomValue: value, isLoading: false })
  },

  todos: [
    { id: 1, text: 'Zustand 셀렉터 이해하기', done: true },
    { id: 2, text: 'persist 미들웨어 실습', done: false },
  ],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: todoSeq++, text, done: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    })),
  removeTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
}))

// ─── persist 데모용 스토어 ───────────────────────────
// localStorage에 저장되어 새로고침 후에도 값이 유지된다.
interface PrefState {
  likes: number
  like: () => void
  resetLikes: () => void
}

export const usePrefStore = create<PrefState>()(
  persist(
    (set) => ({
      likes: 0,
      like: () => set((state) => ({ likes: state.likes + 1 })),
      resetLikes: () => set({ likes: 0 }),
    }),
    { name: 'fsw-playground-pref' },
  ),
)
