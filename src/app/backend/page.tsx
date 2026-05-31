import type { Metadata } from 'next'
import { Server } from 'lucide-react'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'Backend' }

// ─── Data ──────────────────────────────────────────
const sections = [
  {
    id: 'articles',
    title: 'Backend 아티클',
    icon: <Server />,
    color: 'var(--color-success)',
    summary: 'HTTP/REST 설계와 Spring Boot, Python·FastAPI 주제별 글 모음',
    items: [
      {
        name: 'HTTP / REST API 설계',
        desc: 'HTTP 메서드 의미론과 멱등성, 상태 코드 체계, RESTful 리소스 설계, RFC 7807 에러 형식까지 API 설계 표준을 정리합니다.',
        href: '/backend/http-rest',
      },
      {
        name: 'Spring Boot 실무 패턴',
        desc: '레이어드 아키텍처, 의존성 주입, 트랜잭션 관리, JPA 데이터 접근, 계층별 테스팅 전략을 다룹니다.',
        href: '/backend/spring-boot',
      },
      {
        name: 'Python & FastAPI',
        desc: '타입 힌트 기반 경로 동작과 Pydantic 검증, Depends 주입, async 설계, TestClient 테스트까지 비동기 API 패턴을 정리합니다.',
        href: '/backend/fastapi',
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
      description="HTTP/REST API 설계 원칙부터 Spring Boot 실무 패턴, JPA 데이터 접근, 그리고 Python·FastAPI 기반 비동기 API까지 — 백엔드 개발의 핵심을 체계적으로 정리합니다."
      lastUpdated="2026.05.28"
      readTime="16 min"
      sections={sections}
      quickLinksTitle="Quick Links"
      quickLinksIcon={<Server size={16} color="var(--color-primary)" />}
      quickLinks={[
        { label: 'MDN HTTP 레퍼런스', href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
        { label: 'Spring Boot 공식 문서', href: 'https://docs.spring.io/spring-boot/docs/current/reference/html/' },
        { label: 'Spring Data JPA 레퍼런스', href: 'https://docs.spring.io/spring-data/jpa/reference/' },
        { label: 'RFC 7807 Problem Details', href: 'https://www.rfc-editor.org/rfc/rfc7807' },
        { label: 'FastAPI 공식 문서', href: 'https://fastapi.tiangolo.com/' },
        { label: 'Pydantic 공식 문서', href: 'https://docs.pydantic.dev/latest/' },
      ]}
      previous={{ href: '/frontend', label: 'Frontend 개발' }}
      next={{ href: '/devops', label: 'DevOps & Infra' }}
    />
  )
}

