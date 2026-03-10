import type { Metadata } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '@/styles/globals.css'
import Providers from '@/providers/Providers'

export const metadata: Metadata = {
  title: {
    default: 'Fullstack Web Handbook',
    template: '%s | Fullstack Web Handbook',
  },
  description:
    'BE/FE/DevOps 전반을 다루는 개인 웹개발 단권화 핸드북. React, TypeScript, Spring, Docker, 아키텍처 패턴까지.',
}

const navbar = (
  <Navbar
    logo={
      <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
        Fullstack Web Handbook
      </span>
    }
  />
)

const footer = (
  <Footer>
    <span>
      {new Date().getFullYear()} © Fullstack Web Handbook
    </span>
  </Footer>
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
