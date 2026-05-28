import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Python & FastAPI',
  description: '타입 힌트 기반 FastAPI로 비동기 API를 설계하는 패턴 — Pydantic·의존성 주입·async',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
