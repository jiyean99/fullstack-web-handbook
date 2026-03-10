import type { Metadata } from 'next'
import styled from 'styled-components'
import { Info, ClipboardList, FileText } from 'lucide-react'
import SectionDetailLayout from '@/components/layout/SectionDetailLayout'
import AboutExtra from '@/components/layout/AboutExtra'

export const metadata: Metadata = { title: 'About' }

const sections = [
  {
    id: 'overview',
    title: '프로젝트 소개',
    icon: <Info size={18} />,
    color: 'var(--color-gray-500)',
    summary: 'Fullstack Web Handbook의 목적과 철학',
    items: [
      {
        name: '개인 웹개발 단권화 레퍼런스',
        desc: 'BE · FE · DevOps 전반을 한곳에 정리해 미래의 나와 면접관을 위한 지식 베이스를 만드는 것이 목표입니다.',
      },
      {
        name: '실무 중심 정리',
        desc: '단순 이론이 아닌 실무에서 부딪힌 문제와 해결 과정을 중심으로 정리합니다.',
      },
    ],
  },
  {
    id: 'changelog',
    title: 'Changelog',
    icon: <ClipboardList size={18} />,
    color: 'var(--color-gray-500)',
    summary: '프로젝트 업데이트 이력',
    items: [
      {
        name: '섹션 추가 및 개편',
        desc: '새로 추가된 섹션, 컴포넌트 변경사항, 주요 리팩토링 기록을 남깁니다.',
      },
    ],
  },
  {
    id: 'writing-guidelines',
    title: '작성 가이드라인',
    icon: <FileText size={18} />,
    color: 'var(--color-info)',
    summary: '문서와 코드 작성 규칙',
    items: [
      {
        name: '파일 네이밍 & 템플릿',
        desc: '파일 네이밍 규칙과 문서 템플릿 구조를 정의해 일관성을 유지합니다.',
      },
      {
        name: '커밋 & 코드 스타일',
        desc: '커밋 메시지 컨벤션과 컴포넌트 개발 원칙을 정리합니다.',
      },
    ],
  },
]

const ExtraWrapper = styled.div`
  max-width: 1120px;
  margin: 0 auto var(--sp-10);
  padding: 0 var(--sp-4);
`

export default function AboutPage() {
  return (
    <>
      <SectionDetailLayout
        badgeLabel="About"
        badgeIcon={<Info size={18} />}
        badgeAccent="var(--color-gray-500)"
        title="이 핸드북에 대하여"
        description="BE · FE · DevOps 전반을 다루는 개인 웹개발 단권화 레퍼런스입니다. 미래의 나와 면접관을 위한 실무 중심 정리 공간이며, 포트폴리오 겸 개발 스타일 쇼케이스입니다."
        lastUpdated="2026.03.10"
        readTime="8 min"
        sections={sections}
        quickLinksTitle="Quick Links"
        quickLinksIcon={<Info size={16} color="var(--color-gray-500)" />}
        quickLinks={[
          { label: 'Changelog', href: '/about/changelog' },
          { label: '작성 가이드라인', href: '/about/writing-guidelines' },
        ]}
        previous={{ href: '/architecture', label: '아키텍처 & 패턴' }}
        next={undefined}
      />
      <ExtraWrapper>
        <AboutExtra />
      </ExtraWrapper>
    </>
  )
}

