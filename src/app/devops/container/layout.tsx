import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '컨테이너와 클라우드 네이티브',
}

export default function ContainerLayout({ children }: { children: React.ReactNode }) {
  return children
}
