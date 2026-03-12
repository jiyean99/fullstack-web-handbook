'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Github, Moon, Search, Sun } from 'lucide-react'

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
          </nav>
        </div>

        <div className="fsw-navbar-right">
          <div className="fsw-navbar-search">
            <Search className="fsw-navbar-search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="문서 검색 (Ctrl + K)"
              className="fsw-navbar-search-input"
            />
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

