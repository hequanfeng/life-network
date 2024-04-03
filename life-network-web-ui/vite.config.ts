import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
const Timestamp = new Date().getTime()

export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 3003,
    proxy: {
      '/dev': {
        secure: false,
        //后端API地址
        target: 'https://localhost:9443',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev/, '')
      }
    }
  },
  build: {
    sourcemap: false,
    target: ['chrome52'],
    cssTarget: ['chrome52'],
    rollupOptions: {
      output: {
        chunkFileNames: `[name].[hash]${Timestamp}.js`,
        entryFileNames: `[name].[hash]${Timestamp}.js`,
        assetFileNames: `[name].[hash]${Timestamp}.[ext]`
      }
    }
  },
  plugins: [
    vue(),
    vueI18nPlugin({
      include: path.resolve(__dirname, './src/locales'),
      runtimeOnly: false,
      jitCompilation: true
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[dir]-[name]'
    }),
    vueJsxPlugin()
  ],
  define: {
    __INTLIFY_JIT_COMPILATION: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
