// Fetches representative artwork images for a movement from its Wikipedia article.
// Uses the Wikimedia REST API (CORS-enabled); results are cached per title.

export interface ArtImage {
  /** Thumbnail URL to display. */
  src: string
  /** The Wikimedia page describing the image (file page, or article as fallback). */
  page: string
}

const cache = new Map<string, Promise<ArtImage[]>>()

/** Build the file-description page URL from a thumbnail src and its File: title. */
function filePage(src: string, title: string): string {
  const host = src.includes('/wikipedia/commons/') ? 'commons.wikimedia.org' : 'en.wikipedia.org'
  const name = title.replace(/ /g, '_').replace(/[?#&+]/g, (c) => encodeURIComponent(c))
  return `https://${host}/wiki/${name}`
}

async function fetchImages(title: string): Promise<ArtImage[]> {
  const t = encodeURIComponent(title)
  // Primary: the article's media list — usually the works illustrating the movement.
  try {
    const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/media-list/${t}?redirect=true`)
    if (r.ok) {
      const d = await r.json()
      const imgs: ArtImage[] = (d.items ?? [])
        .filter(
          (it: { type?: string; srcset?: unknown[]; title?: string }) =>
            it.type === 'image' && it.srcset?.length && it.title,
        )
        .map((it: { srcset: { src: string }[]; title: string }) => {
          const src = 'https:' + it.srcset[it.srcset.length - 1].src
          return { src, page: filePage(src, it.title) }
        })
        .slice(0, 6)
      if (imgs.length) return imgs
    }
  } catch {
    /* fall through */
  }
  // Fallback: the single lead thumbnail from the page summary.
  try {
    const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${t}?redirect=true`)
    if (r.ok) {
      const d = await r.json()
      if (d.thumbnail?.source) {
        return [{ src: d.thumbnail.source as string, page: d.content_urls?.desktop?.page ?? d.thumbnail.source }]
      }
    }
  } catch {
    /* fall through */
  }
  return []
}

export function artImages(title: string): Promise<ArtImage[]> {
  let p = cache.get(title)
  if (!p) {
    p = fetchImages(title)
    cache.set(title, p)
  }
  return p
}
