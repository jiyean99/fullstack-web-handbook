import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '에러 처리 & 회복탄력성',
  description: '전역 예외 핸들러와 에러 코드 체계, Circuit Breaker로 장애 전파를 막는 패턴',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
