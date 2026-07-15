import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Selection, Movement, Current, HistEvent, LocusSeg } from '../types'
import { NOW } from '../lib/layout'
import { eventKinds } from '../data/events'
import { artImages, type ArtImage } from '../lib/artImages'
import { wikiFor, wikiTitleOf, FigureTag, TieTag } from '../lib/wiki'

/** One thumbnail: shimmer skeleton until loaded, then fades in.
 *  Clicking opens the lightbox; cmd/ctrl-click still opens the Wikimedia page directly. */
function Thumb({ img, onOpen }: { img: ArtImage; onOpen: () => void }) {
  const [loaded, setLoaded] = useState(false)
  const [err, setErr] = useState(false)
  if (err) return null
  return (
    <a
      className={'d-thumb' + (loaded ? ' ready' : '')}
      href={img.page}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (loaded && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault()
          onOpen()
        }
      }}
    >
      {!loaded && <span className="sk" />}
      <img src={img.src} alt="" loading="lazy" onLoad={() => setLoaded(true)} onError={() => setErr(true)} />
    </a>
  )
}

/** Full-screen lightbox: the work scaled into the viewport, with an external link and dot nav. */
function Lightbox({
  imgs,
  index,
  onIndex,
  onClose,
}: {
  imgs: ArtImage[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const cur = imgs[index]
  return createPortal(
    <div className="lightbox" onClick={onClose}>
      <a
        className="lb-ext"
        href={cur.page}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Open in Wikimedia ↗
      </a>
      <img key={cur.src} className="lb-img" src={cur.src} alt="" onClick={(e) => e.stopPropagation()} />
      {imgs.length > 1 && (
        <div className="lb-dots" onClick={(e) => e.stopPropagation()}>
          {imgs.map((_, i) => (
            <button
              key={i}
              className={'lb-dot' + (i === index ? ' on' : '')}
              aria-label={`Image ${i + 1} of ${imgs.length}`}
              onClick={() => onIndex(i)}
            />
          ))}
        </div>
      )}
    </div>,
    document.body,
  )
}

/** A gallery of representative works, pulled from the movement's Wikipedia article. */
function ArtImages({ label }: { label: string }) {
  const [imgs, setImgs] = useState<ArtImage[] | null>(null) // null while fetching
  const [open, setOpen] = useState<number | null>(null) // index shown in the lightbox
  useEffect(() => {
    let live = true
    setImgs(null)
    setOpen(null)
    artImages(wikiTitleOf(label)).then((list) => {
      if (live) setImgs(list)
    })
    return () => {
      live = false
    }
  }, [label])

  const n = imgs?.length ?? 0
  useEffect(() => {
    if (open === null || n === 0) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setOpen((i) => ((i ?? 0) + 1) % n)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setOpen((i) => ((i ?? 0) - 1 + n) % n)
      } else if (e.key === 'Escape') {
        e.stopImmediatePropagation() // close the lightbox without also closing the drawer
        setOpen(null)
      }
    }
    window.addEventListener('keydown', onKey, true) // capture: run before the drawer's Escape handler
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open, n])

  // Still resolving which images exist — show placeholder skeleton tiles.
  if (imgs === null) {
    return (
      <div className="d-gallery">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="d-thumb">
            <span className="sk" />
          </span>
        ))}
      </div>
    )
  }
  if (!imgs.length) return null
  return (
    <>
      <div className="d-gallery">
        {imgs.map((img, i) => (
          <Thumb key={img.src} img={img} onOpen={() => setOpen(i)} />
        ))}
      </div>
      {open !== null && imgs[open] && (
        <Lightbox imgs={imgs} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  )
}

function ArtFields({ m, color }: { m: Movement; color: string }) {
  return (
    <>
      <div className="field">
        <h4>Inherited from</h4>
        <div className="react">
          <span className="arrow" style={{ color }}>
            ↳
          </span>
          <p>{m.inh}</p>
        </div>
      </div>
      <div className="field">
        <h4>Reacted against</h4>
        <div className="react">
          <span className="arrow" style={{ color }}>
            ⤫
          </span>
          <p>{m.rea}</p>
        </div>
      </div>
      <div className="field full">
        <h4>Core ideas</h4>
        <div className="tags">
          {m.ideas.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="field full">
        <h4>Key figures</h4>
        <div className="tags">
          {m.figs.map((t) => (
            <FigureTag key={t} text={t} />
          ))}
        </div>
      </div>
    </>
  )
}

function PhilFields({ c }: { c: Current }) {
  return (
    <>
      <div className="field full">
        <h4>Core ideas</h4>
        <div className="tags">
          {c.ideas.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="field">
        <h4>Thinkers</h4>
        <div className="tags">
          {c.thinkers.map((t) => (
            <FigureTag key={t} text={t} />
          ))}
        </div>
      </div>
      <div className="field">
        <h4>Resonates with</h4>
        <div className="tags">
          {c.ties.map((t) => (
            <TieTag key={t} name={t} />
          ))}
        </div>
      </div>
    </>
  )
}

function EventContent({ e, color, onClose }: { e: HistEvent; color: string; onClose: () => void }) {
  const yrs = e.end !== undefined ? `${e.year} – ${e.end}` : `${e.year}`
  return (
    <>
      <button className="close" aria-label="close" onClick={onClose}>
        ✕
      </button>
      <div className="d-era" style={{ color }}>
        ⚑ {eventKinds[e.type].label}
      </div>
      <div className="d-top">
        <span className="d-yrs" style={{ color }}>
          {yrs}
        </span>
        <a className="d-name" href={wikiFor(e.label)} target="_blank" rel="noopener noreferrer">
          {e.label}
        </a>
      </div>
      <div className="d-one">{e.one}</div>
      <div className="d-grid">
        <div className="field full">
          <h4>What happened</h4>
          <p>{e.detail}</p>
        </div>
        <div className="field full">
          <h4>Why it mattered</h4>
          <p>{e.impact}</p>
        </div>
      </div>
    </>
  )
}

function RibbonContent({
  seg,
  title,
  color,
  onClose,
}: {
  seg: LocusSeg
  title: string
  color: string
  onClose: () => void
}) {
  const yrs = `${seg.s} – ${seg.e >= NOW ? 'now' : seg.e}`
  return (
    <>
      <button className="close" aria-label="close" onClick={onClose}>
        ✕
      </button>
      <div className="d-era" style={{ color }}>
        {title}
      </div>
      <div className="d-top">
        <span className="d-yrs" style={{ color }}>
          {yrs}
        </span>
        <span className="d-name plain">{seg.label}</span>
      </div>
      <div className="d-one">{seg.gloss}</div>
      <div className="d-grid">
        <div className="field full">
          <h4>What this names</h4>
          <p>{seg.detail}</p>
        </div>
      </div>
    </>
  )
}

function Content({ sel, onClose }: { sel: Selection; onClose: () => void }) {
  const { kind, color, groupName, item } = sel
  if (kind === 'event') return <EventContent e={item as HistEvent} color={color} onClose={onClose} />
  if (kind === 'ribbon')
    return <RibbonContent seg={item as LocusSeg} title={groupName ?? ''} color={color} onClose={onClose} />
  const isPhil = kind === 'phil'
  const mc = item as Movement | Current
  const title = isPhil ? (mc as Current).school : (mc as Movement).name
  return (
    <>
      <button className="close" aria-label="close" onClick={onClose}>
        ✕
      </button>
      <div className="d-era" style={{ color }}>
        {groupName}
        {isPhil ? ' · philosophy' : ''}
      </div>
      <div className="d-top">
        <span className="d-yrs" style={{ color }}>
          {mc.s} – {mc.e >= NOW ? 'now' : mc.e}
        </span>
        <a className="d-name" href={wikiFor(title)} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </div>
      <div className="d-one">{mc.one}</div>
      {!isPhil && <ArtImages label={title} />}
      <div className="d-grid">
        {isPhil ? <PhilFields c={mc as Current} /> : <ArtFields m={mc as Movement} color={color} />}
      </div>
    </>
  )
}

export function Drawer({ selection, onClose }: { selection: Selection | null; onClose: () => void }) {
  const innerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!selection) return
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (innerRef.current?.contains(t)) return // click inside the drawer
      if (t.closest('.lightbox')) return // the image lightbox manages its own dismissal
      if (t.closest('.bar, .evt-label, .locus-seg')) return // clicking another marker just switches selection
      onClose()
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [selection, onClose])

  return (
    <div className={'drawer' + (selection ? ' open' : '')}>
      <div className="drawer-inner" ref={innerRef}>
        {selection && <Content sel={selection} onClose={onClose} />}
      </div>
    </div>
  )
}
