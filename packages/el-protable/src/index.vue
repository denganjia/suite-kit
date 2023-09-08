<template>
	<div>
		<div :style="isShowSearch ? { marginBottom: '18px' } : ''">
			<SearchForm
				v-show="isShowSearch"
				:search="tableEmits.search"
				:reset="tableEmits.reset"
				:columns="searchColumns"
				:search-param="searchParam"
				:search-col="searchCol"
			/>
		</div>
		<div class="table-main">
			<el-card>
				<!-- 表格内容 card -->
				<div>
					<!-- 表格头部 操作按钮 -->
					<div class="table-header">
						<div class="header-button-lf">
							<span class="title">
								<slot name="title">
									{{ props.title }}
								</slot>
							</span>
							<span>
								<slot
									name="header-left"
									:selected-list-ids="selectedListIds"
									:selected-list="selectedList"
									:is-selected="isSelected"
								/>
							</span>
						</div>
						<div v-if="!!toolButton" class="header-button-ri">
							<el-divider v-if="$slots['header-left']" direction="vertical"></el-divider>
							<slot name="toolButton">
								<el-button v-if="showToolButtonItem('refresh')" :icon="Refresh" circle @click="tableEmits.refresh" />
								<el-popover v-if="showToolButtonItem('setting') && columns.length" trigger="click" width="fit-content">
									<template #reference>
										<el-button :icon="Operation" circle />
									</template>
									<el-tree
										ref="colSettingRef"
										:data="tableColumns"
										node-key="prop"
										show-checkbox
										draggable
										:allow-drop="allowDrop"
										:props="{ children: '_children' }"
										@node-drop="dropSuccess"
										:filter-node-method="filterTreeNode"
										@check-change="treeCheckChange"
									>
										<template #default="{ data }">
											<div
												style="
													display: flex;
													justify-content: space-between;
													align-items: center;
													width: 100%;
													gap: 1em;
												"
											>
												<span>{{ data.label }}</span>
												<el-icon>
													<Rank></Rank>
												</el-icon>
											</div>
										</template>
									</el-tree>
								</el-popover>
								<el-button
									v-if="showToolButtonItem('search') && searchColumns.length"
									:icon="Search"
									circle
									@click="isShowSearch = !isShowSearch"
								/>
							</slot>
						</div>
					</div>
					<!-- 表格主体 -->
					<el-table
						ref="tableRef"
						v-bind="$attrs"
						:data="cacheData"
						:border="border"
						:row-key="rowKey"
						@selection-change="selectionChange"
					>
						<!-- 默认插槽 -->
						<slot></slot>
						<template v-for="item in tableColumns" :key="item">
							<!-- selection || index || expand -->
							<el-table-column
								v-if="item.type && ['selection', 'index', 'expand', 'drag'].includes(item.type)"
								v-bind="item"
								:align="item.align ?? 'center'"
								:reserve-selection="item.type == 'selection'"
								:width="item.type === 'drag' ? '48px' : item.width"
							>
								<template v-if="item.type == 'expand'" #default="scope">
									<component :is="item.render" v-bind="scope" v-if="item.render"></component>
									<slot v-else :name="item.type" v-bind="scope"></slot>
								</template>
								<template v-if="item.type === 'drag'">
									<div class="el-protable-drag-handle">
										<el-icon>
											<DCaret></DCaret>
										</el-icon>
									</div>
								</template>
							</el-table-column>
							<!-- other -->
							<ElProTableColumn v-if="!item.type && item.prop && item.isShow" :column="item">
								<template v-for="slot in Object.keys($slots)" #[slot]="scope">
									<slot :name="slot" v-bind="scope"></slot>
								</template>
							</ElProTableColumn>
						</template>
						<!-- 插入表格最后一行之后的插槽 -->
						<template #append>
							<slot name="append"></slot>
						</template>
						<!-- 无数据 -->
						<template #empty>
							<div>
								<slot name="empty">
									<div>暂无数据</div>
								</slot>
							</div>
						</template>
					</el-table>
					<!-- 分页组件 -->
					<slot name="pagination">
						<!-- 分页组件 -->
						<el-pagination
							v-if="!!pagination"
							v-bind="paginationProps"
							:current-page="pageable.pageNum"
							:page-size="pageable.pageSize"
							:total="pageable.total"
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
						></el-pagination>
					</slot>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: "ElProTable",
});
import { ref, watch, provide, onMounted, unref, computed, reactive } from "vue";
import {
	ElTable,
	ElButton,
	ElTableColumn,
	ElCard,
	ElPopover,
	ElTree,
	ElPagination,
	ElDivider,
	ElIcon,
} from "element-plus";
import { useTable, useSelection } from "@suite-kit/hooks";
import { ColumnProps } from "./index";
import { Refresh, Operation, Search, Rank, DCaret } from "@element-plus/icons-vue";
import { handleProp } from "@suite-kit/utils";
import SearchForm from "./components/SearchForm/index.vue";
import ElProTableColumn from "./components/Column.vue";
import Sortable from "sortablejs";
import type { PaginationConfig, ProTableProps } from "./types";
//允许放置
const allowDrop = (draggingNode: any, dropNode: any, type: string) => {
	if (draggingNode.level == dropNode.level) {
		return type == "next" || type == "prev";
	} else if (draggingNode.parent?.id == dropNode.parent?.id) {
		return type == "next" || type == "prev";
	} else {
		return false;
	}
};

