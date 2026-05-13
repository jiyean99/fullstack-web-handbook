'use client'

import React from 'react'
import styled from 'styled-components'
import { ChevronRight, BookOpen, CheckCircle } from 'lucide-react'

// ─── Layout Shell ───────────────────────────────────
const Shell = styled.div`
  min-height: 100vh;
  color: var(--color-text);
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.25rem var(--sp-12);
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const Sidebar = styled.aside`
  width: 100%;
  border-bottom: 1px solid var(--color-border);
  padding: var(--sp-4);
  position: sticky;
  top: 3.5rem;
  z-index: 10;

  @media (min-width: 768px) {
    width: 260px;
    border-bottom: none;
    height: calc(100vh - 3.5rem);
    top: 3.5rem;
    padding: var(--sp-6);
  }
`

const SidebarHeader = styled.div`
  margin-bottom: var(--sp-5);
  padding-top: var(--sp-2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const SidebarTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const SidebarButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-lg);
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;

  &:hover {
    background: var(--color-surface);
    color: var(--color-text);
  }
  &:hover > *:last-child {
    opacity: 1;
  }
`

const ChevronIcon = styled(ChevronRight)`
  width: 0.9rem;
  height: 0.9rem;
  opacity: 0;
  transition: opacity 0.12s ease;
`

const Main = styled.main`
  flex: 1;
  padding: var(--sp-4) 0;

  @media (min-width: 768px) {
    padding: var(--sp-6) 0 var(--sp-12);
  }
`

const Header = styled.header`
  margin-bottom: var(--sp-10);
`

const Title = styled.h1`
  font-size: clamp(2rem, 3.4vw, 2.8rem);
  font-weight: 900;
  color: var(--color-text);
  letter-spacing: -0.04em;
  margin-bottom: var(--sp-5);
`

export const HeaderQuote = styled.blockquote`
  border-left: 4px solid var(--color-primary);
  padding-left: var(--sp-6);
  padding-block: var(--sp-2);
  margin-bottom: var(--sp-6);
  font-size: 1.05rem;
  color: var(--color-text-muted);
  line-height: 1.8;
`

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: var(--sp-4);
`

// ─── Content Primitives ─────────────────────────────
export const Section = styled.section`
  margin-bottom: var(--sp-12);
  scroll-margin-top: 4.5rem;
`

const SectionTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  margin-bottom: var(--sp-5);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--sp-4);
`

const SectionBadge = styled.span`
  width: 2rem;
  height: 2rem;
  border-radius: 0.75rem;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  flex-shrink: 0;
`

const SectionTitleText = styled.h2`
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--color-text);
`

export const Paragraph = styled.p`
  font-size: 0.98rem;
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: var(--sp-5);
`

export const SectionIntro = styled.p`
  font-size: 0.96rem;
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: var(--sp-6);
`

export const GridTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-4);
  margin-bottom: var(--sp-6);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
  margin-bottom: var(--sp-6);
`

export const Card = styled.div`
  padding: var(--sp-5);
  border-radius: 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
`

export const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: var(--sp-2);
  color: var(--color-text);
`

export const CardText = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.7;
`

export const SmallHeading = styled.h4`
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: var(--sp-1);
`

export const SmallText = styled.p`
  font-size: 0.86rem;
  color: var(--color-text-muted);
  line-height: 1.6;
`

export const Dot = styled.div`
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 999px;
  background: var(--color-primary);
  flex-shrink: 0;
`

// ─── Bullet List ────────────────────────────────────
export const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
`

const BulletRow = styled.li`
  display: flex;
  align-items: flex-start;
  gap: var(--sp-2);
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.7;
`

const BulletDot = styled.div`
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 999px;
  background: var(--color-gray-300);
  margin-top: 0.45rem;
  flex-shrink: 0;
