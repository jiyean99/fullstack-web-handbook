import type { Metadata } from 'next'
import { Database, Beaker } from 'lucide-react'
import { SiSpring } from 'react-icons/si'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'Spring Boot' }

const sections = [
  {
    id: 'jpa',
    title: 'JPA / 데이터 접근',
    icon: <Database />,
    color: '#6db33f',
    summary: '영속성 컨텍스트와 N+1 문제, QueryDSL 활용',
    items: [
      {
        name: '영속성 컨텍스트',
        desc: '1차 캐시, 변경 감지, flush 타이밍 등 JPA의 핵심 개념을 정리합니다.',
      },
      {
        name: '지연 로딩 & N+1',
        desc: '즉시/지연 로딩 전략과 fetch join, @EntityGraph로 N+1 문제를 해결하는 패턴을 다룹니다.',
      },
      {
        name: 'QueryDSL',
        desc: '타입 안전한 동적 쿼리를 작성하는 방법과 레포지토리 설계 패턴을 설명합니다.',
      },
    ],
  },
  {
    id: 'testing',
    title: '테스팅',
    icon: <Beaker />,
    color: 'var(--color-success)',
    summary: '단위/통합/슬라이스 테스트와 TestContainers',
    items: [
      {
        name: '단위 테스트',
        desc: 'Mockito로 의존성을 격리한 Service/도메인 테스트를 작성합니다.',
      },
      {
        name: '통합 테스트',
        desc: '@SpringBootTest와 TestContainers를 사용해 실제 환경에 가까운 테스트를 구성합니다.',
      },
      {
        name: '슬라이스 테스트',
        desc: '@WebMvcTest, @DataJpaTest 등 슬라이스 테스트를 활용해 레이어별 검증을 수행합니다.',
      },
    ],
  },
]

export default function SpringPage() {
  return (
    <SectionDetailLayout
      badgeLabel="Spring Boot"
      badgeIcon={<SiSpring />}
      badgeAccent="#6db33f"
      title="Spring Boot 실무 패턴"
      description="Spring Boot 기반 백엔드 개발의 핵심 — JPA를 활용한 데이터 접근 전략과 신뢰할 수 있는 테스트 코드 작성법을 다룹니다."
      lastUpdated="2026.03.10"
      readTime="11 min"
      sections={sections}
      quickLinksTitle="Quick Links"
      quickLinksIcon={<SiSpring />}
      quickLinks={[
        { label: 'JPA / 데이터 접근', href: '/backend/spring/jpa' },
        { label: '테스팅 전략', href: '/backend/spring/testing' },
      ]}
      previous={{ href: '/backend', label: 'Backend 개발' }}
      next={{ href: '/devops', label: 'DevOps & 인프라' }}
    />
  )
}

