import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Spring Boot 실무 패턴',
  description: '레이어드 아키텍처, 의존성 주입, 트랜잭션, JPA 데이터 접근과 테스팅 전략',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
