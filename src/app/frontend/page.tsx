import type { Metadata } from 'next'
import { Layout, Palette } from 'lucide-react'
import { RiReactjsLine } from 'react-icons/ri'
import { SiTypescript } from 'react-icons/si'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'Frontend' }

const sections = [
  {
    id: 'react',
    title: 'React',
    icon: <RiReactjsLine />,
    color: 'var(--color-primary)',
    summary: '상태관리, 성능 최적화, 훅 패턴 등 React 핵심 실무 패턴',
    items: [
      {
        name: '상태관리 전략',
        desc: 'Zustand, TanStack Query를 활용한 전역 상태와 서버 상태 관리 전략을 정리합니다.',
      },
      {
        name: '성능 최적화',
        desc: 'memo, useMemo, Suspense 등을 이용해 불필요한 렌더링을 줄이는 방법을 다룹니다.',
      },
      {
        name: '컴포넌트 설계',
        desc: 'Container / Presentational 패턴과 훅 추출 기준 등 재사용 가능한 컴포넌트 구조를 설명합니다.',
      },
    ],
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    icon: <SiTypescript />,
    color: '#3178c6',
    summary: '고급 타입 시스템과 유틸리티 타입, 런타임 검증 패턴',
    items: [
      {
        name: '타입 패턴',
        desc: 'Partial, Omit, infer, Discriminated Union 등 실무에서 자주 쓰는 타입 패턴을 정리합니다.',
      },
      {
        name: '도메인 타입 모델링',
        desc: '도메인 규칙을 타입에 녹이는 방법과 유효성 검사를 조합하는 전략을 다룹니다.',
      },
      {
        name: '런타임 타입 검증',
        desc: 'Zod를 활용해 API 응답과 폼 입력을 안전하게 검증하는 방법을 설명합니다.',
      },
    ],
  },
  {
    id: 'styling',
    title: 'Styling',
    icon: <Palette />,
    color: 'var(--color-docker-network)',
    summary: 'CSS-in-JS 패턴과 디자인 토큰, CSS 아키텍처 전략',
    items: [
      {
        name: 'styled-components 패턴',
        desc: 'Theme Provider와 디자인 토큰을 활용해 일관된 스타일 시스템을 구성하는 방법을 다룹니다.',
      },
      {
        name: 'CSS 아키텍처',
        desc: '레이어 구조, 유틸리티 클래스, 컴포넌트 기반 스타일링 전략을 정리합니다.',
      },
      {
        name: '다크 모드',
        desc: 'CSS 변수와 전역 테마 전환으로 다크/라이트 모드를 구현하는 패턴을 설명합니다.',
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
      lastUpdated="2026.03.10"
      readTime="10 min"
      sections={sections}
      quickLinksTitle="Quick Links"
      quickLinksIcon={<Layout size={16} color="var(--color-primary)" />}
      quickLinks={[
        { label: 'React 공식 문서', href: 'https://react.dev' },
        { label: 'TypeScript 공식 핸드북', href: 'https://www.typescriptlang.org/docs/' },
        { label: 'styled-components 공식 문서', href: 'https://styled-components.com/docs' },
        { label: 'Zustand 공식 문서', href: 'https://docs.pmnd.rs/zustand/getting-started/introduction' },
        { label: 'TanStack Query 공식 문서', href: 'https://tanstack.com/query/latest/docs/framework/react/overview' },
      ]}
      previous={undefined}
      next={{ href: '/backend', label: 'Backend 개발' }}
    />
  )
}

