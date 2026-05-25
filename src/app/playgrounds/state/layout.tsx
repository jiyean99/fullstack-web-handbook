import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '상태관리 Playground',
  description: 'Zustand로 구현한 카운터·폼·로딩 상태 데모와 스토어 구조 실습',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
