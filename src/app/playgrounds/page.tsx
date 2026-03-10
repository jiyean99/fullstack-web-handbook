'use client'

import styled from 'styled-components'
import Link from 'next/link'

const PageWrapper = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: var(--sp-8) var(--sp-4);
`

const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
  margin-bottom: var(--sp-2);
`

const PageDesc = styled.p`
  color: var(--color-text-muted);
  margin-bottom: var(--sp-8);
  font-size: 1rem;
  line-height: 1.7;
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--sp-4);
`

const PlayCard = styled(Link)<{ $accent: string }>`
  display: flex;
  flex-direction: column;
  padding: var(--sp-5) var(--sp-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-top: 3px solid ${({ $accent }) => $accent};
  border-radius: var(--radius-xl);
  text-decoration: none;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }
`

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: var(--sp-3);
`

const CardTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--sp-2);
`

const CardDesc = styled.div`
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  flex: 1;
  margin-bottom: var(--sp-4);
`

const CardCta = styled.span<{ $accent: string }>`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ $accent }) => $accent};
`

const demos = [
  {
    href: '/playgrounds/state-demo',
    icon: '🔄',
    title: '상태관리 데모',
    desc: 'Zustand로 구현한 카운터와 폼 상태를 직접 조작해보는 인터랙티브 데모.',
    accent: 'var(--color-primary)',
  },
  {
    href: '/playgrounds/design-system-demo',
    icon: '🎨',
    title: '디자인 시스템 쇼케이스',
    desc: '색상 팔레트, Typography, Button 컴포넌트를 다크/라이트 모드에서 확인.',
    accent: 'var(--color-docker-network)',
  },
]

export default function PlaygroundsPage() {
  return (
    <PageWrapper>
      <PageTitle>🎮 Playgrounds</PageTitle>
      <PageDesc>
        개념을 직접 체험할 수 있는 인터랙티브 데모 공간입니다. 이론 페이지의 데모 링크에서도
        접근할 수 있습니다.
      </PageDesc>
      <CardGrid>
        {demos.map((d) => (
          <PlayCard key={d.href} href={d.href} $accent={d.accent}>
            <CardIcon>{d.icon}</CardIcon>
            <CardTitle>{d.title}</CardTitle>
            <CardDesc>{d.desc}</CardDesc>
            <CardCta $accent={d.accent}>데모 보기 →</CardCta>
          </PlayCard>
        ))}
      </CardGrid>
    </PageWrapper>
  )
}
