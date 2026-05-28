'use client'

import React from 'react'
import {
  Zap,
  Boxes,
  Repeat,
  FileJson,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { SiFastapi } from 'react-icons/si'
import ContentDoc, {
  Section,
  SectionTitleBlock,
  Paragraph,
  SectionIntro,
  GridTwo,
  Stack,
  Card,
  CardTitle,
  CardText,
  SmallHeading,
  SmallText,
  Dot,
  BulletList,
  Bullet,
  TableWrapper,
  Table,
  Th,
  Td,
  CodeBlock,
  HeaderQuote,
} from '@/components/content/ContentDoc'

const toc = [
  { id: 'section1', label: '1. FastAPI를 쓰는 이유' },
  { id: 'section2', label: '2. 경로 동작과 타입 힌트' },
  { id: 'section3', label: '3. Pydantic 모델 검증' },
  { id: 'section4', label: '4. 의존성 주입 (Depends)' },
  { id: 'section5', label: '5. 동기 vs 비동기' },
  { id: 'section6', label: '6. 테스트 전략' },
]

export default function FastApiPage() {
  return (
    <ContentDoc
      badge="Python / FastAPI"
      badgeIcon={<SiFastapi size={12} />}
      title="Python & FastAPI"
      quote={
        <>
          FastAPI는 파이썬의 타입 힌트를 그대로 API 계약으로 끌어올린 프레임워크다. 같은 타입
          선언 하나로 검증·직렬화·문서화가 동시에 해결된다. Spring과 비교하며 비동기 API
          설계의 핵심을 정리한다.
        </>
      }
      toc={toc}
    >
      <Section id="section1">
        <SectionTitleBlock num="1" title="FastAPI를 쓰는 이유" />
        <Paragraph>
          FastAPI는 Starlette(ASGI)와 Pydantic 위에 세워진 현대적 파이썬 웹 프레임워크다. 타입
          힌트를 선언하면 그것이 곧 입력 검증, 응답 직렬화, 자동 문서(OpenAPI)로 이어진다.
        </Paragraph>

        <GridTwo>
          <Card>
            <CardTitle>
              <Zap size={20} color="var(--color-primary)" /> 타입 힌트 = 계약
            </CardTitle>
            <CardText>
              함수 시그니처에 타입을 적으면 FastAPI가 요청 파싱·검증을 자동 처리한다. 별도의
              검증 코드를 거의 작성하지 않는다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <FileJson size={20} color="var(--color-success)" /> 자동 문서화
            </CardTitle>
            <CardText>
              선언된 타입을 기반으로 <code>/docs</code>(Swagger UI)와 <code>/redoc</code>이
              자동 생성된다. 코드와 문서가 어긋날 일이 없다.
            </CardText>
          </Card>
        </GridTwo>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>관점</Th>
                <Th>Spring Boot</Th>
                <Th>FastAPI</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td $muted>언어 / 런타임</Td>
                <Td>Java / JVM</Td>
                <Td>Python / ASGI</Td>
              </tr>
              <tr>
                <Td $muted>검증</Td>
                <Td>Bean Validation (@Valid)</Td>
                <Td>Pydantic (타입 힌트)</Td>
              </tr>
              <tr>
                <Td $muted>DI</Td>
                <Td>컨테이너 기반 Bean 주입</Td>
                <Td>Depends 함수 주입</Td>
              </tr>
              <tr>
                <Td $muted>비동기</Td>
                <Td>WebFlux(별도) / 가상 스레드</Td>
                <Td>async/await 1급 지원</Td>
              </tr>
              <tr>
                <Td $muted>문서</Td>
                <Td>springdoc 등 추가 설정</Td>
                <Td>기본 내장 (OpenAPI)</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      </Section>

      <Section id="section2">
        <SectionTitleBlock num="2" title="경로 동작과 타입 힌트" />
        <SectionIntro>
          경로 동작 함수(path operation)는 데코레이터로 메서드·경로를 선언하고, 파라미터 타입을
          힌트로 적는다. 경로 변수·쿼리 파라미터·본문이 타입만으로 구분된다.
        </SectionIntro>

        <CodeBlock label="main.py">{`from fastapi import FastAPI

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: int, verbose: bool = False):
    # user_id → 경로 변수(int로 자동 변환·검증)
    # verbose → 쿼리 파라미터(기본값 있으면 선택)
    return {"id": user_id, "verbose": verbose}`}</CodeBlock>

        <BulletList>
          <Bullet>
            <strong>경로 변수</strong>: 경로에 <code>{`{user_id}`}</code>로 선언하고 함수
            인자 타입으로 받는다. <code>int</code>면 정수가 아닌 값에 자동 422 응답.
          </Bullet>
          <Bullet>
            <strong>쿼리 파라미터</strong>: 경로에 없는 인자는 쿼리로 해석된다. 기본값이 있으면
            선택, 없으면 필수다.
          </Bullet>
          <Bullet>
            <strong>요청 본문</strong>: Pydantic 모델 타입으로 받으면 JSON 본문으로 해석된다
            (다음 섹션).
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section3">
        <SectionTitleBlock num="3" title="Pydantic 모델 검증" />
        <Paragraph>
          요청·응답 본문은 Pydantic 모델로 정의한다. 모델은 검증 규칙이자 직렬화 스키마이며,
          그대로 OpenAPI 문서에 반영된다. Spring의 DTO + Bean Validation을 하나로 합친 셈이다.
        </Paragraph>

        <CodeBlock label="schemas.py">{`from pydantic import BaseModel, EmailStr, Field

class CreateUser(BaseModel):
    name: str = Field(min_length=1, max_length=50)
    email: EmailStr
    age: int = Field(ge=0, le=150)

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

@app.post("/users", response_model=UserResponse, status_code=201)
def create_user(body: CreateUser):
    # body는 이미 검증 완료 상태 — 깨진 입력은 여기 도달 전 422
    return service.create(body)`}</CodeBlock>

        <GridTwo>
          <Card>
            <SmallHeading>
              <Dot />
              response_model의 역할
            </SmallHeading>
            <SmallText>
              응답을 <code>UserResponse</code>로 필터링하면, 내부 모델에 비밀번호 같은 필드가
              있어도 응답에서 자동 제외된다. 과다 노출을 막는다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              Field 제약
            </SmallHeading>
            <SmallText>
              <code>min_length</code>, <code>ge</code>(이상), <code>le</code>(이하) 등으로
              필드 단위 규칙을 선언한다. 위반 시 어떤 필드가 왜 틀렸는지 상세 응답이 나간다.
            </SmallText>
          </Card>
        </GridTwo>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-primary-light) 12%, var(--color-bg))',
          }}
        >
          <CardTitle>
            <CheckCircle size={18} color="var(--color-primary)" /> 단일 원천
          </CardTitle>
          <CardText>
            하나의 Pydantic 모델이 &lsquo;검증 + 직렬화 + 문서&rsquo; 세 가지를 동시에 책임진다.
            세 곳이 따로 노는 불일치 문제가 구조적으로 사라진다.
          </CardText>
        </Card>
      </Section>

      <Section id="section4">
        <SectionTitleBlock num="4" title="의존성 주입 (Depends)" />
        <SectionIntro>
          FastAPI의 DI는 <code>Depends</code> 함수 하나로 동작한다. DB 세션·인증 사용자·공통
          파라미터 등을 함수로 정의하고 주입받는다. 호출 그래프가 곧 의존성 그래프다.
        </SectionIntro>

        <CodeBlock label="deps.py">{`from fastapi import Depends, HTTPException

def get_db():
    db = SessionLocal()
    try:
        yield db          # 요청 동안 세션 제공
    finally:
        db.close()        # 응답 후 정리(teardown)

def get_current_user(token: str = Depends(oauth2_scheme),
                     db = Depends(get_db)):
    user = decode(token, db)
    if user is None:
        raise HTTPException(status_code=401, detail="인증 실패")
    return user

@app.get("/me")
def read_me(user = Depends(get_current_user)):
    return user`}</CodeBlock>

        <BulletList>
          <Bullet>
            <strong>yield 의존성</strong>: <code>yield</code> 앞은 준비, 뒤는 정리. DB 세션처럼
            열고 닫아야 하는 자원에 적합하다.
          </Bullet>
          <Bullet>
            <strong>중첩 주입</strong>: 의존성이 또 다른 의존성을 받을 수 있다. FastAPI가 그래프
            순서대로 해결한다.
          </Bullet>
          <Bullet>
            <strong>테스트 용이성</strong>: <code>app.dependency_overrides</code>로 의존성을
            가짜 구현으로 교체해 테스트한다(6번 참고).
          </Bullet>
        </BulletList>
      </Section>

      <Section id="section5">
        <SectionTitleBlock num="5" title="동기 vs 비동기" />
        <Paragraph>
          FastAPI는 <code>def</code>와 <code>async def</code>를 모두 지원한다. 선택 기준은
          &lsquo;그 안에서 무엇을 기다리느냐&rsquo;다. 잘못 고르면 오히려 성능이 나빠진다.
        </Paragraph>

        <Stack>
          <Card>
            <CardTitle>
              <Repeat size={20} color="var(--color-primary)" /> async def — I/O 대기 위주
            </CardTitle>
            <CardText>
              비동기 DB 드라이버·HTTP 호출 등 <code>await</code> 가능한 I/O를 기다린다면{' '}
              <code>async def</code>로 작성한다. 대기 동안 이벤트 루프가 다른 요청을 처리한다.
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              <Boxes size={20} color="var(--color-success)" /> def — 블로킹/CPU 작업
            </CardTitle>
            <CardText>
              동기 라이브러리나 CPU 연산은 일반 <code>def</code>로 둔다. FastAPI가 이를 별도
              스레드풀에서 실행해 이벤트 루프를 막지 않는다.
            </CardText>
          </Card>
        </Stack>

        <Card
          style={{
            background: 'color-mix(in srgb, var(--color-warning) 8%, var(--color-bg))',
            borderColor: 'var(--color-warning)',
          }}
        >
          <CardTitle>
            <AlertTriangle size={18} color="var(--color-warning)" /> 가장 흔한 실수
          </CardTitle>
          <CardText>
            <code>async def</code> 안에서 <strong>블로킹 호출</strong>(동기 DB 드라이버,{' '}
            <code>time.sleep</code>)을 하면 이벤트 루프 전체가 멈춰 모든 요청이 느려진다.
            비동기 함수 안에서는 반드시 <code>await</code> 가능한 비동기 클라이언트를 쓴다.
          </CardText>
        </Card>
      </Section>

      <Section id="section6">
        <SectionTitleBlock num="6" title="테스트 전략" />
        <Paragraph>
          FastAPI는 <code>TestClient</code>로 실제 서버 없이 앱을 인메모리로 호출한다. 여기에
          의존성 오버라이드를 더하면 DB·인증을 가짜로 갈아끼워 빠르게 검증할 수 있다.
        </Paragraph>

        <CodeBlock label="test_users.py">{`from fastapi.testclient import TestClient
from main import app, get_db

def override_get_db():
    yield FakeSession()   # 테스트용 가짜 세션

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

def test_create_user():
    res = client.post("/users", json={
        "name": "지연", "email": "a@b.com", "age": 30
    })
    assert res.status_code == 201
    assert res.json()["email"] == "a@b.com"

def test_validation_error():
    res = client.post("/users", json={"name": ""})
    assert res.status_code == 422   # Pydantic 검증 실패`}</CodeBlock>

        <GridTwo>
          <Card>
            <SmallHeading>
              <Dot />
              dependency_overrides
            </SmallHeading>
            <SmallText>
              실제 DB·외부 API 의존성을 테스트용 구현으로 교체한다. Spring의 <code>@MockBean</code>과
              같은 발상이다.
            </SmallText>
          </Card>
          <Card>
            <SmallHeading>
              <Dot />
              422 검증 테스트
            </SmallHeading>
            <SmallText>
              잘못된 입력이 Pydantic 단계에서 막히는지(422) 확인하는 테스트는, 검증 규칙을
              지키는 안전망이 된다.
            </SmallText>
          </Card>
        </GridTwo>
      </Section>

      <HeaderQuote>
        FastAPI의 힘은 &lsquo;타입 힌트 하나가 검증·직렬화·문서를 동시에 책임진다&rsquo;는 데
        있다.
        <br />
        <strong>타입으로 계약을 선언하고, 의존성을 함수로 주입하고, I/O에 맞게 async를 골라라.</strong>
      </HeaderQuote>
    </ContentDoc>
  )
}