`

export function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <BulletRow>
      <BulletDot />
      <span>{children}</span>
    </BulletRow>
  )
}

// ─── Table ──────────────────────────────────────────
export const TableWrapper = styled.div`
  margin-top: var(--sp-1);
  margin-bottom: var(--sp-6);
  border-radius: 1rem;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  background: var(--color-bg);
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.86rem;
`

export const Th = styled.th`
  padding: var(--sp-4);
  font-weight: 700;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  text-align: left;
`

export const Td = styled.td<{ $muted?: boolean }>`
  padding: var(--sp-4);
  border-bottom: 1px solid var(--color-border);
  background: ${({ $muted }) =>
    $muted ? 'color-mix(in srgb, var(--color-gray-50) 60%, transparent)' : 'transparent'};
  font-weight: ${({ $muted }) => ($muted ? 700 : 400)};
  color: var(--color-text);
  vertical-align: top;
`

// ─── Link Button ────────────────────────────────────
export const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  margin-top: var(--sp-4);
  transition: background 0.15s ease, transform 0.1s ease;

  &:hover {
    background: color-mix(in srgb, var(--color-primary) 18%, var(--color-bg));
    transform: translateY(-1px);
  }
`

// ─── Code Block ─────────────────────────────────────
const CodeWrapper = styled.div`
  margin: 0 0 var(--sp-6);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
`

const CodeLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-text-muted);
`

const CodePre = styled.pre`
  margin: 0;
  padding: var(--sp-4) var(--sp-5);
  background: var(--color-code-bg);
  color: var(--color-code-text);
  overflow-x: auto;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.82rem;
  line-height: 1.7;

  code {
    font-family: inherit;
    background: none;
    border: none;
    padding: 0;
  }
`

export function CodeBlock({
  label,
  children,
}: {
  label?: string
  children: React.ReactNode
}) {
  return (
    <CodeWrapper>
      {label && (
        <CodeLabel>
          <span style={{ color: 'var(--color-error)' }}>●</span>
          <span style={{ color: 'var(--color-warning)' }}>●</span>
          <span style={{ color: 'var(--color-success)' }}>●</span>
          <span style={{ marginLeft: '0.4rem' }}>{label}</span>
        </CodeLabel>
      )}
      <CodePre>
        <code>{children}</code>
      </CodePre>
    </CodeWrapper>
  )
}

// ─── Section Title Block ────────────────────────────
export function SectionTitleBlock({ num, title }: { num: string; title: string }) {
  return (
    <SectionTitleRow>
      <SectionBadge>{num}</SectionBadge>
      <SectionTitleText>{title}</SectionTitleText>
    </SectionTitleRow>
  )
}

// ─── Document Shell ─────────────────────────────────
export interface TocItem {
  id: string
  label: string
}

interface ContentDocProps {
  badge: string
  badgeIcon?: React.ReactNode
  title: string
  quote?: React.ReactNode
  toc: TocItem[]
  children: React.ReactNode
}

export default function ContentDoc({
  badge,
  badgeIcon,
  title,
  quote,
  toc,
  children,
}: ContentDocProps) {
  const scrollTo = (id: string) => {
    if (typeof document === 'undefined') return
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Shell>
      <Sidebar>
        <SidebarHeader>
          <BookOpen size={20} color="var(--color-primary)" />
          <SidebarTitle>목차</SidebarTitle>
        </SidebarHeader>
        <SidebarNav>
          {toc.map((item) => (
            <SidebarButton key={item.id} type="button" onClick={() => scrollTo(item.id)}>
              {item.label}
              <ChevronIcon />
            </SidebarButton>
          ))}
        </SidebarNav>
      </Sidebar>

      <Main>
        <Header>
          <Badge>
            {badgeIcon ?? <CheckCircle size={12} />} {badge}
          </Badge>
          <Title>{title}</Title>
          {quote && <HeaderQuote>{quote}</HeaderQuote>}
        </Header>
        {children}
      </Main>
    </Shell>
  )
}
