<template>
	<div> </div>
</template>

<script setup lang="ts">
import { ColumnProps } from "../type";
import { BreakPoint } from "@suite-kit/grid";
export interface ProTableProps {
	columns: ColumnProps[]; // 列配置项  ==> 必传
	data?: any[]; // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
	requestApi?: (params: any) => Promise<any>; // 请求表格数据的 api ==> 非必传
	requestAuto?: boolean; // 是否自动执行请求 api ==> 非必传（默认为true）
	requestError?: (params: any) => void; // 表格 api 请求错误监听 ==> 非必传
	dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
	title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
	pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
	initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
	border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
	toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
	rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
	searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}
</script>

<style scoped lang="scss"></style>
