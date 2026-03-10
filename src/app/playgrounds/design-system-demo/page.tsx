'use client'

export const dynamic = 'force-dynamic'

import styled from 'styled-components'
import { Button } from '@/components/common/Button'
import { H1, H2, H3, H4, Text } from '@/components/common/Typography'

// ─── Layout ──────────────────────────────────────
const PageWrapper = styled.div`
  max-width: 860px;
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
  margin-bottom: var(--sp-10);
  font-size: 1rem;
  line-height: 1.7;
`

const Section = styled.section`
  margin-bottom: var(--sp-12);
`

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  padding-bottom: var(--sp-2);
  border-bottom: 2px solid var(--color-border);
  margin-bottom: var(--sp-6);
`

// ─── Color Palette ───────────────────────────────
const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--sp-3);
`

const ColorChip = styled.div`
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
`

const ChipSwatch = styled.div<{ $bg: string }>`
  height: 56px;
  background: ${({ $bg }) => $bg};
`

const ChipLabel = styled.div`
  padding: var(--sp-2) var(--sp-3);
  background: var(--color-surface);
`

const ChipName = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text);
`

const ChipVar = styled.div`
  font-size: 0.7rem;
  color: var(--color-text-muted);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  margin-top: 2px;
`

// ─── Typography ──────────────────────────────────
const TypoStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
`

const TypoRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: var(--sp-4);
  padding: var(--sp-3) 0;
  border-bottom: 1px solid var(--color-border);
`

const TypoMeta = styled.div`
  min-width: 90px;
  font-size: 0.7rem;
  color: var(--color-text-muted);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  flex-shrink: 0;
`

// ─── Button ──────────────────────────────────────
const ButtonGroup = styled.div`
  margin-bottom: var(--sp-5);
`

const GroupLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  margin-bottom: var(--sp-3);
`

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-3);
  align-items: center;
`

// ─── Shadow ──────────────────────────────────────
const TokenGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--sp-4);
`

const ShadowBox = styled.div<{ $shadow: string }>`
  height: 64px;
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  box-shadow: ${({ $shadow }) => $shadow};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
`

// ─── Data ─────────────────────────────────────────
const palette = [
  { name: 'Primary',       cssVar: '--color-primary',       bg: 'var(--color-primary)' },
  { name: 'Primary Hover', cssVar: '--color-primary-hover',  bg: 'var(--color-primary-hover)' },
  { name: 'Primary Light', cssVar: '--color-primary-light',  bg: 'var(--color-primary-light)' },
  { name: 'Success',       cssVar: '--color-success',        bg: 'var(--color-success)' },
  { name: 'Warning',       cssVar: '--color-warning',        bg: 'var(--color-warning)' },
  { name: 'Error',         cssVar: '--color-error',          bg: 'var(--color-error)' },
  { name: 'Info',          cssVar: '--color-info',           bg: 'var(--color-info)' },
  { name: 'Surface',       cssVar: '--color-surface',        bg: 'var(--color-surface)' },
  { name: 'Border',        cssVar: '--color-border',         bg: 'var(--color-border)' },
  { name: 'Text Muted',    cssVar: '--color-text-muted',     bg: 'var(--color-text-muted)' },
  { name: 'Code BG',       cssVar: '--color-code-bg',        bg: 'var(--color-code-bg)' },
  { name: 'Docker Blue',   cssVar: '--color-docker-blue',    bg: 'var(--color-docker-blue)' },
]

// ─── Component ────────────────────────────────────
export default function DesignSystemDemoPage() {
  return (
    <PageWrapper>
      <PageTitle>🎨 디자인 시스템</PageTitle>
      <PageDesc>
        CSS Custom Properties 기반 디자인 토큰 + styled-components 공통 컴포넌트 쇼케이스.
        우측 상단의 다크모드 토글로 색상 변환을 확인해보세요.
      </PageDesc>

      {/* ── 색상 팔레트 ── */}
      <Section>
        <SectionTitle>🎨 색상 팔레트</SectionTitle>
        <PaletteGrid>
          {palette.map((c) => (
            <ColorChip key={c.cssVar}>
              <ChipSwatch $bg={c.bg} />
              <ChipLabel>
                <ChipName>{c.name}</ChipName>
                <ChipVar>{c.cssVar}</ChipVar>
              </ChipLabel>
            </ColorChip>
          ))}
        </PaletteGrid>
      </Section>

      {/* ── 타이포그래피 ── */}
      <Section>
        <SectionTitle>📝 Typography</SectionTitle>
        <TypoStack>
          <TypoRow>
            <TypoMeta>H1 · 2.25rem</TypoMeta>
            <H1 style={{ margin: 0 }}>페이지 최상위 제목</H1>
          </TypoRow>
          <TypoRow>
            <TypoMeta>H2 · 1.875rem</TypoMeta>
            <H2 style={{ margin: 0 }}>섹션 제목</H2>
          </TypoRow>
          <TypoRow>
            <TypoMeta>H3 · 1.5rem</TypoMeta>
            <H3 style={{ margin: 0 }}>서브섹션 제목</H3>
          </TypoRow>
          <TypoRow>
            <TypoMeta>H4 · 1.25rem</TypoMeta>
            <H4 style={{ margin: 0 }}>세부 제목</H4>
          </TypoRow>
          <TypoRow>
            <TypoMeta>Body</TypoMeta>
            <Text as="p">기본 본문 텍스트입니다. line-height 1.625로 가독성을 높였습니다.</Text>
          </TypoRow>
          <TypoRow>
            <TypoMeta>Lead</TypoMeta>
            <Text variant="lead" as="p">강조된 리드 텍스트. 섹션 도입부에 사용됩니다.</Text>
          </TypoRow>
          <TypoRow>
            <TypoMeta>Muted</TypoMeta>
            <Text variant="muted" as="p">보조 설명, 메타 정보에 사용되는 흐린 텍스트.</Text>
          </TypoRow>
          <TypoRow>
            <TypoMeta>Small</TypoMeta>
            <Text variant="small" as="p">작은 보조 텍스트. 태그, 날짜 등에 활용합니다.</Text>
          </TypoRow>
          <TypoRow>
            <TypoMeta>Code</TypoMeta>
            <Text variant="code" as="span">inlineCode.example()</Text>
          </TypoRow>
        </TypoStack>
      </Section>

      {/* ── 버튼 ── */}
      <Section>
        <SectionTitle>🔘 Button</SectionTitle>
        <ButtonGroup>
          <GroupLabel>Variants</GroupLabel>
          <ButtonRow>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </ButtonRow>
        </ButtonGroup>
        <ButtonGroup>
          <GroupLabel>Sizes</GroupLabel>
          <ButtonRow>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </ButtonRow>
        </ButtonGroup>
        <ButtonGroup>
          <GroupLabel>States</GroupLabel>
          <ButtonRow>
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
          </ButtonRow>
        </ButtonGroup>
      </Section>

      {/* ── 그림자 토큰 ── */}
      <Section>
        <SectionTitle>🌑 Shadow Tokens</SectionTitle>
        <TokenGrid>
          <ShadowBox $shadow="var(--shadow-sm)">shadow-sm</ShadowBox>
          <ShadowBox $shadow="var(--shadow-md)">shadow-md</ShadowBox>
          <ShadowBox $shadow="var(--shadow-lg)">shadow-lg</ShadowBox>
        </TokenGrid>
      </Section>
    </PageWrapper>
  )
}
