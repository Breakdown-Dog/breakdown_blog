import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ArticleList from '@/views/ArticleList.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/articles', name: 'ArticleList', component: ArticleList },
  { path: '/articles/:slug', name: 'ArticleDetail', component: ArticleDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
