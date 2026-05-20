import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HTTP / REST API 설계',
  description: 'HTTP 메서드 의미론, 상태 코드 체계, RESTful 리소스 설계와 RFC 7807 에러 형식',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
