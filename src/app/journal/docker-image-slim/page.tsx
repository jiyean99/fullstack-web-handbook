'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {
  Box,
  Layers,
  Scissors,
  Gauge,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react'
import ContentDoc, {
  Section,
  SectionTitleBlock,
  Paragraph,
  SectionIntro,
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
  { id: 'section1', label: '1. 증상: 느려진 빌드와 푸시' },
  { id: 'section2', label: '2. 원인: 빌드 도구까지 담긴 이미지' },
  { id: 'section3', label: '3. 멀티스테이지 빌드' },
  { id: 'section4', label: '4. 레이어 캐싱과 .dockerignore' },
  { id: 'section5', label: '5. 결과와 교훈' },
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

export default function DockerImageSlimPage() {
  return (
    <ContentDoc
      badge="Journal · DevOps"
      badgeIcon={<Box size={12} />}
      title="1.2GB 이미지를 180MB로 — Docker 다이어트 기록"
      quote={
        <>
          CI에서 이미지 빌드와 레지스트리 푸시가 점점 느려졌다. 원인은 1GB가 넘는 비대한 이미지.
          멀티스테이지 빌드와 경량 베이스, 캐싱 전략으로 7분의 1 크기로 줄인 과정을 남긴다.
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
        <SectionTitleBlock num="1" title="증상: 느려진 빌드와 푸시" />
        <Paragraph>
          배포 파이프라인의 이미지 푸시 단계가 갈수록 느려졌다. <code>docker images</code>로
          확인하니 애플리케이션 이미지 하나가 <strong>1.2GB</strong>였다. 매 배포마다 이 덩치를
          빌드하고 레지스트리에 올리니 느릴 수밖에 없었다.
        </Paragraph>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <Gauge size={18} color="var(--color-warning)" /> 큰 이미지의 비용
          </CardTitle>
          <CardText>
            이미지가 크면 빌드·푸시·풀 시간이 모두 늘고, 스토리지 비용과 콜드 스타트도 커진다.
            또한 불필요한 패키지가 많을수록 <strong>공격 표면(attack surface)</strong>도 넓어진다.
          </CardText>
        </Card>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="원인: 빌드 도구까지 담긴 이미지" />
        <SectionIntro>
          Dockerfile을 보니 하나의 스테이지에서 빌드와 실행을 모두 처리하고 있었다. 그 결과
          <strong> 런타임에 필요 없는</strong> JDK 전체, 빌드 캐시, devDependencies가 최종
          이미지에 그대로 남았다.
        </SectionIntro>

        <CodeBlock label="문제의 Dockerfile (단일 스테이지)">{`FROM openjdk:17        # JDK 전체 (~470MB)
WORKDIR /app
COPY . .               # 소스 + 빌드 산출물 + .git 까지
RUN ./gradlew build    # 빌드 캐시·중간 산출물이 레이어에 박힘
CMD ["java", "-jar", "build/libs/app.jar"]`}</CodeBlock>

        <Paragraph>
          런타임에는 JRE와 <code>app.jar</code> 하나만 있으면 되는데, 빌드 도구 일체가 함께
          실려 있었다.
        </Paragraph>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="멀티스테이지 빌드" />
        <Paragraph>
          핵심 해결책은 <strong>멀티스테이지 빌드</strong>다. &lsquo;빌드용 스테이지&rsquo;에서
          컴파일하고, 그 산출물만 &lsquo;실행용 경량 스테이지&rsquo;로 복사한다. 빌드 도구는
          최종 이미지에 남지 않는다.
        </Paragraph>

        <CodeBlock label="개선된 Dockerfile (멀티스테이지)">{`# 1단계: 빌드 (무거운 도구는 여기서만 사용)
FROM gradle:8-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle build --no-daemon

# 2단계: 실행 (경량 JRE에 산출물만 복사)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`}</CodeBlock>

        <BulletList>
          <Bullet>
            <strong>경량 베이스</strong>: <code>jdk</code> → <code>jre-alpine</code>으로 바꾸니
            베이스만 수백 MB 줄었다.
          </Bullet>
          <Bullet>
            <strong>산출물만 복사</strong>: <code>COPY --from=build</code>로 jar 하나만 가져오니
            빌드 캐시·소스가 사라졌다.
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="레이어 캐싱과 .dockerignore" />
        <SectionIntro>
          용량을 줄였으면 이제 빌드 속도다. Docker는 레이어 단위로 캐싱하므로, 자주 바뀌지 않는
          것을 먼저 복사하면 캐시 적중률이 올라간다.
        </SectionIntro>

        <CodeBlock label="의존성 레이어 분리 (Node 예시)">{`COPY package*.json ./
RUN npm ci              # package가 안 바뀌면 이 레이어는 캐시됨
COPY . .                # 소스만 바뀌면 위 레이어는 재사용
RUN npm run build`}</CodeBlock>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <Scissors size={18} color="var(--color-primary)" /> .dockerignore
          </CardTitle>
          <CardText>
            <code>node_modules</code>, <code>.git</code>, 빌드 산출물을 <code>.dockerignore</code>
            로 제외하면, 빌드 컨텍스트 전송이 빨라지고 불필요한 파일이 이미지에 새어 들어가지
            않는다.
          </CardText>
        </Card>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="결과와 교훈" />
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>항목</Th>
                <Th>이전</Th>
                <Th>이후</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>이미지 크기</Td>
                <Td>1.2GB</Td>
                <Td>약 180MB</Td>
              </tr>
              <tr>
                <Td $muted>푸시 시간</Td>
                <Td>분 단위</Td>
                <Td>수십 초</Td>
              </tr>
              <tr>
                <Td $muted>재빌드(소스만 변경)</Td>
                <Td>전체 재빌드</Td>
                <Td>캐시 적중 → 빠름</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>

        <Card style={{ background: 'var(--color-surface)' }}>
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 남은 교훈
          </CardTitle>
          <BulletList>
            <Bullet>
              <strong>빌드와 실행을 분리하라</strong>: 멀티스테이지는 거의 모든 컴파일 언어에서
              가장 효과가 크다.
            </Bullet>
            <Bullet>
              <strong>최종 이미지엔 런타임만</strong>: 빌드 도구·캐시·소스는 실행에 필요 없다.
            </Bullet>
            <Bullet>
              <strong>변경 빈도 순으로 레이어 배치</strong>: 덜 바뀌는 것을 먼저 복사해 캐시를
              살린다.
            </Bullet>
            <Bullet>
              <AlertTriangle size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
              <strong>alpine 주의</strong>: glibc 의존 라이브러리는 musl 기반 alpine에서 문제가
              날 수 있다. 이 경우 <code>slim</code> 계열을 고려한다.
            </Bullet>
          </BulletList>
        </Card>

        <Paragraph style={{ marginTop: 'var(--sp-6)' }}>
          컨테이너의 기본 개념은{' '}
          <Link href="/devops/container" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            컨테이너와 클라우드 네이티브
          </Link>{' '}
          글에서, 빌드 자동화는{' '}
          <Link href="/devops/cicd" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            CI/CD 파이프라인
          </Link>{' '}
          글에서 다룬다.
        </Paragraph>

        <HeaderQuote>
          <Layers size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
          좋은 이미지는 &lsquo;실행에 필요한 것만&rsquo; 담는다.
          <br />
          <strong>빌드와 런타임을 나누면, 용량도 보안도 빌드 속도도 함께 좋아진다.</strong>
        </HeaderQuote>
      </Section>
    </ContentDoc>
  )
}
