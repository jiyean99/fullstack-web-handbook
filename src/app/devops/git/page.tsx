'use client'

import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import {
  GitBranch,
  Github,
  ArrowRight,
  CheckCircle2,
  Terminal,
  FileCode,
  HardDrive,
  Zap,
  ShieldCheck,
  Users,
  MessageSquare,
  ChevronRight,
  BookOpen,
} from 'lucide-react'

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
  transition: background 0.15s ease, color 0.15s ease;
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

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-primary);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--sp-4);
`

const Title = styled.h1`
  font-size: clamp(2rem, 3.4vw, 2.8rem);
  font-weight: 900;
  color: var(--color-text);
  letter-spacing: -0.04em;
  margin-bottom: var(--sp-5);
`

const HeaderQuote = styled.blockquote`
  border-left: 4px solid var(--color-primary);
  padding-left: var(--sp-6);
  padding-block: var(--sp-2);
  font-size: 1.05rem;
  color: var(--color-text-muted);
  line-height: 1.8;
`

const Section = styled.section`
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

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--color-text);
`

const Paragraph = styled.p`
  font-size: 0.98rem;
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: var(--sp-5);
`

const GridTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-4);
  margin-block: var(--sp-6);
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const GridThree = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-6);
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const Card = styled.div`
  padding: var(--sp-5);
  border-radius: 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
`

const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: var(--sp-2);
  color: var(--color-text);
`

const CardText = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.7;
`

const TableWrapper = styled.div`
  margin-top: var(--sp-1);
  border-radius: 1rem;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--sp-6);
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.86rem;
`

const Th = styled.th`
  padding: var(--sp-4);
  font-weight: 700;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  text-align: left;
`

const Td = styled.td<{ $muted?: boolean; $success?: boolean; $danger?: boolean }>`
  padding: var(--sp-4);
  border-bottom: 1px solid var(--color-border);
  background: ${({ $muted, $success, $danger }) =>
    $muted ? 'color-mix(in srgb, var(--color-gray-50) 60%, transparent)' : $success ? 'color-mix(in srgb, var(--color-success) 10%, var(--color-bg))' : $danger ? 'color-mix(in srgb, var(--color-error) 8%, var(--color-bg))' : 'transparent'};
  font-weight: ${({ $muted }) => ($muted ? 700 : 400)};
  color: ${({ $success, $danger }) => ($success ? 'var(--color-success)' : $danger ? 'var(--color-error)' : 'inherit')};
`

const CodeBlock = styled.div<{ $dark?: boolean }>`
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.75rem;
  padding: var(--sp-4);
  border-radius: var(--radius-lg);
  background: ${({ $dark }) => ($dark ? 'var(--color-gray-900)' : 'var(--color-surface)')};
  color: ${({ $dark }) => ($dark ? 'var(--color-gray-300)' : 'var(--color-text)')};
  margin-bottom: var(--sp-3);
  line-height: 1.6;
`

const CodeComment = styled.span`
  color: var(--color-gray-500);
`

const StepButton = styled.button<{ $active: boolean }>`
  width: 100%;
  text-align: left;
  padding: var(--sp-4);
  border-radius: 1rem;
  border: 1px solid ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-border)')};
  background: ${({ $active }) => ($active ? 'var(--color-primary-light)' : 'var(--color-bg)')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
  cursor: pointer;
  transition: all 0.15s ease;
  margin-bottom: var(--sp-2);
  &:hover {
    border-color: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-gray-300)')};
  }
`

const StepIconWrap = styled.div<{ $active: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-surface)')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--color-text-muted)')};
`

const StepDetailPanel = styled.div`
  background: var(--color-surface);
  border-radius: 1.25rem;
  padding: var(--sp-8);
  border: 1px solid var(--color-border);
  text-align: center;
`

const MechanismLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: stretch;
  }
`

const BranchSimulator = styled.div`
  padding: var(--sp-8);
  background: var(--color-gray-900);
  border-radius: 1.25rem;
  color: var(--color-gray-300);
