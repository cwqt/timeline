import type { TradKey, Group, Current } from '../types'

export const traditions: Record<TradKey, Group> = {
  "humanism": {
    "name": "Humanism & the New Science",
    "color": "#b0a06a"
  },
  "earlymodern": {
    "name": "Reason, Sense & Enlightenment",
    "color": "#6d94a8"
  },
  "idealism": {
    "name": "Idealism → Will → Life",
    "color": "#cbb26b"
  },
  "social": {
    "name": "Positivism, Marx & Society",
    "color": "#7e9ba6"
  },
  "mind": {
    "name": "Mind, Time & the Unconscious",
    "color": "#a88bb0"
  },
  "existential": {
    "name": "Existence & Critique",
    "color": "#c98f6a"
  },
  "structural": {
    "name": "Sign, Structure & After",
    "color": "#8fa878"
  }
}

export const TRAD_KEYS = Object.keys(traditions) as TradKey[]

export const currents: Current[] = [
  {
    "trad": "humanism",
    "school": "Renaissance Humanism",
    "s": 1450,
    "e": 1600,
    "one": "Recover the ancients and place the dignity of human beings at the centre of learning.",
    "ideas": [
      "Return to the sources (ad fontes)",
      "The dignity & potential of man",
      "Rhetoric, letters & civic life",
      "Philology over scholastic logic"
    ],
    "thinkers": [
      "Petrarch",
      "Erasmus",
      "Pico della Mirandola",
      "Ficino"
    ],
    "ties": [
      "High Renaissance",
      "Mannerism"
    ]
  },
  {
    "trad": "humanism",
    "school": "Neoplatonism & Skepticism",
    "s": 1460,
    "e": 1595,
    "one": "Recovering Plato and the ancient skeptics — the soul's ascent to beauty, and the humbling question 'what do I know?'",
    "ideas": [
      "Ficino's revival of Plato",
      "The dignity of man (Pico)",
      "Beauty as a ladder to the divine",
      "Skeptical doubt (Montaigne)"
    ],
    "thinkers": [
      "Marsilio Ficino",
      "Pico della Mirandola",
      "Montaigne"
    ],
    "ties": [
      "High Renaissance",
      "Venetian Renaissance"
    ]
  },
  {
    "trad": "humanism",
    "school": "The Reformation",
    "s": 1517,
    "e": 1600,
    "one": "Scripture alone — humanist philology and the printing press shatter the unity of Western Christendom.",
    "ideas": [
      "Sola scriptura & faith alone",
      "Priesthood of all believers",
      "Print as the engine of reform",
      "Iconoclasm & the image debate"
    ],
    "thinkers": [
      "Martin Luther",
      "John Calvin",
      "Huldrych Zwingli"
    ],
    "ties": [
      "Northern Renaissance",
      "Dutch Golden Age",
      "Baroque"
    ]
  },
  {
    "trad": "humanism",
    "school": "Scientific Revolution",
    "s": 1543,
    "e": 1687,
    "one": "Nature is a book written in mathematics — knowledge comes by observation and law, not authority.",
    "ideas": [
      "Heliocentrism & a vast universe",
      "Experiment & mathematical law",
      "Mechanistic nature",
      "Knowledge is power (Bacon)"
    ],
    "thinkers": [
      "Copernicus",
      "Galileo",
      "Francis Bacon",
      "Kepler",
      "Newton"
    ],
    "ties": [
      "Baroque",
      "Rationalism",
      "Empiricism"
    ]
  },
  {
    "trad": "earlymodern",
    "school": "Social Contract & the State",
    "s": 1513,
    "e": 1762,
    "one": "On what authority does the state rest? From Machiavelli's cold realism to the consent of the governed.",
    "ideas": [
      "Virtù & raison d'état (Machiavelli)",
      "State of nature & the Leviathan (Hobbes)",
      "Consent & natural rights (Locke)",
      "The general will (Rousseau)"
    ],
    "thinkers": [
      "Machiavelli",
      "Thomas Hobbes",
      "John Locke",
      "Rousseau"
    ],
    "ties": [
      "The Enlightenment",
      "Neoclassicism"
    ]
  },
  {
    "trad": "earlymodern",
    "school": "Rationalism",
    "s": 1637,
    "e": 1716,
    "one": "Certain knowledge is built by reason alone, deduced from innate first principles.",
    "ideas": [
      "Cogito ergo sum (Descartes)",
      "Innate ideas & deduction",
      "Substance & God (Spinoza)",
      "Pre-established harmony (Leibniz)"
    ],
    "thinkers": [
      "René Descartes",
      "Spinoza",
      "Leibniz"
    ],
    "ties": [
      "Scientific Revolution",
      "German Idealism"
    ]
  },
  {
    "trad": "earlymodern",
    "school": "Empiricism",
    "s": 1689,
    "e": 1776,
    "one": "The mind is a blank slate — all knowledge is written on it by the senses and experience.",
    "ideas": [
      "Tabula rasa (Locke)",
      "Ideas from sensory experience",
      "To be is to be perceived (Berkeley)",
      "Scepticism about cause (Hume)"
    ],
    "thinkers": [
      "John Locke",
      "Berkeley",
      "David Hume"
    ],
    "ties": [
      "Scientific Revolution",
      "German Idealism"
    ]
  },
  {
    "trad": "earlymodern",
    "school": "The Enlightenment",
    "s": 1690,
    "e": 1800,
    "one": "Dare to know — reason, liberty, and progress against superstition and inherited authority.",
    "ideas": [
      "Reason & universal progress",
      "Liberty, rights & tolerance",
      "Critique of church & crown",
      "The encyclopedic spirit"
    ],
    "thinkers": [
      "Voltaire",
      "Rousseau",
      "Diderot",
      "Montesquieu",
      "Kant"
    ],
    "ties": [
      "Neoclassicism",
      "Romanticism",
      "German Idealism"
    ]
  },
  {
    "trad": "idealism",
    "school": "German Idealism",
    "s": 1781,
    "e": 1831,
    "one": "The mind actively constitutes reality; history unfolds as the dialectical self-realisation of Spirit.",
    "ideas": [
      "The mind shapes the world (Kant)",
      "Dialectic & the Absolute (Hegel)",
      "Freedom, spirit, becoming",
      "Art as sensuous appearance of the Idea"
    ],
    "thinkers": [
      "Immanuel Kant",
      "Fichte",
      "Hegel",
      "Schelling"
    ],
    "ties": [
      "Neoclassicism",
      "Romanticism"
    ]
  },
  {
    "trad": "idealism",
    "school": "Transcendentalism",
    "s": 1836,
    "e": 1865,
    "one": "Intuition and Nature over doctrine — the divine found in the self and the wild.",
    "ideas": [
      "Self-reliance & intuition",
      "Nature as spiritual text",
      "The individual conscience"
    ],
    "thinkers": [
      "Emerson",
      "Thoreau"
    ],
    "ties": [
      "Romanticism",
      "Symbolism"
    ]
  },
  {
    "trad": "idealism",
    "school": "Schopenhauer",
    "s": 1818,
    "e": 1880,
    "one": "Behind appearances churns a blind, striving Will; art briefly stills its torment.",
    "ideas": [
      "The World as Will & Representation",
      "Pessimism & suffering",
      "Art/music as escape from the will",
      "A new aesthetics"
    ],
    "thinkers": [
      "Arthur Schopenhauer"
    ],
    "ties": [
      "Symbolism",
      "Decadence"
    ]
  },
  {
    "trad": "idealism",
    "school": "Nietzsche",
    "s": 1872,
    "e": 1901,
    "one": "God is dead — so create values. The Apollonian dream and Dionysian frenzy at the root of art.",
    "ideas": [
      "Apollonian vs Dionysian",
      "Will to power",
      "Revaluation of all values",
      "Art as life's highest task"
    ],
    "thinkers": [
      "Friedrich Nietzsche"
    ],
    "ties": [
      "Decadence",
      "Symbolism",
      "Expressionism",
      "Futurism"
    ]
  },
  {
    "trad": "social",
    "school": "Utilitarianism",
    "s": 1789,
    "e": 1873,
    "one": "The greatest happiness of the greatest number — morality and law recast as a calculus of pleasure and pain.",
    "ideas": [
      "The greatest-happiness principle",
      "The pleasure/pain calculus (Bentham)",
      "Liberty & the harm principle (Mill)",
      "Reform of law & society"
    ],
    "thinkers": [
      "Jeremy Bentham",
      "John Stuart Mill"
    ],
    "ties": [
      "Realism",
      "Positivism"
    ]
  },
  {
    "trad": "social",
    "school": "Positivism",
    "s": 1830,
    "e": 1885,
    "one": "Only the observable and verifiable counts as knowledge; society advances by science.",
    "ideas": [
      "Empirical, verifiable knowledge",
      "Faith in progress",
      "A science of society"
    ],
    "thinkers": [
      "Auguste Comte"
    ],
    "ties": [
      "Realism",
      "Impressionism"
    ]
  },
  {
    "trad": "social",
    "school": "Eugenics",
    "s": 1883,
    "e": 1945,
    "one": "The pseudo-scientific project of 'improving' the human stock by controlling heredity — Darwinism twisted into social policy.",
    "ideas": [
      "Heredity as social destiny",
      "Selective breeding & sterilisation",
      "Biometrics & the 'normal' (Galton, Pearson)",
      "Race science & 'degeneration'"
    ],
    "thinkers": [
      "Francis Galton",
      "Herbert Spencer",
      "Karl Pearson",
      "Charles Davenport"
    ],
    "ties": [
      "Positivism",
      "Decadence",
      "Nazism"
    ]
  },
  {
    "trad": "social",
    "school": "Nazism",
    "s": 1920,
    "e": 1945,
    "one": "A genocidal ideology of racial supremacy, blood-and-soil nationalism, and total state — the catastrophe modern reason failed to prevent.",
    "ideas": [
      "Racial 'science' & antisemitism",
      "Volk, blood & soil",
      "The total, führer state",
      "War on 'degenerate' modern art"
    ],
    "thinkers": [
      "Adolf Hitler",
      "Alfred Rosenberg",
      "Houston Stewart Chamberlain"
    ],
    "ties": [
      "Eugenics",
      "Bauhaus",
      "Critical Theory"
    ]
  },
  {
    "trad": "social",
    "school": "Marxism",
    "s": 1848,
    "e": 1920,
    "one": "Material conditions and class struggle drive history; culture is shaped by the economic base.",
    "ideas": [
      "Historical materialism",
      "Class, labour & alienation",
      "Ideology & base/superstructure",
      "Art as social product"
    ],
    "thinkers": [
      "Karl Marx",
      "Friedrich Engels"
    ],
    "ties": [
      "Realism",
      "Constructivism / De Stijl"
    ]
  },
  {
    "trad": "social",
    "school": "Pragmatism",
    "s": 1878,
    "e": 1940,
    "one": "Truth is what works — meaning lives in an idea's practical, experiential consequences.",
    "ideas": [
      "Truth as consequence",
      "Experience over absolutes",
      "Instrumentalism"
    ],
    "thinkers": [
      "Charles Peirce",
      "William James",
      "John Dewey"
    ],
    "ties": [
      "Abstract Expressionism"
    ]
  },
  {
    "trad": "mind",
    "school": "Bergsonism",
    "s": 1889,
    "e": 1935,
    "one": "Real time is lived duration, grasped by intuition — a flux the intellect can only freeze.",
    "ideas": [
      "Durée — lived time",
      "Intuition over intellect",
      "Élan vital",
      "Simultaneity & flux"
    ],
    "thinkers": [
      "Henri Bergson"
    ],
    "ties": [
      "Cubism",
      "Futurism"
    ]
  },
  {
    "trad": "mind",
    "school": "Psychoanalysis",
    "s": 1899,
    "e": 1961,
    "one": "Beneath the waking self runs the unconscious — desire, dream-work, and repression.",
    "ideas": [
      "The unconscious",
      "Dream-work & symbolism",
      "Repression & the drives",
      "Archetypes (Jung)"
    ],
    "thinkers": [
      "Sigmund Freud",
      "Carl Jung"
    ],
    "ties": [
      "Expressionism",
      "Surrealism"
    ]
  },
  {
    "trad": "mind",
    "school": "Phenomenology",
    "s": 1900,
    "e": 1961,
    "one": "Return to the things themselves — describe lived, embodied perception before theory.",
    "ideas": [
      "Back to the things themselves (Husserl)",
      "Lived, embodied perception",
      "Being-in-the-world (Heidegger)",
      "The body & the object (Merleau-Ponty)"
    ],
    "thinkers": [
      "Edmund Husserl",
      "Maurice Merleau-Ponty"
    ],
    "ties": [
      "Abstract Expressionism",
      "Minimalism"
    ]
  },
  {
    "trad": "existential",
    "school": "Critical Theory",
    "s": 1923,
    "e": 1975,
    "one": "The Frankfurt School turns Marx on culture: the 'culture industry' and the artwork's fate in the age of reproduction.",
    "ideas": [
      "The culture industry",
      "Aura & mechanical reproduction (Benjamin)",
      "Negative dialectics (Adorno)",
      "Art: critique or complicity"
    ],
    "thinkers": [
      "Theodor Adorno",
      "Walter Benjamin",
      "Herbert Marcuse"
    ],
    "ties": [
      "Dada",
      "Pop Art",
      "Conceptual Art"
    ]
  },
  {
    "trad": "existential",
    "school": "Existentialism",
    "s": 1927,
    "e": 1965,
    "one": "Existence precedes essence — in an absurd world the self is made through the free act.",
    "ideas": [
      "Existence precedes essence",
      "The absurd & authenticity",
      "Freedom, dread, the act",
      "Being & Time (Heidegger)"
    ],
    "thinkers": [
      "Jean-Paul Sartre",
      "Albert Camus",
      "Simone de Beauvoir",
      "Martin Heidegger"
    ],
    "ties": [
      "Abstract Expressionism"
    ]
  },
  {
    "trad": "structural",
    "school": "Structuralism",
    "s": 1949,
    "e": 1968,
    "one": "Meaning arises not from things but from their place in a system of differences.",
    "ideas": [
      "The sign: signifier / signified",
      "Meaning from structure & difference",
      "Myth & deep structure (Lévi-Strauss)"
    ],
    "thinkers": [
      "Claude Lévi-Strauss",
      "Ferdinand de Saussure",
      "Roland Barthes"
    ],
    "ties": [
      "Minimalism",
      "Conceptual Art"
    ]
  },
  {
    "trad": "structural",
    "school": "Poststructuralism",
    "s": 1966,
    "e": 1995,
    "one": "No stable meaning, no origin, no author — only endless play, difference, and power.",
    "ideas": [
      "Différance, no fixed meaning (Derrida)",
      "Power / knowledge (Foucault)",
      "Death of the author (Barthes)",
      "Institutional critique"
    ],
    "thinkers": [
      "Jacques Derrida",
      "Michel Foucault",
      "Gilles Deleuze",
      "Roland Barthes"
    ],
    "ties": [
      "Conceptual Art",
      "Postmodernism",
      "Relational / Institutional"
    ]
  },
  {
    "trad": "structural",
    "school": "Postmodern Theory",
    "s": 1979,
    "e": 2000,
    "one": "Incredulity toward grand narratives; the real dissolves into circulating simulacra.",
    "ideas": [
      "End of metanarratives (Lyotard)",
      "Simulacra & hyperreality (Baudrillard)",
      "Late-capitalist pastiche (Jameson)"
    ],
    "thinkers": [
      "Jean-François Lyotard",
      "Jean Baudrillard",
      "Fredric Jameson"
    ],
    "ties": [
      "Postmodernism",
      "Neo-Expressionism"
    ]
  },
  {
    "trad": "structural",
    "school": "Posthumanism & Accelerationism",
    "s": 1985,
    "e": 2029,
    "one": "Cyborgs, networks, and runaway technical acceleration unsettle the human as the measure of art.",
    "ideas": [
      "The cyborg & posthuman (Haraway)",
      "Networks & control",
      "Accelerationism",
      "The algorithmic & machinic"
    ],
    "thinkers": [
      "Donna Haraway",
      "Gilles Deleuze",
      "Nick Land"
    ],
    "ties": [
      "Post-Internet / New Media",
      "AI / Post-Digital / Now"
    ]
  }
]
