import type { EventType, HistEvent } from '../types'

/** Colour + label for each event category, used by the markers, legend, and drawer. */
export const eventKinds: Record<EventType, { label: string; color: string }> = {
  war: { label: 'War & conflict', color: '#e0483a' },
  revolution: { label: 'Revolution', color: '#e8913c' },
  science: { label: 'Science & discovery', color: '#5aa9e0' },
  tech: { label: 'Technology & media', color: '#4fc0a8' },
  society: { label: 'Society & belief', color: '#b98cd6' },
}

/** Historical inflection points — coloured vertical markers on the timeline. */
export const events: HistEvent[] = [
  {
    year: 1440,
    label: "Gutenberg's press",
    type: 'tech',
    one: 'Movable-type printing makes the written word cheap, fast, and everywhere.',
    detail:
      'Around 1440 Johannes Gutenberg combined movable metal type, oil-based ink, and the screw press into a system that could reproduce texts by the thousand.',
    impact:
      'It detonated the spread of Humanism, the Reformation, and the Scientific Revolution — ideas could now outrun any authority trying to contain them.',
  },
  {
    year: 1453,
    label: 'Fall of Constantinople',
    type: 'war',
    one: 'The Byzantine capital falls to the Ottomans, scattering Greek scholars west.',
    detail:
      'In 1453 Mehmed II took Constantinople, ending the thousand-year Byzantine Empire and severing the old overland routes east.',
    impact:
      'Fleeing scholars carried Greek manuscripts into Italy, feeding the Renaissance revival of classical learning.',
  },
  {
    year: 1492,
    label: 'Columbus · New World',
    type: 'science',
    one: 'Sustained European contact with the Americas remakes the map of the world.',
    detail:
      "Columbus's 1492 crossing opened lasting contact between Europe and the Americas, launching conquest, colonisation, and the Columbian exchange.",
    impact:
      'New wealth, peoples, and doubts about the completeness of ancient knowledge unsettled the European worldview — and funded its art.',
  },
  {
    year: 1517,
    label: "Luther's 95 Theses",
    type: 'society',
    one: 'A challenge to indulgences splits Western Christianity.',
    detail:
      "In 1517 Martin Luther's theses against the sale of indulgences, printed and circulated widely, ignited the Protestant Reformation.",
    impact:
      'The rupture reshaped patronage, provoked waves of iconoclasm, and reopened the question of what religious art was even for.',
  },
  {
    year: 1524,
    end: 1648,
    label: 'European wars of religion',
    type: 'war',
    one: 'A century of confessional war convulses Europe after the Reformation.',
    detail:
      "From the 1520s to the Peace of Westphalia in 1648, waves of war between Catholics and Protestants tore across the continent — the French Wars of Religion, the Eighty Years' War, and the Thirty Years' War among them.",
    impact:
      'The bloodshed discredited religious authority over the state, drove the turn toward secular reason and toleration, and fixed the confessional map that shaped patronage and iconoclasm for generations.',
  },
  {
    year: 1543,
    label: 'Copernican revolution',
    type: 'science',
    one: 'The Earth is dislodged from the centre of the cosmos.',
    detail:
      "Copernicus's 'On the Revolutions of the Heavenly Spheres' (1543) placed the Sun, not the Earth, at the centre of the heavens.",
    impact:
      "It opened the Scientific Revolution and the slow dethroning of humanity's assumed place in creation.",
  },
  {
    year: 1618,
    end: 1648,
    label: "Thirty Years' War",
    type: 'war',
    one: 'Religious and dynastic war devastates Central Europe.',
    detail:
      "From 1618 to 1648 one of history's most destructive wars ravaged the Holy Roman Empire, ending with the Peace of Westphalia.",
    impact:
      'Its settlement founded the modern order of sovereign states and hardened the confessional map of Europe.',
  },
  {
    year: 1687,
    label: "Newton's Principia",
    type: 'science',
    one: 'One set of laws governs apple and planet alike.',
    detail:
      "Newton's 'Principia' (1687) unified terrestrial and celestial motion under universal gravitation and mathematical law.",
    impact:
      'It became the very model of Enlightenment reason — a clockwork universe knowable by the human intellect.',
  },
  {
    year: 1760,
    end: 1840,
    label: 'Industrial Revolution',
    type: 'tech',
    one: 'Steam, factory, and machine remake work, cities, and time itself.',
    detail:
      'From about 1760 mechanised production, the steam engine, and the factory system transformed Britain and then the world.',
    impact:
      'It created the industrial city and the modern working class — and the alienation that Realism, Marxism, and Romantic revolt all answered.',
  },
  {
    year: 1776,
    label: 'American Revolution',
    type: 'revolution',
    one: 'Thirteen colonies declare a republic founded on natural rights.',
    detail:
      'The 1776 Declaration of Independence turned Enlightenment ideas of consent and natural rights into a founding act of state.',
    impact:
      'It proved Enlightenment political theory could actually build nations, emboldening the revolutions to come.',
  },
  {
    year: 1789,
    label: 'French Revolution',
    type: 'revolution',
    one: 'Liberty, equality, fraternity — and the fall of the old order.',
    detail:
      'Beginning in 1789, the Revolution toppled the French monarchy and aristocracy in the name of universal rights, before descending into Terror.',
    impact:
      'It ended the world of aristocratic patronage and set the political weather for Romanticism and every modern ideology.',
  },
  {
    year: 1815,
    label: 'Waterloo · Congress of Vienna',
    type: 'war',
    one: "Napoleon falls; Europe's powers redraw the map.",
    detail:
      "Napoleon's 1815 defeat at Waterloo and the Congress of Vienna restored monarchies and engineered a conservative balance of power.",
    impact:
      'The restored order provoked the Romantic cult of the rebel and the revolutions that broke out a generation later.',
  },
  {
    year: 1848,
    label: 'Revolutions of 1848',
    type: 'revolution',
    one: 'A wave of liberal and national uprisings sweeps Europe.',
    detail:
      "In 1848 revolutions erupted across the continent demanding constitutions, national self-rule, and workers' rights.",
    impact:
      "Their mixed failure pushed art toward Realism and politics toward Marx's harder analysis of class.",
  },
  {
    year: 1859,
    label: "Darwin's Origin of Species",
    type: 'science',
    one: 'Life is shaped by natural selection, not design.',
    detail:
      "Darwin's 1859 'On the Origin of Species' argued that species evolve through variation and natural selection.",
    impact:
      'It shook religious certainty and fed Naturalism, determinism, and a new, anxious image of the human animal.',
  },
  {
    year: 1905,
    label: 'Einstein · relativity',
    type: 'science',
    one: 'Space and time bend; the absolute frame dissolves.',
    detail:
      "Einstein's 1905 papers on special relativity — and later general relativity — overturned Newton's absolute space and time.",
    impact:
      "The new physics rhymed with Cubism and Modernism's shattering of the single fixed viewpoint.",
  },
  {
    year: 1914,
    end: 1918,
    label: 'World War I',
    type: 'war',
    one: 'Industrial slaughter ends the long nineteenth century.',
    detail:
      'From 1914 to 1918 mechanised total war killed millions and collapsed four empires.',
    impact:
      "Its trauma birthed Dada's anti-art, fed Surrealism, and shattered faith in progress and reason.",
  },
  {
    year: 1917,
    label: 'Russian Revolution',
    type: 'revolution',
    one: 'The Bolsheviks seize power and build the first Marxist state.',
    detail:
      'In 1917 revolution overthrew the Tsar and brought the Bolsheviks to power, founding what became the Soviet Union.',
    impact:
      "It turned Marxism into a governing project and fired Constructivism's dream of art in service of a new society.",
  },
  {
    year: 1929,
    label: 'Wall Street Crash',
    type: 'society',
    one: 'Markets collapse into the Great Depression.',
    detail:
      'The 1929 crash wiped out fortunes and tipped the industrial world into a decade of mass unemployment.',
    impact:
      'The crisis radicalised politics, fed extremism, and darkened the art and thought of the 1930s.',
  },
  {
    year: 1939,
    end: 1945,
    label: 'World War II',
    type: 'war',
    one: 'Total war, genocide, and the atomic bomb.',
    detail:
      'From 1939 to 1945 the deadliest conflict in history ended with the Holocaust exposed and nuclear weapons unleashed.',
    impact:
      'Its horrors moved the art world to New York and drove Existentialism, Abstract Expressionism, and postwar doubt.',
  },
  {
    year: 1969,
    label: 'Moon landing',
    type: 'tech',
    one: 'Humans walk on another world.',
    detail:
      'In 1969 Apollo 11 landed the first people on the Moon, watched live by hundreds of millions.',
    impact:
      'The image of Earth from space and the peak of techno-optimism shaped a media-saturated, planetary imagination.',
  },
  {
    year: 1989,
    label: 'Fall of the Berlin Wall',
    type: 'revolution',
    one: "The Cold War's great division comes down.",
    detail:
      'In 1989 the Berlin Wall fell, and with it the Soviet bloc began to unravel.',
    impact:
      "The 'end of history' mood and accelerating globalisation reshaped a contemporary art world with no single centre.",
  },
  {
    year: 1991,
    label: 'The World Wide Web',
    type: 'tech',
    one: 'Information becomes a public, linked, global commons.',
    detail:
      'In 1991 Tim Berners-Lee released the World Wide Web to the public, layering hyperlinks over the internet.',
    impact:
      'It dissolved authorship into circulation and networks — the ground of Post-Internet art and the digital everyday.',
  },
  {
    year: 2001,
    label: 'September 11',
    type: 'war',
    one: 'Attacks on the United States reset the global mood.',
    detail:
      'On 11 September 2001 coordinated attacks destroyed the World Trade Center and killed nearly 3,000 people.',
    impact:
      'The ensuing era of surveillance, war, and anxiety saturated twenty-first-century art and politics.',
  },
  {
    year: 2007,
    label: 'The smartphone',
    type: 'tech',
    one: 'A networked camera and computer in every pocket.',
    detail:
      'The 2007 iPhone fused phone, camera, and internet into a mass consumer device, launching the smartphone era.',
    impact:
      'Constant capture and sharing made everyone an image-maker and built the attention economy art now inhabits.',
  },
  {
    year: 2022,
    label: 'Generative AI',
    type: 'tech',
    one: 'Machines that generate image and text on demand go mainstream.',
    detail:
      'In 2022 diffusion image models and large language models reached the public, producing convincing pictures and prose from a prompt.',
    impact:
      'They reopened the oldest questions of authorship, originality, and craft that this whole timeline has been arguing over.',
  },
]
