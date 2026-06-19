'use client'

import React from 'react'
import Link from 'next/link'
import {
  Accessibility,
  Code2,
  Keyboard,
  Tags,
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
  { id: 'section1', label: '1. 왜 접근성인가' },
  { id: 'section2', label: '2. 시맨틱 HTML' },
  { id: 'section3', label: '3. 키보드 접근성과 포커스' },
  { id: 'section4', label: '4. ARIA — 필요할 때만' },
  { id: 'section5', label: '5. 접근 가능한 폼' },
]

export default function AccessibilityPage() {
  return (
    <ContentDoc
      badge="Frontend · 실무"
      badgeIcon={<Accessibility size={12} />}
      title="웹 접근성과 시맨틱 마크업"
      quote={
        <>
          접근성은 특별한 사용자를 위한 부가 기능이 아니라, 모두가 쓸 수 있게 만드는 기본기다.
          그리고 그 출발점은 화려한 ARIA가 아니라 &lsquo;올바른 HTML&rsquo;이다. 의미에 맞는
          태그를 쓰는 것만으로 대부분의 접근성이 공짜로 따라온다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="왜 접근성인가" />
        <Paragraph>
          웹 접근성(a11y)은 시각·청각·운동·인지 등 다양한 조건의 사용자가 콘텐츠를 동등하게
          이용할 수 있게 하는 것이다. 스크린 리더 사용자뿐 아니라 키보드만 쓰는 사람, 일시적
          부상, 밝은 햇빛 아래의 누구나 그 혜택을 본다.
        </Paragraph>

        <GridTwo>
          <Card>
            <CardTitle>
              <CheckCircle size={20} color="var(--color-success)" /> 모두를 위한 것
            </CardTitle>
            <CardText>
              자막은 청각장애인뿐 아니라 시끄러운 지하철의 사용자에게도 유용하다. 접근성을
              높이면 &lsquo;특정 소수&rsquo;가 아니라 전체 사용성이 함께 올라간다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Code2 size={20} color="var(--color-primary)" /> SEO·견고함 보너스
            </CardTitle>
            <CardText>
              의미 있는 마크업은 검색 엔진도 더 잘 이해한다. 시맨틱 구조는 접근성과 SEO,
              유지보수를 동시에 좋게 만드는 같은 뿌리다.
            </CardText>
          </Card>
        </GridTwo>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-warning)" /> 색에만 의존하지 않기
          </CardTitle>
          <CardText>
            &lsquo;빨간 글씨=오류&rsquo;처럼 색만으로 정보를 전달하면 색각 이상 사용자는 알 수
            없다. 아이콘·텍스트를 함께 쓰고, 명도 대비(WCAG 기준 본문 4.5:1)를 확보한다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="시맨틱 HTML" />
        <SectionIntro>
          접근성의 90%는 &lsquo;의미에 맞는 태그&rsquo;에서 나온다. <code>&lt;div&gt;</code>로
          모든 걸 만들면 보조기기는 그게 버튼인지 제목인지 알 수 없다. 시맨틱 요소는 의미와
          기본 동작(키보드·포커스)을 공짜로 제공한다.
        </SectionIntro>

        <CodeBlock label="div 더미 vs 시맨틱 마크업">{`<!-- 나쁨: 의미도 키보드 동작도 없다 -->
<div class="btn" onclick="save()">저장</div>

<!-- 좋음: 버튼의 의미·포커스·엔터/스페이스 동작이 기본 제공 -->
<button type="button" onClick={save}>저장</button>

<!-- 페이지 구조도 의미 있는 랜드마크로 -->
<header> <nav> ... </nav> </header>
<main>
  <h1>제목</h1>      <!-- 페이지당 h1 하나, 단계 건너뛰지 않기 -->
  <section> <h2>...</h2> </section>
</main>
<footer> ... </footer>`}</CodeBlock>

        <BulletList>
          <Bullet>
            <strong>랜드마크</strong>: <code>header·nav·main·footer</code>로 영역을 나누면 스크린
            리더 사용자가 구역을 건너뛰며 탐색할 수 있다.
          </Bullet>
          <Bullet>
            <strong>제목 구조</strong>: <code>h1→h2→h3</code> 순서를 지키면 문서의 목차가 된다.
            크기 때문에 단계를 건너뛰지 말고, 스타일은 CSS로 조정한다.
          </Bullet>
          <Bullet>
            <strong>대체 텍스트</strong>: 의미 있는 이미지엔 <code>alt</code>를, 장식 이미지엔
            빈 <code>alt=&quot;&quot;</code>를 줘 스크린 리더가 적절히 처리하게 한다.
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="키보드 접근성과 포커스" />
        <Paragraph>
          마우스 없이 <kbd>Tab</kbd>·<kbd>Enter</kbd>·<kbd>화살표</kbd>만으로 모든 기능을 쓸 수
          있어야 한다. 키보드 접근성은 스크린 리더·스위치 등 여러 보조기술의 토대이기도 하다.
        </Paragraph>

        <Stack>
          <Card>
            <CardTitle>
              <Keyboard size={20} color="var(--color-primary)" /> 포커스는 보이게, 순서대로
            </CardTitle>
            <CardText>
              포커스 링을 <code>outline: none</code>으로 지우지 않는다(필요하면 더 보기 좋게
              대체한다). 탭 순서는 DOM 순서를 따르므로, 시각적 순서와 DOM 순서를 일치시킨다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-warning)" /> 모달의 포커스 관리
            </CardTitle>
            <CardText>
              모달을 열면 포커스를 안으로 옮기고, 탭이 밖으로 새지 않게 가두며(focus trap),
              닫을 때 원래 위치로 되돌린다. <kbd>Esc</kbd>로 닫히게 하는 것도 잊지 않는다.
            </CardText>
          </Card>
        </Stack>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 스킵 링크
          </CardTitle>
          <CardText>
            페이지 맨 앞에 &lsquo;본문 바로가기&rsquo; 링크를 두면, 키보드 사용자가 매번 긴
            내비게이션을 탭으로 통과하지 않고 본문으로 건너뛸 수 있다. 평소엔 숨겼다가 포커스되면
            보이게 한다.
          </CardText>
        </Card>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="ARIA — 필요할 때만" />
        <SectionIntro>
          ARIA는 시맨틱 HTML로 표현할 수 없는 의미를 보조기기에 전달하는 속성이다. 강력하지만
          오용하기 쉽다. &lsquo;ARIA의 제1규칙은 ARIA를 쓰지 않는 것&rsquo; — 네이티브 요소로
          되는 일은 그걸 쓴다.
        </SectionIntro>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>상황</Th>
                <Th>권장</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>버튼·체크박스·링크</Td>
                <Td>네이티브 요소 사용 (ARIA 불필요)</Td>
              </tr>
              <tr>
                <Td $muted>아이콘만 있는 버튼</Td>
                <Td><code>aria-label</code>로 이름 제공</Td>
              </tr>
              <tr>
                <Td $muted>열림/접힘 상태</Td>
                <Td><code>aria-expanded</code> 토글</Td>
              </tr>
              <tr>
                <Td $muted>동적 알림(토스트 등)</Td>
                <Td><code>aria-live</code> 영역으로 읽어주기</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Tags size={18} color="var(--color-warning)" /> 잘못된 ARIA는 없느니만 못하다
          </CardTitle>
          <CardText>
            <code>role</code>만 바꾸고 키보드 동작을 구현하지 않으면, 보조기기엔 &lsquo;버튼&rsquo;
            이라 안내되는데 실제로는 동작하지 않는 거짓말이 된다. ARIA는 역할·상태·동작을 모두
            책임질 때만 쓴다.
          </CardText>
        </Card>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="접근 가능한 폼" />
        <Paragraph>
          폼은 접근성 문제가 가장 자주 터지는 곳이다. 핵심은 &lsquo;모든 입력에 이름이 있고,
          오류를 명확히 전달하는 것&rsquo;이다.
        </Paragraph>

        <CodeBlock label="레이블·에러를 연결한 접근 가능한 입력">{`<label htmlFor="email">이메일</label>
<input
  id="email"
  type="email"
  required
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
{hasError && (
  <p id="email-error" role="alert">올바른 이메일 형식이 아닙니다.</p>
)}`}</CodeBlock>

        <BulletList>
          <Bullet>
            <strong>레이블 연결</strong>: 모든 입력에 <code>&lt;label&gt;</code>을 연결한다.
            placeholder는 레이블을 대체하지 못한다(입력하면 사라진다).
          </Bullet>
          <Bullet>
            <strong>오류 전달</strong>: <code>aria-describedby</code>로 입력과 에러 메시지를
            묶고, <code>role=&quot;alert&quot;</code>로 즉시 읽어준다.
          </Bullet>
          <Bullet>
            <strong>충분한 타깃 크기</strong>: 터치 대상은 넉넉히(약 44px) 잡아 운동 제약이 있는
            사용자도 누르기 쉽게 한다.
          </Bullet>
        </BulletList>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <SmallHeading style={{ fontSize: '0.95rem' }}>
              <Dot /> 함께 보면 좋은 글
            </SmallHeading>
          </CardTitle>
          <SmallText>
            명도 대비·포커스 스타일을 토큰으로 일관되게 관리하는 법은{' '}
            <Link
              href="/frontend/styling"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              Styling 전략
            </Link>{' '}
            에서, 시맨틱 마크업이 브라우저에서 어떻게 처리되는지는{' '}
            <Link
              href="/frontend/browser-rendering"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              브라우저 렌더링 원리
            </Link>{' '}
            에서 다룬다.
          </SmallText>
        </Card>
      </Section>

      <HeaderQuote>
        접근성은 나중에 덧붙이는 기능이 아니라 처음부터 지키는 기본기다.
        <br />
        <strong>올바른 HTML로 시작하고, 키보드로 검증하고, ARIA는 최후에 쓴다.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
