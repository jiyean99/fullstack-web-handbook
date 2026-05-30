import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AWS 인프라 기초',
  description: 'EC2·S3·RDS·VPC·IAM 등 AWS 핵심 서비스와 배포 흐름의 기초',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
