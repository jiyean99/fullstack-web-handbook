'use client'

import styled from 'styled-components'
import Link from 'next/link'
import { NotebookPen, ArrowUpRight, Calendar } from 'lucide-react'
import { journalEntries, type JournalEntry } from './entries'

const categoryColor: Record<JournalEntry['category'], string> = {
  Backend: 'var(--color-success)',
  Frontend: 'var(--color-primary)',
  DevOps: 'var(--color-docker-blue)',
  Architecture: 'var(--color-docker-network)',
}

const PageWrapper = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: var(--sp-10) var(--sp-4) var(--sp-16);
`

const Header = styled.header`
  margin-bottom: var(--sp-10);
`

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-primary) 12%, var(--color-gray-50));
  color: var(--color-primary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: var(--sp-3);
`

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--color-text);
  margin-bottom: var(--sp-3);
`

const Lead = styled.p`
  font-size: 1.02rem;
  color: var(--color-text-muted);
  line-height: 1.8;
  max-width: 640px;
`

const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--sp-5);
  padding-left: var(--sp-6);

  &::before {
    content: '';
    position: absolute;
    left: 0.32rem;
    top: 0.5rem;
    bottom: 0.5rem;
    width: 2px;
    background: var(--color-border);
  }
`

const EntryCard = styled(Link)`
  position: relative;
  display: block;
  padding: var(--sp-5);
  border-radius: 1.1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.16s ease;

  &::before {
    content: '';
    position: absolute;
    left: calc(-1 * var(--sp-6) + 0.07rem);
    top: 1.6rem;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 999px;
    background: var(--color-primary);
    border: 2px solid var(--color-bg);
    box-shadow: 0 0 0 2px var(--color-border);
  }

  &:hover {
    border-color: var(--color-primary-light);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`

const EntryMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: var(--sp-2);
`

const DateText = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.74rem;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;

  svg {
    width: 0.8rem;
    height: 0.8rem;
  }
`

const CategoryTag = styled.span<{ $color: string }>`
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  color: ${({ $color }) => $color};
  background: color-mix(in srgb, ${({ $color }) => $color} 12%, var(--color-bg));
`

const EntryTitle = styled.h2`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--sp-3);
  font-size: 1.12rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--sp-2);
  line-height: 1.4;

  svg {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    color: var(--color-gray-400);
    margin-top: 0.2rem;
  }
`

const EntrySummary = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: var(--sp-3);
`

const TagRow = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`

const Tag = styled.span`
  font-size: 0.7rem;
  color: var(--color-text-muted);
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);

  &::before {
    content: '#';
    opacity: 0.5;
  }
`

const EmptyNote = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-muted);
`

export default function JournalPage() {
  const entries = [...journalEntries].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <PageWrapper>
      <Header>
        <Badge>
          <NotebookPen size={13} /> Dev Journal
        </Badge>
        <Title>실무 기록</Title>
        <Lead>
          실무에서 부딪힌 문제와 그 해결 과정을 날것 그대로 남기는 공간입니다. 정제된 핸드북
          문서와 달리, 디버깅의 흐름과 시행착오, 그리고 거기서 얻은 교훈을 시간순으로 기록합니다.
        </Lead>
      </Header>

      {entries.length === 0 ? (
        <EmptyNote>아직 기록이 없습니다.</EmptyNote>
      ) : (
        <Timeline>
          {entries.map((entry) => (
            <EntryCard key={entry.slug} href={`/journal/${entry.slug}`}>
              <EntryMeta>
                <DateText>
                  <Calendar /> {entry.date}
                </DateText>
                <CategoryTag $color={categoryColor[entry.category]}>{entry.category}</CategoryTag>
              </EntryMeta>
              <EntryTitle>
                {entry.title}
                <ArrowUpRight />
              </EntryTitle>
              <EntrySummary>{entry.summary}</EntrySummary>
              <TagRow>
                {entry.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagRow>
            </EntryCard>
          ))}
        </Timeline>
      )}
    </PageWrapper>
  )
}
