import { GRID_YEARS, xOf } from '../lib/layout'

/** Vertical 20-year gridlines, drawn inside each band/lane. */
export function Gridlines() {
  return (
    <>
      {GRID_YEARS.map((y) => (
        <div key={y} className="gridline" style={{ left: xOf(y) }} />
      ))}
    </>
  )
}
