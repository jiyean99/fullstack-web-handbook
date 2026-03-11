'use client'

import styled, { keyframes } from 'styled-components'
import Link from 'next/link'
import {
  Layout as LayoutIcon,
  Server,
  Layers,
  Gamepad2,
  Info,
  ArrowRight,
  Github,
  Palette,
} from 'lucide-react'
import { DiDocker } from 'react-icons/di'

// ─── Animations ───────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`

// ─── Layout Shell ─────────────────────────────────
const PageWrapper = styled.div`
  position: relative;
  padding: 3.5rem 1.5rem 3rem;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 4.5rem 1.5rem 3.5rem;
  }
`

const PageInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.5;
  z-index: -1;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 999px;
    filter: blur(120px);
  }

  &::before {
    top: -6rem;
    left: 5%;
    width: 18rem;
    height: 18rem;
    background: #2563eb;
  }

  &::after {
    bottom: -8rem;
    right: 0;
    width: 22rem;
    height: 22rem;
    background: #6366f1;
  }
`

// ─── Hero ─────────────────────────────────────────
const HeroSection = styled.section`
  text-align: center;
  animation: ${fadeUp} 0.5s ease both;
`

const HeroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  background: color-mix(in srgb, var(--color-bg) 40%, var(--color-primary-light) 60%);
  color: #1d4ed8;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid rgba(148, 163, 184, 0.45);
  margin-bottom: 1.6rem;
`

const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 6vw, 3.8rem);
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.06em;
  line-height: 1.08;
  margin-bottom: 1.2rem;

  span {
    background: linear-gradient(90deg, #2563eb, #6366f1, #a855f7);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`

const HeroDesc = styled.p`
  font-size: 1.08rem;
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0 auto 2.2rem;
  line-height: 1.8;
  font-weight: 500;
`

const HeroActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  align-items: center;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.9rem 2.4rem;
  border-radius: 1.25rem;
  font-size: 0.96rem;
  font-weight: 700;
  text-decoration: none;
  background: #2563eb;
  color: #ffffff;
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.35);
  border: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 24px 50px rgba(37, 99, 235, 0.4);
  }
`

const SecondaryGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem;
  border-radius: 1.5rem;
  background: color-mix(in srgb, var(--color-bg) 70%, rgba(148, 163, 184, 0.15));
  border: 1px solid rgba(148, 163, 184, 0.45);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.05);
`

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.4rem;
  border-radius: 1.1rem;
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
  border: none;
  background: transparent;
  transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.12s ease;

  svg {
    width: 1rem;
    height: 1rem;
    color: var(--color-text-muted);
  }

  &:hover {
    background: var(--color-bg);
    box-shadow: 0 10px 26px rgba(15, 23, 42, 0.06);
    transform: translateY(-1px);
  }
`

const SecondaryDivider = styled.div`
  width: 1px;
  height: 1.4rem;
  background: rgba(148, 163, 184, 0.6);
`

// ─── Section Cards ─────────────────────────────────
const SectionGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.75rem;
  margin: 2.75rem 0 3.5rem;
`

const CardWrapper = styled(Link)<{ $accent: string }>`
  position: relative;
  display: block;
  padding: 2rem 1.8rem 1.8rem;
  background: #ffffff;
  border-radius: 1.6rem;
  text-decoration: none;
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(241, 245, 249, 0.9);
  transform: translateY(0);
  transition: transform 0.2s ease, box-shadow 0.2s ease,
    border-color 0.2s ease, background 0.2s ease;
  animation: ${fadeUp} 0.5s ease both;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 26px 60px rgba(15, 23, 42, 0.12);
    border-color: ${({ $accent }) => $accent};
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.2rem;
`

