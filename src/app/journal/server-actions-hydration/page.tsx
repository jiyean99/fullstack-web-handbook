'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {
  ShieldAlert,
  Cpu,
  Clock,
  Code,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import ContentDoc, {
  Section,
  SectionTitleBlock,
  Paragraph,
  SectionIntro,
  Card,
  CardTitle,
  CardText,
  BulletList,
  Bullet,
  CodeBlock,
  HeaderQuote,
} from '@/components/content/ContentDoc'

const toc = [
  { id: 'section1', label: '1. 문제 현상: Hydration Mismatch' },
  { id: 'section2', label: '2. 원인 분석: 서버와 클라이언트의 동상이몽' },
  { id: 'section3', label: '3. 해결 패턴: 3가지 실무 해결책' },
  { id: 'section4', label: '4. Server Actions와의 연결고리' },
  { id: 'section5', label: '5. 요약 및 권장 규칙' },
]

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-decoration: none;
  margin-bottom: var(--sp-4);
  transition: color 0.15s ease;

  svg {
    width: 0.9rem;
    height: 0.9rem;
  }

  &:hover {
    color: var(--color-primary);
  }
`

export default function ServerActionsHydrationPage() {
  return (
    <ContentDoc
      badge="Journal · Next.js 15"
      badgeIcon={<ShieldAlert size={12} />}
      title="Next.js 15 Server Actions와 하이드레이션 오류 해결기"
      quote={
        <>
          Next.js 15에서 API 라우트 없이 직접 데이터베이스나 외부 서비스와 통신할 수 있는 Server Actions를 도입했다.
          하지만 클라이언트에서 비동기 데이터 상태와 동적으로 렌더링된 컴포넌트가 얽히면서 복잡한 하이드레이션(Hydration) 오류가 터지기 시작했다.
          그 원인 분석과 실무 해결 방안을 상세히 기록한다.
        </>
      }
      toc={toc}
    >
      <div>
        <BackLink href="/journal">
          <ArrowLeft /> 실무 기록 목록으로
        </BackLink>
      </div>

      <Section id="section1">
        <SectionTitleBlock num="1" title="문제 현상: Hydration Mismatch" />
        <Paragraph>
          Server Action을 호출하여 받은 결과를 화면에 반영하는 도중, 브라우저 개발자 도구에 아래와 같은 빨간 에러 메시지가 쏟아졌다.
          화면이 순간적으로 깨지거나, 서버에서 보낸 HTML과 클라이언트가 렌더링한 가상 DOM이 어긋나 깜빡거리는 문제(FOUC 유사 현상)도 동반되었다.
        </Paragraph>

        <CodeBlock label="브라우저 콘솔 에러 로그">{`Error: Hydration failed because the initial UI does not match what was rendered on the server.
Warning: Expected server HTML to contain a matching <div> in <div>.
Warning: Text content did not match. Server: "2026-06-20 14:00" Client: "2026-06-20 23:00"`}</CodeBlock>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-warning)" /> 하이드레이션이란?
          </CardTitle>
          <CardText>
            서버에서 미리 그려 보낸 정적 HTML 위에 리액트가 클라이언트 측 자바스크립트를 매핑하여 
            인터랙티브한 이벤트 리스너를 결합하는 프로세스다. 이 과정에서 서버의 HTML 구조와 클라이언트 최초 렌더링 구조가 <strong>단 1글자라도 다르면</strong> 리액트는 에러를 던지며 전체를 새로 그린다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="원인 분석: 서버와 클라이언트의 동상이몽" />
        <SectionIntro>
          이번 하이드레이션 에러는 크게 세 가지 요인으로 인해 발생했다.
        </SectionIntro>

        <BulletList>
          <Bullet>
            <strong>서버/클라이언트 시간대(TimeZone) 불일치</strong>: 서버 액션 또는 서버 컴포넌트에서 <code>new Date()</code>를 렌더링할 때, 서버의 시스템 시간대(e.g. UTC)와 브라우저 로컬 시간대(e.g. KST)가 달라 렌더링 텍스트가 깨졌다.
          </Bullet>
          <Bullet>
            <strong>랜덤성 및 로컬스토리지 참조</strong>: 클라이언트 렌더링 도중 <code>Math.random()</code> 또는 <code>localStorage</code> 정보를 초기 UI에 직접 반영한 것이 문제였다. 서버에는 <code>localStorage</code>가 없으므로 undefined로 처리되지만 클라이언트는 값이 존재해 달라진다.
          </Bullet>
          <Bullet>
            <strong>Server Action 응답 지연과 렌더링 타이밍</strong>: 서버 액션 실행 완료 후 상태가 즉각 업데이트될 때, 서스펜스(Suspense) 경계 내에서 Hydration이 끝나기 전에 클라이언트 갱신이 겹쳐 충돌했다.
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="해결 패턴: 3가지 실무 해결책" />
        <Paragraph>
          하이드레이션 불일치를 피하기 위한 실무 해결 전략을 코드 레벨에서 살펴보자.
        </Paragraph>

        <CardTitle>
          <Cpu size={16} color="var(--color-primary)" /> 패턴 A: 렌더링 시점 useEffect 지연 (Double-pass Rendering)
        </CardTitle>
        <Paragraph>
          클라이언트 전용 요소를 마운트된 이후에 렌더링하여 서버 HTML과 최초 브라우저 HTML의 완전한 일치를 맞춘다.
        </Paragraph>
        <CodeBlock label="ClientOnlyComponent.tsx">{`'use client'

