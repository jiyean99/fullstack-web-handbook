import type { Metadata } from 'next'
import SectionLanding from '@/components/layout/SectionLanding'
import { DiDocker } from 'react-icons/di'
import { FaAws } from 'react-icons/fa'
import { Network, Repeat } from 'lucide-react'

export const metadata: Metadata = { title: 'DevOps & Infra' }

const subCards = [
  {
    icon: <DiDocker />,
    title: 'Docker',
    href: '/devops/docker',
    desc: '이미지와 컨테이너의 차이, Dockerfile 작성법, 멀티 스테이지 빌드로 이미지 최소화, Docker Compose 멀티 컨테이너 오케스트레이션.',
    accent: 'var(--color-docker-blue)',
  },
  {
    icon: <Network />,
    title: 'Docker 네트워크',
    href: '/devops/docker-network',
    desc: '브리지/호스트/오버레이 드라이버 비교, 포트 매핑 시뮬레이터, 컨테이너 간 통신, Compose 네트워크 토폴로지, 볼륨 마운트.',
    accent: 'var(--color-docker-network)',
  },
  {
    icon: <Repeat />,
    title: 'CI/CD',
    href: '/devops/ci-cd',
    desc: 'GitHub Actions로 구현하는 자동 빌드/테스트/배포 파이프라인. PR Preview 배포, GitHub Secrets 환경변수 관리.',
    accent: 'var(--color-warning)',
  },
  {
    icon: <FaAws />,
    title: 'AWS',
    href: '/devops/aws',
    desc: 'EC2 가상 서버, S3 오브젝트 스토리지, RDS 관리형 DB, ECS/EKS 컨테이너 오케스트레이션, CloudFront CDN. IAM 최소 권한 원칙.',
    accent: '#ff9900',
  },
]

export default function DevOpsPage() {
  return (
    <SectionLanding
      badge="DevOps & Infra"
      icon={<DiDocker />}
      title="DevOps & 인프라"
      description="Docker 컨테이너화부터 CI/CD 자동화, AWS 클라우드 인프라까지 — 실무 배포 파이프라인 구축에 필요한 핵심 개념과 실전 패턴을 다룹니다."
      accentColor="var(--color-docker-blue)"
      subCards={subCards}
    />
  )
}
