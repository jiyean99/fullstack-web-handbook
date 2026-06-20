import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js 15 Server Actions와 하이드레이션 오류 해결기',
  description: 'Next.js 15에서 Server Actions와 클라이언트/서버 렌더링 불일치로 인한 Hydration 오류를 추적하고 해결한 경험을 공유합니다.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
