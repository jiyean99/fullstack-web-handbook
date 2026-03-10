'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { Info, Lightbulb, AlertTriangle as TriangleAlert } from 'lucide-react'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface PortMapping {
  id: number
  hostPort: string
  containerPort: string
  protocol: 'tcp' | 'udp'
}

type CommTab = 'same' | 'diff' | 'host'

interface TerminalLine {
  type: 'cmd' | 'out' | 'err'
  text: string
}

// ─────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────
const PageWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: var(--sp-8) var(--sp-4);
  font-family: inherit;
`

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--sp-2);
`

const PageSubtitle = styled.p`
  color: var(--color-text-muted);
  margin-bottom: var(--sp-8);
  font-size: 1.05rem;
`

// ─────────────────────────────────────────────
// Internal Nav
// ─────────────────────────────────────────────
const InternalNav = styled.nav`
  display: flex;
  gap: var(--sp-2);
  flex-wrap: wrap;
  margin-bottom: var(--sp-10);
  padding: var(--sp-3) var(--sp-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
`

const NavItem = styled.button<{ $active: boolean }>`
  padding: var(--sp-2) var(--sp-4);
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.15s;
  background: ${({ $active }) => ($active ? 'var(--color-docker-blue)' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--color-text-muted)')};

  &:hover {
    background: ${({ $active }) => ($active ? 'var(--color-docker-blue)' : 'var(--color-gray-200)')};
    color: ${({ $active }) => ($active ? '#fff' : 'var(--color-text)')};
  }
`

// ─────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────
const SectionWrapper = styled.section`
  margin-bottom: var(--sp-16);
`

const SectionTitle = styled.h2`
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--sp-2);
  padding-bottom: var(--sp-2);
  border-bottom: 2px solid var(--color-docker-blue);
  display: inline-block;
`

const SectionDesc = styled.p`
  color: var(--color-text-muted);
  margin-bottom: var(--sp-6);
  line-height: 1.7;
`

// ─────────────────────────────────────────────
// Callout
// ─────────────────────────────────────────────
const calloutColors = {
  info: { bg: '#eff6ff', border: 'var(--color-primary)', icon: Info },
  tip: { bg: '#f0fdf4', border: 'var(--color-success)', icon: Lightbulb },
  warning: { bg: '#fffbeb', border: 'var(--color-warning)', icon: TriangleAlert },
}

const CalloutBox = styled.div<{ $type: 'info' | 'tip' | 'warning' }>`
  padding: var(--sp-4) var(--sp-5);
  border-left: 4px solid ${({ $type }) => calloutColors[$type].border};
  background: ${({ $type }) => calloutColors[$type].bg};
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin: var(--sp-4) 0;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--color-text);
  display: flex;
  align-items: flex-start;
  gap: 0.6em;
`

function Callout({
  type,
  children,
}: {
  type: 'info' | 'tip' | 'warning'
  children: React.ReactNode
}) {
  const Icon = calloutColors[type].icon
  return (
    <CalloutBox $type={type}>
      <Icon size={18} style={{ marginTop: '0.25em', flexShrink: 0, color: calloutColors[type].border }} />
      <div>{children}</div>
    </CalloutBox>
  )
}

// ─────────────────────────────────────────────
// Section 1: Overview — Driver Cards
// ─────────────────────────────────────────────
const DriverGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--sp-4);
  margin-bottom: var(--sp-6);
`

const DriverCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--sp-4) var(--sp-5);
  box-shadow: var(--shadow-sm);
`

const DriverName = styled.div`
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-docker-blue);
  margin-bottom: var(--sp-1);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
`

const DriverDesc = styled.div`
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: var(--sp-3);
  line-height: 1.6;
`

const DriverBarTrack = styled.div`
  background: var(--color-gray-200);
  border-radius: var(--radius-full);
  height: 6px;
  overflow: hidden;
`

const DriverBarFill = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  border-radius: var(--radius-full);
  width: ${({ $width }) => $width}%;
  background: ${({ $color }) => $color};
  transition: width 0.4s ease;
`

const DriverMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: var(--sp-1);
`

