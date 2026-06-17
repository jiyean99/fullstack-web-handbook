'use client'

import React from 'react'
import Link from 'next/link'
import {
  Globe,
  Layers,
  Paintbrush,
  RefreshCw,
  Repeat,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'
import ContentDoc, {
  Section,
  SectionTitleBlock,
  Paragraph,
  SectionIntro,
  GridTwo,
  Stack,
  Card,
  CardTitle,
  CardText,
  SmallHeading,
  SmallText,
  Dot,
  BulletList,
  Bullet,
  TableWrapper,
  Table,
  Th,
  Td,
  CodeBlock,
  HeaderQuote,
} from '@/components/content/ContentDoc'

const toc = [
  { id: 'section1', label: '1. 브라우저가 화면을 그리는 과정' },
  { id: 'section2', label: '2. 임계 렌더링 경로' },
  { id: 'section3', label: '3. 리플로우와 리페인트' },
  { id: 'section4', label: '4. 이벤트 루프와 렌더링' },
  { id: 'section5', label: '5. DOM과 가상 DOM' },
]

export default function BrowserRenderingPage() {
  return (
    <ContentDoc
      badge="Frontend · 기본"
      badgeIcon={<Globe size={12} />}
      title="브라우저 렌더링 원리"
      quote={
        <>
          React를 배우기 전에 &lsquo;브라우저가 코드를 어떻게 화면으로 바꾸는가&rsquo;를 그릴 수
          있어야 한다. HTML이 DOM이 되고, 스타일이 입혀지고, 배치되고, 칠해지는 이 흐름이
          프론트엔드 성능과 프레임워크 설계의 바탕이다. 이 장은 그 토대를 세운다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="브라우저가 화면을 그리는 과정" />
        <Paragraph>
          브라우저는 받은 HTML·CSS·JS를 정해진 단계를 거쳐 픽셀로 바꾼다. 이 파이프라인을
          알면 &lsquo;왜 이 코드가 화면을 느리게 만드는가&rsquo;를 추론할 수 있다.
        </Paragraph>

        <BulletList>
          <Bullet>
            <strong>파싱 → DOM</strong>: HTML을 읽어 요소의 트리(DOM)를 만든다.
          </Bullet>
          <Bullet>
            <strong>파싱 → CSSOM</strong>: CSS를 읽어 스타일 규칙의 트리(CSSOM)를 만든다.
          </Bullet>
          <Bullet>
            <strong>렌더 트리</strong>: DOM과 CSSOM을 합쳐 &lsquo;화면에 보이는 것&rsquo;만 담은
            트리를 만든다(<code>display:none</code>은 제외).
          </Bullet>
          <Bullet>
            <strong>레이아웃(Layout/Reflow)</strong>: 각 요소의 위치와 크기를 계산한다.
          </Bullet>
          <Bullet>
            <strong>페인트(Paint)</strong>: 색·텍스트·그림자 등 픽셀을 칠한다.
          </Bullet>
          <Bullet>
            <strong>합성(Composite)</strong>: 여러 레이어를 GPU에서 합쳐 최종 화면을 만든다.
          </Bullet>
        </BulletList>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Globe size={18} color="var(--color-primary)" /> 단계는 순서가 있다
          </CardTitle>
          <CardText>
            레이아웃이 바뀌면 그 뒤의 페인트·합성도 다시 해야 한다. 그래서 &lsquo;어느 단계를
            건드리는 변경인가&rsquo;가 성능을 좌우한다. 위치·크기를 바꾸면 레이아웃부터, 색만
            바꾸면 페인트부터 다시 시작된다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="임계 렌더링 경로" />
        <SectionIntro>
          첫 화면이 그려지기까지 반드시 거쳐야 하는 단계들을 임계 렌더링 경로(Critical Rendering
          Path)라 한다. 이 경로를 막는 리소스를 줄이는 것이 첫 화면 속도(FCP·LCP)의 핵심이다.
        </SectionIntro>

        <GridTwo>
          <Card>
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-warning)" /> CSS는 렌더 차단
            </CardTitle>
            <CardText>
              CSSOM이 완성돼야 렌더 트리를 만들 수 있어, CSS는 기본적으로 렌더링을 막는다. 그래서
              CSS는 작게·빨리 내려와야 하고, 중요한 스타일만 인라인으로 먼저 주기도 한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-warning)" /> JS는 파싱 차단
            </CardTitle>
            <CardText>
              <code>&lt;script&gt;</code>를 만나면 브라우저는 DOM 파싱을 멈추고 실행한다. 그래서
              스크립트는 보통 <code>defer</code>(파싱 후 실행)나 <code>async</code>(받는 대로
              실행)로 차단을 푼다.
            </CardText>
          </Card>
        </GridTwo>

        <CodeBlock label="스크립트 로딩 전략">{`<!-- 차단: 여기서 파싱이 멈추고 스크립트를 받고 실행 -->
<script src="app.js"></script>

<!-- defer: HTML 파싱을 막지 않고, 파싱이 끝난 뒤 순서대로 실행 -->
<script src="app.js" defer></script>

<!-- async: 받는 즉시 실행(순서 보장 안 됨) — 독립적 분석 스크립트 등에 -->
<script src="analytics.js" async></script>`}</CodeBlock>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 경로를 짧게
          </CardTitle>
          <CardText>
            렌더를 막는 CSS·JS를 줄이고, 꼭 필요한 것만 먼저 보내면 첫 화면이 빨리 뜬다. 이
            발상을 끝까지 밀어 &lsquo;자바스크립트를 최소로&rsquo; 보내는 접근이{' '}
            <Link
              href="/frontend/meta-frameworks"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              메타프레임워크와 렌더링 전략
            </Link>{' '}
            의 아일랜드 아키텍처다.
          </CardText>
        </Card>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="리플로우와 리페인트" />
        <Paragraph>
          화면이 한 번 그려진 뒤에도, DOM이나 스타일을 바꾸면 파이프라인의 일부가 다시 돈다.
          위치·크기가 바뀌면 <strong>리플로우(Reflow)</strong>, 색·배경만 바뀌면{' '}
          <strong>리페인트(Repaint)</strong>가 일어난다. 리플로우가 더 비싸다.
        </Paragraph>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>변경</Th>
                <Th>다시 도는 단계</Th>
                <Th>비용</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>width, top, font-size</Td>
                <Td>레이아웃 → 페인트 → 합성</Td>
                <Td>높음 (리플로우)</Td>
              </tr>
              <tr>
                <Td $muted>color, background, visibility</Td>
                <Td>페인트 → 합성</Td>
                <Td>중간 (리페인트)</Td>
              </tr>
              <tr>
                <Td $muted>transform, opacity</Td>
                <Td>합성만</Td>
                <Td>낮음 (GPU 합성)</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Stack>
          <Card>
            <CardTitle>
              <RefreshCw size={20} color="var(--color-warning)" /> 레이아웃 스래싱
            </CardTitle>
            <CardText>
              반복문 안에서 스타일을 바꾸고(쓰기) 바로 <code>offsetHeight</code> 같은 값을
              읽으면(읽기), 브라우저가 매번 강제로 레이아웃을 계산한다. 읽기와 쓰기를 모아서
              분리하면 이 낭비가 사라진다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <CheckCircle size={20} color="var(--color-success)" /> 애니메이션은 transform으로
            </CardTitle>
            <CardText>
              위치 이동을 <code>top/left</code> 대신 <code>transform: translate()</code>로 하면
              레이아웃·페인트를 건너뛰고 합성 단계만 거쳐 부드럽다. <code>opacity</code>도
              마찬가지다.
            </CardText>
          </Card>
        </Stack>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="이벤트 루프와 렌더링" />
        <SectionIntro>
          자바스크립트는 한 개의 메인 스레드에서 돈다. 이 스레드가 렌더링도 담당하기 때문에,
          긴 JS 작업은 화면을 통째로 멈춘다. 이벤트 루프를 이해하면 &lsquo;왜 버벅이는가&rsquo;가
          보인다.
        </SectionIntro>

        <CodeBlock label="태스크와 마이크로태스크의 실행 순서">{`console.log('1')                      // 동기

setTimeout(() => console.log('4'), 0)  // 매크로태스크 (다음 루프)

Promise.resolve()
  .then(() => console.log('3'))        // 마이크로태스크 (현재 작업 직후)

console.log('2')                       // 동기

// 출력: 1 → 2 → 3 → 4
// 동기 코드 → 마이크로태스크 비우기 → 렌더링 기회 → 다음 매크로태스크`}</CodeBlock>

        <GridTwo>
          <Card>
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-warning)" /> 긴 작업은 화면을 막는다
            </CardTitle>
            <CardText>
              메인 스레드가 무거운 계산을 도는 동안 브라우저는 페인트도 입력 처리도 못 한다.
              긴 작업은 잘게 쪼개거나(<code>setTimeout</code>·스케줄링), 워커로 옮긴다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Repeat size={20} color="var(--color-primary)" /> rAF로 렌더에 맞추기
            </CardTitle>
            <CardText>
              <code>requestAnimationFrame</code>은 다음 화면 그리기 직전에 콜백을 실행해, 한
              프레임에 한 번만 DOM을 갱신하게 한다. 스크롤·애니메이션을 프레임에 맞춰 부드럽게
              만든다.
            </CardText>
          </Card>
        </GridTwo>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="DOM과 가상 DOM" />
        <Paragraph>
          DOM 조작이 &lsquo;느리다&rsquo;고들 하는데, 정확히는 조작 자체보다 그것이 유발하는
          <strong> 리플로우·리페인트</strong>가 비싸다. 변경을 한 번에 모아서 적용할수록 좋다.
          이 발상이 React 같은 라이브러리가 쓰는 가상 DOM의 출발점이다.
        </Paragraph>

        <Stack>
          <Card>
            <CardTitle>
              <Layers size={20} color="var(--color-primary)" /> 가상 DOM의 발상
            </CardTitle>
            <CardText>
              실제 DOM을 매번 직접 고치는 대신, 메모리에 가벼운 표현(가상 DOM)을 두고 이전과
              비교(diff)해서 &lsquo;바뀐 최소한&rsquo;만 실제 DOM에 반영한다. 변경을 모아 한 번에
              적용해 리플로우를 줄이려는 전략이다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Paintbrush size={20} color="var(--color-success)" /> 만능은 아니다
            </CardTitle>
            <CardText>
              diff 자체에도 비용이 있어 &lsquo;항상 빠른&rsquo; 게 아니라 &lsquo;직접 조작의
              실수를 줄여주는&rsquo; 도구다. 그래서 불필요한 리렌더를 줄이는 최적화가 여전히
              필요하다.
            </CardText>
          </Card>
        </Stack>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <SmallHeading style={{ fontSize: '0.95rem' }}>
              <Dot /> 다음 단계로
            </SmallHeading>
          </CardTitle>
          <SmallText>
            가상 DOM 위에서 컴포넌트와 상태를 다루는 구체적인 패턴은{' '}
            <Link
              href="/frontend/react"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              React 핵심 패턴
            </Link>{' '}
            에서, 첫 화면을 빠르게 만드는 렌더링 전략은{' '}
            <Link
              href="/frontend/meta-frameworks"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              메타프레임워크와 렌더링 전략
            </Link>{' '}
            에서 이어진다.
          </SmallText>
        </Card>
      </Section>

      <HeaderQuote>
        프레임워크가 달라도 브라우저가 화면을 그리는 방식은 같다.
        <br />
        <strong>파싱·레이아웃·페인트라는 토대를 알면, 그 위의 성능 문제가 보인다.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
