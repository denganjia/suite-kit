<template>
  <el-tabs v-model="active">
    <el-tab-pane label="ElProTable" name="ElProTable">
      <ElConfigProvider :locale="zhCn">
        <ElProTable></ElProTable>
      </ElConfigProvider>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import ElProTable from "./components/ElProTable.vue"
import {ElTabs, ElTabPane, ElConfigProvider} from "element-plus";
import {ref} from "vue"
import zhCn from "element-plus/es/locale/lang/zh-cn";

const active = ref("ElProTable")
</script>


<style scoped>

</style>
