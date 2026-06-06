import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '메타프레임워크와 렌더링 전략',
  description:
    'Astro·Next·Remix 같은 메타프레임워크가 푸는 문제와 렌더링 전략, 아일랜드 아키텍처, 콘텐츠 중심 워크플로우, 프레임워크 선택 기준 정리',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
