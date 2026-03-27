'use client'

import React from 'react'
import styled from 'styled-components'
import { Box, ChevronRight, BookOpen } from 'lucide-react'
import {
  PackagingInteractiveSvg,
  IsolationInteractiveSvg,
  PortabilityInteractiveSvg,
  CicdInteractiveSvg,
  K8sInteractiveSvg,
} from './ContainerDiagrams'

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

const SidebarButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-lg);
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
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
  margin-bottom: var(--sp-3);
`

const Title = styled.h1`
  font-size: clamp(1.85rem, 3.2vw, 2.5rem);
  font-weight: 900;
  color: var(--color-text);
  letter-spacing: -0.04em;
  margin-bottom: var(--sp-5);
`

const HeaderQuote = styled.blockquote`
  border-left: 4px solid var(--color-docker-blue, var(--color-primary));
  padding-left: var(--sp-6);
  padding-block: var(--sp-2);
  margin-bottom: var(--sp-6);
  font-size: 1.02rem;
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
  background: var(--color-docker-blue, var(--color-primary));
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

const DiagramSlot = styled.div`
  width: 100%;
  margin-bottom: var(--sp-6);
`

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 var(--sp-6);
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
`

const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: var(--sp-2);
  font-size: 0.92rem;
  color: var(--color-text-muted);
  line-height: 1.75;
`

const BulletDot = styled.div`
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 999px;
  background: var(--color-docker-blue, var(--color-primary));
  margin-top: 0.45rem;
  flex-shrink: 0;
`

const ClosingQuote = styled.blockquote`
  margin: var(--sp-8) 0 0;
  padding: var(--sp-6);
  border-radius: 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.7;
`

const menuItems = [
  { id: 'packaging', label: '컨테이너 개요' },
  { id: 'features', label: '기술적 특징' },
  { id: 'portability', label: '이식성' },
  { id: 'cicd', label: 'CI/CD' },
  { id: 'k8s', label: '오케스트레이션' },
  { id: 'closing', label: '마치며' },
]

