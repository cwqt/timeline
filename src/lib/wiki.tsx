import { wikiTitle } from './wikiTitles'

/** Wikipedia "go" search: lands directly on an exact-title article, else the search page. */
export const wikiURL = (q: string) =>
  `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(q)}&go=Go`

/** Resolve a movement/school label to its Wikipedia article title, applying overrides. */
export const wikiTitleOf = (label: string) => wikiTitle[label] ?? label

/** Resolve a movement/school label to its best Wikipedia URL, applying title overrides. */
export const wikiFor = (label: string) => wikiURL(wikiTitleOf(label))

interface Parsed {
  prefix?: string
  names: string[]
  suffix?: string
}

/** Split a "key figures" cell into linkable names, keeping (lit.) / (Blaue Reiter) as plain context. */
export function parseFigure(str: string): Parsed {
  let s = str.trim()
  let prefix: string | undefined
  let suffix: string | undefined
  const lead = s.match(/^\(([^)]*)\)\s*/)
  if (lead) {
    prefix = lead[1]
    s = s.slice(lead[0].length)
  }
  const trail = s.match(/\s*\(([^)]*)\)\s*$/)
  if (trail) {
    suffix = trail[1]
    s = s.slice(0, s.length - trail[0].length)
  }
  const names = s
    .split(/&|,/)
    .map((n) => n.trim())
    .filter(Boolean)
  return { prefix, names, suffix }
}

/** A single figure/thinker chip with each name linked to Wikipedia. */
export function FigureTag({ text }: { text: string }) {
  const { prefix, names, suffix } = parseFigure(text)
  return (
    <span className="tag">
      {prefix && <span className="q">{prefix} </span>}
      {names.map((n, i) => (
        <span key={n}>
          {i > 0 && <span className="sep"> · </span>}
          <a href={wikiURL(n)} target="_blank" rel="noopener noreferrer">
            {n}
          </a>
        </span>
      ))}
      {suffix && <span className="q"> ({suffix})</span>}
    </span>
  )
}

/** A movement chip linked to its Wikipedia article (used by "resonates with"). */
export function TieTag({ name }: { name: string }) {
  return (
    <span className="tag">
      <a href={wikiFor(name)} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </span>
  )
}
