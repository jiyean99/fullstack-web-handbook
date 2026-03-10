import type { Metadata } from 'next'
import SectionLanding from '@/components/layout/SectionLanding'
import { Database, Beaker } from 'lucide-react'
import { SiSpring } from 'react-icons/si'

export const metadata: Metadata = { title: 'Spring Boot' }

const subCards = [
  {
    icon: <Database />,
    title: 'JPA / 데이터 접근',
    href: '/backend/spring/jpa',
    desc: '영속성 컨텍스트, 1차 캐시, 변경 감지. 즉시/지연 로딩 전략. N+1 문제 해결 (fetch join, @EntityGraph). QueryDSL 타입 안전 동적 쿼리.',
    accent: '#6db33f',
  },
  {
    icon: <Beaker />,
    title: '테스팅',
    href: '/backend/spring/testing',
    desc: '단위 테스트(Mockito 격리), 통합 테스트(@SpringBootTest + TestContainers), 슬라이스 테스트(@WebMvcTest, @DataJpaTest). 테스트 피라미드 전략.',
    accent: 'var(--color-success)',
  },
]

export default function SpringPage() {
  return (
    <SectionLanding
      badge="Spring Boot"
      icon={<SiSpring />}
      title="Spring Boot 실무 패턴"
      description="Spring Boot 기반 백엔드 개발의 핵심 — JPA를 활용한 데이터 접근 전략과 신뢰할 수 있는 테스트 코드 작성법을 다룹니다."
      accentColor="#6db33f"
      subCards={subCards}
      parentHref="/backend"
      parentLabel="Backend"
    />
  )
}
