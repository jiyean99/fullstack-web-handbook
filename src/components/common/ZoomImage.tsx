'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
  cursor: zoom-in;
  display: block;
  width: 100%;
`

const StyledImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 1rem;
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
`

const Dialog = styled.div`
  max-width: min(960px, 90vw);
  max-height: 90vh;
  border-radius: 1.25rem;
  overflow: hidden;
  background: var(--color-bg);
  box-shadow: var(--shadow-lg);
`

const DialogImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
`

type ZoomImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export default function ZoomImage({ src, alt, ...rest }: ZoomImageProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  if (!src) return null

  return (
    <>
      <Wrapper type="button" onClick={() => setOpen(true)} aria-label="이미지 확대 보기">
        <StyledImg src={src} alt={alt} {...rest} />
      </Wrapper>
      {open && (
        <Overlay onClick={() => setOpen(false)}>
          <Dialog onClick={(e) => e.stopPropagation()}>
            <DialogImg src={src} alt={alt} />
          </Dialog>
        </Overlay>
      )}
    </>
  )
}

