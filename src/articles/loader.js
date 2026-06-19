// Dynamic article metadata + content loader
// Articles are markdown files imported at build time via Vite's glob import

const articlesContext = import.meta.glob('/src/articles/*.md', { eager: true, query: '?raw', import: 'default' })

/**
 * Parse frontmatter from raw markdown.
 * Expects: ---\nkey: value\n---\ncontent
 */
function parseFrontmatter(raw) {
  const meta = {}
  let content = raw

  if (raw.startsWith('---')) {
    const end = raw.indexOf('---', 3)
    if (end !== -1) {
      const front = raw.slice(3, end).trim()
      content = raw.slice(end + 3).trim()

      for (const line of front.split('\n')) {
        const colonIdx = line.indexOf(':')
        if (colonIdx === -1) continue
        const key = line.slice(0, colonIdx).trim()
        const value = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '')
        meta[key] = value
      }
    }
  }

  return { meta, content }
}

/**
 * Get all articles (sorted by date desc), each with slug + metadata.
 */
export async function getArticles() {
  const articles = []

  for (const [filepath, raw] of Object.entries(articlesContext)) {
    const slug = filepath.split('/').pop().replace(/\.md$/, '')
    const { meta, content } = parseFrontmatter(raw)

    articles.push({
      slug,
      title: meta.title || slug,
      description: meta.description || '',
      date: meta.date || '',
      tag: meta.tag || '其他',
      content,
    })
  }

  articles.sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return b.date.localeCompare(a.date)
  })

  return articles
}

/**
 * Get a single article by slug.
 */
export async function getArticle(slug) {
  const all = await getArticles()
  return all.find((a) => a.slug === slug) || null
}
