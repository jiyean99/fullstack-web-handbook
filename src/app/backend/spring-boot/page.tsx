'use client'

import React from 'react'
import {
  Layers,
  Database,
  FlaskConical,
  Repeat,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { SiSpring } from 'react-icons/si'
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
  { id: 'section1', label: '1. 레이어드 아키텍처' },
  { id: 'section2', label: '2. 의존성 주입 (DI)' },
  { id: 'section3', label: '3. 트랜잭션 관리' },
  { id: 'section4', label: '4. JPA 데이터 접근' },
  { id: 'section5', label: '5. 테스팅 전략' },
]

export default function SpringBootPage() {
  return (
    <ContentDoc
      badge="Spring Boot"
      badgeIcon={<SiSpring size={12} />}
      title="Spring Boot 실무 패턴"
      quote={
        <>
          Spring Boot의 힘은 &lsquo;관심사의 분리&rsquo;와 &lsquo;프레임워크가 떠받치는
          관례&rsquo;에서 나온다. 계층을 나누고, 결합을 느슨하게 하고, 트랜잭션 경계를 명확히
          하는 것 — 이 세 가지가 유지보수 가능한 백엔드의 뼈대다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="레이어드 아키텍처" />
        <Paragraph>
          요청은 <strong>Controller → Service → Repository</strong> 순으로 흐른다. 각 계층은
          자기 책임만 지고, 위 계층은 아래 계층에만 의존한다. 이 단방향 흐름이 변경의 파급을
          가둔다.
        </Paragraph>

        <Stack>
          <Card>
            <CardTitle>
              <Layers size={20} color="var(--color-primary)" /> Controller
            </CardTitle>
            <CardText>
              HTTP 요청/응답을 다루는 얇은 어댑터다. 요청을 받아 검증하고 Service를 호출한 뒤
              결과를 직렬화한다. <strong>비즈니스 로직을 두지 않는다.</strong>
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <SiSpring size={20} color="#6db33f" /> Service
            </CardTitle>
            <CardText>
              도메인 규칙과 유스케이스가 사는 곳이다. 트랜잭션 경계가 여기에 걸린다.{' '}
              <strong>HTTP나 SQL을 직접 알지 못하게</strong> 순수하게 유지한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Database size={20} color="var(--color-primary)" /> Repository
            </CardTitle>
            <CardText>
              영속성(DB) 접근만 담당한다. Spring Data JPA가 인터페이스만으로 기본 CRUD를
              구현해 준다.
            </CardText>
          </Card>
        </Stack>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 계층 분리의 효과
          </CardTitle>
          <CardText>
            HTTP 응답 코드 같은 웹 관심사가 Service로 새지 않으면, 같은 Service를 배치
            작업이나 다른 진입점에서도 재사용할 수 있다. 테스트도 계층별로 독립적으로 가능하다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="의존성 주입 (DI)" />
        <SectionIntro>
          객체가 필요한 의존성을 직접 <code>new</code>로 만들지 않고, 컨테이너가 주입해 준다.
          결합이 느슨해져 교체와 테스트가 쉬워진다.
        </SectionIntro>

        <CodeBlock label="OrderService.java">{`@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PaymentClient paymentClient;

    // ✅ 생성자 주입: 불변성 보장 + 테스트 시 mock 주입 용이
    public OrderService(OrderRepository orderRepository,
                        PaymentClient paymentClient) {
        this.orderRepository = orderRepository;
        this.paymentClient = paymentClient;
    }
}`}</CodeBlock>

        <GridTwo>
          <Card>
            <SmallHeading>
              <Dot />
              생성자 주입을 쓰는 이유
            </SmallHeading>
            <SmallText>
              필드를 <code>final</code>로 둘 수 있어 불변성이 보장되고, 의존성이 명시적으로
              드러난다. 테스트에서 mock을 생성자로 바로 넣을 수 있다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              @Autowired 필드 주입 지양
            </SmallHeading>
            <SmallText>
              필드 주입은 의존성을 숨기고 final을 못 쓰며 테스트가 어렵다. 순환 의존성도 늦게
              발견된다.
            </SmallText>
          </Card>
        </GridTwo>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="트랜잭션 관리" />
        <Paragraph>
          <code>@Transactional</code>은 메서드를 하나의 트랜잭션으로 묶는다. 정상 종료 시
          커밋, 런타임 예외 발생 시 롤백된다. 내부적으로 프록시가 메서드 호출을 가로채
          동작한다.
        </Paragraph>

        <CodeBlock label="@Transactional 동작">{`@Service
public class OrderService {

    @Transactional
    public void placeOrder(OrderCommand cmd) {
        Order order = orderRepository.save(cmd.toEntity());
        paymentClient.charge(order);   // 여기서 예외 → 위 save도 롤백
    }
}`}</CodeBlock>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-warning) 8%, var(--color-bg))',
            borderColor: 'var(--color-warning)',
          }}
        >
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-warning)" /> 흔한 함정
          </CardTitle>
          <BulletList>
            <Bullet>
              <strong>self-invocation</strong>: 같은 클래스 내부 메서드를 직접 호출하면
              프록시를 거치지 않아 <code>@Transactional</code>이 동작하지 않는다.
            </Bullet>
            <Bullet>
              <strong>체크 예외 기본 미롤백</strong>: 기본값은 런타임 예외에서만 롤백한다.
              체크 예외에서도 롤백하려면 <code>rollbackFor</code>를 지정한다.
            </Bullet>
            <Bullet>
              <strong>readOnly 활용</strong>: 조회 전용 메서드는{' '}
              <code>@Transactional(readOnly = true)</code>로 두면 성능과 의도 표현에 좋다.
            </Bullet>
          </BulletList>
        </Card>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>전파(Propagation)</Th>
                <Th>동작</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>REQUIRED (기본)</Td>
                <Td>기존 트랜잭션이 있으면 참여, 없으면 새로 생성</Td>
              </tr>
              <tr>
                <Td $muted>REQUIRES_NEW</Td>
                <Td>항상 새 트랜잭션 생성 (기존은 잠시 보류)</Td>
              </tr>
              <tr>
                <Td $muted>NESTED</Td>
                <Td>중첩 트랜잭션, 부분 롤백(savepoint) 가능</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="JPA 데이터 접근" />
        <SectionIntro>
          JPA는 객체와 테이블을 매핑(ORM)한다. 편리하지만, 내부 동작을 모르고 쓰면 N+1 같은
          성능 함정에 빠진다.
        </SectionIntro>

        <GridTwo>
          <Card>
            <CardTitle>
              <Repeat size={20} color="var(--color-error)" /> N+1 문제
            </CardTitle>
            <CardText>
              연관 엔티티를 지연 로딩하면, 목록 N건을 조회한 뒤 각 건의 연관 데이터를 위해
              쿼리가 N번 더 나간다. 총 N+1번의 쿼리가 발생한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <CheckCircle size={20} color="var(--color-success)" /> 해결책
            </CardTitle>
            <CardText>
              <strong>fetch join</strong>이나 <code>@EntityGraph</code>로 연관 데이터를 한
              번에 가져온다. 복잡한 동적 쿼리는 <strong>QueryDSL</strong>로 타입 안전하게
              작성한다.
            </CardText>
          </Card>
        </GridTwo>

        <CodeBlock label="fetch join으로 N+1 해결">{`// ❌ N+1: orders 조회 후 각 order.member 조회 쿼리 추가 발생
List<Order> orders = orderRepository.findAll();

// ✅ fetch join으로 한 번에 로딩
@Query("select o from Order o join fetch o.member")
List<Order> findAllWithMember();`}</CodeBlock>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Database size={18} color="var(--color-primary)" /> 연관관계 설계 원칙
          </CardTitle>
          <CardText>
            연관관계는 기본을 <strong>지연 로딩(LAZY)</strong>으로 두고, 필요한 곳에서만 fetch
            join으로 끌어온다. 즉시 로딩(EAGER)은 예측 불가능한 쿼리를 유발하므로 피한다.
          </CardText>
        </Card>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="테스팅 전략" />
        <Paragraph>
          계층별로 테스트 도구를 다르게 쓴다. 빠른 단위 테스트로 로직을 검증하고, 느리지만
          현실적인 통합 테스트로 경계를 검증하는 식으로 역할을 나눈다.
        </Paragraph>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>대상</Th>
                <Th>도구</Th>
                <Th>특징</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>Service 단위</Td>
                <Td>JUnit5 + Mockito</Td>
                <Td>의존성을 mock으로 대체, 빠르고 격리됨</Td>
              </tr>
              <tr>
                <Td $muted>Repository</Td>
                <Td>@DataJpaTest</Td>
                <Td>JPA 슬라이스만 로딩해 쿼리 검증</Td>
              </tr>
              <tr>
                <Td $muted>Controller</Td>
                <Td>@WebMvcTest + MockMvc</Td>
                <Td>HTTP 계층만 검증, Service는 mock</Td>
              </tr>
              <tr>
                <Td $muted>통합(E2E)</Td>
                <Td>Testcontainers</Td>
                <Td>실제 DB를 컨테이너로 띄워 현실적 검증</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <CodeBlock label="OrderServiceTest.java">{`@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock OrderRepository orderRepository;
    @InjectMocks OrderService orderService;

    @Test
    void 주문이_저장된다() {
        given(orderRepository.save(any())).willReturn(order);

        orderService.placeOrder(command);

        then(orderRepository).should().save(any());
    }
}`}</CodeBlock>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <FlaskConical size={18} color="var(--color-primary)" /> Testcontainers의 가치
          </CardTitle>
          <CardText>
            H2 같은 인메모리 DB는 실제 운영 DB(PostgreSQL 등)와 방언이 달라 통과하던 테스트가
            운영에서 깨질 수 있다. Testcontainers는 실제 DB 이미지를 띄워 이 간극을 없앤다.
          </CardText>
        </Card>
      </Section>

      <HeaderQuote>
        프레임워크가 떠받치는 관례를 이해하고 쓰는 개발자와, 그냥 동작하니까 쓰는 개발자의
        코드는 6개월 뒤 완전히 다른 유지보수성을 갖는다.
        <br />
        <strong>계층을 나누고, 트랜잭션 경계를 알고, JPA의 쿼리를 의식하라.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
