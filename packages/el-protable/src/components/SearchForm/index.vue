<template>
	<el-card>
		<div v-if="columns.length" class="el-protable-search__content">
			<el-form ref="formRef" :model="searchParam" :show-message="false" label-width="auto">
				<Grid ref="gridRef" :collapsed="collapsed" :collapsed-rows="collapsedRows" :gap="[10, 10]" :cols="searchCol">
					<GridItem v-for="item in columns" :key="item.prop" v-bind="getResponsive(item)">
						<el-form-item>
							<template #label>
								<el-space :size="0">
									<span>{{ item.label }}</span>
									<el-tooltip v-if="item.search?.tip ?? item.tip">
										<template #content>
											<component :is="item.search?.tip ?? item.tip ?? ''"></component>
										</template>
										<el-button style="padding: 0" :icon="QuestionFilled" link></el-button>
									</el-tooltip>
									<span>:</span>
								</el-space>
							</template>
							<SearchFormItem :column="item" :search-param="searchParam" />
						</el-form-item>
					</GridItem>
					<GridItem suffix>
						<div class="el-protable-search__content-action">
							<el-button type="primary" :icon="Search" @click="search"> 搜索</el-button>
							<el-button :icon="Delete" @click="reset"> 重置</el-button>
							<el-button v-if="showCollapse" type="primary" link @click="collapsed = !collapsed">
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
	</el-card>
</template>
<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { ColumnProps } from "../../types";
import { BreakPoint } from "@suite-kit/grid";
import { Delete, Search, ArrowDown, ArrowUp, QuestionFilled } from "@element-plus/icons-vue";
import SearchFormItem from "./SearchFormItem.vue";
import { Grid, GridItem } from "@suite-kit/grid";
import { ElButton, ElIcon, ElForm, ElFormItem, ElCard, ElTooltip, ElSpace } from "element-plus";

defineOptions({ name: "ElProTableSearchForm" });

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
		span: item.search?.span ?? 1,
		offset: item.search?.offset ?? 0,
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
		let { span = 1, offset = 0 } = current.search ?? { span: 1, offset: 0 };
		prev +=
			(typeof span == "object" ? span[breakPoint.value] ?? 1 : span) +
			(typeof offset === "object" ? offset[breakPoint.value] ?? 0 : offset);
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
