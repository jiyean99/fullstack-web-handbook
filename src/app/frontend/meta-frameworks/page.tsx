'use client'

import React from 'react'
import {
  Boxes,
  Layers,
  CheckCircle,
  AlertTriangle,
  Globe,
  Zap,
  Sparkles,
  FileText,
  ShieldCheck,
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
} from '@/components/content/ContentDoc'

const toc = [
  { id: 'section1', label: '1. 메타프레임워크란 무엇인가' },
  { id: 'section2', label: '2. 렌더링 전략 스펙트럼' },
  { id: 'section3', label: '3. Astro와 아일랜드 아키텍처' },
  { id: 'section4', label: '4. 콘텐츠 중심 워크플로우' },
]

export default function MetaFrameworksPage() {
  return (
    <ContentDoc
      badge="Meta-Frameworks"
      title="메타프레임워크와 렌더링 전략"
      quote={
        <>
          React는 &lsquo;UI를 그리는 라이브러리&rsquo;일 뿐, 라우팅·데이터 로딩·번들링·렌더링
          위치를 정해주지 않는다. 메타프레임워크는 그 빈칸을 채우는 한 겹의 약속이다. 핵심은
          &lsquo;어떤 코드를 언제, 어디서 실행할 것인가&rsquo;를 프레임워크가 대신 결정해 준다는
          데 있다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="메타프레임워크란 무엇인가" />
        <Paragraph>
          메타프레임워크(meta-framework)는 React·Vue·Svelte 같은 UI 라이브러리 &lsquo;위에&rsquo;
          한 겹을 더 얹어, 애플리케이션을 만드는 데 필요한 공통 결정들을 미리 내려주는
          프레임워크다. Next.js, Astro, Remix, SvelteKit, Nuxt가 대표적이다. UI 라이브러리는
          화면을 그리는 방법만 알려줄 뿐, 실제 서비스를 만들려면 그 바깥에서 풀어야 할 문제가
          훨씬 많다.
        </Paragraph>

        <SectionIntro>
          React로 빈 프로젝트를 시작하면 곧바로 마주치는 질문들이 있다. 라우팅은 어떻게 하지?
          데이터는 서버에서 가져올까 브라우저에서 가져올까? 빌드는 어떤 도구로? SEO를 위해
          HTML을 미리 만들어 둘 방법은? 메타프레임워크는 이 질문들에 &lsquo;기본 정답&rsquo;을
          제공한다.
        </SectionIntro>

        <BulletList>
          <Bullet>
            <strong>라우팅</strong>: 파일·폴더 구조를 URL로 매핑하는 규칙(file-based routing)을
            제공한다. 라우터를 직접 설정할 필요가 없다.
          </Bullet>
          <Bullet>
            <strong>데이터 로딩</strong>: 서버에서 데이터를 미리 가져와 HTML에 담아 보내는
            표준 진입점(서버 컴포넌트, loader 등)을 둔다.
          </Bullet>
          <Bullet>
            <strong>렌더링 위치</strong>: 같은 컴포넌트를 서버에서 그릴지(SSR), 빌드 때 미리
            그릴지(SSG), 브라우저에서 그릴지(CSR)를 선택할 수 있게 한다.
          </Bullet>
          <Bullet>
            <strong>번들링·최적화</strong>: 코드 분할, 이미지 최적화, 정적 자산 처리 등을
            기본 내장한다. 설정 파일을 거의 건드리지 않아도 된다.
          </Bullet>
        </BulletList>

        <GridTwo>
          <Card>
            <CardTitle>
              <CheckCircle size={20} color="var(--color-success)" /> 무엇을 얻는가
            </CardTitle>
            <CardText>
              매번 똑같이 내려야 했던 결정(라우팅·빌드·렌더링)을 프레임워크가 대신 정해 준다.
              팀은 &lsquo;무엇을 만들지&rsquo;에 집중하고, 성능·SEO 모범 사례를 기본으로 얻는다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-warning)" /> 무엇을 내주는가
            </CardTitle>
            <CardText>
              프레임워크의 관례(convention)를 따라야 한다. 자유도가 줄고, 프레임워크의 추상화가
              깨지는 순간(escape hatch)을 이해해야 디버깅할 수 있다. 잠금(lock-in) 비용도 있다.
            </CardText>
          </Card>
        </GridTwo>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Boxes size={18} color="var(--color-primary)" /> 라이브러리 vs 프레임워크
          </CardTitle>
          <CardText>
            라이브러리는 &lsquo;내가 부른다&rsquo;(나의 코드가 React를 호출), 프레임워크는
            &lsquo;나를 부른다&rsquo;(프레임워크가 내 코드를 정해진 시점에 호출)는 제어의 역전이
            핵심이다. 메타프레임워크를 쓴다는 건 라우팅·렌더링의 주도권을 프레임워크에 넘기는
            대신, 그 위에서 빠르게 달리는 선택이다.
          </CardText>
        </Card>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <Layers size={18} color="var(--color-primary)" /> 이 장에서 다루는 것
          </CardTitle>
          <CardText>
            먼저 렌더링 전략의 스펙트럼(CSR·SSR·SSG·ISR)을 정리하고, Astro가 제안한 아일랜드
            아키텍처와 부분 하이드레이션, 콘텐츠 중심 워크플로우를 살펴본 뒤, 마지막으로
            Next·Astro·Remix를 언제 무엇으로 고를지 선택 기준을 정리한다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="렌더링 전략 스펙트럼" />
        <Paragraph>
          메타프레임워크가 내려주는 가장 중요한 결정은 &lsquo;HTML을 언제, 어디서 만들 것인가&rsquo;다.
          같은 화면이라도 빌드 때 미리 만들 수도, 요청마다 서버에서 만들 수도, 브라우저에서
          그릴 수도 있다. 이 선택이 첫 화면 속도(TTFB·LCP), 서버 비용, 데이터 최신성을 좌우한다.
        </Paragraph>

        <SectionIntro>
          네 가지 전략은 대립하는 진영이 아니라 하나의 스펙트럼이다. &lsquo;콘텐츠가 얼마나
          자주 바뀌는가&rsquo;와 &lsquo;사용자마다 달라지는가&rsquo;를 축으로 두면 어디에
          놓을지 자연스럽게 정해진다.
        </SectionIntro>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>전략</Th>
                <Th>HTML 생성 시점</Th>
                <Th>적합한 콘텐츠</Th>
                <Th>대표 트레이드오프</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>CSR</Td>
                <Td>브라우저(런타임)</Td>
                <Td>로그인 후 대시보드 등 SEO가 필요 없는 화면</Td>
                <Td>첫 로딩이 느리고 SEO에 불리</Td>
              </tr>
              <tr>
                <Td $muted>SSR</Td>
                <Td>요청마다 서버</Td>
                <Td>사용자·시점마다 달라지는 개인화 페이지</Td>
                <Td>서버 부하·TTFB가 요청량에 비례</Td>
              </tr>
              <tr>
                <Td $muted>SSG</Td>
                <Td>빌드 시점</Td>
                <Td>블로그·문서·마케팅 등 정적 콘텐츠</Td>
                <Td>내용이 바뀌면 다시 빌드해야 함</Td>
              </tr>
              <tr>
                <Td $muted>ISR</Td>
                <Td>빌드 + 백그라운드 재생성</Td>
                <Td>가끔 바뀌는 대량 페이지(상품·기사)</Td>
                <Td>일정 시간 동안 오래된 내용이 보일 수 있음</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <CodeBlock label="app/products/[id]/page.tsx (Next.js — ISR 예시)">{`// 60초마다 백그라운드에서 페이지를 다시 생성한다.
// 첫 요청은 캐시된 정적 HTML을 즉시 받고,
// 60초가 지난 뒤의 요청이 재생성을 트리거한다.
export const revalidate = 60

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id) // 빌드/재생성 시 서버에서 실행
  return <ProductView product={product} />
}`}</CodeBlock>

        <Stack>
          <Card>
            <CardTitle>
              <Zap size={20} color="var(--color-success)" /> 정적을 기본값으로
            </CardTitle>
            <CardText>
              &lsquo;정적으로 만들 수 있는 건 정적으로&rsquo;가 출발점이다. SSG/ISR로 미리 만든
              HTML은 CDN에서 바로 내려가 가장 빠르고 싸다. 개인화·실시간성이 꼭 필요한 부분만
              SSR/CSR로 끌어올린다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Globe size={20} color="var(--color-primary)" /> 한 페이지 안에서도 혼합
            </CardTitle>
            <CardText>
              현대 메타프레임워크는 페이지 단위가 아니라 컴포넌트 단위로 전략을 섞는다. 정적
              레이아웃 안에 실시간 위젯 하나만 동적으로 두는 식이다. 다음 장의 아일랜드
              아키텍처가 이 발상을 끝까지 밀어붙인 결과다.
            </CardText>
          </Card>
        </Stack>

        <GridTwo>
          <Card>
            <SmallHeading>
              <Dot />
              판단 질문 1: 자주 바뀌는가
            </SmallHeading>
            <SmallText>
              거의 안 바뀐다 → SSG. 가끔 바뀐다 → ISR. 요청마다 다르다 → SSR. 이 한 축만으로도
              대부분의 페이지는 자리를 찾는다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              판단 질문 2: SEO가 필요한가
            </SmallHeading>
            <SmallText>
              검색 노출·공유 미리보기가 필요하면 HTML에 콘텐츠가 담겨야 하므로 CSR은 탈락한다.
              서버/빌드 렌더링으로 본문을 HTML에 실어 보낸다.
            </SmallText>
          </Card>
        </GridTwo>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="Astro와 아일랜드 아키텍처" />
        <Paragraph>
          Astro는 &lsquo;기본적으로 자바스크립트를 0으로 보낸다&rsquo;는 발상에서 출발한
          메타프레임워크다. 대부분의 콘텐츠 사이트는 사실 정적 HTML이면 충분한데, SPA 프레임워크는
          페이지 전체를 자바스크립트로 다시 그리느라(하이드레이션) 불필요한 비용을 치른다. Astro는
          이 기본값을 뒤집는다.
        </Paragraph>

        <SectionIntro>
          아일랜드 아키텍처(islands architecture)는 페이지를 &lsquo;정적인 바다&rsquo;로 보고,
          상호작용이 필요한 부분만 &lsquo;섬&rsquo;으로 분리해 그 섬에만 자바스크립트를 붙이는
          방식이다. 검색창·캐러셀·좋아요 버튼만 동적이고 나머지 본문은 순수 HTML로 남는다.
        </SectionIntro>

        <CodeBlock label="src/pages/index.astro">{`---
// 이 컴포넌트는 서버(빌드 시점)에서만 실행된다.
import Header from '../components/Header.astro'   // 정적 HTML로만 출력
import SearchBox from '../components/SearchBox.jsx' // 상호작용 필요 → 섬
const posts = await getPosts() // JS 번들에 포함되지 않음
---
<Header />

<!-- client:visible: 화면에 보일 때 비로소 하이드레이션 -->
<SearchBox client:visible />

<ul>
  {posts.map((p) => <li>{p.title}</li>)}  <!-- 순수 HTML, JS 0 -->
</ul>`}</CodeBlock>

        <Paragraph>
          핵심은 <code>client:*</code> 지시어다. 섬마다 &lsquo;언제 하이드레이션할지&rsquo;를
          따로 정할 수 있어, 자바스크립트를 필요한 만큼만, 필요한 시점에만 로드한다. 이것을
          부분 하이드레이션(partial hydration) 혹은 선택적 하이드레이션이라 부른다.
        </Paragraph>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>지시어</Th>
                <Th>하이드레이션 시점</Th>
                <Th>쓰임새</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>client:load</Td>
                <Td>페이지 로드 즉시</Td>
                <Td>처음부터 바로 반응해야 하는 핵심 위젯</Td>
              </tr>
              <tr>
                <Td $muted>client:idle</Td>
                <Td>브라우저가 한가할 때</Td>
                <Td>당장 급하지 않은 보조 상호작용</Td>
              </tr>
              <tr>
                <Td $muted>client:visible</Td>
                <Td>뷰포트에 들어올 때</Td>
                <Td>스크롤해야 보이는 하단 컴포넌트</Td>
              </tr>
              <tr>
                <Td $muted>client:only</Td>
                <Td>서버 렌더 생략, 클라이언트만</Td>
                <Td>브라우저 API에 의존해 SSR이 불가능한 위젯</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <GridTwo>
          <Card>
            <CardTitle>
              <Sparkles size={20} color="var(--color-success)" /> 프레임워크 중립
            </CardTitle>
            <CardText>
              한 페이지 안에서 React 섬과 Svelte 섬, Vue 섬을 함께 쓸 수 있다. Astro 자체는
              UI 라이브러리에 묶이지 않고, 각 섬이 자기 런타임만 들고 온다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-warning)" /> 섬 사이의 단절
            </CardTitle>
            <CardText>
              섬들은 서로 독립적이라 전역 상태를 공유하기 까다롭다. 화면 전체가 하나의 거대한
              상호작용 앱(대시보드 등)이라면 아일랜드 모델보다 SPA형 프레임워크가 더 맞는다.
            </CardText>
          </Card>
        </GridTwo>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <Boxes size={18} color="var(--color-primary)" /> 왜 빠른가
          </CardTitle>
          <CardText>
            보내는 자바스크립트의 양 자체가 적기 때문이다. 하이드레이션 비용은 결국 다운로드하고
            파싱·실행해야 할 JS의 양에 비례한다. 섬만 하이드레이션하면 그 비용이 페이지 전체가
            아니라 섬의 크기로 줄어든다.
          </CardText>
        </Card>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="콘텐츠 중심 워크플로우" />
        <Paragraph>
          블로그·문서·포트폴리오처럼 &lsquo;글이 주인공&rsquo;인 사이트에서는 렌더링 전략만큼이나
          콘텐츠를 어떻게 관리하느냐가 중요하다. 메타프레임워크는 Markdown/MDX 파일을 데이터처럼
          다루는 워크플로우를 기본 제공해, 별도 CMS 없이도 글을 타입 안전하게 관리하게 해 준다.
        </Paragraph>

        <SectionIntro>
          Astro의 Content Collections가 대표적이다. 콘텐츠 폴더에 스키마를 선언해 두면, 각
          글의 프런트매터(frontmatter)가 빌드 때 검증되고, 본문을 불러올 때 타입이 따라온다.
          오타 난 필드나 빠뜨린 날짜는 빌드 단계에서 걸러진다.
        </SectionIntro>

        <CodeBlock label="src/content/config.ts (Astro Content Collections)">{`import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  // 프런트매터 스키마를 Zod로 선언 → 빌드 시 검증
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }`}</CodeBlock>

        <CodeBlock label="src/pages/blog/index.astro">{`---
import { getCollection } from 'astro:content'

// entry.data는 위 스키마 타입을 그대로 따른다 (자동완성·타입체크)
const posts = (await getCollection('blog'))
  .filter((entry) => !entry.data.draft)
  .sort((a, b) => +b.data.publishedAt - +a.data.publishedAt)
---
<ul>
  {posts.map((post) => (
    <li><a href={\`/blog/\${post.slug}\`}>{post.data.title}</a></li>
  ))}
</ul>`}</CodeBlock>

        <GridTwo>
          <Card>
            <CardTitle>
              <FileText size={20} color="var(--color-primary)" /> 파일이 곧 데이터베이스
            </CardTitle>
            <CardText>
              글은 Git에 함께 버전 관리되는 Markdown 파일이다. 별도 DB·관리자 화면 없이도 PR로
              글을 리뷰하고, 롤백하고, 배포 파이프라인에 그대로 태울 수 있다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <ShieldCheck size={20} color="var(--color-success)" /> 빌드 타임 검증
            </CardTitle>
            <CardText>
              스키마 덕분에 &lsquo;발행일 빠진 글&rsquo;, &lsquo;태그 오타&rsquo; 같은 실수가
              런타임이 아니라 빌드에서 드러난다. 깨진 콘텐츠가 배포되는 일을 원천 차단한다.
            </CardText>
          </Card>
        </GridTwo>

        <BulletList>
          <Bullet>
            <strong>MDX</strong>: Markdown 안에서 컴포넌트를 직접 쓸 수 있어, 글 속에 인터랙티브
            데모(섬)를 섞기 좋다. 이 핸드북도 같은 발상으로 콘텐츠와 컴포넌트를 함께 둔다.
          </Bullet>
          <Bullet>
            <strong>정적 생성과의 궁합</strong>: 콘텐츠가 파일이므로 빌드 때 전부 SSG로 굳혀
            CDN에 올리기 자연스럽다. 글이 늘어도 서버 비용은 늘지 않는다.
          </Bullet>
          <Bullet>
            <strong>헤드리스 CMS와의 경계</strong>: 비개발자가 자주 글을 올려야 한다면 파일
            기반보다 헤드리스 CMS(Contentful·Sanity 등)를 데이터 소스로 두는 편이 낫다.
          </Bullet>
        </BulletList>
      </Section>
    </ContentDoc>
  )
}
