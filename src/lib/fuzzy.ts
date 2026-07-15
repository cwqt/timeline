/** Lightweight subsequence fuzzy match. Returns a score (higher = better) or null if no match. */
export function fuzzyScore(query: string, text: string): number | null {
  const q = query.toLowerCase().trim()
  const t = text.toLowerCase()
  if (!q) return 0

  let qi = 0
  let score = 0
  let streak = 0
  let prev = -2

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      let s = 1
      if (ti === prev + 1) {
        streak += 1
        s += streak * 2 // reward consecutive runs
      } else {
        streak = 0
      }
      if (ti === 0 || /[\s\-·&/]/.test(t[ti - 1])) s += 4 // reward word starts
      score += s
      prev = ti
      qi += 1
    }
  }

  if (qi < q.length) return null // not all query characters were found in order
  score -= t.length * 0.04 // gently prefer shorter, tighter matches
  return score
}
