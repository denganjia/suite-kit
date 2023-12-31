import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx"
import { resolve } from "path";
import dts from "vite-plugin-dts";
export default defineConfig({
	plugins: [
		// @ts-ignore
		dts({
			copyDtsFiles: true,
			outDir: [
				"dist",
				// "types",
				// 'types/inner'
			],
			clearPureImport: false,
			include: ["src/*", "src/types.d.ts"],
			// staticImport: true,
			// rollupTypes: true,
			insertTypesEntry: true,
			compilerOptions: {
				// declarationMap: true,
			},
		}),
		vueJsx(),
		// @ts-ignore
		vue(),
	],
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: resolve(__dirname, "src/index.ts"),
			name: "@suite-kit/grid",
			// the proper extensions will be added
			fileName: "index",
		},
		rollupOptions: {
			// // 确保外部化处理那些你不想打包进库的依赖
			external: ["vue"],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: "Vue",
				},
			},
		},
	},
});
