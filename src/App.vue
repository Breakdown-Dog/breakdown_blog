<template>
  <div id="blog-app">
    <header class="site-header">
      <div class="container header-inner">
        <router-link to="/" class="logo">
          <span class="logo-icon">B</span>
          <span class="logo-text">Breakdown Blog</span>
        </router-link>
        <nav class="nav-links">
          <router-link to="/" class="nav-link" exact-active-class="active">首页</router-link>
          <router-link to="/articles" class="nav-link" active-class="active">文章</router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="site-footer">
      <div class="container">
        <p>&copy; {{ year }} Breakdown Blog — 专注于技术深度解析</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-header {
  background: #1a1a2e;
  color: #fff;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 1.25rem;
}

.logo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #2563eb;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 800;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: #fff;
}

.main-content {
  min-height: calc(100vh - 130px);
}

.site-footer {
  background: #1a1a2e;
  color: #94a3b8;
  text-align: center;
  padding: 1.5rem 0;
  font-size: 0.85rem;
}
</style>
