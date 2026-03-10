'use client'

import React from 'react'
import styled, { css } from 'styled-components'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
}

const sizeStyles = {
  sm: css`
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    border-radius: var(--radius-sm);
  `,
  md: css`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: var(--radius-md);
  `,
  lg: css`
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
    border-radius: var(--radius-lg);
  `,
}

const variantStyles = {
  primary: css`
    background-color: var(--color-primary);
    color: #ffffff;
    border: 1px solid transparent;
    &:hover:not(:disabled) { background-color: var(--color-primary-hover); }
    &:active:not(:disabled) { opacity: 0.9; }
  `,
  secondary: css`
    background-color: var(--color-bg);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    &:hover:not(:disabled) { background-color: var(--color-gray-100); border-color: var(--color-gray-300); }
    &:active:not(:disabled) { background-color: var(--color-gray-200); }
  `,
  ghost: css`
    background-color: transparent;
    color: var(--color-text);
    border: 1px solid transparent;
    &:hover:not(:disabled) { background-color: var(--color-gray-100); }
    &:active:not(:disabled) { background-color: var(--color-gray-200); }
  `,
  danger: css`
    background-color: var(--color-error);
    color: #ffffff;
    border: 1px solid transparent;
    &:hover:not(:disabled) { opacity: 0.85; }
    &:active:not(:disabled) { opacity: 0.75; }
  `,
}

const StyledButton = styled.button<{
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  line-height: 1.25;
  cursor: pointer;
  transition: all 150ms ease;
  white-space: nowrap;
  user-select: none;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span aria-hidden>⏳</span> : null}
      {children}
    </StyledButton>
  )
}
