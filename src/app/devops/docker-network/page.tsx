import type { Metadata } from 'next'
import DockerNetworkGuide from '@/components/devops/DockerNetworkGuide'

export const metadata: Metadata = {
  title: 'Docker 네트워크',
}

export default function DockerNetworkPage() {
  return <DockerNetworkGuide />
}
