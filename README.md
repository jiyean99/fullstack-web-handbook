# Full-Stack Web Handbook
> **프론트엔드부터 백엔드, DevOps까지 — 실무 수준의 웹 애플리케이션 구축을 위한 종합 가이드북**

<div align="left">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
</div>

---

## Overview
이 프로젝트는 단순한 문서 정리를 넘어, 현대적인 웹 애플리케이션을 구축하는 데 필요한 모든 핵심 지식을 인터랙티브하게 전달하는 **디지털 핸드북**입니다. 실전 코드 예시, 아키텍처 다이어그램, 그리고 개념 설명을 통해 주니어 개발자가 시니어급의 시야를 가질 수 있도록 돕습니다.

## Tech Stack

### Frontend & Core
- **Next.js 15 (App Router)**: 최신 SSR/SSG 아키텍처 활용
- **React 19 & TypeScript**: 안정적인 타입 시스템 기반의 컴포넌트 설계
- **Styled-components**: 테마 시스템과 동적 스타일링 관리
- **Zustand**: 가볍고 직관적인 상태 관리

### UI & UX
- **Lucide React**: 일관성 있는 벡터 아이콘 시스템
- **Framer Motion**: 부드러운 인터랙션과 애니메이션 (계획됨)
- **MDX**: 문서 작성과 리액트 컴포넌트의 유연한 결합

### DevOps & Tools
- **Vitest**: 고성능 테스트 환경 구축
- **Storybook**: 독립적인 UI 컴포넌트 개발 및 문서화
- **GitHub Actions**: 자동화된 CI/CD 파이프라인

---

## Project Structure
```bash
src/
├── app/          # Next.js App Router (페이지 및 레이아웃)
│   ├── frontend/   # 프론트엔드 핵심 지식 (React, Next.js 등)
│   ├── backend/    # 백엔드 아키텍처 (Node.js, DB 등)
│   └── devops/     # 인프라 및 자동화 (Docker, CI/CD, Network)
├── components/   # 공용 및 도메인 컴포넌트
├── providers/    # 전역 컨텍스트 및 설정
├── stores/       # 상태 관리 로직
└── styles/       # 글로벌 스타일 및 테마 정의
```

---

## Key Sections

### 🎨 Frontend
- 컴포넌트 설계 패턴과 상태 관리 전략
- 성능 최적화와 렌더링 메커니즘 심층 분석

### ⚙️ Backend
- RESTful API 설계와 효율적인 데이터 모델링
- 확장 가능한 마이크로서비스 아키텍처(MSA) 이해

### 🐳 DevOps & Infra
- **Docker/Kubernetes**: 컨테이너 기반의 현대적 배포 전략
- **Network**: IP 체계와 포트포워딩, 터널링의 원리
- **CI/CD**: GitHub Actions를 활용한 무중단 배포 자동화

---

## Getting Started

### Prerequisites
- Node.js >= 18
- pnpm >= 9

### Installation
```bash
# 의존성 설치
pnpm install

# 로컬 개발 서버 실행
pnpm dev

# 빌드 및 프로덕션 실행
pnpm build
pnpm start
```

---

## License
This project is [MIT](LICENSE) licensed.