import { useState, useEffect } from 'react'

export function ClientOnlyComponent() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // 최초 하이드레이션 시점에는 비워둠으로써 서버 측 HTML과 일치시킴
    return <div className="placeholder">로딩 중...</div>
  }

  return <div>사용자 로컬 환경 정보: {window.innerWidth}px</div>
}`}</CodeBlock>

        <CardTitle>
          <Clock size={16} color="var(--color-primary)" /> 패턴 B: 시간대/로케일 안정화 포맷
        </CardTitle>
        <Paragraph>
          시간 렌더링 시 브라우저 옵션 대신 시간대(timezone)를 고정하거나 `suppressHydrationWarning` 속성을 선언한다.
        </Paragraph>
        <CodeBlock label="date-formatting.tsx">{`// 1. suppressHydrationWarning 사용 (단일 태그에 허용)
<span suppressHydrationWarning>
  {new Date(createdAt).toLocaleTimeString()}
</span>

// 2. 시간대 고정 포맷터 사용 (권장)
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}`}</CodeBlock>

        <CardTitle>
          <Code size={16} color="var(--color-primary)" /> 패턴 C: next/dynamic으로 SSR 비활성화
        </CardTitle>
        <Paragraph>
          해당 컴포넌트 자체를 서버 렌더링에서 완전히 제외하여 하이드레이션 원천 차단.
        </Paragraph>
        <CodeBlock label="dynamic-import.tsx">{`import dynamic from 'next/dynamic'

// ssr: false 설정을 통해 클라이언트 브라우저에서만 로드 및 렌더링
const ClientGauge = dynamic(
  () => import('./Gauge'),
  { ssr: false }
)`}</CodeBlock>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="Server Actions와의 연결고리" />
        <Paragraph>
          Next.js 15의 Server Action은 폼 액션과 통합되어 사용된다. 이때 <code>useActionState</code> 훅을 사용해 액션 결과를 받고, 
          성공 여부에 따라 UI 분기를 처리한다.
          이 경우에도 `useActionState`가 제공하는 최초 상태(initial state)가 서버 렌더링 HTML과 클라이언트 렌더링 HTML에서 일치하는지 반드시 점검해야 한다.
        </Paragraph>
        <CodeBlock label="ServerActionForm.tsx">{`'use client'

import { useActionState } from 'react'
import { submitOrder } from './actions'

const initialState = { success: false, message: '' } // 초기 상태 일치 필수!

export default function OrderForm() {
  const [state, formAction, isPending] = useActionState(submitOrder, initialState)

  return (
    <form action={formAction}>
      <input type="text" name="itemId" required />
      <button type="submit" disabled={isPending}>
        {isPending ? '처리 중...' : '주문하기'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}`}</CodeBlock>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="요약 및 권장 규칙" />
        <Card style={{ background: 'color-mix(in srgb, var(--color-success) 10%, var(--color-bg))' }}>
          <CardTitle>
            <CheckCircle size={18} color="var(--color-success)" /> 개발 체크리스트
          </CardTitle>
          <CardText>
            <BulletList>
              <Bullet>서버 렌더링 HTML과 클라이언트의 최초 가상 DOM이 어긋나지 않도록 `window`나 `document` 등의 브라우저 API 호출은 오직 `useEffect` 안이나 마운트 체크 변수 가드 이후에 처리하자.</Bullet>
              <Bullet>날짜와 시간 값은 타임존(Timezone)을 명시적으로 제어하여 렌더링하자.</Bullet>
              <Bullet>Next.js 15의 dynamic loading 옵션을 적극 활용하여 브라우저 독립 요소를 격리하자.</Bullet>
            </BulletList>
          </CardText>
        </Card>
      </Section>

      <HeaderQuote>
        하이드레이션 불일치 문제는 렌더링의 &lsquo;서버 라이프사이클&rsquo;과 &lsquo;클라이언트 라이프사이클&rsquo; 사이의 동기화 불일치를 뜻한다.
        <br />
        <strong>이펙트 지연 렌더링과 SSR 차단(next/dynamic)을 올바르게 구사해 이를 방지하자.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
