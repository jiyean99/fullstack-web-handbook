'use client'

import React from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  KeyRound,
  IdCard,
  UserCheck,
  Bug,
  AlertTriangle,
  CheckCircle,
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
  { id: 'section1', label: '1. 인증과 인가의 차이' },
  { id: 'section2', label: '2. 세션 vs 토큰' },
  { id: 'section3', label: '3. JWT의 구조와 함정' },
  { id: 'section4', label: '4. 인가 모델: RBAC' },
  { id: 'section5', label: '5. 흔한 API 취약점 방어' },
]

export default function AuthSecurityPage() {
  return (
    <ContentDoc
      badge="Backend · 실무"
      badgeIcon={<ShieldCheck size={12} />}
      title="인증·인가와 API 보안"
      quote={
        <>
          API를 만드는 일과 지키는 일은 다른 기술이다. &lsquo;너는 누구인가(인증)&rsquo;와
          &lsquo;무엇을 할 수 있는가(인가)&rsquo;를 분리해 다루고, 토큰을 안전하게 운용하며,
          흔한 공격 패턴을 미리 막는 것 — 이것이 만든 서비스를 실제로 운영 가능하게 만드는
          마지막 단계다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="인증과 인가의 차이" />
        <Paragraph>
          보안의 첫 단추는 두 단어를 구분하는 것이다. <strong>인증(Authentication)</strong>은
          &lsquo;당신이 누구인지&rsquo; 확인하는 일이고, <strong>인가(Authorization)</strong>는
          &lsquo;그래서 무엇을 할 수 있는지&rsquo; 결정하는 일이다. 둘은 순서가 있고 책임이
          다르다.
        </Paragraph>

        <GridTwo>
          <Card>
            <CardTitle>
              <IdCard size={20} color="var(--color-primary)" /> 인증 (Who are you)
            </CardTitle>
            <CardText>
              아이디·비밀번호, OAuth, 패스키 등으로 신원을 증명한다. 성공하면 서버는 &lsquo;이
              요청은 누구의 것&rsquo;인지 식별할 수단(세션·토큰)을 발급한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <UserCheck size={20} color="var(--color-success)" /> 인가 (What can you do)
            </CardTitle>
            <CardText>
              식별된 사용자가 특정 리소스·동작에 접근할 권한이 있는지 검사한다. &lsquo;로그인은
              됐지만 남의 주문은 못 본다&rsquo; 같은 규칙이 여기에 속한다.
            </CardText>
          </Card>
        </GridTwo>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-warning)" /> 인증됐다고 인가된 건 아니다
          </CardTitle>
          <CardText>
            로그인만 확인하고 &lsquo;이 자원이 이 사용자 것인지&rsquo;를 검사하지 않으면, 남의
            데이터에 접근하는 취약점(IDOR)이 생긴다. 인증과 인가는 항상 따로 검사해야 한다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="세션 vs 토큰" />
        <SectionIntro>
          인증에 성공한 뒤 &lsquo;이 요청이 로그인한 그 사용자&rsquo;임을 매번 어떻게 확인할까?
          전통적인 세션 방식과 토큰(JWT) 방식이 대표적이며, 무상태 확장과 직접 맞닿아 있다.
        </SectionIntro>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>구분</Th>
                <Th>세션 (Stateful)</Th>
                <Th>토큰 / JWT (Stateless)</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>상태 저장</Td>
                <Td>서버(또는 Redis)에 세션 보관</Td>
                <Td>서버에 저장 안 함, 토큰 자체에 정보</Td>
              </tr>
              <tr>
                <Td $muted>확장성</Td>
                <Td>세션 저장소 공유 필요</Td>
                <Td>어느 서버나 검증 가능 → 수평 확장 쉬움</Td>
              </tr>
              <tr>
                <Td $muted>무효화</Td>
                <Td>서버에서 즉시 삭제 가능</Td>
                <Td>만료 전 강제 무효화가 어려움</Td>
              </tr>
              <tr>
                <Td $muted>크기</Td>
                <Td>쿠키에 식별자만(작음)</Td>
                <Td>매 요청 토큰 전송(상대적으로 큼)</Td>
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
            <CheckCircle size={18} color="var(--color-primary)" /> 무상태성과의 연결
          </CardTitle>
          <CardText>
            JWT가 인기 있는 이유는 서버에 상태를 두지 않아 수평 확장이 쉽기 때문이다. 이는{' '}
            <Link
              href="/backend/fundamentals"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              백엔드 동작 원리
            </Link>{' '}
            에서 본 무상태 설계의 구체적인 적용이다. 다만 &lsquo;무효화가 어렵다&rsquo;는 대가가
            따라온다.
          </CardText>
        </Card>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="JWT의 구조와 함정" />
        <Paragraph>
          JWT는 <code>헤더.페이로드.서명</code> 세 부분을 점으로 이은 문자열이다. 앞 두 부분은
          단순 Base64URL 인코딩이라 <strong>누구나 디코드해 읽을 수 있고</strong>, 마지막 서명이
          위변조를 막는다. 이 구조를 오해하면 보안 사고로 이어진다.
        </Paragraph>

        <CodeBlock label="JWT 한 줄의 정체">{`eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MiIsInJvbGUiOiJ1c2VyIn0.3Vd...서명

# 점(.)으로 나뉜 세 조각
header  = { "alg": "HS256" }                  # 서명 알고리즘
payload = { "sub": "42", "role": "user" }     # 클레임(누구·권한·만료)
signature = HMAC(header + payload, secret)     # 비밀키로 만든 서명

# 주의: payload는 '암호화'가 아니라 '인코딩'이다 → 비밀번호 같은 민감정보 금지`}</CodeBlock>

        <Stack>
          <Card>
            <CardTitle>
              <KeyRound size={20} color="var(--color-success)" /> 서명이 핵심
            </CardTitle>
            <CardText>
              내용을 바꾸면 서명이 깨지므로 서버는 위조를 알아챈다. 단, 비밀키가 새면 누구나
              유효한 토큰을 찍어낼 수 있으니 키 관리가 전부다. <code>alg: none</code>을 받아주는
              구현 실수도 고전적 취약점이다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-warning)" /> 무효화와 저장 위치
            </CardTitle>
            <CardText>
              한 번 발급하면 만료까지 유효해서, 탈취·로그아웃 대응이 어렵다. 그래서 짧은
              액세스 토큰 + 리프레시 토큰 조합을 쓴다. 저장은 XSS에 노출되는
              <code>localStorage</code>보다 <code>HttpOnly</code> 쿠키가 안전하다.
            </CardText>
          </Card>
        </Stack>

        <BulletList>
          <Bullet>
            <strong>만료(exp)는 짧게</strong>: 액세스 토큰 수명을 짧게 두고 리프레시로 갱신해
            탈취 피해 창을 줄인다.
          </Bullet>
          <Bullet>
            <strong>민감정보 금지</strong>: 페이로드는 누구나 읽으므로 식별자·권한 정도만 담는다.
          </Bullet>
          <Bullet>
            <strong>강제 로그아웃이 필요하면</strong>: 블랙리스트나 토큰 버전을 서버에 둬야 하며,
            그 순간 완전한 무상태는 아니게 된다. 트레이드오프를 인지하고 선택한다.
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="인가 모델: RBAC" />
        <SectionIntro>
          인가를 코드 곳곳에 흩뿌리면 곧 엉킨다. 가장 널리 쓰이는 정리법이 <strong>역할 기반
          접근 제어(RBAC)</strong>다. 사용자에게 직접 권한을 주는 대신, &lsquo;역할&rsquo;에
          권한을 묶고 사용자에게 역할을 부여한다.
        </SectionIntro>

        <CodeBlock label="역할 기반 인가 검사 (의사 코드)">{`// 사용자 → 역할 → 권한
user(42).roles = ["editor"]
role("editor").permissions = ["article:read", "article:write"]

// 엔드포인트에서 '권한'으로 검사 (역할 이름이 아니라 권한으로)
@RequirePermission("article:write")
PUT /articles/{id}

// + 소유권 검사: 권한이 있어도 '내 글'인지 따로 확인
if (article.authorId != currentUser.id) throw Forbidden()`}</CodeBlock>

        <GridTwo>
          <Card>
            <CardTitle>
              <UserCheck size={20} color="var(--color-primary)" /> 역할로 묶는 이유
            </CardTitle>
            <CardText>
              권한을 사람마다 관리하면 수가 폭발한다. 역할이라는 중간 계층을 두면, 권한 변경은
              역할 한 곳만 고치면 되고 감사·이해가 쉬워진다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <ShieldCheck size={20} color="var(--color-success)" /> 권한으로 검사하라
            </CardTitle>
            <CardText>
              엔드포인트는 역할 이름(<code>isAdmin</code>)이 아니라 권한(<code>article:write</code>)
              으로 검사하는 게 유연하다. 역할 구성이 바뀌어도 검사 코드는 그대로다.
            </CardText>
          </Card>
        </GridTwo>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="흔한 API 취약점 방어" />
        <Paragraph>
          OWASP가 정리한 흔한 위험들은 대부분 &lsquo;입력을 믿었거나, 검사를 빠뜨렸거나, 정보를
          흘린&rsquo; 데서 온다. 화려한 공격보다 기본 방어를 빠짐없이 하는 것이 실무 보안의
          90%다.
        </Paragraph>

        <Stack>
          <Card>
            <CardTitle>
              <Bug size={20} color="var(--color-warning)" /> 인젝션 (SQL 등)
            </CardTitle>
            <CardText>
              입력을 쿼리에 문자열로 이어 붙이면 공격자가 쿼리를 조작한다. <strong>파라미터
              바인딩(Prepared Statement)</strong>을 쓰면 입력이 데이터로만 취급돼 원천 차단된다.
              문자열 연결로 SQL을 만들지 않는다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <ShieldCheck size={20} color="var(--color-success)" /> 입력 검증과 최소 노출
            </CardTitle>
            <CardText>
              서버에서 타입·범위·형식을 다시 검증한다(클라이언트 검증은 신뢰 못 함). 에러
              메시지·응답에 스택트레이스나 내부 식별자를 흘리지 않는다.
            </CardText>
          </Card>
        </Stack>

        <BulletList>
          <Bullet>
            <strong>인가 누락(IDOR)</strong>: <code>/orders/123</code>에서 123이 내 것인지 항상
            검사한다. ID를 추측해 남의 자원에 접근하지 못하게.
          </Bullet>
          <Bullet>
            <strong>전송 구간 암호화</strong>: 모든 통신은 HTTPS(TLS)로. 토큰·쿠키는{' '}
            <code>Secure</code> 속성으로 평문 전송을 막는다.
          </Bullet>
          <Bullet>
            <strong>레이트 리밋</strong>: 로그인·인증 엔드포인트에 시도 횟수 제한을 둬 무차별
            대입과 남용을 막는다.
          </Bullet>
          <Bullet>
            <strong>CORS는 보안이 아니라 완화</strong>: 출처 제어일 뿐 인증을 대체하지 않는다.
            허용 출처를 좁게 두되, 인가는 별도로 한다.
          </Bullet>
        </BulletList>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <SmallHeading style={{ fontSize: '0.95rem' }}>
              <Dot /> 이어지는 기록
            </SmallHeading>
          </CardTitle>
          <SmallText>
            브라우저가 교차 출처 요청을 막아 생긴 실제 CORS 디버깅 사례는{' '}
            <Link
              href="/journal/cors-preflight"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              CORS preflight 디버깅기
            </Link>{' '}
            에서, 에러를 안전하게 응답으로 바꾸는 설계는{' '}
            <Link
              href="/architecture/resilience"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              에러 처리 &amp; 회복탄력성
            </Link>{' '}
            글에서 다룬다.
          </SmallText>
        </Card>
      </Section>

      <HeaderQuote>
        만드는 것과 지키는 것은 다른 기술이다.
        <br />
        <strong>인증과 인가를 나누고, 토큰을 신중히 운용하고, 입력을 믿지 마라.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
