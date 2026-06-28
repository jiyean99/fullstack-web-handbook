import type { Metadata } from 'next'
import { Layers } from 'lucide-react'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'Architecture & Patterns' }

const sections = [
  {
    id: 'articles',
    title: 'Architecture 아티클',
    icon: <Layers size={20} />,
    color: 'var(--color-docker-network)',
    summary: '아키텍처 스타일과 회복탄력성 주제별 글 모음',
    items: [
      {
        name: '레이어드 & 헥사고날 아키텍처',
        desc: '계층 분리 원칙과 Controller·Service 규칙, 포트와 어댑터, 도메인 독립성, 테스트 용이성까지 아키텍처 스타일을 다룹니다.',
        href: '/architecture/layered-hexagonal',
      },
      {
        name: '에러 처리 & 회복탄력성',
        desc: '전역 예외 핸들러와 도메인별 에러 코드, RFC 7807, Circuit Breaker 상태 전이와 Resilience4j·Fallback 전략을 정리합니다.',
        href: '/architecture/resilience',
      },
      {
        name: 'MSA 분산 트랜잭션 패턴',
        desc: '분산 마이크로서비스 환경에서 최종 일관성을 보장하기 위한 2PC(Two-Phase Commit)의 한계와 Saga 패턴(Choreography/Orchestration), Transactional Outbox 패턴을 정리합니다.',
        href: '/architecture/msa-transactions',
      },
    ],
  },
]

export default function ArchitecturePage() {
  return (
    <SectionDetailLayout
      badgeLabel="Architecture & Patterns"
      badgeIcon={<Layers size={18} />}
      badgeAccent="var(--color-docker-network)"
      title="아키텍처 & 패턴"
      description="소프트웨어 설계 원칙과 검증된 아키텍처 패턴을 다룹니다. 레이어드 · 헥사고날 아키텍처부터 에러 처리, Circuit Breaker까지 실무 관점에서 정리합니다."
      lastUpdated="2026.05.24"
      readTime="14 min"
      sections={sections}
      quickLinksTitle="Quick Links"
      quickLinksIcon={<Layers size={16} color="var(--color-docker-network)" />}
      quickLinks={[
        { label: 'Hexagonal Architecture (Cockburn)', href: 'https://alistair.cockburn.us/hexagonal-architecture/' },
        { label: 'Martin Fowler - Circuit Breaker', href: 'https://martinfowler.com/bliki/CircuitBreaker.html' },
        { label: 'Resilience4j 공식 문서', href: 'https://resilience4j.readme.io/docs' },
        { label: 'RFC 7807 Problem Details', href: 'https://www.rfc-editor.org/rfc/rfc7807' },
      ]}
      previous={{ href: '/devops', label: 'DevOps & 인프라' }}
      next={{ href: '/about', label: 'About' }}
    />
  )
}

