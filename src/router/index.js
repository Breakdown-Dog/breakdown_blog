import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import RenderingList from '@/views/RenderingList.vue'
import GameList from '@/views/GameList.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/rendering', name: 'RenderingList', component: RenderingList },
  { path: '/game', name: 'GameList', component: GameList },
  { path: '/articles/:slug', name: 'ArticleDetail', component: ArticleDetail },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
