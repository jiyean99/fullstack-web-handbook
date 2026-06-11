'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CornerDownLeft, Github, Moon, Search, Sun } from 'lucide-react'
import { searchDocs } from '@/lib/search-index'

type ThemeMode = 'light' | 'dark'

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export default function TopNavbar() {
  const [theme, setTheme] = useState<ThemeMode>('light')
  const router = useRouter()

  // ─── Search state ──────────────────────────
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => searchDocs(query), [query])

  useEffect(() => {
    setTheme(getInitialTheme())
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // ─── Ctrl/Cmd+K to focus, Esc to blur ──────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // ─── Click outside closes results ──────────
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!searchRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // 결과가 바뀌면 활성 인덱스를 처음으로 되돌린다.
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const goTo = (href: string) => {
    setOpen(false)
    setQuery('')
    router.push(href)
    inputRef.current?.blur()
  }

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
      return
    }
    if (!open || results.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const target = results[activeIndex]
      if (target) goTo(target.href)
    }
  }

  const showResults = open && query.trim().length > 0

  return (
    <header className="fsw-navbar">
      <div className="fsw-navbar-inner">
        <div className="fsw-navbar-left">
          <Link href="/" className="fsw-navbar-logo">
            <span className="fsw-navbar-logo-mark">W</span>
            <span className="fsw-navbar-logo-text">
              Fullstack <span className="fsw-navbar-logo-highlight">Web</span>{' '}
              Handbook
            </span>
          </Link>

          <nav className="fsw-navbar-links" aria-label="Primary">
            <Link href="/" className="fsw-navbar-link">
              Overview
            </Link>
            <Link href="/frontend" className="fsw-navbar-link">
              Frontend
            </Link>
            <Link href="/backend" className="fsw-navbar-link">
              Backend
            </Link>
            <Link href="/devops" className="fsw-navbar-link">
              DevOps
            </Link>
            <Link href="/architecture" className="fsw-navbar-link">
              Architecture
            </Link>
            <Link href="/journal" className="fsw-navbar-link">
              Journal
            </Link>
          </nav>
        </div>

        <div className="fsw-navbar-right">
          <div className="fsw-navbar-search" ref={searchRef}>
            <Search className="fsw-navbar-search-icon" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              placeholder="문서 검색 (Ctrl + K)"
              className="fsw-navbar-search-input"
              role="combobox"
              aria-expanded={showResults}
              aria-controls="fsw-search-results"
              aria-autocomplete="list"
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={onInputKeyDown}
            />

            {showResults && (
              <div
                className="fsw-search-results"
                id="fsw-search-results"
                role="listbox"
              >
                {results.length === 0 ? (
                  <div className="fsw-search-empty">
                    &lsquo;{query}&rsquo;에 대한 결과가 없습니다.
                  </div>
                ) : (
                  results.map((doc, i) => (
                    <button
                      key={doc.href}
                      type="button"
                      role="option"
                      aria-selected={i === activeIndex}
                      className={
                        i === activeIndex
                          ? 'fsw-search-item fsw-search-item-active'
                          : 'fsw-search-item'
                      }
                      onMouseEnter={() => setActiveIndex(i)}
                      onMouseDown={(e) => {
                        // blur 전에 이동하도록 mousedown에서 처리
                        e.preventDefault()
                        goTo(doc.href)
                      }}
                    >
                      <span className="fsw-search-item-main">
                        <span className="fsw-search-item-title">{doc.title}</span>
                        <span className="fsw-search-item-desc">
                          {doc.description}
                        </span>
                      </span>
                      <span className="fsw-search-item-section">{doc.section}</span>
                    </button>
                  ))
                )}
                <div className="fsw-search-footer">
                  <span>
                    <kbd>↑</kbd>
                    <kbd>↓</kbd> 이동
                  </span>
                  <span>
                    <kbd>
                      <CornerDownLeft size={11} />
                    </kbd>{' '}
                    열기
                  </span>
                  <span>
                    <kbd>Esc</kbd> 닫기
                  </span>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className="fsw-navbar-icon-btn"
            aria-label={
              theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'
            }
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <Sun className="fsw-navbar-icon" aria-hidden="true" />
            ) : (
              <Moon className="fsw-navbar-icon" aria-hidden="true" />
            )}
          </button>

          <a
            href="https://github.com/jiyean99"
            target="_blank"
            rel="noreferrer"
            className="fsw-navbar-icon-btn"
            aria-label="GitHub profile"
          >
            <Github className="fsw-navbar-icon" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  )
}
