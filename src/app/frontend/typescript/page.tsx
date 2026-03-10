import type { Metadata } from 'next'
import { Puzzle } from 'lucide-react'
import { SiTypescript } from 'react-icons/si'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'TypeScript' }

const sections = [
  {
    id: 'typing-patterns',
    title: '타입 패턴',
    icon: <Puzzle />,
    color: '#3178c6',
    summary: '유틸리티 타입과 고급 타입 추론 패턴',
    items: [
      {
        name: '유틸리티 타입',
        desc: 'Partial, Required, Pick, Omit, Record 등 기본 유틸리티 타입의 사용 패턴을 정리합니다.',
      },
      {
        name: 'Discriminated Union',
        desc: '태그 기반 유니온 타입으로 안전한 분기 처리를 구현하는 방법을 다룹니다.',
      },
      {
        name: 'infer를 활용한 타입 추론',
        desc: '조건부 타입과 infer를 이용해 재사용 가능한 타입 유틸리티를 만드는 패턴을 설명합니다.',
      },
      {
        name: 'Zod 연동',
        desc: 'Zod 스키마에서 타입을 추론해 런타임 검증과 정적 타입을 일치시키는 전략을 다룹니다.',
      },
    ],
  },
]

export default function TypeScriptPage() {
  return (
    <SectionDetailLayout
      badgeLabel="TypeScript"
      badgeIcon={<SiTypescript />}
      badgeAccent="#3178c6"
      title="TypeScript 타입 시스템"
      description="실무에서 자주 쓰이는 TypeScript 고급 타입 패턴과 유틸리티 타입을 정리합니다. 타입 안전성을 높이면서도 개발 편의성을 유지하는 방법을 다룹니다."
      lastUpdated="2026.03.10"
      readTime="7 min"
      sections={sections}
      quickLinksTitle="Quick Links"
      quickLinksIcon={<SiTypescript />}
      quickLinks={[
        {
          label: '타입 패턴',
          href: '/frontend/typescript/typing-patterns',
        },
      ]}
      previous={{ href: '/frontend/react', label: 'React 핵심 패턴' }}
      next={{ href: '/frontend/styling/styled-components', label: 'Styling 가이드' }}
    />
  )
}

