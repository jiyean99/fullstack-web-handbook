'use client'

import React from 'react'
import {
  Landmark,
  Hexagon,
  Plug,
  ShieldCheck,
  FlaskConical,
  CheckCircle,
  AlertTriangle,
  ArrowDown,
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
  { id: 'section1', label: '1. 계층 분리 원칙' },
  { id: 'section2', label: '2. Controller 규칙' },
  { id: 'section3', label: '3. Service 규칙' },
  { id: 'section4', label: '4. 포트와 어댑터' },
  { id: 'section5', label: '5. 도메인 독립성' },
  { id: 'section6', label: '6. 테스트 용이성' },
]

export default function LayeredHexagonalPage() {
  return (
    <ContentDoc
      badge="Architecture"
      badgeIcon={<Landmark size={12} />}
      title="레이어드 & 헥사고날 아키텍처"
      quote={
        <>
          아키텍처의 목표는 &lsquo;변경의 비용을 낮추는 것&rsquo;이다. 계층을 나누고 의존
          방향을 한쪽으로 모으면, 한 부분을 바꿔도 다른 부분이 흔들리지 않는다. 레이어드에서
          출발해 도메인을 더 강하게 보호하는 헥사고날까지 이어서 정리한다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="계층 분리 원칙" />
        <Paragraph>
          레이어드 아키텍처는 시스템을 책임에 따라 수평 계층으로 나눈다. 핵심은{' '}
          <strong>의존 방향이 항상 한쪽(위 → 아래)</strong>이라는 점이다. 아래 계층은 위
          계층의 존재를 몰라야 한다.
        </Paragraph>

        <Stack>
          <Card>
            <CardTitle>
              <ArrowDown size={20} color="var(--color-primary)" /> Presentation 계층
            </CardTitle>
            <CardText>
              사용자·외부 시스템과의 입출력을 담당한다. HTTP 요청을 받고 응답을 직렬화한다.
              비즈니스 규칙은 알지 못한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <ArrowDown size={20} color="var(--color-primary)" /> Business(Domain) 계층
            </CardTitle>
            <CardText>
              애플리케이션의 핵심 규칙이 사는 곳이다. 가장 안정적이어야 하며, 프레임워크나 DB
              기술에 의존하지 않는 것이 이상적이다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <ArrowDown size={20} color="var(--color-primary)" /> Data(Persistence) 계층
            </CardTitle>
            <CardText>
              영속성 저장소(DB, 외부 API)와의 통신을 담당한다. 도메인이 요구하는 데이터를
              저장하고 꺼내온다.
            </CardText>
          </Card>
        </Stack>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 단방향 의존의 가치
          </CardTitle>
          <CardText>
            의존이 한 방향이면 DB 기술을 바꿔도 도메인 코드는 그대로다. 반대로 도메인이 DB를
            직접 알면, 저장소 변경이 핵심 로직까지 번진다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="Controller 규칙: 얇은 어댑터로" />
        <SectionIntro>
          Controller는 웹 계층과 도메인 사이의 번역기다. 비즈니스 로직을 담는 순간 테스트가
          어려워지고 재사용이 막힌다.
        </SectionIntro>

        <CodeBlock label="UserController.java">{`@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponse> create(@RequestBody @Valid CreateUserRequest req) {
        // ✅ 검증 → 위임 → 변환. 비즈니스 판단은 Service에.
        User user = userService.create(req.toCommand());
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(UserResponse.from(user));
    }
}`}</CodeBlock>

        <BulletList>
          <Bullet>요청 DTO 검증과 도메인 커맨드로의 변환만 담당한다.</Bullet>
          <Bullet>분기·계산·조건 같은 도메인 판단을 넣지 않는다.</Bullet>
          <Bullet>
            응답은 도메인 객체를 그대로 노출하지 않고 응답 DTO로 변환해 내보낸다.
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="Service 규칙: 순수한 도메인 규칙" />
        <Paragraph>
          Service는 유스케이스를 조립한다. 여기서 가장 경계해야 할 것은{' '}
          <strong>웹 기술(HTTP 상태 코드, 서블릿 객체)이 스며드는 것</strong>이다.
        </Paragraph>

        <GridTwo>
          <Card
            style={{
              background: 'color-mix(in srgb, var(--color-error) 7%, var(--color-bg))',
              borderColor: 'var(--color-error)',
            }}
          >
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-error)" /> 나쁜 예
            </CardTitle>
            <CardText>
              Service가 <code>ResponseEntity</code>나 HTTP 404를 반환한다. 웹이 아닌 곳(배치,
              테스트)에서 재사용할 수 없게 된다.
            </CardText>
          </Card>
          <Card
            style={{
              background: 'color-mix(in srgb, var(--color-success) 7%, var(--color-bg))',
              borderColor: 'var(--color-success)',
            }}
          >
            <CardTitle>
              <CheckCircle size={20} color="var(--color-success)" /> 좋은 예
            </CardTitle>
            <CardText>
              Service는 도메인 예외(<code>UserNotFoundException</code>)를 던지고, 그것을 HTTP
              코드로 번역하는 일은 Controller나 예외 핸들러가 맡는다.
            </CardText>
          </Card>
        </GridTwo>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="포트와 어댑터 (헥사고날)" />
        <SectionIntro>
          레이어드를 한 단계 더 밀어붙인 것이 헥사고날(포트 &amp; 어댑터) 아키텍처다. 도메인을
          중심에 두고, 외부와의 모든 접점을 &lsquo;포트(인터페이스)&rsquo;로 추상화한다.
        </SectionIntro>

        <Stack>
          <Card>
            <CardTitle>
              <Plug size={20} color="var(--color-primary)" /> Inbound Port
            </CardTitle>
            <CardText>
              외부에서 도메인을 호출하는 입구다(유스케이스 인터페이스). Controller 같은 인바운드
              어댑터가 이 포트를 호출한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Hexagon size={20} color="var(--color-primary)" /> Outbound Port
            </CardTitle>
            <CardText>
              도메인이 외부(DB, 메시지 큐)에 요청하는 출구다. 도메인은 포트 인터페이스만 알고,
              실제 구현(JPA 어댑터 등)은 바깥에서 주입된다.
            </CardText>
          </Card>
        </Stack>

        <CodeBlock label="port & adapter">{`// 도메인이 정의한 출구(포트)
public interface LoadUserPort {
    Optional<User> findById(UserId id);
}

// 바깥의 구현(어댑터) — 도메인은 이 클래스를 모른다
@Repository
class UserJpaAdapter implements LoadUserPort {
    public Optional<User> findById(UserId id) { /* JPA 조회 */ }
}`}</CodeBlock>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>구분</Th>
                <Th>레이어드</Th>
                <Th>헥사고날</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>의존 방향</Td>
                <Td>위 → 아래 (도메인이 DB에 의존 가능)</Td>
                <Td>항상 도메인 안쪽으로 (의존성 역전)</Td>
              </tr>
              <tr>
                <Td $muted>외부 접점</Td>
                <Td>계층으로 구분</Td>
                <Td>포트(인터페이스)로 추상화</Td>
              </tr>
              <tr>
                <Td $muted>교체 용이성</Td>
                <Td>보통</Td>
                <Td>높음 (어댑터만 갈아끼움)</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="도메인 독립성" />
        <Paragraph>
          헥사고날의 핵심 효과는 &lsquo;도메인이 프레임워크를 모른다&rsquo;는 것이다. 의존성
          역전(DIP)으로 도메인이 인터페이스를 정의하고, 구현은 바깥에서 끼워 넣는다.
        </Paragraph>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <ShieldCheck size={18} color="var(--color-primary)" /> 도메인을 지키면
          </CardTitle>
          <BulletList>
            <Bullet>
              JPA를 MyBatis로, REST를 gRPC로 바꿔도 도메인 코드는 한 줄도 바뀌지 않는다.
            </Bullet>
            <Bullet>
              프레임워크 버전 업그레이드의 충격이 어댑터 계층에 갇힌다.
            </Bullet>
            <Bullet>도메인 규칙이 기술 잡음 없이 코드에서 또렷이 읽힌다.</Bullet>
          </BulletList>
        </Card>
      </Section>

      <Section id="section6">
        <SectionTitleBlock num="6" title="테스트 용이성" />
        <Paragraph>
          포트를 중심에 두면 테스트가 극적으로 쉬워진다. 도메인을 검증할 때 DB나 웹 서버를 띄울
          필요 없이, 포트를 가짜 구현(fake/mock)으로 갈아끼우면 된다.
        </Paragraph>

        <CodeBlock label="domain test">{`// 도메인 테스트: 인메모리 fake 어댑터만 주입 → DB 불필요
class RegisterUserServiceTest {

    LoadUserPort loadUserPort = new InMemoryUserAdapter();
    RegisterUserService service = new RegisterUserService(loadUserPort);

    @Test
    void 중복_이메일이면_예외() {
        // given: fake에 기존 사용자 등록
        // when/then: 도메인 규칙만 빠르게 검증
    }
}`}</CodeBlock>

        <GridTwo>
          <Card>
            <SmallHeading>
              <Dot />
              빠른 피드백
            </SmallHeading>
            <SmallText>
              인프라 없이 순수 도메인 로직만 검증하므로 테스트가 수 밀리초 안에 끝난다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              안정적인 테스트
            </SmallHeading>
            <SmallText>
              네트워크·DB에 의존하지 않아 외부 요인으로 깨지는 플래키(flaky) 테스트가 줄어든다.
            </SmallText>
          </Card>
        </GridTwo>

        <Card style={{ background: 'var(--color-surface)', marginTop: 'var(--sp-4)' }}>
          <CardTitle>
            <FlaskConical size={18} color="var(--color-primary)" /> 테스트 피라미드
          </CardTitle>
          <CardText>
            도메인 단위 테스트를 넓은 바닥으로, 어댑터 통합 테스트를 그 위에, E2E를 꼭대기에
            소수만 둔다. 아키텍처가 좋을수록 바닥(빠른 테스트)을 두껍게 가져갈 수 있다.
          </CardText>
        </Card>
      </Section>

      <HeaderQuote>
        좋은 아키텍처는 결정을 미룰 수 있게 해준다.
        <br />
        <strong>도메인을 중심에 두고, 외부와의 접점을 인터페이스로 가두어라.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
