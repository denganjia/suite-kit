import { VNode, Component } from "vue";
import { BreakPoint, Responsive } from "@suite-kit/grid";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { timeSelectProps } from "element-plus/es/components/time-select/src/time-select";
import { TreeComponentProps } from "element-plus/es/components/tree/src/tree.type";
import type {
	inputProps,
	// SelectProps as SelectV2Props,
	inputNumberProps,
	datePickerProps,
	checkboxProps,
	cascaderProps,
	timePickerDefaultProps,
	switchProps,
	sliderProps,
} from "element-plus";
import { ExtractPublicPropTypes } from "@vue/runtime-core";
export type PropsType<T> = {
	[K in keyof T]: T[K] extends { type: import("vue").PropType<infer P> }
		? PropsType<P>
		: T[K] extends BooleanConstructor
		? boolean
		: T[K] extends StringConstructor
		? string
		: T[K] extends import("element-plus/es/utils").EpPropFinalized<
				infer Type,
				infer Value,
				infer Validator,
				infer Default,
				infer Required
		  >
		? Default
		: T[K] extends import("element-plus/es/utils").EpPropMergeType<infer MergeType, any, any>
		? MergeType extends new (...args: any) => any
			? InstanceType<MergeType>
			: never
		: T[K];
};
type SelectProps = {
	name: string;
	id: string;
	autocomplete: string;
	automaticDropdown: boolean;
	size: "large" | "default" | "small";
	effect: "light" | "dark";
	disabled: boolean;
	clearable: boolean;
	filterable: boolean;
	allowCreate: boolean;
	loading: boolean;
	popperClass: string;
	remote: boolean;
	loadingText: string;
	noMatchText: string;
	noDataText: string;
	remoteMethod: Function;
	filterMethod: Function;
	multiple: boolean;
	multipleLimit: number;
	placeholder: string;
	defaultFirstOption: boolean;
	reserveKeyword: boolean;
	valueKey: string;
	collapseTags: boolean;
	collapseTagsTooltip: boolean;
	maxCollapseTags: number;
	teleported: boolean;
	persistent: boolean;
	clearIcon: import("vue").PropType<string | Component>;
	fitInputWidth: boolean;
	suffixIcon: import("vue").PropType<string | Component>;
	tagType: "success" | "info" | "warning" | "danger";
	validateEvent: boolean;
	remoteShowSuffix: boolean;
	suffixTransition: boolean;
	placement: string;
};
type CascaderPropsType = Partial<PropsType<typeof cascaderProps>>;

interface TextConfig {
	el: "text";
	props?: Partial<PropsType<typeof inputProps>>;
}
interface NumberConfig {
	el: "number";
	props?: Partial<typeof inputNumberProps>;
}
interface CheckboxConfig {
	el: "checkbox";
	props?: Partial<PropsType<typeof checkboxProps>>;
}
interface SelectConfig {
	el: "select";
	props?: Partial<SelectProps>;
}

interface SelectV2Config {
	el: "select-v2";
	props?: Partial<ExtractPublicPropTypes<any>>;
}

interface TreeSelectConfig {
	el: "tree-select";
	props?: Partial<SelectProps & TreeComponentProps>;
}

interface DatePickerConfig {
	el: "date-picker";
	props?: Partial<PropsType<typeof datePickerProps>>;
}

interface TimePickerConfig {
	el: "time-picker";
	props?: Partial<ExtractPublicPropTypes<typeof timePickerDefaultProps>>;
}

interface TimeSelectConfig {
	el: "time-select";
	props?: Partial<ExtractPublicPropTypes<typeof timeSelectProps>>;
}

interface SliderConfig {
	el: "slider";
	props?: Partial<ExtractPublicPropTypes<typeof sliderProps>>;
}

interface SwitchConfig {
	el: "switch";
	props?: Partial<ExtractPublicPropTypes<typeof switchProps>>;
}

export interface CascaderConfig {
	el: "cascader";
	config?: CascaderPropsType;
}

export interface EnumProps {
	label?: string; // 选项框显示的文字
	value?: string | number | boolean | any[]; // 选项框值
	disabled?: boolean; // 是否禁用此选项
	tagType?: string; // 当 tag 为 true 时，此选择会指定 tag 显示类型
	children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
	[key: string]: any;
}

export type TypeProps = "index" | "selection" | "expand";

export type SearchType =
	| "input"
	| "input-number"
	| "select"
	| "select-v2"
	| "tree-select"
	| "cascader"
	| "date-picker"
	| "time-picker"
	| "time-select"
	| "switch"
	| "slider";

export type SearchRenderScope = {
	searchParam: { [key: string]: any };
	placeholder: string;
	clearable: boolean;
	options: EnumProps[];
	data: EnumProps[];
};

export type SearchProps = {
	// el?: SearchType; // 当前项搜索框的类型
	// props?: any; // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
	key?: string; // 当搜索项 key 不为 prop 属性时，可通过 key 指定
	order?: number; // 搜索项排序（从大到小）
	span?: number; // 搜索项所占用的列数，默认为1列
	offset?: number; // 搜索字段左侧偏移列数
	defaultValue?: any; // 搜索项默认值
	render?: (scope: SearchRenderScope) => VNode; // 自定义搜索内容渲染（tsx语法）
} & Partial<Record<BreakPoint, Responsive>> &
	(
		| TextConfig
		| NumberConfig
		| SelectConfig
		| SelectV2Config
		| DatePickerConfig
		| TimePickerConfig
		| TimeSelectConfig
		| SliderConfig
		| SwitchConfig
		| TreeSelectConfig
		| CascaderConfig
		| CheckboxConfig
	);

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
	extends Partial<Omit<TableColumnCtx<T>, "children" | "renderCell" | "renderHeader">> {
	tag?: boolean; // 是否是标签展示
	isShow?: boolean; // 是否显示在表格当中
	search?: SearchProps; // 搜索项配置
	enum?: EnumProps[] | ((params?: any) => Promise<any>); // 枚举类型（字典）
	isFilterEnum?: boolean; // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
	fieldNames?: FieldNamesProps; // 指定 label && value && children 的 key 值
	headerRender?: (scope: HeaderRenderScope<T>) => VNode; // 自定义表头内容渲染（tsx语法）
	render?: (scope: RenderScope<T>) => VNode | string; // 自定义单元格内容渲染（tsx语法）
	_children?: ColumnProps<T>[]; // 多级表头
}
