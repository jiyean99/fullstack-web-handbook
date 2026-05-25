'use client'

import React from 'react'
import styled from 'styled-components'
import { RefreshCw, Minus, Plus, RotateCcw, Share2 } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { usePlaygroundStore } from '@/stores/playgroundStore'
import ContentDoc, {
  Section,
  SectionTitleBlock,
  Paragraph,
  SectionIntro,
  Card,
  CardTitle,
  CardText,
  CodeBlock,
  HeaderQuote,
} from '@/components/content/ContentDoc'

const toc = [
  { id: 'section1', label: '1. 카운터 상태' },
  { id: 'section2', label: '2. 폼 입력 상태' },
  { id: 'section3', label: '3. 상태 공유 확인' },
  { id: 'section4', label: '4. 스토어 구조' },
]

// ─── Demo Widgets ───────────────────────────────────
const DemoStage = styled.div`
  padding: var(--sp-6);
  border-radius: 1rem;
  border: 1px dashed var(--color-border);
  background: var(--color-surface);
  margin-bottom: var(--sp-5);
`

const CounterValue = styled.div`
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
  margin-bottom: var(--sp-4);
`

const ControlRow = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  flex-wrap: wrap;
`

const DemoInput = styled.input`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }
`

const EchoBox = styled.div`
  margin-top: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  font-size: 0.9rem;
  color: var(--color-text-muted);

  strong {
    color: var(--color-text);
    font-family: 'JetBrains Mono', monospace;
  }
`

// 같은 스토어를 구독하는 별개의 컴포넌트 — 상태 공유 시연용
function MirrorCounter() {
  const counter = usePlaygroundStore((s) => s.counter)
  const inputValue = usePlaygroundStore((s) => s.inputValue)
  return (
    <EchoBox>
      이 컴포넌트는 위와 <strong>다른 컴포넌트</strong>지만 같은 스토어를 구독한다 →
      counter: <strong>{counter}</strong>, input: <strong>{inputValue || '(빈 값)'}</strong>
    </EchoBox>
  )
}

export default function StatePlaygroundPage() {
  const counter = usePlaygroundStore((s) => s.counter)
  const increment = usePlaygroundStore((s) => s.increment)
  const decrement = usePlaygroundStore((s) => s.decrement)
  const reset = usePlaygroundStore((s) => s.reset)
  const inputValue = usePlaygroundStore((s) => s.inputValue)
  const setInputValue = usePlaygroundStore((s) => s.setInputValue)

  return (
    <ContentDoc
      badge="State Playground"
      badgeIcon={<RefreshCw size={12} />}
      title="상태관리 Playground"
      quote={
        <>
          글로 읽는 것보다 직접 눌러보는 편이 빠르다. Zustand 스토어 하나에 연결된 데모를
          만져보며, 셀렉터로 구독한 상태가 여러 컴포넌트에서 어떻게 공유되는지 확인해 본다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="카운터 상태" />
        <Paragraph>
          가장 기본적인 전역 상태다. 버튼을 누르면 스토어의 <code>counter</code>가 바뀌고, 이
          값을 구독하는 컴포넌트가 리렌더링된다.
        </Paragraph>

        <DemoStage>
          <CounterValue>{counter}</CounterValue>
          <ControlRow>
            <Button variant="secondary" size="md" onClick={decrement}>
              <Minus size={16} /> 감소
            </Button>
            <Button variant="ghost" size="md" onClick={reset}>
              <RotateCcw size={16} /> 초기화
            </Button>
            <Button variant="primary" size="md" onClick={increment}>
              <Plus size={16} /> 증가
            </Button>
          </ControlRow>
        </DemoStage>

        <CodeBlock label="action 호출">{`const counter = usePlaygroundStore((s) => s.counter)
const increment = usePlaygroundStore((s) => s.increment)

<button onClick={increment}>증가</button> // 상태 변경은 action으로 캡슐화`}</CodeBlock>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="폼 입력 상태" />
        <SectionIntro>
          입력값도 전역 상태로 둘 수 있다. 입력하는 즉시 스토어가 갱신되고, 그 값을 구독하는
          어디서든 동일한 값을 본다.
        </SectionIntro>

        <DemoStage>
          <DemoInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="여기에 입력해 보세요"
          />
          <EchoBox>
            현재 스토어 값: <strong>{inputValue || '(빈 값)'}</strong>
          </EchoBox>
        </DemoStage>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="상태 공유 확인" />
        <Paragraph>
          아래 박스는 위 데모들과 <strong>별개의 컴포넌트</strong>(<code>MirrorCounter</code>)
          지만, 같은 스토어를 구독하기 때문에 위에서 바꾼 값이 그대로 반영된다. prop을 한 번도
          전달하지 않았다는 점이 핵심이다.
        </Paragraph>

        <DemoStage>
          <MirrorCounter />
        </DemoStage>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Share2 size={18} color="var(--color-primary)" /> props drilling 없는 공유
          </CardTitle>
          <CardText>
            중간 컴포넌트들을 거쳐 props를 내려보내지 않아도, 필요한 컴포넌트가 스토어를 직접
            구독한다. 깊은 트리에서 상태를 공유할 때 특히 강력하다.
          </CardText>
        </Card>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="스토어 구조" />
        <Paragraph>
          이 데모가 사용하는 스토어의 전체 정의다. 상태와 그 상태를 바꾸는 action을 한곳에
          모아 캡슐화한 것이 전부다.
        </Paragraph>

        <CodeBlock label="stores/playgroundStore.ts">{`import { create } from 'zustand'

interface PlaygroundState {
  counter: number
  increment: () => void
  decrement: () => void
  reset: () => void
  inputValue: string
  setInputValue: (value: string) => void
}

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  counter: 0,
  increment: () => set((s) => ({ counter: s.counter + 1 })),
  decrement: () => set((s) => ({ counter: s.counter - 1 })),
  reset: () => set({ counter: 0 }),
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
}))`}</CodeBlock>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>셀렉터로 구독하기</CardTitle>
          <CardText>
            <code>{`usePlaygroundStore((s) => s.counter)`}</code>처럼 필요한 조각만 선택하면,
            구독하지 않은 다른 상태가 바뀌어도 해당 컴포넌트는 리렌더링되지 않는다.
          </CardText>
        </Card>
      </Section>

      <HeaderQuote>
        전역 상태의 핵심은 &lsquo;하나의 원천을 여러 곳이 구독&rsquo;하는 것이다.
        <br />
        <strong>상태는 스토어에 모으고, 컴포넌트는 필요한 조각만 셀렉터로 가져가라.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
