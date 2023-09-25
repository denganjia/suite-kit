<template>
	<div class="table">
		<ProTable :columns="columns" :request-api="getDataApi">
			<template #title>表格标题，也可使用title属性</template>
			<template #action>
				<el-button type="primary">表格操作区</el-button>
			</template>
			<template #tools>
				<el-button type="primary">表格工具栏</el-button>
			</template>
			<template #nameHeader> 表头插槽 prop+'Header'</template>
			<template #name="{ $index }"> 表格内容插槽{{ $index }}</template>
			<template #append> 表尾合计行</template>
			<template #operation>
				<el-button link type="danger">删除</el-button>
			</template>
		</ProTable>
	</div>
</template>

<script setup lang="ts">
import ProTable, { ColumnProps } from "@suite-kit/el-protable";
import { getDataApi } from "../../../fetch";
import { dayjs, ElButton } from "element-plus";

const columns: ColumnProps[] = [
	{ label: "姓名", prop: "name", search: { el: "text" } },
	{
		label: "年龄",
		prop: "age",
		headerRender(scope) {
			return "表头渲染函数";
		},
		render(scope) {
			return "表格渲染函数";
		},
	},
	{
		label: "性别",
		prop: "gender",
		enum: [
			{ label: "男", value: 1 },
			{ label: "女", value: 0 },
		],
		search: { el: "select" },
	},
	{
		label: "创建时间",
		prop: "createTime",
		render({ row }) {
			return dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss");
		},
		search: { el: "date-picker" },
	},
	{
		label: "操作",
		prop: "operation",
	},
];
</script>
