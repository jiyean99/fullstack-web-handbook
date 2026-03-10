import type { Metadata } from 'next'
import { Layout } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '@/styles/globals.css'
import Providers from '@/providers/Providers'
import TopNavbar from '@/components/layout/TopNavbar'

export const metadata: Metadata = {
  title: {
    default: 'Fullstack Web Handbook',
    template: '%s | Fullstack Web Handbook',
  },
  description:
    'BE/FE/DevOps 전반을 다루는 개인 웹개발 단권화 핸드북. React, TypeScript, Spring, Docker, 아키텍처 패턴까지.',
}

const navbar = <TopNavbar />

const footer = (
  <footer className="fsw-footer">
    <div className="fsw-footer-inner">
      <div className="fsw-footer-left">
        <div className="fsw-footer-logo">
          <span className="fsw-footer-logo-mark">W</span>
          <span className="fsw-footer-logo-text">Fullstack Web Handbook</span>
        </div>
        <p className="fsw-footer-tagline">
          실무를 지탱하는 탄탄한 지식의 기록장
        </p>
      </div>

      <div className="fsw-footer-right">
        <nav className="fsw-footer-links" aria-label="Footer">
          <a
            href="https://github.com/your-username/fullstack-web-handbook"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a href="/about">Documentation</a>
          <a href="/about">About Me</a>
        </nav>
        <p className="fsw-footer-meta">
          {new Date().getFullYear()} © Fullstack Web Handbook. Built with Love
          &amp; Next.js 15.
        </p>
      </div>
    </div>
  </footer>
)

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Providers>
          <Layout
            navbar={navbar}
            pageMap={await getPageMap()}
            docsRepositoryBase="https://github.com/your-username/fullstack-web-handbook/tree/main"
            footer={footer}
            sidebar={{ defaultMenuCollapseLevel: 1 }}
          >
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}
