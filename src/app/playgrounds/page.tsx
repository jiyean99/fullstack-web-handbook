import type { Metadata } from 'next'
import { Gamepad2, Palette, RefreshCw } from 'lucide-react'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'

export const metadata: Metadata = { title: 'Playgrounds' }

const sections = [
  {
    id: 'state-demo',
    title: '상태관리 데모',
    icon: <RefreshCw />,
    color: 'var(--color-primary)',
    summary: 'Zustand로 구현한 상태관리 실습',
    items: [
      {
        name: '카운터 & 폼 상태',
        desc: '간단한 카운터와 폼 상태를 통해 Zustand의 기본 사용법을 익힙니다.',
      },
      {
        name: '스토어 구조',
        desc: 'store 설계와 action 정의, persist 미들웨어 사용 예시를 다룹니다.',
      },
    ],
  },
  {
    id: 'design-system-demo',
    title: '디자인 시스템 쇼케이스',
    icon: <Palette />,
    color: 'var(--color-docker-network)',
    summary: '색상 팔레트와 타이포그래피, 버튼 컴포넌트 데모',
    items: [
      {
        name: '컬러 & 타이포그래피',
        desc: '디자인 토큰을 기반으로 한 색상 팔레트와 텍스트 스타일을 확인합니다.',
      },
      {
        name: 'Button 컴포넌트',
        desc: '다양한 변형과 상태를 가진 버튼 컴포넌트를 다크/라이트 모드에서 확인합니다.',
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
      lastUpdated="2026.03.10"
      readTime="5 min"
      sections={sections}
      quickLinksTitle="Quick Links"
      quickLinksIcon={<Gamepad2 size={16} color="var(--color-primary)" />}
      quickLinks={[
        { label: '상태관리 데모', href: '/playgrounds/state-demo' },
        {
          label: '디자인 시스템 쇼케이스',
          href: '/playgrounds/design-system-demo',
        },
      ]}
      previous={{ href: '/about', label: 'About' }}
      next={undefined}
    />
  )
}

