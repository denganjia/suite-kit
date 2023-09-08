<template>
	<ProTable :request-api="fetchData" :columns="columns" :data-callback="dataCallback">
		<template #title>
			<el-button type="warning" @click="changeEnum">警告</el-button>
		</template>
	</ProTable>
</template>
<script setup lang="tsx">
import ProTable from "@suite-kit/el-protable";
import type { ColumnProps } from "@suite-kit/el-protable";
import { fetchData } from "../fetch";
import { reactive, ref } from "vue";
import { ElButton } from "element-plus";
defineOptions({
	name: "Test-El-ProTable",
});

const dataCallback = (data: any) => {
	console.log(data);
	return data;
};

const changeEnum = () => {
	enumGender.value.length = 0;
	enumGender.value.push(
		...[
			{ label: "张三", value: 1 },
			{ label: "李四", value: 0 },
		],
	);
	columns[1].label = "四川";
	// columns.push({
	// 	label: "测试",
	// 	prop: "test",
	// 	isShow: true,
	// 	search: {
	// 		el: "number",
	// 	},
	// });
};
const enumGender = ref([
	{ label: "男", value: 1 },
	{ label: "女", value: 0 },
]);

const getEnum = async () => {
	console.log("get enum");

	return {
		data: [
			{ label: "男", value: 1 },
			{ label: "女", value: 0 },
		],
	};
};

const columns = reactive<ColumnProps[]>([
	// {
	// 	type: "drag",
	// },
	{
		label: "用户超级长用户超级长用户超级长用户超级长",
		prop: "user",
		_children: [
			{
				label: "姓名",
				prop: "name",
				search: {
					el: "text",
				},
				isShow: true,
			},
			{ label: "年龄", prop: "age", search: { el: "number", props: {} } },
		],
	},
	{
		label: "日期",
		prop: "date",
		search: { el: "date-picker", props: { "value-format": "x" } },
	},
	{
		label: "时间",
		prop: "time",
		search: { el: "time-picker", props: { "value-format": "x" }, order: 1 },
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
		enum: enumGender.value,
	},
	{
		label: "Cascader",
		prop: "cascader",
		search: { el: "cascader" },
		enum: getEnum,
	},
]);
</script>

<style scoped></style>
