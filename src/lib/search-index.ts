// 상단 검색바가 사용하는 정적 검색 인덱스.
// 새 문서를 추가하면 이 배열에 항목을 등록하면 검색에 바로 반영된다.
// (Journal 글은 entries.ts에서 자동으로 합쳐지므로 따로 등록할 필요 없다.)

import { journalEntries } from '@/app/journal/entries'

export interface SearchDoc {
  title: string
  href: string
  section: string
  description: string
  keywords?: string
}

const pages: SearchDoc[] = [
  {
    title: 'Overview',
    href: '/',
    section: 'Overview',
    description: 'BE·FE·DevOps 전반을 다루는 풀스택 웹 개발 핸드북의 시작점',
    keywords: '홈 home 개요 랜딩 핸드북',
  },

  // ─── Frontend ──────────────────────────────
  {
    title: 'Frontend 개발',
    href: '/frontend',
    section: 'Frontend',
    description: '기본→심화→실무 경로로 정리한 프론트엔드 학습 커리큘럼',
    keywords: '프론트엔드 frontend 기본 심화 실무 커리큘럼',
  },
  {
    title: '브라우저 렌더링 원리',
    href: '/frontend/browser-rendering',
    section: 'Frontend',
    description: 'DOM·CSSOM, 렌더 트리, 임계 렌더링 경로, 리플로우·리페인트, 이벤트 루프, 가상 DOM',
    keywords: '브라우저 browser 렌더링 rendering dom cssom 렌더트리 레이아웃 layout 페인트 paint 리플로우 reflow 리페인트 repaint 이벤트루프 event loop 가상돔 virtual dom critical rendering path',
  },
  {
    title: 'React 핵심 패턴',
    href: '/frontend/react',
    section: 'Frontend',
    description: '상태관리 전략, 렌더링 최적화, 컴포넌트 설계 원칙까지 React 실무 패턴',
    keywords: 'react 리액트 상태관리 zustand tanstack query 렌더링 최적화 메모이제이션',
  },
  {
    title: '프론트엔드 성능 최적화',
    href: '/frontend/performance',
    section: 'Frontend',
    description: 'Core Web Vitals, 리렌더 줄이기, 코드 스플리팅, 이미지·폰트, 캐싱',
    keywords: '성능 performance 최적화 optimization core web vitals lcp cls inp 리렌더 rerender memo 번들 bundle 코드스플리팅 code splitting lazy 이미지 폰트 캐싱 cache prefetch',
  },
  {
    title: 'TypeScript 실무 타입',
    href: '/frontend/typescript',
    section: 'Frontend',
    description: '유틸리티 타입, 판별 유니온, 도메인 모델링, infer, Zod 런타임 검증',
    keywords: 'typescript 타입스크립트 utility type union infer zod 제네릭',
  },
  {
    title: 'Styling 전략',
    href: '/frontend/styling',
    section: 'Frontend',
    description: 'styled-components, 디자인 토큰, 다크 모드, CSS 아키텍처와 동적 스타일링',
    keywords: 'styling 스타일링 css styled-components 디자인 토큰 다크모드 테마',
  },
  {
    title: '메타프레임워크와 렌더링 전략',
    href: '/frontend/meta-frameworks',
    section: 'Frontend',
    description: 'Astro·Next·Remix, CSR/SSR/SSG/ISR, 아일랜드 아키텍처, 콘텐츠 워크플로우',
    keywords: 'astro next remix 메타프레임워크 ssr ssg isr csr island 아일랜드 하이드레이션 렌더링',
  },
  {
    title: '웹 접근성과 시맨틱 마크업',
    href: '/frontend/accessibility',
    section: 'Frontend',
    description: '시맨틱 HTML, 랜드마크, 키보드 접근성과 포커스, ARIA, 접근 가능한 폼',
    keywords: '접근성 accessibility a11y 시맨틱 semantic html aria 스크린리더 키보드 keyboard 포커스 focus wcag 폼 form 랜드마크 landmark',
  },

  // ─── Backend ───────────────────────────────
  {
    title: 'Backend 개발',
    href: '/backend',
    section: 'Backend',
    description: '기본→심화→실무 경로로 정리한 백엔드 학습 커리큘럼',
    keywords: '백엔드 backend 기본 심화 실무 커리큘럼',
  },
  {
    title: '백엔드 동작 원리',
    href: '/backend/fundamentals',
    section: 'Backend',
    description: '요청 처리 흐름, 웹서버와 WAS, 계층 구조, 무상태성, 스레드·커넥션 풀',
    keywords: '백엔드 기본 fundamentals 요청 처리 was 웹서버 계층 stateless 무상태 스레드 커넥션풀 수평확장',
  },
  {
    title: 'HTTP / REST API 설계',
    href: '/backend/http-rest',
    section: 'Backend',
    description: '메서드 의미론, 상태 코드, 리소스 설계, RFC 7807 에러 포맷',
    keywords: 'http rest api 상태코드 메서드 rfc7807 리소스',
  },
  {
    title: 'Spring Boot 실무 패턴',
    href: '/backend/spring-boot',
    section: 'Backend',
    description: '레이어드 아키텍처, DI, 트랜잭션, JPA, 테스팅 전략',
    keywords: 'spring boot 스프링 jpa di 트랜잭션 transaction 테스트',
  },
  {
    title: '데이터베이스와 트랜잭션 심화',
    href: '/backend/database-transactions',
    section: 'Backend',
    description: 'ACID, 격리 수준, 낙관적·비관적 락, 인덱스와 실행 계획, N+1 쿼리',
    keywords: 'database db 데이터베이스 트랜잭션 transaction acid 격리수준 isolation 락 lock 인덱스 index n+1 실행계획 explain 동시성',
  },
  {
    title: 'Python & FastAPI',
    href: '/backend/fastapi',
    section: 'Backend',
    description: '타입 힌트, Pydantic 검증, Depends 주입, async, 테스트',
    keywords: 'python fastapi 파이썬 pydantic async depends',
  },
  {
    title: '인증·인가와 API 보안',
    href: '/backend/auth-security',
    section: 'Backend',
    description: '인증/인가, 세션과 JWT, RBAC, OWASP 흔한 취약점 방어',
    keywords: '인증 인가 authentication authorization 보안 security jwt 세션 session rbac oauth owasp cors 토큰 token 인젝션 injection',
  },

  // ─── DevOps ────────────────────────────────
  {
    title: 'DevOps & Infra',
    href: '/devops',
    section: 'DevOps',
    description: 'Docker, CI/CD, AWS까지 배포 자동화를 위한 인프라 정리',
    keywords: '데브옵스 devops infra 인프라',
  },
  {
    title: 'DevOps 개요',
    href: '/devops/overview',
    section: 'DevOps',
    description: 'DevOps 문화와 전체 그림, 핵심 도구 체인 개요',
    keywords: 'devops overview 개요',
  },
  {
    title: '네트워크 기초',
    href: '/devops/network',
    section: 'DevOps',
    description: 'TCP/IP, DNS, HTTP, TLS 등 웹 동작의 바탕이 되는 네트워크 기초',
    keywords: 'network 네트워크 tcp ip dns tls http',
  },
  {
    title: 'Git 핸드북',
    href: '/devops/git',
    section: 'DevOps',
    description: '브랜치 전략, 리베이스, 충돌 해결 등 실무 Git 사용법',
    keywords: 'git 깃 브랜치 rebase merge 충돌',
  },
  {
    title: '컨테이너와 클라우드 네이티브',
    href: '/devops/container',
    section: 'DevOps',
    description: 'Docker 이미지·컨테이너, 멀티스테이지 빌드, 클라우드 네이티브 개념',
    keywords: 'docker 도커 container 컨테이너 kubernetes k8s 이미지',
  },
  {
    title: 'CI/CD 파이프라인',
    href: '/devops/cicd',
    section: 'DevOps',
    description: 'GitHub Actions 워크플로우, 시크릿, 캐싱, 배포 자동화',
    keywords: 'cicd ci cd github actions 배포 파이프라인 워크플로우',
  },
  {
    title: 'AWS 인프라 기초',
    href: '/devops/aws',
    section: 'DevOps',
    description: 'EC2, S3, RDS, VPC, IAM과 책임 공유 모델',
    keywords: 'aws ec2 s3 rds vpc iam 클라우드',
  },

  // ─── Architecture ──────────────────────────
  {
    title: 'Architecture & Patterns',
    href: '/architecture',
    section: 'Architecture',
    description: '레이어드·헥사고날 아키텍처와 에러 처리 등 검증된 설계 기법',
    keywords: '아키텍처 architecture 설계 패턴 pattern',
  },
  {
    title: '레이어드 & 헥사고날 아키텍처',
    href: '/architecture/layered-hexagonal',
    section: 'Architecture',
    description: '계층 분리, 포트와 어댑터, 도메인 독립성',
    keywords: 'layered hexagonal 레이어드 헥사고날 포트 어댑터 도메인',
  },
  {
    title: '에러 처리 & 회복탄력성',
    href: '/architecture/resilience',
    section: 'Architecture',
    description: '전역 예외 핸들러, 에러 코드, Circuit Breaker',
    keywords: 'error 에러 예외 resilience 회복탄력성 circuit breaker retry',
  },

  // ─── Playgrounds ───────────────────────────
  {
    title: 'Playgrounds',
    href: '/playgrounds',
    section: 'Playgrounds',
    description: '개념을 직접 체험할 수 있는 인터랙티브 데모 모음',
    keywords: 'playground 실습 데모 demo 인터랙티브',
  },
  {
    title: '상태관리 Playground',
    href: '/playgrounds/state',
    section: 'Playgrounds',
    description: '파생 상태, 비동기 액션, persist, 셀렉터 리렌더 비교 데모',
    keywords: 'state 상태관리 zustand 데모 셀렉터 리렌더',
  },
  {
    title: '디자인 시스템 Playground',
    href: '/playgrounds/design-system',
    section: 'Playgrounds',
    description: '디자인 토큰, 간격·반경·그림자 스케일, 실시간 코드 미리보기',
    keywords: 'design system 디자인시스템 토큰 컬러 타이포 버튼',
  },

  // ─── About ─────────────────────────────────
  {
    title: 'About & Meta',
    href: '/about',
    section: 'About',
    description: '핸드북의 작성 가이드와 업데이트 이력, 프로젝트 철학',
    keywords: 'about 소개 메타 changelog 가이드',
  },
]

