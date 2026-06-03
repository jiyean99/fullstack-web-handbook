import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '실무 기록 (Journal)',
  description: '실무에서 부딪힌 문제와 해결 과정을 시간순으로 남기는 개발 기록 공간',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
