import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import RenderingList from '@/views/RenderingList.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/articles', name: 'ArticleList', component: RenderingList },
  { path: '/articles/:slug', name: 'ArticleDetail', component: ArticleDetail },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
