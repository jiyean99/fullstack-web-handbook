import type { Metadata } from 'next'
import SectionLanding from '@/components/layout/SectionLanding'
import { Puzzle } from 'lucide-react'
import { SiTypescript } from 'react-icons/si'

export const metadata: Metadata = { title: 'TypeScript' }

const subCards = [
  {
    icon: <Puzzle />,
    title: '타입 패턴',
    href: '/frontend/typescript/typing-patterns',
    desc: 'Partial, Required, Pick, Omit, Record 등 유틸리티 타입. Discriminated Union, infer를 활용한 고급 타입 추론. Zod 런타임 검증 연동.',
    accent: '#3178c6',
  },
]

export default function TypeScriptPage() {
  return (
    <SectionLanding
      badge="TypeScript"
      icon={<SiTypescript />}
      title="TypeScript 타입 시스템"
      description="실무에서 자주 쓰이는 TypeScript 고급 타입 패턴과 유틸리티 타입을 정리합니다. 타입 안전성을 높이면서도 개발 편의성을 유지하는 방법을 다룹니다."
      accentColor="#3178c6"
      subCards={subCards}
      parentHref="/frontend"
      parentLabel="Frontend"
    />
  )
}
