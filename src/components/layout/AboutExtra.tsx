'use client'

import styled from 'styled-components'

const StackTable = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
`

const TableTitle = styled.div`
  padding: var(--sp-4) var(--sp-5);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-gray-100);
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 120px 160px 1fr;
  padding: var(--sp-3) var(--sp-5);
  border-bottom: 1px solid var(--color-border);
  font-size: 0.85rem;
  gap: var(--sp-4);

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(even) {
    background: color-mix(in srgb, var(--color-surface) 60%, var(--color-bg));
  }
`

const TableHeader = styled(TableRow)`
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  background: var(--color-gray-100) !important;
`

const CellLayer = styled.span`
  color: var(--color-text-muted);
  font-size: 0.78rem;
`

const CellTech = styled.span`
  color: var(--color-primary);
  font-weight: 600;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.8rem;
`

const CellRole = styled.span`
  color: var(--color-text-muted);
`

const stack = [
  { layer: '프레임워크', tech: 'Next.js 15', role: 'App Router, SSR/SSG, 파일 기반 라우팅' },
  { layer: '언어', tech: 'React 19 + TS', role: '컴포넌트, 훅, 타입 안전성' },
  { layer: '스타일링', tech: 'styled-components', role: 'CSS-in-JS, 다크모드, 디자인 토큰' },
  { layer: '서버 상태', tech: 'TanStack Query', role: 'API 페칭, 캐싱, 리패칭' },
  { layer: '클라이언트 상태', tech: 'Zustand', role: 'UI 상태, persist 미들웨어' },
  { layer: '검증', tech: 'Zod', role: '런타임 타입 검증, API 응답 파싱' },
  { layer: '문서', tech: 'Nextra 4.x', role: 'MDX 기반 문서 사이트' },
  { layer: '컴포넌트', tech: 'Storybook 10', role: '컴포넌트 개발 및 문서화' },
]

export default function AboutExtra() {
  return (
    <StackTable>
      <TableTitle>🛠 기술 스택</TableTitle>
      <TableHeader>
        <CellLayer>계층</CellLayer>
        <CellTech>기술</CellTech>
        <CellRole>역할</CellRole>
      </TableHeader>
      {stack.map((s) => (
        <TableRow key={s.tech}>
          <CellLayer>{s.layer}</CellLayer>
          <CellTech>{s.tech}</CellTech>
          <CellRole>{s.role}</CellRole>
        </TableRow>
      ))}
    </StackTable>
  )
}
