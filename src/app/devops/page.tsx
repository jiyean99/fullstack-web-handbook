import type { Metadata } from 'next'
import { DiDocker } from 'react-icons/di'
import { FaAws } from 'react-icons/fa'
import { Network, Repeat } from 'lucide-react'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'DevOps & Infra' }

const sections = [
  {
    id: 'docker',
    title: 'Docker',
    icon: <DiDocker />,
    color: 'var(--color-docker-blue)',
    summary: '이미지와 컨테이너, Compose를 활용한 컨테이너 오케스트레이션',
    items: [
      {
        name: '이미지와 컨테이너',
        desc: '이미지 레이어 구조와 컨테이너 라이프사이클을 이해하고 실습합니다.',
      },
      {
        name: 'Dockerfile 작성',
        desc: '멀티 스테이지 빌드로 이미지 용량을 줄이고 캐시를 효율적으로 활용하는 방법을 정리합니다.',
      },
      {
        name: 'Compose 오케스트레이션',
        desc: '여러 컨테이너를 하나의 애플리케이션 단위로 정의하고 실행하는 패턴을 다룹니다.',
      },
    ],
  },
  {
    id: 'docker-network',
    title: 'Docker 네트워크',
    icon: <Network />,
    color: 'var(--color-docker-network)',
    summary: '컨테이너 간 통신과 네트워크 토폴로지 설계',
    items: [
      {
        name: '드라이버 비교',
        desc: 'bridge, host, overlay 드라이버의 차이와 사용 시나리오를 정리합니다.',
      },
      {
        name: '포트 매핑 & 통신',
        desc: '포트 매핑, 서비스 디스커버리, 컨테이너 간 통신 구조를 다룹니다.',
      },
      {
        name: '볼륨과 데이터',
        desc: 'volume, bind mount를 이용해 데이터를 안전하게 보존하는 방법을 설명합니다.',
      },
    ],
  },
  {
    id: 'ci-cd',
    title: 'CI/CD',
    icon: <Repeat />,
    color: 'var(--color-warning)',
    summary: 'GitHub Actions로 구현하는 자동 빌드/테스트/배포 파이프라인',
    items: [
      {
        name: '파이프라인 설계',
        desc: '빌드 · 테스트 · 배포 단계로 나뉜 파이프라인을 정의하고 의존성을 관리합니다.',
      },
      {
        name: 'PR 기반 워크플로우',
        desc: 'PR 시 자동 테스트, Preview 배포, 코드 품질 체크를 수행하는 패턴을 정리합니다.',
      },
      {
        name: '시크릿 관리',
        desc: 'GitHub Secrets를 이용해 민감한 환경 변수를 안전하게 다룹니다.',
      },
    ],
  },
  {
    id: 'aws',
    title: 'AWS',
    icon: <FaAws />,
    color: '#ff9900',
    summary: 'AWS 인프라 구성 요소와 최소 권한 기반 운영',
    items: [
      {
        name: '컴퓨트 & 데이터베이스',
        desc: 'EC2, RDS 등 핵심 서비스 특징과 선택 기준을 정리합니다.',
      },
      {
        name: '스토리지 & 네트워크',
        desc: 'S3, CloudFront, VPC를 활용한 안정적인 인프라 구성을 다룹니다.',
      },
      {
        name: 'IAM 보안',
        desc: 'IAM 역할과 정책을 사용해 최소 권한 원칙을 적용하는 방법을 설명합니다.',
      },
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
        { label: 'Docker 가이드', href: '/devops/docker' },
        { label: 'Docker 네트워크', href: '/devops/docker-network' },
        { label: 'CI/CD 파이프라인', href: '/devops/ci-cd' },
        { label: 'AWS 인프라', href: '/devops/aws' },
      ]}
      previous={{ href: '/backend', label: 'Backend 개발' }}
      next={{ href: '/architecture', label: '아키텍처 & 패턴' }}
    />
  )
}

