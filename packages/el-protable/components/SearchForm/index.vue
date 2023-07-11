<template>
	<div v-if="columns.length" class="card table-search">
		<el-form ref="formRef" :model="searchParam">
			<Grid ref="gridRef" :collapsed="collapsed" :collapsed-rows="collapsedRows" :gap="[20, 0]" :cols="searchCol">
				<GridItem v-for="(item, index) in columns" :key="item.prop" v-bind="getResponsive(item)" :index="index">
					<el-form-item :label="`${item.label} :`">
						<SearchFormItem :column="item" :search-param="searchParam" />
					</el-form-item>
				</GridItem>
				<GridItem suffix>
					<div class="operation">
						<el-button type="primary" :icon="Search" @click="search"> 搜索 </el-button>
						<el-button :icon="Delete" @click="reset"> 重置 </el-button>
						<el-button v-if="showCollapse" type="primary" link class="search-isOpen" @click="collapsed = !collapsed">
							{{ collapsed ? "展开" : "合并" }}
							<el-icon class="el-icon--right">
								<component :is="collapsed ? ArrowDown : ArrowUp"></component>
							</el-icon>
						</el-button>
					</div>
				</GridItem>
			</Grid>
		</el-form>
	</div>
</template>
<script setup lang="ts" name="SearchForm">
import { computed, ref, inject } from "vue";
import { ColumnProps } from "../../type";
import { BreakPoint } from "@suite-kit/grid";
import { Delete, Search, ArrowDown, ArrowUp } from "@element-plus/icons-vue";
import SearchFormItem from "./SearchFormItem.vue";
import { Grid, GridItem } from "@suite-kit/grid";
import { ElButton, ElIcon, ElForm, ElFormItem } from "element-plus";
interface Props {
	columns?: ColumnProps[]; // 搜索配置列
	searchParam?: { [key: string]: any }; // 搜索参数
	searchCol: number | Record<BreakPoint, number>;
	search: (params: any) => void; // 搜索方法
	reset: (params: any) => void; // 重置方法
}

// 默认值
const props = withDefaults(defineProps<Props>(), {
	columns: () => [],
	searchParam: () => ({}),
});
// 折叠的行数
const collapsedRows = inject("collapsedRows", ref(1));
// 获取响应式设置
const getResponsive = (item: ColumnProps) => {
	return {
		span: item.search?.span,
		offset: item.search?.offset ?? 0,
		xs: item.search?.xs,
		sm: item.search?.sm,
		md: item.search?.md,
		lg: item.search?.lg,
		xl: item.search?.xl,
	};
};

// 是否默认折叠搜索项
const collapsed = ref(true);

// 获取响应式断点
const gridRef = ref();
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint);

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
	let show = false;
	props.columns.reduce((prev, current) => {
		prev +=
			(current.search![breakPoint.value]?.span ?? current.search?.span ?? 1) +
			(current.search![breakPoint.value]?.offset ?? current.search?.offset ?? 0);
		if (typeof props.searchCol !== "number") {
			if (prev >= props.searchCol[breakPoint.value] * collapsedRows.value) show = true;
		} else {
			if (prev >= props.searchCol * collapsedRows.value) show = true;
		}
		return prev;
	}, 0);
	return show;
});
</script>
