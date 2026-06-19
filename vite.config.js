import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// GitHub Pages 部署时设置为 "/仓库名/"（如 "/breakdown_blog/"）
// 自定义域名或 username.github.io 设为 "/"
const base = process.env.GH_BASE || '/'

export default defineConfig({
  plugins: [vue()],
  base,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
