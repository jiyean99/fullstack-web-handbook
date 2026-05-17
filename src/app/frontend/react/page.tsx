'use client'

import React from 'react'
import {
  Boxes,
  Server,
  Layers,
  Component,
  CheckCircle,
  AlertTriangle,
  Repeat,
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
  { id: 'section1', label: '1. 클라이언트 상태 vs 서버 상태' },
  { id: 'section2', label: '2. Zustand로 전역 상태 관리' },
  { id: 'section3', label: '3. TanStack Query로 서버 상태 관리' },
  { id: 'section4', label: '4. 렌더링 최적화 전략' },
  { id: 'section5', label: '5. 컴포넌트 설계 원칙' },
]

export default function ReactPage() {
  return (
    <ContentDoc
      badge="React Patterns"
      title="React 핵심 패턴"
      quote={
        <>
          React 애플리케이션의 복잡도는 대부분 &lsquo;상태&rsquo;에서 온다. 상태를 어디에 두고
          어떻게 갱신하느냐가 구조를 결정한다. 상태의 종류를 구분하는 것에서 출발해, 렌더링
          최적화와 재사용 가능한 컴포넌트 설계까지 실무 관점으로 정리한다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="클라이언트 상태 vs 서버 상태" />
        <Paragraph>
          상태 관리의 첫 단추는 &lsquo;상태의 출처&rsquo;를 구분하는 것이다. 흔히 하나의 상태
          관리 도구로 모든 상태를 다루려다 복잡해지는데, 상태는 성격에 따라 크게 두 가지로
          나뉜다.
        </Paragraph>

        <GridTwo>
          <Card>
            <CardTitle>
              <Boxes size={20} color="var(--color-primary)" /> 클라이언트 상태
            </CardTitle>
            <CardText>
              모달 열림 여부, 탭 선택, 폼 입력값, 다크 모드 등 브라우저 안에서만 존재하고
              서버와 동기화할 필요가 없는 상태다. 동기적으로 즉시 갱신된다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Server size={20} color="var(--color-success)" /> 서버 상태
            </CardTitle>
            <CardText>
              API로 가져온 데이터처럼 원본이 서버에 있는 상태다. 비동기로 받아오고, 캐싱과
              재검증(refetch)이 필요하며, 여러 컴포넌트가 동일 데이터를 공유한다.
            </CardText>
          </Card>
        </GridTwo>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>구분</Th>
                <Th>클라이언트 상태</Th>
                <Th>서버 상태</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>원본 위치</Td>
                <Td>브라우저 메모리</Td>
                <Td>원격 서버 (DB)</Td>
              </tr>
              <tr>
                <Td $muted>갱신 방식</Td>
                <Td>동기적, 즉시</Td>
                <Td>비동기, 네트워크 경유</Td>
              </tr>
              <tr>
                <Td $muted>핵심 관심사</Td>
                <Td>UI 상태 일관성</Td>
                <Td>캐싱 · 동기화 · 무효화</Td>
              </tr>
              <tr>
                <Td $muted>추천 도구</Td>
                <Td>Zustand, useState</Td>
                <Td>TanStack Query, SWR</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 핵심 원칙
          </CardTitle>
          <CardText>
            서버 상태를 전역 스토어(Zustand/Redux)에 직접 복사해 두지 않는다. 서버 상태는
            전용 데이터 페칭 라이브러리가 캐싱과 동기화를 담당하게 하고, 전역 스토어는
            순수한 클라이언트 상태만 다루도록 역할을 분리하는 것이 유지보수의 핵심이다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="Zustand로 전역 상태 관리" />
        <SectionIntro>
          Zustand는 보일러플레이트가 거의 없는 경량 전역 상태 라이브러리다. Context의 불필요한
          리렌더링 문제를 셀렉터(selector) 기반 구독으로 해결한다.
        </SectionIntro>

        <CodeBlock label="stores/uiStore.ts">{`import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  theme: 'light',
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
}))`}</CodeBlock>

        <Paragraph>
          컴포넌트에서는 <code>필요한 값만</code> 셀렉터로 구독한다. 이렇게 하면 구독하지 않은
          다른 상태가 바뀌어도 해당 컴포넌트는 리렌더링되지 않는다.
        </Paragraph>

        <CodeBlock label="components/Sidebar.tsx">{`// ✅ 좋은 예: 필요한 값만 선택 → theme 변경 시 리렌더 안 됨
const sidebarOpen = useUIStore((s) => s.sidebarOpen)
const toggleSidebar = useUIStore((s) => s.toggleSidebar)

// ❌ 나쁜 예: 스토어 전체 구독 → 무관한 상태 변경에도 리렌더
const { sidebarOpen, toggleSidebar } = useUIStore()`}</CodeBlock>

        <GridTwo>
          <Card>
            <SmallHeading>
              <Dot />
              persist 미들웨어
            </SmallHeading>
            <SmallText>
              <code>persist</code>로 감싸면 상태가 localStorage에 자동 저장된다. 다크 모드,
              최근 본 항목처럼 새로고침에도 유지돼야 하는 상태에 적합하다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              action 분리
            </SmallHeading>
            <SmallText>
              상태를 바꾸는 로직(action)을 스토어 안에 함께 정의하면, 컴포넌트는 의도만
              호출하고 변경 방법은 스토어가 캡슐화한다.
            </SmallText>
          </Card>
        </GridTwo>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="TanStack Query로 서버 상태 관리" />
        <Paragraph>
          서버 상태는 <code>useEffect</code> + <code>useState</code> 조합으로 직접 다루면
          로딩/에러/캐시/중복 요청을 모두 수동으로 처리해야 한다. TanStack Query는 이 모든
          것을 선언적으로 해결한다.
        </Paragraph>

        <CodeBlock label="hooks/useUser.ts">{`import { useQuery } from '@tanstack/react-query'

function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(\`/api/users/\${userId}\`).then((r) => r.json()),
    staleTime: 60 * 1000, // 1분간 fresh 상태 유지
  })
}

// 컴포넌트에서
const { data, isLoading, isError } = useUser(userId)`}</CodeBlock>

        <Stack>
          <Card>
            <CardTitle>
              <Layers size={20} color="var(--color-primary)" /> queryKey가 캐시의 주소다
            </CardTitle>
            <CardText>
              <code>queryKey</code>가 같으면 동일 캐시를 공유한다. 여러 컴포넌트가 같은 키로
              요청해도 네트워크 호출은 한 번만 발생하며, 결과는 모두에게 공유된다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Repeat size={20} color="var(--color-success)" /> 무효화(invalidation)
            </CardTitle>
            <CardText>
              데이터를 변경(mutation)한 뒤{' '}
              <code>queryClient.invalidateQueries()</code>로 관련 쿼리를 무효화하면, 화면이
              항상 최신 서버 상태를 반영하도록 자동 재요청된다.
            </CardText>
          </Card>
        </Stack>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="렌더링 최적화 전략" />
        <SectionIntro>
          최적화는 항상 측정 이후에 한다. 무분별한 <code>memo</code> 남발은 오히려 메모리와
          비교 비용을 늘린다. 아래는 &lsquo;실제 병목이 확인됐을 때&rsquo; 쓰는 도구들이다.
        </SectionIntro>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>도구</Th>
                <Th>역할</Th>
                <Th>적합한 상황</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>React.memo</Td>
                <Td>props가 동일하면 리렌더 생략</Td>
                <Td>부모가 자주 리렌더되는 무거운 자식</Td>
              </tr>
              <tr>
                <Td $muted>useMemo</Td>
                <Td>비싼 계산 결과 캐싱</Td>
                <Td>큰 배열 정렬·필터 등 연산 비용이 큰 값</Td>
              </tr>
              <tr>
                <Td $muted>useCallback</Td>
                <Td>함수 참조 안정화</Td>
                <Td>memo된 자식에 콜백을 props로 전달할 때</Td>
              </tr>
              <tr>
                <Td $muted>Suspense / lazy</Td>
                <Td>코드 스플리팅과 비동기 경계</Td>
                <Td>초기 번들이 큰 페이지·라우트 분할</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-warning) 8%, var(--color-bg))',
            borderColor: 'var(--color-warning)',
          }}
        >
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-warning)" /> 흔한 함정
          </CardTitle>
          <BulletList>
            <Bullet>
              <strong>인라인 객체/함수 props</strong>: 부모가 렌더될 때마다 새 참조가 생겨
              <code>memo</code>가 무력화된다. 객체는 <code>useMemo</code>, 함수는{' '}
              <code>useCallback</code>으로 참조를 고정한다.
            </Bullet>
            <Bullet>
              <strong>거대한 Context</strong>: 자주 바뀌는 값과 거의 안 바뀌는 값을 한
              Context에 담으면, 작은 변경에도 모든 소비자가 리렌더된다. Context를 분리하거나
              셀렉터 기반 스토어를 쓴다.
            </Bullet>
            <Bullet>
              <strong>key로 index 사용</strong>: 리스트 순서가 바뀌면 잘못된 재사용으로 상태가
              어긋난다. 안정적인 고유 id를 key로 사용한다.
            </Bullet>
          </BulletList>
        </Card>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="컴포넌트 설계 원칙" />
        <Paragraph>
          재사용 가능한 컴포넌트의 핵심은 &lsquo;관심사 분리&rsquo;다. 데이터를 가져오고
          가공하는 로직과, 그것을 화면에 그리는 로직을 나누면 테스트와 재사용이 쉬워진다.
        </Paragraph>

        <GridTwo>
          <Card>
            <CardTitle>
              <Component size={20} color="var(--color-primary)" /> Container / Presentational
            </CardTitle>
            <CardText>
              데이터 페칭·상태 보유는 컨테이너가, 받은 props를 그리는 일은 프레젠테이셔널
              컴포넌트가 맡는다. 프레젠테이셔널 컴포넌트는 순수해서 Storybook과 단위 테스트에
              유리하다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Boxes size={20} color="var(--color-success)" /> 커스텀 훅으로 로직 추출
            </CardTitle>
            <CardText>
              여러 컴포넌트가 같은 로직(데이터 페칭, 폼 검증 등)을 공유하면 커스텀 훅으로
              뽑아낸다. UI와 로직이 분리돼 컴포넌트가 얇아진다.
            </CardText>
          </Card>
        </GridTwo>

        <SmallHeading style={{ marginBottom: 'var(--sp-3)', fontSize: '0.95rem' }}>
          훅 추출 기준
        </SmallHeading>
        <BulletList>
          <Bullet>같은 상태/이펙트 로직이 2곳 이상에서 반복될 때</Bullet>
          <Bullet>
            컴포넌트의 <code>useEffect</code>·<code>useState</code>가 많아져 JSX보다 로직이
            더 길어질 때
          </Bullet>
          <Bullet>로직 자체에 의미 있는 이름을 붙일 수 있을 때 (예: useDebounce)</Bullet>
        </BulletList>
      </Section>

      <HeaderQuote>
        결국 좋은 React 코드는 &lsquo;상태를 올바른 곳에 두는 것&rsquo;에서 시작한다.
        <br />
        <strong>상태의 출처를 구분하고, 측정한 뒤 최적화하고, 관심사를 분리하라.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
