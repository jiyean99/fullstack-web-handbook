import type { Metadata } from 'next'
import { Layout } from 'lucide-react'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'Frontend' }

const sections = [
  {
    id: 'articles',
    title: 'Frontend 아티클',
    icon: <Layout />,
    color: 'var(--color-primary)',
    summary: 'React · TypeScript · Styling 핵심 주제별 글 모음',
    items: [
      {
        name: 'React 핵심 패턴',
        desc: '클라이언트·서버 상태 구분부터 Zustand·TanStack Query, 렌더링 최적화, 컴포넌트 설계까지 React 실무 패턴을 다룹니다.',
        href: '/frontend/react',
      },
      {
        name: 'TypeScript 실무 타입',
        desc: '유틸리티 타입과 판별 유니온, 도메인 타입 모델링, infer, Zod 런타임 검증까지 타입 전략을 정리합니다.',
        href: '/frontend/typescript',
      },
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
      description="React, TypeScript, Styling 등 프론트엔드 개발의 핵심 개념과 실무 패턴을 체계적으로 정리합니다. 각 주제별 코드 예시와 실무 팁을 함께 제공합니다."
      lastUpdated="2026.06.10"
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

