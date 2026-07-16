import { useEffect, useRef, useState } from 'react'
import type { Movement, Current, Selection, Group, NodeKind } from '../types'
import { eras, ERA_KEYS } from '../data/eras'
import { traditions, TRAD_KEYS, currents } from '../data/philosophy'
import { movements } from '../data/movements'
import { events, eventKinds } from '../data/events'
import { epoch } from '../data/epoch'
import { locus } from '../data/locus'
import { hegemony } from '../data/hegemony'
import { production } from '../data/production'
import { AXIS, BREAK, CANVAS_W, GRID_YEARS, LANEPAD, NOW, ROW, laneHeight, packItems, wOf, xOf } from '../lib/layout'
import { Gridlines } from './Gridlines'
import { Ribbon } from './Ribbon'
import { Search, type SearchItem } from './Search'
import { InequalityBand } from './InequalityBand'
import { ineqYOf } from '../data/inequality'

interface Props {
  selectedId: string | null
  onSelect: (s: Selection) => void
}

interface LaneModel {
  key: string
  meta: Group
  kind: NodeKind
  items: (Movement | Current)[]
  placed: { item: Movement | Current; row: number }[]
  rows: number
  height: number
  span: { s: number; e: number }
}

const labelOf = (item: Movement | Current) => ('name' in item ? item.name : item.school)

function buildLane(key: string, meta: Group, kind: NodeKind, items: (Movement | Current)[]): LaneModel {
  const { placed, rows, span } = packItems(items)
  return { key, meta, kind, items, placed, rows, height: laneHeight(rows), span }
}

function Bar({
  item,
  kind,
  color,
  top,
  selected,
  onClick,
}: {
  item: Movement | Current
  kind: NodeKind
  color: string
  top: number
  selected: boolean
  onClick: () => void
}) {
  const label = labelOf(item)
  const wpx = wOf(item.s, item.e)
  const isPhil = kind === 'phil'
  const style: React.CSSProperties = { left: xOf(item.s), width: Math.max(wpx, 10), top }
  if (isPhil) {
    style.borderColor = color
    style.color = color
  } else {
    style.background = color
  }
  return (
    <div
      className={'bar' + (isPhil ? ' bar-phil' : '') + (selected ? ' sel' : '')}
      style={style}
      title={`${label} · ${item.s}–${item.e}`}
      onClick={onClick}
    >
      {wpx > 78 ? <span className="bar-in">{label}</span> : <span className="lbl-out">{label}</span>}
    </div>
  )
}

function Lane({
  lane,
  overlay,
  selectedId,
  onSelect,
}: {
  lane: LaneModel
  overlay?: boolean
  selectedId: string | null
  onSelect: (s: Selection) => void
}) {
  return (
    <div className={'lane' + (overlay ? ' lane-overlay' : '')} style={{ height: lane.height, width: CANVAS_W }}>
      {!overlay && <div className="lane-bg" style={{ background: lane.meta.color }} />}
      {!overlay && <Gridlines />}
      {lane.placed.map(({ item, row }) => (
        <Bar
          key={labelOf(item)}
          item={item}
          kind={lane.kind}
          color={lane.meta.color}
          top={LANEPAD + row * ROW}
          selected={selectedId === labelOf(item)}
          onClick={() =>
            onSelect({ kind: lane.kind, groupName: lane.meta.name, color: lane.meta.color, item })
          }
        />
      ))}
    </div>
  )
}

