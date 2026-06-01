'use client'

import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import {
  RefreshCw,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Heart,
  Loader2,
  Trash2,
  Dice5,
  Gauge,
} from 'lucide-react'
import { Button } from '@/components/common/Button'
import { usePlaygroundStore, usePrefStore } from '@/stores/playgroundStore'
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
  { id: 'section2', label: '2. 폼 입력과 파생 상태' },
  { id: 'section3', label: '3. 비동기 액션과 로딩' },
  { id: 'section4', label: '4. 리스트(Todo) 상태' },
  { id: 'section5', label: '5. persist: 새로고침에도 유지' },
  { id: 'section6', label: '6. 셀렉터와 리렌더 최적화' },
  { id: 'section7', label: '7. 상태 공유 확인' },
  { id: 'section8', label: '8. 스토어 구조' },
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

const StatRow = styled.div`
  display: flex;
  gap: var(--sp-3);
  flex-wrap: wrap;
  margin-top: var(--sp-3);
`

const StatPill = styled.div`
  flex: 1;
  min-width: 120px;
  padding: var(--sp-3);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  text-align: center;

  span {
    display: block;
    font-size: 0.7rem;
    color: var(--color-text-muted);
    margin-bottom: 0.25rem;
  }
  strong {
    font-size: 1.1rem;
    color: var(--color-primary);
    font-variant-numeric: tabular-nums;
  }
`

const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: var(--sp-4) 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const TodoRow = styled.li<{ $done: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  border: 1px solid var(--color-border);

  span {
    flex: 1;
    font-size: 0.9rem;
    color: ${({ $done }) => ($done ? 'var(--color-text-muted)' : 'var(--color-text)')};
    text-decoration: ${({ $done }) => ($done ? 'line-through' : 'none')};
    cursor: pointer;
  }
`

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.12s ease;

  &:hover {
    color: var(--color-error);
    border-color: var(--color-error);
  }
`

const LikeButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  border-radius: 999px;
  border: 1px solid var(--color-error);
  background: color-mix(in srgb, var(--color-error) 10%, var(--color-bg));
  color: var(--color-error);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.96);
  }
`

const RenderBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-3);

  @media (min-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const RenderCard = styled.div<{ $accent: string }>`
  padding: var(--sp-4);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  border: 1px solid ${({ $accent }) => $accent};

  h5 {
    font-size: 0.82rem;
    font-weight: 700;
    margin-bottom: 0.4rem;
    color: var(--color-text);
  }
  p {
    font-size: 0.78rem;
    color: var(--color-text-muted);
    line-height: 1.5;
  }
  strong {
    color: ${({ $accent }) => $accent};
    font-variant-numeric: tabular-nums;
  }
