'use client'

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Hash } from 'lucide-react'

export interface DetailItem {
  name: string
  desc: string
  /** 있으면 카드 클릭 시 해당 경로로 이동 */
  href?: string
}

export interface DetailSection {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  summary: string
  items: DetailItem[]
}

export interface QuickLink {
  label: string
  href: string
}

export interface SectionDetailLayoutProps {
  badgeLabel: string
  badgeIcon: React.ReactNode
  badgeAccent: string
  title: string
  description: string
  lastUpdated?: string
  readTime?: string
  sections: DetailSection[]
  quickLinksTitle?: string
  quickLinksIcon?: React.ReactNode
  quickLinks?: QuickLink[]
  previous?: { href: string; label: string }
  next?: { href: string; label: string }
}

// ─── Layout Shell ───────────────────────────────────
const PageWrapper = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: var(--sp-8) var(--sp-4) var(--sp-12);
  display: flex;
  gap: var(--sp-8);

  @media (max-width: 1023px) {
    padding-top: var(--sp-6);
  }
`

const Sidebar = styled.aside`
  width: 240px;
  flex-shrink: 0;
  position: sticky;
  top: 6.5rem;
  align-self: flex-start;
  height: fit-content;

  @media (max-width: 1023px) {
    display: none;
  }
`

const SidebarSectionTitle = styled.h4`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--sp-3);
`

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-bottom: var(--sp-6);
`

const SidebarNavLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.6rem;
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease, transform 0.12s ease;

  svg {
    width: 0.85rem;
    height: 0.85rem;
    color: var(--color-gray-400);
  }

  &:hover {
    background: var(--color-primary-light);
    color: var(--color-primary);
    transform: translateX(1px);
  }
`

const QuickLinksCard = styled.div`
  padding: var(--sp-4);
  border-radius: 1.1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
`

const QuickLinksTitle = styled.h5`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: var(--sp-2);
`

const QuickLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: var(--color-text-muted);
`

const QuickLinkItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
`

const QuickLinkAnchor = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  width: 100%;
  text-decoration: none;
  color: inherit;
  transition: color 0.15s ease;

  svg {
    width: 0.8rem;
    height: 0.8rem;
    color: var(--color-gray-400);
  }

  &:hover {
    color: var(--color-primary);
  }
`

const Main = styled.main`
  flex: 1;
  max-width: 720px;
`

// ─── Header ─────────────────────────────────────────
const Header = styled.header`
  padding-bottom: var(--sp-4);
  margin-bottom: var(--sp-6);
`

const HeaderBadge = styled.div<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: color-mix(in srgb, ${({ $accent }) => $accent} 12%, var(--color-gray-50));
  color: ${({ $accent }) => $accent};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: var(--sp-3);
`

const HeaderTitle = styled.h1`
  font-size: clamp(1.9rem, 4vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--color-text);
  margin-bottom: var(--sp-2);
`

const HeaderDesc = styled.p`
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: var(--sp-3);
`

const HeaderMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--sp-3);
`

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.div`
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 999px;
  border: 2px solid var(--color-bg);
  background: var(--color-gray-200);
  &:not(:first-child) {
    margin-left: -0.5rem;
  }
`

const MetaText = styled.span`
  font-size: 0.72rem;
  color: var(--color-gray-400);
  font-weight: 500;
`

// ─── Sections ──────────────────────────────────────
const SectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`

const SectionBlock = styled.section`
  scroll-margin-top: 7rem;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-4);
`

const SectionIcon = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: 0.9rem;
  background: var(--color-gray-50);
  color: ${({ $color }) => $color};

  svg {
    width: 1.05rem;
    height: 1.05rem;
  }
`

const SectionTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
`

const SectionSummary = styled.p`
  font-size: 0.8rem;
  color: var(--color-gray-500);
  font-weight: 500;
`

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-3);
`

const detailCardStyles = `
  padding: var(--sp-4);
  border-radius: 1.1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.18s ease, box-shadow 0.18s ease,
    transform 0.16s ease;

  &:hover {
    border-color: var(--color-primary-light);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`

const DetailCard = styled.div`
  ${detailCardStyles}
`

const DetailCardLink = styled(Link)`
  ${detailCardStyles}
  display: block;
  text-decoration: none;
  color: inherit;
`

const DetailHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--sp-3);
`

const DetailTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.15rem;
`

const DetailDesc = styled.p`
  font-size: 0.86rem;
  color: var(--color-text-muted);
  line-height: 1.6;
`

const DetailChevron = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.15rem;
  color: var(--color-gray-400);

  svg {
    width: 1rem;
    height: 1rem;
  }