const drivers = [
  {
    name: 'bridge',
    desc: '기본 드라이버. 같은 호스트의 컨테이너끼리 통신. 개발 환경의 표준.',
    usage: 85,
    color: 'var(--color-docker-blue)',
    scope: '단일 호스트',
  },
  {
    name: 'host',
    desc: '컨테이너가 호스트 네트워크를 직접 공유. 포트 격리 없음. 성능 최적.',
    usage: 40,
    color: 'var(--color-success)',
    scope: '단일 호스트',
  },
  {
    name: 'none',
    desc: '네트워크 완전 비활성화. 격리가 필요한 배치 작업에 사용.',
    usage: 10,
    color: 'var(--color-gray-500)',
    scope: '격리',
  },
  {
    name: 'overlay',
    desc: 'Swarm 클러스터의 여러 호스트 간 통신. 분산 시스템의 표준.',
    usage: 60,
    color: 'var(--color-docker-network)',
    scope: '멀티 호스트',
  },
  {
    name: 'macvlan',
    desc: '컨테이너에 MAC 주소 부여 → 물리 네트워크 장치처럼 동작.',
    usage: 20,
    color: 'var(--color-docker-container)',
    scope: '단일 호스트',
  },
]

// ─────────────────────────────────────────────
// Section 2: Port Mapper
// ─────────────────────────────────────────────
const PortMapperCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--sp-6);
  box-shadow: var(--shadow-sm);
`

const PortMapperRow = styled.div`
  display: flex;
  gap: var(--sp-3);
  flex-wrap: wrap;
  align-items: flex-end;
  margin-bottom: var(--sp-5);
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
`

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

const StyledInput = styled.input`
  padding: var(--sp-2) var(--sp-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  width: 100px;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;

  &:focus {
    outline: none;
    border-color: var(--color-docker-blue);
    box-shadow: 0 0 0 3px rgba(36, 150, 237, 0.15);
  }
`

const StyledSelect = styled.select`
  padding: var(--sp-2) var(--sp-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  background: var(--color-bg);
  color: var(--color-text);
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--color-docker-blue);
  }
`

const AddButton = styled.button`
  padding: var(--sp-2) var(--sp-5);
  background: var(--color-docker-blue);
  color: #fff;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  align-self: flex-end;

  &:hover {
    background: var(--color-primary-hover);
  }
`

const MappingList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  min-height: 40px;
`

const MappingTag = styled.div`
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-1) var(--sp-3);
  background: var(--color-code-bg);
  color: var(--color-code-text);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
`

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-400);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0;

  &:hover {
    color: var(--color-error);
  }
`

const CommandPreview = styled.div`
  margin-top: var(--sp-4);
  padding: var(--sp-3) var(--sp-4);
  background: var(--color-code-bg);
  border-radius: var(--radius-md);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.85rem;
  color: var(--color-code-text);
  overflow-x: auto;
  white-space: pre;
`

// ─────────────────────────────────────────────
// Section 3: Communication Tabs
// ─────────────────────────────────────────────
const TabList = styled.div`
  display: flex;
  border-bottom: 2px solid var(--color-border);
  margin-bottom: var(--sp-5);
`

const TabItem = styled.button<{ $active: boolean }>`
  padding: var(--sp-2) var(--sp-5);
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  color: ${({ $active }) => ($active ? 'var(--color-docker-blue)' : 'var(--color-text-muted)')};
  border-bottom: 2px solid
    ${({ $active }) => ($active ? 'var(--color-docker-blue)' : 'transparent')};
  margin-bottom: -2px;
  transition: all 0.15s;

  &:hover {
    color: var(--color-docker-blue);
  }
`

const TabPanel = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--sp-5);
`

const CodeBlock = styled.pre`
  background: var(--color-code-bg);
  color: var(--color-code-text);
  padding: var(--sp-4);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  overflow-x: auto;
  margin: var(--sp-3) 0;
  line-height: 1.7;
`

// ─────────────────────────────────────────────
// Section 4: Compose Network Diagram
// ─────────────────────────────────────────────
const DiagramWrapper = styled.div`
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--sp-6);
  background: var(--color-surface);
  margin-top: var(--sp-5);
`

const NetworkLayer = styled.div`
  background: rgba(124, 58, 237, 0.08);
  border: 2px dashed var(--color-docker-network);
  border-radius: var(--radius-lg);
  padding: var(--sp-4) var(--sp-5);
  margin-bottom: var(--sp-4);
`

const NetworkLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-docker-network);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--sp-3);
`

const ServiceRow = styled.div`
  display: flex;
  gap: var(--sp-3);
  flex-wrap: wrap;
`

const ServiceNode = styled.div<{ $color: string }>`
  background: ${({ $color }) => $color};
  color: #fff;
  padding: var(--sp-2) var(--sp-4);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 600;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
`

// ─────────────────────────────────────────────
// Section 5: Volume Compare
// ─────────────────────────────────────────────
const VolumeCompareGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-4);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const VolumeCard = styled.div<{ $type: 'bind' | 'named' }>`
  border: 2px solid
    ${({ $type }) =>
      $type === 'bind' ? 'var(--color-docker-container)' : 'var(--color-docker-volume)'};
  border-radius: var(--radius-lg);
  padding: var(--sp-5);
  background: ${({ $type }) =>
    $type === 'bind' ? 'rgba(217,119,6,0.04)' : 'rgba(5,150,105,0.04)'};
`

const VolumeCardTitle = styled.div<{ $type: 'bind' | 'named' }>`
  font-weight: 700;
  font-size: 1rem;
  color: ${({ $type }) =>
    $type === 'bind' ? 'var(--color-docker-container)' : 'var(--color-docker-volume)'};
  margin-bottom: var(--sp-3);
`

const VolumeDetail = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
`

const VolumeDetailItem = styled.li`
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.5;

  &::before {
    content: '•';
    color: var(--color-text-muted);
    margin-right: 0.4em;
  }
`

// ─────────────────────────────────────────────
// Section 6: Terminal Simulator
// ─────────────────────────────────────────────
const TerminalWrapper = styled.div`
  background: var(--color-docker-dark);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
`

const TerminalHeader = styled.div`
  background: #161b22;
  padding: var(--sp-3) var(--sp-4);
  display: flex;
  align-items: center;
  gap: var(--sp-2);
`

const TerminalDot = styled.span<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: inline-block;
`

const TerminalTitle = styled.span`
  font-size: 0.8rem;
  color: var(--color-gray-500);
  margin-left: var(--sp-2);
`

const CommandList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid #30363d;
`

const CommandBtn = styled.button`
  padding: var(--sp-1) var(--sp-3);
  background: #21262d;
  color: #79c0ff;
  border: 1px solid #30363d;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #30363d;
    border-color: #8b949e;
  }
`

const TerminalOutput = styled.div`
  padding: var(--sp-4);
  min-height: 160px;
  max-height: 300px;
  overflow-y: auto;
`

const OutputLine = styled.div<{ $type: 'cmd' | 'out' | 'err' }>`
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.8rem;
  line-height: 1.8;
  color: ${({ $type }) =>
    $type === 'cmd' ? '#79c0ff' : $type === 'err' ? '#f85149' : '#e6edf3'};
  white-space: pre-wrap;

  &::before {
    content: ${({ $type }) => ($type === 'cmd' ? "'$ '" : "''")};
    color: #3fb950;
  }
`

const ClearBtn = styled.button`
  margin: 0 var(--sp-4) var(--sp-3);
  padding: var(--sp-1) var(--sp-3);
  background: none;
  border: 1px solid #30363d;
  border-radius: var(--radius-sm);
  color: var(--color-gray-500);
  font-size: 0.75rem;
  cursor: pointer;

  &:hover {
    border-color: var(--color-error);
    color: var(--color-error);
  }
`

