import type { NextConfig } from 'next'
import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
})

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
}

export default withNextra(nextConfig)
