import type { Metadata } from 'next'
import { DiDocker } from 'react-icons/di'
import { BookOpen } from 'lucide-react'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'DevOps & Infra' }

const sections = [
  {
    id: 'devops-overview',
    title: 'DevOps 개요',
    icon: <BookOpen />,
    color: 'var(--color-primary)',
    summary: 'DevOps 개념과 문화, 실무 파이프라인 개요',
    items: [
      { name: 'DevOps란', desc: '개발과 운영의 협업, 지속적 전달 파이프라인 개요.', href: '/devops/overview' },
      { name: '[Git] 에코시스템의 중심축', desc: 'Git과 GitHub, 메커니즘과 브랜치 전략까지.', href: '/devops/git' },
    ],
  },
]

export default function DevOpsPage() {
  return (
    <SectionDetailLayout
      badgeLabel="DevOps & Infra"
      badgeIcon={<DiDocker size={16} />}
      badgeAccent="var(--color-docker-blue)"
      title="DevOps & 인프라"
      description="Docker 컨테이너화부터 CI/CD 자동화, AWS 클라우드 인프라까지 — 실무 배포 파이프라인 구축에 필요한 핵심 개념과 실전 패턴을 다룹니다."
      lastUpdated="2026.03.10"
      readTime="15 min"
      sections={sections}
      quickLinksTitle="Quick Links"
      quickLinksIcon={<DiDocker size={18} color="var(--color-docker-blue)" />}
      quickLinks={[
        { label: 'Docker 공식 문서', href: 'https://docs.docker.com' },
        { label: 'Docker Compose 레퍼런스', href: 'https://docs.docker.com/compose/' },
        { label: 'GitHub Actions 공식 문서', href: 'https://docs.github.com/en/actions' },
        { label: 'AWS 공식 문서', href: 'https://docs.aws.amazon.com' },
      ]}
      previous={{ href: '/backend', label: 'Backend 개발' }}
      next={{ href: '/architecture', label: '아키텍처 & 패턴' }}
    />
  )
}

