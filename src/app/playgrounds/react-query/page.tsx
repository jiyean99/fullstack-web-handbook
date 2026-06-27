'use client'

import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  RefreshCw,
  Sliders,
  Database,
  Network,
  Wifi,
  Trash2,
  Clock,
  Play,
  Pause,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'
import ContentDoc, {
  Section,
  SectionTitleBlock,
  Paragraph,
  Card,
  CardTitle,
  CardText,
  CodeBlock,
  HeaderQuote,
} from '@/components/content/ContentDoc'
import { Button } from '@/components/common/Button'

// ─── Animations ───────────────────────────────────
const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

// ─── Styled Components ─────────────────────────────
const SimulatorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-6);
  margin-block: var(--sp-6);
  @media (min-width: 1024px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`

const ControlPanel = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--sp-5);
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
`

const ControlRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
`

const Slider = styled.input`
  width: 100%;
  accent-color: var(--color-primary);
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: var(--sp-2);
`

const QueryStateCard = styled.div<{ $state: string }>`
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  padding: var(--sp-5);
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    width: 100%;
    background: ${({ $state }) => {
      if ($state === 'fresh') return 'var(--color-success)'
      if ($state === 'stale') return 'var(--color-warning)'
      if ($state === 'fetching') return 'var(--color-primary)'
      if ($state === 'inactive') return 'var(--color-gray-400)'
      return 'var(--color-gray-200)'
    }};
  }
`

const StatusBadge = styled.span<{ $state: string }>`
  align-self: flex-start;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  background: ${({ $state }) => {
    if ($state === 'fresh') return 'color-mix(in srgb, var(--color-success) 10%, var(--color-bg))'
    if ($state === 'stale') return 'color-mix(in srgb, var(--color-warning) 10%, var(--color-bg))'
    if ($state === 'fetching') return 'color-mix(in srgb, var(--color-primary) 10%, var(--color-bg))'
    if ($state === 'inactive') return 'color-mix(in srgb, var(--color-gray-500) 10%, var(--color-bg))'
    return 'var(--color-gray-100)'
  }};
  color: ${({ $state }) => {
    if ($state === 'fresh') return 'var(--color-success)'
    if ($state === 'stale') return 'var(--color-warning)'
    if ($state === 'fetching') return 'var(--color-primary)'
    if ($state === 'inactive') return 'var(--color-gray-500)'
    return 'var(--color-gray-600)'
  }};
`

const StateTimerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--sp-4);
`

const TimerWidget = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: var(--sp-4);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const TimerValue = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  font-family: monospace;
`

const ProgressBar = styled.div<{ $progress: number; $color: string }>`
  width: 100%;
  height: 6px;
  background: var(--color-gray-100);
  border-radius: 999px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ $progress }) => `${$progress}%`};
    background: ${({ $color }) => $color};
    transition: width 0.1s linear;
  }
`

const LogPanel = styled.div`
  background: var(--color-gray-900);
  color: var(--color-gray-300);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  padding: var(--sp-4);
  border-radius: var(--radius-xl);
  height: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const LogLine = styled.div<{ $type: string }>`
  animation: ${slideIn} 0.15s ease-out both;
  line-height: 1.5;
  color: ${({ $type }) => {
    if ($type === 'network') return '#60a5fa' // blue
    if ($type === 'cache_hit') return '#34d399' // green
    if ($type === 'stale') return '#fbbf24' // yellow
    if ($type === 'gc') return '#f87171' // red
    return '#9ca3af' // gray
  }};
`

const TOC = [
  { id: 'section1', label: '1. 캐시 라이프사이클 시뮬레이터' },
  { id: 'section2', label: '2. staleTime vs gcTime' },
  { id: 'section3', label: '3. React Query 핵심 설정 가이드' },
]

