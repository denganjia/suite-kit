<template>
  <ElConfigProvider :locale="zhCn">
    <Layout> </Layout>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { ElConfigProvider } from "element-plus";
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const { Layout } = DefaultTheme;
defineOptions({ name: "MyLayout" });
</script>

<style scoped></style>
