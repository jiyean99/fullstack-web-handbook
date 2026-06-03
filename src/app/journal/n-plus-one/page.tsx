'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {
  Activity,
  Search,
  Bug,
  Wrench,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
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
  HeaderQuote,
} from '@/components/content/ContentDoc'

const toc = [
  { id: 'section1', label: '1. 증상: 갑자기 느려진 목록' },
  { id: 'section2', label: '2. 추적: 쿼리 로그 켜기' },
  { id: 'section3', label: '3. 원인: 지연 로딩과 N+1' },
  { id: 'section4', label: '4. 해결: fetch join' },
  { id: 'section5', label: '5. 검증과 교훈' },
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

export default function NPlusOnePage() {
  return (
    <ContentDoc
      badge="Journal · Backend"
      badgeIcon={<Activity size={12} />}
      title="목록 API가 갑자기 느려졌다 — N+1 쿼리 추적기"
      quote={
        <>
          주문 목록 API의 응답 시간이 어느 날부터 눈에 띄게 늘었다. 코드는 그대로인데 데이터가
          쌓이면서 드러난 전형적인 N+1 문제였다. 원인을 추적하고 해결한 과정을 그대로 남긴다.
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
        <SectionTitleBlock num="1" title="증상: 갑자기 느려진 목록" />
        <Paragraph>
          주문 목록 화면이 처음엔 빨랐는데, 운영 데이터가 늘면서 응답이 수백 ms까지 느려졌다.
          코드 변경이 없었기에 더 당황스러웠다. 목록의 각 주문은 회원(member) 정보를 함께
          보여주는 구조였다.
        </Paragraph>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-warning)" /> 첫 단서
          </CardTitle>
          <CardText>
            데이터가 적을 땐 멀쩡하다가 늘어날수록 느려진다 → 응답 시간이 데이터 건수에
            <strong> 비례</strong>한다는 뜻이다. 쿼리가 건수만큼 늘어나는 패턴을 의심했다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="추적: 쿼리 로그 켜기" />
        <SectionIntro>
          추측 대신 실제로 어떤 쿼리가 나가는지 봐야 했다. JPA의 SQL 로그와 실행 횟수를 켜서
          확인했다.
        </SectionIntro>

        <CodeBlock label="application.yml">{`spring:
  jpa:
    show-sql: true
    properties:
      hibernate.format_sql: true
# 쿼리 카운트를 보려면 datasource-proxy / p6spy 같은 도구가 유용`}</CodeBlock>

        <Paragraph>
          로그를 보니 주문 목록 1건을 조회하는 쿼리 뒤에, 각 주문의 회원을 조회하는 쿼리가
          줄줄이 따라붙고 있었다. 주문이 50건이면 쿼리가 51번 나갔다.
        </Paragraph>

        <CodeBlock label="실제 로그 (요약)">{`select * from orders;                  -- 1번: 주문 50건 조회
select * from member where id = 1;     -- +1
select * from member where id = 2;     -- +1
...                                    -- 주문 수만큼 반복
select * from member where id = 50;    -- +1   → 총 51번`}</CodeBlock>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="원인: 지연 로딩과 N+1" />
        <Paragraph>
          원인은 명확했다. <code>@ManyToOne</code> 연관관계가 지연 로딩(LAZY)이라, 목록을 돌면서
          각 주문의 <code>member</code>에 접근하는 순간마다 추가 쿼리가 나간 것이다. 목록(N건)
          조회 1번 + 각 건의 연관 조회 N번 = <strong>N+1번</strong>의 쿼리.
        </Paragraph>

        <CodeBlock label="문제의 코드">{`@Entity
class Order {
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
}

// 목록을 돌며 member.getName() 접근 → 건마다 쿼리 발생
orders.forEach(o -> log.info(o.getMember().getName()));`}</CodeBlock>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-error) 7%, var(--color-bg))',
            borderColor: 'var(--color-error)',
          }}
        >
          <CardTitle>
            <Bug size={18} color="var(--color-error)" /> LAZY가 잘못은 아니다
          </CardTitle>
          <CardText>
            지연 로딩 자체는 권장 설정이다. 문제는 &lsquo;목록에서 연관 데이터를 전부 쓰면서도
            한 번에 가져오지 않은&rsquo; 접근 방식이었다. EAGER로 바꾸는 건 다른 곳에서 더 큰
            문제를 부른다.
          </CardText>
        </Card>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="해결: fetch join" />
        <SectionIntro>
          목록 조회 시점에 회원을 함께 가져오도록 <strong>fetch join</strong>을 명시했다. 한
          번의 조인 쿼리로 모든 데이터를 끌어오면 추가 쿼리가 사라진다.
        </SectionIntro>

        <CodeBlock label="해결: fetch join">{`@Query("select o from Order o join fetch o.member")
List<Order> findAllWithMember();

// 단 한 번의 조인 쿼리로 주문 + 회원을 함께 로딩`}</CodeBlock>

        <GridTwo>
          <Card>
            <CardTitle>
              <Wrench size={20} color="var(--color-primary)" /> @EntityGraph 대안
            </CardTitle>
            <CardText>
              JPQL을 직접 쓰기 싫다면 <code>@EntityGraph(attributePaths = &quot;member&quot;)</code>
              로도 같은 효과를 낼 수 있다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Search size={20} color="var(--color-success)" /> 컬렉션은 주의
            </CardTitle>
            <CardText>
              일대다(컬렉션) fetch join은 페이징과 함께 쓰면 메모리에서 페이징하는 문제가 있다.
              이 경우 <code>@BatchSize</code>나 <code>default_batch_fetch_size</code>로 IN 쿼리
              묶음 전략을 쓴다.
            </CardText>
          </Card>
        </GridTwo>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="검증과 교훈" />
        <Paragraph>
          수정 후 다시 로그를 확인하니 쿼리가 51번에서 1번으로 줄었고, 응답 시간도 데이터 건수와
          무관하게 일정해졌다.
        </Paragraph>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 남은 교훈
          </CardTitle>
          <BulletList>
            <Bullet>
              <strong>의심되면 로그부터</strong>: 성능 문제는 추측하지 말고 실제 쿼리 수를 먼저
              센다. 보이지 않으면 고칠 수 없다.
            </Bullet>
            <Bullet>
              <strong>응답 시간이 데이터에 비례하면 N+1을 의심</strong>: 가장 흔한 ORM 함정이다.
            </Bullet>
            <Bullet>
              <strong>EAGER는 답이 아니다</strong>: 전역 EAGER는 의도치 않은 곳에서 또 다른 N+1과
              과다 조회를 만든다. 필요한 곳에서만 fetch join으로 명시한다.
            </Bullet>
            <Bullet>
              <strong>테스트로 고정</strong>: 쿼리 수를 검증하는 테스트를 두면 회귀를 막을 수
              있다.
            </Bullet>
          </BulletList>
        </Card>

        <Paragraph style={{ marginTop: 'var(--sp-6)' }}>
          이 주제의 이론적 배경은{' '}
          <Link href="/backend/spring-boot#section4" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            Spring Boot · JPA 데이터 접근
          </Link>{' '}
          글에서 더 다룬다.
        </Paragraph>
      </Section>

      <HeaderQuote>
        N+1은 코드가 틀려서가 아니라, 데이터가 쌓이면서 드러난다.
        <br />
        <strong>성능은 추측이 아니라 측정으로 잡는다 — 쿼리 로그가 가장 정직한 단서다.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
