import type { Metadata } from 'next'
import { Globe, Server } from 'lucide-react'
import { SiSpring } from 'react-icons/si'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'Backend' }

// ─── Data ──────────────────────────────────────────
const sections = [
  {
    id: 'http-rest',
    title: 'HTTP / REST',
    icon: <Globe />,
    color: 'var(--color-info)',
    summary: '효율적인 통신을 위한 API 설계의 표준',
    items: [
      {
        name: 'HTTP 메서드 의미론',
        desc: 'GET, POST, PUT, DELETE의 올바른 활용법과 멱등성 개념을 정리합니다.',
      },
      {
        name: '상태 코드 체계',
        desc: '2xx, 4xx, 5xx 상태 코드 분류와 실무에서 자주 쓰는 응답 패턴을 정리합니다.',
      },
      {
        name: 'RESTful 리소스 설계',
        desc: '리소스 중심 URI, 계층 구조, 컬렉션/멤버 설계 원칙을 정리합니다.',
      },
      {
        name: 'RFC 7807 에러 형식',
        desc: '표준화된 API 에러 응답 포맷으로 클라이언트-서버 간 계약을 명확히 합니다.',
      },
    ],
  },
  {
    id: 'spring-boot',
    title: 'Spring Boot',
    icon: <SiSpring />,
    color: '#6db33f',
    summary: '엔터프라이즈급 애플리케이션 구축을 위한 프레임워크',
    items: [
      {
        name: '레이어드 아키텍처',
        desc: 'Controller-Service-Repository 구조와 각 레이어의 책임 분리를 다룹니다.',
      },
      {
        name: '의존성 주입 (DI)',
        desc: '느슨한 결합을 위한 Bean 관리 전략과 구성 방법을 정리합니다.',
      },
      {
        name: '트랜잭션 관리',
        desc: '@Transactional의 작동 원리, 전파/격리 수준, 흔한 함정을 정리합니다.',
      },
      {
        name: 'JPA 데이터 접근',
        desc: '엔티티 매핑, 연관관계 설계, N+1 문제와 QueryDSL 활용 전략을 다룹니다.',
      },
      {
        name: '테스팅 전략',
        desc: 'Mockito와 Testcontainers로 계층별 테스트를 구성하는 방법을 설명합니다.',
      },
    ],
  },
]

// ─── Component ─────────────────────────────────────
export default function BackendPage() {
  return (
    <SectionDetailLayout
      badgeLabel="Backend Development"
      badgeIcon={<Server size={14} />}
      badgeAccent="var(--color-success)"
      title="Backend 개발"
      description="HTTP/REST API 설계 원칙부터 Spring Boot 실무 패턴, JPA 데이터 접근, 테스팅 전략까지 — 백엔드 개발의 핵심을 체계적으로 정리합니다."
      lastUpdated="2026.03.10"
      readTime="12 min"
      sections={sections}
      quickLinksTitle="Quick Links"
      quickLinksIcon={<Server size={16} color="var(--color-primary)" />}
      quickLinks={[
        { label: 'HTTP / REST 가이드', href: '/backend/http' },
        { label: 'Spring Boot 가이드', href: '/backend/spring' },
      ]}
      previous={{ href: '/frontend', label: 'Frontend 개발' }}
      next={{ href: '/devops', label: 'DevOps & Infra' }}
    />
  )
}

