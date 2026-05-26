import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '디자인 시스템 Playground',
  description: '디자인 토큰 기반 컬러·타이포그래피와 Button 컴포넌트의 변형을 살펴보는 데모',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
