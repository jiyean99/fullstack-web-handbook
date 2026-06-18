'use client'

import React from 'react'
import Link from 'next/link'
import {
  Gauge,
  Activity,
  Package,
  Image as ImageIcon,
  Network,
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
  { id: 'section1', label: '1. 측정이 먼저: Core Web Vitals' },
  { id: 'section2', label: '2. 불필요한 리렌더 줄이기' },
  { id: 'section3', label: '3. 번들 크기와 코드 스플리팅' },
  { id: 'section4', label: '4. 이미지와 폰트' },
  { id: 'section5', label: '5. 네트워크와 캐싱' },
]

export default function FrontendPerformancePage() {
  return (
    <ContentDoc
      badge="Frontend · 심화"
      badgeIcon={<Gauge size={12} />}
      title="프론트엔드 성능 최적화"
      quote={
        <>
          성능 최적화는 감이 아니라 측정에서 시작한다. 무엇이 느린지 숫자로 확인하고, 가장 큰
          병목부터 손대야 한다. 리렌더·번들·이미지·네트워크 — 흔한 병목 네 가지를 측정 가능한
          지표 위에서 다룬다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="측정이 먼저: Core Web Vitals" />
        <Paragraph>
          최적화의 첫걸음은 &lsquo;무엇을 좋게 만들 것인가&rsquo;를 숫자로 정하는 일이다. 구글의
          Core Web Vitals는 사용자 체감 성능을 세 지표로 요약한다. 추측 대신 이 값을 먼저 잰다.
        </Paragraph>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>지표</Th>
                <Th>측정하는 것</Th>
                <Th>주요 원인</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>LCP</Td>
                <Td>가장 큰 콘텐츠가 그려지는 시점</Td>
                <Td>느린 서버 응답, 큰 이미지, 렌더 차단 리소스</Td>
              </tr>
              <tr>
                <Td $muted>CLS</Td>
                <Td>예기치 않은 레이아웃 이동량</Td>
                <Td>크기 미지정 이미지, 늦게 삽입되는 배너·폰트</Td>
              </tr>
              <tr>
                <Td $muted>INP</Td>
                <Td>상호작용에 대한 응답 지연</Td>
                <Td>메인 스레드를 막는 긴 자바스크립트</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Activity size={18} color="var(--color-primary)" /> 도구로 재고, 원리로 이해한다
          </CardTitle>
          <CardText>
            Lighthouse·DevTools Performance·실사용자 데이터(RUM)로 측정한다. 이 지표들이 왜
            나빠지는지는 결국{' '}
            <Link
              href="/frontend/browser-rendering"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              브라우저 렌더링 원리
            </Link>{' '}
            — 렌더 차단, 리플로우, 메인 스레드 점유 — 로 설명된다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="불필요한 리렌더 줄이기" />
        <SectionIntro>
          React에서 INP·버벅임의 흔한 원인은 &lsquo;바뀌지 않아도 될 컴포넌트가 다시 그려지는&rsquo;
          것이다. 리렌더 자체가 죄는 아니지만, 비싼 트리가 자주 리렌더되면 문제가 된다. 먼저
          원인을 찾고, 그다음 메모이제이션을 쓴다.
        </SectionIntro>

        <CodeBlock label="리렌더를 부르는 패턴과 처방">{`// 문제: 부모가 리렌더될 때마다 새 객체/함수가 생겨 자식도 리렌더
function Parent() {
  const [count, setCount] = useState(0)
  const style = { color: 'red' }              // 매번 새 참조
  return <Child style={style} onClick={() => {}} />  // 매번 새 함수
}

// 처방: 참조를 안정화하고, 자식을 memo로 감싼다
const style = { color: 'red' }                 // 컴포넌트 밖으로
const Child = React.memo(function Child(props) { /* ... */ })
const onClick = useCallback(() => { /* ... */ }, [])`}</CodeBlock>

        <Stack>
          <Card>
            <CardTitle>
              <CheckCircle size={20} color="var(--color-success)" /> 원인부터 찾기
            </CardTitle>
            <CardText>
              React DevTools Profiler로 &lsquo;무엇이 왜 리렌더됐는지&rsquo; 먼저 본다. 상태를
              쓰는 곳 가까이로 내리거나(상태 내리기), 자주 바뀌는 부분만 분리하면 메모이제이션
              없이도 해결되는 경우가 많다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-warning)" /> 과한 메모이제이션
            </CardTitle>
            <CardText>
              <code>useMemo</code>·<code>useCallback</code>도 비교 비용이 든다. 모든 것을 감싸면
              오히려 복잡해지고 느려질 수 있다. 측정으로 &lsquo;비싼 곳&rsquo;에만 선별 적용한다.
            </CardText>
          </Card>
        </Stack>

        <Paragraph>
          상태의 출처를 구분하고 렌더링을 최적화하는 더 구체적인 패턴은{' '}
          <Link
            href="/frontend/react"
            style={{ color: 'var(--color-primary)', fontWeight: 600 }}
          >
            React 핵심 패턴
          </Link>{' '}
          글에서 이어서 본다.
        </Paragraph>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="번들 크기와 코드 스플리팅" />
        <Paragraph>
          내려보내는 자바스크립트가 많을수록 다운로드·파싱·실행이 모두 느려진다. 첫 화면에 필요
          없는 코드는 나눠서(코드 스플리팅) 나중에 불러오는 것이 핵심이다.
        </Paragraph>

        <CodeBlock label="동적 import로 필요할 때 로드">{`// 무거운 차트 라이브러리를 첫 로드에 포함하지 않는다
const Chart = lazy(() => import('./HeavyChart'))

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <Chart />          {/* 이 컴포넌트가 필요할 때 비로소 청크를 받는다 */}
    </Suspense>
  )
}`}</CodeBlock>

        <BulletList>
          <Bullet>
            <strong>경로 기반 분할</strong>: 라우트 단위로 청크를 나누면 방문한 페이지의 코드만
            받는다. 메타프레임워크는 이를 기본 제공한다.
          </Bullet>
          <Bullet>
            <strong>트리 셰이킹</strong>: 쓰지 않는 export는 번들에서 빠진다. 라이브러리를 통째로
            import하지 말고 필요한 것만 가져온다.
          </Bullet>
          <Bullet>
            <strong>번들 분석</strong>: 번들 애널라이저로 &lsquo;무엇이 큰지&rsquo; 눈으로 확인하고,
            무거운 의존성은 더 가벼운 대안으로 교체한다.
          </Bullet>
        </BulletList>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <Package size={18} color="var(--color-primary)" /> 덜 보내는 게 가장 빠르다
          </CardTitle>
          <CardText>
            최적화 중 가장 효과가 큰 건 &lsquo;아예 보내지 않는 것&rsquo;이다. 정적인 부분은
            자바스크립트 없이 보내는 접근이{' '}
            <Link
              href="/frontend/meta-frameworks"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              메타프레임워크
            </Link>{' '}
            의 아일랜드 아키텍처다.
          </CardText>
        </Card>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="이미지와 폰트" />
        <SectionIntro>
          이미지는 보통 페이지에서 가장 무거운 자원이고, 폰트는 가장 흔한 레이아웃 이동(CLS)
          원인이다. 둘 다 작은 습관으로 큰 개선을 얻는다.
        </SectionIntro>

        <GridTwo>
          <Card>
            <CardTitle>
              <ImageIcon size={20} color="var(--color-success)" /> 이미지
            </CardTitle>
            <CardText>
              현대 포맷(WebP·AVIF)과 반응형 크기(<code>srcset</code>)를 쓰고, 화면 밖 이미지는
              지연 로딩(<code>loading=&quot;lazy&quot;</code>)한다. <code>width/height</code>를
              지정해 자리를 미리 잡아 CLS를 막는다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-warning)" /> 폰트
            </CardTitle>
            <CardText>
              웹폰트 로딩 중 글자가 사라지거나 튀지 않게 <code>font-display: swap</code>을 쓰고,
              핵심 폰트는 <code>preload</code>한다. 시스템 폰트를 대체 폰트로 잘 맞추면 전환이
              자연스럽다.
            </CardText>
          </Card>
        </GridTwo>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <SmallHeading style={{ fontSize: '0.95rem' }}>
              <Dot /> CLS는 &lsquo;자리 잡기&rsquo;다
            </SmallHeading>
          </CardTitle>
          <SmallText>
            레이아웃 이동은 대부분 &lsquo;크기를 모른 채 늦게 들어오는 요소&rsquo; 때문이다.
            이미지·광고·임베드의 공간을 미리 예약하면 콘텐츠가 밀리지 않는다.
          </SmallText>
        </Card>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="네트워크와 캐싱" />
        <Paragraph>
          코드를 줄였다면, 이제 &lsquo;얼마나 빨리·얼마나 적게 받느냐&rsquo;다. 캐싱과 사전 로딩을
          활용하면 같은 자원을 반복해서 받지 않고, 필요한 것을 미리 준비할 수 있다.
        </Paragraph>

        <Stack>
          <Card>
            <CardTitle>
              <Network size={20} color="var(--color-primary)" /> 캐싱과 CDN
            </CardTitle>
            <CardText>
              정적 자산에 긴 캐시 수명과 콘텐츠 해시 파일명을 주면, 바뀌지 않는 한 다시 받지
              않는다. CDN으로 사용자 가까이에서 내려주면 지연도 준다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <CheckCircle size={20} color="var(--color-success)" /> 미리 준비하기
            </CardTitle>
            <CardText>
              곧 필요할 자원은 <code>preload</code>, 곧 방문할 페이지는 <code>prefetch</code>로
              미리 받아 둔다. 메타프레임워크는 링크가 보이면 다음 페이지를 자동 prefetch하기도
              한다.
            </CardText>
          </Card>
        </Stack>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <Gauge size={18} color="var(--color-primary)" /> 순서대로 정리하면
          </CardTitle>
          <CardText>
            측정으로 병목을 찾고 → 불필요한 리렌더와 자바스크립트를 줄이고 → 이미지·폰트로
            자리를 잡고 → 캐싱으로 반복 비용을 없앤다. 큰 병목부터 하나씩, 매번 다시 재면서
            진행한다.
          </CardText>
        </Card>
      </Section>

      <HeaderQuote>
        성능은 기능이 아니라 습관이다.
        <br />
        <strong>추측하지 말고 측정하고, 가장 큰 병목부터, 덜 보내는 쪽으로.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
