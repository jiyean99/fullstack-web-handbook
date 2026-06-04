'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {
  ShieldAlert,
  Network,
  Wrench,
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
  CodeBlock,
  HeaderQuote,
} from '@/components/content/ContentDoc'

const toc = [
  { id: 'section1', label: '1. 증상: 콘솔의 빨간 줄' },
  { id: 'section2', label: '2. preflight(OPTIONS)의 정체' },
  { id: 'section3', label: '3. 원인: 서버가 허용을 안 함' },
  { id: 'section4', label: '4. 해결: 서버 CORS 설정' },
  { id: 'section5', label: '5. 함정과 교훈' },
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

export default function CorsPreflightPage() {
  return (
    <ContentDoc
      badge="Journal · Frontend"
      badgeIcon={<ShieldAlert size={12} />}
      title="로컬에선 됐는데 배포하니 CORS — preflight 디버깅기"
      quote={
        <>
          로컬에서 멀쩡하던 API 호출이 배포 환경에서 CORS 에러로 막혔다. 브라우저의 동일 출처
          정책과 preflight 요청을 이해하지 못하면 끝없이 헤맬 수 있는 문제다. 원인과 해결을
          기록한다.
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
        <SectionTitleBlock num="1" title="증상: 콘솔의 빨간 줄" />
        <Paragraph>
          프론트엔드(<code>https://app.example.com</code>)에서 API
          (<code>https://api.example.com</code>)를 호출하자 브라우저 콘솔에 익숙한 에러가
          떴다. 정작 백엔드 로그에는 에러가 없었다.
        </Paragraph>

        <CodeBlock label="브라우저 콘솔">{`Access to fetch at 'https://api.example.com/orders'
from origin 'https://app.example.com' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.`}</CodeBlock>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-warning)" /> 핵심 오해 풀기
          </CardTitle>
          <CardText>
            CORS는 <strong>서버가 요청을 거부한 게 아니다</strong>. 서버는 응답을 정상적으로
            보냈지만, 출처가 다르고 허용 헤더가 없어서 <strong>브라우저가 응답을 가로막은</strong>
            것이다. 그래서 백엔드 로그엔 흔적이 없다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="preflight(OPTIONS)의 정체" />
        <SectionIntro>
          네트워크 탭을 보니 실제 요청 전에 <code>OPTIONS</code> 요청이 먼저 나가고 있었다.
          이것이 preflight다. 브라우저가 &lsquo;이 교차 출처 요청을 보내도 되는지&rsquo;를
          서버에 미리 묻는 단계다.
        </SectionIntro>

        <CodeBlock label="preflight 요청/응답">{`# 브라우저가 먼저 보내는 예비 요청
OPTIONS /orders
Origin: https://app.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type, authorization

# 서버가 허용을 응답해야 본 요청이 진행된다
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization`}</CodeBlock>

        <BulletList>
          <Bullet>
            <strong>단순 요청</strong>(GET, 단순 헤더)은 preflight 없이 바로 간다.
          </Bullet>
          <Bullet>
            <code>Content-Type: application/json</code>이거나 <code>Authorization</code> 헤더가
            붙으면 <strong>preflight가 발생</strong>한다 — 대부분의 실제 API가 여기 해당한다.
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="원인: 서버가 허용을 안 함" />
        <Paragraph>
          로컬에선 프론트와 API가 같은 출처(또는 dev 프록시)였기에 CORS가 발동하지 않았다.
          배포 후 출처가 갈리면서, 서버가 <code>OPTIONS</code>에 허용 헤더를 주지 않아 본 요청이
          시작도 못 한 것이다.
        </Paragraph>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-error) 7%, var(--color-bg))',
            borderColor: 'var(--color-error)',
          }}
        >
          <CardTitle>
            <Network size={18} color="var(--color-error)" /> &ldquo;로컬에선 됐는데&rdquo;의 정체
          </CardTitle>
          <CardText>
            개발 서버의 프록시(예: Next의 rewrites, Vite proxy)가 같은 출처처럼 보이게 만들어
            CORS를 숨기고 있었다. 환경이 바뀌면 드러나는 전형적인 함정이다.
          </CardText>
        </Card>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="해결: 서버 CORS 설정" />
        <SectionIntro>
          CORS는 <strong>서버에서 허용</strong>해야 풀린다. 프론트에서 우회할 수 없다(보안상
          당연하다). 백엔드에 허용 출처·메서드·헤더를 명시했다.
        </SectionIntro>

        <CodeBlock label="Spring Boot 예시">{`@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("https://app.example.com") // 구체적 출처
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}`}</CodeBlock>

        <CodeBlock label="FastAPI 예시">{`from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://app.example.com"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)`}</CodeBlock>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="함정과 교훈" />
        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Wrench size={18} color="var(--color-primary)" /> 빠지기 쉬운 함정
          </CardTitle>
          <BulletList>
            <Bullet>
              <strong>credentials + 와일드카드 불가</strong>: 쿠키·인증을 보내려면
              <code> allow_credentials=true</code>인데, 이때 <code>Allow-Origin: *</code>는
              브라우저가 거부한다. 출처를 구체적으로 명시해야 한다.
            </Bullet>
            <Bullet>
              <strong>OPTIONS도 라우팅돼야</strong>: 인증 필터가 <code>OPTIONS</code>를 먼저
              가로채 401을 주면 preflight가 실패한다. preflight는 인증 예외로 둔다.
            </Bullet>
            <Bullet>
              <strong>프론트 우회는 불가</strong>: CORS는 브라우저 보안이라 클라이언트 코드로
              못 푼다. 정답은 항상 서버 설정(또는 같은 출처로 묶는 게이트웨이).
            </Bullet>
          </BulletList>
        </Card>

        <Paragraph style={{ marginTop: 'var(--sp-6)' }}>
          HTTP 헤더와 메서드의 기초는{' '}
          <Link href="/backend/http-rest" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            HTTP / REST API 설계
          </Link>{' '}
          글에서 다룬다.
        </Paragraph>

        <HeaderQuote>
          CORS 에러는 서버의 거부가 아니라 브라우저의 보호다.
          <br />
          <strong>preflight의 흐름을 이해하면, 빨간 줄은 더 이상 미스터리가 아니다.</strong>
        </HeaderQuote>
      </Section>
    </ContentDoc>
  )
}
