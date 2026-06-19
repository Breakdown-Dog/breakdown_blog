<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">深入探索技术本质</h1>
        <p class="hero-subtitle">
          从底层原理到工程实践，用清晰的思路拆解每一个技术难题
        </p>
        <router-link to="/articles" class="hero-cta">浏览文章 &rarr;</router-link>
      </div>
    </section>

    <section class="container recent-section">
      <h2 class="section-title">最新文章</h2>
      <div class="article-grid">
        <article
          v-for="article in recentArticles"
          :key="article.slug"
          class="article-card"
        >
          <router-link :to="`/articles/${article.slug}`" class="card-link">
            <div class="card-meta">
              <span class="card-tag">{{ article.tag }}</span>
              <time class="card-date">{{ article.date }}</time>
            </div>
            <h3 class="card-title">{{ article.title }}</h3>
            <p class="card-desc">{{ article.description }}</p>
          </router-link>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getArticles } from '@/articles/loader'

const recentArticles = ref([])

onMounted(async () => {
  const all = await getArticles()
  recentArticles.value = all.slice(0, 6)
})
</script>

<style scoped>
.home {
  padding-bottom: 3rem;
}

.hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #fff;
  padding: 5rem 0 4rem;
  text-align: center;
}

.hero-title {
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: #94a3b8;
  max-width: 560px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.hero-cta {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #2563eb;
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: background 0.2s, transform 0.15s;
}

.hero-cta:hover {
  background: #1d4ed8;
  color: #fff;
  transform: translateY(-1px);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 3rem 0 1.5rem;
  color: var(--text);
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.article-card {
  background: var(--bg-card);
  border-radius: 10px;
  border: 1px solid var(--border);
  transition: box-shadow 0.2s, transform 0.15s;
}

.article-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-link {
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.card-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 4px;
}

.card-date {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  color: var(--text);
}

.card-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>
