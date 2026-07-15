import { inequality, ineqYOf } from '../data/inequality'
import { CANVAS_W, xOf } from '../lib/layout'

const REFS = [60, 70, 80, 90]

/** An area chart of long-run wealth inequality, drawn on the shared time axis. */
export function InequalityBand({ height, pad }: { height: number; pad: number }) {
  const pts = inequality.map((p) => ({ ...p, x: xOf(p.year), y: ineqYOf(p.share, height, pad) }))
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const last = pts[pts.length - 1]
  const first = pts[0]
  const area = `${line} L${last.x.toFixed(1)},${height} L${first.x.toFixed(1)},${height} Z`

  return (
    <div className="ineq-band" style={{ width: CANVAS_W, height }}>
      <svg className="ineq-svg" width={CANVAS_W} height={height}>
        {REFS.map((r) => (
          <line key={r} className="ineq-ref" x1={0} x2={CANVAS_W} y1={ineqYOf(r, height, pad)} y2={ineqYOf(r, height, pad)} />
        ))}
        <path className="ineq-area" d={area} />
        <path className="ineq-line" d={line} />
        {pts.map((p) => (
          <circle key={p.year} className="ineq-dot" cx={p.x} cy={p.y} r={2.6}>
            <title>
              {p.year}: top 10% held ~{p.share}% of wealth
            </title>
          </circle>
        ))}
      </svg>
    </div>
  )
}