const CardHeaderMain = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const CardIcon = styled.div<{ $accent: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 0.9rem;
  background: color-mix(in srgb, ${({ $accent }) => $accent} 10%, #f9fafb);
  color: ${({ $accent }) => $accent};

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`

const CardTitle = styled.span`
  font-size: 1.02rem;
  font-weight: 700;
  color: var(--color-text);
`

const CardProgress = styled.div`
  width: 3rem;
  height: 0.32rem;
  border-radius: 999px;
  background: var(--color-gray-100);
  overflow: hidden;
`

const CardProgressInner = styled.div<{ $accent: string }>`
  width: 0;
  height: 100%;
  border-radius: inherit;
  background: ${({ $accent }) =>
    `linear-gradient(90deg, ${$accent}, rgba(59,130,246,0.8))`};
  transition: width 0.4s ease;

  ${CardWrapper}:hover & {
    width: 100%;
  }
`

const CardDescription = styled.p`
  font-size: 0.86rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 0.9rem;
`

const CardLinks = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const CardLinkItem = styled.li`
  font-size: 0.84rem;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 0.45rem;
`

const CardLinkBullet = styled.span<{ $accent: string }>`
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 999px;
  background: var(--color-gray-300);
`

// ─── Stack Badges ──────────────────────────────────
const StackSection = styled.section`
  padding: 2.8rem 0 0;
`

const StackPanel = styled.div`
  border-radius: 2rem;
  padding: 2.6rem 2rem;
  background: linear-gradient(
    135deg,
    rgba(248, 250, 252, 0.95),
    rgba(239, 246, 255, 0.95)
  );
  border: 1px solid rgba(226, 232, 240, 0.9);
  text-align: center;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.09);
`

const StackLabel = styled.p`
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--color-text-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.4rem;
`

const StackDivider = styled.span`
  width: 2.5rem;
  height: 1px;
  background: rgba(148, 163, 184, 0.6);
`

const StackBadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem;
`

const StackBadge = styled.span`
  padding: 0.55rem 1.35rem;
  background: #ffffff;
  color: var(--color-text);
  border-radius: 999px;
  font-size: 0.86rem;
  font-weight: 700;
  border: 1px solid rgba(226, 232, 240, 0.95);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
  transform: translateY(0);
  transition: transform 0.16s ease, box-shadow 0.16s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.1);
  }
`

// ─── Data ─────────────────────────────────────────
const sections = [
  {
    icon: <LayoutIcon />,
    title: 'Frontend',
    href: '/frontend',
    accent: 'var(--color-primary)',
    description:
      'React, TypeScript, Styling 등 프론트엔드 개발의 핵심 개념과 실무 패턴을 정리합니다.',
    links: ['React & 상태관리', 'TypeScript 패턴', 'styled-components'],
  },
  {
    icon: <Server />,
    title: 'Backend',
    href: '/backend',
    accent: 'var(--color-success)',
    description:
      'HTTP/REST API 설계 원칙부터 Spring Boot, JPA 테스팅 전략까지 백엔드 핵심을 다룹니다.',
    links: ['HTTP / REST', 'Spring Boot', 'JPA & 테스트'],
  },
  {
    icon: <DiDocker />,
    title: 'DevOps & Infra',
    href: '/devops',
    accent: 'var(--color-docker-blue)',
    description:
      'Docker 컨테이너화, CI/CD 파이프라인, AWS 인프라까지 배포 자동화를 위한 내용을 모았습니다.',
    links: ['Docker & 네트워크', 'CI/CD', 'AWS'],
  },
  {
    icon: <Layers />,
    title: 'Architecture',
    href: '/architecture',
    accent: 'var(--color-docker-network)',
    description:
      '레이어드 · 헥사고날 아키텍처와 에러 처리 패턴 등 검증된 설계 기법을 정리합니다.',
    links: ['레이어드 아키텍처', 'Hexagonal', '에러 핸들링 패턴'],
  },
  {
    icon: <Gamepad2 />,
    title: 'Playgrounds',
    href: '/playgrounds',
    accent: 'var(--color-docker-container)',
    description:
      '개념을 직접 체험할 수 있는 상태관리 · 디자인 시스템 데모를 제공합니다.',
    links: ['상태관리 데모', '디자인 시스템 쇼케이스'],
  },
  {
    icon: <Info />,
    title: 'About',
    href: '/about',
    accent: 'var(--color-gray-400)',
    description:
      '핸드북의 작성 가이드와 업데이트 이력, 프로젝트 철학을 정리한 공간입니다.',
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
    <PageWrapper>
      <HeroBackground />
      <PageInner>
        <HeroSection>
          <HeroBadge>개발 단권화 핸드북 · 2026 웹 레퍼런스</HeroBadge>
          <HeroTitle>
            Fullstack <span>Web</span> Handbook
          </HeroTitle>
          <HeroDesc>
            BE · FE · DevOps 전반을 다루는 개인 웹개발 레퍼런스.
            <br />
            미래의 나와 면접관을 위한 실무 중심 정리 공간입니다.
          </HeroDesc>
          <HeroActions>
            <PrimaryButton href="https://github.com/your-username/fullstack-web-handbook">
              <Github size={18} />
              Github 레포지토리
              <ArrowRight size={18} />
            </PrimaryButton>
            <SecondaryGroup>
              <SecondaryButton href="https://storybook.fullstack-web-handbook.example.com">
                <Palette size={16} />
                Storybook
              </SecondaryButton>
              <SecondaryDivider />
              <SecondaryButton href="/playgrounds">
                <Gamepad2 size={16} />
                실습 Playgrounds
              </SecondaryButton>
            </SecondaryGroup>
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
                <CardHeaderMain>
                  <CardIcon $accent={s.accent}>{s.icon}</CardIcon>
                  <CardTitle>{s.title}</CardTitle>
                </CardHeaderMain>
                <CardProgress>
                  <CardProgressInner $accent={s.accent} />
                </CardProgress>
              </CardHeader>
              {s.description && <CardDescription>{s.description}</CardDescription>}
              <CardLinks>
                {s.links.map((l) => (
                  <CardLinkItem key={l}>
                    <CardLinkBullet $accent={s.accent} />
                    {l}
                  </CardLinkItem>
                ))}
              </CardLinks>
            </CardWrapper>
          ))}
        </SectionGrid>

        <StackSection>
          <StackPanel>
            <StackLabel>
              <StackDivider />
              Core Tech Stack
              <StackDivider />
            </StackLabel>
            <StackBadgeRow>
              {stacks.map((s) => (
                <StackBadge key={s}>{s}</StackBadge>
              ))}
            </StackBadgeRow>
          </StackPanel>
        </StackSection>
      </PageInner>
    </PageWrapper>
  )
}
