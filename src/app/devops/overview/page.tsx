'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Users,
  Settings,
  Cloud,
  RefreshCw,
  GitBranch,
  Box,
  Server,
  CheckCircle,
  ChevronRight,
  BookOpen,
  ExternalLink,
  Layers,
  Terminal,
  Cpu,
} from 'lucide-react'
import ZoomImage from '@/components/common/ZoomImage'

const Shell = styled.div`
  min-height: 100vh;
  color: var(--color-text);
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.25rem var(--sp-12);
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const Sidebar = styled.aside`
  width: 100%;
  border-bottom: 1px solid var(--color-border);
  padding: var(--sp-4);
  position: sticky;
  top: 3.5rem;
  z-index: 10;

  @media (min-width: 768px) {
    width: 260px;
    border-bottom: none;
    height: calc(100vh - 3.5rem);
    top: 3.5rem;
    padding: var(--sp-6);
  }
`

const SidebarHeader = styled.div`
  margin-bottom: var(--sp-5);
  padding-top: var(--sp-2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const SidebarTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const SidebarButton = styled.button<{ $active: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-lg);
  border: none;
  background: ${({ $active }) => ($active ? 'var(--color-primary-light)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-text-muted)')};
  font-size: 0.85rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;

  &:hover {
    background: ${({ $active }) => ($active ? 'var(--color-primary-light)' : 'var(--color-surface)')};
    color: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-text)')};
  }
`

const ChevronIcon = styled(ChevronRight) <{ $visible: boolean }>`
  width: 0.9rem;
  height: 0.9rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.12s ease;
`

const Main = styled.main`
  flex: 1;
  padding: var(--sp-4) 0;

  @media (min-width: 768px) {
    padding: var(--sp-6) 0 var(--sp-12);
  }
`

const Header = styled.header`
  margin-bottom: var(--sp-10);
`

const Title = styled.h1`
  font-size: clamp(2rem, 3.4vw, 2.8rem);
  font-weight: 900;
  color: var(--color-text);
  letter-spacing: -0.04em;
  margin-bottom: var(--sp-5);
`

const HeaderImageWrapper = styled.div`
  width: 100%;
  margin-bottom: var(--sp-6);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  background: var(--color-bg);
`

const HeaderQuote = styled.blockquote`
  border-left: 4px solid var(--color-primary);
  padding-left: var(--sp-6);
  padding-block: var(--sp-2);
  margin-bottom: var(--sp-6);
  font-size: 1.05rem;
  color: var(--color-text-muted);
  line-height: 1.8;
`

const Section = styled.section`
  margin-bottom: var(--sp-12);
  scroll-margin-top: 4.5rem;
`

const SectionTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  margin-bottom: var(--sp-5);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--sp-4);
`

const SectionBadge = styled.span`
  width: 2rem;
  height: 2rem;
  border-radius: 0.75rem;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  flex-shrink: 0;
`

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--color-text);
`

const Paragraph = styled.p`
  font-size: 0.98rem;
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: var(--sp-5);
`

const GridTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-4);
  margin-bottom: var(--sp-6);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Card = styled.div`
  padding: var(--sp-5);
  border-radius: 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
`

const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: var(--sp-2);
  color: var(--color-text);
`

const CardText = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.7;
`

const TableWrapper = styled.div`
  margin-top: var(--sp-1);
  border-radius: 1rem;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  background: var(--color-bg);
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.86rem;
`

const Th = styled.th`
  padding: var(--sp-4);
  font-weight: 700;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  text-align: left;
`

const Td = styled.td<{ $muted?: boolean }>`
  padding: var(--sp-4);
  border-bottom: 1px solid var(--color-border);
  background: ${({ $muted }) => ($muted ? 'color-mix(in srgb, var(--color-gray-50) 60%, transparent)' : 'transparent')};
  font-weight: ${({ $muted }) => ($muted ? 700 : 400)};
`

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  margin-top: var(--sp-4);
  transition: background 0.15s ease, transform 0.1s ease;

  &:hover {
    background: color-mix(in srgb, var(--color-primary) 18%, #ffffff);
    transform: translateY(-1px);
  }
`


const Dot = styled.div`
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 999px;
  background: var(--color-primary);
`

const SmallHeading = styled.h4`
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: var(--sp-1);
`

const SmallText = styled.p`
  font-size: 0.86rem;
  color: var(--color-text-muted);
  line-height: 1.6;
`

const SectionIntro = styled.p`
  font-size: 0.96rem;
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: var(--sp-6);
`

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
`

const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: var(--sp-2);
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.7;
`

const BulletDot = styled.div`
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 999px;
  background: var(--color-gray-300);
  margin-top: 0.45rem;
  flex-shrink: 0;
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-text-muted);
`

