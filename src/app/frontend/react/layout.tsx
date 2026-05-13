import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'React 핵심 패턴',
  description: '상태관리 전략, 렌더링 최적화, 컴포넌트 설계 원칙까지 React 실무 패턴 정리',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
