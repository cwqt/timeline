import type { LocusSeg } from '../types'

/** Historical epoch — the broad periods of Western history that frame everything else. */
export const epoch: LocusSeg[] = [
  {
    label: 'Late Middle Ages',
    s: 1385,
    e: 1500,
    color: '#8a8172',
    gloss: 'the tail of the medieval order — faith, hierarchy, the manor',
    detail:
      'The closing centuries of the medieval world, before the ruptures of print and discovery: a society ordered by the Church, feudal hierarchy, and the agrarian manor, its worldview still framed by a fixed, God-given cosmos.',
  },
  {
    label: 'Early Modern',
    s: 1500,
    e: 1789,
    color: '#b09256',
    gloss: 'print, discovery, reformation & the rise of the state',
    detail:
      'The period between the medieval and the modern — roughly 1500 to the French Revolution — defined by the printing press, European expansion, the Reformation, the Scientific Revolution, and the consolidation of centralised states.',
  },
  {
    label: 'Modernity',
    s: 1789,
    e: 1945,
    color: '#7e8fb0',
    gloss: 'revolution, industry, the nation & the autonomous individual',
    detail:
      'From the Age of Revolutions: an era of industrial capitalism, nation-states, secularisation, and the autonomous individual — the world of progress, the machine, and the modern self that the avant-gardes both celebrated and attacked.',
  },
  {
    label: 'The Contemporary',
    s: 1945,
    e: 2032,
    color: '#b06a9a',
    gloss: 'postwar, postmodern, global & digital',
    detail:
      'The postwar era and after — mass media, decolonisation, globalisation, the digital, and the postmodern suspicion of grand narratives; the present in which every earlier epoch is available at once.',
  },
]
