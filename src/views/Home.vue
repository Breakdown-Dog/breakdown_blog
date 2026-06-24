<template>
  <div class="home">
    <section class="intro container">
      <p class="intro-label">{{ t('about') }}</p>
      <h1 class="intro-title">{{ t('homeTitle') }}</h1>
      <p class="intro-desc">{{ t('homeDesc') }}</p>
    </section>

    <section class="recent container">
      <p class="section-label">{{ t('recent') }}</p>
      <div v-if="recentArticles.length === 0" class="empty-state">{{ t('noPostsYet') }}</div>
      <div v-else class="entry-list">
        <article
          v-for="article in recentArticles"
          :key="article.slug"
          class="entry-item"
        >
          <router-link :to="`/articles/${article.slug}`" class="entry-link">
            <div class="entry-meta">
              <time class="entry-date">{{ article.date }}</time>
              <span class="tag-pill">{{ article.tag }}</span>
              <span class="column-pill">{{ article.column }}</span>
            </div>
            <h2 class="entry-title">{{ article.title }}</h2>
            <p class="entry-desc">{{ article.description }}</p>
          </router-link>
        </article>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getArticles } from '@/articles/loader'
import { useI18n } from '@/i18n'

const { t, locale } = useI18n()
const recentArticles = ref([])

async function loadArticles() {
  const all = await getArticles(locale.value)
  recentArticles.value = all.slice(0, 5)
}

onMounted(loadArticles)
watch(locale, loadArticles)
</script>

<style scoped>
.home {
  padding: 4rem 0 2rem;
}

.intro {
  margin-bottom: 4rem;
}

.intro-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.intro-title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
  max-width: 520px;
}

.intro-desc {
  margin-top: 0.75rem;
  font-size: 0.95rem;
  color: var(--text-secondary);
  max-width: 420px;
  line-height: 1.6;
}

.section-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.entry-list {
  list-style: none;
}

.entry-item {
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.entry-item:first-child {
  padding-top: 0;
}

.entry-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.entry-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.3rem;
}

.entry-date {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
}

.entry-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #fff;
  transition: color 0.2s;
  line-height: 1.4;
}

.entry-link:hover .entry-title {
  color: var(--accent);
}

.entry-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 0.2rem;
  line-height: 1.5;
}

.column-pill {
  font-size: 0.7rem;
  color: #c084fc;
  background: rgba(192, 132, 252, 0.12);
  padding: 0.08rem 0.45rem;
  border-radius: 4px;
  letter-spacing: 0.03em;
}

.view-all {
  display: inline-block;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--accent);
}

.view-all:hover {
  color: var(--accent-hover);
}

.empty-state {
  color: var(--text-secondary);
  font-size: 0.9rem;
  padding: 1rem 0;
}
</style>
