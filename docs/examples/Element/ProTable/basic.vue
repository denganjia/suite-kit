<template>
	<ProTable :columns="columns"></ProTable>
</template>

<script setup lang="ts">
const columns = [{ label: "姓名", prop: "name", search: { el: "input" } }];

import ProTable from "@suite-kit/el-protable";
</script>
