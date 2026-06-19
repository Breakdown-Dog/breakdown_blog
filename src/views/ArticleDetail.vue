<template>
  <div class="article-detail container">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else>
      <article class="article">
        <header class="article-header">
          <div class="article-meta">
            <span class="article-tag">{{ article.tag }}</span>
            <time class="article-date">{{ article.date }}</time>
          </div>
          <h1 class="article-title">{{ article.title }}</h1>
        </header>
        <div class="article-content" v-html="renderedContent"></div>
      </article>
      <div class="nav-back">
        <router-link to="/articles">&larr; 返回文章列表</router-link>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Marked } from 'marked'
import hljs from 'highlight.js'
import { getArticle } from '@/articles/loader'

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

onMounted(async () => {
  try {
    const slug = route.params.slug
    article.value = await getArticle(slug)
    if (!article.value) {
      error.value = '文章未找到'
    }
  } catch (e) {
    error.value = '加载文章失败: ' + e.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.article-detail {
  padding: 3rem 1.5rem;
}

.loading,
.error {
  text-align: center;
  padding: 4rem 0;
  font-size: 1.1rem;
}

.error {
  color: #dc2626;
}

.article-header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.article-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 4px;
}

.article-date {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.article-title {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.nav-back {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.95rem;
}
</style>
