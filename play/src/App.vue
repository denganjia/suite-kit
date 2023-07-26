<template>
	<el-tabs v-model="active">
		<el-tab-pane label="ElProTable" name="ElProTable">
			<ElConfigProvider :locale="zhCn" :button="{ autoInsertSpace: true }">
				<ElProTable></ElProTable>
			</ElConfigProvider>
		</el-tab-pane>
		<el-tab-pane label="test" name="test"> </el-tab-pane>
	</el-tabs>
</template>
<script setup lang="ts">
import ElProTable from "./components/ElProTable.vue";
import { ElTabs, ElTabPane, ElConfigProvider } from "element-plus";
import { ref } from "vue";
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const active = ref("ElProTable");
</script>

<style scoped></style>
