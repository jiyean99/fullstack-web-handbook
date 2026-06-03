import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'N+1 쿼리 추적기',
  description: '목록 API 지연의 원인을 쿼리 로그로 추적하고 fetch join으로 N+1을 해결한 기록',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
