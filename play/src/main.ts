import {createApp} from 'vue'
// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
import App from './App.vue'
import "@suite-kit/el-protable/dist/style.css"
import ElementPlus from "element-plus";
createApp(App).use(ElementPlus).mount('#app')
