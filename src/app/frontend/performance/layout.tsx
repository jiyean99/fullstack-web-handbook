import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '프론트엔드 성능 최적화',
  description:
    'Core Web Vitals로 측정하고, 불필요한 리렌더와 번들 크기를 줄이며, 이미지·폰트와 네트워크·캐싱까지 다듬는 프론트엔드 성능 최적화 심화 정리',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
