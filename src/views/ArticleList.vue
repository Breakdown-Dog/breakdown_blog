<template>
  <div class="article-list container">
    <h1 class="page-title">所有文章</h1>

    <div class="filter-bar">
      <button
        v-for="tag in allTags"
        :key="tag"
        :class="['filter-btn', { active: activeTag === tag }]"
        @click="activeTag = tag"
      >
        {{ tag }}
      </button>
    </div>

    <div v-if="filtered.length === 0" class="empty">暂无文章</div>

    <div v-else class="list">
      <article
        v-for="article in filtered"
        :key="article.slug"
        class="list-card"
      >
        <router-link :to="`/articles/${article.slug}`" class="list-card-link">
          <div class="list-card-meta">
            <span class="list-card-tag">{{ article.tag }}</span>
            <time class="list-card-date">{{ article.date }}</time>
          </div>
          <h2 class="list-card-title">{{ article.title }}</h2>
          <p class="list-card-desc">{{ article.description }}</p>
        </router-link>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getArticles } from '@/articles/loader'

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
.article-list {
  padding: 3rem 1.5rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.filter-btn {
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.filter-btn.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  transition: box-shadow 0.2s, transform 0.15s;
}

.list-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.list-card-link {
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.list-card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.list-card-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 4px;
}

.list-card-date {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.list-card-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: var(--text);
}

.list-card-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.empty {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-secondary);
  font-size: 1.1rem;
}
</style>
