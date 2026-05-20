'use client'

import React from 'react'
import {
  Globe,
  ArrowLeftRight,
  ListChecks,
  Boxes,
  AlertTriangle,
  CheckCircle,
  FileWarning,
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
  { id: 'section1', label: '1. HTTP 메서드 의미론' },
  { id: 'section2', label: '2. 멱등성과 안전성' },
  { id: 'section3', label: '3. 상태 코드 체계' },
  { id: 'section4', label: '4. RESTful 리소스 설계' },
  { id: 'section5', label: '5. RFC 7807 에러 형식' },
]

export default function HttpRestPage() {
  return (
    <ContentDoc
      badge="HTTP / REST"
      badgeIcon={<Globe size={12} />}
      title="HTTP / REST API 설계"
      quote={
        <>
          REST는 화려한 기술이 아니라 &lsquo;약속&rsquo;이다. HTTP가 이미 정의해 둔 메서드와
          상태 코드의 의미를 지키면, 별도 문서 없이도 클라이언트가 API의 동작을 예측할 수
          있다. 그 약속의 핵심을 정리한다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="HTTP 메서드 의미론" />
        <Paragraph>
          메서드는 &lsquo;리소스에 무엇을 할 것인가&rsquo;를 나타낸다. 동작을 URL에 담지 않고
          (예: <code>/users/delete</code>) 메서드로 표현하는 것이 REST의 출발점이다.
        </Paragraph>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>메서드</Th>
                <Th>의미</Th>
                <Th>예시</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>GET</Td>
                <Td>리소스 조회</Td>
                <Td>GET /users/42</Td>
              </tr>
              <tr>
                <Td $muted>POST</Td>
                <Td>리소스 생성</Td>
                <Td>POST /users</Td>
              </tr>
              <tr>
                <Td $muted>PUT</Td>
                <Td>리소스 전체 교체</Td>
                <Td>PUT /users/42</Td>
              </tr>
              <tr>
                <Td $muted>PATCH</Td>
                <Td>리소스 부분 수정</Td>
                <Td>PATCH /users/42</Td>
              </tr>
              <tr>
                <Td $muted>DELETE</Td>
                <Td>리소스 삭제</Td>
                <Td>DELETE /users/42</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <ArrowLeftRight size={18} color="var(--color-primary)" /> PUT vs PATCH
          </CardTitle>
          <CardText>
            PUT은 리소스를 통째로 교체하므로 보내지 않은 필드는 비워진다고 본다. PATCH는 보낸
            필드만 부분 수정한다. 수정 폼에서 일부만 보낸다면 PATCH가 의미상 맞다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="멱등성과 안전성" />
        <SectionIntro>
          API를 견고하게 만들려면 각 메서드의 &lsquo;안전성(safe)&rsquo;과
          &lsquo;멱등성(idempotent)&rsquo;을 이해해야 한다. 특히 네트워크 재시도 상황에서
          중요하다.
        </SectionIntro>

        <GridTwo>
          <Card>
            <CardTitle>
              <CheckCircle size={20} color="var(--color-success)" /> 안전(Safe)
            </CardTitle>
            <CardText>
              서버 상태를 바꾸지 않는 메서드다. GET이 대표적이다. 안전한 메서드는 자유롭게
              캐싱하고 미리 가져올 수 있다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Boxes size={20} color="var(--color-primary)" /> 멱등(Idempotent)
            </CardTitle>
            <CardText>
              같은 요청을 여러 번 보내도 결과가 동일한 메서드다. GET·PUT·DELETE는 멱등하지만,
              POST는 호출할 때마다 새 리소스를 만들어 멱등하지 않다.
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
            <AlertTriangle size={18} color="var(--color-warning)" /> 재시도와 중복 생성
          </CardTitle>
          <CardText>
            네트워크 타임아웃으로 POST를 재시도하면 리소스가 중복 생성될 수 있다. 결제·주문
            같은 곳에서는 <strong>멱등성 키(Idempotency-Key)</strong>를 헤더로 받아 중복을
            막는다.
          </CardText>
        </Card>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="상태 코드 체계" />
        <Paragraph>
          상태 코드는 응답의 결과를 한눈에 알려주는 신호다. 200으로 뭉뚱그리고 본문에
          <code>{`{ success: false }`}</code>를 넣는 방식은 HTTP의 의미를 버리는 안티패턴이다.
        </Paragraph>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>분류</Th>
                <Th>의미</Th>
                <Th>대표 코드</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>2xx</Td>
                <Td>성공</Td>
                <Td>200 OK · 201 Created · 204 No Content</Td>
              </tr>
              <tr>
                <Td $muted>3xx</Td>
                <Td>리다이렉션</Td>
                <Td>301 Moved · 304 Not Modified</Td>
              </tr>
              <tr>
                <Td $muted>4xx</Td>
                <Td>클라이언트 오류</Td>
                <Td>400 · 401 · 403 · 404 · 409</Td>
              </tr>
              <tr>
                <Td $muted>5xx</Td>
                <Td>서버 오류</Td>
                <Td>500 Internal · 503 Unavailable</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Stack>
          <Card>
            <SmallHeading>
              <Dot />
              자주 헷갈리는 코드
            </SmallHeading>
            <SmallText>
              <strong>401</strong>은 인증 안 됨(누구인지 모름), <strong>403</strong>은 인증은
              됐지만 권한 없음. <strong>409 Conflict</strong>는 중복 가입처럼 현재 상태와
              충돌할 때 쓴다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              201과 Location
            </SmallHeading>
            <SmallText>
              생성 성공 시 <strong>201 Created</strong>와 함께 <code>Location</code> 헤더에
              새 리소스의 URI를 담아주면 클라이언트가 바로 접근할 수 있다.
            </SmallText>
          </Card>
        </Stack>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="RESTful 리소스 설계" />
        <SectionIntro>
          URI는 &lsquo;행위&rsquo;가 아니라 &lsquo;자원(명사)&rsquo;을 가리켜야 한다. 행위는
          메서드가, 대상은 URI가 표현한다.
        </SectionIntro>

        <CodeBlock label="리소스 설계 비교">{`# ❌ 동사·행위가 URI에 노출
POST /createUser
GET  /getUserOrders?userId=42
POST /users/42/delete

# ✅ 명사(자원) 중심, 계층 구조
POST   /users                  # 사용자 생성
GET    /users/42               # 단일 조회
GET    /users/42/orders        # 하위 컬렉션
DELETE /users/42               # 삭제`}</CodeBlock>

        <BulletList>
          <Bullet>
            <strong>컬렉션은 복수형</strong>: <code>/users</code>, <code>/orders</code>처럼
            복수 명사로 통일한다.
          </Bullet>
          <Bullet>
            <strong>계층으로 소유 관계 표현</strong>: <code>/users/42/orders</code>는 42번
            사용자의 주문을 의미한다.
          </Bullet>
          <Bullet>
            <strong>필터·정렬·페이징은 쿼리스트링</strong>:{' '}
            <code>/orders?status=paid&amp;sort=-createdAt&amp;page=2</code>처럼 자원의 부분
            집합을 쿼리로 표현한다.
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="RFC 7807 에러 형식" />
        <Paragraph>
          에러 응답 형식이 API마다 제각각이면 클라이언트가 매번 다르게 파싱해야 한다. RFC
          7807(Problem Details)은 에러 본문의 표준 형태를 정의해 이 문제를 해결한다.
        </Paragraph>

        <CodeBlock label="application/problem+json">{`HTTP/1.1 409 Conflict
Content-Type: application/problem+json

{
  "type": "https://api.example.com/errors/duplicate-email",
  "title": "이미 사용 중인 이메일입니다",
  "status": 409,
  "detail": "user@example.com 은 이미 가입된 이메일입니다.",
  "instance": "/users"
}`}</CodeBlock>

        <GridTwo>
          <Card>
            <CardTitle>
              <ListChecks size={20} color="var(--color-primary)" /> 표준 필드
            </CardTitle>
            <CardText>
              <code>type</code>(에러 종류 URI), <code>title</code>(요약),{' '}
              <code>status</code>(HTTP 코드), <code>detail</code>(상세), <code>instance</code>
              (발생 위치)로 구성된다. 도메인별 필드는 자유롭게 확장한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <FileWarning size={20} color="var(--color-success)" /> 일관성의 가치
            </CardTitle>
            <CardText>
              모든 에러가 같은 형태를 가지면, 클라이언트는 공통 에러 핸들러 하나로 모든 에러를
              처리할 수 있다. 계약(contract)이 명확해진다.
            </CardText>
          </Card>
        </GridTwo>
      </Section>

      <HeaderQuote>
        좋은 API는 새 문서를 읽지 않아도 동작이 예측된다.
        <br />
        <strong>메서드·상태 코드·자원이라는 HTTP의 약속을 그대로 지키는 것이 곧 REST다.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
