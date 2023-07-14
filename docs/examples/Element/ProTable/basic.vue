<template>
	<div class="table">
		<ProTable :columns="columns"></ProTable>
	</div>
</template>

<script setup lang="ts">
import type { ProTableInstance } from "@suite-kit/el-protable";
import { ref } from "vue";
import ProTable from "@suite-kit/el-protable";

const instance = ref<ProTableInstance>();
instance.value?.enumMap.clear();
const columns: any = [
	{ label: "姓名", prop: "name", search: { el: "input" } },
	{ label: "年龄", prop: "age", search: { el: "select" } },
];

</script>
