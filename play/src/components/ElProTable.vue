<template>
	<ProTable :request-api="fetchData" :columns="columns"> </ProTable>
</template>
<script setup lang="tsx">
import ProTable from "@suite-kit/el-protable";
import { ColumnProps } from "@suite-kit/el-protable";
import { fetchData } from "../fetch";
import { reactive } from "vue";
defineOptions({
	name: "Test-El-ProTable",
});

const columns = reactive<ColumnProps[]>([
	{
		label: "用户",
		prop: "user",
		_children: [
			{
				label: "姓名",
				prop: "name",
				search: {
					el: "text",
					props: { clearable: true },
					defaultValue: "测试",
				},
				isShow: true,
			},
			{ label: "年龄", prop: "age", search: { el: "number", props: {} } },
		],
	},
	{ label: "日期", prop: "date", search: { el: "date-picker", props: { "value-format": "x" } } },
	{
		label: "时间",
		prop: "time",
		search: { el: "time-picker", props: { "value-format": "x" } },
		render(scope) {
			if (scope.row?.time) {
				return new Date(scope.row?.time).toLocaleTimeString();
			}
			return "";
		},
	},
	{
		label: "性别",
		prop: "gender",
		search: { el: "select", props: { clearable: false } },
		enum: [
			{ label: "男", value: 1 },
			{ label: "女", value: 0 },
		],
		isShow: false,
	},
	{
		label: "Cascader",
		prop: "cascader",
		search: { el: "cascader" },
		enum: [
			{ label: "男", value: 1 },
			{ label: "女", value: 0 },
		],
	},
]);
</script>

<style scoped></style>
