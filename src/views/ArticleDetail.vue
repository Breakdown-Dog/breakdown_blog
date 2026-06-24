<template>
  <div class="detail container">
    <div v-if="loading" class="status">{{ t('loading') }}</div>
    <div v-else-if="error" class="status error">{{ error }}</div>
    <template v-else>
      <article>
        <header class="article-header">
          <div class="article-meta">
            <time class="article-date">{{ article.date }}</time>
            <span class="tag-pill">{{ article.tag }}</span>
          </div>
          <h1 class="article-title">{{ article.title }}</h1>
        </header>
        <div class="article-content" v-html="renderedContent"></div>
      </article>
      <div class="nav-back">
        <router-link to="/articles">{{ t('back') }}</router-link>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Marked } from 'marked'
import hljs from 'highlight.js'
import { getArticle } from '@/articles/loader'
import { useI18n } from '@/i18n'

const { t, locale } = useI18n()
const route = useRoute()
const article = ref(null)
const loading = ref(true)
const error = ref(null)

const marked = new Marked({
  gfm: true,
  breaks: true,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch {}
    }
    return hljs.highlightAuto(code).value
  },
})

const renderedContent = computed(() => {
  if (!article.value) return ''
  return marked.parse(article.value.content)
})

async function loadArticle() {
  loading.value = true
  error.value = null
  try {
    const slug = route.params.slug
    article.value = await getArticle(slug, locale.value)
    if (!article.value) {
      error.value = t('notFound')
    }
  } catch (e) {
    error.value = t('loadFailed') + e.message
  } finally {
    loading.value = false
  }
}

onMounted(loadArticle)
watch(locale, loadArticle)
</script>

<style scoped>
.detail {
  padding: 3rem 1.5rem 2rem;
}

.status {
  padding: 4rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.status.error {
  color: #f87171;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.article-date {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
}

.article-title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.25;
  color: #fff;
  margin-bottom: 2rem;
}

.nav-back {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.9rem;
}

.nav-back a {
  color: var(--text-secondary);
}

.nav-back a:hover {
  color: var(--accent);
}
</style>
