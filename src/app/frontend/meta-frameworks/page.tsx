'use client'

import React from 'react'
import {
  Boxes,
  Layers,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'
import ContentDoc, {
  Section,
  SectionTitleBlock,
  Paragraph,
  SectionIntro,
  GridTwo,
  Card,
  CardTitle,
  CardText,
  BulletList,
  Bullet,
  CodeBlock,
} from '@/components/content/ContentDoc'

const toc = [
  { id: 'section1', label: '1. 메타프레임워크란 무엇인가' },
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
    </ContentDoc>
  )
}
