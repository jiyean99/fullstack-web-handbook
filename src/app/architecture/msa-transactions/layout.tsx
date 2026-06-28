import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MSA 분산 트랜잭션 패턴',
  description: '마이크로서비스 아키텍처 환경에서 데이터 일관성을 지키기 위한 Saga 패턴, Outbox 패턴 실무 정리',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
