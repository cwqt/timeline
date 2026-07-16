import type { LocusSeg } from '../types'

/** Modes of production — the dominant way wealth is made and organised, and how it succeeds itself. */
export const production: LocusSeg[] = [
  {
    label: 'Feudalism',
    s: 1385,
    e: 1500,
    color: '#8a6d4b',
    gloss: 'land, lords & serfs — wealth is held in the manor and the fief',
    detail:
      'In the late-medieval economy, power rested on land held in a chain of obligation — lords granted fiefs in exchange for service, and serfs worked the manor. Production was agrarian, local, and bound by custom rather than markets.',
  },
  {
    label: 'Mercantilism',
    s: 1500,
    e: 1760,
    color: '#b5894a',
    gloss: "merchant capital, colonies & the crown's race for bullion",
    detail:
      'From about 1500, merchant capital, chartered companies, and colonial plunder drove an economy organised around long-distance trade and the accumulation of bullion. States and merchants allied to hoard specie, protect home industry, and monopolise commerce.',
  },
  {
    label: 'Industrial Capitalism',
    s: 1760,
    e: 1945,
    color: '#9a5a4a',
    gloss: 'the factory, wage labour & the self-regulating market',
    detail:
      'The Industrial Revolution put the factory, the machine, and the wage labourer at the centre of the economy. Production became mass, urban, and driven by profit in a self-regulating market — the world Marx dissected and Realism painted.',
  },
  {
    label: 'Managed Capitalism',
    s: 1945,
    e: 1975,
    color: '#6f9a7a',
    gloss: 'Fordist mass production, the welfare state & the postwar boom',
    detail:
      'After 1945, Fordist mass production, strong unions, Keynesian demand management, and the welfare state produced three decades of broad-based growth — the "great compression" in which inequality fell to its lowest.',
  },
  {
    label: 'Neoliberalism',
    s: 1975,
    e: 2010,
    color: '#6d8fc0',
    gloss: 'deregulation, finance & the global free market',
    detail:
      'From the mid-1970s, deregulation, privatisation, globalised trade, and the ascendancy of finance remade capitalism around the free market — reversing the postwar compression and sending inequality climbing again.',
  },
  {
    label: 'Platform Capitalism',
    s: 2010,
    e: 2032,
    color: '#b98cd6',
    gloss: 'data, networks & rent extracted from the platform',
    detail:
      'In the digital era, value increasingly flows to the networks and platforms that intermediate everything — extracting rent from data, attention, and the labour of users, and concentrating wealth in a handful of firms.',
  },
]