//拖拽成功
const dropSuccess = (draggingNode: any) => {
	if (draggingNode.checked) colSettingRef.value.setChecked(draggingNode.key, true, true);
};
// 过滤隐藏的column
const filterTreeNode = (value: any, data: any) => {
	return data.isShow && !data.type;
};

// tree check事件
const treeCheckChange = (data: ColumnProps, checked: boolean, leaf: boolean) => {
	data.isShow = checked || leaf;
};

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
	columns: () => [],
	requestAuto: true,
	pagination: true,
	initParam: {},
	border: true,
	toolButton: true,
	rowKey: "id",
	searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
});

// default pagination props
const defaultPaginationProps = {
	background: false,
	layout: "total, sizes, prev, pager, next, jumper",
};
// pagination props
const paginationProps = computed<PaginationConfig>(() => {
	if (typeof props.pagination == "boolean") {
		return {
			background: false,
			layout: "total, sizes, prev, pager, next, jumper",
		};
	} else {
		return Object.assign(defaultPaginationProps, props.pagination);
	}
});

const showToolButtonItem = (key: "refresh" | "setting" | "search") => {
	return Array.isArray(props.toolButton) ? props.toolButton.includes(key) : props.toolButton;
};

// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof ElTable>>();

// 表格多选 Hooks
const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey);

// 处理没有传递request-api而是传递data
const cacheData = computed(() => {
	if (props.data) {
		pageable.value.total = props.data.length;
		return props.data.slice(
			(pageable.value.pageNum - 1) * pageable.value.pageSize,
			pageable.value.pageSize * pageable.value.pageNum,
		);
	} else {
		return tableData.value;
	}
});
// 表格操作 Hooks
const {
	tableData,
	pageable,
	searchParam,
	searchInitParam,
	getTableList,
	search,
	reset,
	handleSizeChange,
	handleCurrentChange,
} = useTable(props.requestApi, props.initParam, Boolean(props.pagination), props.dataCallback, props.requestError);

// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection();

// 初始化请求
onMounted(() => {
	props.requestAuto && tableEmits.request();
	colSettingRef.value?.setCheckedNodes(colSetting);
	colSettingRef.value?.filter();
});

