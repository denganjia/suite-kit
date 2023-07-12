<template>
	<ProTable :columns="columns"></ProTable>
</template>

<script setup lang="ts">
const columns:any = [
	{ label: "姓名", prop: "name", search: { el: "input" } },
	{ label: "年龄", prop: "age", search: { el: "select" } },
];

import ProTable from "@suite-kit/el-protable";
</script>
