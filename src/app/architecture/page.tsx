import type { Metadata } from 'next'
import SectionLanding from '@/components/layout/SectionLanding'

export const metadata: Metadata = { title: 'Architecture & Patterns' }

const subCards = [
  {
    icon: '🏛',
    title: '레이어드 아키텍처',
    href: '/architecture/layered-architecture',
    desc: 'Presentation · Business · Data 계층 분리 원칙. 각 계층 책임과 의존 방향. Controller에서 비즈니스 로직 금지, Service에서 HTTP 코드 금지.',
    accent: 'var(--color-docker-network)',
  },
  {
    icon: '⬡',
    title: '헥사고날 아키텍처',
    href: '/architecture/hexagonal',
    desc: '포트와 어댑터 패턴. Inbound Port (UseCase), Outbound Port (Repository). 도메인을 프레임워크 의존성 없이 순수하게 유지하는 전략.',
    accent: 'var(--color-primary)',
  },
  {
    icon: '🚨',
    title: '에러 처리 패턴',
    href: '/architecture/patterns/error-handling',
    desc: '@ControllerAdvice 전역 예외 핸들러, RFC 7807 Problem Details 표준화, 도메인별 에러 코드 체계 설계.',
    accent: 'var(--color-error)',
  },
  {
    icon: '🔌',
    title: 'Circuit Breaker',
    href: '/architecture/patterns/circuit-breaker',
    desc: 'Closed → Open → Half-Open 상태 전이, Resilience4j 구현, Fallback 전략으로 장애 전파 방지.',
    accent: 'var(--color-warning)',
  },
]

export default function ArchitecturePage() {
  return (
    <SectionLanding
      badge="Architecture"
      icon="🏗"
      title="아키텍처 & 패턴"
      description="소프트웨어 설계 원칙과 검증된 아키텍처 패턴을 다룹니다. 레이어드 · 헥사고날 아키텍처부터 에러 처리, Circuit Breaker까지 실무 관점에서 정리합니다."
      accentColor="var(--color-docker-network)"
      subCards={subCards}
    />
  )
}