`

// 같은 스토어를 구독하는 별개 컴포넌트 — 상태 공유 시연
function MirrorCounter() {
  const counter = usePlaygroundStore((s) => s.counter)
  const inputValue = usePlaygroundStore((s) => s.inputValue)
  return (
    <EchoBox>
      이 컴포넌트는 위와 <strong>다른 컴포넌트</strong>지만 같은 스토어를 구독한다 → counter:{' '}
      <strong>{counter}</strong>, input: <strong>{inputValue || '(빈 값)'}</strong>
    </EchoBox>
  )
}

// 좁은 셀렉터 구독: counter만 본다 → inputValue가 바뀌어도 리렌더 X
function NarrowSubscriber() {
  const counter = usePlaygroundStore((s) => s.counter)
  const renders = useRef(0)
  renders.current += 1
  return (
    <RenderCard $accent="var(--color-success)">
      <h5>좁은 셀렉터 (counter만 구독)</h5>
      <p>
        값: <strong>{counter}</strong>
        <br />
        렌더 횟수: <strong>{renders.current}</strong>
      </p>
    </RenderCard>
  )
}

// 넓은 구독: 스토어 객체를 통째로 본다 → 어떤 상태가 바뀌어도 리렌더
function WideSubscriber() {
  const store = usePlaygroundStore()
  const renders = useRef(0)
  renders.current += 1
  return (
    <RenderCard $accent="var(--color-warning)">
      <h5>넓은 구독 (스토어 전체)</h5>
      <p>
        counter: <strong>{store.counter}</strong>
        <br />
        렌더 횟수: <strong>{renders.current}</strong>
      </p>
    </RenderCard>
  )
}

export default function StatePlaygroundPage() {
  const counter = usePlaygroundStore((s) => s.counter)
  const increment = usePlaygroundStore((s) => s.increment)
  const decrement = usePlaygroundStore((s) => s.decrement)
  const reset = usePlaygroundStore((s) => s.reset)
  const inputValue = usePlaygroundStore((s) => s.inputValue)
  const setInputValue = usePlaygroundStore((s) => s.setInputValue)
  const isLoading = usePlaygroundStore((s) => s.isLoading)
  const randomValue = usePlaygroundStore((s) => s.randomValue)
  const fetchRandom = usePlaygroundStore((s) => s.fetchRandom)
  const todos = usePlaygroundStore((s) => s.todos)
  const addTodo = usePlaygroundStore((s) => s.addTodo)
  const toggleTodo = usePlaygroundStore((s) => s.toggleTodo)
  const removeTodo = usePlaygroundStore((s) => s.removeTodo)

  const likes = usePrefStore((s) => s.likes)
  const like = usePrefStore((s) => s.like)
  const resetLikes = usePrefStore((s) => s.resetLikes)

  const [draft, setDraft] = useState('')

  const submitTodo = () => {
    const text = draft.trim()
    if (!text) return
    addTodo(text)
    setDraft('')
  }

  // 파생 상태: 별도로 저장하지 않고 기존 상태에서 계산한다
  const charCount = inputValue.length
  const remaining = todos.filter((t) => !t.done).length

  return (
    <ContentDoc
      badge="State Playground"
      badgeIcon={<RefreshCw size={12} />}
      title="상태관리 Playground"
      quote={
        <>
          글로 읽는 것보다 직접 눌러보는 편이 빠르다. Zustand 스토어에 연결된 데모들을 만져보며
          카운터·폼·파생 상태부터 비동기 액션, persist, 그리고 셀렉터가 리렌더링을 어떻게
          줄이는지까지 체험해 본다.
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
        <SectionTitleBlock num="2" title="폼 입력과 파생 상태" />
        <SectionIntro>
          입력값을 전역 상태로 두면, 그 값을 구독하는 어디서든 동일한 값을 본다. 글자 수처럼
          입력값에서 <strong>계산 가능한 값</strong>은 따로 저장하지 않고 파생시킨다.
        </SectionIntro>

        <DemoStage>
          <DemoInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="여기에 입력해 보세요"
          />
          <StatRow>
            <StatPill>
              <span>현재 값</span>
              <strong>{inputValue || '—'}</strong>
            </StatPill>
            <StatPill>
              <span>글자 수 (파생)</span>
              <strong>{charCount}</strong>
            </StatPill>
            <StatPill>
              <span>대문자 (파생)</span>
              <strong>{inputValue.toUpperCase() || '—'}</strong>
            </StatPill>
          </StatRow>
        </DemoStage>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>파생 상태는 저장하지 않는다</CardTitle>
          <CardText>
            글자 수·대문자 변환처럼 기존 상태로부터 계산되는 값은 별도 상태로 두지 않는다. 중복
            저장하면 두 값이 어긋날 수 있다. 렌더링 때 계산하는 것이 단일 원천을 지키는 길이다.
          </CardText>
        </Card>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="비동기 액션과 로딩" />
        <Paragraph>
          액션 안에서 <code>async/await</code>로 비동기 작업을 처리할 수 있다. 시작할 때{' '}
          <code>isLoading</code>을 켜고, 끝나면 결과를 저장하며 끄는 패턴이다. (아래는 800ms
          지연으로 API 호출을 흉내 낸다.)
        </Paragraph>

        <DemoStage>
          <ControlRow>
            <Button variant="primary" size="md" onClick={fetchRandom} isLoading={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={16} /> 불러오는 중…
                </>
              ) : (
                <>
                  <Dice5 size={16} /> 랜덤 값 가져오기
                </>
              )}
            </Button>
          </ControlRow>
          <EchoBox>
            결과: <strong>{randomValue === null ? '(아직 없음)' : randomValue}</strong>
          </EchoBox>
        </DemoStage>

        <CodeBlock label="비동기 액션">{`fetchRandom: async () => {
  set({ isLoading: true })
  await new Promise((r) => setTimeout(r, 800)) // API 호출 흉내
  set({ randomValue: Math.floor(Math.random() * 100), isLoading: false })
}`}</CodeBlock>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="리스트(Todo) 상태" />
        <SectionIntro>
          배열 상태는 불변성을 지켜 갱신한다. 추가는 <code>[...todos, new]</code>, 수정은{' '}
          <code>map</code>, 삭제는 <code>filter</code>로 새 배열을 만든다.
        </SectionIntro>

        <DemoStage>
          <InputGroup>
            <DemoInput
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitTodo()}
              placeholder="할 일을 입력하고 Enter"
            />
            <Button variant="primary" size="md" onClick={submitTodo}>
              <Plus size={16} /> 추가
            </Button>
          </InputGroup>

          <TodoList>
            {todos.map((todo) => (
              <TodoRow key={todo.id} $done={todo.done}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                <IconButton onClick={() => removeTodo(todo.id)} aria-label="삭제">
                  <Trash2 size={15} />
                </IconButton>
              </TodoRow>
            ))}
          </TodoList>

          <EchoBox>
            남은 할 일 (파생): <strong>{remaining}</strong> / 전체 <strong>{todos.length}</strong>
          </EchoBox>
        </DemoStage>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="persist: 새로고침에도 유지" />
        <Paragraph>
          <code>persist</code> 미들웨어로 감싼 스토어는 상태를 자동으로 localStorage에 저장한다.
          아래 좋아요 수를 올린 뒤 <strong>페이지를 새로고침</strong>해 보자 — 값이 그대로
          남아 있다.
        </Paragraph>

        <DemoStage>
          <ControlRow>
            <LikeButton onClick={like}>
              <Heart size={18} /> 좋아요 {likes}
            </LikeButton>
            <Button variant="ghost" size="md" onClick={resetLikes}>
              <RotateCcw size={16} /> 초기화
            </Button>
          </ControlRow>
          <EchoBox>
            <strong>fsw-playground-pref</strong> 키로 localStorage에 저장됨 → 새로고침해도 유지
          </EchoBox>
        </DemoStage>

        <CodeBlock label="persist 미들웨어">{`export const usePrefStore = create<PrefState>()(
  persist(
    (set) => ({
      likes: 0,
      like: () => set((s) => ({ likes: s.likes + 1 })),
    }),
    { name: 'fsw-playground-pref' }, // localStorage 키
  ),
)`}</CodeBlock>
      </Section>

      <Section id="section6">
        <SectionTitleBlock num="6" title="셀렉터와 리렌더 최적화" />
        <Paragraph>
          Zustand의 핵심 성능 비결은 <strong>셀렉터 구독</strong>이다. 아래 두 컴포넌트는 같은
          스토어를 구독하지만 방식이 다르다. <strong>1번 섹션의 카운터를 올려</strong> 두
          컴포넌트의 렌더 횟수를 비교해 보자.
        </Paragraph>

        <DemoStage>
          <RenderBoard>
            <NarrowSubscriber />
            <WideSubscriber />
          </RenderBoard>
          <EchoBox>
            카운터를 올리면 둘 다 counter를 보므로 함께 렌더된다. 하지만{' '}
            <strong>2번 섹션 입력값</strong>을 바꾸면 — 좁은 셀렉터(초록)는 그대로, 넓은
            구독(주황)만 렌더 횟수가 증가한다.
          </EchoBox>
        </DemoStage>

        <CodeBlock label="셀렉터로 구독 범위 좁히기">{`// ✅ counter만 구독 → inputValue 변경에는 리렌더 안 됨
