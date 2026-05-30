'use client'

import React from 'react'
import {
  HardDrive,
  Database,
  Network,
  ShieldCheck,
  Cloud,
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
  { id: 'section1', label: '1. 클라우드와 책임 공유 모델' },
  { id: 'section2', label: '2. EC2: 컴퓨팅' },
  { id: 'section3', label: '3. S3: 오브젝트 스토리지' },
  { id: 'section4', label: '4. RDS: 관리형 데이터베이스' },
  { id: 'section5', label: '5. VPC: 네트워크 격리' },
  { id: 'section6', label: '6. IAM: 권한 관리' },
]

export default function AwsPage() {
  return (
    <ContentDoc
      badge="AWS Infra"
      badgeIcon={<Cloud size={12} />}
      title="AWS 인프라 기초"
      quote={
        <>
          AWS는 수백 개의 서비스를 제공하지만, 웹 애플리케이션 배포에 꼭 필요한 핵심은 손에
          꼽는다. 컴퓨팅·스토리지·DB·네트워크·권한이라는 다섯 축을 중심으로, 서버 한 대를
          올리는 흐름을 따라가며 정리한다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="클라우드와 책임 공유 모델" />
        <Paragraph>
          클라우드는 물리 서버를 직접 사지 않고, API로 컴퓨팅·스토리지·네트워크를 빌려 쓰는
          방식이다. 핵심은 <strong>책임 공유 모델(Shared Responsibility)</strong>을 이해하는
          것이다.
        </Paragraph>

        <GridTwo>
          <Card>
            <CardTitle>
              <Cloud size={20} color="var(--color-primary)" /> AWS의 책임
            </CardTitle>
            <CardText>
              데이터센터, 하드웨어, 네트워크 인프라 등 <strong>클라우드 자체(of the cloud)</strong>의
              보안과 가용성을 책임진다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <ShieldCheck size={20} color="var(--color-success)" /> 사용자의 책임
            </CardTitle>
            <CardText>
              OS 패치, 방화벽 설정, 접근 권한, 데이터 암호화 등 <strong>클라우드 안(in the
              cloud)</strong>의 구성을 책임진다. 보안 사고의 대부분은 이 영역에서 발생한다.
            </CardText>
          </Card>
        </GridTwo>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 핵심 5개 서비스
          </CardTitle>
          <CardText>
            <strong>EC2</strong>(컴퓨팅) · <strong>S3</strong>(스토리지) ·{' '}
            <strong>RDS</strong>(DB) · <strong>VPC</strong>(네트워크) ·{' '}
            <strong>IAM</strong>(권한). 이 다섯을 이해하면 대부분의 웹 서비스 인프라를 구성할 수
            있다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="EC2: 컴퓨팅" />
        <SectionIntro>
          EC2(Elastic Compute Cloud)는 가상 서버를 빌려주는 서비스다. 사양(인스턴스 타입)을
          고르고, 운영체제 이미지(AMI)를 선택해 몇 분 만에 서버를 띄운다.
        </SectionIntro>

        <BulletList>
          <Bullet>
            <strong>인스턴스 타입</strong>: <code>t</code>(범용·버스트), <code>c</code>(컴퓨팅
            최적), <code>m</code>(메모리) 등 용도별로 나뉜다. 작게 시작해 필요 시 키운다.
          </Bullet>
          <Bullet>
            <strong>AMI</strong>: 미리 구성된 OS 이미지. Amazon Linux, Ubuntu 등을 선택한다.
          </Bullet>
          <Bullet>
            <strong>키 페어</strong>: SSH 접속용 키. 개인 키는 안전하게 보관하고 절대 공유하지
            않는다.
          </Bullet>
          <Bullet>
            <strong>Auto Scaling</strong>: 부하에 따라 인스턴스 수를 자동으로 늘리고 줄여
            가용성과 비용을 함께 잡는다.
          </Bullet>
        </BulletList>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-warning) 8%, var(--color-bg))',
            borderColor: 'var(--color-warning)',
          }}
        >
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-warning)" /> 비용 함정
          </CardTitle>
          <CardText>
            EC2는 켜져 있는 시간만큼 과금된다. 실습 후 인스턴스를 종료하지 않으면 요금이 계속
            누적된다. 학습용은 작업 후 <strong>중지/종료</strong>를 습관화한다.
          </CardText>
        </Card>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="S3: 오브젝트 스토리지" />
        <Paragraph>
          S3(Simple Storage Service)는 파일을 &lsquo;버킷&rsquo;에 객체 단위로 저장하는 무제한
          스토리지다. 이미지·백업·정적 웹사이트 호스팅 등에 쓴다.
        </Paragraph>

        <Stack>
          <Card>
            <CardTitle>
              <HardDrive size={20} color="var(--color-primary)" /> 버킷과 객체
            </CardTitle>
            <CardText>
              버킷은 전역적으로 고유한 이름을 가진 저장 공간이고, 그 안에 객체(파일)를 키-값으로
              저장한다. 높은 내구성(99.999999999%)을 보장한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Network size={20} color="var(--color-success)" /> 정적 호스팅 + CDN
            </CardTitle>
            <CardText>
              정적 파일을 S3에 두고 <strong>CloudFront</strong>(CDN)를 앞에 붙이면, 전 세계
              엣지에서 빠르게 제공된다. 프론트엔드 배포에 흔히 쓰는 조합이다.
            </CardText>
          </Card>
        </Stack>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-error) 7%, var(--color-bg))',
            borderColor: 'var(--color-error)',
          }}
        >
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-error)" /> 퍼블릭 노출 사고
          </CardTitle>
          <CardText>
            버킷을 실수로 전체 공개(public)로 두어 민감 데이터가 유출되는 사고가 잦다. 기본은
            <strong>차단(Block Public Access)</strong>을 유지하고, 꼭 필요한 객체만 정책으로
            연다.
          </CardText>
        </Card>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="RDS: 관리형 데이터베이스" />
        <SectionIntro>
          RDS(Relational Database Service)는 MySQL·PostgreSQL 등 관계형 DB를 관리형으로
          제공한다. 백업·패치·복제 같은 운영 부담을 AWS가 대신 진다.
        </SectionIntro>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>기능</Th>
                <Th>역할</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>자동 백업</Td>
                <Td>스냅샷과 특정 시점 복구(PITR) 지원</Td>
              </tr>
              <tr>
                <Td $muted>Multi-AZ</Td>
                <Td>다른 가용 영역에 동기 복제본 → 장애 시 자동 전환</Td>
              </tr>
              <tr>
                <Td $muted>Read Replica</Td>
                <Td>읽기 전용 복제본으로 조회 부하 분산</Td>
              </tr>
              <tr>
                <Td $muted>관리 자동화</Td>
                <Td>마이너 버전 패치·모니터링을 AWS가 수행</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Database size={18} color="var(--color-primary)" /> 직접 운영 vs RDS
          </CardTitle>
          <CardText>
            EC2에 DB를 직접 설치하면 자유롭지만 백업·패치·이중화를 모두 직접 해야 한다. RDS는
            그 운영 부담을 가져가는 대신 일부 제약이 있다. 대부분의 경우 RDS가 유리하다.
          </CardText>
        </Card>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="VPC: 네트워크 격리" />
        <Paragraph>
          VPC(Virtual Private Cloud)는 내 전용 가상 네트워크다. 서브넷으로 공개/비공개 영역을
          나누고, 어떤 트래픽을 허용할지 통제한다.
        </Paragraph>

        <Stack>
          <Card>
            <CardTitle>
              <Network size={20} color="var(--color-primary)" /> 퍼블릭 / 프라이빗 서브넷
            </CardTitle>
            <CardText>
              웹 서버는 외부 접근이 필요한 <strong>퍼블릭 서브넷</strong>에, DB는 외부에서 직접
              닿을 수 없는 <strong>프라이빗 서브넷</strong>에 둔다. DB는 웹 서버를 통해서만
              접근하게 한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <ShieldCheck size={20} color="var(--color-success)" /> 보안 그룹
            </CardTitle>
            <CardText>
              인스턴스 단위 가상 방화벽이다. &lsquo;80/443은 모두 허용, 22(SSH)는 내 IP만&rsquo;
              처럼 인바운드 규칙을 최소로 연다. 포트포워딩 편에서 다룬 노출 위험을 통제하는
              장치다.
            </CardText>
          </Card>
        </Stack>
      </Section>

      <Section id="section6">
        <SectionTitleBlock num="6" title="IAM: 권한 관리" />
        <Paragraph>
          IAM(Identity and Access Management)은 &lsquo;누가 무엇을 할 수 있는가&rsquo;를
          정의한다. AWS 보안의 출발점이며, 가장 흔한 사고의 원천이기도 하다.
        </Paragraph>

        <CodeBlock label="IAM 정책 예시 (S3 읽기 전용)">{`{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::my-bucket/*"
  }]
}`}</CodeBlock>

        <BulletList>
          <Bullet>
            <strong>최소 권한 원칙</strong>: 꼭 필요한 권한만 부여한다. <code>*</code>(전체
            허용)는 최후의 수단이다.
          </Bullet>
          <Bullet>
            <strong>루트 계정 봉인</strong>: 루트 계정은 일상 작업에 쓰지 않고, MFA를 걸어
            잠가둔다. 작업은 IAM 사용자/역할로 한다.
          </Bullet>
          <Bullet>
            <strong>역할(Role) 활용</strong>: EC2 등에 액세스 키를 박지 않고 IAM 역할을 부여하면,
            자격증명이 자동 순환돼 유출 위험이 준다.
          </Bullet>
        </BulletList>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <ShieldCheck size={18} color="var(--color-primary)" /> 액세스 키 유출
          </CardTitle>
          <CardText>
            액세스 키를 코드·깃 저장소에 커밋해 유출되는 사고가 매우 흔하다. 키는 환경 변수나
            시크릿 매니저에 두고, 가능하면 키 대신 <strong>역할</strong>을 쓴다.
          </CardText>
        </Card>
      </Section>

      <HeaderQuote>
        클라우드는 자유를 주는 만큼 책임도 넘긴다.
        <br />
        <strong>컴퓨팅·스토리지·DB·네트워크·권한, 다섯 축을 이해하고 최소 권한으로 잠가라.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
