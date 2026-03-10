import type { Metadata } from 'next'
import SectionLanding from '@/components/layout/SectionLanding'

export const metadata: Metadata = { title: 'React' }

const subCards = [
  {
    icon: '🔄',
    title: '상태관리',
    href: '/frontend/react/state-management',
    desc: 'useState/useReducer 로컬 상태부터 Zustand 전역 상태, TanStack Query 서버 상태까지 — 상황별 선택 기준과 실무 패턴.',
    accent: 'var(--color-primary)',
  },
  {
    icon: '⚡',
    title: '성능 최적화',
    href: '/frontend/react/performance',
    desc: 'React.memo, useMemo, useCallback으로 불필요한 리렌더 방지. Suspense + lazy로 코드 스플리팅 적용.',
    accent: 'var(--color-success)',
  },
]

export default function ReactPage() {
  return (
    <SectionLanding
      badge="React"
      icon="⚛️"
      title="React 핵심 패턴"
      description="React 실무에서 가장 자주 마주치는 상태관리 전략과 성능 최적화 기법을 정리합니다. 언제, 왜 사용하는지를 중심으로 설명합니다."
      accentColor="var(--color-primary)"
      subCards={subCards}
      parentHref="/frontend"
      parentLabel="Frontend"
    />
  )
}
