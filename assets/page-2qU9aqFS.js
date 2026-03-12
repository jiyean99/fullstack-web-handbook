import{j as n}from"./jsx-runtime-DWSoIl9j.js";import{useMDXComponents as d}from"./index-6pYJhDLj.js";import"./iframe-IK-IEtYd.js";import"./preload-helper-cBcysOFA.js";function s(i){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...d(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"작성-규칙-writing-guidelines",children:"작성 규칙 (Writing Guidelines)"}),`
`,n.jsx(e.h2,{id:"파일-네이밍",children:"파일 네이밍"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["상위 주제: ",n.jsx(e.code,{children:"page.mdx"})," (디렉토리 이름이 곧 주제)"]}),`
`,n.jsxs(e.li,{children:["세부 주제: ",n.jsx(e.code,{children:"rest-api-design.mdx"})," 처럼 ",n.jsx(e.strong,{children:"명사/개념"})," 중심 kebab-case"]}),`
`]}),`
`,n.jsx(e.h2,{id:"문서-템플릿",children:"문서 템플릿"}),`
`,n.jsx(e.p,{children:"모든 MDX 파일은 아래 구조를 따릅니다:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-mdx",children:`# 제목

## 1. 왜 필요한가
## 2. 핵심 개념 요약
## 3. 코드 예시
## 4. 실무 팁
## 5. 참고 링크
`})}),`
`,n.jsx(e.h2,{id:"컴포넌트-원칙",children:"컴포넌트 원칙"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"UI 라이브러리 사용 금지 — 모든 컴포넌트 직접 구현"}),`
`,n.jsx(e.li,{children:"styled-components는 Client Component에서만 사용"}),`
`,n.jsx(e.li,{children:"각 컴포넌트에 Storybook 스토리 작성"}),`
`]}),`
`,n.jsx(e.h2,{id:"커밋-컨벤션",children:"커밋 컨벤션"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"feat"}),": 새 페이지/컴포넌트 추가"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"docs"}),": 문서 내용 작성/수정"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"style"}),": 스타일 변경"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"refactor"}),": 코드 구조 개선"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"fix"}),": 버그 수정"]}),`
`]})]})}function h(i={}){const{wrapper:e}={...d(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(s,{...i})}):s(i)}export{h as default};
