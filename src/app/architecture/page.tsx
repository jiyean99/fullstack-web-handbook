import type { Metadata } from 'next'
import { Landmark, Hexagon, TriangleAlert, Plug, Layers } from 'lucide-react'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'Architecture & Patterns' }

const sections = [
  {
    id: 'layered-architecture',
    title: '레이어드 아키텍처',
    icon: <Landmark size={20} />,
    color: 'var(--color-docker-network)',
    summary: 'Presentation · Business · Data 계층 분리 원칙',
    items: [
      {
        name: '계층 분리',
        desc: '프레젠테이션, 도메인, 데이터 계층의 책임과 의존 방향을 명확히 정의합니다.',
      },
      {
        name: 'Controller 규칙',
        desc: 'Controller에서 비즈니스 로직을 제거하고 단순 입출력 어댑터로 유지하는 전략을 다룹니다.',
      },
      {
        name: 'Service 규칙',
        desc: 'Service 레이어에서 HTTP 코드 의존성을 제거하고 순수한 도메인 규칙만 다루는 방법을 설명합니다.',
      },
    ],
  },
  {
    id: 'hexagonal',
    title: '헥사고날 아키텍처',
    icon: <Hexagon size={20} />,
    color: 'var(--color-primary)',
    summary: '포트와 어댑터 패턴으로 도메인 보호',
    items: [
      {
        name: '포트와 어댑터',
        desc: 'Inbound/Outbound Port 정의와 Adapter 구현 패턴을 정리합니다.',
      },
      {
        name: '도메인 독립성',
        desc: '프레임워크 의존성이 도메인으로 스며들지 않도록 계층을 분리하는 방법을 설명합니다.',
      },
      {
        name: '테스트 용이성',
        desc: '포트를 중심으로 도메인을 테스트할 수 있는 구조를 설계합니다.',
      },
    ],
  },
  {
    id: 'error-handling',
    title: '에러 처리 패턴',
    icon: <TriangleAlert size={20} />,
    color: 'var(--color-error)',
    summary: '일관된 에러 응답과 에러 코드 체계 설계',
    items: [
      {
        name: '전역 예외 핸들러',
        desc: '@ControllerAdvice를 활용해 공통 에러 처리 로직을 모듈화합니다.',
      },
      {
        name: 'RFC 7807',
        desc: 'Problem Details 표준을 기반으로 에러 응답을 구조화합니다.',
      },
      {
        name: '도메인별 에러 코드',
        desc: '도메인 경계를 기준으로 에러 코드를 설계하고 문서화하는 전략을 다룹니다.',
      },
    ],
  },
  {
    id: 'circuit-breaker',
    title: 'Circuit Breaker',
    icon: <Plug size={20} />,
    color: 'var(--color-warning)',
    summary: '분산 시스템에서 장애 전파를 막기 위한 보호 장치',
    items: [
      {
        name: '상태 전이',
        desc: 'Closed → Open → Half-Open 상태 전이와 임계치 설정 기준을 정리합니다.',
      },
      {
        name: 'Resilience4j 구현',
        desc: 'Resilience4j를 사용해 Spring 환경에서 Circuit Breaker를 구성하는 방법을 다룹니다.',
      },
      {
        name: 'Fallback 전략',
        desc: '부분 장애 상황에서 graceful degradation을 달성하는 Fallback 설계를 설명합니다.',
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
      lastUpdated="2026.03.10"
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

