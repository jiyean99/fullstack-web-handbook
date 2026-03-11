import React from 'react'

type CalloutType = 'info' | 'success' | 'warning' | 'danger'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

export default function Callout({
  type = 'info',
  title,
  children,
}: CalloutProps) {
  return (
    <div className={`fsw-callout fsw-callout--${type}`}>
      {title && <div className="fsw-callout-title">{title}</div>}
      <div className="fsw-callout-body">{children}</div>
    </div>
  )
}

