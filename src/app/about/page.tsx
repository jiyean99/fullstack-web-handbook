import type { Metadata } from 'next'
import SectionLanding from '@/components/layout/SectionLanding'
import AboutExtra from '@/components/layout/AboutExtra'

export const metadata: Metadata = { title: 'About' }

const subCards = [
  {
    icon: '📋',
    title: 'Changelog',
    href: '/about/changelog',
    desc: '프로젝트 업데이트 이력 — 새로 추가된 섹션, 컴포넌트 변경사항, 주요 리팩토링 기록.',
    accent: 'var(--color-gray-500)',
  },
  {
    icon: '📝',
    title: '작성 가이드라인',
    href: '/about/writing-guidelines',
    desc: '파일 네이밍 규칙, 문서 템플릿 구조, 컴포넌트 개발 원칙, 커밋 컨벤션.',
    accent: 'var(--color-info)',
  },
]

export default function AboutPage() {
  return (
    <SectionLanding
      badge="About"
      icon="ℹ️"
      title="이 핸드북에 대하여"
      description="BE · FE · DevOps 전반을 다루는 개인 웹개발 단권화 레퍼런스입니다. 미래의 나와 면접관을 위한 실무 중심 정리 공간이며, 포트폴리오 겸 개발 스타일 쇼케이스입니다."
      accentColor="var(--color-gray-500)"
      subCards={subCards}
      extra={<AboutExtra />}
    />
  )
}
