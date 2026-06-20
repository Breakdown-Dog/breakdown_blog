import { reactive, computed } from 'vue'

const messages = {
  zh: {
    navHome: '首页',
    navRendering: '渲染',
    about: '/关于',
    homeTitle: '夏吉儿写的入类特克勃萝歌',
    homeDesc: '灵感古里古里古里哇卡灵感古灵感古',
    recent: '/最近',
    viewAll: '浏览全部 →',
    renderingLabel: '/渲染',
    renderingTitle: '沃草, 渲构!!!',
    all: '全部',
    noPosts: '暂无文章',
    noPostsYet: '什么都没得的哦 (>_<")',
    loading: '加载中...',
    notFound: '文章未找到',
    loadFailed: '加载失败: ',
    back: '← 返回文章列表',
  },
  en: {
    navHome: 'Home',
    navRendering: 'Rendering',
    about: '/about',
    homeTitle: 'All Posts',
    homeDesc: 'A tech blog with breakdowns—no fluff, no filler.',
    recent: '/recent',
    viewAll: 'view all →',
    renderingLabel: '/rendering',
    renderingTitle: 'Notes on graphics & real-time rendering',
    all: 'all',
    noPosts: 'no posts yet',
    noPostsYet: 'nothing here yet',
    loading: 'loading...',
    notFound: 'not found',
    loadFailed: 'failed to load: ',
    back: '← back to posts',
  },
}

const state = reactive({
  locale: 'en',
})

function setLocale(locale) {
  state.locale = locale
}

function t(key) {
  return messages[state.locale]?.[key] ?? key
}

export function useI18n() {
  return {
    locale: computed(() => state.locale),
    setLocale,
    t,
  }
}
