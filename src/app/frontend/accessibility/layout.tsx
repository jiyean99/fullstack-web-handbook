import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '웹 접근성과 시맨틱 마크업',
  description:
    '시맨틱 HTML과 랜드마크, 키보드 접근성과 포커스 관리, 꼭 필요할 때만 쓰는 ARIA, 접근 가능한 폼까지 — 모두가 쓸 수 있는 UI를 만드는 실무 접근성 정리',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
