import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Docker 이미지 다이어트',
  description: '멀티스테이지 빌드와 레이어 캐싱, 경량 베이스로 이미지 용량을 1.2GB에서 180MB로 줄인 기록',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
