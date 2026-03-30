'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Globe,
  Server,
  ShieldCheck,
  Zap,
  Network,
  Lock,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  ChevronRight,
  ExternalLink,
  Settings,
  AlertTriangle,
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

const SidebarButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-lg);
  border: none;
  background: ${({ $active }) => ($active ? 'var(--color-surface)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--color-text)' : 'var(--color-text-muted)')};
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;

  &:hover {
    background: var(--color-surface);
    color: var(--color-text);
  }
  &:hover > *:last-child {
    opacity: 1;
  }
`

const ChevronIcon = styled(ChevronRight)`
  width: 0.9rem;
  height: 0.9rem;
  opacity: 0;
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

const NetworkPage = () => {
  const [activeSection, setActiveSection] = useState('section1')

  const menuItems = [
    { id: 'section1', label: '1. IP 주소 체계: IPv4와 IPv6' },
    { id: 'section2', label: '2. 공인 IP vs 사설 IP' },
    { id: 'section3', label: '3. 포트포워딩이 필요한 이유' },
    { id: 'section4', label: '4. 포트포워딩 설정 단계' },
    { id: 'section5', label: '5. 보안 위험과 대안' },
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
          <SidebarTitle>
            <Network size={18} color="var(--color-primary)" />
            목차
          </SidebarTitle>
        </SidebarHeader>
        <SidebarNav>
          {menuItems.map((item) => (
            <SidebarButton
              key={item.id}
              onClick={() => scrollTo(item.id)}
              $active={activeSection === item.id}
            >
              {item.label}
              <ChevronIcon />
            </SidebarButton>
          ))}
        </SidebarNav>
      </Sidebar>

      <Main>
        <Header>
          <Title>IP 주소 체계와 포트포워딩의 원리</Title>
          <HeaderQuote>
            네트워크의 가장 기초가 되는 IP 주소 체계부터, 내 방에 있는 PC를 외부 인터넷망에 연결하기 위한 필수 과정인 포트포워딩까지 상세하게 정리한다.
          </HeaderQuote>
        </Header>

        <Section id="section1">
          <SectionTitleBlock num="1" title="IP 주소 체계: IPv4와 IPv6" />
          <Paragraph>
            네트워크 통신을 위해 기기마다 부여되는 고유한 식별 번호를 IP(Internet Protocol) 주소라고 한다. 현재 우리가 주로 사용하는 체계는 크게 두 가지로 나뉜다.
          </Paragraph>

          <GridTwo>
            <Card>
              <CardTitle>
                <Globe size={20} color="var(--color-primary)" /> IPv4
              </CardTitle>
              <CardText>
                4옥텟(32비트) 구조로 구성되며, <code>xxx.xxx.xxx.xxx</code> (0~255) 형태를 가진다. 총 약 43억 개의 주소를 만들 수 있으나, 현재 전 세계적으로 주소가 고갈된 상태다.
              </CardText>
            </Card>
            <Card>
              <CardTitle>
                <Zap size={20} color="var(--color-primary)" /> IPv6
              </CardTitle>
              <CardText>
                IPv4의 부족 문제를 해결하기 위해 등장한 8그룹(128비트) 구조다. 16진수를 사용하여 무한에 가까운 주소 확장이 가능하다.
              </CardText>
            </Card>
          </GridTwo>
        </Section>

        <Section id="section2">
          <SectionTitleBlock num="2" title="공인 IP vs 사설 IP" />
          <SectionIntro>모든 IP 주소는 사용 범위에 따라 공인(Public)과 사설(Private)로 구분된다.</SectionIntro>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <Card>
              <CardTitle>
                <Globe size={20} color="var(--color-primary)" /> 공인 IP (Public IP)
              </CardTitle>
              <CardText>
                인터넷 전 세계 어디서든 접근이 가능한 주소다. ISP(통신사)로부터 할당받으며, 유일성이 보장된다.
              </CardText>
            </Card>
            <Card>
              <CardTitle>
                <Lock size={20} color="var(--color-gray-400)" /> 사설 IP (Private IP)
              </CardTitle>
              <CardText>
                로컬 네트워크(집, 내부망) 안에서만 사용하는 전용 주소다. 외부에서 직접 접근할 수 없으며, 공유기 내부 기기들끼리 통신할 때 사용한다.
              </CardText>
            </Card>
          </div>

          <Card style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <CardTitle>
              <AlertTriangle size={18} color="var(--color-warning)" /> 비교 예시
            </CardTitle>
            <CardText>
              예를 들어, <code>211.234.***.***</code> 같은 주소는 외부 공개가 가능한 <strong>공인 IP</strong>이며, <code>192.168.1.100</code> 같은 주소는 내부 전용인 <strong>사설 IP</strong>다.
            </CardText>
          </Card>
        </Section>

        <Section id="section3">
          <SectionTitleBlock num="3" title="포트포워딩(Port Forwarding)이 필요한 이유" />
          <Paragraph>
            우리의 실습에서는 AWS 데이터센터에서 빌린 서버(공인 IP)를 사용했지만, 만약 이를 내 PC(집)에 배포하고 싶다면 로컬 PC를 공인망에 노출해야 하는 과정이 필요하다.
          </Paragraph>

          <div style={{ marginBottom: '2rem' }}>
            <ZoomImage
              src="https://velog.velcdn.com/images/jiyean99/post/9e54fc9d-56d6-42ee-9474-3840821fcf00/image.png"
              alt="Port Forwarding Concept"
              caption="포트포워딩의 기본 개념도"
            />
          </div>

          <BulletList>
            <BulletItem>
              <BulletDot />
              <span>
                <strong>문제 상황</strong>: 신대방 집 PC(사설 IP: <code>192.168.1.100</code>)는 공유기 뒤에 숨어 있다. 외부(인터넷)에서 공유기까지는 올 수 있지만, 그 뒤에 있는 특정 PC까지는 찾아올 수 없다.
              </span>
            </BulletItem>
            <BulletItem>
              <BulletDot />
              <span>
                <strong>해결 과정</strong>: 외부에서 공유기의 특정 포트로 들어오는 요청을 내부 PC의 특정 사설 IP와 포트로 연결해 주는 &apos;이정표&apos;를 세워야 한다. 이를 <strong>포트포워딩</strong>이라 부른다.
              </span>
            </BulletItem>
          </BulletList>
        </Section>

        <Section id="section4">
          <SectionTitleBlock num="4" title="포트포워딩 설정 단계" />
          <SectionIntro>내 PC를 외부망에 노출하는 구체적인 과정은 다음과 같다.</SectionIntro>

          <GridTwo>
            <Card>
              <SmallHeading>
                <Dot />
                1. 공인 IP 확인
              </SmallHeading>
              <SmallText>
                공유기 관리자 페이지(예: <code>192.168.1.1</code>)에 접속하여 현재 할당된 공인 IP를 확인한다.
              </SmallText>
            </Card>
            <Card>
              <SmallHeading>
                <Dot />
                2. 포트포워딩 설정
              </SmallHeading>
              <SmallText>
                관리자 페이지에서 <code>공인IP:8080</code>을 <code>사설IP:8080</code>으로 매핑한다.
              </SmallText>
            </Card>
          </GridTwo>

          <Card style={{ background: 'color-mix(in srgb, var(--color-primary-light) 10%, var(--color-bg))' }}>
            <CardTitle>
              <ShieldCheck size={20} color="var(--color-primary)" /> 3. 외부 접속 테스트
            </CardTitle>
            <CardText>
              이제 외부망에서 <code>공인IP:8080</code> 주소로 접속하면, 공유기를 거쳐 내 집 PC로 연결되는 것을 확인할 수 있다.
            </CardText>
          </Card>
        </Section>

        <Section id="section5">
          <SectionTitleBlock num="5" title="보안 위험과 대안" />
          <Paragraph>
            포트포워딩은 내 서버로 들어오는 문을 열어두는 것과 같기 때문에 몇 가지 주의할 점이 있다.
          </Paragraph>

          <GridTwo>
            <Card>
              <CardTitle>
                <ShieldAlert size={20} color="var(--color-error)" /> 보안 위험
              </CardTitle>
              <SmallText>
                공인 IP가 노출되면 해킹 시도의 타겟이 되기 쉽다. 특히 기본 포트(22, 80, 443)를 그대로 열어두는 것은 위험하다.
              </SmallText>
            </Card>
            <Card>
              <CardTitle>
                <Settings size={20} color="var(--color-gray-400)" /> 설정 복잡성
              </CardTitle>
              <SmallText>
                공유기 설정뿐만 아니라 윈도우/맥의 방화벽 설정까지 신경 써야 하며, 가정용 IP는 수시로 바뀔 수 있다.
              </SmallText>
            </Card>
          </GridTwo>

          <Card style={{ background: 'var(--color-surface)' }}>
            <CardTitle>
              <Zap size={20} color="var(--color-primary)" /> 현대적인 대안
            </CardTitle>
            <CardText>
              이러한 복잡함과 위험을 피하기 위해 <strong>ngrok</strong>이나 <strong>Cloudflare Tunnel</strong> 같은 서비스를 통해 공인 IP 노출 없이 터널링을 구현하기도 한다.
            </CardText>
          </Card>
        </Section>

        <HeaderQuote>
          네트워크 기초 체력을 기르는 것은 DevOps 엔지니어에게 필수적이다. IP와 포트의 개념을 정확히 이해해야 복잡한 클라우드 네트워크 환경에서도 길을 잃지 않는다.
        </HeaderQuote>
      </Main>
    </Shell>
  )
}

export default NetworkPage
