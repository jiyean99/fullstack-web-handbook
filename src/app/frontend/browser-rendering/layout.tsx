import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '브라우저 렌더링 원리',
  description:
    'HTML 파싱과 DOM·CSSOM, 렌더 트리와 레이아웃·페인트·합성, 임계 렌더링 경로, 리플로우와 리페인트, 이벤트 루프, 가상 DOM까지 — 프론트엔드를 떠받치는 브라우저 동작 원리 정리',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
