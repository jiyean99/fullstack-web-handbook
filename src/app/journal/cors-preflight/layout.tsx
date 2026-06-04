import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CORS preflight 디버깅기',
  description: '배포 환경에서 터진 CORS 에러를 preflight 이해와 서버 허용 설정으로 해결한 기록',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