export default function ContainerPage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Shell>
      <Sidebar>
        <SidebarHeader>
          <BookOpen size={20} color="var(--color-docker-blue, var(--color-primary))" />
          <SidebarTitle>목차</SidebarTitle>
        </SidebarHeader>
        <SidebarNav>
          {menuItems.map((item) => (
            <SidebarButton key={item.id} type="button" onClick={() => scrollTo(item.id)}>
              {item.label}
              <ChevronIcon />
            </SidebarButton>
          ))}
        </SidebarNav>
      </Sidebar>

      <Main>
        <Header>
          <Badge>
            <Box size={12} /> DevOps · 컨테이너
          </Badge>
          <Title>컨테이너와 클라우드 네이티브: DevOps·MSA의 실행 기반</Title>
          <HeaderQuote>
            컨테이너는 오늘날 <strong>DevOps와 마이크로서비스 아키텍처(MSA)</strong> 시대를 대표하는 핵심 기술이다.
            급변하는 시장 환경에서는 기능 추가와 배포가 더 빠르고 유연해야 하며, 이는 결국 개발자와 운영자가 긴밀히 협업하는
            체계를 필요로 한다. 컨테이너는 바로 그 협업의 매개체로서,{' '}
            <strong>개발 환경에서의 실행 결과를 운영 환경에서도 그대로 보장</strong>함으로써 DevOps 문화의 기반을 만든다.
          </HeaderQuote>
          <Paragraph>
            특히 클라우드 네이티브 환경에서는 수많은 애플리케이션 인스턴스가 빠르게 생성되고 교체된다. 이 과정에서
            일관적인 환경과 자동화된 운영 체계를 보장하는 것이 현대적 아키텍처의 핵심 원리이며, 컨테이너는 이를 실현하는
            표준 도구다.
          </Paragraph>
        </Header>

        <Section id="packaging">
          <SectionTitleRow>
            <SectionBadge>1</SectionBadge>
            <SectionTitle>컨테이너 개요: 애플리케이션 패키징 기술의 변화</SectionTitle>
          </SectionTitleRow>
          <DiagramSlot>
            <PackagingInteractiveSvg />
          </DiagramSlot>
          <Paragraph>
            전통적인 애플리케이션 배포 방식은 물리 서버나 가상 머신 위에 OS, 런타임, 라이브러리를 직접 설치하는 구조였다.
            이 방식은 운영 환경별로 설정이 조금만 달라도 문제가 발생하는{' '}
            <strong>환경 불일치(Environment Drift)</strong> 문제를 야기했다. 개발자들이 흔히 말하는 “내 PC에서는 잘
            되는데?”라는 말이 그 전형적인 사례다.
          </Paragraph>
          <Paragraph>
            컨테이너 기술은 이러한 문제를 근본적으로 해결한다. 애플리케이션 실행에 필요한{' '}
            <strong>바이너리, 라이브러리, 환경 설정을 하나의 이미지로 패키징</strong>함으로써, 어떤 인프라 위에서도 동일하게
            동작한다. 이로써 배포에서의 불확실성을 제거하고, 개발·테스트·운영 간의 <strong>논리적 일관성</strong>이
            확보된다.
          </Paragraph>
        </Section>

        <Section id="features">
          <SectionTitleRow>
            <SectionBadge>2</SectionBadge>
            <SectionTitle>기술적 특징: 프로세스 레벨의 독립성과 격리성</SectionTitle>
          </SectionTitleRow>
          <DiagramSlot>
            <IsolationInteractiveSvg />
          </DiagramSlot>
          <Paragraph>
            컨테이너는 <strong>리눅스 커널의 Namespaces와 Cgroups(Control Groups)</strong> 기능을 바탕으로 프로세스 수준의
            격리를 제공한다. 가상 머신(VM)처럼 완전히 별도의 OS를 부팅하지 않기 때문에 훨씬 가볍고 빠르다. 실제로는 호스트
            커널을 공유하지만, 각 컨테이너 내부에서는 마치 독립된 운영체제처럼 동작한다.
          </Paragraph>
          <BulletList>
            <BulletItem>
              <BulletDot />
              <span>
                <strong>포트 및 네트워크 격리:</strong> 컨테이너마다 독립적인 가상 네트워크 인터페이스를 제공하여 포트
                충돌 없이 병렬 동작이 가능하다.
              </span>
            </BulletItem>
            <BulletItem>
              <BulletDot />
              <span>
                <strong>파일 시스템 격리:</strong> 각 컨테이너는 자체 루트 파일 시스템을 갖고 있어, 다른 컨테이너나 호스트의
                파일과 분리되어 있다.
              </span>
            </BulletItem>
            <BulletItem>
              <BulletDot />
              <span>
                <strong>리소스 제어:</strong> Cgroups를 통해 CPU나 메모리와 같은 자원 사용량을 제한하여, 특정 컨테이너가
                전체 노드를 점유하는 문제를 방지한다.
              </span>
            </BulletItem>
          </BulletList>
          <Paragraph>
            이러한 격리 메커니즘 덕분에 컨테이너는 VM보다 훨씬 가벼운 단위로 수십, 수백 개까지 확장 가능하며, 이는 대규모
            MSA 구현에 결정적인 장점이 된다.
          </Paragraph>
        </Section>

        <Section id="portability">
          <SectionTitleRow>
            <SectionBadge>3</SectionBadge>
            <SectionTitle>운영 효율성: 컨테이너 이식성(Portability)</SectionTitle>
          </SectionTitleRow>
          <DiagramSlot>
            <PortabilityInteractiveSvg />
          </DiagramSlot>
          <Paragraph>
            컨테이너의 핵심 가치는 ‘<strong>어디서나 동일하게 실행된다</strong>’는 이식성이다. 개발자의 로컬 환경에서
            검증된 이미지가 테스트 서버, 스테이징, 그리고 운영 환경에서도 정확히 똑같이 동작한다. 이는 환경 불일치로 인한
            배포 실패를 획기적으로 줄이며, 서비스 안정성을 높인다.
          </Paragraph>
          <Paragraph>
            또한, 컨테이너 이미지가 하부 인프라와 분리되어 있기 때문에 특정 클라우드에 종속되지 않는다. 예를 들어, AWS ECS에서
            실행하던 이미지를 Kubernetes 기반의 GKE(Google Kubernetes Engine)나 AKS(Azure)로 옮겨도 동일하게 동작한다.
            이로써 기업은 클라우드 벤더 락인(lock-in) 문제에서 자유로워지고,{' '}
            <strong>멀티 클라우드와 하이브리드 클라우드 전략</strong>을 유연하게 구현할 수 있다.
          </Paragraph>
        </Section>

        <Section id="cicd">
          <SectionTitleRow>
            <SectionBadge>4</SectionBadge>
            <SectionTitle>지속적 자동화: CI/CD 파이프라인 최적화</SectionTitle>
          </SectionTitleRow>
          <DiagramSlot>
            <CicdInteractiveSvg />
          </DiagramSlot>
          <Paragraph>
            DevOps의 핵심은 <strong>속도, 안정성, 협업</strong>이다. 이를 뒷받침하는 것이 바로{' '}
            <strong>지속적 통합(CI)</strong>과 <strong>지속적 배포(CD)</strong>다. 컨테이너는 이 CI/CD 프로세스의 완성도를
            높이는 기반이 된다.
          </Paragraph>
          <BulletList>
            <BulletItem>
              <BulletDot />
              <span>
                <strong>CI (Continuous Integration):</strong> 코드가 커밋되면 GitHub Actions, Jenkins, GitLab CI 등이
                자동으로 빌드와 테스트를 실행하고 컨테이너 이미지를 생성한다.
              </span>
            </BulletItem>
            <BulletItem>
              <BulletDot />
              <span>
                <strong>CD (Continuous Deployment):</strong> 빌드된 이미지는 Docker Hub, ECR, GCR 등 레지스트리에 저장되고,
                운영 환경으로 자동 배포된다.
              </span>
            </BulletItem>
          </BulletList>
          <Paragraph>
            컨테이너 덕분에 환경 차이로 인한 빌드 오류가 사라지며, QA 및 배포 프로세스가 완전히 자동화된다. 이러한 자동화
            구조는 개발팀과 운영팀 간의 협업을 강화하여, DevOps 문화가 조직 전반에 정착되는 기반이 된다. 즉, 컨테이너는
            단순히 배포 단위를 넘어 조직의 <strong>개발 문화와 프로세스 혁신을 가속화</strong>하는 역할을 한다.
          </Paragraph>
        </Section>

        <Section id="k8s">
          <SectionTitleRow>
            <SectionBadge>5</SectionBadge>
            <SectionTitle>오케스트레이션: Kubernetes를 통한 대규모 자원 관리</SectionTitle>
          </SectionTitleRow>
          <DiagramSlot>
            <K8sInteractiveSvg />
          </DiagramSlot>
          <Paragraph>
            애플리케이션이 수십 개의 컨테이너로 구성되는 MSA 환경에서는, 컨테이너의 배포·확장·복구를 수동으로 관리하기
            어렵다. 이 문제를 해결하는 것이 바로 <strong>Kubernetes(쿠버네티스)</strong>다.
          </Paragraph>
          <Paragraph>
            Kubernetes는 “<strong>사용자가 정의한 원하는 상태(Desired State)</strong>”를 기준으로 클러스터를 지속적으로
            관리한다. 예를 들어, 3개의 애플리케이션 인스턴스(Pod)가 항상 실행되어야 한다고 정의하면, 하나가 비정상
            종료되더라도 자동으로 새 인스턴스를 생성하여 상태를 복원한다.
          </Paragraph>
          <Paragraph>Kubernetes의 주요 기능:</Paragraph>
          <BulletList>
            <BulletItem>
              <BulletDot />
              <span>
                <strong>Self-Healing:</strong> 비정상 컨테이너를 자동 감지·재시작하여 서비스 중단 방지
              </span>
            </BulletItem>
            <BulletItem>
              <BulletDot />
              <span>
                <strong>Auto Scaling:</strong> 부하량에 따라 Pod 또는 노드 자원을 자동 확장/축소
              </span>
            </BulletItem>
            <BulletItem>
              <BulletDot />
              <span>
                <strong>Service Discovery:</strong> 컨테이너의 동적 IP를 추상화해 네트워크 라우팅을 자동 관리
              </span>
            </BulletItem>
          </BulletList>
          <Paragraph>
            이러한 자동화된 인프라 운영은 엔지니어가 인프라 세부 관리에서 벗어나,{' '}
            <strong>비즈니스 가치 창출에 집중할 수 있는 환경</strong>을 만든다.
          </Paragraph>
        </Section>

        <Section id="closing">
          <SectionTitleRow>
            <SectionBadge>6</SectionBadge>
            <SectionTitle>마치며</SectionTitle>
          </SectionTitleRow>
          <ClosingQuote>
            컨테이너는 기술이 아니라 문화의 기반
          </ClosingQuote>
          <Paragraph>
            컨테이너는 단순히 애플리케이션을 실행하기 위한 기술이 아니다. 그것은 <strong>DevOps 문화</strong>,{' '}
            <strong>자동화된 운영</strong>, <strong>마이크로서비스 확장성</strong>, <strong>클라우드 이식성</strong>이라는
            현대 소프트웨어 개발의 철학을 실현하는 기반이다.
          </Paragraph>
          <Paragraph>
            컨테이너를 중심으로 CI/CD 파이프라인, 오케스트레이션, 모니터링, 보안을 통합하면, 조직은 빠른 배포와 안정적
            운영을 동시에 달성할 수 있다. 결국 컨테이너 기반 아키텍처는 기술 혁신을 넘어 조직이{' '}
            <strong>지속적으로 성장할 수 있는 개발 문화의 방향성</strong>을 제시한다.
          </Paragraph>
        </Section>
      </Main>
    </Shell>
  )
}