export function GanttView({ selectedId, onSelect }: Props) {
  const [showEvents, setShowEvents] = useState(true)
  const [showArt, setShowArt] = useState(true)
  const [showPhil, setShowPhil] = useState(true)
  const [showEpoch, setShowEpoch] = useState(true)
  const [showLocus, setShowLocus] = useState(true)
  const [showHeg, setShowHeg] = useState(true)
  const [showProd, setShowProd] = useState(true)
  const [showIneq, setShowIneq] = useState(true)
  const [hiddenTypes, setHiddenTypes] = useState<Set<string>>(() => new Set())
  const toggleType = (t: string) =>
    setHiddenTypes((prev) => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })

  const artLanes = ERA_KEYS.map((k) =>
    buildLane(k, eras[k], 'art', movements.filter((m) => m.era === k)),
  )
  const philLanes = TRAD_KEYS.map((k) =>
    buildLane(k, traditions[k], 'phil', currents.filter((c) => c.trad === k)),
  )

  const SECTION = 36
  const EPOCH = showEpoch ? 34 : 0 // compact: title only (must match .locus-band.compact height)
  const LOCUS = showLocus ? 56 : 0
  const HEG = showHeg ? 56 : 0
  const PROD = showProd ? 56 : 0
  const INEQ = showIneq ? 132 : 0
  const INEQ_PAD = 18
  const sum = (ls: LaneModel[]) => ls.reduce((a, l) => a + l.height, 0)
  const artH = showArt ? sum(artLanes) : 0
  const philH = showPhil ? sum(philLanes) : 0
  const lanesH = Math.max(artH, philH)

  // Stack event labels into rows so none overlap; header grows to fit the rows used.
  const TIER_H = 18
  const HEAD_TOP = 8
  const visibleEvents = events.filter((ev) => !hiddenTypes.has(ev.type))
  const evtLaid = (() => {
    const tierEnds: number[] = []
    return visibleEvents.map((ev) => {
      const text =
        ev.label + (ev.end !== undefined ? ` · ${ev.year}–${String(ev.end).slice(2)}` : ` · ${ev.year}`)
      const start = xOf(ev.year)
      const width = text.length * 6.3 + 22
      let tier = tierEnds.findIndex((end) => start >= end)
      if (tier < 0) tier = tierEnds.length
      tierEnds[tier] = start + width
      return { ev, text, tier }
    })
  })()
  const tierCount = evtLaid.reduce((m, e) => Math.max(m, e.tier + 1), 1)
  const headerH = showEvents ? HEAD_TOP + tierCount * TIER_H + 8 : 0
  const canvasH = AXIS + EPOCH + LOCUS + HEG + PROD + SECTION + lanesH + INEQ

  // A selected ribbon segment (locus / hegemony) gets a full-height period demarcation.
  const selRibbon = [...epoch, ...locus, ...hegemony, ...production].find((s) => s.label === selectedId) ?? null

  // Keep the sticky event bar horizontally aligned with the scrolling canvas.
  const scrollRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const stickyBarRef = useRef<HTMLDivElement>(null)

  // Give the sticky events header a background only once it's pinned to the top.
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const el = stickyBarRef.current
      if (el) setStuck(el.getBoundingClientRect().top <= 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [showEvents])
  const syncX = () => {
    const sc = scrollRef.current
    const st = stickyRef.current
    if (sc && st) st.style.transform = `translateX(${-sc.scrollLeft}px)`
  }

  // Select an item, reveal whatever layer it lives on, and scroll it into view.
  type Layer = 'art' | 'phil' | 'event' | 'locus' | 'heg' | 'prod' | 'epoch'
  const focusItem = (sel: Selection, year: number, layer: Layer, evType?: string) => {
    if (layer === 'art') setShowArt(true)
    else if (layer === 'phil') setShowPhil(true)
    else if (layer === 'epoch') setShowEpoch(true)
    else if (layer === 'locus') setShowLocus(true)
    else if (layer === 'heg') setShowHeg(true)
    else if (layer === 'prod') setShowProd(true)
    else if (layer === 'event') {
      setShowEvents(true)
      if (evType)
        setHiddenTypes((prev) => {
          const next = new Set(prev)
          next.delete(evType)
          return next
        })
    }
    onSelect(sel)
    scrollRef.current?.scrollTo({ left: Math.max(0, xOf(year) - 160), behavior: 'smooth' })
  }

  const searchItems: SearchItem[] = [
    ...movements.map((m) => ({
      key: 'm:' + m.name,
      label: m.name,
      sub: eras[m.era].name,
      color: eras[m.era].color,
      terms: [m.name, ...m.figs, ...m.ideas],
      onPick: () =>
        focusItem({ kind: 'art', groupName: eras[m.era].name, color: eras[m.era].color, item: m }, m.s, 'art'),
    })),
    ...currents.map((c) => ({
      key: 'c:' + c.school,
      label: c.school,
      sub: traditions[c.trad].name,
      color: traditions[c.trad].color,
      terms: [c.school, ...c.thinkers, ...c.ideas],
      onPick: () =>
        focusItem(
          { kind: 'phil', groupName: traditions[c.trad].name, color: traditions[c.trad].color, item: c },
          c.s,
          'phil',
        ),
    })),
    ...events.map((ev) => ({
      key: 'e:' + ev.label,
      label: ev.label,
      sub: eventKinds[ev.type].label,
      color: eventKinds[ev.type].color,
      terms: [ev.label],
      onPick: () => focusItem({ kind: 'event', color: eventKinds[ev.type].color, item: ev }, ev.year, 'event', ev.type),
    })),
    ...epoch.map((L) => ({
      key: 'ep:' + L.label,
      label: L.label,
      sub: 'Historical epoch',
      color: L.color,
      terms: [L.label, L.gloss],
      onPick: () => focusItem({ kind: 'ribbon', groupName: 'Historical epoch', color: L.color, item: L }, L.s, 'epoch'),
    })),
    ...locus.map((L) => ({
      key: 'l:' + L.label,
      label: L.label,
      sub: 'Where meaning lives',
      color: L.color,
      terms: [L.label, L.gloss],
      onPick: () => focusItem({ kind: 'ribbon', groupName: 'Where meaning lives', color: L.color, item: L }, L.s, 'locus'),
    })),
    ...hegemony.map((L) => ({
      key: 'h:' + L.label,
      label: L.label,
      sub: 'Cultural hegemony',
      color: L.color,
      terms: [L.label, L.gloss],
      onPick: () => focusItem({ kind: 'ribbon', groupName: 'Cultural hegemony', color: L.color, item: L }, L.s, 'heg'),
    })),
    ...production.map((L) => ({
      key: 'p:' + L.label,
      label: L.label,
      sub: 'Modes of production',
      color: L.color,
      terms: [L.label, L.gloss],
      onPick: () =>
        focusItem({ kind: 'ribbon', groupName: 'Modes of production', color: L.color, item: L }, L.s, 'prod'),
    })),
  ]

  // On cold load with a deep link (#hash), reveal its layer and scroll it into view.
  useEffect(() => {
    if (!selectedId) return
    searchItems.find((it) => it.label === selectedId)?.onPick()
    // run once on mount; a shared URL should focus the linked item
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    <header className="app-header">
      <span className="app-mark" />
      <span className="app-title">Timeline</span>
      <Search items={searchItems} />
    </header>
    <div className="layer-toggles">
      <span className="lt-label">Show</span>
      {[
        { on: showEvents, set: setShowEvents, color: '#e0483a', label: 'Historical events' },
        { on: showArt, set: setShowArt, color: '#c9b8e6', label: 'Artistic movements' },
        { on: showPhil, set: setShowPhil, color: '#cbb26b', label: 'Philosophical threads' },
        { on: showEpoch, set: setShowEpoch, color: '#9a8f7a', label: 'Historical epoch' },
        { on: showLocus, set: setShowLocus, color: '#7fb0c0', label: 'Where meaning lives' },
        { on: showHeg, set: setShowHeg, color: '#c58f6a', label: 'Cultural hegemony' },
        { on: showProd, set: setShowProd, color: '#b5894a', label: 'Modes of production' },
        { on: showIneq, set: setShowIneq, color: '#d8b45a', label: 'Wealth inequality' },
      ].map((t) => (
        <button
          key={t.label}
          className={'lt' + (t.on ? '' : ' off')}
          onClick={() => t.set((v) => !v)}
          role="switch"
          aria-checked={t.on}
        >
          <span className="lt-sw" style={t.on ? { background: t.color, borderColor: t.color } : undefined}>
            <span className="lt-knob" />
          </span>
          {t.label}
        </button>
      ))}
    </div>
    {showEvents && (
      <div className="evt-legend">
        <span className="ell">⚑ Historical events</span>
        {Object.entries(eventKinds).map(([type, k]) => {
          const off = hiddenTypes.has(type)
          return (
            <button
              key={type}
              className={'eli' + (off ? ' off' : '')}
              onClick={() => toggleType(type)}
              aria-pressed={!off}
            >
              <span className="sw" style={{ background: k.color }} />
              {k.label}
            </button>
          )
        })}
      </div>
    )}
    <div className="gantt">
      {/* left gutter — labels aligned to lanes */}
      <div className="gutter">
        {showEvents && (
          <div className={'evt-header-gutter' + (stuck ? ' stuck' : '')} style={{ height: headerH }}>
            ⚑ Historical events
          </div>
        )}
        <div style={{ height: AXIS, borderBottom: '1px solid var(--line)' }} />
        {showEpoch && (
          <div className="locus-gutter compact" style={{ height: EPOCH }}>
            <span className="a">Historical epoch</span>
          </div>
        )}
        {showLocus && (
          <div className="locus-gutter">
            <span className="a">
              Where meaning
              <br />
              lives
            </span>
            <span className="b">the through-line</span>
          </div>
        )}
        {showHeg && (
          <div className="locus-gutter">
            <span className="a">
              Cultural
              <br />
              hegemony
            </span>
            <span className="b">who holds the centre</span>
          </div>
        )}
        {showProd && (
          <div className="locus-gutter">
            <span className="a">
              Modes of
              <br />
              production
            </span>
            <span className="b">how wealth is made</span>
          </div>
        )}
        <div className="section-gutter">
          <span className="sq" style={{ background: '#c9b8e6' }} />
          Movements <span className="sq" style={{ background: '#cbb26b', marginLeft: 6 }} /> &amp; Currents
        </div>
        <div className="lane-stack" style={{ height: lanesH }}>
          {showArt && (
            <div className="label-layer art">
              {artLanes.map((l) => (
                <div
                  key={l.key}
                  className="lane-label"
                  style={{ height: l.height, color: `color-mix(in srgb, ${l.meta.color} 72%, white)` }}
                >
                  <span className="en">{l.meta.name}</span>
                  <span className="yr">
                    {l.span.s}–{l.span.e >= NOW ? 'now' : l.span.e}
                  </span>
                </div>
              ))}
            </div>
          )}
          {showPhil && (
            <div className="label-layer phil">
              {philLanes.map((l) => (
                <div key={l.key} className="lane-label" style={{ height: l.height }}>
                  <span
                    className="ll-tag"
                    style={{ color: `color-mix(in srgb, ${l.meta.color} 74%, white)` }}
                  >
                    <span className="en">{l.meta.name}</span>
                    <span className="yr">
                      {l.span.s}–{l.span.e >= NOW ? 'now' : l.span.e}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {showIneq && (
          <div className="ineq-gutter" style={{ height: INEQ }}>
            <div className="ineq-gtitle">Wealth inequality</div>
            <div className="ineq-gsub">top 10% share · approx.</div>
            <span className="ineq-gy" style={{ top: ineqYOf(90, INEQ, INEQ_PAD) }}>
              90%
            </span>
            <span className="ineq-gy" style={{ top: ineqYOf(60, INEQ, INEQ_PAD) }}>
              60%
            </span>
          </div>
        )}
      </div>

      {/* time canvas + sticky event bar */}
      <div className="track">
        {showEvents && (
          <div className={'evt-sticky' + (stuck ? ' stuck' : '')} ref={stickyBarRef} style={{ height: headerH }}>
            <div className="evt-sticky-inner" ref={stickyRef} style={{ width: CANVAS_W, height: headerH }}>
              {evtLaid.map(({ ev, text, tier }) => {
                const c = eventKinds[ev.type].color
                const on = selectedId === ev.label
                const top = HEAD_TOP + tier * TIER_H
                return (
                  <div key={ev.label}>
                    <span
                      className="evt-tie"
                      style={{ left: xOf(ev.year), top, height: headerH - top, width: on ? 3 : 2, background: c }}
                    />
                    <button
                      className={'evt-label' + (on ? ' sel' : '')}
                      style={{ left: xOf(ev.year), top, color: c, borderLeftColor: c }}
                      onClick={() => onSelect({ kind: 'event', color: c, item: ev })}
                    >
                      {text}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="scroll" ref={scrollRef} onScroll={syncX}>
          <div className="canvas" style={{ width: CANVAS_W }}>
            <div className="axis" style={{ width: CANVAS_W }}>
              {GRID_YEARS.map((y) => (
                <div key={y} className="gridline" style={{ left: xOf(y), height: AXIS }} />
              ))}
              {GRID_YEARS.map((y) => (
                <div key={'t' + y} className="yr" style={{ left: xOf(y) }}>
                  {y}
                </div>
              ))}
              <div className="nowlabel" style={{ left: xOf(NOW) }}>
                NOW · 2026
              </div>
              <div className="breaklabel" style={{ left: xOf(BREAK) }}>
                ← ½-scale · full scale →
              </div>
            </div>

            {showEpoch && (
              <Ribbon segments={epoch} title="Historical epoch" compact selectedId={selectedId} onSelect={onSelect} />
            )}
            {showLocus && (
              <Ribbon segments={locus} title="Where meaning lives" selectedId={selectedId} onSelect={onSelect} />
            )}
            {showHeg && (
              <Ribbon segments={hegemony} title="Cultural hegemony" selectedId={selectedId} onSelect={onSelect} />
            )}
            {showProd && (
              <Ribbon segments={production} title="Modes of production" selectedId={selectedId} onSelect={onSelect} />
            )}

            <div className="section-band" style={{ width: CANVAS_W }}>
              <Gridlines />
            </div>
            <div className="lane-stack" style={{ height: lanesH, width: CANVAS_W }}>
              {showArt && (
                <div className="lane-layer art">
                  {artLanes.map((l) => (
                    <Lane key={l.key} lane={l} selectedId={selectedId} onSelect={onSelect} />
                  ))}
                </div>
              )}
              {showPhil && (
                <div className="lane-layer phil">
                  {philLanes.map((l) => (
                    <Lane key={l.key} lane={l} overlay selectedId={selectedId} onSelect={onSelect} />
                  ))}
                </div>
              )}
            </div>

            {showIneq && <InequalityBand height={INEQ} pad={INEQ_PAD} />}

            {selRibbon && (
              <div
                className="sel-span"
                style={{
                  left: xOf(selRibbon.s),
                  width: wOf(selRibbon.s, selRibbon.e),
                  height: canvasH,
                  background: `${selRibbon.color}22`,
                  borderLeftColor: selRibbon.color,
                  borderRightColor: selRibbon.color,
                  boxShadow: `inset 0 0 44px ${selRibbon.color}33`,
                }}
              />
            )}

            {showEvents && (
            <div className="events">
              {evtLaid.map(({ ev }) => {
                const c = eventKinds[ev.type].color
                const on = selectedId === ev.label
                return (
                  <div key={ev.label}>
                    {ev.end !== undefined && (
                      <div
                        className="evt-band"
                        style={{
                          left: xOf(ev.year),
                          width: wOf(ev.year, ev.end),
                          height: canvasH,
                          background: on ? `${c}30` : `${c}0d`,
                          borderLeftColor: on ? c : `${c}47`,
                          borderRightColor: on ? c : `${c}47`,
                          boxShadow: on ? `inset 0 0 44px ${c}38` : undefined,
                          zIndex: on ? 2 : undefined,
                        }}
                      />
                    )}
                    <div
                      className="evt-line"
                      style={{
                        left: xOf(ev.year),
                        height: canvasH,
                        width: on ? 3 : undefined,
                        background: on
                          ? `linear-gradient(180deg, ${c}, ${c}66)`
                          : `linear-gradient(180deg, ${c}d9, ${c}14)`,
                        boxShadow: on ? `0 0 10px ${c}` : undefined,
                        zIndex: on ? 2 : undefined,
                      }}
                    />
                  </div>
                )
              })}
            </div>
            )}

            <div className="breakline" style={{ left: xOf(BREAK), height: canvasH }} />
            <div className="nowline" style={{ left: xOf(NOW), height: canvasH }} />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
