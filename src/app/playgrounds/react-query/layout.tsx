import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'React Query & API Mocking Playground',
  description: 'TanStack Query의 동작 메커니즘과 캐싱 라이프사이클을 눈으로 보며 체험하는 플레이그라운드',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
