'use client'

import React from 'react'
import {
  Layers,
  Network,
  Share2,
  Workflow,
  AlertTriangle,
  CheckCircle,
  FileCode,
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
  { id: 'section1', label: '1. 분산 환경의 도전: ACID에서 BASE로' },
  { id: 'section2', label: '2. 2PC (Two-Phase Commit)와 그 한계' },
  { id: 'section3', label: '3. Saga 패턴: 최종 일관성과 보상 트랜잭션' },
  { id: 'section4', label: '4. 안심하고 메시지 발행하기: Outbox 패턴' },
  { id: 'section5', label: '5. 분산 트랜잭션 설계 전략 비교' },
]

export default function MsaTransactionsPage() {
  return (
    <ContentDoc
      badge="Architecture · MSA"
      badgeIcon={<Layers size={12} />}
      title="MSA 분산 트랜잭션 패턴"
      quote={
        <>
          마이크로서비스 아키텍처(MSA)에서는 서비스마다 데이터베이스가 분리된다 (Database-per-Service).
          더 이상 단일 DB의 <code>@Transactional</code>만으로 여러 서비스에 걸친 비즈니스 일관성을 
          보장할 수 없다. 분산 환경에서 데이터 일관성을 맞추는 검증된 아키텍처 패턴들을 알아본다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="분산 환경의 도전: ACID에서 BASE로" />
        <Paragraph>
          전일적(Monolithic) 시스템에서는 하나의 DB 커넥션 안에서 모든 연산이 수행되므로 원자성(Atomicity)이 완벽히 보장된다. 
          반면 MSA에서는 주문 서비스(MySQL), 결제 서비스(PostgreSQL), 배송 서비스(MongoDB)가 물리적으로 단절되어 네트워크로 소통한다.
        </Paragraph>

        <GridTwo>
          <Card>
            <CardTitle style={{ color: 'var(--color-error)' }}>ACID의 한계</CardTitle>
            <CardText>
              전통적인 RDBMS 트랜잭션 성질. 하지만 네트워크 파티션과 지연이 일어나는 분산 환경에서는 강한 일관성을 
              유지하려 할수록 시스템 가용성(Availability)이 극도로 떨어진다.
            </CardText>
          </Card>
          <Card>
            <CardTitle style={{ color: 'var(--color-success)' }}>BASE의 정착</CardTitle>
            <CardText>
              <strong>Basically Available, Soft state, Eventual consistency</strong>. 즉, 일시적으로 일관성이 깨지더라도 
              시간이 흐르면 시스템이 결국 최종적인 일관성에 수렴한다는 느슨한 트랜잭션 패러다임이다.
            </CardText>
          </Card>
        </GridTwo>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="2PC (Two-Phase Commit)와 그 한계" />
        <SectionIntro>
          2PC는 분산 데이터베이스 환경에서 강한 일관성을 보장하기 위해 고안된 오랜 표준 알고리즘이다.
        </SectionIntro>

        <Paragraph>
          트랜잭션 조정자(Coordinator)가 모든 참가자(Participants)에게 준비 요청(Prepare)을 보내고, 
          모든 노드가 OK 응답을 보내면 커밋 요청(Commit)을 보내는 2단계 구조다.
        </Paragraph>

        <Card style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-warning)" /> 실무에서 2PC를 기피하는 이유
          </CardTitle>
          <CardText>
            <BulletList>
              <Bullet><strong>동기식 블로킹(Blocking)</strong>: 모든 노드가 작업이 끝날 때까지 락(Lock)을 쥐고 대기하므로 성능 병목과 교착 상태(Deadlock)를 초래한다.</Bullet>
              <Bullet><strong>SPOF (단일 장애점)</strong>: 조정자 노드가 2단계 도중 다운되면 전체 데이터베이스가 무기한 대기 상태에 빠질 수 있다.</Bullet>
              <Bullet>현대 오픈소스 NoSQL 및 대다수 MSA 프레임워크는 2PC 스펙(XA 트랜잭션)을 원활하게 지원하지 않는다.</Bullet>
            </BulletList>
          </CardText>
        </Card>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="Saga 패턴: 최종 일관성과 보상 트랜잭션" />
        <Paragraph>
          Saga 패턴은 하나의 거대한 분산 트랜잭션을 여러 개의 **로컬 트랜잭션의 체인**으로 분할하는 기법이다. 
          중간 단계에서 실패가 발생하면, 이전에 완료된 로컬 트랜잭션들의 효과를 되돌리기 위해 
          역행하는 <strong>보상 트랜잭션(Compensating Transaction)</strong>들을 순차적으로 실행한다.
        </Paragraph>

        <GridTwo>
          <Card>
            <CardTitle>
              <Share2 size={20} color="var(--color-primary)" /> 코레오그래피 (Choreography)
            </CardTitle>
            <CardText>
              중앙 컨트롤러 없이 각 서비스가 이벤트를 발행하고 구독하여 자율적으로 트랜잭션을 이어가는 방식.
              설계가 단순하고 결합도가 낮으나, 흐름이 복잡해질수록 전체 진행 상황을 모니터링하기 어렵다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Workflow size={20} color="var(--color-success)" /> 오케스트레이션 (Orchestration)
            </CardTitle>
            <CardText>
              중앙의 오케스트레이터(Saga Orchestrator)가 각 서비스에게 로컬 트랜잭션을 지시하고 결과를 보고받아 제어하는 방식.
              트랜잭션 복잡도가 높을 때 비즈니스 흐름을 파악하기 쉽고 롤백 시나리오를 명확히 설계할 수 있다.
            </CardText>
          </Card>
        </GridTwo>

        <CodeBlock label="Saga Orchestrator Pseudocode Example">{`class OrderSagaOrchestrator {
    public void startSaga(Order order) {
        try {
            paymentService.charge(order); // 1. 결제 로컬 트랜잭션
            inventoryService.deduct(order); // 2. 재고 감소 로컬 트랜잭션
            deliveryService.register(order); // 3. 배송 등록 로컬 트랜잭션
        } catch (Exception e) {
            rollbackSaga(order);
        }
    }

    private void rollbackSaga(Order order) {
        // 성공했던 단계들을 거꾸로 되돌림 (보상 트랜잭션)
        inventoryService.restore(order);
        paymentService.refund(order);
    }
}`}</CodeBlock>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="안심하고 메시지 발행하기: Outbox 패턴" />
        <Paragraph>
          Saga 패턴에서 각 단계가 이벤트를 신뢰성 있게 발행하는 것은 매우 중요하다. 
          비즈니스 로직(DB 저장)과 이벤트 메시지 발행(Kafka/RabbitMQ)이 하나의 로컬 트랜잭션으로 묶이지 않으면, 
          &quot;DB 저장은 성공했는데 메시지 전송은 실패&quot;하는 불일치 상황이 발생한다.
        </Paragraph>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> Transactional Outbox Pattern
          </CardTitle>
          <CardText>
            동일 RDBMS 안에 비즈니스 테이블 외에 **아웃박스(Outbox) 테이블**을 만들고, 
            로직 처리와 전송할 이벤트 메시지 입력을 하나의 로컬 트랜잭션으로 실행한다. 
            그 후 별도의 메시지 릴레이(CDC 엔진 또는 폴러)가 Outbox 테이블을 읽어 메시지 브로커로 안전하게 발행한다.
          </CardText>
        </Card>

        <CodeBlock label="Outbox Table Insertion Example">{`@Transactional
public void createOrder(OrderRequest request) {
    Order order = orderRepository.save(new Order(request));
    
    // 동일 트랜잭션 범위 내에서 아웃박스 테이블에 이벤트 적재
    outboxRepository.save(new OutboxEvent(
        "OrderCreated",
        order.getId(),
        toJson(new OrderCreatedEvent(order))
    ));
}`}</CodeBlock>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="분산 트랜잭션 설계 전략 비교" />
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>속성</Th>
                <Th>2PC (XA)</Th>
                <Th>Choreography Saga</Th>
                <Th>Orchestration Saga</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>일관성 모델</Td>
                <Td>강한 일관성 (Immediate)</Td>
                <Td>최종 일관성 (Eventual)</Td>
                <Td>최종 일관성 (Eventual)</Td>
              </tr>
              <tr>
                <Td $muted>서비스 간 결합도</Td>
                <Td $danger>매우 높음 (동기 락 대기)</Td>
                <Td $success>낮음 (비동기 이벤트)</Td>
                <Td>보통 (중앙 관리자 의존)</Td>
              </tr>
              <tr>
                <Td $muted>구현 복잡도</Td>
                <Td>낮음 (인프라가 자동 지원)</Td>
                <Td $danger>높음 (이벤트 추적/디버깅 어려움)</Td>
                <Td>보통 (관리 엔진 필요)</Td>
              </tr>
              <tr>
                <Td $muted>권장 사용처</Td>
                <Td>금융 정산 등 필수적인 정합성</Td>
                <Td>단순하고 결합도가 낮은 서비스 체인</Td>
                <Td>복잡한 비즈니스 워크플로우</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      </Section>

      <HeaderQuote>
        완벽한 강한 일관성을 고집하면 마이크로서비스는 서로의 볼모가 된다.
        <br />
        <strong>최종 일관성을 수용하고, 보상 트랜잭션과 Outbox 패턴을 구현하여 시스템 탄력성을 확보하라.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
