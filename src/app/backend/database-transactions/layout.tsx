import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '데이터베이스와 트랜잭션 심화',
  description:
    'ACID와 트랜잭션 경계, 격리 수준과 이상 현상, 낙관적·비관적 락, 인덱스와 실행 계획, N+1 쿼리까지 — 데이터 계층을 견고하게 다루는 심화 정리',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
