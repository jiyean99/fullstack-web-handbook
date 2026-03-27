'use client'

import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

const DiagramFrame = styled.div`
  width: 100%;
  padding: var(--sp-5);
  background: var(--color-surface);
  border-radius: 1rem;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
`

const TabRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: var(--sp-4);
`

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid var(--color-border);
  cursor: pointer;
  background: ${({ $active }) => ($active ? 'var(--color-docker-blue, var(--color-primary))' : 'var(--color-bg)')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--color-text-muted)')};
  transition: background 0.15s ease, color 0.15s ease;
`

const Hint = styled.p`
  font-size: 0.72rem;
  color: var(--color-text-muted);
  margin-top: var(--sp-3);
  text-align: center;
`

const SvgWrap = styled.div`
  width: 100%;
  svg {
    display: block;
    width: 100%;
    height: auto;
    max-height: 220px;
  }
`

/** 1. 전통 vs 컨테이너 패키징 */
export function PackagingInteractiveSvg() {
  const [mode, setMode] = useState<'legacy' | 'container'>('legacy')
  return (
    <DiagramFrame>
      <TabRow>
        <Tab type="button" $active={mode === 'legacy'} onClick={() => setMode('legacy')}>
          전통 (환경별 설치)
        </Tab>
        <Tab type="button" $active={mode === 'container'} onClick={() => setMode('container')}>
          컨테이너 (이미지)
        </Tab>
      </TabRow>
      <SvgWrap>
        <svg viewBox="0 0 400 200" role="img" aria-label="배포 방식 비교">
          <defs>
            <linearGradient id="pkg-host" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-gray-200)" />
              <stop offset="100%" stopColor="var(--color-gray-300)" />
            </linearGradient>
            <marker id="pkg-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="var(--color-primary)" />
            </marker>
          </defs>
          {mode === 'legacy' ? (
            <>
              <text x="200" y="18" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11" fontWeight="700">
                서버마다 OS·런타임·라이브러리 버전이 달라질 수 있음
              </text>
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${40 + i * 120}, 40)`}>
                  <rect width="90" height="140" rx="8" fill="url(#pkg-host)" stroke="var(--color-border)" />
                  <text x="45" y="22" textAnchor="middle" fill="var(--color-text)" fontSize="10" fontWeight="700">
                    Host {i + 1}
                  </text>
                  <rect x="12" y="35" width="66" height="18" rx="3" fill="#fca5a5" opacity="0.85" />
                  <rect x="12" y="58" width="50" height="14" rx="2" fill="#fde047" opacity="0.9" />
                  <rect x="12" y="78" width="58" height="14" rx="2" fill="#86efac" opacity="0.9" />
                  <text x="45" y="115" textAnchor="middle" fill="var(--color-error)" fontSize="9" fontWeight="600">
                    Drift?
                  </text>
                </g>
              ))}
            </>
          ) : (
            <>
              <text x="200" y="18" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11" fontWeight="700">
                동일 이미지 → 어디서나 동일 실행
              </text>
              <g transform="translate(30, 45)">
                <rect width="100" height="120" rx="10" fill="var(--color-primary-light)" stroke="var(--color-primary)" strokeWidth="2" />
                <text x="50" y="28" textAnchor="middle" fill="var(--color-primary)" fontSize="11" fontWeight="800">
                  Image
                </text>
                <rect x="15" y="45" width="70" height="22" rx="4" fill="var(--color-bg)" stroke="var(--color-border)" />
                <text x="50" y="60" textAnchor="middle" fill="var(--color-text)" fontSize="9">
                  app + deps
                </text>
                <text x="50" y="100" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8">
                  단일 아티팩트
                </text>
              </g>
              <path
                d="M 140 105 L 175 105"
                stroke="var(--color-primary)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#pkg-arrow)"
              />
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${185 + i * 68}, 55)`}>
                  <rect width="58" height="100" rx="8" fill="var(--color-bg)" stroke="var(--color-docker-blue, var(--color-primary))" strokeWidth="2" />
                  <rect x="8" y="28" width="42" height="36" rx="4" fill="var(--color-primary-light)" opacity="0.6" />
                  <text x="29" y="90" textAnchor="middle" fill="var(--color-success)" fontSize="8" fontWeight="700">
                    동일
                  </text>
                </g>
              ))}
            </>
          )}
        </svg>
      </SvgWrap>
      <Hint>상단 탭으로 전통 배포와 이미지 기반 배포를 전환해 비교할 수 있다.</Hint>
    </DiagramFrame>
  )
}

