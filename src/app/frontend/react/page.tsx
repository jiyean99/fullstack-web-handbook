import type { Metadata } from 'next'
import { RefreshCw, Zap } from 'lucide-react'
import { RiReactjsLine } from 'react-icons/ri'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'React' }

const sections = [
  {
    id: 'state-management',
    title: '상태관리',
    icon: <RefreshCw />,
    color: 'var(--color-primary)',
    summary:
      'useState/useReducer 로컬 상태부터 Zustand 전역 상태, TanStack Query 서버 상태까지',
    items: [
      {
        name: '로컬 상태',
        desc: 'useState, useReducer를 활용한 컴포넌트 내부 상태 관리 패턴을 정리합니다.',
      },
      {
        name: '전역 상태',
        desc: 'Zustand를 사용해 전역 상태를 관리하고, 슬라이스 구조로 스토어를 나누는 방법을 다룹니다.',
      },
      {
        name: '서버 상태',
        desc: 'TanStack Query로 API 호출, 캐싱, 리패칭을 처리하는 패턴을 설명합니다.',
      },
    ],
  },
  {
    id: 'performance',
    title: '성능 최적화',
    icon: <Zap />,
    color: 'var(--color-success)',
    summary: '리렌더 최소화와 코드 스플리팅을 통한 React 성능 최적화',
    items: [
      {
        name: '렌더링 최적화',
        desc: 'React.memo, useMemo, useCallback으로 불필요한 리렌더를 줄이는 전략을 다룹니다.',
      },
      {
        name: '코드 스플리팅',
        desc: 'lazy와 Suspense를 이용해 초기 번들을 줄이고 필요할 때만 코드를 로드합니다.',
      },
    ],
  },
]

export default function ReactPage() {
  return (
    <SectionDetailLayout
      badgeLabel="React"
      badgeIcon={<RiReactjsLine />}
      badgeAccent="var(--color-primary)"
      title="React 핵심 패턴"
      description="React 실무에서 가장 자주 마주치는 상태관리 전략과 성능 최적화 기법을 정리합니다. 언제, 왜 사용하는지를 중심으로 설명합니다."
      lastUpdated="2026.03.10"
      readTime="9 min"
      sections={sections}
      quickLinksTitle="Quick Links"
      quickLinksIcon={<RiReactjsLine />}
      quickLinks={[
        {
          label: '상태관리 가이드',
          href: '/frontend/react/state-management',
        },
        {
          label: '성능 최적화',
          href: '/frontend/react/performance',
        },
      ]}
      previous={{ href: '/frontend', label: 'Frontend 개발' }}
      next={{ href: '/frontend/typescript', label: 'TypeScript 타입 시스템' }}
    />
  )
}

