import { useEffect, useState } from 'react'
import { GanttView } from './components/GanttView'
import { Drawer } from './components/Drawer'
import type { Selection } from './types'
import { hashToSelection, selectionToHash } from './lib/permalink'

export default function App() {
  const [selection, setSelection] = useState<Selection | null>(() => hashToSelection(window.location.hash))

  const select = (sel: Selection) => {
    const h = selectionToHash(sel)
    if (h) window.location.hash = h // fires hashchange → updates selection
    else setSelection(sel)
  }
  const close = () => {
    if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search)
    setSelection(null)
  }

  useEffect(() => {
    const apply = () => setSelection(hashToSelection(window.location.hash))
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('hashchange', apply)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('hashchange', apply)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const selectedId = selection
    ? 'label' in selection.item
      ? selection.item.label
      : 'name' in selection.item
        ? selection.item.name
        : selection.item.school
    : null

  return (
    <>
      <GanttView selectedId={selectedId} onSelect={select} />
      <footer className="app-footer">
        Built by{' '}
        <a href="https://github.com/cwqt" target="_blank" rel="noopener noreferrer">
          @cwqt
        </a>
      </footer>
      <Drawer selection={selection} onClose={close} />
    </>
  )
}
