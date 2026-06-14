import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '백엔드 동작 원리',
  description:
    '요청 한 건이 처리되는 흐름부터 웹서버와 WAS, 계층 구조, 무상태성과 수평 확장, 스레드와 커넥션 풀까지 — 백엔드를 떠받치는 기본 원리 정리',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