`

// ─── Bottom Navigation ─────────────────────────────
const BottomNav = styled.div`
  margin-top: var(--sp-12);
  padding-top: var(--sp-6);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-4);
`

const BottomNavItem = styled(Link)`
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
  text-decoration: none;
  cursor: pointer;
`

const BottomNavLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-gray-400);
`

const BottomNavTitle = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text);
  transition: color 0.15s ease, transform 0.15s ease;

  ${BottomNavItem}:hover & {
    color: var(--color-primary);
  }
`

// ─── Component ─────────────────────────────────────
export default function SectionDetailLayout({
  badgeLabel,
  badgeIcon,
  badgeAccent,
  title,
  description,
  lastUpdated,
  readTime,
  sections,
  quickLinksTitle,
  quickLinksIcon,
  quickLinks,
  previous,
  next,
}: SectionDetailLayoutProps) {
  const metaText =
    lastUpdated && readTime
      ? `Last updated: ${lastUpdated} · ${readTime} read`
      : lastUpdated
        ? `Last updated: ${lastUpdated}`
        : readTime
          ? `${readTime} read`
          : undefined

  return (
    <PageWrapper>
      <Sidebar>
        <SidebarSectionTitle>Contents</SidebarSectionTitle>
        <SidebarNav>
          {sections.map((section) => (
            <SidebarNavLink key={section.id} href={`#${section.id}`}>
              <Hash />
              {section.title}
            </SidebarNavLink>
          ))}
        </SidebarNav>

        {quickLinks && quickLinks.length > 0 && (
          <QuickLinksCard>
            {quickLinksTitle && (
              <QuickLinksTitle>
                {quickLinksIcon}
                {quickLinksTitle}
              </QuickLinksTitle>
            )}
            <QuickLinksList>
              {quickLinks.map((q) => (
                <QuickLinkItem key={q.href}>
                  <QuickLinkAnchor href={q.href}>
                    {q.label}
                    <ChevronRight />
                  </QuickLinkAnchor>
                </QuickLinkItem>
              ))}
            </QuickLinksList>
          </QuickLinksCard>
        )}
      </Sidebar>

      <Main>
        <Header>
          <HeaderBadge $accent={badgeAccent}>
            {badgeIcon}
            {badgeLabel}
          </HeaderBadge>
          <HeaderTitle>{title}</HeaderTitle>
          <HeaderDesc>{description}</HeaderDesc>
          {metaText && (
            <HeaderMetaRow>
              <AvatarGroup>
                <Avatar />
                <Avatar />
                <Avatar />
              </AvatarGroup>
              <MetaText>{metaText}</MetaText>
            </HeaderMetaRow>
          )}
        </Header>

        <SectionList>
          {sections.map((section) => (
            <SectionBlock key={section.id} id={section.id}>
              <SectionHeader>
                <SectionIcon $color={section.color}>{section.icon}</SectionIcon>
                <SectionTitleGroup>
                  <SectionTitle>{section.title}</SectionTitle>
                  <SectionSummary>{section.summary}</SectionSummary>
                </SectionTitleGroup>
              </SectionHeader>

              <DetailGrid>
                {section.items.map((item) => {
                  const content = (
                    <DetailHeader>
                      <div>
                        <DetailTitle>{item.name}</DetailTitle>
                        <DetailDesc>{item.desc}</DetailDesc>
                      </div>
                      <DetailChevron>
                        <ChevronRight />
                      </DetailChevron>
                    </DetailHeader>
                  )
                  return item.href ? (
                    <DetailCardLink key={item.name} href={item.href}>
                      {content}
                    </DetailCardLink>
                  ) : (
                    <DetailCard key={item.name}>{content}</DetailCard>
                  )
                })}
              </DetailGrid>
            </SectionBlock>
          ))}
        </SectionList>

        {(previous || next) && (
          <BottomNav>
            {previous ? (
              <BottomNavItem href={previous.href}>
                <BottomNavLabel>Previous</BottomNavLabel>
                <BottomNavTitle>
                  <ArrowLeft size={14} />
                  {previous.label}
                </BottomNavTitle>
              </BottomNavItem>
            ) : (
              <span />
            )}

            {next && (
              <BottomNavItem href={next.href}>
                <BottomNavLabel>Next</BottomNavLabel>
                <BottomNavTitle>
                  {next.label}
                  <ChevronRight size={14} />
                </BottomNavTitle>
              </BottomNavItem>
            )}
          </BottomNav>
        )}
      </Main>
    </PageWrapper>
  )
}

