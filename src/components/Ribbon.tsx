import type { LocusSeg, Selection } from '../types'
import { CANVAS_W, wOf, xOf } from '../lib/layout'
import { Gridlines } from './Gridlines'

interface Props {
  segments: LocusSeg[]
  title: string
  selectedId: string | null
  onSelect: (s: Selection) => void
  /** Compact = a shorter band showing only the segment title (no gloss). */
  compact?: boolean
}

/** A labelled context band under the axis — a sequence of segments that hand off across time. */
export function Ribbon({ segments, title, selectedId, onSelect, compact }: Props) {
  return (
    <div className={'locus-band' + (compact ? ' compact' : '')} style={{ width: CANVAS_W }}>
      <Gridlines />
      {segments.map((L, i) => (
        <div
          key={L.label}
          className={'locus-seg' + (selectedId === L.label ? ' sel' : '')}
          style={{
            left: xOf(L.s),
            width: wOf(L.s, L.e),
            background: `linear-gradient(90deg, ${L.color}26, ${L.color}0a)`,
          }}
          onClick={() => onSelect({ kind: 'ribbon', groupName: title, color: L.color, item: L })}
        >
          <span className="ll" style={{ color: L.color }}>
            {L.label}
          </span>
          {!compact && <span className="lg">{L.gloss}</span>}
          {i < segments.length - 1 && <span className="arr">→</span>}
        </div>
      ))}
    </div>
  )
}