/** 2. 커널 공유 + 격리 레이어 (호버) */
export function IsolationInteractiveSvg() {
  const [hover, setHover] = useState<string | null>(null)
  return (
    <DiagramFrame>
      <SvgWrap>
        <svg viewBox="0 0 400 220" role="img" aria-label="컨테이너 격리 구조">
          <rect x="20" y="160" width="360" height="48" rx="8" fill="var(--color-gray-800)" />
          <text x="200" y="188" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontWeight="700">
            Linux Kernel (공유)
          </text>
          <text x="200" y="205" textAnchor="middle" fill="#9ca3af" fontSize="9">
            Namespaces · Cgroups
          </text>
          {[0, 1, 2].map((i) => {
            const x = 35 + i * 115
            const active = hover === `c${i}`
            return (
              <g key={i} transform={`translate(${x}, 25)`}>
                <rect
                  width="100"
                  height="120"
                  rx="10"
                  fill={active ? 'var(--color-primary-light)' : 'var(--color-bg)'}
                  stroke={active ? 'var(--color-docker-blue)' : 'var(--color-border)'}
                  strokeWidth={active ? 2.5 : 1.5}
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onMouseEnter={() => setHover(`c${i}`)}
                  onMouseLeave={() => setHover(null)}
                />
                <text x="50" y="22" textAnchor="middle" fill="var(--color-text)" fontSize="10" fontWeight="700">
                  Container {i + 1}
                </text>
                <text x="50" y="48" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8">
                  net ns
                </text>
                <text x="50" y="62" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8">
                  mount ns
                </text>
                <text x="50" y="76" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8">
                  cgroup
                </text>
                <line x1="50" y1="95" x2="50" y2="135" stroke="var(--color-border)" strokeDasharray="4 3" />
              </g>
            )
          })}
        </svg>
      </SvgWrap>
      <Hint>각 컨테이너 박스에 마우스를 올리면 해당 격리 단위가 강조된다.</Hint>
    </DiagramFrame>
  )
}

/** 3. 이식성: 중앙 이미지 ↔ 클라우드 호버 */
export function PortabilityInteractiveSvg() {
  const [cloud, setCloud] = useState<number | null>(null)
  /** 이미지 박스: translate(150,70) + rect 100×70 → 하단 중앙 (200, 140) */
  const imageBottom = { x: 200, y: 140 }
  const clouds = [
    { id: 0, label: 'AWS', cx: 80, cy: 172, ry: 22 },
    { id: 1, label: 'GCP', cx: 200, cy: 172, ry: 22 },
    { id: 2, label: 'Azure', cx: 320, cy: 172, ry: 22 },
  ]
  return (
    <DiagramFrame>
      <SvgWrap>
        <svg viewBox="0 0 400 200" role="img" aria-label="멀티 클라우드 이식성">
          <g transform="translate(150, 70)">
            <rect width="100" height="70" rx="12" fill="var(--color-primary-light)" stroke="var(--color-primary)" strokeWidth="2" />
            <text x="50" y="38" textAnchor="middle" fill="var(--color-primary)" fontSize="12" fontWeight="800">
              Image
            </text>
            <text x="50" y="56" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8">
              동일 아티팩트
            </text>
          </g>
          {clouds.map((c) => {
            const active = cloud === c.id
            const topY = c.cy - c.ry
            return (
              <g key={c.id}>
                <line
                  x1={imageBottom.x}
                  y1={imageBottom.y}
                  x2={c.cx}
                  y2={topY}
                  stroke={active ? 'var(--color-success)' : 'var(--color-border)'}
                  strokeWidth={active ? 2.5 : 1}
                  opacity={active ? 1 : 0.35}
                />
                <g
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setCloud(c.id)}
                  onMouseLeave={() => setCloud(null)}
                >
                  <ellipse
                    cx={c.cx}
                    cy={c.cy}
                    rx="48"
                    ry={c.ry}
                    fill={active ? 'var(--color-primary-light)' : 'var(--color-surface)'}
                    stroke={active ? 'var(--color-success)' : 'var(--color-border)'}
                    strokeWidth={active ? 2 : 1}
                  />
                  <text x={c.cx} y={c.cy + 4} textAnchor="middle" fill="var(--color-text)" fontSize="10" fontWeight="700">
                    {c.label}
                  </text>
                </g>
              </g>
            )
          })}
          <text x="200" y="22" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11" fontWeight="700">
            벤더에 묶이지 않는 배포 단위
          </text>
        </svg>
      </SvgWrap>
      <Hint>클라우드 영역에 마우스를 올리면 해당 벤더로 가는 연결선이 강조된다.</Hint>
    </DiagramFrame>
  )
}

const flowPulse = keyframes`
  0% { opacity: 0.25; }
  50% { opacity: 1; }
  100% { opacity: 0.25; }
`

const FlowSegment = styled.line<{ $delay: number }>`
  animation: ${flowPulse} 2.2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`

