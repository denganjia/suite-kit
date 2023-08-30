<template>
	<div class="table">
		<ProTable :columns="columns" :request-api="getDataApi" :request-auto="false" ref="table"></ProTable>
	</div>
</template>

<script setup lang="ts">
import ProTable from "@suite-kit/el-protable";
import type { ColumnProps, ProTableInstance } from "@suite-kit/el-protable";
import { getDataApi } from "../../../fetch";
import { ref, watch } from "vue";
const table = ref<ProTableInstance>();
// 模拟下拉数据为后台接口
const getGenderEnum = async () => {
	return {
		data: [
			{ label: "男", value: 1 },
			{ label: "女", value: 0 },
		],
	};
};
const columns: ColumnProps[] = [
	{ label: "姓名", prop: "name", search: { el: "text" } },
	{ label: "年龄", prop: "age" },
	{
		label: "性别",
		prop: "gender",
		enum: getGenderEnum,
		search: { el: "select" },
	},
];
// 将默认性别设置成第一条数据
watch(
	() => table.value?.enumMap.get("gender"),
	gender => {
		if (gender) {
			table.value!.searchInitParam["gender"] = gender[0].value;
			table.value!.searchParam["gender"] = gender[0].value;
			table.value?.getTableList();
		}
	},
);
</script>