const counter = usePlaygroundStore((s) => s.counter)

// ❌ 스토어 전체 구독 → 어떤 상태가 바뀌어도 리렌더
const store = usePlaygroundStore()`}</CodeBlock>
      </Section>

      <Section id="section7">
        <SectionTitleBlock num="7" title="상태 공유 확인" />
        <Paragraph>
          아래 박스는 위 데모들과 <strong>별개의 컴포넌트</strong>(<code>MirrorCounter</code>)
          지만, 같은 스토어를 구독하기 때문에 위에서 바꾼 값이 그대로 반영된다. props를 한 번도
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

      <Section id="section8">
        <SectionTitleBlock num="8" title="스토어 구조" />
        <Paragraph>
          이 데모가 사용하는 스토어의 핵심 구조다. 상태와 그 상태를 바꾸는 action을 한곳에 모아
          캡슐화한 것이 전부다.
        </Paragraph>

        <CodeBlock label="stores/playgroundStore.ts">{`export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  counter: 0,
  increment: () => set((s) => ({ counter: s.counter + 1 })),

  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),

  isLoading: false,
  randomValue: null,
  fetchRandom: async () => { /* 비동기 액션 */ },

  todos: [],
  addTodo: (text) => set((s) => ({ todos: [...s.todos, mk(text)] })),
  toggleTodo: (id) => set((s) => ({ todos: s.todos.map(...) })),
  removeTodo: (id) => set((s) => ({ todos: s.todos.filter(...) })),
}))`}</CodeBlock>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <Gauge size={18} color="var(--color-primary)" /> 정리
          </CardTitle>
          <CardText>
            상태는 스토어에 모으고, 컴포넌트는 <strong>필요한 조각만 셀렉터로</strong> 가져간다.
            파생 값은 저장하지 않고 계산하며, 지속이 필요하면 <code>persist</code>로 감싼다.
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