export default function ReactQueryPlayground() {
  const [staleTime, setStaleTime] = useState(5) // seconds
  const [gcTime, setGcTime] = useState(15) // seconds
  const [latency, setLatency] = useState(1.5) // seconds

  const [queryState, setQueryState] = useState<'none' | 'fetching' | 'fresh' | 'stale' | 'inactive' | 'gc'>('none')
  const [isMounted, setIsMounted] = useState(true)
  const [data, setData] = useState<string | null>(null)
  
  // Timers (in deciseconds, i.e. 0.1s units for smooth UI)
  const [staleCountdown, setStaleCountdown] = useState(0)
  const [gcCountdown, setGcCountdown] = useState(0)
  
  const [logs, setLogs] = useState<{ id: number; time: string; text: string; type: string }[]>([])
  
  const logIdRef = useRef(0)
  const logEndRef = useRef<HTMLDivElement>(null)

  const addLog = (text: string, type: string = 'info') => {
    const now = new Date()
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${(now.getMilliseconds() / 100).toFixed(0)}`
    setLogs((prev) => [...prev, { id: logIdRef.current++, time: timeStr, text, type }])
  }

  // Scroll to bottom of logs
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  // Countdowns ticking
  useEffect(() => {
    const interval = setInterval(() => {
      // Stale Countdown
      if (queryState === 'fresh') {
        setStaleCountdown((prev) => {
          if (prev <= 1) {
            setQueryState('stale')
            addLog('staleTime 만료: 데이터가 Stale(낡음) 상태로 변환되었습니다.', 'stale')
            return 0
          }
          return prev - 1
        })
      }

      // GC Countdown
      if (queryState === 'inactive') {
        setGcCountdown((prev) => {
          if (prev <= 1) {
            setQueryState('gc')
            setData(null)
            addLog('gcTime 만료: 가비지 컬렉션 완료. 메모리 캐시에서 제거되었습니다.', 'gc')
            return 0
          }
          return prev - 1
        })
      }
    }, 100)

    return () => clearInterval(interval)
  }, [queryState])

  const triggerQuery = async () => {
    if (queryState === 'fetching') return

    const now = new Date()
    
    // Cache Hit (Fresh)
    if (queryState === 'fresh') {
      addLog('캐시 히트 (Fresh)! 서버 요청 없이 캐시 데이터를 즉시 반환합니다.', 'cache_hit')
      return
    }

    // Cache Hit (Stale) - Background refetch
    if (queryState === 'stale') {
      addLog('캐시 히트 (Stale)! 화면에 낡은 캐시를 보여주고, 백그라운드 Refetch를 개시합니다.', 'stale')
      setQueryState('fetching')
      
      setTimeout(() => {
        const fetchTime = new Date()
        setData(`Data fetched at ${fetchTime.toLocaleTimeString()}`)
        setQueryState('fresh')
        setStaleCountdown(staleTime * 10)
        setGcCountdown(0)
        addLog('백그라운드 Refetch 완료. 캐시 데이터를 최신으로 갱신하고 Fresh 상태로 변경합니다.', 'cache_hit')
      }, latency * 1000)
      return
    }

    // Cache Miss (none or gc or inactive) - Cold Fetch
    addLog(`서버 API 요청 개시 (Latency: ${latency}s)...`, 'network')
    setQueryState('fetching')
    
    setTimeout(() => {
      const fetchTime = new Date()
      setData(`Data fetched at ${fetchTime.toLocaleTimeString()}`)
      setQueryState('fresh')
      setStaleCountdown(staleTime * 10)
      setGcCountdown(0)
      addLog('요청 성공! 신규 데이터를 캐시에 저장하고 Fresh 상태로 둡니다.', 'cache_hit')
    }, latency * 1000)
  }

  const toggleMount = () => {
    if (isMounted) {
      // Unmount component
      setIsMounted(false)
      addLog('화면에서 컴포넌트 언마운트 (Query Inactive). gcTime 카운트다운을 시작합니다.', 'info')
      if (queryState === 'fresh' || queryState === 'stale') {
        setQueryState('inactive')
        setGcCountdown(gcTime * 10)
      }
    } else {
      // Mount component
      setIsMounted(true)
      addLog('컴포넌트 리마운트 (Query Active).', 'info')
      if (queryState === 'inactive') {
        // Recover state
        setQueryState(staleCountdown > 0 ? 'fresh' : 'stale')
        setGcCountdown(0)
      }
    }
  }

  const clearCache = () => {
    setQueryState('none')
    setData(null)
    setStaleCountdown(0)
    setGcCountdown(0)
    addLog('캐시 강제 초기화 완료.', 'info')
  }

  // Calculate percentages
  const stalePercent = staleTime > 0 ? (staleCountdown / (staleTime * 10)) * 100 : 0
  const gcPercent = gcTime > 0 ? (gcCountdown / (gcTime * 10)) * 100 : 0

  return (
    <ContentDoc
      badge="Playground · React Query"
      badgeIcon={<Database size={12} />}
      title="React Query & API Mocking 플레이그라운드"
      quote={
        <>
          TanStack Query(React Query)를 완벽하게 사용하려면 캐시 상태(Fresh, Stale, Inactive)의 순환과 
          staleTime, gcTime의 상호작용을 머릿속에 그려야 합니다. 슬라이더를 조정하여 직접 시뮬레이션해 보세요.
        </>
      }
      toc={TOC}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="캐시 라이프사이클 시뮬레이터" />
        <Paragraph>
          아래의 시뮬레이터를 통해 <strong>staleTime</strong>과 <strong>gcTime(구 cacheTime)</strong>을 설정하고, 
          쿼리를 호출하거나 컴포넌트를 마운트/언마운트 해보며 로그 흐름과 캐시 데이터를 모니터링하세요.
        </Paragraph>

        <SimulatorContainer>
          <ControlPanel>
            <ControlRow>
              <LabelRow>
                <span>staleTime (신선함 유지 시간)</span>
                <span>{staleTime}초</span>
              </LabelRow>
              <Slider
                type="range"
                min="2"
                max="15"
                value={staleTime}
                onChange={(e) => {
                  setStaleTime(Number(e.target.value))
                  addLog(`staleTime이 ${e.target.value}초로 변경되었습니다.`, 'info')
                }}
              />
              <CardText style={{ fontSize: '0.8rem', marginTop: 0 }}>
                이 시간 안에는 동일 쿼리를 호출해도 API를 호출하지 않고 캐시에서 즉시 리턴합니다.
              </CardText>
            </ControlRow>

            <ControlRow>
              <LabelRow>
                <span>gcTime (비활성 캐시 소멸 대기 시간)</span>
                <span>{gcTime}초</span>
              </LabelRow>
              <Slider
                type="range"
                min="5"
                max="30"
                value={gcTime}
                onChange={(e) => {
                  setGcTime(Number(e.target.value))
                  addLog(`gcTime이 ${e.target.value}초로 변경되었습니다.`, 'info')
                }}
              />
              <CardText style={{ fontSize: '0.8rem', marginTop: 0 }}>
                컴포넌트가 언마운트되어 쿼리가 Inactive(비활성) 상태가 된 시점부터 메모리에 남아있는 시간입니다.
              </CardText>
            </ControlRow>

            <ControlRow>
              <LabelRow>
                <span>API Network Latency (네트워크 지연)</span>
                <span>{latency}초</span>
              </LabelRow>
              <Slider
                type="range"
                min="0.5"
                max="3.0"
                step="0.5"
                value={latency}
                onChange={(e) => setLatency(Number(e.target.value))}
              />
            </ControlRow>

            <ActionButtons>
              <Button onClick={triggerQuery} disabled={!isMounted || queryState === 'fetching'}>
                <RefreshCw size={14} className={queryState === 'fetching' ? 'animate-spin' : ''} />
                useQuery 실행
              </Button>
              <Button onClick={toggleMount} variant="secondary">
                {isMounted ? <Pause size={14} /> : <Play size={14} />}
                컴포넌트 {isMounted ? '언마운트' : '마운트'}
              </Button>
              <Button onClick={clearCache} variant="danger">
                <Trash2 size={14} />
                캐시 비우기
              </Button>
            </ActionButtons>
          </ControlPanel>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            {isMounted ? (
              <QueryStateCard $state={queryState}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CardTitle style={{ margin: 0, fontSize: '0.95rem' }}>
                    <Wifi size={16} color="var(--color-primary)" /> Query Component
                  </CardTitle>
                  <StatusBadge $state={queryState}>
                    {queryState === 'none' ? 'No Cache' : queryState}
                  </StatusBadge>
                </div>
                
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>캐시된 데이터 내용:</span>
                  <div style={{ background: 'var(--color-surface)', padding: '0.5rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginTop: '4px', border: '1px solid var(--color-border)', fontFamily: 'monospace' }}>
                    {data || 'empty (No Cache Data)'}
                  </div>
                </div>

                <StateTimerGrid>
                  <TimerWidget>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Stale 남은 시간</span>
                    <TimerValue style={{ color: staleCountdown > 0 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                      {(staleCountdown / 10).toFixed(1)}s
                    </TimerValue>
                    <ProgressBar $progress={stalePercent} $color="var(--color-success)" />
                  </TimerWidget>
                  <TimerWidget>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>GC 남은 시간</span>
                    <TimerValue style={{ color: 'var(--color-text-muted)' }}>
                      0.0s
                    </TimerValue>
                    <ProgressBar $progress={0} $color="var(--color-gray-400)" />
                  </TimerWidget>
                </StateTimerGrid>
              </QueryStateCard>
            ) : (
              <QueryStateCard $state={queryState}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CardTitle style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
                    🚫 Component Unmounted
                  </CardTitle>
                  <StatusBadge $state={queryState}>
                    {queryState}
                  </StatusBadge>
                </div>

                <StateTimerGrid>
                  <TimerWidget>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Stale 남은 시간</span>
                    <TimerValue style={{ color: 'var(--color-text-muted)' }}>
                      {(staleCountdown / 10).toFixed(1)}s
                    </TimerValue>
                  </TimerWidget>
                  <TimerWidget>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>GC 남은 시간</span>
                    <TimerValue style={{ color: gcCountdown > 0 ? 'var(--color-error)' : 'var(--color-text-muted)' }}>
                      {(gcCountdown / 10).toFixed(1)}s
                    </TimerValue>
                    <ProgressBar $progress={gcPercent} $color="var(--color-error)" />
                  </TimerWidget>
                </StateTimerGrid>
              </QueryStateCard>
            )}
          </div>
        </SimulatorContainer>

        <LogPanel>
          <div style={{ borderBottom: '1px solid var(--color-gray-800)', paddingBottom: '0.4rem', marginBottom: '0.4rem', display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: '0.75rem' }}>
            <span>실시간 콘솔 및 캐시 로그 스트림</span>
            <span>Active</span>
          </div>
          {logs.map((log) => (
            <LogLine key={log.id} $type={log.type}>
              [{log.time}] {log.text}
            </LogLine>
          ))}
          {logs.length === 0 && (
            <div style={{ color: '#6b7280', textAlign: 'center', marginTop: '2rem' }}>
              &apos;useQuery 실행&apos; 버튼을 클릭해 첫 쿼리를 요청해 보세요.
            </div>
          )}
          <div ref={logEndRef} />
        </LogPanel>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="staleTime vs gcTime" />
        <Paragraph>
          TanStack Query의 핵심은 <strong>두 타이머의 협업</strong>으로 캐시 유효성과 브라우저 메모리를 관리하는 것입니다.
        </Paragraph>

        <Card style={{ background: 'var(--color-surface)', marginBlock: 'var(--sp-4)' }}>
          <CardTitle>staleTime (기본값: 0)</CardTitle>
          <CardText>
            데이터가 <strong>fresh(신선함) → stale(낡음)</strong> 상태로 전환되기까지 걸리는 시간입니다. 
            staleTime이 0인 경우, 데이터를 가져오는 즉시 stale 상태가 되어 리렌더 시마다 백그라운드 리페치(Refetch)가 트리거될 가능성이 있습니다.
          </CardText>
        </Card>

        <Card style={{ background: 'var(--color-surface)', marginBlock: 'var(--sp-4)' }}>
          <CardTitle>gcTime (기본값: 5분, 과거 cacheTime)</CardTitle>
          <CardText>
            쿼리를 사용하는 컴포넌트가 모두 언마운트되었을 때(즉, 쿼리가 <strong>Inactive</strong> 상태일 때) 메모리 상에 캐시를 보존하는 시간입니다. 
            gcTime 만료 전 다시 마운트하면 캐시 히트를 누리며 화면에 임시 데이터가 보여지고 뒤이어 백그라운드 갱신이 진행됩니다.
          </CardText>
        </Card>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="React Query 핵심 설정 가이드" />
        <Paragraph>
          실무에서 흔히 쓰이는 쿼리 설정 패턴입니다.
        </Paragraph>
        <CodeBlock label="React Query Global Configuration">{`const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분 동안은 캐시된 데이터가 "신선"하다고 간주
      gcTime: 1000 * 60 * 10,    // 비활성화 후 10분 동안 캐시 보존
      refetchOnWindowFocus: false, // 브라우저 창 포커스 시 재요청 비활성화
      retry: 1,                   // 실패 시 재시도 횟수
    },
  },
})`}</CodeBlock>
      </Section>

      <HeaderQuote>
        staleTime은 서버 요청 빈도를 제어하고, gcTime은 메모리 자원 회수 시점을 제어한다.
        <br />
        <strong>이 두 특성을 명확히 활용하면 로딩 없는 UX와 서버 자원 보존을 동시에 달성할 수 있다.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
