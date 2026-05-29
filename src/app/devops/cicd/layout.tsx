import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CI/CD 파이프라인',
  description: 'GitHub Actions로 빌드·테스트·배포를 자동화하는 워크플로우 설계',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
