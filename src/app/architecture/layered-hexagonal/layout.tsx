import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '레이어드 & 헥사고날 아키텍처',
  description: '계층 분리 원칙과 포트·어댑터 패턴으로 도메인을 보호하는 아키텍처 전략',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
