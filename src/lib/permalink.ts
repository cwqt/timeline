import type { Selection, Movement, Current, HistEvent, LocusSeg } from '../types'
import { movements } from '../data/movements'
import { eras } from '../data/eras'
import { traditions, currents } from '../data/philosophy'
import { events, eventKinds } from '../data/events'
import { epoch } from '../data/epoch'
import { locus } from '../data/locus'
import { hegemony } from '../data/hegemony'
import { production } from '../data/production'

/** Serialize a drawer selection into a shareable location hash (e.g. "#art=Cubism"). */
export function selectionToHash(sel: Selection): string {
  const item = sel.item
  if (sel.kind === 'art') return 'art=' + encodeURIComponent((item as Movement).name)
  if (sel.kind === 'phil') return 'phil=' + encodeURIComponent((item as Current).school)
  if (sel.kind === 'event') return 'event=' + encodeURIComponent((item as HistEvent).label)
  if (sel.kind === 'ribbon') {
    const key =
      sel.groupName === 'Cultural hegemony'
        ? 'hegemony'
        : sel.groupName === 'Modes of production'
          ? 'production'
          : sel.groupName === 'Historical epoch'
            ? 'epoch'
            : 'meaning'
    return key + '=' + encodeURIComponent((item as LocusSeg).label)
  }
  return ''
}

/** Resolve a location hash back into a full selection, or null if it doesn't match anything. */
export function hashToSelection(hash: string): Selection | null {
  const h = hash.replace(/^#/, '')
  const eq = h.indexOf('=')
  if (eq < 0) return null
  const kind = h.slice(0, eq)
  const val = decodeURIComponent(h.slice(eq + 1))

  if (kind === 'art') {
    const m = movements.find((x) => x.name === val)
    if (m) return { kind: 'art', groupName: eras[m.era].name, color: eras[m.era].color, item: m }
  } else if (kind === 'phil') {
    const c = currents.find((x) => x.school === val)
    if (c) return { kind: 'phil', groupName: traditions[c.trad].name, color: traditions[c.trad].color, item: c }
  } else if (kind === 'event') {
    const ev = events.find((x) => x.label === val)
    if (ev) return { kind: 'event', color: eventKinds[ev.type].color, item: ev }
  } else if (kind === 'meaning') {
    const L = locus.find((x) => x.label === val)
    if (L) return { kind: 'ribbon', groupName: 'Where meaning lives', color: L.color, item: L }
  } else if (kind === 'hegemony') {
    const L = hegemony.find((x) => x.label === val)
    if (L) return { kind: 'ribbon', groupName: 'Cultural hegemony', color: L.color, item: L }
  } else if (kind === 'production') {
    const L = production.find((x) => x.label === val)
    if (L) return { kind: 'ribbon', groupName: 'Modes of production', color: L.color, item: L }
  } else if (kind === 'epoch') {
    const L = epoch.find((x) => x.label === val)
    if (L) return { kind: 'ribbon', groupName: 'Historical epoch', color: L.color, item: L }
  }
  return null
}
