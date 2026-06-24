const articlesContext = import.meta.glob('/src/articles/*.md', { eager: true, query: '?raw', import: 'default' })

const columnAliases = {
  rendering: ['rendering', '渲染'],
  game: ['game', '游戏'],
}

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
 * Get all articles in reverse chronological order, optionally filtered by locale.
 * @param {string} [locale] - 'zh' or 'en'; omit to get all languages
 */
export async function getArticles(locale) {
  const articles = []

  for (const [filepath, raw] of Object.entries(articlesContext)) {
    const basename = filepath.split('/').pop().replace(/\.md$/, '')
    const dotIdx = basename.lastIndexOf('.')
    if (dotIdx === -1) continue
    const slug = basename.slice(0, dotIdx)
    const lang = basename.slice(dotIdx + 1)
    if (locale && lang !== locale) continue

    const { meta, content } = parseFrontmatter(raw)
    articles.push({
      slug,
      lang,
      title: meta.title || slug,
      description: meta.description || '',
      date: meta.date || '',
      tag: meta.tag || '其他',
      column: meta.column || '',
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
 * Get articles filtered by locale AND column.
 * Accepts both Chinese and English column names (e.g. '渲染' or 'rendering' both match rendering column).
 * @param {string} locale - 'zh' or 'en'
 * @param {string} column - canonical column id, e.g. 'rendering', 'game'
 */
export async function getArticlesByColumn(locale, column) {
  const all = await getArticles(locale)
  const aliases = columnAliases[column] || [column]
  return all.filter((a) => aliases.includes(a.column))
}

/**
 * Get a single article by slug + locale.
 * @param {string} slug
 * @param {string} [locale] - 'zh' or 'en'; omit to search across all languages
 */
export async function getArticle(slug, locale) {
  const all = await getArticles(locale)
  return all.find((a) => a.slug === slug) || null
}
