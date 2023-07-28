<template>
	<ProTable :request-api="fetchData" :columns="columns" title="用户信息表">
		<template #tableHeader>
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
const changeEnum = () => {
	enumGender.value.length = 0;
	enumGender.value.push(
		...[
			{ label: "张三", value: 1 },
			{ label: "李四", value: 0 },
		],
	);
	columns[1].label = "四川";
	columns.push({
		label: "测试",
		prop: "test",
		isShow: true,
	});
};

const enumGender = ref([
	{ label: "男", value: 1 },
	{ label: "女", value: 0 },
]);
const columns = reactive<ColumnProps[]>([
	{
		type: "selection",
	},
	{
		label: "用户超级长用户超级长用户超级长用户超级长",
		prop: "user",
		tip: "222222",
		_children: [
			{
				label: "姓名",
				prop: "name",
				search: {
					el: "text",
					defaultValue: "测试",
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
		enum: enumGender,
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
