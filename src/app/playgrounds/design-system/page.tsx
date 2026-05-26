'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import { Palette, MousePointerClick } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Heading, Text } from '@/components/common/Typography'
import ContentDoc, {
  Section,
  SectionTitleBlock,
  Paragraph,
  SectionIntro,
  Card,
  CardTitle,
  CardText,
  HeaderQuote,
} from '@/components/content/ContentDoc'

const toc = [
  { id: 'section1', label: '1. 컬러 팔레트' },
  { id: 'section2', label: '2. 타이포그래피' },
  { id: 'section3', label: '3. Button 컴포넌트' },
  { id: 'section4', label: '4. 인터랙티브 빌더' },
]

// ─── Demo Widgets ───────────────────────────────────
const DemoStage = styled.div`
  padding: var(--sp-6);
  border-radius: 1rem;
  border: 1px dashed var(--color-border);
  background: var(--color-surface);
  margin-bottom: var(--sp-5);
`

const SwatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--sp-3);
`

const Swatch = styled.div`
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
`

const SwatchColor = styled.div<{ $token: string }>`
  height: 3.5rem;
  background: var(${({ $token }) => $token});
`

const SwatchMeta = styled.div`
  padding: 0.5rem 0.65rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--color-text-muted);
`

const ButtonRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: var(--sp-4);

  &:last-child {
    margin-bottom: 0;
  }
`

const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-4);
  margin-top: var(--sp-5);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const ControlLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
`

const ChipRow = styled.div`
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
`

const Chip = styled.button<{ $active: boolean }>`
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-border)')};
  background: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-bg)')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--color-text-muted)')};
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;

  &:hover {
    border-color: var(--color-primary);
  }
`

const PreviewArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-6);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  min-height: 5rem;
`

const colorTokens = [
  '--color-primary',
  '--color-primary-light',
  '--color-success',
  '--color-warning',
  '--color-error',
  '--color-info',
  '--color-text',
  '--color-text-muted',
  '--color-border',
  '--color-surface',
]

const variants = ['primary', 'secondary', 'ghost', 'danger'] as const
const sizes = ['sm', 'md', 'lg'] as const

type Variant = (typeof variants)[number]
type Size = (typeof sizes)[number]

export default function DesignSystemPlaygroundPage() {
  const [variant, setVariant] = useState<Variant>('primary')
  const [size, setSize] = useState<Size>('md')
  const [loading, setLoading] = useState(false)
  const [fullWidth, setFullWidth] = useState(false)

  return (
    <ContentDoc
      badge="Design System"
      badgeIcon={<Palette size={12} />}
      title="디자인 시스템 Playground"
      quote={
        <>
          디자인 토큰과 공용 컴포넌트가 실제로 어떻게 보이는지 한자리에 모았다. 색상·타이포·버튼을
          눈으로 확인하고, 마지막엔 컨트롤을 조작해 Button의 변형을 직접 조합해 본다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="컬러 팔레트" />
        <Paragraph>
          모든 색상은 CSS 변수 토큰으로 정의돼 있다. 아래 스와치는 라이트/다크 모드에 따라 자동으로
          값이 바뀐다 — 우측 상단 테마 토글로 확인해 보자.
        </Paragraph>

        <DemoStage>
          <SwatchGrid>
            {colorTokens.map((token) => (
              <Swatch key={token}>
                <SwatchColor $token={token} />
                <SwatchMeta>{token}</SwatchMeta>
              </Swatch>
            ))}
          </SwatchGrid>
        </DemoStage>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="타이포그래피" />
        <SectionIntro>
          <code>Typography</code> 컴포넌트가 제공하는 제목(H1~H4)과 본문 변형이다. 일관된 스케일을
          한곳에서 관리한다.
        </SectionIntro>

        <DemoStage>
          <Heading as="h1">Heading 1 — 제목</Heading>
          <Heading as="h2">Heading 2 — 제목</Heading>
          <Heading as="h3">Heading 3 — 제목</Heading>
          <Heading as="h4">Heading 4 — 제목</Heading>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Text variant="lead">Lead — 도입부에 쓰는 약간 큰 본문 텍스트입니다.</Text>
            <Text variant="body">Body — 일반 본문 텍스트입니다.</Text>
            <Text variant="muted">Muted — 부가 설명용 흐린 텍스트입니다.</Text>
            <Text as="span" variant="code">
              const code = &apos;인라인 코드 텍스트&apos;
            </Text>
          </div>
        </DemoStage>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="Button 컴포넌트" />
        <Paragraph>
          <code>Button</code>은 4가지 변형(variant)과 3가지 크기(size)를 조합한다. 상태별
          스타일도 토큰을 참조하므로 다크 모드에서도 일관된다.
        </Paragraph>

        <DemoStage>
          <ButtonRow>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </ButtonRow>
          <ButtonRow>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </ButtonRow>
          <ButtonRow>
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
          </ButtonRow>
        </DemoStage>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="인터랙티브 빌더" />
        <SectionIntro>
          아래 컨트롤을 조작하면 미리보기 버튼이 실시간으로 바뀐다. 컴포넌트의 props 조합을 직접
          체험해 보자.
        </SectionIntro>

        <DemoStage>
          <PreviewArea>
            <Button variant={variant} size={size} isLoading={loading} fullWidth={fullWidth}>
              {loading ? '처리 중' : '미리보기 버튼'}
            </Button>
          </PreviewArea>

          <ControlPanel>
            <ControlGroup>
              <ControlLabel>variant</ControlLabel>
              <ChipRow>
                {variants.map((v) => (
                  <Chip key={v} $active={variant === v} onClick={() => setVariant(v)}>
                    {v}
                  </Chip>
                ))}
              </ChipRow>
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>size</ControlLabel>
              <ChipRow>
                {sizes.map((s) => (
                  <Chip key={s} $active={size === s} onClick={() => setSize(s)}>
                    {s}
                  </Chip>
                ))}
              </ChipRow>
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>isLoading</ControlLabel>
              <ChipRow>
                <Chip $active={loading} onClick={() => setLoading(true)}>
                  true
                </Chip>
                <Chip $active={!loading} onClick={() => setLoading(false)}>
                  false
                </Chip>
              </ChipRow>
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>fullWidth</ControlLabel>
              <ChipRow>
                <Chip $active={fullWidth} onClick={() => setFullWidth(true)}>
                  true
                </Chip>
                <Chip $active={!fullWidth} onClick={() => setFullWidth(false)}>
                  false
                </Chip>
              </ChipRow>
            </ControlGroup>
          </ControlPanel>
        </DemoStage>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <MousePointerClick size={18} color="var(--color-primary)" /> Storybook과의 관계
          </CardTitle>
          <CardText>
            이런 변형 조합 실험은 Storybook의 Controls와 같은 발상이다. 컴포넌트를 앱과 분리해
            모든 상태를 한자리에서 점검하면, 디자인 일관성과 회귀를 빠르게 잡아낼 수 있다.
          </CardText>
        </Card>
      </Section>

      <HeaderQuote>
        디자인 시스템은 &lsquo;같은 토큰과 같은 컴포넌트를 공유&rsquo;할 때 완성된다.
        <br />
        <strong>색·타이포·컴포넌트를 한 원천에서 관리하면, 일관성은 저절로 따라온다.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
