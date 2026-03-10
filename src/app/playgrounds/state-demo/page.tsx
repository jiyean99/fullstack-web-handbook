'use client'

export const dynamic = 'force-dynamic'

import styled from 'styled-components'
import { usePlaygroundStore } from '@/stores/playgroundStore'
import { Button } from '@/components/common/Button'

// ─── Layout ──────────────────────────────────────
const PageWrapper = styled.div`
  max-width: 680px;
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
  margin-bottom: var(--sp-8);
  font-size: 1rem;
  line-height: 1.7;
`

const DemoCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--sp-6);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--sp-5);
`

const CardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--sp-1);
`

const CardSubtitle = styled.p`
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: var(--sp-5);
  line-height: 1.6;
`

// ─── Counter ─────────────────────────────────────
const StoreBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: var(--sp-1) var(--sp-3);
  background: var(--color-gray-100);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  margin-bottom: var(--sp-5);
`

const CounterDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-5);
  margin-bottom: var(--sp-4);
`

const CounterValue = styled.span`
  font-size: 3rem;
  font-weight: 800;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
  min-width: 3ch;
  text-align: center;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  line-height: 1;
`

const CounterControls = styled.div`
  display: flex;
  justify-content: center;
`

// ─── Input ───────────────────────────────────────
const StyledInput = styled.input`
  width: 100%;
  padding: var(--sp-3) var(--sp-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  background: var(--color-bg);
  color: var(--color-text);
  transition: border-color 0.15s, box-shadow 0.15s;
  font-family: inherit;
  margin-bottom: var(--sp-3);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }

  &::placeholder {
    color: var(--color-text-muted);
  }
`

const InputPreview = styled.div`
  padding: var(--sp-3) var(--sp-4);
  background: var(--color-gray-100);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  color: var(--color-text-muted);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  min-height: 44px;
  display: flex;
  align-items: center;
`

const InputPreviewValue = styled.span`
  color: var(--color-primary);
  margin-left: 0.3em;
`

// ─── Component ────────────────────────────────────
export default function StateDemoPage() {
  const { counter, increment, decrement, reset, inputValue, setInputValue } =
    usePlaygroundStore()

  return (
    <PageWrapper>
      <PageTitle>🔄 상태관리 데모</PageTitle>
      <PageDesc>
        Zustand를 활용한 클라이언트 상태관리 예시입니다. 카운터와 텍스트 입력 상태가 Zustand
        스토어에서 관리됩니다.
      </PageDesc>

      {/* ── Counter ── */}
      <DemoCard>
        <CardTitle>🔢 카운터</CardTitle>
        <CardSubtitle>increment / decrement / reset 액션이 Zustand 스토어로 전달됩니다.</CardSubtitle>

        <StoreBadge>store.counter = {counter}</StoreBadge>

        <CounterDisplay>
          <Button variant="secondary" size="lg" onClick={decrement}>−</Button>
          <CounterValue>{counter}</CounterValue>
          <Button variant="primary" size="lg" onClick={increment}>+</Button>
        </CounterDisplay>

        <CounterControls>
          <Button variant="ghost" size="sm" onClick={reset}>초기화</Button>
        </CounterControls>
      </DemoCard>

      {/* ── Input ── */}
      <DemoCard>
        <CardTitle>✏️ 텍스트 입력</CardTitle>
        <CardSubtitle>
          입력값이 Zustand 스토어의 inputValue로 동기화됩니다. persist 미들웨어로 페이지
          이동 후에도 유지됩니다.
        </CardSubtitle>

        <StyledInput
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="여기에 입력하세요..."
        />

        <InputPreview>
          {inputValue ? (
            <>
              store.inputValue =<InputPreviewValue>&quot;{inputValue}&quot;</InputPreviewValue>
            </>
          ) : (
            <span style={{ opacity: 0.5 }}>store.inputValue = &quot;&quot;</span>
          )}
        </InputPreview>
      </DemoCard>
    </PageWrapper>
  )
}