export const searchIndex: SearchDoc[] = [
  ...pages,
  ...journalEntries.map((entry) => ({
    title: entry.title,
    href: `/journal/${entry.slug}`,
    section: 'Journal',
    description: entry.summary,
    keywords: [...entry.tags, entry.category, '저널', 'journal', '기록'].join(' '),
  })),
]

/**
 * 간단한 부분 일치 검색. 제목 일치를 가장 높게, 그다음 섹션·설명·키워드 순으로
 * 점수를 매겨 정렬한다. 공백으로 구분된 모든 토큰이 어딘가에 포함돼야 매칭된다.
 */
export function searchDocs(query: string, limit = 8): SearchDoc[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const tokens = q.split(/\s+/)

  const scored = searchIndex
    .map((doc) => {
      const title = doc.title.toLowerCase()
      const section = doc.section.toLowerCase()
      const haystack = `${title} ${section} ${doc.description.toLowerCase()} ${(
        doc.keywords ?? ''
      ).toLowerCase()}`

      // 모든 토큰이 포함돼야 후보가 된다.
      if (!tokens.every((t) => haystack.includes(t))) return null

      let score = 0
      for (const t of tokens) {
        if (title === t) score += 100
        else if (title.startsWith(t)) score += 60
        else if (title.includes(t)) score += 40
        else if (section.includes(t)) score += 12
        else if (doc.description.toLowerCase().includes(t)) score += 8
        else score += 4 // keywords only
      }
      return { doc, score }
    })
    .filter((x): x is { doc: SearchDoc; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((x) => x.doc)
}
