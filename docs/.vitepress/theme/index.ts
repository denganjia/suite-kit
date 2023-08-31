import DefaultTheme from "vitepress/theme";
import { EnhanceAppContext } from "vitepress";
import "./vars.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@suite-kit/el-protable/dist/style.css";
import MyLayout from "./components/Layout.vue";
import { globals } from "../vitepress";

export default {
	extends: DefaultTheme,
	enhanceApp(ctx: EnhanceAppContext) {
		globals.forEach(([name, Comp]) => {
			ctx.app.component(name, Comp);
		});
	},
	Layout: MyLayout,
	// extends: DefaultTheme,
};
