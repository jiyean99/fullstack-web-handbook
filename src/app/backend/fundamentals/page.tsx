'use client'

import React from 'react'
import Link from 'next/link'
import {
  Workflow,
  Server,
  Layers,
  Boxes,
  Repeat,
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
  { id: 'section1', label: '1. 요청 한 건이 처리되는 흐름' },
  { id: 'section2', label: '2. 웹서버와 WAS' },
  { id: 'section3', label: '3. 애플리케이션 계층 구조' },
  { id: 'section4', label: '4. 무상태성과 수평 확장' },
  { id: 'section5', label: '5. 스레드와 커넥션 풀' },
]

export default function BackendFundamentalsPage() {
  return (
    <ContentDoc
      badge="Backend · 기본"
      badgeIcon={<Workflow size={12} />}
      title="백엔드 동작 원리"
      quote={
        <>
          프레임워크를 배우기 전에 &lsquo;요청 한 건이 서버 안에서 어떻게 흘러가는가&rsquo;를
          그릴 수 있어야 한다. 주소를 찾고, 연결을 맺고, 계층을 통과해 응답이 되돌아오는 이
          흐름이 모든 백엔드 기술의 공통 뼈대다. 이 장은 그 큰 그림을 먼저 세운다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="요청 한 건이 처리되는 흐름" />
        <Paragraph>
          브라우저 주소창에 URL을 입력하고 엔터를 누르는 순간부터 화면에 응답이 그려지기까지,
          요청은 여러 단계를 거친다. 백엔드를 이해한다는 건 이 흐름의 &lsquo;서버 쪽 절반&rsquo;을
          그릴 수 있다는 뜻이다.
        </Paragraph>

        <BulletList>
          <Bullet>
            <strong>주소 변환(DNS)</strong>: 도메인 이름을 실제 서버 IP로 바꾼다.
          </Bullet>
          <Bullet>
            <strong>연결 수립(TCP/TLS)</strong>: 서버와 연결을 맺고, HTTPS면 암호화 핸드셰이크를
            추가로 한다.
          </Bullet>
          <Bullet>
            <strong>HTTP 요청 전송</strong>: 메서드·경로·헤더·본문이 담긴 요청 메시지를 보낸다.
          </Bullet>
          <Bullet>
            <strong>서버 처리</strong>: 라우팅 → 검증 → 비즈니스 로직 → 데이터 접근을 거쳐 응답을
            만든다.
          </Bullet>
          <Bullet>
            <strong>HTTP 응답 반환</strong>: 상태 코드와 본문을 돌려준다. 연결은 재사용되거나
            닫힌다.
          </Bullet>
        </BulletList>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Workflow size={18} color="var(--color-primary)" /> 요청-응답이 기본 단위다
          </CardTitle>
          <CardText>
            백엔드는 결국 &lsquo;요청을 받아 응답을 만드는 함수&rsquo;의 집합이다. 메서드·상태
            코드 같은 약속의 세부는{' '}
            <Link
              href="/backend/http-rest"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              HTTP / REST API 설계
            </Link>{' '}
            글에서 다룬다. 여기서는 그 요청이 서버 &lsquo;안에서&rsquo; 어떻게 처리되는지에
            집중한다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="웹서버와 WAS" />
        <SectionIntro>
          요청이 서버에 도착하면 가장 먼저 만나는 건 보통 웹서버다. 정적인 파일은 웹서버가 직접
          내려주고, 로직이 필요한 요청만 뒤쪽의 애플리케이션 서버(WAS)로 넘긴다. 이 역할 분담을
          이해하면 배포 구조가 한결 선명해진다.
        </SectionIntro>

        <GridTwo>
          <Card>
            <CardTitle>
              <Server size={20} color="var(--color-primary)" /> 웹서버
            </CardTitle>
            <CardText>
              Nginx·Apache 같은 웹서버는 정적 파일 제공, TLS 종료, 로드 밸런싱, 리버스 프록시를
              맡는다. 빠르고 가벼우며 외부에 노출되는 &lsquo;관문&rsquo; 역할을 한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Boxes size={20} color="var(--color-success)" /> WAS(애플리케이션 서버)
            </CardTitle>
            <CardText>
              Tomcat·Uvicorn 같은 WAS는 우리가 작성한 코드를 실행해 동적인 응답을 만든다. DB
              조회·비즈니스 로직처럼 &lsquo;계산이 필요한&rsquo; 요청을 처리한다.
            </CardText>
          </Card>
        </GridTwo>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <Repeat size={18} color="var(--color-primary)" /> 왜 앞에 웹서버를 두나
          </CardTitle>
          <CardText>
            정적 자산을 WAS까지 보내지 않아 부하가 줄고, TLS·압축·캐싱 같은 공통 처리를 한곳에
            모을 수 있다. 또한 여러 WAS 인스턴스 앞에 두어 트래픽을 나눠주는 로드 밸런서로도
            쓰인다. 작은 서비스라면 WAS 하나로 시작해도 되지만, 커지면 이 분리가 거의 필수다.
          </CardText>
        </Card>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="애플리케이션 계층 구조" />
        <Paragraph>
          WAS 안으로 들어온 요청은 보통 <strong>컨트롤러 → 서비스 → 리포지토리</strong> 순으로
          흐른다. 각 계층은 자기 책임만 지고 아래 계층에만 의존한다. 이 단방향 흐름이 변경의
          파급을 가두고, 테스트와 유지보수를 쉽게 만든다.
        </Paragraph>

        <CodeBlock label="요청이 계층을 통과하는 경로 (의사 코드)">{`// 1) 컨트롤러: HTTP를 다루는 얇은 어댑터
POST /orders → OrderController.create(req)
   ↓ 입력 검증 후 도메인 입력으로 변환
// 2) 서비스: 비즈니스 규칙과 트랜잭션 경계
   OrderService.place(command)
   ↓ 재고 확인·금액 계산 등 '진짜 로직'
// 3) 리포지토리: 데이터 저장소 접근
   OrderRepository.save(order)
   ↓
[ Database ]`}</CodeBlock>

        <Stack>
          <Card>
            <CardTitle>
              <Layers size={20} color="var(--color-primary)" /> 계층마다 한 가지 책임
            </CardTitle>
            <CardText>
              컨트롤러는 HTTP 변환, 서비스는 비즈니스 로직과 트랜잭션, 리포지토리는 영속성만
              담당한다. 컨트롤러에 SQL이 있거나 리포지토리에 업무 규칙이 있으면 신호가 섞인
              것이다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <CheckCircle size={20} color="var(--color-success)" /> 단방향 의존
            </CardTitle>
            <CardText>
              위에서 아래로만 의존하면, DB를 바꿔도 컨트롤러는 그대로고 HTTP 형식을 바꿔도
              비즈니스 로직은 안전하다. 이 원리를 더 끌고 가면{' '}
              <Link
                href="/architecture/layered-hexagonal"
                style={{ color: 'var(--color-primary)', fontWeight: 600 }}
              >
                헥사고날 아키텍처
              </Link>
              가 된다.
            </CardText>
          </Card>
        </Stack>

        <Paragraph>
          이 계층 패턴을 Spring으로 구현한 구체적인 모습(애너테이션·DI·트랜잭션)은{' '}
          <Link
            href="/backend/spring-boot"
            style={{ color: 'var(--color-primary)', fontWeight: 600 }}
          >
            Spring Boot 실무 패턴
          </Link>{' '}
          글에서 이어서 본다.
        </Paragraph>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="무상태성과 수평 확장" />
        <SectionIntro>
          트래픽이 늘면 서버를 더 강하게(수직) 만들기보다, 같은 서버를 여러 대 띄워(수평) 나눠
          받는 편이 보통 낫다. 그런데 수평 확장이 가능하려면 서버가 &lsquo;무상태(stateless)&rsquo;
          여야 한다.
        </SectionIntro>

        <GridTwo>
          <Card>
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-warning)" /> 상태를 서버에 두면
            </CardTitle>
            <CardText>
              로그인 정보를 특정 서버의 메모리에 저장하면, 다음 요청이 다른 서버로 가는 순간
              세션이 사라진다. 서버를 늘릴수록 오히려 깨지기 쉬워진다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <CheckCircle size={20} color="var(--color-success)" /> 상태를 밖으로
            </CardTitle>
            <CardText>
              세션·캐시를 Redis 같은 외부 저장소로 빼고, 각 요청이 토큰처럼 필요한 정보를 함께
              들고 오게 하면, 어느 서버가 받아도 동일하게 처리된다. 그래서 마음껏 늘릴 수 있다.
            </CardText>
          </Card>
        </GridTwo>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Boxes size={18} color="var(--color-primary)" /> 무상태가 주는 것
          </CardTitle>
          <CardText>
            인스턴스를 자유롭게 추가·제거할 수 있어 오토스케일링과 무중단 배포가 쉬워진다. 한
            대가 죽어도 다른 대가 같은 요청을 받아낼 수 있어 장애에도 강하다. 인증을 무상태로
            구현하는 구체적인 방법(JWT·세션)은 실무 단계의 인증 글에서 다룬다.
          </CardText>
        </Card>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="스레드와 커넥션 풀" />
        <Paragraph>
          서버는 동시에 들어오는 여러 요청을 어떻게 처리할까? 전통적인 모델은 요청마다 스레드를
          하나씩 배정하는 방식이다. 이때 &lsquo;스레드&rsquo;와 &lsquo;DB 커넥션&rsquo;은 무한하지
          않은 자원이라는 점이 성능의 핵심이 된다.
        </Paragraph>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>자원</Th>
                <Th>역할</Th>
                <Th>고갈되면</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>스레드 풀</Td>
                <Td>동시에 처리할 수 있는 요청 수</Td>
                <Td>요청이 큐에서 대기 → 응답 지연</Td>
              </tr>
              <tr>
                <Td $muted>커넥션 풀</Td>
                <Td>동시에 열 수 있는 DB 연결 수</Td>
                <Td>쿼리가 연결을 기다림 → 타임아웃</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Stack>
          <Card>
            <CardTitle>
              <Repeat size={20} color="var(--color-primary)" /> 풀(pool)을 쓰는 이유
            </CardTitle>
            <CardText>
              스레드와 DB 연결은 만드는 비용이 크다. 미리 일정 개수를 만들어 두고 빌려 쓰고
              반납하는 풀 방식이, 매번 새로 만드는 것보다 훨씬 빠르고 안정적이다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-warning)" /> 블로킹이 풀을 묶는다
            </CardTitle>
            <CardText>
              느린 쿼리 하나가 스레드와 커넥션을 오래 붙잡으면, 그만큼 다른 요청이 쓸 자원이
              준다. 그래서 느린 쿼리는 단순한 한 요청의 문제가 아니라 전체 처리량의 문제다.
            </CardText>
          </Card>
        </Stack>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <SmallHeading style={{ fontSize: '0.95rem' }}>
              <Dot /> 다음 단계로
            </SmallHeading>
          </CardTitle>
          <SmallText>
            요청마다 블로킹하는 대신 적은 스레드로 많은 연결을 다루는 비동기 모델은{' '}
            <Link
              href="/backend/fastapi"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              Python · FastAPI
            </Link>{' '}
            글에서, 커넥션을 묶는 대표적 함정인 N+1 쿼리는{' '}
            <Link
              href="/journal/n-plus-one"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              N+1 쿼리 추적기
            </Link>{' '}
            기록에서 이어진다.
          </SmallText>
        </Card>
      </Section>

      <HeaderQuote>
        프레임워크가 달라도 요청-응답의 뼈대는 같다.
        <br />
        <strong>흐름·계층·자원이라는 기본기를 세우면, 그 위의 모든 기술이 빨리 붙는다.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
