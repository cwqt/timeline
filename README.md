# The Thread of Artistic Thought

An interactive genealogy of Western artistic and philosophical thought, ~1750 to now.
Two synchronized views over the same data model:

- **Timeline (Gantt)** — art movements and philosophical currents as two parallel
  staves on one time axis, under a "where meaning lives" ribbon (World → Self →
  Medium → Idea → Network) that names the through-line.
- **Rhizome** — the counter-view: the same nodes as a force-directed network with no
  spine, clustered into constellations by era/tradition (toggle grouping off for the
  pure hairball). Edges show descent, cross-time leaps, idea lineage, and art↔idea
  resonance.

Click any bar or node for its inheritance, revolt, ideas, and Wikipedia-linked figures.

## Run

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build to dist/
npm run preview  # serve the built bundle
```

## Where things live

```
src/
  data/          # the content — extracted, typed, and the ONE place to edit facts
    eras.ts          art eras (upper stave groups)
    movements.ts     the 29 art movements
    philosophy.ts    the 5 traditions + 16 currents (lower stave)
    locus.ts         the "where meaning lives" ribbon segments
    edges.ts         the rhizome influence web (spine + leaps) + generated resonances
  lib/
    layout.ts        Gantt time→pixel math + lane row-packing
    forceSim.ts      pure force-directed layout engine (no DOM)
    nodes.ts         unified art+idea graph model
    wiki.tsx         Wikipedia link helpers + figure parsing
    wikiTitles.ts    label → Wikipedia article overrides
  components/
    ViewTabs, Filters, Gridlines, LocusRibbon,
    GanttView, RhizomeView, Drawer
  App.tsx          view + filter + selection state
  types.ts         the shared data model
```

To add a movement, edit `src/data/movements.ts`; to add a philosophical current,
`src/data/philosophy.ts`; to add an influence edge, `src/data/edges.ts`. Everything
else derives from those.
