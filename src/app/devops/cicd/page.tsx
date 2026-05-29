'use client'

import React from 'react'
import {
  GitBranch,
  Layers,
  KeyRound,
  Gauge,
  Rocket,
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
  { id: 'section1', label: '1. CI/CD란 무엇인가' },
  { id: 'section2', label: '2. 워크플로우 구조' },
  { id: 'section3', label: '3. CI: 빌드와 테스트' },
  { id: 'section4', label: '4. 시크릿과 캐싱' },
  { id: 'section5', label: '5. CD: 배포 자동화' },
  { id: 'section6', label: '6. 파이프라인 설계 원칙' },
]

export default function CicdPage() {
  return (
    <ContentDoc
      badge="CI/CD"
      badgeIcon={<Rocket size={12} />}
      title="CI/CD 파이프라인"
      quote={
        <>
          배포는 &lsquo;이벤트&rsquo;가 아니라 &lsquo;반복 가능한 절차&rsquo;여야 한다.
          사람이 손으로 하던 빌드·테스트·배포를 코드로 옮겨 두면, 실수는 줄고 속도는 빨라진다.
          GitHub Actions를 중심으로 자동화 파이프라인을 정리한다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="CI/CD란 무엇인가" />
        <Paragraph>
          CI/CD는 코드 변경이 사용자에게 도달하기까지의 과정을 자동화하는 관행이다. 크게 통합
          단계(CI)와 배포 단계(CD)로 나뉜다.
        </Paragraph>

        <GridTwo>
          <Card>
            <CardTitle>
              <GitBranch size={20} color="var(--color-primary)" /> CI (지속적 통합)
            </CardTitle>
            <CardText>
              코드를 푸시할 때마다 자동으로 빌드하고 테스트한다. 변경이 기존 코드를 깨뜨리지
              않는지 빠르게 검증해, 통합 시점의 충돌을 작게 유지한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Rocket size={20} color="var(--color-success)" /> CD (지속적 배포/전달)
            </CardTitle>
            <CardText>
              검증을 통과한 코드를 자동으로 운영 환경에 내보낸다. 수동 배포의 인적 오류를 없애고,
              언제든 배포 가능한 상태를 유지한다.
            </CardText>
          </Card>
        </GridTwo>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 자동화의 본질
          </CardTitle>
          <CardText>
            CI/CD의 목표는 &lsquo;빠른 배포&rsquo; 그 자체가 아니라, <strong>작은 변경을 자주,
            안전하게</strong> 내보낼 수 있는 상태를 만드는 것이다. 배포가 두렵지 않아야 자주
            할 수 있다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="워크플로우 구조" />
        <SectionIntro>
          GitHub Actions는 <code>.github/workflows/</code> 아래 YAML 파일로 파이프라인을
          정의한다. 이벤트(trigger) → 잡(job) → 스텝(step)의 계층으로 구성된다.
        </SectionIntro>

        <CodeBlock label=".github/workflows/ci.yml">{`name: CI

on:                      # 트리거: 언제 실행할지
  push:
    branches: [main]
  pull_request:

jobs:                    # 잡: 병렬 실행 단위
  test:
    runs-on: ubuntu-latest   # 실행 환경(러너)
    steps:                   # 스텝: 순차 실행
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test`}</CodeBlock>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>개념</Th>
                <Th>역할</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>Event (on)</Td>
                <Td>워크플로우를 트리거하는 사건 (push, PR, schedule 등)</Td>
              </tr>
              <tr>
                <Td $muted>Job</Td>
                <Td>독립 러너에서 실행되는 작업 묶음 (기본 병렬)</Td>
              </tr>
              <tr>
                <Td $muted>Step</Td>
                <Td>잡 안에서 순차 실행되는 명령 또는 액션</Td>
              </tr>
              <tr>
                <Td $muted>Action</Td>
                <Td>재사용 가능한 스텝 단위 (uses로 호출)</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="CI: 빌드와 테스트" />
        <Paragraph>
          CI 단계의 핵심은 &lsquo;빠른 피드백&rsquo;이다. 린트·타입체크·테스트를 자동으로
          돌려, 문제가 있는 변경이 main에 합쳐지기 전에 막는다.
        </Paragraph>

        <CodeBlock label="병렬 잡 + 매트릭스">{`jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run lint

  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:                 # 여러 버전을 병렬로 검증
        node: [18, 20]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: \${{ matrix.node }} }
      - run: npm ci && npm test`}</CodeBlock>

        <BulletList>
          <Bullet>
            <strong>잡 분리</strong>: 린트·테스트를 별도 잡으로 두면 병렬 실행돼 전체 시간이
            줄고, 어디서 실패했는지 한눈에 보인다.
          </Bullet>
          <Bullet>
            <strong>매트릭스</strong>: Node 18/20처럼 여러 환경을 동시에 검증해 호환성을
            보장한다.
          </Bullet>
          <Bullet>
            <strong>브랜치 보호 규칙</strong>: &lsquo;CI 통과&rsquo;를 머지 필수 조건으로 걸면,
            깨진 코드가 main에 들어오지 못한다.
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="시크릿과 캐싱" />
        <SectionIntro>
          파이프라인에는 토큰·키 같은 민감 정보가 필요하고, 매번 의존성을 새로 받으면 느리다.
          시크릿과 캐싱으로 안전하고 빠르게 만든다.
        </SectionIntro>

        <Stack>
          <Card>
            <CardTitle>
              <KeyRound size={20} color="var(--color-primary)" /> Secrets
            </CardTitle>
            <CardText>
              API 키·배포 자격증명은 코드에 넣지 않고 저장소 Settings의 Secrets에 등록한다.
              워크플로우에서는 <code>{`\${{ secrets.NAME }}`}</code>으로 참조하며, 로그에는
              자동 마스킹된다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Gauge size={20} color="var(--color-success)" /> Cache
            </CardTitle>
            <CardText>
              <code>actions/cache</code>나 <code>setup-node</code>의 캐시 옵션으로 의존성을
              캐싱하면, 변경이 없을 때 설치 단계를 건너뛰어 빌드가 빨라진다.
            </CardText>
          </Card>
        </Stack>

        <CodeBlock label="의존성 캐싱">{`- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'npm'        # package-lock 해시 기준 캐시

- run: npm ci          # 캐시 적중 시 설치 가속`}</CodeBlock>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-warning) 8%, var(--color-bg))',
            borderColor: 'var(--color-warning)',
          }}
        >
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-warning)" /> 시크릿 주의
          </CardTitle>
          <CardText>
            포크에서 올라온 PR에는 시크릿이 노출되지 않는다(보안). 또한 시크릿을{' '}
            <code>echo</code>로 출력하려는 시도는 마스킹되더라도 피해야 한다. 권한은 최소로
            (<code>permissions</code>) 제한한다.
          </CardText>
        </Card>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="CD: 배포 자동화" />
        <Paragraph>
          CI를 통과하면 배포 잡이 동작한다. <code>needs</code>로 의존성을 걸어, 테스트가 성공한
          뒤에만 배포가 실행되도록 한다. 이 핸드북의 Storybook도 GitHub Pages로 자동 배포된다.
        </Paragraph>

        <CodeBlock label="deploy.yml (배포 잡)">{`jobs:
  test:
    runs-on: ubuntu-latest
    steps: [ ... ]

  deploy:
    needs: test                    # test 성공 후에만 실행
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production        # 환경 보호 규칙 적용 가능
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - name: Deploy
        run: ./scripts/deploy.sh
        env:
          TOKEN: \${{ secrets.DEPLOY_TOKEN }}`}</CodeBlock>

        <GridTwo>
          <Card>
            <SmallHeading>
              <Dot />
              환경(Environment)
            </SmallHeading>
            <SmallText>
              production 환경에 승인자(reviewer)를 두면, 운영 배포 전에 사람이 확인하는 게이트를
              걸 수 있다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              배포 전략
            </SmallHeading>
            <SmallText>
              블루-그린·카나리 배포로 새 버전을 점진 노출하면, 문제 발생 시 빠르게 롤백할 수
              있다.
            </SmallText>
          </Card>
        </GridTwo>
      </Section>

      <Section id="section6">
        <SectionTitleBlock num="6" title="파이프라인 설계 원칙" />
        <Paragraph>
          좋은 파이프라인은 빠르고, 신뢰할 수 있고, 결과가 명확하다. 아래 원칙을 지키면 CI/CD가
          개발을 가속하는 자산이 된다.
        </Paragraph>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Layers size={18} color="var(--color-primary)" /> 핵심 체크리스트
          </CardTitle>
          <BulletList>
            <Bullet>
              <strong>빠르게</strong>: 캐싱·병렬화로 피드백을 10분 이내로. 느린 파이프라인은
              아무도 기다리지 않는다.
            </Bullet>
            <Bullet>
              <strong>결정적으로</strong>: 같은 커밋은 항상 같은 결과를. 외부 상태에 의존하는
              플래키 단계를 제거한다.
            </Bullet>
            <Bullet>
              <strong>실패는 시끄럽게</strong>: 깨지면 즉시 알리고, 로그에서 원인이 바로
              보이게 한다.
            </Bullet>
            <Bullet>
              <strong>되돌릴 수 있게</strong>: 모든 배포는 롤백 경로를 함께 설계한다.
            </Bullet>
          </BulletList>
        </Card>
      </Section>

      <HeaderQuote>
        수동 배포는 용기가 필요하지만, 자동 파이프라인은 신뢰를 만든다.
        <br />
        <strong>작은 변경을 자주, 자동으로, 되돌릴 수 있게 내보내라.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