// ─────────────────────────────────────────────
// Terminal commands data
// ─────────────────────────────────────────────
const terminalCommands: Record<string, TerminalLine[]> = {
  'docker network ls': [
    { type: 'cmd', text: 'docker network ls' },
    { type: 'out', text: 'NETWORK ID     NAME      DRIVER    SCOPE' },
    { type: 'out', text: 'a1b2c3d4e5f6   bridge    bridge    local' },
    { type: 'out', text: 'b2c3d4e5f6a7   host      host      local' },
    { type: 'out', text: 'c3d4e5f6a7b8   none      null      local' },
  ],
  'docker network create mynet': [
    { type: 'cmd', text: 'docker network create mynet' },
    { type: 'out', text: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9' },
  ],
  'docker network inspect bridge': [
    { type: 'cmd', text: 'docker network inspect bridge' },
    { type: 'out', text: '[' },
    { type: 'out', text: '  {' },
    { type: 'out', text: '    "Name": "bridge",' },
    { type: 'out', text: '    "Driver": "bridge",' },
    { type: 'out', text: '    "IPAM": { "Config": [{ "Subnet": "172.17.0.0/16" }] }' },
    { type: 'out', text: '  }' },
    { type: 'out', text: ']' },
  ],
  'docker run --network mynet nginx': [
    { type: 'cmd', text: 'docker run --network mynet nginx' },
    { type: 'out', text: 'Unable to find image "nginx:latest" locally' },
    { type: 'out', text: 'latest: Pulling from library/nginx' },
    { type: 'out', text: 'Digest: sha256:abc123...' },
    { type: 'out', text: 'Status: Downloaded newer image for nginx:latest' },
    { type: 'out', text: '→ Container started and connected to mynet' },
  ],
  'docker network connect mynet app': [
    { type: 'cmd', text: 'docker network connect mynet app' },
    { type: 'out', text: '→ Container "app" connected to network "mynet"' },
  ],
  'docker volume ls': [
    { type: 'cmd', text: 'docker volume ls' },
    { type: 'out', text: 'DRIVER    VOLUME NAME' },
    { type: 'out', text: 'local     myapp_data' },
    { type: 'out', text: 'local     postgres_data' },
  ],
}

// ─────────────────────────────────────────────
// Communication tab data
// ─────────────────────────────────────────────
const commTabContent: Record<CommTab, { title: string; desc: string; code: string }> = {
  same: {
    title: '같은 네트워크 (Container DNS)',
    desc: '동일한 Docker 네트워크에 연결된 컨테이너끼리는 컨테이너 이름으로 직접 통신할 수 있습니다. Docker 내장 DNS가 이름을 IP로 자동 변환합니다.',
    code: `# 같은 네트워크에서 컨테이너 이름으로 접근
docker network create app-net

docker run -d --name db --network app-net postgres
docker run -d --name api --network app-net myapi

# api 컨테이너 내부에서 db 접근
curl http://db:5432
# → Docker DNS가 db → 172.18.0.2 로 해석`,
  },
  diff: {
    title: '다른 네트워크 (network connect)',
    desc: '격리된 네트워크 간 통신이 필요할 때는 docker network connect로 컨테이너를 추가 네트워크에 연결합니다. 게이트웨이 역할의 서비스에 유용합니다.',
    code: `# 두 개의 격리된 네트워크 생성
docker network create frontend-net
docker network create backend-net

docker run -d --name api --network backend-net myapi
docker run -d --name nginx --network frontend-net nginx

# nginx를 backend-net에도 연결 (브릿지 역할)
docker network connect backend-net nginx
# → nginx는 이제 두 네트워크 모두 접근 가능`,
  },
  host: {
    title: 'host 네트워크 (포트 격리 없음)',
    desc: 'host 네트워크를 사용하면 컨테이너가 호스트의 네트워크 인터페이스를 직접 사용합니다. 포트 매핑이 필요 없고 성능이 최적이지만, 포트 충돌에 주의해야 합니다.',
    code: `# host 네트워크로 실행 (Linux only)
docker run -d --network host nginx

# 포트 매핑 없이 바로 호스트 포트 80으로 접근
curl http://localhost:80

# 주의: macOS/Windows Docker Desktop에서는
# VM 레이어로 인해 host 네트워크가 제한적으로 동작`,
  },
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const NAV_SECTIONS = [
  { id: 'overview', label: '📋 개요' },
  { id: 'portmapper', label: '🔌 포트 매핑' },
  { id: 'communication', label: '🔗 컨테이너 통신' },
  { id: 'compose', label: '🐙 Compose 네트워크' },
  { id: 'volume', label: '💾 볼륨 마운트' },
  { id: 'terminal', label: '💻 터미널' },
]

export default function DockerNetworkGuide() {
  const [activeSection, setActiveSection] = useState('overview')
  const [activeCommTab, setActiveCommTab] = useState<CommTab>('same')
  const [portMappings, setPortMappings] = useState<PortMapping[]>([])
  const [hostPort, setHostPort] = useState('8080')
  const [containerPort, setContainerPort] = useState('80')
  const [protocol, setProtocol] = useState<'tcp' | 'udp'>('tcp')
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { type: 'out', text: 'Docker 명령어를 선택하면 시뮬레이션 결과를 확인할 수 있습니다.' },
  ])

  function addMapping() {
    if (!hostPort || !containerPort) return
    setPortMappings((prev) => [
      ...prev,
      { id: Date.now(), hostPort, containerPort, protocol },
    ])
  }

  function removeMapping(id: number) {
    setPortMappings((prev) => prev.filter((m) => m.id !== id))
  }

  function buildRunCommand() {
    const flags = portMappings.map((m) => `-p ${m.hostPort}:${m.containerPort}/${m.protocol}`)
    return flags.length > 0
      ? `docker run \\\n  ${flags.join(' \\\n  ')} \\\n  <image-name>`
      : '# 포트 매핑을 추가하세요'
  }

  function runCommand(cmd: string) {
    const lines = terminalCommands[cmd] ?? [
      { type: 'cmd', text: cmd },
      { type: 'err', text: 'command not found' },
    ]
    setTerminalLines((prev) => [...prev, ...lines])
  }

  return (
    <PageWrapper>
      <PageTitle>🐳 Docker 네트워크 & 컨테이너 가이드</PageTitle>
      <PageSubtitle>
        Docker 네트워크 드라이버, 포트 매핑, 컨테이너 간 통신, Compose 네트워크, 볼륨 마운트를
        인터랙티브하게 탐구합니다.
      </PageSubtitle>

      <InternalNav>
        {NAV_SECTIONS.map((s) => (
          <NavItem key={s.id} $active={activeSection === s.id} onClick={() => setActiveSection(s.id)}>
            {s.label}
          </NavItem>
        ))}
      </InternalNav>

      {/* ── Section 1: Overview ── */}
      {activeSection === 'overview' && (
        <SectionWrapper>
          <SectionTitle>네트워크 드라이버 개요</SectionTitle>
          <SectionDesc>
            Docker는 다양한 네트워크 드라이버를 제공하여 컨테이너의 네트워크 격리와 연결 방식을
            유연하게 제어합니다. 각 드라이버는 사용 사례와 범위가 다릅니다.
          </SectionDesc>

          <DriverGrid>
            {drivers.map((d) => (
              <DriverCard key={d.name}>
                <DriverName>{d.name}</DriverName>
                <DriverDesc>{d.desc}</DriverDesc>
                <DriverBarTrack>
                  <DriverBarFill $width={d.usage} $color={d.color} />
                </DriverBarTrack>
                <DriverMeta>
                  <span>사용 빈도</span>
                  <span>
                    {d.scope} · {d.usage}%
                  </span>
                </DriverMeta>
              </DriverCard>
            ))}
          </DriverGrid>

          <Callout type="tip">
            <strong>실무 기본:</strong> 대부분의 로컬 개발 환경과 단일 호스트 프로덕션에서는{' '}
            <code>bridge</code> 드라이버로 충분합니다. Docker Compose는 기본적으로 프로젝트별
            bridge 네트워크를 자동 생성합니다.
          </Callout>
        </SectionWrapper>
      )}

      {/* ── Section 2: Port Mapper ── */}
      {activeSection === 'portmapper' && (
        <SectionWrapper>
          <SectionTitle>포트 매핑 시뮬레이터</SectionTitle>
          <SectionDesc>
            호스트 포트와 컨테이너 포트를 입력하고 매핑을 추가하면{' '}
            <code>docker run -p</code> 플래그가 자동으로 생성됩니다.
          </SectionDesc>

          <PortMapperCard>
            <PortMapperRow>
              <InputGroup>
                <Label htmlFor="hostPort">호스트 포트</Label>
                <StyledInput
                  id="hostPort"
                  type="number"
                  min="1"
                  max="65535"
                  value={hostPort}
                  onChange={(e) => setHostPort(e.target.value)}
                  placeholder="8080"
                />
              </InputGroup>

              <span style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', alignSelf: 'flex-end', paddingBottom: '6px' }}>→</span>

              <InputGroup>
                <Label htmlFor="containerPort">컨테이너 포트</Label>
                <StyledInput
                  id="containerPort"
                  type="number"
                  min="1"
                  max="65535"
                  value={containerPort}
                  onChange={(e) => setContainerPort(e.target.value)}
                  placeholder="80"
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="protocol">프로토콜</Label>
                <StyledSelect
                  id="protocol"
                  value={protocol}
                  onChange={(e) => setProtocol(e.target.value as 'tcp' | 'udp')}
                >
                  <option value="tcp">TCP</option>
                  <option value="udp">UDP</option>
                </StyledSelect>
              </InputGroup>

              <AddButton onClick={addMapping}>+ 매핑 추가</AddButton>
            </PortMapperRow>

            <MappingList>
              {portMappings.length === 0 && (
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  아직 추가된 매핑이 없습니다.
                </span>
              )}
              {portMappings.map((m) => (
                <MappingTag key={m.id}>
                  {m.hostPort}:{m.containerPort}/{m.protocol}
                  <RemoveBtn onClick={() => removeMapping(m.id)}>×</RemoveBtn>
                </MappingTag>
              ))}
            </MappingList>

            <CommandPreview>{buildRunCommand()}</CommandPreview>
          </PortMapperCard>

          <Callout type="info">
            <strong>팁:</strong> 같은 호스트 포트를 여러 컨테이너에 매핑할 수 없습니다. 포트 충돌이
            발생하면 Nginx 같은 리버스 프록시로 트래픽을 분배하세요.
          </Callout>
        </SectionWrapper>
      )}

      {/* ── Section 3: Communication ── */}
      {activeSection === 'communication' && (
        <SectionWrapper>
          <SectionTitle>컨테이너 간 통신</SectionTitle>
          <SectionDesc>
            Docker 컨테이너는 네트워크 구성에 따라 서로 다른 방식으로 통신합니다.
          </SectionDesc>

          <TabList>
            {(Object.keys(commTabContent) as CommTab[]).map((key) => (
              <TabItem key={key} $active={activeCommTab === key} onClick={() => setActiveCommTab(key)}>
                {commTabContent[key].title}
              </TabItem>
            ))}
          </TabList>

          <TabPanel>
            <p style={{ fontWeight: 600, marginBottom: 'var(--sp-2)', color: 'var(--color-text)' }}>
              {commTabContent[activeCommTab].title}
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: 'var(--sp-3)', lineHeight: '1.7' }}>
              {commTabContent[activeCommTab].desc}
            </p>
            <CodeBlock>{commTabContent[activeCommTab].code}</CodeBlock>
          </TabPanel>
        </SectionWrapper>
      )}

      {/* ── Section 4: Compose Network ── */}
      {activeSection === 'compose' && (
        <SectionWrapper>
          <SectionTitle>Docker Compose 네트워크</SectionTitle>
          <SectionDesc>
            Docker Compose는 프로젝트별로 자동으로 bridge 네트워크를 생성합니다. 서비스 간 통신은
            서비스 이름을 호스트명으로 사용합니다.
          </SectionDesc>

          <CodeBlock>{`# docker-compose.yml
version: "3.9"

services:
  nginx:
    image: nginx
    networks:
      - frontend
    ports:
      - "80:80"

  api:
    build: ./api
    networks:
      - frontend
      - backend

  db:
    image: postgres
    networks:
      - backend
    environment:
      POSTGRES_PASSWORD: secret

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true   # 외부 인터넷 차단`}</CodeBlock>

          <DiagramWrapper>
            <NetworkLabel>🌐 frontend network</NetworkLabel>
            <NetworkLayer>
              <ServiceRow>
                <ServiceNode $color="var(--color-docker-blue)">nginx</ServiceNode>
                <ServiceNode $color="var(--color-success)">api</ServiceNode>
              </ServiceRow>
            </NetworkLayer>

            <NetworkLabel style={{ marginTop: 'var(--sp-4)' }}>🔒 backend network (internal)</NetworkLabel>
            <NetworkLayer>
              <ServiceRow>
                <ServiceNode $color="var(--color-success)">api</ServiceNode>
                <ServiceNode $color="var(--color-docker-container)">db</ServiceNode>
              </ServiceRow>
            </NetworkLayer>
          </DiagramWrapper>

          <Callout type="warning">
            <strong>internal: true</strong> 옵션은 해당 네트워크를 외부 인터넷과 완전히 격리합니다.
            DB 네트워크에 적용하면 의도치 않은 외부 노출을 방지할 수 있습니다.
          </Callout>
        </SectionWrapper>
      )}

      {/* ── Section 5: Volume ── */}
      {activeSection === 'volume' && (
        <SectionWrapper>
          <SectionTitle>볼륨 마운트</SectionTitle>
          <SectionDesc>
            Docker 볼륨은 컨테이너 생명주기와 독립적으로 데이터를 영속화합니다. bind mount와 named
            volume의 특성을 이해하고 상황에 맞게 선택하세요.
          </SectionDesc>

          <VolumeCompareGrid>
            <VolumeCard $type="bind">
              <VolumeCardTitle $type="bind">Bind Mount</VolumeCardTitle>
              <VolumeDetail>
                <VolumeDetailItem>호스트 파일시스템 경로를 직접 마운트</VolumeDetailItem>
                <VolumeDetailItem>개발 중 소스 코드 실시간 반영에 적합</VolumeDetailItem>
                <VolumeDetailItem>절대 경로 필요: <code>-v /host/path:/container/path</code></VolumeDetailItem>
                <VolumeDetailItem>호스트 OS 의존적 → 이식성 낮음</VolumeDetailItem>
              </VolumeDetail>
              <CodeBlock style={{ marginTop: 'var(--sp-4)' }}>{`docker run -v $(pwd)/src:/app/src node`}</CodeBlock>
            </VolumeCard>

            <VolumeCard $type="named">
              <VolumeCardTitle $type="named">Named Volume</VolumeCardTitle>
              <VolumeDetail>
                <VolumeDetailItem>Docker가 직접 관리하는 스토리지</VolumeDetailItem>
                <VolumeDetailItem>DB 데이터, 업로드 파일 등 영속화에 적합</VolumeDetailItem>
                <VolumeDetailItem>이름으로 참조: <code>-v mydata:/container/path</code></VolumeDetailItem>
                <VolumeDetailItem>플랫폼 독립적 → 이식성 높음</VolumeDetailItem>
              </VolumeDetail>
              <CodeBlock style={{ marginTop: 'var(--sp-4)' }}>{`docker run -v postgres_data:/var/lib/postgresql/data postgres`}</CodeBlock>
            </VolumeCard>
          </VolumeCompareGrid>

          <Callout type="tip">
            <strong>프로덕션 원칙:</strong> 프로덕션에서는 항상 Named Volume을 사용하세요. Bind
            mount는 개발 편의성을 위한 것으로, 호스트 경로 의존성과 권한 문제를 일으킬 수 있습니다.
          </Callout>
        </SectionWrapper>
      )}

      {/* ── Section 6: Terminal ── */}
      {activeSection === 'terminal' && (
        <SectionWrapper>
          <SectionTitle>터미널 시뮬레이터</SectionTitle>
          <SectionDesc>
            아래 커맨드 버튼을 클릭하면 Docker 명령어 실행 결과를 시뮬레이션합니다.
          </SectionDesc>

          <TerminalWrapper>
            <TerminalHeader>
              <TerminalDot $color="#ff5f57" />
              <TerminalDot $color="#febc2e" />
              <TerminalDot $color="#28c840" />
              <TerminalTitle>bash — Docker CLI Simulator</TerminalTitle>
            </TerminalHeader>

            <CommandList>
              {Object.keys(terminalCommands).map((cmd) => (
                <CommandBtn key={cmd} onClick={() => runCommand(cmd)}>
                  {cmd}
                </CommandBtn>
              ))}
            </CommandList>

            <ClearBtn onClick={() => setTerminalLines([])}>clear</ClearBtn>

            <TerminalOutput>
              {terminalLines.map((line, i) => (
                <OutputLine key={i} $type={line.type}>
                  {line.text}
                </OutputLine>
              ))}
            </TerminalOutput>
          </TerminalWrapper>
        </SectionWrapper>
      )}
    </PageWrapper>
  )
}
