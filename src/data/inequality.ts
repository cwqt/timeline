/** Long-run wealth inequality — top 10% wealth share (%), Western Europe & US blend.
 *  APPROXIMATE / illustrative, after Piketty, "Capital in the Twenty-First Century".
 *  Pre-1810 figures are rough historical estimates. */
export interface IneqPoint {
  year: number
  share: number
}

export const inequality: IneqPoint[] = [
  { year: 1400, share: 78 },
  { year: 1500, share: 80 },
  { year: 1600, share: 83 },
  { year: 1700, share: 85 },
  { year: 1789, share: 86 },
  { year: 1848, share: 84 },
  { year: 1910, share: 89 }, // Belle Époque peak
  { year: 1929, share: 82 },
  { year: 1950, share: 70 },
  { year: 1970, share: 61 }, // post-war "great compression" trough
  { year: 1980, share: 60 },
  { year: 2008, share: 67 },
  { year: 2024, share: 73 },
]

export const INEQ_MIN = 55
export const INEQ_MAX = 93

/** Map a wealth-share value to a y pixel within a band of the given height. */
export const ineqYOf = (share: number, height: number, pad: number) =>
  pad + (1 - (share - INEQ_MIN) / (INEQ_MAX - INEQ_MIN)) * (height - pad * 2)
