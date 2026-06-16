import type { Metadata } from 'next'
import { Server, Workflow, Layers, Wrench } from 'lucide-react'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'Backend' }

// ─── Data ──────────────────────────────────────────
// 백엔드 글은 '기본 → 심화 → 실무' 학습 경로로 묶는다.
// 각 단계가 다음 단계의 전제가 되도록 순서를 설계했다.
const sections = [
  {
    id: 'foundations',
    title: '기본 · Foundations',
    icon: <Workflow />,
    color: 'var(--color-success)',
    summary: '프레임워크 이전에 알아야 할 요청 처리의 큰 그림과 API 설계 기본',
    items: [
      {
        name: '백엔드 동작 원리',
        desc: '요청 한 건이 처리되는 흐름부터 웹서버와 WAS, 계층 구조, 무상태성과 수평 확장, 스레드·커넥션 풀까지 백엔드의 공통 뼈대를 세웁니다.',
        href: '/backend/fundamentals',
      },
      {
        name: 'HTTP / REST API 설계',
        desc: 'HTTP 메서드 의미론과 멱등성, 상태 코드 체계, RESTful 리소스 설계, RFC 7807 에러 형식까지 API 설계 표준을 정리합니다.',
        href: '/backend/http-rest',
      },
    ],
  },
  {
    id: 'deep-dive',
    title: '심화 · Deep Dive',
    icon: <Layers />,
    color: 'var(--color-primary)',
    summary: '프레임워크와 데이터 계층을 깊게 — 관례 위에서 견고하게 만드는 법',
    items: [
      {
        name: 'Spring Boot 실무 패턴',
        desc: '레이어드 아키텍처, 의존성 주입, 트랜잭션 관리, JPA 데이터 접근, 계층별 테스팅 전략을 다룹니다.',
        href: '/backend/spring-boot',
      },
      {
        name: '데이터베이스와 트랜잭션 심화',
        desc: 'ACID와 트랜잭션 경계, 격리 수준과 이상 현상, 낙관적·비관적 락, 인덱스와 실행 계획, N+1 쿼리까지 데이터 계층을 깊게 다룹니다.',
        href: '/backend/database-transactions',
      },
    ],
  },
  {
    id: 'in-practice',
    title: '실무 · In Practice',
    icon: <Wrench />,
    color: 'var(--color-docker-blue)',
    summary: '현장에서 마주치는 비동기 API와 보안 — 만들고 지키는 단계',
    items: [
      {
        name: 'Python & FastAPI',
        desc: '타입 힌트 기반 경로 동작과 Pydantic 검증, Depends 주입, async 설계, TestClient 테스트까지 비동기 API 패턴을 정리합니다.',
        href: '/backend/fastapi',
      },
      {
        name: '인증·인가와 API 보안',
        desc: '인증과 인가의 차이, 세션과 JWT, JWT의 구조와 함정, RBAC 인가 모델, OWASP 기반 흔한 취약점 방어까지 만든 API를 지키는 법을 정리합니다.',
        href: '/backend/auth-security',
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
      description="백엔드를 '기본 → 심화 → 실무' 학습 경로로 정리합니다. 요청 처리의 원리와 API 설계 기본을 세운 뒤, 프레임워크와 데이터 계층을 깊게 다루고, 비동기 API와 보안 같은 현장 주제로 이어집니다."
      lastUpdated="2026.06.16"
      readTime="24 min"
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