`

const BranchSimHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sp-6);
  flex-wrap: wrap;
  gap: var(--sp-3);
`

const BranchSimLabel = styled.h4`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gray-500);
`

const BranchTabs = styled.div`
  display: flex;
  gap: var(--sp-2);
`

const BranchTab = styled.button<{ $active: boolean }>`
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  background: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-gray-800)')};
  color: #fff;
  transition: background 0.15s ease;
  &:hover {
    background: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-gray-700)')};
  }
`

const BranchGraphWrapper = styled.div<{ $view: 'main' | 'feature' }>`
  position: relative;
  width: 100%;
  padding: var(--sp-4) 0 var(--sp-8);
  overflow: hidden;

  svg {
    display: block;
    width: 100%;
    height: auto;
    max-height: 140px;
  }

  .main-line {
    fill: none;
    stroke: var(--color-primary);
    stroke-width: 2.5;
    stroke-linecap: round;
    transition: opacity 0.25s ease;
    opacity: ${({ $view }) => ($view === 'main' ? 1 : 0.25)};
  }
  .feature-line {
    fill: none;
    stroke: var(--color-success);
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: opacity 0.25s ease;
    opacity: ${({ $view }) => ($view === 'feature' ? 1 : 0.25)};
  }
  .main-commit {
    fill: var(--color-primary);
    stroke: var(--color-gray-900);
    stroke-width: 2.5;
    transition: opacity 0.25s ease, transform 0.2s ease;
    opacity: ${({ $view }) => ($view === 'main' ? 1 : 0.35)};
  }
  .feature-commit {
    fill: var(--color-success);
    stroke: var(--color-gray-900);
    stroke-width: 2.5;
    transition: opacity 0.25s ease;
    opacity: ${({ $view }) => ($view === 'feature' ? 1 : 0.35)};
  }
  .fork-commit {
    fill: var(--color-primary);
    stroke: var(--color-gray-900);
    stroke-width: 2.5;
    transition: opacity 0.25s ease;
    opacity: ${({ $view }) => ($view === 'main' ? 1 : 0.5)};
  }
  .merge-commit {
    fill: var(--color-primary);
    stroke: var(--color-gray-900);
    stroke-width: 2.5;
    transition: opacity 0.25s ease;
    opacity: ${({ $view }) => ($view === 'main' ? 1 : 0.6)};
  }
  g:has(.main-commit), g:has(.fork-commit), g:has(.merge-commit), g:has(.feature-commit) {
    cursor: pointer;
  }
  .commit-label {
    font-family: inherit;
    font-size: 9px;
    font-weight: 600;
    fill: var(--color-gray-400);
    transition: fill 0.25s ease, opacity 0.25s ease;
  }
  &[data-view='main'] .commit-label[data-branch='main'] {
    fill: var(--color-primary-light);
    opacity: 1;
  }
  &[data-view='feature'] .commit-label[data-branch='feature'] {
    fill: var(--color-success);
    opacity: 1;
  }
  .commit-label[data-branch='main'] {
    opacity: ${({ $view }) => ($view === 'main' ? 1 : 0.4)};
  }
  .commit-label[data-branch='feature'] {
    opacity: ${({ $view }) => ($view === 'feature' ? 1 : 0.4)};
  }
`

const BranchLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-4);
  margin-top: var(--sp-4);
  padding-top: var(--sp-4);
  border-top: 1px solid var(--color-gray-800);
`

const BranchLegendItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-gray-400);
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
  }
  code {
    font-size: 0.7rem;
    background: var(--color-gray-800);
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    color: var(--color-gray-300);
  }
`

const BranchHint = styled.div`
  margin-top: var(--sp-3);
  padding: 0.5rem 0.75rem;
  background: var(--color-gray-800);
  border-radius: var(--radius-md);
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  color: var(--color-gray-500);
  border-left: 3px solid var(--color-success);
`

