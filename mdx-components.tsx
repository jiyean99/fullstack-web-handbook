import React from 'react'
import { useMDXComponents as useNextraMDXComponents } from 'nextra/mdx-components'
import DevOpsLayout from '@/components/mdx/DevOpsLayout'
import Callout from '@/components/mdx/Callout'
import Toggle from '@/components/mdx/Toggle'

/**
 * MDX 컴포넌트를 프로젝트 디자인시스템에 맞게 확장합니다.
 * .fsw-mdx-content 래퍼와 하위 요소들이 globals.css의 .fsw-mdx-* 스타일을 사용합니다.
 */
export function useMDXComponents(
  components?: Record<string, React.ComponentType<any>>,
) {
  const nextra = useNextraMDXComponents(components)
  const NextraWrapper = nextra.wrapper

  return {
    ...nextra,
    DevOpsLayout,
    Callout,
    Toggle,
    wrapper: function FswMdxWrapper(props: { children: React.ReactNode }) {
      return (
        <div className="fsw-mdx-content">
          {NextraWrapper ? <NextraWrapper {...props} /> : props.children}
        </div>
      )
    },
  }
}

