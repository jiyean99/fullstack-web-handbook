import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '네트워크 기초: IP와 포트포워딩',
  description: 'IP 주소 체계와 포트포워딩의 원리 이해하기',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
