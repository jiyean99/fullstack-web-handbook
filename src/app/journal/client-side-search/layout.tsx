import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '엘라스틱서치 없이 — 검색을 프론트에서 직접 만든 기록',
  description:
    '정적 인덱스와 클라이언트 선형 검색으로 상단 검색바를 구현하면서, 검색 엔진을 도입하지 않은 이유(적정 기술 판단)와 그 한계를 정리한 기록',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