/** 4. CI/CD 파이프라인 — 원 중심 x = s.x, 반지름 32, 연결선은 인접 원의 오른쪽·왼쪽 끝만 잇는다 */
export function CicdInteractiveSvg() {
  const R = 32
  const cy = 90
  const steps: { id: string; label: string; sub?: string; cx: number }[] = [
    { id: 'commit', label: 'Commit', cx: 52 },
    { id: 'build', label: 'Build', sub: '+ Test', cx: 142 },
    { id: 'registry', label: 'Registry', cx: 232 },
    { id: 'deploy', label: 'Deploy', cx: 322 },
  ]
  const connectors = steps.slice(0, -1).map((s, i) => {
    const next = steps[i + 1]
    return {
      x1: s.cx + R,
      x2: next.cx - R,
      delay: i * 0.35,
    }
  })
  return (
    <DiagramFrame>
      <SvgWrap>
        <svg viewBox="0 0 380 200" role="img" aria-label="CI CD 파이프라인">
          <text x="190" y="22" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11" fontWeight="700">
            컨테이너 기반 CI/CD 흐름
          </text>
          {steps.map((s) => (
            <g key={s.id} transform={`translate(${s.cx - 35}, 55)`}>
              <circle cx="35" cy="35" r={R} fill="var(--color-bg)" stroke="var(--color-docker-blue, var(--color-primary))" strokeWidth="2" />
              <text x="35" y={s.sub ? 28 : 38} textAnchor="middle" fill="var(--color-text)" fontSize="9" fontWeight="700">
                {s.label}
              </text>
              {s.sub && (
                <text x="35" y="42" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8" fontWeight="600">
                  {s.sub}
                </text>
              )}
            </g>
          ))}
          <g stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" fill="none">
            {connectors.map((seg, i) => (
              <FlowSegment key={i} x1={seg.x1} y1={cy} x2={seg.x2} y2={cy} $delay={seg.delay} />
            ))}
          </g>
        </svg>
      </SvgWrap>
      <Hint>인접 단계 사이의 구간이 순서대로 깜빡이며 파이프라인 흐름을 보여 준다.</Hint>
    </DiagramFrame>
  )
}

/** 5. K8s desired state / self-heal 토글 */
export function K8sInteractiveSvg() {
  const [failed, setFailed] = useState(false)
  return (
    <DiagramFrame>
      <TabRow>
        <Tab type="button" $active={!failed} onClick={() => setFailed(false)}>
          정상 (3 Pods)
        </Tab>
        <Tab type="button" $active={failed} onClick={() => setFailed(true)}>
          장애 시뮬 (Self-heal)
        </Tab>
      </TabRow>
      <SvgWrap>
        <svg viewBox="0 0 400 200" role="img" aria-label="Kubernetes Pod 상태">
          <rect x="30" y="30" width="340" height="50" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" />
          <text x="200" y="58" textAnchor="middle" fill="var(--color-text)" fontSize="11" fontWeight="700">
            Control Plane — Desired: replicas = 3
          </text>
          <text x="200" y="150" textAnchor="middle" fill="var(--color-text-muted)" fontSize="9">
            Worker Node
          </text>
          {[0, 1, 2].map((i) => {
            const x = 55 + i * 115
            const isBroken = failed && i === 1
            const isNew = failed && i === 2
            return (
              <g key={i} transform={`translate(${x}, 95)`}>
                <rect
                  width="70"
                  height="45"
                  rx="6"
                  fill={
                    isBroken
                      ? '#fef2f2'
                      : isNew && failed
                        ? '#f0fdf4'
                        : 'var(--color-bg)'
                  }
                  stroke={isBroken ? 'var(--color-error)' : isNew && failed ? 'var(--color-success)' : 'var(--color-border)'}
                  strokeWidth={isBroken || (isNew && failed) ? 2.5 : 1.5}
                />
                <text x="35" y="28" textAnchor="middle" fill="var(--color-text)" fontSize="10" fontWeight="700">
                  Pod
                </text>
                {isBroken && (
                  <text x="35" y="42" textAnchor="middle" fill="var(--color-error)" fontSize="8" fontWeight="700">
                    Crash
                  </text>
                )}
                {isNew && failed && (
                  <text x="35" y="42" textAnchor="middle" fill="var(--color-success)" fontSize="8" fontWeight="700">
                    New
                  </text>
                )}
              </g>
            )
          })}
          {failed && (
            <text x="200" y="188" textAnchor="middle" fill="var(--color-success)" fontSize="9" fontWeight="700">
              스케줄러가 새 Pod를 띄워 desired state 유지
            </text>
          )}
        </svg>
      </SvgWrap>
      <Hint>장애 시뮬 탭을 누르면 가운데 Pod 장애와 오른쪽 교체 Pod를 같은 화면에서 비교할 수 있다.</Hint>
    </DiagramFrame>
  )
}
