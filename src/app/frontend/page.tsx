import type { Metadata } from 'next'
import { Layout, Globe, Layers, Wrench } from 'lucide-react'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'Frontend' }

// 프론트엔드 글은 '기본 → 심화 → 실무' 학습 경로로 묶는다.
// 브라우저·언어 토대 → 프레임워크·성능 → 스타일링·렌더링 전략·접근성 순.
const sections = [
  {
    id: 'foundations',
    title: '기본 · Foundations',
    icon: <Globe />,
    color: 'var(--color-primary)',
    summary: '프레임워크 이전에 알아야 할 브라우저 동작 원리와 타입 기반 언어',
    items: [
      {
        name: '브라우저 렌더링 원리',
        desc: 'HTML 파싱과 DOM·CSSOM, 렌더 트리와 레이아웃·페인트, 임계 렌더링 경로, 리플로우·리페인트, 이벤트 루프, 가상 DOM까지 브라우저의 동작 토대를 세웁니다.',
        href: '/frontend/browser-rendering',
      },
      {
        name: 'TypeScript 실무 타입',
        desc: '유틸리티 타입과 판별 유니온, 도메인 타입 모델링, infer, Zod 런타임 검증까지 타입 전략을 정리합니다.',
        href: '/frontend/typescript',
      },
    ],
  },
  {
    id: 'deep-dive',
    title: '심화 · Deep Dive',
    icon: <Layers />,
    color: 'var(--color-docker-network)',
    summary: '프레임워크와 성능을 깊게 — 컴포넌트·상태·렌더링 비용을 다스리는 법',
    items: [
      {
        name: 'React 핵심 패턴',
        desc: '클라이언트·서버 상태 구분부터 Zustand·TanStack Query, 렌더링 최적화, 컴포넌트 설계까지 React 실무 패턴을 다룹니다.',
        href: '/frontend/react',
      },
    ],
  },
  {
    id: 'in-practice',
    title: '실무 · In Practice',
    icon: <Wrench />,
    color: 'var(--color-success)',
    summary: '현장에서 완성하는 단계 — 스타일링, 렌더링 전략 선택, 그리고 접근성',
    items: [
      {
        name: 'Styling 전략',
        desc: 'styled-components와 디자인 토큰, 다크 모드, CSS 아키텍처와 동적 스타일링 패턴을 다룹니다.',
        href: '/frontend/styling',
      },
      {
        name: '메타프레임워크와 렌더링 전략',
        desc: 'Astro·Next·Remix가 푸는 문제와 CSR/SSR/SSG/ISR, 아일랜드 아키텍처, 콘텐츠 중심 워크플로우, 프레임워크 선택 기준을 정리합니다.',
        href: '/frontend/meta-frameworks',
      },
    ],
  },
]

export default function FrontendPage() {
  return (
    <SectionDetailLayout
      badgeLabel="Frontend Development"
      badgeIcon={<Layout size={14} />}
      badgeAccent="var(--color-primary)"
      title="Frontend 개발"
      description="프론트엔드를 '기본 → 심화 → 실무' 학습 경로로 정리합니다. 브라우저 동작 원리와 타입 기반 언어로 토대를 세운 뒤, React와 성능을 깊게 다루고, 스타일링·렌더링 전략·접근성 같은 현장 주제로 이어집니다."
      lastUpdated="2026.06.17"
      readTime="14 min"
      sections={sections}
      quickLinksTitle="Quick Links"
      quickLinksIcon={<Layout size={16} color="var(--color-primary)" />}
      quickLinks={[
        { label: 'React 공식 문서', href: 'https://react.dev' },
        { label: 'TypeScript 공식 핸드북', href: 'https://www.typescriptlang.org/docs/' },
        { label: 'styled-components 공식 문서', href: 'https://styled-components.com/docs' },
        { label: 'Zustand 공식 문서', href: 'https://docs.pmnd.rs/zustand/getting-started/introduction' },
        { label: 'TanStack Query 공식 문서', href: 'https://tanstack.com/query/latest/docs/framework/react/overview' },
        { label: 'Astro 공식 문서', href: 'https://docs.astro.build' },
      ]}
      previous={undefined}
      next={{ href: '/backend', label: 'Backend 개발' }}
    />
  )
}