const App = () => {
  const [activeSection, setActiveSection] = useState('section1')

  const menuItems = [
    { id: 'section1', label: '1. 개발팀 vs 운영팀' },
    { id: 'section2', label: '2. DevOps란?' },
    { id: 'section3', label: '3. 버전 관리 (VCS)' },
    { id: 'section4', label: '4. 인프라의 진화' },
    { id: 'section5', label: '5. 자동화와 가상화' },
  ]

  const scrollTo = (id: string) => {
    setActiveSection(id)
    if (typeof document === 'undefined') return
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const SectionTitleBlock = ({ num, title }: { num: string; title: string }) => (
    <SectionTitleRow>
      <SectionBadge>{num}</SectionBadge>
      <SectionTitle>{title}</SectionTitle>
    </SectionTitleRow>
  )

  return (
    <Shell>
      <Sidebar>
        <SidebarHeader>
          <BookOpen size={20} color="var(--color-primary)" />
          <SidebarTitle>목차</SidebarTitle>
        </SidebarHeader>
        <SidebarNav>
          {menuItems.map((item) => (
            <SidebarButton
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              $active={activeSection === item.id}
            >
              {item.label}
              <ChevronIcon $visible={activeSection === item.id} />
            </SidebarButton>
          ))}
        </SidebarNav>
      </Sidebar>

      <Main>
        <Header>
          <Badge>
            <CheckCircle size={12} /> DevOps Overview
          </Badge>
          <Title>DevOps & 인프라 핸드북</Title>
          <HeaderImageWrapper>
            <ZoomImage
              src="https://velog.velcdn.com/images/jiyean99/post/0819aabd-930a-4b26-afbb-452d94c4aac7/image.png"
              alt="DevOps Ecosystem"
            />
          </HeaderImageWrapper>
          <HeaderQuote>
            인프라를 누가, 어떻게 관리하고 운영할 것인지에 대한 고민은 단순한 기술 문제가 아니다. 개발팀 vs 운영팀의
            전통적 분업 구조부터, 현대 소프트웨어 개발의 표준으로 자리 잡은 DevOps 문화와 핵심 기술까지 체계적으로
            살펴본다.
          </HeaderQuote>
        </Header>

        <Section id="section1">
          <SectionTitleBlock num="1" title="개발팀 vs 운영팀: 역할과 책임의 차이" />
          <Paragraph>
            하나의 서비스가 탄생하고 유지되기 위해서는 역할을 명확히 분담한 두 조직의 협업이 필수적이다.
            <br />
            쉽게 말해 개발팀은 <strong style={{ color: 'var(--color-primary)' }}>&quot;만드는 팀&quot;</strong>, 운영팀은{' '}
            <strong style={{ color: 'var(--color-primary)' }}>&quot;돌보는 팀&quot;</strong>이라고 할 수 있다.
          </Paragraph>

          <GridTwo>
            <Card>
              <CardTitle>
                <Users size={20} color="var(--color-primary)" /> 개발팀 (Dev)
              </CardTitle>
              <CardText>
                신규 프로젝트 개발에 집중하며 코딩과 기능 구현을 담당한다. 예를 들어 6개월 단위로 새로운 시스템을
                구축한다면, 기능 설계와 테스트가 핵심 업무다.
              </CardText>
            </Card>
            <Card>
              <CardTitle>
                <Settings size={20} color="var(--color-primary)" /> 운영팀 (Ops)
              </CardTitle>
              <CardText>
                릴리즈 이후 시스템의 안정적인 운영을 책임진다. 에러 로그 분석, 시스템 다운 시 인프라 점검, 메모리 자원
                모니터링, OS 문제 진단 등 인프라 전반을 관리한다.
              </CardText>
            </Card>
          </GridTwo>

          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>구분</Th>
                  <Th>개발팀 (Dev)</Th>
                  <Th>운영팀 (Ops)</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td $muted>주요 역할</Td>
                  <Td>신규 프로젝트 개발 및 기능 구현</Td>
                  <Td>릴리즈 후 시스템 안정 운영 및 관리</Td>
                </tr>
                <tr>
                  <Td $muted>핵심 업무</Td>
                  <Td>코딩, 기능 구현, 단위 테스트</Td>
                  <Td>로그 분석, 인프라 점검, 자원 모니터링</Td>
                </tr>
                <tr>
                  <Td $muted>필요 역량</Td>
                  <Td>Java, Spring, DB 등 개발 기술</Td>
                  <Td>DevOps 역량, 리눅스 OS, 하드웨어 지식</Td>
                </tr>
                <tr>
                  <Td $muted>관리 범위</Td>
                  <Td>개발 환경 (IntelliJ, Git, Docker)</Td>
                  <Td>하드웨어, 운영체제(OS) 전체</Td>
                </tr>
              </tbody>
            </Table>
          </TableWrapper>
        </Section>

        <Section id="section2">
          <SectionTitleBlock num="2" title="DevOps란 무엇인가?" />
          <SectionIntro>
            <strong>DevOps</strong>는 개발(Development)과 운영(Operations)의 합성어로, 개발부터 배포, 운영까지의 전
            과정에서 통합적인 접근 방식을 추구하는 문화이자 관행을 의미한다.
          </SectionIntro>

          <GridTwo>
            <Card>
              <SmallHeading>
                <Dot />
                주요 활동
              </SmallHeading>
              <SmallText>
                버전 관리 시스템을 통한 자원 관리, 인프라 구축 및 운영 자동화(IaC), 지속적인 통합(CI)과 배포(CD), 그리고
                컨테이너 기술을 활용한 관리가 포함된다.
              </SmallText>
            </Card>
            <Card>
              <SmallHeading>
                <Dot />
                범위
              </SmallHeading>
              <SmallText>
                단순히 개발 툴을 다루는 것을 넘어 하드웨어와 리눅스 운영체제까지 아우르는 종합적인 인프라 관리 능력을
                요구한다.
              </SmallText>
            </Card>
          </GridTwo>
        </Section>

        <Section id="section3">
          <SectionTitleBlock num="3" title="DevOps 핵심 기술 01: 버전 관리 시스템 (VCS)" />
          <Paragraph>코드의 변경 이력을 관리하고 협업하기 위한 필수 도구다.</Paragraph>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <Card style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <CardTitle>
                <GitBranch size={20} color="var(--color-primary)" /> Git / GitHub
              </CardTitle>
              <CardText>
                소스 코드 버전 관리를 위해 가장 널리 쓰이는 시스템이다. GitHub는 Git 기반의 호스팅 서비스로 코드 리뷰와
                협업의 장을 제공한다.
              </CardText>
            </Card>
            <Card>
              <CardTitle>
                <Layers size={20} color="var(--color-gray-400)" /> SVN (Subversion)
              </CardTitle>
              <CardText>
                Apache 재단에서 개발한 중앙 집중형 버전 관리 시스템으로, Git이 대중화되기 전 널리 사용되던 방식이다.
              </CardText>
            </Card>
          </div>

          <LinkButton
            href="https://velog.io/@jiyean99/DevOps-Git-DevOps-에코시스템의-중심축-unwn80cl"
            target="_blank"
            rel="noreferrer"
          >
            [DevOps] Git 핸드북 글 보러가기 <ExternalLink size={14} />
          </LinkButton>
        </Section>

        <Section id="section4">
          <SectionTitleBlock num="4" title="DevOps 핵심 기술 02: 인프라의 진화 (Legacy to Cloud)" />
          <SectionIntro>인프라를 구축하고 운영하는 방식은 물리적인 환경에서 가상 환경으로 진화해 왔다.</SectionIntro>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '1rem' }}>
            <div>
              <CardTitle as="h3">
                <Server size={20} color="var(--color-gray-400)" /> 레거시 인프라 (Legacy Infrastructure)
              </CardTitle>
              <BulletList>
                <BulletItem>
                  <BulletDot />
                  <span>
                    <strong>운영 방식</strong>: 데이터센터 건물 내에 랙(Rack)을 설치하고 물리적으로 서버를 냉각 관리한다.
                    인프라팀이 하드웨어를 직접 담당하며, 개발자가 배포를 요청하면 물리 PC에 코드를 직접 올리는 구조다.
                  </span>
                </BulletItem>
                <BulletItem>
                  <BulletDot />
                  <span>
                    <strong>유형</strong>: 자체 물리 장비를 구매하여 소유하거나, 데이터센터의 장비를 대여하여 직접 방문
                    관리하는 방식이 있다.
                  </span>
                </BulletItem>
              </BulletList>
            </div>

            <Card style={{ background: 'color-mix(in srgb, var(--color-primary-light) 18%, #ffffff)' }}>
              <CardTitle>
                <Cloud size={20} color="var(--color-primary)" /> 클라우드 인프라 (Cloud Infrastructure)
              </CardTitle>
              <SmallText>
                <strong>AWS (Amazon Web Services)</strong>: 클라우드 서비스의 선두 주자로, API를 통해 물리적 접근 없이
                컴퓨팅(EC2), 스토리지(S3), 데이터베이스(RDS, Redis 등)를 즉시 빌려 쓴다. 방대한 커뮤니티와 서드파티 도구
                지원이 강력하다.
              </SmallText>
              <SmallText style={{ marginTop: '1rem' }}>
                <strong>기타</strong>: MS Azure, Google GCP 등이 있으며 국내에는 네이버 클라우드가 대표적이다.
              </SmallText>
            </Card>
          </div>
        </Section>

        <Section id="section5">
          <SectionTitleBlock num="5" title="DevOps 핵심 기술 03: 자동화와 가상화" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <CardTitle as="h3">
                <Terminal size={20} color="var(--color-primary)" /> 인프라스트럭처 코드 (IaC)
              </CardTitle>
              <GridTwo>
                <Card style={{ background: 'var(--color-surface)' }}>
                  <SmallHeading>
                    <Dot />
                    워크플로우
                  </SmallHeading>
                  <SmallText>UI에서 클릭으로 자원을 대여하던 방식을 코드로 진행하는 것이다.</SmallText>
                </Card>
                <Card style={{ background: 'var(--color-surface)' }}>
                  <SmallHeading>
                    <Dot />
                    도구 (Tools)
                  </SmallHeading>
                  <SmallText>
                    <strong>Terraform, Ansible</strong> 등을 통해 인프라 구성을 코드로 관리하여 일관성을 보장한다.
                  </SmallText>
                </Card>
              </GridTwo>
            </div>

            <div>
              <CardTitle as="h3">
                <RefreshCw size={20} color="var(--color-primary)" /> 지속적인 통합(CI) 및 배포(CD)
              </CardTitle>
              <Card
                style={{
                  borderLeft: '4px solid var(--color-primary)',
                  borderRadius: '0.85rem',
                }}
              >
                <BulletList>
                  <BulletItem>
                    <BulletDot />
                    <span>
                      <strong>CI (Continuous Integration)</strong>: 소스 코드 변경 시 자동으로 빌드와 테스트를 수행하여
                      통합한다.
                    </span>
                  </BulletItem>
                  <BulletItem>
                    <BulletDot />
                    <span>
                      <strong>CD (Continuous Deployment)</strong>: 검증된 코드를 운영 환경에 자동 배포하여 수동 배포 시
                      발생하는 인적 오류를 줄인다.
                    </span>
                  </BulletItem>
                  <BulletItem>
                    <BulletDot />
                    <span>
                      <strong>도구</strong>: Jenkins(방대한 플러그인), GitHub Actions(GitHub 통합) 등이 대표적이다.
                    </span>
                  </BulletItem>
                </BulletList>
              </Card>
            </div>

            <GridTwo>
              <Card>
                <CardTitle>
                  <Box size={20} color="var(--color-primary)" /> 컨테이너 & Docker
                </CardTitle>
                <SmallText>
                  <strong>특징</strong>: 라이브러리와 설정 파일을 패키징하여 격리된 공간에서 실행한다. 가볍고 어디서든
                  동일하게 동작하는 이식성이 강점이다.
                </SmallText>
                <SmallText style={{ marginTop: '0.75rem' }}>
                  <strong>Docker</strong>: 컨테이너 가상화를 쉽게 구현하고 관리하는 가장 인기 있는 플랫폼이다.
                </SmallText>
              </Card>

              <Card style={{ background: 'color-mix(in srgb, var(--color-primary-light) 22%, #ffffff)' }}>
                <CardTitle>
                  <Cpu size={20} color="var(--color-primary)" /> 오케스트레이션 & K8s
                </CardTitle>
                <SmallText>
                  <strong>개념</strong>: 여러 컨테이너의 배포, 확장, 관리를 자동화하는 &apos;오케스트레이션&apos; 기술이다.
                </SmallText>
                <SmallText style={{ marginTop: '0.75rem' }}>
                  <strong>Kubernetes (k8s)</strong>: 복잡한 MSA 아키텍처 운영 도구다. 주로 AWS <strong>EKS</strong> 같은
                  관리형 서비스를 활용한다.
                </SmallText>
              </Card>
            </GridTwo>

            <LinkButton
              href="https://velog.io/@jiyean99/DevOps-컨테이너-기반의-현대적-아키텍처"
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'var(--color-primary)',
                color: '#fff',
              }}
            >
              [DevOps] 현대적 아키텍처 글 보러가기 <ExternalLink size={14} />
            </LinkButton>
          </div>
        </Section>

        <HeaderQuote>
          결국 현대 인프라는 물리적인 서버 관리에서 벗어나 코드로 자동화하고 컨테이너로 격리하는 방향으로 가고 있다.
          <br />
          <strong>이 모든 과정이 바로 DevOps의 핵심이다.</strong>
        </HeaderQuote>
      </Main>
    </Shell>
  )
}

export default App

