import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import typescript from '@rollup/plugin-typescript';
import {resolve} from 'path'
import UnoCss from "unocss/vite"

export default defineConfig({
  plugins: [
    // @ts-ignore
    vueJsx(), vue(), typescript(), UnoCss()
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './index.ts'),
      name: '@suite-kit/el-protable',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    include: [resolve(__dirname, './style.scss'), resolve(__dirname, "./index.d.ts")],
  },
})
