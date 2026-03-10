'use client'

import React from 'react'
import styled, { css } from 'styled-components'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'
type TextVariant = 'body' | 'lead' | 'small' | 'muted' | 'code'

interface HeadingProps {
  as?: HeadingLevel
  children: React.ReactNode
  className?: string
}

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant
  as?: 'p' | 'span' | 'div'
  children: React.ReactNode
}

const headingBase = css`
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--color-text);
`

export const H1 = styled.h1`
  ${headingBase}
  font-size: 2.25rem;
  margin-bottom: 1rem;
`

export const H2 = styled.h2`
  ${headingBase}
  font-size: 1.875rem;
  margin-bottom: 0.75rem;
`

export const H3 = styled.h3`
  ${headingBase}
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`

export const H4 = styled.h4`
  ${headingBase}
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const headingComponents = { h1: H1, h2: H2, h3: H3, h4: H4 }

export function Heading({ as = 'h2', children, className }: HeadingProps) {
  const Component = headingComponents[as]
  return <Component className={className}>{children}</Component>
}

const textVariantStyles = {
  body: css`
    font-size: 1rem;
    line-height: 1.625;
    color: var(--color-text);
  `,
  lead: css`
    font-size: 1.125rem;
    line-height: 1.625;
    color: var(--color-text);
    font-weight: 400;
  `,
  small: css`
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--color-text-muted);
  `,
  muted: css`
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--color-text-muted);
  `,
  code: css`
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.875rem;
    background-color: var(--color-gray-100);
    color: var(--color-primary);
    padding: 0.125rem 0.375rem;
    border-radius: var(--radius-sm);
  `,
}

const StyledText = styled.p<{ $variant: TextVariant }>`
  ${({ $variant }) => textVariantStyles[$variant]}
`

export function Text({ variant = 'body', as = 'p', children, ...props }: TextProps) {
  return (
    <StyledText as={as} $variant={variant} {...props}>
      {children}
    </StyledText>
  )
}
