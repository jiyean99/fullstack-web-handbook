import type { Metadata } from 'next'
import { DiDocker } from 'react-icons/di'
import { FaAws } from 'react-icons/fa'
import { BookOpen, Repeat, Rocket, Layers } from 'lucide-react'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'DevOps & Infra' }

const sections = [
  {
    id: 'devops-overview',
    title: 'DevOps 개요',
    icon: <BookOpen />,
    color: 'var(--color-primary)',
    summary: 'DevOps 개념과 문화, 실무 파이프라인 개요 (더미)',
    items: [
      { name: 'DevOps란', desc: '개발과 운영의 협업, 지속적 전달 파이프라인 개요.', href: '/devops/overview' },
      { name: '핵심 원칙', desc: '자동화, 측정, 공유 등 DevOps 핵심 원칙 정리. (더미)' },
    ],
  },
  {
    id: 'aws',
    title: 'AWS',
    icon: <FaAws />,
    color: '#ff9900',
    summary: 'AWS 인프라 구성 요소와 최소 권한 기반 운영 (더미)',
    items: [
      { name: '컴퓨트 & 데이터베이스', desc: 'EC2, RDS 등 핵심 서비스 소개. (더미)' },
      { name: '스토리지 & 네트워크', desc: 'S3, CloudFront, VPC 활용. (더미)' },
      { name: 'IAM 보안', desc: '최소 권한 원칙과 정책. (더미)' },
    ],
  },
  {
    id: 'deploy',
    title: '프로젝트 배포',
    icon: <Rocket />,
    color: 'var(--color-success)',
    summary: '실제 프로젝트 배포 절차와 환경 구성 (더미)',
    items: [
      { name: '배포 환경 구성', desc: '스테이징/프로덕션 환경 설계. (더미)' },
      { name: '배포 전략', desc: '블루그린, 카나리 등 배포 전략 개요. (더미)' },
    ],
  },
  {
    id: 'docker',
    title: 'Docker',
    icon: <DiDocker />,
    color: 'var(--color-docker-blue)',
    summary: '이미지와 컨테이너, Compose를 활용한 컨테이너 오케스트레이션 (더미)',
    items: [
      { name: '이미지와 컨테이너', desc: '이미지 레이어, 컨테이너 라이프사이클. (더미)' },
      { name: 'Dockerfile 작성', desc: '멀티 스테이지 빌드와 캐시 활용. (더미)' },
      { name: 'Compose 오케스트레이션', desc: '다중 컨테이너 앱 정의 및 실행. (더미)' },
    ],
  },
  {
    id: 'kubernetes',
    title: '쿠버네티스',
    icon: <Layers />,
    color: 'var(--color-info)',
    summary: '컨테이너 오케스트레이션과 클러스터 운영 (더미)',
    items: [
      { name: 'Pod와 디플로이먼트', desc: '기본 리소스 개념과 배포. (더미)' },
      { name: '서비스와 인그레스', desc: '네트워킹과 외부 노출. (더미)' },
      { name: '설정과 시크릿', desc: 'ConfigMap, Secret 관리. (더미)' },
    ],
  },
  {
    id: 'ci-cd',
    title: 'CI/CD',
    icon: <Repeat />,
    color: 'var(--color-warning)',
    summary: '자동 빌드/테스트/배포 파이프라인 (더미)',
    items: [
      { name: '파이프라인 설계', desc: '빌드·테스트·배포 단계 정의. (더미)' },
      { name: 'PR 기반 워크플로우', desc: 'PR 시 자동 테스트와 Preview 배포. (더미)' },
      { name: '시크릿 관리', desc: '환경 변수와 시크릿 안전 관리. (더미)' },
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
        { label: 'DevOps 개요', href: '/devops#devops-overview' },
        { label: 'AWS', href: '/devops#aws' },
        { label: '프로젝트 배포', href: '/devops#deploy' },
        { label: 'Docker', href: '/devops#docker' },
        { label: '쿠버네티스', href: '/devops#kubernetes' },
        { label: 'CI/CD', href: '/devops#ci-cd' },
      ]}
      previous={{ href: '/backend', label: 'Backend 개발' }}
      next={{ href: '/architecture', label: '아키텍처 & 패턴' }}
    />
  )
}

