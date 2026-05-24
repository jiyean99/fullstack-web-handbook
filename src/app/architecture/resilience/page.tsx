'use client'

import React from 'react'
import {
  TriangleAlert,
  ShieldAlert,
  Hash,
  Plug,
  Activity,
  LifeBuoy,
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
  { id: 'section1', label: '1. 전역 예외 핸들러' },
  { id: 'section2', label: '2. 도메인별 에러 코드' },
  { id: 'section3', label: '3. RFC 7807 응답 구조화' },
  { id: 'section4', label: '4. Circuit Breaker 상태 전이' },
  { id: 'section5', label: '5. Resilience4j 구현' },
  { id: 'section6', label: '6. Fallback 전략' },
]

export default function ResiliencePage() {
  return (
    <ContentDoc
      badge="Resilience"
      badgeIcon={<TriangleAlert size={12} />}
      title="에러 처리 & 회복탄력성"
      quote={
        <>
          장애는 일어난다. 중요한 것은 &lsquo;장애가 나지 않게&rsquo;가 아니라 &lsquo;장애가
          나도 무너지지 않게&rsquo; 설계하는 것이다. 에러를 일관되게 다루는 법과, 한 부분의
          장애가 전체로 번지지 않게 막는 Circuit Breaker를 정리한다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="전역 예외 핸들러" />
        <Paragraph>
          예외 처리를 각 Controller마다 try-catch로 흩뿌리면 중복되고 일관성이 깨진다. Spring의{' '}
          <code>@RestControllerAdvice</code>로 예외 처리를 한곳에 모아 횡단 관심사로 다룬다.
        </Paragraph>

        <CodeBlock label="GlobalExceptionHandler.java">{`@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ProblemDetail> handleNotFound(UserNotFoundException e) {
        ProblemDetail body = ProblemDetail
            .forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        body.setTitle("사용자를 찾을 수 없습니다");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> handleValidation(...) { /* 400 */ }
}`}</CodeBlock>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 도메인 예외 → HTTP 번역
          </CardTitle>
          <CardText>
            Service는 순수한 도메인 예외만 던지고, 그것을 HTTP 상태 코드로 번역하는 책임은 전역
            핸들러가 가져간다. 도메인과 웹 관심사가 분리된다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="도메인별 에러 코드" />
        <SectionIntro>
          HTTP 상태 코드만으로는 &lsquo;왜&rsquo; 실패했는지 부족하다. 같은 400이라도 원인이
          여러 가지다. 도메인 경계를 기준으로 고유한 에러 코드를 설계하면 클라이언트가 분기
          처리하기 쉽다.
        </SectionIntro>

        <CodeBlock label="ErrorCode.java">{`public enum ErrorCode {
    USER_NOT_FOUND("U001", "사용자를 찾을 수 없습니다", 404),
    DUPLICATE_EMAIL("U002", "이미 사용 중인 이메일입니다", 409),
    ORDER_ALREADY_PAID("O001", "이미 결제된 주문입니다", 409);

    private final String code;
    private final String message;
    private final int status;
}`}</CodeBlock>

        <BulletList>
          <Bullet>
            <strong>접두사로 도메인 구분</strong>: <code>U</code>(User), <code>O</code>
            (Order)처럼 코드만 봐도 어느 도메인의 에러인지 안다.
          </Bullet>
          <Bullet>
            <strong>한곳에서 관리</strong>: enum으로 모으면 에러 목록이 곧 문서가 되고, 중복·
            누락을 컴파일 단계에서 막는다.
          </Bullet>
          <Bullet>
            <strong>클라이언트 계약</strong>: 코드 값은 메시지가 바뀌어도 유지되므로,
            클라이언트는 코드로 안정적으로 분기한다.
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="RFC 7807로 응답 구조화" />
        <Paragraph>
          앞의 에러 코드를 RFC 7807(Problem Details) 형식에 실어 보내면, 표준 형태 + 도메인
          정보를 동시에 만족한다. 모든 에러가 같은 모양을 갖게 된다.
        </Paragraph>

        <CodeBlock label="application/problem+json">{`{
  "type": "https://api.example.com/errors/duplicate-email",
  "title": "이미 사용 중인 이메일입니다",
  "status": 409,
  "detail": "user@example.com 은 이미 가입되어 있습니다.",
  "instance": "/users",
  "code": "U002"
}`}</CodeBlock>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <Hash size={18} color="var(--color-primary)" /> 표준 + 확장
          </CardTitle>
          <CardText>
            RFC 7807은 추가 필드 확장을 허용한다. 표준 필드(type/title/status/detail)는 공통
            핸들러가 채우고, <code>code</code> 같은 도메인 필드를 덧붙이면 된다.
          </CardText>
        </Card>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="Circuit Breaker 상태 전이" />
        <SectionIntro>
          외부 서비스가 느려지거나 죽으면, 그 호출을 계속 시도하다 내 시스템의 스레드까지
          고갈된다. Circuit Breaker(회로 차단기)는 실패가 임계치를 넘으면 호출을 빠르게 끊어
          장애 전파를 막는다.
        </SectionIntro>

        <Stack>
          <Card>
            <CardTitle>
              <Activity size={20} color="var(--color-success)" /> Closed (정상)
            </CardTitle>
            <CardText>
              요청을 그대로 통과시킨다. 실패율을 집계하다가 임계치를 넘으면 Open으로 전이한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <ShieldAlert size={20} color="var(--color-error)" /> Open (차단)
            </CardTitle>
            <CardText>
              호출을 즉시 거부(또는 fallback)한다. 죽은 서비스를 두드리지 않으니 빠르게 실패하고
              자원을 보호한다. 일정 시간 뒤 Half-Open으로 간다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Plug size={20} color="var(--color-warning)" /> Half-Open (탐색)
            </CardTitle>
            <CardText>
              소수의 요청만 흘려보내 회복 여부를 확인한다. 성공하면 Closed로 복귀, 실패하면 다시
              Open으로 돌아간다.
            </CardText>
          </Card>
        </Stack>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="Resilience4j 구현" />
        <Paragraph>
          Spring 환경에서는 <strong>Resilience4j</strong>로 어노테이션 기반 Circuit Breaker를
          쉽게 적용한다. 임계치와 대기 시간만 설정하면 상태 전이는 라이브러리가 관리한다.
        </Paragraph>

        <CodeBlock label="PaymentClient.java + application.yml">{`@CircuitBreaker(name = "payment", fallbackMethod = "fallback")
public PaymentResult charge(Order order) {
    return paymentApi.charge(order); // 외부 결제 API 호출
}

public PaymentResult fallback(Order order, Throwable t) {
    return PaymentResult.pending(); // 회로가 열리면 여기로
}

# application.yml
resilience4j.circuitbreaker.instances.payment:
  failure-rate-threshold: 50      # 실패율 50% 넘으면 Open
  wait-duration-in-open-state: 10s
  sliding-window-size: 20`}</CodeBlock>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>설정</Th>
                <Th>의미</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>failure-rate-threshold</Td>
                <Td>이 실패율(%)을 넘으면 회로를 연다</Td>
              </tr>
              <tr>
                <Td $muted>wait-duration-in-open-state</Td>
                <Td>Open 상태로 머무는 시간 (이후 Half-Open)</Td>
              </tr>
              <tr>
                <Td $muted>sliding-window-size</Td>
                <Td>실패율을 집계하는 최근 호출 수</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      </Section>

      <Section id="section6">
        <SectionTitleBlock num="6" title="Fallback 전략" />
        <Paragraph>
          회로가 열렸을 때 무엇을 돌려줄 것인가가 사용자 경험을 좌우한다. 목표는 전체 실패가
          아니라 <strong>우아한 성능 저하(graceful degradation)</strong>다.
        </Paragraph>

        <GridTwo>
          <Card>
            <SmallHeading>
              <Dot />
              캐시된 값 반환
            </SmallHeading>
            <SmallText>
              추천·랭킹처럼 최신성이 덜 중요한 데이터는 마지막으로 성공한 캐시 값을 보여줘
              화면을 유지한다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              기본값·빈 결과
            </SmallHeading>
            <SmallText>
              부가 기능(연관 상품 등)은 빈 목록으로 대체해, 핵심 기능은 계속 동작하게 한다.
            </SmallText>
          </Card>
        </GridTwo>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <LifeBuoy size={18} color="var(--color-primary)" /> 핵심 원칙
          </CardTitle>
          <CardText>
            부가 기능의 장애가 핵심 거래(결제·주문)를 막아서는 안 된다. 의존성의 중요도를 나누고,
            덜 중요한 의존성일수록 너그러운 fallback을 둔다.
          </CardText>
        </Card>
      </Section>

      <HeaderQuote>
        견고한 시스템은 장애가 없는 시스템이 아니라, 장애를 격리하고 회복하는 시스템이다.
        <br />
        <strong>에러를 일관되게 표현하고, 실패를 빠르게 차단하고, 우아하게 후퇴하라.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