const CommitTooltip = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  transform: translate(-50%, calc(-100% - 8px));
  padding: 0.4rem 0.65rem;
  background: var(--color-gray-800);
  color: var(--color-gray-100);
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  border: 1px solid var(--color-gray-700);
  white-space: nowrap;
  pointer-events: none;
  z-index: 9999;
  animation: commitTooltipIn 0.12s ease-out;
  @keyframes commitTooltipIn {
    from {
      opacity: 0;
      transform: translate(-50%, calc(-100% - 4px));
    }
    to {
      opacity: 1;
      transform: translate(-50%, calc(-100% - 8px));
    }
  }
`

const Footer = styled.footer`
  padding-block: var(--sp-10);
  border-top: 1px solid var(--color-border);
  text-align: center;
  margin-top: var(--sp-12);
`

const FooterTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: var(--sp-4);
  color: var(--color-text);
`

const FooterText = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 36rem;
  margin: 0 auto var(--sp-6);
`

const FooterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--sp-4);
`

const PillButton = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.15s ease, transform 0.1s ease;
  background: ${({ $primary }) => ($primary ? 'var(--color-primary)' : 'var(--color-gray-900)')};
  color: #fff;
  &:hover {
    transform: translateY(-1px);
  }
`

const IconCircle = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  background: var(--color-bg);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
`

const ReviewCard = styled.div`
  background: var(--color-bg);
  padding: var(--sp-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  margin-bottom: var(--sp-3);
`

const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: var(--sp-2);
`

const ReviewAvatar = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 999px;
  background: var(--color-gray-200);
`

const ReviewAuthor = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-gray-400);
`

const ReviewBody = styled.p`
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.6;
`

const ApprovedBadge = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-primary);
  background: var(--color-primary-light);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
`

const FlowItem = styled.div`
  display: flex;
  gap: var(--sp-4);
  margin-bottom: var(--sp-6);
`

const FlowIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const FlowContent = styled.div``

const FlowTitle = styled.h4`
  font-weight: 700;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
`

const FlowDesc = styled.p`
  font-size: 0.85rem;
  color: var(--color-text-muted);
  line-height: 1.6;
`

const HighlightBox = styled.div<{ $blue?: boolean }>`
  padding: var(--sp-8);
  border-radius: 1.5rem;
  border: 1px solid ${({ $blue }) => ($blue ? 'var(--color-primary)' : 'var(--color-border)')};
  background: ${({ $blue }) => ($blue ? 'color-mix(in srgb, var(--color-primary) 12%, var(--color-bg))' : 'var(--color-surface)')};
  margin-bottom: var(--sp-6);
`

const steps = [
  {
    title: 'Working Directory',
    desc: '실제 파일 수정이 일어나는 공간. 실험적 변경을 자유롭게 테스트한다.',
    cmd: 'Code Edit...',
    icon: FileCode,
  },
  {
    title: 'Staging Area',
    desc: 'git add로 커밋할 파일을 선별. 중요한 변경만 선택적으로 포함한다.',
    cmd: 'git add .',
    icon: Terminal,
  },
  {
    title: 'Local Repository',
    desc: 'git commit으로 영구 스냅샷 생성. 버전이 확정된다.',
    cmd: "git commit -m 'feat: ...'",
    icon: HardDrive,
  },
]

const COMMIT_TOOLTIPS: Array<{ text: string; cx: number; cy: number; className: string }> = [
  { text: 'main: v1.0 태그', cx: 40, cy: 50, className: 'main-commit' },
  { text: 'main: fix 커밋 (feature 분기점)', cx: 120, cy: 50, className: 'fork-commit' },
  { text: 'main: v1.1', cx: 200, cy: 50, className: 'main-commit' },
  { text: 'main', cx: 280, cy: 50, className: 'main-commit' },
  { text: 'merge: feature → main 병합', cx: 360, cy: 50, className: 'merge-commit' },
  { text: 'feature: checkout -b 이후 첫 커밋', cx: 120, cy: 18, className: 'feature-commit' },
  { text: 'feature: feat 커밋', cx: 200, cy: 18, className: 'feature-commit' },
  { text: 'feature: fix 커밋 (merge 직전)', cx: 280, cy: 18, className: 'feature-commit' },
]

