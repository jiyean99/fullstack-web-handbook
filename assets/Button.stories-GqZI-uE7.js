import{j as e}from"./jsx-runtime-DWSoIl9j.js";import{c as J,s as r}from"./styled-components.browser.esm-ftll5U6u.js";import"./iframe-IK-IEtYd.js";import"./preload-helper-cBcysOFA.js";const K={sm:r(["padding:0.375rem 0.75rem;font-size:0.875rem;border-radius:var(--radius-sm);"]),md:r(["padding:0.5rem 1rem;font-size:1rem;border-radius:var(--radius-md);"]),lg:r(["padding:0.75rem 1.5rem;font-size:1.125rem;border-radius:var(--radius-lg);"])},M={primary:r(["background-color:var(--color-primary);color:#ffffff;border:1px solid transparent;&:hover:not(:disabled){background-color:var(--color-primary-hover);}&:active:not(:disabled){opacity:0.9;}"]),secondary:r(["background-color:var(--color-bg);color:var(--color-text);border:1px solid var(--color-border);&:hover:not(:disabled){background-color:var(--color-gray-100);border-color:var(--color-gray-300);}&:active:not(:disabled){background-color:var(--color-gray-200);}"]),ghost:r(["background-color:transparent;color:var(--color-text);border:1px solid transparent;&:hover:not(:disabled){background-color:var(--color-gray-100);}&:active:not(:disabled){background-color:var(--color-gray-200);}"]),danger:r(["background-color:var(--color-error);color:#ffffff;border:1px solid transparent;&:hover:not(:disabled){opacity:0.85;}&:active:not(:disabled){opacity:0.75;}"])},Q=J.button.withConfig({componentId:"sc-7d91878-0"})(["display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;font-weight:500;line-height:1.25;cursor:pointer;transition:all 150ms ease;white-space:nowrap;user-select:none;"," "," "," &:focus-visible{outline:2px solid var(--color-primary);outline-offset:2px;}&:disabled{opacity:0.5;cursor:not-allowed;}"],({$size:a})=>K[a],({$variant:a})=>M[a],({$fullWidth:a})=>a&&r(["width:100%;"]));function o({variant:a="primary",size:N="md",isLoading:I=!1,fullWidth:O=!1,disabled:R,children:F,...H}){return e.jsxs(Q,{$variant:a,$size:N,$fullWidth:O,disabled:R||I,...H,children:[I?e.jsx("span",{"aria-hidden":!0,children:"⏳"}):null,F]})}o.__docgenInfo={description:"",methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'ghost' | 'danger'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'danger'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},fullWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};var u,v,g,y,_,h,f,b,S,x,z,B,L,D,j,w,k,G,P,V,A,T,W,q,$,C,E;const rr={title:"Common/Button",component:o,parameters:{layout:"centered",docs:{description:{component:"styled-components로 직접 구현한 기본 버튼 컴포넌트입니다. variant, size, loading, disabled 상태를 지원합니다."}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost","danger"],description:"버튼 스타일 변형"},size:{control:"select",options:["sm","md","lg"],description:"버튼 크기"},isLoading:{control:"boolean",description:"로딩 상태"},disabled:{control:"boolean",description:"비활성화 상태"},fullWidth:{control:"boolean",description:"전체 너비"},children:{control:"text",description:"버튼 텍스트"}}},n={args:{variant:"primary",size:"md",children:"Primary Button"}},s={args:{variant:"secondary",size:"md",children:"Secondary Button"}},i={args:{variant:"ghost",size:"md",children:"Ghost Button"}},t={args:{variant:"danger",size:"md",children:"Danger Button"}},d={args:{variant:"primary",size:"sm",children:"Small"}},l={args:{variant:"primary",size:"lg",children:"Large Button"}},c={args:{variant:"primary",size:"md",isLoading:!0,children:"Loading..."}},m={args:{variant:"primary",size:"md",disabled:!0,children:"Disabled"}},p={render:()=>e.jsxs("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap"},children:[e.jsx(o,{variant:"primary",children:"Primary"}),e.jsx(o,{variant:"secondary",children:"Secondary"}),e.jsx(o,{variant:"ghost",children:"Ghost"}),e.jsx(o,{variant:"danger",children:"Danger"})]})};n.parameters={...n.parameters,docs:{...(u=n.parameters)===null||u===void 0?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Primary Button'
  }
}`,...(g=n.parameters)===null||g===void 0||(v=g.docs)===null||v===void 0?void 0:v.source}}};s.parameters={...s.parameters,docs:{...(y=s.parameters)===null||y===void 0?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Secondary Button'
  }
}`,...(h=s.parameters)===null||h===void 0||(_=h.docs)===null||_===void 0?void 0:_.source}}};i.parameters={...i.parameters,docs:{...(f=i.parameters)===null||f===void 0?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md',
    children: 'Ghost Button'
  }
}`,...(S=i.parameters)===null||S===void 0||(b=S.docs)===null||b===void 0?void 0:b.source}}};t.parameters={...t.parameters,docs:{...(x=t.parameters)===null||x===void 0?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    size: 'md',
    children: 'Danger Button'
  }
}`,...(B=t.parameters)===null||B===void 0||(z=B.docs)===null||z===void 0?void 0:z.source}}};d.parameters={...d.parameters,docs:{...(L=d.parameters)===null||L===void 0?void 0:L.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Small'
  }
}`,...(j=d.parameters)===null||j===void 0||(D=j.docs)===null||D===void 0?void 0:D.source}}};l.parameters={...l.parameters,docs:{...(w=l.parameters)===null||w===void 0?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large Button'
  }
}`,...(G=l.parameters)===null||G===void 0||(k=G.docs)===null||k===void 0?void 0:k.source}}};c.parameters={...c.parameters,docs:{...(P=c.parameters)===null||P===void 0?void 0:P.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    isLoading: true,
    children: 'Loading...'
  }
}`,...(A=c.parameters)===null||A===void 0||(V=A.docs)===null||V===void 0?void 0:V.source}}};m.parameters={...m.parameters,docs:{...(T=m.parameters)===null||T===void 0?void 0:T.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
    children: 'Disabled'
  }
}`,...(q=m.parameters)===null||q===void 0||(W=q.docs)===null||W===void 0?void 0:W.source}}};p.parameters={...p.parameters,docs:{...($=p.parameters)===null||$===void 0?void 0:$.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
}`,...(E=p.parameters)===null||E===void 0||(C=E.docs)===null||C===void 0?void 0:C.source}}};const ar=["Primary","Secondary","Ghost","Danger","Small","Large","Loading","Disabled","AllVariants"];export{p as AllVariants,t as Danger,m as Disabled,i as Ghost,l as Large,c as Loading,n as Primary,s as Secondary,d as Small,ar as __namedExportsOrder,rr as default};
