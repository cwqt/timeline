import type { EraKey, Group } from '../types'

export const eras: Record<EraKey, Group> = {
  "renaissance": {
    "name": "Renaissance & Mannerism",
    "color": "#c99a4e"
  },
  "baroque": {
    "name": "Baroque & Rococo",
    "color": "#a85c4a"
  },
  "reason": {
    "name": "Enlightenment & Reason",
    "color": "#7f9cc0"
  },
  "romantic": {
    "name": "The Romantic Turn",
    "color": "#d98a5b"
  },
  "realist": {
    "name": "The Realist Break",
    "color": "#8fae6a"
  },
  "interior": {
    "name": "The Aesthetic Interior",
    "color": "#b088d6"
  },
  "rupture": {
    "name": "The Modern Rupture",
    "color": "#e0655f"
  },
  "postwar": {
    "name": "Postwar & Concept",
    "color": "#5cc0b8"
  },
  "contemp": {
    "name": "Postmodern & Contemporary",
    "color": "#e06fae"
  }
}

export const ERA_KEYS = Object.keys(eras) as EraKey[]
