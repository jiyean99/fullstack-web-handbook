import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { H1, H2, H3, H4, Heading, Text } from '../Typography'

const meta: Meta = {
  title: 'Common/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'styled-components로 구현한 타이포그래피 시스템입니다. 제목(H1~H4)과 본문(Text) 컴포넌트를 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Headings: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <H1>H1 — 페이지 최상위 제목</H1>
      <H2>H2 — 섹션 제목</H2>
      <H3>H3 — 서브섹션 제목</H3>
      <H4>H4 — 세부 제목</H4>
    </div>
  ),
}

export const TextVariants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Text as="p">Body — 기본 본문 텍스트입니다. 가독성을 위해 1.625 line-height를 사용합니다.</Text>
      <Text variant="lead" as="p">Lead — 강조된 리드 텍스트. 섹션 도입부에 사용됩니다.</Text>
      <Text variant="small" as="p">Small — 보조 설명, 메타 정보에 사용되는 작은 텍스트입니다.</Text>
      <Text variant="muted" as="p">Muted — 회색으로 표시되는 보조 텍스트입니다.</Text>
      <Text variant="code" as="span">code — 인라인 코드 스타일</Text>
    </div>
  ),
}

export const HeadingComponent: StoryObj<typeof Heading> = {
  render: (args) => <Heading {...args}>{'Heading via polymorphic \'as\' prop'}</Heading>,
  args: {
    as: 'h2',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4'],
    },
  },
}
