export type EraKey =
  | 'renaissance'
  | 'baroque'
  | 'reason'
  | 'romantic'
  | 'realist'
  | 'interior'
  | 'rupture'
  | 'postwar'
  | 'contemp'
export type TradKey = 'humanism' | 'earlymodern' | 'idealism' | 'social' | 'mind' | 'existential' | 'structural'
export type GroupKey = EraKey | TradKey
export type NodeKind = 'art' | 'phil'

/** An era (art stave) or tradition (idea stave): its display name + accent colour. */
export interface Group {
  name: string
  color: string
}

/** An artistic movement — one bar on the upper stave. */
export interface Movement {
  era: EraKey
  name: string
  s: number
  e: number
  one: string
  inh: string
  rea: string
  ideas: string[]
  figs: string[]
}

/** A philosophical / intellectual current — one bar on the lower stave. */
export interface Current {
  trad: TradKey
  school: string
  s: number
  e: number
  one: string
  ideas: string[]
  thinkers: string[]
  ties: string[]
}

export type EdgeType = 'line' | 'leap' | 'phil' | 'resonate'
export interface Edge {
  a: string
  b: string
  t: EdgeType
}

/** One segment of a context ribbon (locus of meaning, or cultural hegemony). */
export interface LocusSeg {
  label: string
  s: number
  e: number
  color: string
  gloss: string
  detail: string
}

export type EventType = 'war' | 'revolution' | 'science' | 'tech' | 'society'

/** A historical inflection point — a coloured marker on the timeline. */
export interface HistEvent {
  year: number
  /** Optional end year — renders a faint band from year→end (for eras/wars). */
  end?: number
  label: string
  type: EventType
  one: string
  detail: string
  impact: string
}

/** What the detail drawer renders — a movement, current, event, or ribbon segment. */
export interface Selection {
  kind: NodeKind | 'event' | 'ribbon'
  groupName?: string
  color: string
  item: Movement | Current | HistEvent | LocusSeg
}
