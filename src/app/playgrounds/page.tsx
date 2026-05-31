import type { Metadata } from 'next'
import { Gamepad2 } from 'lucide-react'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'Playgrounds' }

const sections = [
  {
    id: 'demos',
    title: 'Playground 데모',
    icon: <Gamepad2 />,
    color: 'var(--color-primary)',
    summary: '직접 조작하며 개념을 체험하는 인터랙티브 데모 모음',
    items: [
      {
        name: '상태관리 Playground',
        desc: 'Zustand 카운터·폼·파생 상태·persist·비동기 액션과 셀렉터 최적화를 직접 조작하며 익힙니다.',
        href: '/playgrounds/state',
      },
      {
        name: '디자인 시스템 Playground',
        desc: '컬러·간격·타이포그래피 토큰과 Button 컴포넌트의 변형을 인터랙티브 빌더로 조합해 봅니다.',
        href: '/playgrounds/design-system',
      },
    ],
  },
]

export default function PlaygroundsPage() {
  return (
    <SectionDetailLayout
      badgeLabel="Playgrounds"
      badgeIcon={<Gamepad2 size={18} />}
      badgeAccent="var(--color-primary)"
      title="Playgrounds"
      description="개념을 직접 체험할 수 있는 인터랙티브 데모 공간입니다. 이론 페이지의 데모 링크에서도 접근할 수 있습니다."
      lastUpdated="2026.05.26"
      readTime="5 min"
      sections={sections}
      quickLinksTitle="Quick Links"
      quickLinksIcon={<Gamepad2 size={16} color="var(--color-primary)" />}
      quickLinks={[
        { label: 'Zustand 공식 문서', href: 'https://docs.pmnd.rs/zustand/getting-started/introduction' },
        { label: 'styled-components 공식 문서', href: 'https://styled-components.com/docs' },
        { label: 'Storybook 공식 문서', href: 'https://storybook.js.org/docs' },
      ]}
      previous={{ href: '/about', label: 'About' }}
      next={undefined}
    />
  )
}

