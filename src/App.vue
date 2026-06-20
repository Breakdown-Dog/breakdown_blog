<template>
  <div id="blog-app">
    <AuroraBackground />
    <header class="site-header">
      <div class="container header-inner">
        <router-link to="/" class="logo">Breakdown Blog</router-link>
        <div class="header-right">
          <nav class="nav-links">
            <router-link to="/" class="nav-link" exact-active-class="active">{{ t('navHome') }}</router-link>
            <router-link to="/articles" class="nav-link" active-class="active">{{ t('navRendering') }}</router-link>
          </nav>
          <button class="lang-toggle" @click="toggleLang">{{ locale === 'zh' ? 'EN' : '中' }}</button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="site-footer">
      <div class="container">
        <p>Breakdown Blog &mdash; {{ year }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import AuroraBackground from '@/components/AuroraBackground.vue'
import { useI18n } from '@/i18n'

const { locale, setLocale, t } = useI18n()
const year = new Date().getFullYear()

function toggleLang() {
  setLocale(locale.value === 'zh' ? 'en' : 'zh')
}
</script>

<style scoped>
.site-header {
  padding: 1.5rem 0;
  position: relative;
  z-index: 2;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.05rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  letter-spacing: 0.01em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: #fff;
}

.lang-toggle {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  line-height: 1.4;
}

.lang-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.2);
}

.main-content {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 140px);
  padding-bottom: 3rem;
}

.site-footer {
  position: relative;
  z-index: 1;
  padding: 2rem 0;
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-secondary);
}
</style>
