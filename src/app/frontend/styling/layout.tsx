import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Styling 전략',
  description: 'styled-components 패턴, 디자인 토큰, CSS 아키텍처와 다크 모드 구현 전략',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
