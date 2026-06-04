// 실무에서 쌓아가는 기록(Journal) 글 목록.
// 새 글을 추가하면 이 배열에만 등록하면 랜딩 타임라인에 자동 반영된다.

export interface JournalEntry {
  slug: string
  title: string
  date: string // YYYY.MM.DD
  category: 'Backend' | 'Frontend' | 'DevOps' | 'Architecture'
  tags: string[]
  summary: string
}

export const journalEntries: JournalEntry[] = [
  {
    slug: 'cors-preflight',
    title: '로컬에선 됐는데 배포하니 CORS — preflight 디버깅기',
    date: '2026.06.04',
    category: 'Frontend',
    tags: ['CORS', 'HTTP', 'preflight'],
    summary:
      '프론트에서 API를 호출하자 브라우저가 막아버린 CORS 에러. preflight(OPTIONS)의 동작을 이해하고 서버에서 올바르게 허용한 과정을 정리한다.',
  },
  {
    slug: 'n-plus-one',
    title: '목록 API가 갑자기 느려졌다 — N+1 쿼리 추적기',
    date: '2026.06.03',
    category: 'Backend',
    tags: ['JPA', 'Hibernate', '성능'],
    summary:
      '주문 목록 응답이 수백 ms로 느려진 원인을 쿼리 로그로 추적하고, fetch join으로 N+1을 잡은 과정을 정리한다.',
  },
]
