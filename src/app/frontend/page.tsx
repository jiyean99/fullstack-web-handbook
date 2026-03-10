import type { Metadata } from 'next'
import SectionLanding from '@/components/layout/SectionLanding'

export const metadata: Metadata = { title: 'Frontend' }

const subCards = [
  {
    icon: '⚛️',
    title: 'React',
    href: '/frontend/react',
    desc: '상태관리, 성능 최적화, 훅 패턴 등 React 핵심 실무 패턴을 다룹니다.',
    topics: [
      { label: '상태관리 전략 (Zustand, TanStack Query)', href: '/frontend/react/state-management' },
      { label: '성능 최적화 (memo, useMemo, Suspense)', href: '/frontend/react/performance' },
    ],
    accent: 'var(--color-primary)',
  },
  {
    icon: '🔷',
    title: 'TypeScript',
    href: '/frontend/typescript',
    desc: '고급 타입 시스템, 유틸리티 타입, Zod 런타임 검증 패턴을 정리합니다.',
    topics: [
      { label: '타입 패턴 (Partial, Omit, infer, Discriminated Union)', href: '/frontend/typescript/typing-patterns' },
    ],
    accent: '#3178c6',
  },
  {
    icon: '🎨',
    title: 'Styling',
    href: '/frontend/styling/styled-components',
    desc: 'CSS-in-JS 패턴, 디자인 토큰, CSS 아키텍처 전략을 다룹니다.',
    topics: [
      { label: 'styled-components 실무 패턴', href: '/frontend/styling/styled-components' },
      { label: 'CSS 아키텍처 & 디자인 토큰', href: '/frontend/styling/css-architecture' },
    ],
    accent: 'var(--color-docker-network)',
  },
]

export default function FrontendPage() {
  return (
    <SectionLanding
      badge="Frontend"
      icon="📱"
      title="Frontend 개발"
      description="React, TypeScript, Styling 등 프론트엔드 개발의 핵심 개념과 실무 패턴을 체계적으로 정리합니다. 각 주제별 코드 예시와 실무 팁을 함께 제공합니다."
      accentColor="var(--color-primary)"
      subCards={subCards}
    />
  )
}
