// Gantt geometry — one place for the time→pixel mapping and lane row-packing.

export const YEAR_MIN = 1385
export const YEAR_MAX = 2032
export const ROW = 32
export const BARH = 24
export const LANEPAD = 9
export const AXIS = 30
export const NOW = 2026

// Piecewise time scale: the sparse pre-1750 era is compressed, the dense
// modern era is given more room. The uneven gridlines are the honest tell.
export const BREAK = 1750
const PX_EARLY = 3.5 // px/year before the break
const PX_LATE = 7 // px/year after the break
const BREAK_X = (BREAK - YEAR_MIN) * PX_EARLY

export const xOf = (year: number) =>
  year <= BREAK ? (year - YEAR_MIN) * PX_EARLY : BREAK_X + (year - BREAK) * PX_LATE

/** Pixel width of a span — must go through xOf so it's correct across the break. */
export const wOf = (s: number, e: number) => xOf(e) - xOf(s)

export const CANVAS_W = xOf(YEAR_MAX)

export const GRID_YEARS: number[] = (() => {
  const ys: number[] = []
  for (let y = 1400; y <= 2020; y += 20) ys.push(y)
  return ys
})()

export interface Placed<T> {
  item: T
  row: number
}
export interface Packed<T> {
  placed: Placed<T>[]
  rows: number
  span: { s: number; e: number }
}

/** Greedy interval packing: give each overlapping item its own row within a lane. */
export function packItems<T extends { s: number; e: number }>(items: T[]): Packed<T> {
  const sorted = [...items].sort((a, b) => a.s - b.s)
  const rowEnds: number[] = []
  const placed = sorted.map((item) => {
    let row = rowEnds.findIndex((end) => item.s >= end + 2)
    if (row < 0) {
      row = rowEnds.length
      rowEnds.push(item.e)
    } else {
      rowEnds[row] = item.e
    }
    return { item, row }
  })
  const span = items.reduce(
    (acc, it) => ({ s: Math.min(acc.s, it.s), e: Math.max(acc.e, it.e) }),
    { s: 9999, e: 0 },
  )
  return { placed, rows: rowEnds.length || 1, span }
}

export const laneHeight = (rows: number) => rows * ROW + LANEPAD * 2 - (ROW - BARH)
