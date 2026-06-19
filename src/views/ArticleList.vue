<template>
  <div class="posts container">
    <p class="page-label">{{ t('postsLabel') }}</p>
    <h1 class="page-title">{{ t('postsTitle') }}</h1>

    <div class="filters">
      <button
        v-for="tag in allTags"
        :key="tag"
        :class="['filter-btn', { active: activeTag === tag }]"
        @click="activeTag = tag"
      >
        {{ tag === '全部' && locale === 'en' ? t('all') : tag }}
      </button>
    </div>

    <div v-if="allArticles.length === 0" class="empty">{{ t('noPostsYet') }}</div>
    <div v-else-if="filtered.length === 0" class="empty">{{ t('noPosts') }}</div>

    <div v-else class="entry-list">
      <article
        v-for="article in filtered"
        :key="article.slug"
        class="entry-item"
      >
        <router-link :to="`/articles/${article.slug}`" class="entry-link">
          <div class="entry-meta">
            <time class="entry-date">{{ article.date }}</time>
            <span class="tag-pill">{{ article.tag }}</span>
          </div>
          <h2 class="entry-title">{{ article.title }}</h2>
          <p class="entry-desc">{{ article.description }}</p>
        </router-link>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getArticles } from '@/articles/loader'
import { useI18n } from '@/i18n'

const { locale, t } = useI18n()
const allArticles = ref([])
const activeTag = ref('全部')

onMounted(async () => {
  allArticles.value = await getArticles()
})

const allTags = computed(() => {
  const tags = new Set(allArticles.value.map((a) => a.tag))
  return ['全部', ...tags]
})

const filtered = computed(() => {
  if (activeTag.value === '全部') return allArticles.value
  return allArticles.value.filter((a) => a.tag === activeTag.value)
})
</script>

<style scoped>
.posts {
  padding: 3rem 1.5rem 2rem;
}

.page-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
  letter-spacing: 0.05em;
}

.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.8rem;
  margin-bottom: 2rem;
}

.filter-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
  cursor: pointer;
  font-family: inherit;
  transition: color 0.2s;
}

.filter-btn:hover {
  color: #fff;
}

.filter-btn.active {
  color: var(--accent);
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

.empty {
  color: var(--text-secondary);
  font-size: 0.9rem;
  padding: 2rem 0;
}
</style>
