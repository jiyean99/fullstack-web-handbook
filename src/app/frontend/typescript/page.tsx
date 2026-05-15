'use client'

import React from 'react'
import {
  Wrench,
  ShieldCheck,
  Boxes,
  CheckCircle,
  AlertTriangle,
  Sparkles,
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
  { id: 'section1', label: '1. 자주 쓰는 유틸리티 타입' },
  { id: 'section2', label: '2. Discriminated Union' },
  { id: 'section3', label: '3. 도메인 타입 모델링' },
  { id: 'section4', label: '4. infer와 조건부 타입' },
  { id: 'section5', label: '5. Zod로 런타임 검증' },
]

export default function TypeScriptPage() {
  return (
    <ContentDoc
      badge="TypeScript"
      title="TypeScript 실무 타입"
      quote={
        <>
          타입은 컴파일 시점의 안전망이자 살아있는 문서다. 잘 설계된 타입은 잘못된 상태를
          &lsquo;표현 불가능&rsquo;하게 만든다. 유틸리티 타입부터 도메인 모델링, 그리고
          타입이 닿지 못하는 런타임 경계까지 실무 관점으로 정리한다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="자주 쓰는 유틸리티 타입" />
        <Paragraph>
          타입스크립트는 기존 타입을 변형해 새 타입을 만드는 내장 유틸리티를 제공한다. 직접
          타입을 다시 쓰지 않고 단일 원천(source of truth)에서 파생시키는 것이 핵심이다.
        </Paragraph>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>유틸리티</Th>
                <Th>역할</Th>
                <Th>예시</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>Partial&lt;T&gt;</Td>
                <Td>모든 속성을 선택적으로</Td>
                <Td>수정 폼의 부분 업데이트 DTO</Td>
              </tr>
              <tr>
                <Td $muted>Pick&lt;T, K&gt;</Td>
                <Td>일부 속성만 추출</Td>
                <Td>목록 화면용 요약 타입</Td>
              </tr>
              <tr>
                <Td $muted>Omit&lt;T, K&gt;</Td>
                <Td>특정 속성 제외</Td>
                <Td>id를 뺀 생성 요청 타입</Td>
              </tr>
              <tr>
                <Td $muted>Record&lt;K, V&gt;</Td>
                <Td>키-값 맵 타입</Td>
                <Td>상태별 라벨 매핑</Td>
              </tr>
              <tr>
                <Td $muted>ReturnType&lt;F&gt;</Td>
                <Td>함수 반환 타입 추출</Td>
                <Td>셀렉터 반환값 타입 재사용</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <CodeBlock label="types/user.ts">{`interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

// 생성 요청: 서버가 만드는 필드는 제외
type CreateUserDto = Omit<User, 'id' | 'createdAt'>

// 수정 요청: 일부만 보낼 수 있음
type UpdateUserDto = Partial<CreateUserDto>

// 목록 요약: 필요한 필드만
type UserSummary = Pick<User, 'id' | 'name'>`}</CodeBlock>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Wrench size={18} color="var(--color-primary)" /> 단일 원천 원칙
          </CardTitle>
          <CardText>
            엔티티 타입 하나를 정의하고 DTO들을 거기서 파생시키면, 원본 필드가 바뀔 때
            파생 타입도 자동으로 따라온다. 같은 모양의 타입을 손으로 두 번 적지 않는다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="Discriminated Union으로 상태 모델링" />
        <SectionIntro>
          비동기 상태를 <code>{`{ loading, data, error }`}</code>처럼 여러 boolean으로
          표현하면 &lsquo;로딩 중인데 데이터도 있는&rsquo; 불가능한 조합이 타입상 허용된다.
          판별 유니온(discriminated union)은 이런 잘못된 상태를 원천 차단한다.
        </SectionIntro>

        <CodeBlock label="types/async.ts">{`type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

function render(state: AsyncState<User>) {
  switch (state.status) {
    case 'success':
      return state.data.name   // ✅ data 접근 가능
    case 'error':
      return state.message     // ✅ message 접근 가능
    // 'loading' 분기에서 data를 쓰면 컴파일 에러
  }
}`}</CodeBlock>

        <GridTwo>
          <Card>
            <SmallHeading>
              <Dot />
              공통 판별 필드
            </SmallHeading>
            <SmallText>
              각 멤버가 리터럴 타입(<code>status</code>)을 공유하면, switch/if로 좁히는 순간
              해당 분기의 나머지 필드가 안전하게 열린다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              never로 누락 방지
            </SmallHeading>
            <SmallText>
              default 분기에서 <code>const _: never = state</code>를 두면, 새 상태를
              추가하고 처리를 빠뜨렸을 때 컴파일 단계에서 잡힌다.
            </SmallText>
          </Card>
        </GridTwo>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="도메인 규칙을 타입에 녹이기" />
        <Paragraph>
          타입은 단순히 자료 구조를 적는 도구가 아니라, 도메인 규칙을 표현하는 수단이다.
          원시 타입(string, number)을 그대로 쓰기보다 의미를 가진 타입으로 감싸면 실수가
          줄어든다.
        </Paragraph>

        <Stack>
          <Card>
            <CardTitle>
              <Boxes size={20} color="var(--color-primary)" /> Branded Type (명목적 타입)
            </CardTitle>
            <CardText>
              <code>UserId</code>와 <code>OrderId</code>가 둘 다 string이면 서로 바꿔 넣어도
              컴파일러가 못 잡는다. 브랜딩으로 구분하면 잘못된 id 전달을 막는다.
            </CardText>
          </Card>
        </Stack>

        <CodeBlock label="types/brand.ts">{`type Brand<T, B> = T & { readonly __brand: B }

type UserId = Brand<string, 'UserId'>
type OrderId = Brand<string, 'OrderId'>

function getUser(id: UserId) { /* ... */ }

const orderId = '...' as OrderId
getUser(orderId) // ❌ 컴파일 에러: OrderId는 UserId가 아니다`}</CodeBlock>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 잘못된 상태를 표현 불가능하게
          </CardTitle>
          <CardText>
            &ldquo;Make illegal states unrepresentable&rdquo; — 옵셔널 필드를 남발하기보다
            유니온으로 가능한 형태만 열어두면, 런타임 방어 코드가 줄고 타입만 봐도 도메인
            규칙이 읽힌다.
          </CardText>
        </Card>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="infer와 조건부 타입" />
        <SectionIntro>
          조건부 타입(<code>T extends U ? X : Y</code>)과 <code>infer</code>를 조합하면 다른
          타입의 내부 구조를 꺼내올 수 있다. 라이브러리 타입을 다룰 때 특히 유용하다.
        </SectionIntro>

        <CodeBlock label="types/infer.ts">{`// 배열 요소 타입 추출
type ElementOf<T> = T extends (infer E)[] ? E : never
type Item = ElementOf<string[]> // string

// Promise 해제 타입 추출
type Awaited2<T> = T extends Promise<infer R> ? R : T
type Result = Awaited2<Promise<User>> // User`}</CodeBlock>

        <BulletList>
          <Bullet>
            <strong>실무 활용</strong>: API 함수의 반환 타입에서 데이터 모양을 추출해 컴포넌트
            props 타입으로 재사용한다.
          </Bullet>
          <Bullet>
            <strong>주의</strong>: 조건부 타입이 깊어지면 가독성이 급격히 나빠진다. 한두 단계를
            넘어가면 명시적 타입으로 푸는 편이 낫다.
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="Zod로 런타임 경계 검증" />
        <Paragraph>
          타입스크립트의 타입은 컴파일 후 사라진다. 따라서 API 응답·폼 입력·로컬스토리지처럼
          &lsquo;외부에서 들어오는 값&rsquo;은 타입만으로 신뢰할 수 없다. Zod는 스키마로
          런타임 검증을 하고, 그 스키마에서 타입을 자동 추론한다.
        </Paragraph>

        <CodeBlock label="schemas/user.ts">{`import { z } from 'zod'

const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
})

// 스키마에서 타입을 추론 — 타입을 따로 안 적어도 된다
type User = z.infer<typeof UserSchema>

async function fetchUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`)
  // 런타임에서 실제 형태를 검증 → 깨진 응답은 여기서 throw
  return UserSchema.parse(await res.json())
}`}</CodeBlock>

        <GridTwo>
          <Card>
            <CardTitle>
              <ShieldCheck size={20} color="var(--color-primary)" /> parse vs safeParse
            </CardTitle>
            <CardText>
              <code>parse</code>는 실패 시 예외를 던지고, <code>safeParse</code>는{' '}
              <code>{`{ success, data | error }`}</code>를 반환한다. 폼 검증처럼 에러를 화면에
              보여줘야 할 때는 safeParse가 다루기 편하다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Sparkles size={20} color="var(--color-success)" /> 타입의 단일 원천
            </CardTitle>
            <CardText>
              스키마 하나에서 <code>z.infer</code>로 타입을 뽑으면, 검증 규칙과 타입이 항상
              일치한다. 타입과 런타임 검증이 따로 노는 문제를 없앤다.
            </CardText>
          </Card>
        </GridTwo>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-warning) 8%, var(--color-bg))',
            borderColor: 'var(--color-warning)',
          }}
        >
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-warning)" /> 검증은 경계에서만
          </CardTitle>
          <CardText>
            모든 함수마다 검증을 끼우면 비용과 코드가 늘어난다. 검증은 외부 데이터가 들어오는
            &lsquo;경계&rsquo;(API 응답, 폼 제출, URL 파라미터)에서 한 번만 하고, 그 안쪽은
            타입을 신뢰한다.
          </CardText>
        </Card>
      </Section>

      <HeaderQuote>
        타입은 컴파일 시점의 안전망, Zod는 런타임의 안전망이다.
        <br />
        <strong>잘못된 상태를 표현 불가능하게 만들고, 외부 경계에서만 검증하라.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}