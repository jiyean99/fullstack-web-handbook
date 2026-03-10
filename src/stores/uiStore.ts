import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  // 사이드바 상태
  isSidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void

  // TOC(목차) 상태
  isTocOpen: boolean
  toggleToc: () => void

  // 다크모드 (Nextra 자체 다크모드와 별개로 커스텀 영역용)
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (open) => set({ isSidebarOpen: open }),

      isTocOpen: true,
      toggleToc: () => set((state) => ({ isTocOpen: !state.isTocOpen })),

      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'handbook-ui',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)
