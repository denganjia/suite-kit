import DefaultTheme from "vitepress/theme";
import { EnhanceAppContext } from "vitepress";
import "./vars.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@suite-kit/el-protable/dist/style.css";
import MyLayout from "./components/Layout.vue";

export default {
  ...DefaultTheme,
  enhaceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx);
  },
  Layout: MyLayout,
};
