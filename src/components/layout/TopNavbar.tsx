'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CornerDownLeft, Github, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { searchDocs } from '@/lib/search-index'

type ThemeMode = 'light' | 'dark'

const navLinks = [
  { href: '/', label: 'Overview' },
  { href: '/frontend', label: 'Frontend' },
  { href: '/backend', label: 'Backend' },
  { href: '/devops', label: 'DevOps' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/journal', label: 'Journal' },
]

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
  const [mobileOpen, setMobileOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const mobileInputRef = useRef<HTMLInputElement>(null)
  const headerRef = useRef<HTMLElement>(null)

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

  // ─── Ctrl/Cmd+K to focus search ────────────
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

  // ─── Click outside closes results & menu ───
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // 결과가 바뀌면 활성 인덱스를 처음으로 되돌린다.
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // 모바일 메뉴를 열면 검색 입력으로 포커스를 옮긴다.
  useEffect(() => {
    if (mobileOpen) mobileInputRef.current?.focus()
  }, [mobileOpen])

  const goTo = (href: string) => {
    setOpen(false)
    setMobileOpen(false)
    setQuery('')
    router.push(href)
    inputRef.current?.blur()
  }

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false)
      setMobileOpen(false)
      e.currentTarget.blur()
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

  const renderResults = (variant: 'desktop' | 'mobile') => (
    <div
      className={
        variant === 'mobile'
          ? 'fsw-search-results fsw-search-results--inline'
          : 'fsw-search-results'
      }
      id={`fsw-search-results-${variant}`}
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
              <span className="fsw-search-item-desc">{doc.description}</span>
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
  )

  const brand = (
    <Link href="/" className="fsw-navbar-logo" onClick={() => setMobileOpen(false)}>
      <span className="fsw-navbar-logo-mark">W</span>
      <span className="fsw-navbar-logo-text">
        Fullstack <span className="fsw-navbar-logo-highlight">Web</span> Handbook
      </span>
    </Link>
  )

  return (
    <header className="fsw-navbar" ref={headerRef}>
      <div className="fsw-navbar-inner">
        <div className="fsw-navbar-left">
          <button
            type="button"
            className="fsw-navbar-hamburger"
            aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileOpen}
            aria-controls="fsw-mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="fsw-navbar-icon" aria-hidden="true" />
            ) : (
              <Menu className="fsw-navbar-icon" aria-hidden="true" />
            )}
          </button>

          {brand}

          <nav className="fsw-navbar-links" aria-label="Primary">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="fsw-navbar-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="fsw-navbar-right">
          <div className="fsw-navbar-search">
            <Search className="fsw-navbar-search-icon" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              placeholder="문서 검색 (Ctrl + K)"
              className="fsw-navbar-search-input"
              role="combobox"
              aria-expanded={showResults}
              aria-controls="fsw-search-results-desktop"
              aria-autocomplete="list"
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={onInputKeyDown}
            />
            {showResults && renderResults('desktop')}
          </div>

          <button
            type="button"
            className="fsw-navbar-icon-btn"
            aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
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

      {mobileOpen && (
        <div className="fsw-mobile-menu" id="fsw-mobile-menu">
          <div className="fsw-mobile-brand">{brand}</div>

          <div className="fsw-mobile-search">
            <Search className="fsw-navbar-search-icon" aria-hidden="true" />
            <input
              ref={mobileInputRef}
              type="text"
              value={query}
              placeholder="문서 검색"
              className="fsw-navbar-search-input"
              role="combobox"
              aria-expanded={showResults}
              aria-controls="fsw-search-results-mobile"
              aria-autocomplete="list"
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={onInputKeyDown}
            />
            {showResults && renderResults('mobile')}
          </div>

          <nav className="fsw-mobile-links" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="fsw-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
