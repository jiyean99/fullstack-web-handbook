'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {
  Search,
  ListFilter,
  Scale,
  Gauge,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
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
  TableWrapper,
  Table,
  Th,
  Td,
  CodeBlock,
  HeaderQuote,
} from '@/components/content/ContentDoc'

const toc = [
  { id: 'section1', label: '1. 증상: 장식이던 검색바' },
  { id: 'section2', label: '2. 엘라스틱서치는 과했다' },
  { id: 'section3', label: '3. 정적 인덱스 + 클라이언트 검색' },
  { id: 'section4', label: '4. 관련도 점수와 정렬' },
  { id: 'section5', label: '5. 한계와 다음 선택지' },
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

export default function ClientSideSearchPage() {
  return (
    <ContentDoc
      badge="Journal · Frontend"
      badgeIcon={<Search size={12} />}
      title="엘라스틱서치 없이 — 검색을 프론트에서 직접 만든 기록"
      quote={
        <>
          상단 검색바는 모양만 있고 아무 동작도 하지 않았다. 동작하게 만들면서 가장 먼저 한
          고민은 &lsquo;엘라스틱서치를 붙일 것인가&rsquo;였다. 결론은 아니오. 문서 수십 개짜리
          정적 사이트에 검색 엔진은 과했고, 정적 인덱스와 클라이언트 검색으로 충분했다.
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
        <SectionTitleBlock num="1" title="증상: 장식이던 검색바" />
        <Paragraph>
          네비게이션 우측의 검색 입력창은 <code>placeholder</code>만 그럴듯했지 타이핑해도 아무
          일도 일어나지 않았다. 상태도, 결과 목록도, 키 핸들러도 없는 순수 장식이었다. &lsquo;검색
          되는 줄 알았다&rsquo;는 인상만 주는 UI는 없느니만 못하다고 판단해 실제로 동작시키기로
          했다.
        </Paragraph>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Gauge size={18} color="var(--color-warning)" /> 먼저 정한 목표
          </CardTitle>
          <CardText>
            제목·섹션·설명을 가로질러 즉시(타이핑과 동시에) 결과가 뜨고, 키보드만으로 이동·열기가
            되며, <strong>운영 부담이 없을 것</strong>. 이 세 가지가 기술 선택의 기준이 됐다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="엘라스틱서치는 과했다" />
        <SectionIntro>
          &lsquo;검색&rsquo;이라는 단어를 들으면 반사적으로 엘라스틱서치(혹은 Algolia)가 떠오른다.
          하지만 도구를 정하기 전에 <strong>데이터의 규모와 성격</strong>을 따져야 했다. 이
          핸드북의 검색 대상은 페이지·저널을 합쳐 수십 건뿐이고, 전부 빌드 타임에 정해지는
          정적 문서다.
        </SectionIntro>

        <Paragraph>
          이 조건에서 검색 엔진을 붙이면 얻는 것보다 잃는 게 많았다. 색인 서버를 띄우고, 배포할
          때마다 색인을 갱신하고, 네트워크 왕복까지 감수해야 한다. 반대로 문서가 수십 개라면
          <strong> 브라우저 메모리에서 통째로 훑어도</strong> 체감 지연이 없다.
        </Paragraph>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>기준</Th>
                <Th>이 사이트</Th>
                <Th>엔진이 필요해지는 시점</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>문서 수</Td>
                <Td>수십 건</Td>
                <Td>수천~수백만 건</Td>
              </tr>
              <tr>
                <Td $muted>갱신</Td>
                <Td>빌드 타임 고정(정적)</Td>
                <Td>실시간으로 계속 추가/변경</Td>
              </tr>
              <tr>
                <Td $muted>요구 기능</Td>
                <Td>부분 일치 + 가중치 정렬</Td>
                <Td>형태소 분석·오타 보정·동의어·패싯</Td>
              </tr>
              <tr>
                <Td $muted>운영</Td>
                <Td>인프라 0</Td>
                <Td>색인 서버·재색인 파이프라인</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <Scale size={18} color="var(--color-primary)" /> 적정 기술
          </CardTitle>
          <CardText>
            &lsquo;가장 강력한 도구&rsquo;가 아니라 &lsquo;문제 크기에 맞는 도구&rsquo;를 고르는
            것이 핵심이다. 검색 엔진은 훌륭하지만, 이 문제에는 망치로 압정을 박는 격이었다.
          </CardText>
        </Card>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="정적 인덱스 + 클라이언트 검색" />
        <Paragraph>
          구현은 두 조각이다. 하나는 검색 대상을 정리한 <strong>정적 인덱스 배열</strong>, 다른
          하나는 그 배열을 훑는 <strong>검색 함수</strong>다. 인덱스는 빌드 타임에 JS 번들에
          포함돼 브라우저로 내려가므로, 검색 시점에는 네트워크 요청이 전혀 없다.
        </Paragraph>

        <CodeBlock label="src/lib/search-index.ts (인덱스 구조)">{`export interface SearchDoc {
  title: string
  href: string
  section: string
  description: string
  keywords?: string   // 검색은 되지만 화면엔 안 보이는 별칭들
}

// 페이지는 손으로, Journal 글은 entries.ts에서 자동으로 합친다.
export const searchIndex: SearchDoc[] = [
  ...pages,
  ...journalEntries.map((e) => ({
    title: e.title,
    href: \`/journal/\${e.slug}\`,
    section: 'Journal',
    description: e.summary,
    keywords: [...e.tags, e.category].join(' '),
  })),
]`}</CodeBlock>

        <SectionIntro>
          검색 함수는 쿼리를 공백으로 쪼갠 토큰이 <strong>모두</strong> 포함된 문서만 후보로
          남긴다(AND 매칭). 비교 대상은 제목·섹션·설명·키워드를 하나로 합친 문자열이라, 화면에
          안 보이는 별칭(예: &lsquo;리액트&rsquo;, &lsquo;도커&rsquo;)으로도 잡힌다.
        </SectionIntro>

        <CodeBlock label="src/lib/search-index.ts (매칭)">{`const tokens = query.trim().toLowerCase().split(/\\s+/)

const haystack = \`\${title} \${section} \${description} \${keywords ?? ''}\`.toLowerCase()

// 모든 토큰이 어딘가에 들어 있어야 후보가 된다.
if (!tokens.every((t) => haystack.includes(t))) return null`}</CodeBlock>

        <BulletList>
          <Bullet>
            <strong>네트워크 0</strong>: 인덱스가 번들에 있어 타이핑과 동시에 결과가 뜬다.
          </Bullet>
          <Bullet>
            <strong>유지보수 단순</strong>: 새 문서는 배열에 한 줄 추가, 저널은 자동 반영.
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="관련도 점수와 정렬" />
        <Paragraph>
          단순 포함 여부만 보면 &lsquo;제목에 정확히 있는 글&rsquo;과 &lsquo;키워드에만 스친
          글&rsquo;이 똑같이 취급된다. 그래서 토큰이 <strong>어디서</strong> 매칭됐는지에 따라
          가중치를 다르게 줘서 정렬했다. 엔진의 BM25 같은 통계 모델 대신, 작은 규모에 맞는
          손으로 정한 규칙이다.
        </Paragraph>

        <CodeBlock label="src/lib/search-index.ts (점수)">{`let score = 0
for (const t of tokens) {
  if (title === t) score += 100          // 제목 완전 일치
  else if (title.startsWith(t)) score += 60  // 제목 앞부분
  else if (title.includes(t)) score += 40    // 제목 포함
  else if (section.includes(t)) score += 12  // 섹션명
  else if (description.includes(t)) score += 8
  else score += 4                            // 키워드에만 존재
}
// 점수 내림차순 정렬 후 상위 8개만 반환`}</CodeBlock>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>매칭 위치</Th>
                <Th>가중치</Th>
                <Th>의도</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>제목 완전 일치</Td>
                <Td>+100</Td>
                <Td>찾던 바로 그 문서일 확률이 가장 높다</Td>
              </tr>
              <tr>
                <Td $muted>제목 포함</Td>
                <Td>+40~60</Td>
                <Td>제목에 있으면 강하게 끌어올린다</Td>
              </tr>
              <tr>
                <Td $muted>설명·섹션</Td>
                <Td>+8~12</Td>
                <Td>본문 맥락 일치는 보조 신호</Td>
              </tr>
              <tr>
                <Td $muted>키워드만</Td>
                <Td>+4</Td>
                <Td>별칭으로라도 걸리게 하는 최소 점수</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <ListFilter size={18} color="var(--color-primary)" /> UX는 별개의 일
          </CardTitle>
          <CardText>
            검색 로직만큼 중요한 게 조작감이었다. <code>Ctrl/Cmd+K</code> 포커스,{' '}
            <code>↑/↓</code> 이동, <code>Enter</code>로 이동, <code>Esc</code>·바깥 클릭으로
            닫기, 결과 없을 때 안내까지 붙여야 &lsquo;검색답게&rsquo; 느껴진다.
          </CardText>
        </Card>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="한계와 다음 선택지" />
        <SectionIntro>
          지금 방식은 작은 정적 사이트에 딱 맞지만, 분명한 한계가 있다. 솔직하게 적어두는 편이
          나중의 판단에 도움이 된다.
        </SectionIntro>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-warning)" /> 알면서 감수한 한계
          </CardTitle>
          <BulletList>
            <Bullet>
              <strong>오타 보정 없음</strong>: &lsquo;rect&rsquo;는 &lsquo;react&rsquo;를 못
              찾는다. 부분 문자열 포함이라 편집거리 기반 퍼지 매칭이 안 된다.
            </Bullet>
            <Bullet>
              <strong>형태소 분석 없음</strong>: 한국어 조사·어미를 처리하지 않는다.
              &lsquo;검색을&rsquo;로는 &lsquo;검색&rsquo; 문서가 안 잡힐 수 있어, 별칭을{' '}
              <code>keywords</code>에 수동으로 넣어 메웠다.
            </Bullet>
            <Bullet>
              <strong>본문 미색인</strong>: 제목·요약·키워드만 본다. 문서 &lsquo;안의 문장&rsquo;을
              검색하진 못한다.
            </Bullet>
            <Bullet>
              <strong>수동 인덱스</strong>: 페이지는 배열에 직접 등록해야 한다(저널만 자동).
            </Bullet>
          </BulletList>
        </Card>

        <Paragraph>
          규모가 커지면 단계적으로 갈아탈 길이 있다. 본문 전체 검색·약한 오타 보정이 필요해지면
          <strong> 클라이언트 검색 라이브러리</strong>(FlexSearch·MiniSearch·Fuse.js)가 다음
          단계다. 정적 사이트라면 빌드 때 색인을 만들어 청크로 불러오는{' '}
          <strong>Pagefind·Orama</strong>가 좋고, 운영을 맡기고 싶으면 <strong>Algolia
          DocSearch</strong>가 있다. 진짜 대규모·실시간이 되어서야 비로소 엘라스틱서치 차례다.
        </Paragraph>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 남은 교훈
          </CardTitle>
          <CardText>
            검색은 &lsquo;엔진을 쓰느냐 마느냐&rsquo;의 이분법이 아니라, 정적 인덱스 → 클라이언트
            라이브러리 → 빌드형 색인 → 호스팅 SaaS → 자체 검색 엔진으로 이어지는 스펙트럼이다.
            지금 문제의 크기에서 한 칸을 고르면 된다.
          </CardText>
        </Card>

        <Paragraph style={{ marginTop: 'var(--sp-6)' }}>
          런타임 검증이 들어간 데이터 모델링은{' '}
          <Link
            href="/frontend/typescript"
            style={{ color: 'var(--color-primary)', fontWeight: 600 }}
          >
            TypeScript 실무 타입
          </Link>{' '}
          글에서, 렌더링 전략과 정적 생성은{' '}
          <Link
            href="/frontend/meta-frameworks"
            style={{ color: 'var(--color-primary)', fontWeight: 600 }}
          >
            메타프레임워크와 렌더링 전략
          </Link>{' '}
          글에서 다룬다.
        </Paragraph>

        <HeaderQuote>
          <Search size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
          검색에 늘 검색 엔진이 필요한 건 아니다.
          <br />
          <strong>문제의 크기를 먼저 재고, 거기에 맞는 가장 단순한 도구를 골라라.</strong>
        </HeaderQuote>
      </Section>
    </ContentDoc>
  )
}
