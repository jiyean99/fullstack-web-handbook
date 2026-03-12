import React from 'react'
import { useMDXComponents as useNextraMDXComponents } from 'nextra/mdx-components'
import DevOpsLayout from '@/components/mdx/DevOpsLayout'
import Callout from '@/components/mdx/Callout'
import Toggle from '@/components/mdx/Toggle'
import ZoomImage from '@/components/common/ZoomImage'

/**
 * MDX 컴포넌트를 프로젝트 디자인시스템에 맞게 확장합니다.
 * img → ZoomImage: 모든 이미지 클릭 시 팝업(라이트박스)으로 확대.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMDXComponents(components: any) {
  const nextra = useNextraMDXComponents(components)
  const NextraWrapper = nextra.wrapper

  return {
    ...nextra,
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <ZoomImage src={props.src} alt={props.alt} {...props} />
    ),
    DevOpsLayout,
    Callout,
    Toggle,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    wrapper: function FswMdxWrapper(props: any) {
      return (
        <div className="fsw-mdx-content">
          {NextraWrapper ? <NextraWrapper {...props} /> : props.children}
        </div>
      )
    },
  }
}

