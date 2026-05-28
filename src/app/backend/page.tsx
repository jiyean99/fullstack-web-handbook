import type { Metadata } from 'next'
import { Globe, Server } from 'lucide-react'
import { SiSpring, SiFastapi } from 'react-icons/si'
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
        href: '/backend/http-rest#section1',
      },
      {
        name: '상태 코드 체계',
        desc: '2xx, 4xx, 5xx 상태 코드 분류와 실무에서 자주 쓰는 응답 패턴을 정리합니다.',
        href: '/backend/http-rest#section3',
      },
      {
        name: 'RESTful 리소스 설계',
        desc: '리소스 중심 URI, 계층 구조, 컬렉션/멤버 설계 원칙을 정리합니다.',
        href: '/backend/http-rest#section4',
      },
      {
        name: 'RFC 7807 에러 형식',
        desc: '표준화된 API 에러 응답 포맷으로 클라이언트-서버 간 계약을 명확히 합니다.',
        href: '/backend/http-rest#section5',
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
        href: '/backend/spring-boot#section1',
      },
      {
        name: '의존성 주입 (DI)',
        desc: '느슨한 결합을 위한 Bean 관리 전략과 구성 방법을 정리합니다.',
        href: '/backend/spring-boot#section2',
      },
      {
        name: '트랜잭션 관리',
        desc: '@Transactional의 작동 원리, 전파/격리 수준, 흔한 함정을 정리합니다.',
        href: '/backend/spring-boot#section3',
      },
      {
        name: 'JPA 데이터 접근',
        desc: '엔티티 매핑, 연관관계 설계, N+1 문제와 QueryDSL 활용 전략을 다룹니다.',
        href: '/backend/spring-boot#section4',
      },
      {
        name: '테스팅 전략',
        desc: 'Mockito와 Testcontainers로 계층별 테스트를 구성하는 방법을 설명합니다.',
        href: '/backend/spring-boot#section5',
      },
    ],
  },
  {
    id: 'fastapi',
    title: 'Python / FastAPI',
    icon: <SiFastapi />,
    color: '#009688',
    summary: '타입 힌트로 검증·문서·직렬화를 한 번에 해결하는 비동기 프레임워크',
    items: [
      {
        name: '경로 동작과 타입 힌트',
        desc: '경로 변수·쿼리·본문을 타입 힌트만으로 구분하고 검증하는 방법을 정리합니다.',
        href: '/backend/fastapi#section2',
      },
      {
        name: 'Pydantic 모델 검증',
        desc: '요청·응답 스키마를 Pydantic 모델로 정의해 검증과 직렬화를 통합하는 전략을 다룹니다.',
        href: '/backend/fastapi#section3',
      },
      {
        name: '의존성 주입 (Depends)',
        desc: 'Depends로 DB 세션·인증 사용자 등을 주입하고 정리하는 패턴을 설명합니다.',
        href: '/backend/fastapi#section4',
      },
      {
        name: '동기 vs 비동기',
        desc: 'async def와 def의 선택 기준, 이벤트 루프를 막는 흔한 실수를 정리합니다.',
        href: '/backend/fastapi#section5',
      },
      {
        name: '테스트 전략',
        desc: 'TestClient와 의존성 오버라이드로 빠르게 API를 검증하는 방법을 다룹니다.',
        href: '/backend/fastapi#section6',
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

