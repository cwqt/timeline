import { useEffect, useState } from 'react'
import { GanttView } from './components/GanttView'
import { Drawer } from './components/Drawer'
import type { Selection } from './types'

export default function App() {
  const [selection, setSelection] = useState<Selection | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelection(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
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
      <header className="app-header">
        <span className="app-mark" />
        <span className="app-title">Timeline</span>
      </header>
      <GanttView selectedId={selectedId} onSelect={setSelection} />
      <Drawer selection={selection} onClose={() => setSelection(null)} />
    </>
  )
}
