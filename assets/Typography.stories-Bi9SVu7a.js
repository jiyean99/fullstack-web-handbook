import{j as e}from"./jsx-runtime-DWSoIl9j.js";import{c as r,s as t}from"./styled-components.browser.esm-ftll5U6u.js";import"./iframe-IK-IEtYd.js";import"./preload-helper-cBcysOFA.js";const d=t(["font-weight:700;line-height:1.25;letter-spacing:-0.02em;color:var(--color-text);"]),T=r.h1.withConfig({componentId:"sc-fd9ac737-0"})([""," font-size:2.25rem;margin-bottom:1rem;"],d),_=r.h2.withConfig({componentId:"sc-fd9ac737-1"})([""," font-size:1.875rem;margin-bottom:0.75rem;"],d),j=r.h3.withConfig({componentId:"sc-fd9ac737-2"})([""," font-size:1.5rem;margin-bottom:0.5rem;"],d),C=r.h4.withConfig({componentId:"sc-fd9ac737-3"})([""," font-size:1.25rem;font-weight:600;margin-bottom:0.5rem;"],d),b={h1:T,h2:_,h3:j,h4:C};function w({as:a="h2",children:l,className:c}){const m=b[a];return e.jsx(m,{className:c,children:l})}const z={body:t(["font-size:1rem;line-height:1.625;color:var(--color-text);"]),lead:t(["font-size:1.125rem;line-height:1.625;color:var(--color-text);font-weight:400;"]),small:t(["font-size:0.875rem;line-height:1.5;color:var(--color-text-muted);"]),muted:t(["font-size:0.875rem;line-height:1.5;color:var(--color-text-muted);"]),code:t(["font-family:'JetBrains Mono','Fira Code',monospace;font-size:0.875rem;background-color:var(--color-gray-100);color:var(--color-primary);padding:0.125rem 0.375rem;border-radius:var(--radius-sm);"])},R=r.p.withConfig({componentId:"sc-fd9ac737-4"})(["",""],({$variant:a})=>z[a]);function n({variant:a="body",as:l="p",children:c,...m}){return e.jsx(R,{as:l,$variant:a,...m,children:c})}w.__docgenInfo={description:"",methods:[],displayName:"Heading",props:{as:{required:!1,tsType:{name:"union",raw:"'h1' | 'h2' | 'h3' | 'h4'",elements:[{name:"literal",value:"'h1'"},{name:"literal",value:"'h2'"},{name:"literal",value:"'h3'"},{name:"literal",value:"'h4'"}]},description:"",defaultValue:{value:"'h2'",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};n.__docgenInfo={description:"",methods:[],displayName:"Text",props:{variant:{required:!1,tsType:{name:"union",raw:"'body' | 'lead' | 'small' | 'muted' | 'code'",elements:[{name:"literal",value:"'body'"},{name:"literal",value:"'lead'"},{name:"literal",value:"'small'"},{name:"literal",value:"'muted'"},{name:"literal",value:"'code'"}]},description:"",defaultValue:{value:"'body'",computed:!1}},as:{required:!1,tsType:{name:"union",raw:"'p' | 'span' | 'div'",elements:[{name:"literal",value:"'p'"},{name:"literal",value:"'span'"},{name:"literal",value:"'div'"}]},description:"",defaultValue:{value:"'p'",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};var p,u,h,v,g,x,f,H,y;const q={title:"Common/Typography",parameters:{layout:"padded",docs:{description:{component:"styled-components로 구현한 타이포그래피 시스템입니다. 제목(H1~H4)과 본문(Text) 컴포넌트를 제공합니다."}}},tags:["autodocs"]},o={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:[e.jsx(T,{children:"H1 — 페이지 최상위 제목"}),e.jsx(_,{children:"H2 — 섹션 제목"}),e.jsx(j,{children:"H3 — 서브섹션 제목"}),e.jsx(C,{children:"H4 — 세부 제목"})]})},i={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:[e.jsx(n,{as:"p",children:"Body — 기본 본문 텍스트입니다. 가독성을 위해 1.625 line-height를 사용합니다."}),e.jsx(n,{variant:"lead",as:"p",children:"Lead — 강조된 리드 텍스트. 섹션 도입부에 사용됩니다."}),e.jsx(n,{variant:"small",as:"p",children:"Small — 보조 설명, 메타 정보에 사용되는 작은 텍스트입니다."}),e.jsx(n,{variant:"muted",as:"p",children:"Muted — 회색으로 표시되는 보조 텍스트입니다."}),e.jsx(n,{variant:"code",as:"span",children:"code — 인라인 코드 스타일"})]})},s={render:a=>e.jsx(w,{...a,children:"Heading via polymorphic 'as' prop"}),args:{as:"h2"},argTypes:{as:{control:"select",options:["h1","h2","h3","h4"]}}};o.parameters={...o.parameters,docs:{...(p=o.parameters)===null||p===void 0?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  }}>
      <H1>H1 — 페이지 최상위 제목</H1>
      <H2>H2 — 섹션 제목</H2>
      <H3>H3 — 서브섹션 제목</H3>
      <H4>H4 — 세부 제목</H4>
    </div>
}`,...(h=o.parameters)===null||h===void 0||(u=h.docs)===null||u===void 0?void 0:u.source}}};i.parameters={...i.parameters,docs:{...(v=i.parameters)===null||v===void 0?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  }}>
      <Text as="p">Body — 기본 본문 텍스트입니다. 가독성을 위해 1.625 line-height를 사용합니다.</Text>
      <Text variant="lead" as="p">Lead — 강조된 리드 텍스트. 섹션 도입부에 사용됩니다.</Text>
      <Text variant="small" as="p">Small — 보조 설명, 메타 정보에 사용되는 작은 텍스트입니다.</Text>
      <Text variant="muted" as="p">Muted — 회색으로 표시되는 보조 텍스트입니다.</Text>
      <Text variant="code" as="span">code — 인라인 코드 스타일</Text>
    </div>
}`,...(x=i.parameters)===null||x===void 0||(g=x.docs)===null||g===void 0?void 0:g.source}}};s.parameters={...s.parameters,docs:{...(f=s.parameters)===null||f===void 0?void 0:f.docs,source:{originalSource:`{
  render: args => <Heading {...args}>{'Heading via polymorphic \\'as\\' prop'}</Heading>,
  args: {
    as: 'h2'
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4']
    }
  }
}`,...(y=s.parameters)===null||y===void 0||(H=y.docs)===null||H===void 0?void 0:H.source}}};const B=["Headings","TextVariants","HeadingComponent"];export{s as HeadingComponent,o as Headings,i as TextVariants,B as __namedExportsOrder,q as default};
