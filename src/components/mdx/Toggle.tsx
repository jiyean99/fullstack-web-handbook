import React from 'react'

interface ToggleProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

export default function Toggle({
  title,
  defaultOpen = false,
  children,
}: ToggleProps) {
  return (
    <details className="fsw-toggle" open={defaultOpen}>
      <summary className="fsw-toggle-summary">
        <span>{title}</span>
        <span className="fsw-toggle-chevron">▾</span>
      </summary>
      <div className="fsw-toggle-body">{children}</div>
    </details>
  )
}