// 接收 columns 并设置为响应式
const tableColumns = reactive<ColumnProps[]>(props.columns);

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
provide("enumMap", enumMap);
const setEnumMap = async (col: ColumnProps) => {
	if (!col.enum) return;
	// 如果当前enumMap存在相同的值就跳过
	if (enumMap.value.has(col.prop!) && (typeof col.enum === "function" || enumMap.value.get(col.prop!) === col.enum))
		return;
	// 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
	if (typeof col.enum !== "function") {
		return enumMap.value.set(col.prop!, unref(col.enum!));
	}
	const { data } = await col.enum();
	enumMap.value.set(col.prop!, data);
};

// 扁平化 columns
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
	columns.forEach(async col => {
		if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
		flatArr.push(col);

		// 给每一项 column 添加 isShow && isFilterEnum 默认属性
		col.isShow = col.isShow ?? true;
		col.isFilterEnum = col.isFilterEnum ?? true;

		// 设置 enumMap
		await setEnumMap(col);
	});
	return flatArr.filter(item => !item._children?.length);
};

// flatColumns 扁平结构的columns
const flatColumns = computed(() => flatColumnsFunc(props.columns));
// watch(
// 	tableColumns,
// 	n => {
// 		flatColumns.value = flatColumnsFunc(n);
// 	},
// 	{ immediate: true },
// );

// 过滤需要搜索的配置项
// const searchColumns = flatColumns.value.filter(item => item.search?.el || item.search?.render);
const searchColumns = computed(() => {
	return (
		flatColumns.value
			?.filter(item => item.search?.el || item.search?.render)
			.sort((a, b) => a.search!.order! - b.search!.order!) ?? []
	);
});
// 是否显示搜索模块
const isShowSearch = ref(!!searchColumns.value.length);

// 设置搜索表单排序默认值 && 设置搜索表单项的默认值
searchColumns.value.forEach((column, index) => {
	column.search!.order = column.search!.order ?? index + 2;
	if (column.search?.defaultValue !== undefined && column.search?.defaultValue !== null) {
		searchInitParam.value[column.search.key ?? handleProp(column.prop!)] = column.search?.defaultValue;
		searchParam.value[column.search.key ?? handleProp(column.prop!)] = column.search?.defaultValue;
	}
});

const colSettingRef = ref();
// 列设置 ==> 过滤掉不需要设置的列
const colSetting = tableColumns.filter(item => {
	return !["selection", "index", "expand", "drag"].includes(item.type!) && item?.prop !== "operation" && item.isShow;
});
// 行拖拽
// 表格主体
onMounted(() => {
	dragSort();
});
// 拖拽排序
const dragSort = () => {
	const tbody = document.querySelector(".el-table__body-wrapper tbody") as HTMLElement;
	Sortable.create(tbody, {
		handle: ".el-protable-drag-handle",
		animation: 200,
		onUpdate({ newIndex, oldIndex }) {
			const [removedItem] = tableData.value.splice(oldIndex!, 1);
			tableData.value.splice(newIndex!, 0, removedItem);
			emits("drag-sort", newIndex, oldIndex, unref(cacheData));
		},
	});
};

// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({
	element: tableRef,
	tableData: cacheData,
	pageable,
	searchParam,
	searchInitParam,
	getTableList,
	search,
	reset,
	handleSizeChange,
	handleCurrentChange,
	clearSelection,
	enumMap,
	isSelected,
	selectedList,
	selectedListIds,
});

// 组件事件
const emits = defineEmits<{
	(key: "search" | "refresh" | "request" | "reset"): void;
	(key: "drag-sort", newIndex: number | undefined, oldIndex: number | undefined, data: any[]): void;
}>();
const tableEmits = {
	search() {
		search();
		emits("search");
	},
	reset() {
		reset();
		emits("reset");
	},
	request() {
		getTableList();
		emits("request");
	},
	refresh() {
		getTableList();
		emits("refresh");
	},
};

// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, tableEmits.request, { deep: true });
</script>
<style lang="scss" scoped>
.el-protable-drag-handle {
	cursor: move;
}
</style>
