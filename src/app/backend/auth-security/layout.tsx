import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '인증·인가와 API 보안',
  description:
    '인증과 인가의 차이, 세션과 JWT 토큰, JWT 구조와 함정, RBAC 인가 모델, OWASP 기반 흔한 API 취약점 방어까지 — 만든 API를 지키는 실무 보안 정리',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
