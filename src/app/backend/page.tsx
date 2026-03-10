import type { Metadata } from 'next'
import SectionLanding from '@/components/layout/SectionLanding'
import { Globe, Server } from 'lucide-react'
import { SiSpring } from 'react-icons/si'

export const metadata: Metadata = { title: 'Backend' }

const subCards = [
  {
    icon: <Globe />,
    title: 'HTTP / REST',
    href: '/backend/http',
    desc: 'HTTP 메서드 의미론, 상태 코드 체계, RESTful 리소스 설계 원칙, 멱등성, RFC 7807 에러 형식.',
    accent: 'var(--color-info)',
  },
  {
    icon: <SiSpring />,
    title: 'Spring Boot',
    href: '/backend/spring',
    desc: '실무 레이어드 아키텍처, 의존성 주입, 트랜잭션 관리. JPA 데이터 접근과 테스팅 전략.',
    topics: [
      { label: 'JPA / 데이터 접근 (N+1, QueryDSL)', href: '/backend/spring/jpa' },
      { label: '테스팅 (Mockito, TestContainers)', href: '/backend/spring/testing' },
    ],
    accent: '#6db33f',
  },
]

export default function BackendPage() {
  return (
    <SectionLanding
      badge="Backend"
      icon={<Server />}
      title="Backend 개발"
      description="HTTP/REST API 설계 원칙부터 Spring Boot 실무 패턴, JPA 데이터 접근, 테스팅 전략까지 — 백엔드 개발의 핵심을 체계적으로 정리합니다."
      accentColor="var(--color-success)"
      subCards={subCards}
    />
  )
}
