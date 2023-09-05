import type { Ref, Component } from "vue";
import type { BreakPoint } from "@suite-kit/grid";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import type { Table } from "@suite-kit/hooks";
import { VNodeChild } from "@vue/runtime-core";

type ToolButtonConfig = ["refresh", "setting", "search"] | boolean;

export type PaginationConfig = {
	small?: boolean;
	background?: boolean;
	defaultPageSize?: number;
	pagerCount?: number;
	defaultCurrentPage?: number;
	layout?: string;
	pageSizes?: number[];
	popperClass?: string;
	prevText?: string;
	prevIcon?: string | Component;
	nextText?: string;
	nextIcon?: String | Component;
	disabled?: boolean;
	hideOnSinglePage?: boolean;
};

export interface ProTableProps {
	columns: ColumnProps[]; // 列配置项  ==> 必传
	data?: any[]; // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
	requestApi?: (params: any) => Promise<any>; // 请求表格数据的 api ==> 非必传
	requestAuto?: boolean; // 是否自动执行请求 api ==> 非必传（默认为true）
	requestError?: (params: any) => void; // 表格 api 请求错误监听 ==> 非必传
	dataCallback?: Table.DataCallBack; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
	title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
	// pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
	pagination?: PaginationConfig | boolean;
	initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
	border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
	toolButton?: ToolButtonConfig; // 是否显示表格功能按钮 ==> 非必传（默认为true）
	rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
	searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

export interface EnumProps {
	label?: string; // 选项框显示的文字
	value?: string | number | boolean | any[]; // 选项框值
	disabled?: boolean; // 是否禁用此选项
	tagType?: "success" | "info" | "warning" | "danger"; // 当 tag 为 true 时，此选择会指定 tag 显示类型
	children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
	[key: string]: any;
}

export type TypeProps = "index" | "selection" | "expand" | "drag";

export type SearchType =
	| "text" // 文本框
	| "number" // 数字输入框
	| "select" // 下拉选择框
	| "select-v2" // 下拉选择框v2
	| "tree-select" // 树形选择器
	| "cascader" // 级联选择器
	| "date-picker" // 日期选择器
	| "time-picker" // 时间选择器
	| "time-select" // 时间选择框
	| "switch" // 开关
	| "slider"; // 滑块

export type SearchRenderScope = {
	searchParam: { [key: string]: any };
	clearable: boolean;
	options: EnumProps[];
	data: EnumProps[];
};

export type SearchProps = {
	el?: SearchType; // 当前项搜索框的类型
	props?: any; // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
	key?: string; // 当搜索项 key 不为 prop 属性时，可通过 key 指定
	order?: number; // 搜索项排序（从大到小）
	span?: number | Record<BreakPoint, number>; // 搜索项所占用的列数，默认为1列
	offset?: number | Record<BreakPoint, number>; // 搜索字段左侧偏移列数
	defaultValue?: any; // 搜索项默认值
	render?: (scope: SearchRenderScope) => VNodeChild; // 自定义搜索内容渲染（tsx语法）
};

export type FieldNamesProps = {
	label: string;
	value: string;
	children?: string;
};

export type RenderScope<T> = {
	row: T;
	$index: number;
	column: TableColumnCtx<T>;
	[key: string]: any;
};

export type HeaderRenderScope<T> = {
	$index: number;
	column: TableColumnCtx<T>;
	[key: string]: any;
};

export interface ColumnProps<T = any>
	extends Partial<Omit<TableColumnCtx<T>, "children" | "renderCell" | "renderHeader" | "type">> {
	type?: TypeProps;
	tag?: boolean; // 是否是标签展示
	isShow?: boolean | Ref<boolean>; // 是否显示在表格当中
	search?: SearchProps; // 搜索项配置
	enum?: EnumProps[] | ((params?: any) => Promise<any>) | Ref<EnumProps[]>; // 枚举类型（字典）
	isFilterEnum?: boolean; // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
	fieldNames?: FieldNamesProps; // 指定 label && value && children 的 key 值
	headerRender?: (scope: HeaderRenderScope<T>) => VNodeChild; // 自定义表头内容渲染（tsx语法）
	render?: (scope: RenderScope<T>) => VNodeChild; // 自定义单元格内容渲染（tsx语法）
	_children?: ColumnProps<T>[]; // 多级表头
}
