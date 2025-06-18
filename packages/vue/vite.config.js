import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: 'wiring-design',
  build: {
    outDir: '../../dist'
  },
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue'],
      dts: "src/auto-import.d.ts"   //  会自动生成此文件
    }),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
