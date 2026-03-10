'use client'

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

// ─── Types ───────────────────────────────────────
export interface TopicLink {
  label: string
  href: string
}

export interface SubCard {
  icon: React.ReactNode
  title: string
  href: string
  desc: string
  topics?: TopicLink[]
  accent: string
}

export interface SectionLandingProps {
  badge: string
  icon: React.ReactNode
  title: string
  description: string
  accentColor: string
  subCards: SubCard[]
  parentHref?: string
  parentLabel?: string
  extra?: React.ReactNode
}

// ─── Styled Components ───────────────────────────
const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: var(--sp-8) var(--sp-4);
`

const Breadcrumb = styled.div`
  margin-bottom: var(--sp-6);
`

const BreadcrumbLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--sp-1);
  font-size: 0.875rem;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: var(--color-primary);
  }

  &::before {
    content: '←';
    font-size: 0.9em;
  }
`

const Hero = styled.div`
  margin-bottom: var(--sp-10);
`

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  margin-bottom: var(--sp-4);
`

const Badge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  padding: 0.3rem 0.9rem;
  background: color-mix(in srgb, ${({ $color }) => $color} 15%, transparent);
  color: ${({ $color }) => $color};
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
`

const BadgeIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1em;
`

const HeroTitle = styled.h1`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: var(--sp-3);
`

const HeroDesc = styled.p`
  font-size: 1.05rem;
  color: var(--color-text-muted);
  line-height: 1.75;
  max-width: 600px;
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--sp-4);
`

const Card = styled(Link)<{ $accent: string }>`
  display: flex;
  flex-direction: column;
  padding: var(--sp-5) var(--sp-5);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-top: 3px solid ${({ $accent }) => $accent};
  border-radius: var(--radius-xl);
  text-decoration: none;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: ${({ $accent }) => $accent};
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-3);
`

const CardIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  line-height: 1;
`

const CardTitle = styled.span`
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
`

const CardDesc = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  flex: 1;
  margin-bottom: var(--sp-4);
`

const TopicList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
`

const TopicItem = styled.li<{ $accent: string }>`
  font-size: 0.8rem;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 0.3em;

  &::before {
    content: '→';
    color: ${({ $accent }) => $accent};
    font-weight: 700;
    font-size: 0.9em;
  }
`

const ExtraWrapper = styled.div`
  margin-top: var(--sp-10);
`

// ─── Component ────────────────────────────────────
export default function SectionLanding({
  badge,
  icon,
  title,
  description,
  accentColor,
  subCards,
  parentHref,
  parentLabel,
  extra,
}: SectionLandingProps) {
  return (
    <Wrapper>
      {parentHref && parentLabel && (
        <Breadcrumb>
          <BreadcrumbLink href={parentHref}>{parentLabel}</BreadcrumbLink>
        </Breadcrumb>
      )}

      <Hero>
        <BadgeRow>
          <Badge $color={accentColor}>
            <BadgeIcon>{icon}</BadgeIcon>
            {badge}
          </Badge>
        </BadgeRow>
        <HeroTitle>{title}</HeroTitle>
        <HeroDesc>{description}</HeroDesc>
      </Hero>

      <CardGrid>
        {subCards.map((card) => (
          <Card key={card.href} href={card.href} $accent={card.accent}>
            <CardHeader>
              <CardIcon>{card.icon}</CardIcon>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardDesc>{card.desc}</CardDesc>
            {card.topics && card.topics.length > 0 && (
              <TopicList>
                {card.topics.map((t) => (
                  <TopicItem key={t.href} $accent={card.accent}>
                    {t.label}
                  </TopicItem>
                ))}
              </TopicList>
            )}
          </Card>
        ))}
      </CardGrid>

      {extra && <ExtraWrapper>{extra}</ExtraWrapper>}
    </Wrapper>
  )
}
