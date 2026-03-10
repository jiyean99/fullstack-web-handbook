'use client'

import styled, { keyframes } from 'styled-components'
import Link from 'next/link'

// ─── Animations ───────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`

// ─── Hero ─────────────────────────────────────────
const HeroSection = styled.section`
  padding: 4rem 0 3rem;
  text-align: center;
  animation: ${fadeUp} 0.5s ease both;
`

const HeroBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.9rem;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 1.25rem;
`

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 1rem;

  span {
    color: var(--color-primary);
  }
`

const HeroDesc = styled.p`
  font-size: 1.1rem;
  color: var(--color-text-muted);
  max-width: 540px;
  margin: 0 auto 2rem;
  line-height: 1.7;
`

const HeroActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
`

const HeroBtn = styled(Link)<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  padding: 0.65rem 1.4rem;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.15s;
  text-decoration: none;
  background: ${({ $primary }) => ($primary ? 'var(--color-primary)' : 'var(--color-surface)')};
  color: ${({ $primary }) => ($primary ? '#fff' : 'var(--color-text)')};
  border: 1px solid ${({ $primary }) => ($primary ? 'transparent' : 'var(--color-border)')};
  box-shadow: var(--shadow-sm);

  &:hover {
    background: ${({ $primary }) =>
      $primary ? 'var(--color-primary-hover)' : 'var(--color-gray-100)'};
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
`

// ─── Section Cards ─────────────────────────────────
const SectionGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin: 2rem 0 3rem;
`

const CardWrapper = styled(Link)<{ $accent: string }>`
  display: block;
  padding: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: var(--shadow-sm);
  border-top: 3px solid ${({ $accent }) => $accent};
  animation: ${fadeUp} 0.5s ease both;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: ${({ $accent }) => $accent};
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
`

const CardIcon = styled.span`
  font-size: 1.5rem;
  line-height: 1;
`

const CardTitle = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
`

const CardLinks = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

const CardLinkItem = styled.li`
  font-size: 0.82rem;
  color: var(--color-text-muted);

  &::before {
    content: '→ ';
    color: var(--color-primary);
    font-weight: 600;
  }
`

// ─── Stack Badges ──────────────────────────────────
const StackSection = styled.section`
  padding: 2rem 0;
  border-top: 1px solid var(--color-border);
`

const StackLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
`

const StackBadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const StackBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background: var(--color-gray-100);
  color: var(--color-text-muted);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--color-border);
`

// ─── Data ─────────────────────────────────────────
const sections = [
  {
    icon: '📱',
    title: 'Frontend',
    href: '/frontend',
    accent: 'var(--color-primary)',
    links: ['React & 상태관리', 'TypeScript 패턴', 'styled-components'],
  },
  {
    icon: '🖥',
    title: 'Backend',
    href: '/backend',
    accent: 'var(--color-success)',
    links: ['HTTP / REST', 'Spring Boot', 'JPA & 테스트'],
  },
  {
    icon: '🐳',
    title: 'DevOps & Infra',
    href: '/devops',
    accent: 'var(--color-docker-blue)',
    links: ['Docker & 네트워크', 'CI/CD', 'AWS'],
  },
  {
    icon: '🏗',
    title: 'Architecture',
    href: '/architecture',
    accent: 'var(--color-docker-network)',
    links: ['레이어드 아키텍처', 'Hexagonal', '에러 핸들링 패턴'],
  },
  {
    icon: '🎮',
    title: 'Playgrounds',
    href: '/playgrounds',
    accent: 'var(--color-docker-container)',
    links: ['상태관리 데모', '디자인 시스템 쇼케이스'],
  },
  {
    icon: 'ℹ️',
    title: 'About',
    href: '/about',
    accent: 'var(--color-gray-400)',
    links: ['Changelog', '작성 가이드라인'],
  },
]

const stacks = [
  'Next.js 15',
  'React 19',
  'TypeScript',
  'styled-components',
  'TanStack Query',
  'Zustand',
  'Zod',
  'Nextra',
  'Storybook',
]

// ─── Component ────────────────────────────────────
export default function OverviewPage() {
  return (
    <div>
      <HeroSection>
        <HeroBadge>개발 단권화 핸드북</HeroBadge>
        <HeroTitle>
          Fullstack <span>Web</span> Handbook
        </HeroTitle>
        <HeroDesc>
          BE · FE · DevOps 전반을 다루는 개인 웹개발 레퍼런스.
          <br />
          미래의 나와 면접관을 위한 실무 중심 정리 공간입니다.
        </HeroDesc>
        <HeroActions>
          <HeroBtn href="/frontend" $primary>
            Frontend 시작 →
          </HeroBtn>
          <HeroBtn href="/devops">DevOps 보기</HeroBtn>
          <HeroBtn href="/playgrounds">🎮 Playgrounds</HeroBtn>
        </HeroActions>
      </HeroSection>

      <SectionGrid>
        {sections.map((s, i) => (
          <CardWrapper
            key={s.href}
            href={s.href}
            $accent={s.accent}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <CardHeader>
              <CardIcon>{s.icon}</CardIcon>
              <CardTitle>{s.title}</CardTitle>
            </CardHeader>
            <CardLinks>
              {s.links.map((l) => (
                <CardLinkItem key={l}>{l}</CardLinkItem>
              ))}
            </CardLinks>
          </CardWrapper>
        ))}
      </SectionGrid>

      <StackSection>
        <StackLabel>기술 스택</StackLabel>
        <StackBadgeRow>
          {stacks.map((s) => (
            <StackBadge key={s}>{s}</StackBadge>
          ))}
        </StackBadgeRow>
      </StackSection>
    </div>
  )
}
