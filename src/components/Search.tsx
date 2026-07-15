import { useState } from 'react'
import { fuzzyScore } from '../lib/fuzzy'

export interface SearchItem {
  key: string
  label: string
  sub: string
  color: string
  /** Extra text to match against (figures, thinkers, ideas). */
  terms: string[]
  onPick: () => void
}

export function Search({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)

  const results = q.trim()
    ? items
        .map((it) => {
          const lbl = fuzzyScore(q, it.label)
          let best = lbl === null ? -Infinity : lbl + 3 // label matches rank highest
          let matched: string | null = null
          let bestTerm = -Infinity
          for (const term of it.terms) {
            const s = fuzzyScore(q, term)
            if (s === null) continue
            best = Math.max(best, s)
            if (s > bestTerm && term.toLowerCase() !== it.label.toLowerCase()) {
              bestTerm = s
              matched = term
            }
          }
          // surface the matched term (a thinker/idea) when the label itself didn't win
          const showMatched = matched && (lbl === null || bestTerm >= lbl)
          return { it, score: best, matched: showMatched ? matched : null }
        })
        .filter((r) => r.score > -Infinity)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
    : []

  const pick = (i: number) => {
    const r = results[i]
    if (!r) return
    r.it.onPick()
    setQ('')
    setOpen(false)
  }

  return (
    <div className="search">
      <span className="search-ic" aria-hidden>
        ⌕
      </span>
      <input
        className="search-in"
        value={q}
        placeholder="Search movements, thinkers, events…"
        onChange={(e) => {
          setQ(e.target.value)
          setActive(0)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActive((a) => Math.min(a + 1, results.length - 1))
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActive((a) => Math.max(a - 1, 0))
          } else if (e.key === 'Enter') {
            e.preventDefault()
            pick(active)
          } else if (e.key === 'Escape') {
            setQ('')
            setOpen(false)
            ;(e.target as HTMLInputElement).blur()
          }
        }}
      />
      {open && results.length > 0 && (
        <div className="search-results">
          {results.map((r, i) => (
            <button
              key={r.it.key}
              className={'search-hit' + (i === active ? ' active' : '')}
              onMouseDown={(e) => {
                e.preventDefault()
                pick(i)
              }}
              onMouseEnter={() => setActive(i)}
            >
              <span className="search-sw" style={{ background: r.it.color }} />
              <span className="search-lbl">{r.it.label}</span>
              {r.matched && <span className="search-term">{r.matched}</span>}
              <span className="search-sub">{r.it.sub}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