export default function GitHandbookPage() {
  const [activeSection, setActiveSection] = useState('vs')
  const [activeStep, setActiveStep] = useState(0)
  const [branchSim, setBranchSim] = useState<'main' | 'feature'>('main')
  const [commitTooltip, setCommitTooltip] = useState<{ text: string; x: number; y: number } | null>(null)
  const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showCommitTooltip = useCallback((text: string, x: number, y: number) => {
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current)
    tooltipTimeoutRef.current = setTimeout(() => setCommitTooltip({ text, x, y }), 60)
  }, [])
  const hideCommitTooltip = useCallback(() => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current)
      tooltipTimeoutRef.current = null
    }
    setCommitTooltip(null)
  }, [])
  const updateCommitTooltipPos = useCallback((x: number, y: number) => {
    setCommitTooltip((prev) => (prev ? { ...prev, x, y } : null))
  }, [])

  const menuItems = [
    { id: 'vs', label: 'Git vs GitHub' },
    { id: 'position', label: 'DevOps에서의 Git 위상' },
    { id: 'mechanism', label: '메커니즘 이해' },
    { id: 'branch', label: '브랜치 전략' },
    { id: 'pr', label: '협업과 PR' },
  ]

  const scrollTo = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const SectionTitleBlock = ({ num, title }: { num: string; title: string }) => (
    <SectionTitleRow>
      <SectionBadge>{num}</SectionBadge>
      <SectionTitle>{title}</SectionTitle>
    </SectionTitleRow>
  )

  return (
    <Shell>
      <Sidebar>
        <SidebarHeader>
          <BookOpen size={20} color="var(--color-primary)" />
          <SidebarTitle>목차</SidebarTitle>
        </SidebarHeader>
        <SidebarNav>
          {menuItems.map((item) => (
            <SidebarButton
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
              <ChevronIcon />
            </SidebarButton>
          ))}
        </SidebarNav>
      </Sidebar>

      <Main>
        <Header>
          <Badge>
            <GitBranch size={16} /> DevOps Ecosystem Part 01
          </Badge>
          <Title>[Git] DevOps 에코시스템의 중심축</Title>
          <HeaderQuote>
            현대 DevOps 환경에서 Git은 단순한 버전 관리 도구를 넘어{' '}
            <strong>Single Source of Truth(단일 진실 공급원)</strong> 역할을 한다. 코드부터 인프라 설정까지 모든 것이
            여기에 기록되며, CI/CD 파이프라인의 시작점이 된다.
          </HeaderQuote>
        </Header>

        <Section id="vs">
          <SectionTitleRow>
            <SectionBadge>VS</SectionBadge>
            <SectionTitle>Git vs GitHub: 도구와 서비스의 차이</SectionTitle>
          </SectionTitleRow>
          <Paragraph>
            많은 개발자들이 Git과 GitHub을 혼용하지만, <strong>Git은 도구(Tool)</strong>이고{' '}
            <strong>GitHub은 서비스(Service)</strong>다. 파일과 클라우드 스토리지를 비교하듯 이해하면 명확하다.
          </Paragraph>

          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th style={{ width: '25%' }}>비교 항목</Th>
                  <Th>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
                      <GitBranch size={16} /> Git (Tool)
                    </div>
                  </Th>
                  <Th>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Github size={16} /> GitHub (Service)
                    </div>
                  </Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td $muted>정의</Td>
                  <Td>로컬 버전 관리 소프트웨어</Td>
                  <Td>웹 기반 Git 저장소 호스팅 서비스</Td>
                </tr>
                <tr>
                  <Td $muted>설치 위치</Td>
                  <Td>개인의 로컬 컴퓨터</Td>
                  <Td>클라우드 서버 (인터넷 상)</Td>
                </tr>
                <tr>
                  <Td $muted>핵심 기능</Td>
                  <Td>변경 이력 추적, 브랜치/머지 관리</Td>
                  <Td>팀 협업, PR/코드 리뷰, CI/CD 통합 (Actions)</Td>
                </tr>
                <tr>
                  <Td $muted>오프라인 작업</Td>
                  <Td $success>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle2 size={14} /> 완전 가능 (로컬 저장소 독립 실행)
                    </span>
                  </Td>
                  <Td $danger>❌ 불가능 (인터넷 연결 필수)</Td>
                </tr>
                <tr>
                  <Td $muted>인터페이스</Td>
                  <Td>CLI(터미널) 또는 GUI (Sourcetree 등)</Td>
                  <Td>웹 브라우저 기반 직관적 UI</Td>
                </tr>
                <tr>
                  <Td $muted>용량/비용</Td>
                  <Td>무료 (오픈소스)</Td>
                  <Td>무료/유료 플랜 (Private Repo 제한)</Td>
                </tr>
              </tbody>
            </Table>
          </TableWrapper>

          <GridTwo>
            <Card style={{ background: 'var(--color-gray-900)', color: 'var(--color-gray-300)', border: 'none' }}>
              <CardTitle style={{ color: 'var(--color-primary)' }}>
                <Terminal size={18} /> Git 단독 사용 (로컬)
              </CardTitle>
              <CodeBlock $dark>
                <div>git init <CodeComment># 저장소 생성</CodeComment></div>
                <div>git add .</div>
                <div>git commit <CodeComment># 오프라인 스냅샷</CodeComment></div>
              </CodeBlock>
              <CardText style={{ color: 'var(--color-gray-400)', fontSize: '0.8rem' }}>
                개인 프로젝트, IaC 실험 등 독립 개발에 최적화된 로컬 환경.
              </CardText>
            </Card>
            <Card style={{ background: 'var(--color-primary)', color: '#fff', border: 'none' }}>
              <CardTitle style={{ color: '#fff' }}>
                <GitBranch size={18} /> GitHub 협업 (DevOps)
              </CardTitle>
              <CodeBlock $dark style={{ background: 'rgba(0,0,0,0.2)', color: 'rgba(255,255,255,0.9)' }}>
                <div>git push origin main <CodeComment style={{ opacity: 0.7 }}># 동기화</CodeComment></div>
                <div>Create Pull Request <CodeComment style={{ opacity: 0.7 }}># 리뷰</CodeComment></div>
                <div>GitHub Actions <CodeComment style={{ opacity: 0.7 }}># 자동 배포</CodeComment></div>
              </CodeBlock>
              <CardText style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem' }}>
                팀 협업, 코드 리뷰, 자동화 파이프라인 구축 시 필수.
              </CardText>
            </Card>
          </GridTwo>
        </Section>

        <Section id="position">
          <SectionTitleRow>
            <SectionBadge>?</SectionBadge>
            <SectionTitle>DevOps에서의 Git 위상: 왜 필수인가?</SectionTitle>
          </SectionTitleRow>
          <HighlightBox $blue>
            <GridThree>
              <div>
                <IconCircle>
                  <Zap size={24} />
                </IconCircle>
                <CardTitle style={{ marginTop: 'var(--sp-3)' }}>CI/CD 트리거</CardTitle>
                <CardText>Git Commit이 자동화 파이프라인을 발동시키는 첫 신호탄이다.</CardText>
              </div>
              <div>
                <IconCircle>
                  <ShieldCheck size={24} />
                </IconCircle>
                <CardTitle style={{ marginTop: 'var(--sp-3)' }}>코드로서의 인프라</CardTitle>
                <CardText>K8s 매니페스트, Terraform 등 모든 인프라 정의를 코드로 관리한다.</CardText>
              </div>
              <div>
                <IconCircle>
                  <Users size={24} />
                </IconCircle>
                <CardTitle style={{ marginTop: 'var(--sp-3)' }}>투명한 협업</CardTitle>
                <CardText>변경 이력과 코드 리뷰를 통해 기술 부채를 체계적으로 관리한다.</CardText>
              </div>
            </GridThree>
          </HighlightBox>
        </Section>

        <Section id="mechanism">
          <SectionTitleBlock num="1" title="메커니즘 이해: 데이터 흐름 파악" />
          <MechanismLayout>
            <div style={{ flex: 1, minWidth: 0 }}>
              {steps.map((step, idx) => (
                <StepButton
                  key={idx}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  $active={activeStep === idx}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
                    <StepIconWrap $active={activeStep === idx}>
                      <step.icon size={20} />
                    </StepIconWrap>
                    <div>
                      <CardTitle style={{ marginBottom: 0, fontSize: '0.9rem' }}>{step.title}</CardTitle>
                      <CardText style={{ marginTop: '0.25rem', fontSize: '0.75rem' }}>{step.cmd}</CardText>
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: activeStep === idx ? 'var(--color-primary)' : 'var(--color-gray-400)' }} />
                </StepButton>
              ))}
            </div>
            <StepDetailPanel style={{ flex: 1 }}>
              <div style={{ marginBottom: 'var(--sp-4)', display: 'inline-flex', padding: 'var(--sp-4)', background: 'var(--color-bg)', borderRadius: '999px', color: 'var(--color-primary)' }}>
                {React.createElement(steps[activeStep].icon, { size: 28 })}
              </div>
              <CardTitle style={{ fontSize: '1.1rem', marginBottom: 'var(--sp-2)' }}>{steps[activeStep].title}</CardTitle>
              <CardText style={{ marginBottom: 'var(--sp-4)' }}>{steps[activeStep].desc}</CardText>
              <CodeBlock>$ {steps[activeStep].cmd}</CodeBlock>
            </StepDetailPanel>
          </MechanismLayout>
        </Section>

        <Section id="branch">
          <SectionTitleBlock num="2" title="워크플로우 최적화: 브랜치 전략" />
          <BranchSimulator>
            <BranchSimHeader>
              <BranchSimLabel>Branch Simulator</BranchSimLabel>
              <BranchTabs>
                <BranchTab type="button" onClick={() => setBranchSim('main')} $active={branchSim === 'main'}>
                  Main
                </BranchTab>
                <BranchTab type="button" onClick={() => setBranchSim('feature')} $active={branchSim === 'feature'}>
                  Feature
                </BranchTab>
              </BranchTabs>
            </BranchSimHeader>
            <BranchGraphWrapper $view={branchSim} data-view={branchSim}>
              <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
                <path className="main-line" d="M 40 50 H 120 L 200 50 L 280 50 H 360" />
                <path className="feature-line" d="M 120 50 V 18 H 280 L 360 50" />
                {COMMIT_TOOLTIPS.map((entry, i) => (
                  <g
                    key={i}
                    onMouseEnter={(e) => showCommitTooltip(entry.text, e.clientX, e.clientY)}
                    onMouseMove={(e) => updateCommitTooltipPos(e.clientX, e.clientY)}
                    onMouseLeave={hideCommitTooltip}
                  >
                    <circle className={entry.className} cx={entry.cx} cy={entry.cy} r="6" />
                  </g>
                ))}
                <text className="commit-label" data-branch="main" x="40" y="72" textAnchor="middle">v1.0</text>
                <text className="commit-label" data-branch="main" x="120" y="72" textAnchor="middle">fix</text>
                <text className="commit-label" data-branch="main" x="200" y="72" textAnchor="middle">v1.1</text>
                <text className="commit-label" data-branch="main" x="280" y="72" textAnchor="middle">—</text>
                <text className="commit-label" data-branch="main" x="360" y="72" textAnchor="middle">merge</text>
                <text className="commit-label" data-branch="feature" x="120" y="8" textAnchor="middle">branch</text>
                <text className="commit-label" data-branch="feature" x="200" y="8" textAnchor="middle">feat</text>
                <text className="commit-label" data-branch="feature" x="280" y="8" textAnchor="middle">fix</text>
              </svg>
            </BranchGraphWrapper>
            {commitTooltip && (
              <CommitTooltip $x={commitTooltip.x} $y={commitTooltip.y}>
                {commitTooltip.text}
              </CommitTooltip>
            )}
            <BranchLegend>
              <BranchLegendItem $color="var(--color-primary)">
                <span className="dot" />
                <span>main</span>
                <code>프로덕션 배포용</code>
              </BranchLegendItem>
              <BranchLegendItem $color="var(--color-success)">
                <span className="dot" />
                <span>feature/dev</span>
                <code>개발·병합 후 main에 반영</code>
              </BranchLegendItem>
            </BranchLegend>
            {branchSim === 'feature' && (
              <BranchHint>
                git checkout -b feature/dev → 커밋 후 main에 merge
              </BranchHint>
            )}
          </BranchSimulator>
          <GridTwo>
            <Card>
              <CardTitle style={{ color: 'var(--color-primary)' }}>MAIN 브랜치</CardTitle>
              <CardText>프로덕션에 바로 반영 가능한 안정 버전만 유지한다. 배포 파이프라인과 직접 연결된다.</CardText>
            </Card>
            <Card>
              <CardTitle style={{ color: 'var(--color-success)' }}>FEATURE 브랜치</CardTitle>
              <CardText>새로운 기능이나 IaC 변경을 독립적으로 개발한다. 메인 코드에 영향을 주지 않고 안전하게 실험한다.</CardText>
            </Card>
          </GridTwo>
        </Section>

        <Section id="pr">
          <SectionTitleBlock num="3" title="협업 허브와 품질 보증 (PR)" />
          <div style={{ display: 'grid', gap: 'var(--sp-8)', gridTemplateColumns: '1fr' }}>
            <div>
              <FlowItem>
                <FlowIcon>
                  <ArrowRight size={20} />
                </FlowIcon>
                <FlowContent>
                  <FlowTitle>PUSH & PULL</FlowTitle>
                  <FlowDesc>로컬 변경사항을 클라우드(GitHub)로 업로드하고, 팀원의 최신 변경을 동기화한다.</FlowDesc>
                </FlowContent>
              </FlowItem>
              <FlowItem>
                <FlowIcon>
                  <MessageSquare size={20} />
                </FlowIcon>
                <FlowContent>
                  <FlowTitle>Pull Request (PR)</FlowTitle>
                  <FlowDesc>품질 게이트 역할을 수행한다. 모든 게이트(테스트, 리뷰) 통과 시에만 메인에 병합된다.</FlowDesc>
                </FlowContent>
              </FlowItem>
            </div>
            <Card style={{ background: 'var(--color-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--sp-4)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--color-border)' }}>
                <ShieldCheck size={18} color="var(--color-primary)" />
                <CardTitle style={{ marginBottom: 0, fontSize: '0.9rem' }}>Code Review 예시</CardTitle>
              </div>
              <ReviewCard>
                <ReviewMeta>
                  <ReviewAvatar />
                  <ReviewAuthor>SRE Engineer B</ReviewAuthor>
                </ReviewMeta>
                <ReviewBody>
                  &quot;이 Dockerfile의 베이스 이미지를 Alpine으로 변경하면 보안과 이미지 크기가 개선될 것 같다.&quot;
                </ReviewBody>
              </ReviewCard>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ApprovedBadge>PR Approved</ApprovedBadge>
              </div>
            </Card>
          </div>
        </Section>

        <Footer>
          <FooterTitle>도구를 넘어선 DevOps 표준</FooterTitle>
          <FooterText>
            Git과 GitHub은 단순 도구가 아니다. 현대 소프트웨어 배포와 인프라 관리의 근간으로, 여기서 확정된 &quot;코드&quot;는
            컨테이너로 패키징되고 Kubernetes로 배포된다. <strong>협업의 언어이자 자동화의 출발점</strong>인 이 워크플로우가
            조직의 개발 성숙도를 결정한다.
          </FooterText>

        </Footer>
      </Main>
    </Shell>
  )
}
