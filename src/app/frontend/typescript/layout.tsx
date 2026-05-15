import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TypeScript 실무 타입',
  description: '유틸리티 타입, 도메인 타입 모델링, Zod 런타임 검증까지 실무 타입 전략',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
