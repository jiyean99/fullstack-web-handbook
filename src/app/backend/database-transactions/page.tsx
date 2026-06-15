'use client'

import React from 'react'
import Link from 'next/link'
import {
  Database,
  ShieldCheck,
  Lock,
  GitCompareArrows,
  Search,
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
  { id: 'section1', label: '1. 트랜잭션과 ACID' },
  { id: 'section2', label: '2. 격리 수준과 이상 현상' },
  { id: 'section3', label: '3. 락과 동시성 제어' },
  { id: 'section4', label: '4. 인덱스와 실행 계획' },
  { id: 'section5', label: '5. N+1과 쿼리 성능' },
]

export default function DatabaseTransactionsPage() {
  return (
    <ContentDoc
      badge="Backend · 심화"
      badgeIcon={<Database size={12} />}
      title="데이터베이스와 트랜잭션 심화"
      quote={
        <>
          데이터 계층은 백엔드의 진실이 저장되는 곳이다. 그래서 &lsquo;어디까지 한 묶음으로
          처리되는가(트랜잭션)&rsquo;, &lsquo;동시에 건드리면 어떻게 되는가(격리·락)&rsquo;,
          &lsquo;왜 느린가(인덱스)&rsquo;를 모르면 견고한 서버를 만들 수 없다. 프레임워크가
          가려준 그 아래를 들여다본다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="트랜잭션과 ACID" />
        <Paragraph>
          트랜잭션은 &lsquo;전부 성공하거나 전부 실패하는&rsquo; 작업의 묶음이다. 계좌 이체에서
          출금만 되고 입금이 안 되는 일이 없도록, 여러 쿼리를 하나의 단위로 묶는다. 이 보장의
          성질을 네 글자로 요약한 것이 ACID다.
        </Paragraph>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>속성</Th>
                <Th>뜻</Th>
                <Th>없으면</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>Atomicity (원자성)</Td>
                <Td>전부 반영되거나 전부 취소</Td>
                <Td>출금만 되고 입금이 누락</Td>
              </tr>
              <tr>
                <Td $muted>Consistency (일관성)</Td>
                <Td>제약 조건이 항상 유지</Td>
                <Td>잔액이 음수가 되는 등 규칙 위반</Td>
              </tr>
              <tr>
                <Td $muted>Isolation (격리성)</Td>
                <Td>동시 트랜잭션이 서로 간섭하지 않음</Td>
                <Td>중간 상태를 다른 작업이 읽음</Td>
              </tr>
              <tr>
                <Td $muted>Durability (지속성)</Td>
                <Td>커밋된 결과는 장애에도 보존</Td>
                <Td>장애 후 커밋한 데이터가 사라짐</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <ShieldCheck size={18} color="var(--color-primary)" /> 트랜잭션 경계는 서비스에서
          </CardTitle>
          <CardText>
            &lsquo;어디서 시작해 어디서 커밋할지&rsquo;가 트랜잭션 경계다. 보통 비즈니스 한
            단위를 처리하는 서비스 계층에 둔다. Spring의 <code>@Transactional</code>이 이
            경계를 선언적으로 그어주는 방식은{' '}
            <Link
              href="/backend/spring-boot"
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              Spring Boot 실무 패턴
            </Link>{' '}
            글에서 다룬다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="격리 수준과 이상 현상" />
        <SectionIntro>
          격리성을 완벽하게 지키려면 트랜잭션을 한 줄로 세워 실행해야 하지만, 그러면 너무 느리다.
          그래서 DB는 &lsquo;어디까지 간섭을 허용할지&rsquo;를 격리 수준으로 단계화한다. 수준이
          낮을수록 빠르지만 이상 현상이 생긴다.
        </SectionIntro>

        <GridTwo>
          <Card>
            <SmallHeading>
              <Dot />
              Dirty Read
            </SmallHeading>
            <SmallText>
              아직 커밋되지 않은 다른 트랜잭션의 변경을 읽는다. 그 트랜잭션이 롤백되면 읽은 값은
              존재한 적 없는 유령 데이터가 된다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              Non-repeatable Read
            </SmallHeading>
            <SmallText>
              같은 행을 두 번 읽었는데 값이 달라진다. 사이에 다른 트랜잭션이 그 행을 수정·커밋한
              경우다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              Phantom Read
            </SmallHeading>
            <SmallText>
              같은 조건으로 조회했는데 행의 &lsquo;개수&rsquo;가 달라진다. 사이에 조건에 맞는
              행이 추가·삭제된 경우다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              트레이드오프
            </SmallHeading>
            <SmallText>
              막을 현상이 많을수록 격리 수준을 올려야 하고, 그만큼 동시성이 떨어진다. 정답은
              &lsquo;업무가 허용하는 가장 낮은 수준&rsquo;이다.
            </SmallText>
          </Card>
        </GridTwo>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>격리 수준</Th>
                <Th>Dirty</Th>
                <Th>Non-repeatable</Th>
                <Th>Phantom</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>READ UNCOMMITTED</Td>
                <Td>허용</Td>
                <Td>허용</Td>
                <Td>허용</Td>
              </tr>
              <tr>
                <Td $muted>READ COMMITTED</Td>
                <Td>방지</Td>
                <Td>허용</Td>
                <Td>허용</Td>
              </tr>
              <tr>
                <Td $muted>REPEATABLE READ</Td>
                <Td>방지</Td>
                <Td>방지</Td>
                <Td>허용*</Td>
              </tr>
              <tr>
                <Td $muted>SERIALIZABLE</Td>
                <Td>방지</Td>
                <Td>방지</Td>
                <Td>방지</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
        <Paragraph>
          <SmallText>
            * 표준상 REPEATABLE READ는 phantom을 허용하지만, MySQL InnoDB는 갭 락으로 상당 부분
            막는 등 DB 구현마다 실제 동작이 다르다. 쓰는 DB의 기본 수준과 동작을 반드시
            확인하자.
          </SmallText>
        </Paragraph>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="락과 동시성 제어" />
        <Paragraph>
          여러 요청이 같은 데이터를 동시에 바꾸려 할 때 충돌을 막는 방법은 크게 둘이다. 미리
          잠그는 <strong>비관적 락</strong>과, 일단 진행하고 커밋 시점에 검사하는{' '}
          <strong>낙관적 락</strong>이다.
        </Paragraph>

        <Stack>
          <Card>
            <CardTitle>
              <Lock size={20} color="var(--color-warning)" /> 비관적 락 (Pessimistic)
            </CardTitle>
            <CardText>
              &lsquo;충돌이 잦을 것&rsquo;이라 보고, 읽는 순간 행을 잠가 다른 트랜잭션을
              대기시킨다(<code>SELECT ... FOR UPDATE</code>). 충돌이 확실히 막히지만, 대기와
              교착(deadlock) 위험이 있고 처리량이 준다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <GitCompareArrows size={20} color="var(--color-success)" /> 낙관적 락 (Optimistic)
            </CardTitle>
            <CardText>
              &lsquo;충돌이 드물 것&rsquo;이라 보고 잠그지 않는다. 대신 <code>version</code> 컬럼을
              두고, 커밋 때 버전이 그대로면 성공, 바뀌었으면 충돌로 보고 실패시켜 재시도하게
              한다.
            </CardText>
          </Card>
        </Stack>

        <CodeBlock label="낙관적 락 — 버전 충돌 감지 (의사 SQL)">{`-- 읽을 때 version 같이 조회
SELECT id, stock, version FROM product WHERE id = 1;  -- version = 7

-- 쓸 때 '내가 읽은 버전'을 조건으로 건다
UPDATE product
   SET stock = stock - 1, version = version + 1
 WHERE id = 1 AND version = 7;

-- 영향받은 행이 0이면? 그사이 누군가 먼저 바꾼 것 → 충돌 → 재시도`}</CodeBlock>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 무엇을 고르나
          </CardTitle>
          <CardText>
            충돌이 드물고 재시도가 싸면 낙관적 락이 처리량에서 유리하다. 재고 차감처럼 충돌이
            잦고 정확성이 중요하면 비관적 락이 안전하다. 핵심은 &lsquo;충돌 빈도&rsquo;다.
          </CardText>
        </Card>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="인덱스와 실행 계획" />
        <SectionIntro>
          인덱스는 책 뒤의 &lsquo;찾아보기&rsquo;와 같다. 없으면 처음부터 끝까지 훑어야(풀
          스캔) 하지만, 있으면 정렬된 구조(주로 B-tree)를 타고 바로 원하는 행으로 간다. 느린
          조회의 가장 흔한 처방이다.
        </SectionIntro>

        <CodeBlock label="실행 계획으로 인덱스 사용 확인">{`EXPLAIN SELECT * FROM orders WHERE user_id = 42;

-- type=ALL, rows=1000000  → 풀 스캔 (인덱스 못 탐)
-- 인덱스 추가:
CREATE INDEX idx_orders_user_id ON orders (user_id);

EXPLAIN SELECT * FROM orders WHERE user_id = 42;
-- type=ref, rows=12       → 인덱스로 좁혀 읽음`}</CodeBlock>

        <GridTwo>
          <Card>
            <CardTitle>
              <Search size={20} color="var(--color-success)" /> 인덱스가 빠른 이유
            </CardTitle>
            <CardText>
              정렬된 트리를 타고 내려가 대상 행만 골라 읽는다. 조회 대상이 수백만 건이어도 몇
              단계 만에 도달하므로, 조회와 정렬·조인이 크게 빨라진다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <AlertTriangle size={20} color="var(--color-warning)" /> 공짜가 아니다
            </CardTitle>
            <CardText>
              인덱스도 저장 공간을 쓰고, INSERT/UPDATE마다 갱신 비용이 든다. 그래서 무작정 많이
              거는 게 아니라 &lsquo;자주 조회·정렬·조인하는 컬럼&rsquo;에 선별해서 건다.
            </CardText>
          </Card>
        </GridTwo>

        <BulletList>
          <Bullet>
            <strong>선택도가 낮으면 무용</strong>: 값 종류가 적은 컬럼(예: 성별)은 인덱스를
            타도 거르는 양이 적어 효과가 약하다.
          </Bullet>
          <Bullet>
            <strong>함수·형변환은 인덱스를 깬다</strong>: <code>WHERE DATE(created_at) = ...</code>
            처럼 컬럼을 가공하면 인덱스를 못 탄다. 범위 조건으로 바꿔 쓴다.
          </Bullet>
          <Bullet>
            <strong>복합 인덱스는 순서가 중요</strong>: <code>(a, b)</code> 인덱스는 <code>a</code>
            단독·<code>a,b</code> 조회엔 쓰이지만 <code>b</code> 단독 조회엔 잘 안 쓰인다.
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="N+1과 쿼리 성능" />
        <Paragraph>
          ORM을 쓰면 편하지만, 무심코 쓰면 쿼리가 폭발한다. 대표적인 함정이 <strong>N+1
          문제</strong>다. 목록 1번을 조회한 뒤, 각 항목의 연관 데이터를 N번 더 조회해 총 N+1번의
          쿼리가 나가는 현상이다.
        </Paragraph>

        <CodeBlock label="N+1이 터지는 전형적인 패턴">{`// 1번: 주문 100건 조회
List<Order> orders = orderRepository.findAll();

// + N번: 각 주문의 회원을 지연 로딩으로 하나씩 조회 (쿼리 100번 추가)
for (Order o : orders) {
  System.out.println(o.getMember().getName()); // 매번 SELECT member ...
}
// 결과: 1 + 100 = 101번의 쿼리`}</CodeBlock>

        <Stack>
          <Card>
            <CardTitle>
              <CheckCircle size={20} color="var(--color-success)" /> 처방: 한 번에 가져오기
            </CardTitle>
            <CardText>
              연관 데이터를 조인으로 함께 조회하면(fetch join) 쿼리 한 번으로 끝난다. 또는
              필요한 ID를 모아 <code>IN</code> 절로 일괄 조회하는 방식도 있다. 핵심은{' '}
              &lsquo;반복문 안에서 쿼리하지 않기&rsquo;다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Search size={20} color="var(--color-primary)" /> 측정이 먼저
            </CardTitle>
            <CardText>
              추측하지 말고 쿼리 로그를 켜서 실제로 몇 번 나가는지 본다. 이 추적 과정을 실제
              사례로 남긴 기록이{' '}
              <Link
                href="/journal/n-plus-one"
                style={{ color: 'var(--color-primary)', fontWeight: 600 }}
              >
                N+1 쿼리 추적기
              </Link>{' '}
              글이다.
            </CardText>
          </Card>
        </Stack>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Database size={18} color="var(--color-primary)" /> 정리하면
          </CardTitle>
          <CardText>
            트랜잭션으로 정합성을 지키고, 격리·락으로 동시성을 다스리고, 인덱스와 쿼리 설계로
            성능을 확보한다. ORM은 이 셋을 가려주지만, 가려진 SQL을 읽을 줄 알아야 문제를
            잡는다.
          </CardText>
        </Card>
      </Section>

      <HeaderQuote>
        ORM은 SQL을 감추지만, 책임까지 감추진 못한다.
        <br />
        <strong>트랜잭션·격리·인덱스를 이해할 때 비로소 데이터 계층을 신뢰할 수 있다.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
