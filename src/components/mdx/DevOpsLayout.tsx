import React from 'react'

interface TocItem {
  id: string
  label: string
}

interface DevOpsLayoutProps {
  toc: TocItem[]
  children: React.ReactNode
}

export default function DevOpsLayout({ toc, children }: DevOpsLayoutProps) {
  return (
    <div className="fsw-mdx-shell">
      <aside className="fsw-mdx-toc" aria-label="DevOps 문서 목차">
        <h4 className="fsw-mdx-toc-title">목차</h4>
        <nav className="fsw-mdx-toc-nav">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="fsw-mdx-toc-link"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="fsw-mdx-main">{children}</main>
    </div>
  )
}

