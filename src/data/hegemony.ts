import type { LocusSeg } from '../types'

/** Cultural hegemony — the dominant institution that commissions, censors,
 *  and defines legitimate culture, and how that authority passes hands. */
export const hegemony: LocusSeg[] = [
  {
    label: 'THE CHURCH',
    s: 1385,
    e: 1650,
    color: '#c29a45',
    gloss: 'the Roman Church commissions the sacred image and arbitrates truth',
    detail:
      'For centuries the Roman Catholic Church was the supreme patron and censor of Western culture. It commissioned the altarpiece and the fresco, defined orthodoxy and heresy, and made the sacred image the central task of art — a monopoly cracked only by the printing press, the Reformation, and the new science.',
  },
  {
    label: 'THE CROWN & COURT',
    s: 1650,
    e: 1789,
    color: '#8a7bc0',
    gloss: 'absolutist courts & royal academies dictate patronage and taste',
    detail:
      'After the wars of religion, absolutist monarchs and their courts became the arbiters of taste. Royal academies set the rules, Versailles staged power as spectacle, and aristocratic patronage decided what counted as art — until the French Revolution swept the old order away.',
  },
  {
    label: 'THE BOURGEOIS STATE',
    s: 1789,
    e: 1900,
    color: '#7e9ba6',
    gloss: 'nation, public museum & salon — the middle class as patron',
    detail:
      'The nineteenth century handed cultural authority to the nation-state and the rising middle class. The public museum, the official Salon, and the academy defined legitimacy, while the bourgeoisie became the new patron — and the target of avant-garde revolt.',
  },
  {
    label: 'THE MARKET & MEDIA',
    s: 1900,
    e: 2000,
    color: '#5fb09a',
    gloss: 'dealers, galleries & mass media — the culture industry',
    detail:
      'In the twentieth century, dealers, galleries, critics, and museums — and increasingly mass media — set value. The dealer-critic system replaced the Salon; the culture industry, as Adorno named it, turned art and entertainment into commodities produced at scale.',
  },
  {
    label: 'THE PLATFORM',
    s: 2000,
    e: 2032,
    color: '#e06fae',
    gloss: 'Big Tech, the attention economy & the algorithmic feed',
    detail:
      'Cultural power now concentrates in technology platforms. Feeds, recommendation algorithms, and the attention economy decide what is seen and what disappears; the platform is patron, distributor, and censor at once — and, with generative models, increasingly the maker too.',
  },
]
