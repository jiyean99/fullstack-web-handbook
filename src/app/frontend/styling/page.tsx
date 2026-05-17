'use client'

import React from 'react'
import {
  Layers,
  Moon,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Boxes,
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
  { id: 'section1', label: '1. CSS-in-JS와 styled-components' },
  { id: 'section2', label: '2. 디자인 토큰 시스템' },
  { id: 'section3', label: '3. 테마와 다크 모드' },
  { id: 'section4', label: '4. CSS 아키텍처 전략' },
  { id: 'section5', label: '5. 동적 스타일링 패턴' },
]

export default function StylingPage() {
  return (
    <ContentDoc
      badge="Styling"
      title="Styling 전략"
      quote={
        <>
          스타일링의 목표는 &lsquo;예쁜 화면&rsquo;이 아니라 &lsquo;일관되고 바꾸기 쉬운
          화면&rsquo;이다. 디자인 토큰을 단일 원천으로 두고, 컴포넌트가 그 토큰을 참조하게
          하면 테마 전환도 유지보수도 쉬워진다. 이 핸드북 자체가 그 방식으로 만들어졌다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="CSS-in-JS와 styled-components" />
        <Paragraph>
          styled-components는 자바스크립트 안에서 컴포넌트 단위로 스타일을 정의하는 CSS-in-JS
          라이브러리다. 스타일이 컴포넌트에 묶여 있어 스코프 충돌이 없고, props에 따라 동적으로
          스타일을 바꾸기 쉽다.
        </Paragraph>

        <CodeBlock label="components/Button.tsx">{`import styled from 'styled-components'

const Button = styled.button\`
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
  transition: transform 0.1s ease;

  &:hover {
    transform: translateY(-1px);
  }
\``}</CodeBlock>

        <GridTwo>
          <Card>
            <CardTitle>
              <CheckCircle size={20} color="var(--color-success)" /> 장점
            </CardTitle>
            <CardText>
              자동 스코핑으로 클래스명 충돌이 없고, props 기반 동적 스타일이 자연스럽다.
              컴포넌트와 스타일이 한곳에 있어 응집도가 높다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-warning)" /> 주의점
            </CardTitle>
            <CardText>
              런타임에 스타일을 생성하므로 비용이 있다. Next.js에서는 SSR 등록(registry)
              설정이 필요하며, 자주 바뀌지 않는 토큰은 CSS 변수로 빼는 편이 낫다.
            </CardText>
          </Card>
        </GridTwo>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="디자인 토큰 시스템" />
        <SectionIntro>
          디자인 토큰은 색상·간격·반경·그림자 같은 디자인 결정을 이름이 붙은 변수로 정의한
          것이다. 컴포넌트가 직접 <code>#2563eb</code> 같은 값을 쓰지 않고 토큰을 참조하면,
          한 곳만 바꿔 전체 톤을 일괄 변경할 수 있다.
        </SectionIntro>

        <CodeBlock label="styles/globals.css">{`:root {
  /* Brand */
  --color-primary: #2563eb;
  --color-primary-light: #dbeafe;

  /* Surface */
  --color-bg: #ffffff;
  --color-text: #111827;
  --color-border: #e5e7eb;

  /* Spacing & Radius */
  --sp-4: 1rem;
  --radius-lg: 0.5rem;
}`}</CodeBlock>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>토큰 그룹</Th>
                <Th>예시</Th>
                <Th>역할</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>Color</Td>
                <Td>--color-primary</Td>
                <Td>브랜드·의미(성공/경고) 색상</Td>
              </tr>
              <tr>
                <Td $muted>Spacing</Td>
                <Td>--sp-4</Td>
                <Td>일관된 여백 스케일</Td>
              </tr>
              <tr>
                <Td $muted>Radius</Td>
                <Td>--radius-lg</Td>
                <Td>모서리 둥글기 통일</Td>
              </tr>
              <tr>
                <Td $muted>Shadow</Td>
                <Td>--shadow-sm</Td>
                <Td>깊이감 단계 정의</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Boxes size={18} color="var(--color-primary)" /> CSS 변수 + styled-components 조합
          </CardTitle>
          <CardText>
            토큰은 CSS 변수(<code>:root</code>)로 두고, styled-components에서{' '}
            <code>var(--color-primary)</code>로 참조한다. 토큰은 런타임 비용 없이 정적이고,
            컴포넌트 로직은 styled가 담당하는 역할 분리다.
          </CardText>
        </Card>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="테마와 다크 모드" />
        <Paragraph>
          다크 모드는 색상 값을 직접 바꾸는 게 아니라, &lsquo;토큰의 값&rsquo;만 교체하는
          방식으로 구현한다. 같은 <code>--color-bg</code> 토큰이 라이트/다크에서 다른 값을
          가리키게 하면, 컴포넌트 코드는 한 줄도 바뀌지 않는다.
        </Paragraph>

        <CodeBlock label="styles/globals.css">{`:root {
  --color-bg: #ffffff;
  --color-text: #111827;
}

html.dark {
  --color-bg: #0d1117;
  --color-text: #e6edf3;
}

/* 컴포넌트는 토큰만 참조 → 자동으로 양쪽 대응 */
.card { background: var(--color-bg); color: var(--color-text); }`}</CodeBlock>

        <Stack>
          <Card>
            <CardTitle>
              <Moon size={20} color="var(--color-primary)" /> 클래스 토글 방식
            </CardTitle>
            <CardText>
              <code>html</code>에 <code>.dark</code> 클래스를 붙였다 떼는 것만으로 전체 테마가
              전환된다. next-themes 같은 라이브러리가 시스템 설정 감지와 깜빡임 방지를
              처리한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Sparkles size={20} color="var(--color-success)" /> 의미 기반 토큰
            </CardTitle>
            <CardText>
              <code>--color-bg</code>, <code>--color-text-muted</code>처럼 &lsquo;역할&rsquo;로
              이름 붙인 토큰을 쓰면, 다크 모드에서 색을 일일이 다시 매핑할 필요가 없다.
            </CardText>
          </Card>
        </Stack>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="CSS 아키텍처 전략" />
        <SectionIntro>
          프로젝트가 커지면 &lsquo;스타일을 어디에 두느냐&rsquo;가 중요해진다. 전역 · 레이아웃
          · 컴포넌트 스타일의 책임을 나누면 충돌과 중복이 줄어든다.
        </SectionIntro>

        <BulletList>
          <Bullet>
            <strong>전역(global)</strong>: 토큰, 리셋, 타이포그래피 기본값 등 앱 전체 규칙만
            둔다. 특정 컴포넌트 스타일은 넣지 않는다.
          </Bullet>
          <Bullet>
            <strong>컴포넌트 지역(local)</strong>: 해당 컴포넌트에만 적용되는 스타일은
            styled-components로 컴포넌트 옆에 둔다.
          </Bullet>
          <Bullet>
            <strong>공용 프리미티브</strong>: 여러 화면이 공유하는 카드·버튼·그리드는 재사용
            가능한 컴포넌트로 추출한다. (이 핸드북의 <code>ContentDoc</code>처럼)
          </Bullet>
        </BulletList>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <Layers size={18} color="var(--color-primary)" /> 중복을 발견하면 추출한다
          </CardTitle>
          <CardText>
            같은 스타일 묶음이 2~3곳에서 반복되면 공용 컴포넌트나 styled 믹스인으로 뽑아낸다.
            디자인 일관성은 &lsquo;같은 소스를 공유&rsquo;할 때 자동으로 보장된다.
          </CardText>
        </Card>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="동적 스타일링 패턴" />
        <Paragraph>
          styled-components에서 props로 스타일을 바꿀 때는 <code>$</code> 접두사를 붙인
          transient props를 쓴다. 이렇게 하면 해당 prop이 실제 DOM 요소로 전달되지 않아
          경고가 사라진다.
        </Paragraph>

        <CodeBlock label="components/Tag.tsx">{`const Tag = styled.span<{ $accent: string }>\`
  color: \${({ $accent }) => $accent};
  border: 1px solid \${({ $accent }) => $accent};
\`

// $accent는 DOM으로 새지 않는다 (transient prop)
<Tag $accent="var(--color-primary)">React</Tag>`}</CodeBlock>

        <GridTwo>
          <Card>
            <SmallHeading>
              <Dot />
              조건부 스타일
            </SmallHeading>
            <SmallText>
              활성/비활성, 변형(variant) 같은 상태는 props로 받아 분기한다. 다만 분기가 많아지면
              variant별 컴포넌트로 나누는 게 더 읽기 쉽다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              color-mix 활용
            </SmallHeading>
            <SmallText>
              <code>color-mix()</code>로 토큰을 섞으면 호버·배경용 옅은 색을 별도 토큰 없이
              파생할 수 있다. 색 변수를 최소한으로 유지하는 비결이다.
            </SmallText>
          </Card>
        </GridTwo>
      </Section>

      <HeaderQuote>
        스타일링의 본질은 &lsquo;단일 원천&rsquo;이다.
        <br />
        <strong>디자인 토큰을 한 곳에 모으고, 컴포넌트가 그것을 참조하게 하라.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
