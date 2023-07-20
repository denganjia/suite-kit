import {VNode, ComponentPublicInstance, PropType, Component, ExtractPropTypes} from "vue";
import {BreakPoint, Responsive} from "@suite-kit/grid";
import {TableColumnCtx} from "element-plus/es/components/table/src/table-column/defaults";
import {TimeSelectProps} from "element-plus/es/components/time-select/src/time-select"
import {ProTableProps} from "./src/ProTable.vue";
import ProTable from "./src/ProTable.vue";
import type {
  InputProps,
  SelectProps as SelectV2Props,
  InputNumberProps,
  DatePickerProps,
  CheckboxProps,
  cascaderProps,
  TimePickerDefaultProps,
  SwitchProps,
  SliderProps
} from "element-plus";

type SelectProps = {
  name: string,
  id: string,
  autocomplete: string,
  automaticDropdown: boolean,
  size: 'large' | 'default' | 'small',
  effect: 'light' | 'dark',
  disabled: boolean,
  clearable: boolean,
  filterable: boolean,
  allowCreate: boolean,
  loading: boolean,
  popperClass: string,
  remote: boolean,
  loadingText: string,
  noMatchText: string,
  noDataText: string,
  remoteMethod: Function,
  filterMethod: Function,
  multiple: boolean,
  multipleLimit: number,
  placeholder: string,
  defaultFirstOption: boolean,
  reserveKeyword: boolean,
  valueKey: string,
  collapseTags: boolean,
  collapseTagsTooltip: boolean,
  maxCollapseTags: number,
  teleported: boolean,
  persistent: boolean,
  clearIcon: PropType<string | Component>,
  fitInputWidth: boolean,
  suffixIcon: PropType<string | Component>,
  tagType: 'success' | 'info' | 'warning' | 'danger',
  validateEvent: boolean,
  remoteShowSuffix: boolean,
  suffixTransition: boolean,
  placement: string,
}

type CascaderProps = ExtractPropTypes<typeof cascaderProps>

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
  el?: SearchType; // 当前项搜索框的类型
  props?: any; // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  key?: string; // 当搜索项 key 不为 prop 属性时，可通过 key 指定
  order?: number; // 搜索项排序（从大到小）
  span?: number; // 搜索项所占用的列数，默认为1列
  offset?: number; // 搜索字段左侧偏移列数
  defaultValue?: string | number | boolean | any[]; // 搜索项默认值
  render?: (scope: SearchRenderScope) => VNode; // 自定义搜索内容渲染（tsx语法）
} & Partial<Record<BreakPoint, Responsive>>;

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

export interface ColumnProps<T = any> extends Partial<Omit<TableColumnCtx<T>, "children" | "renderCell" | "renderHeader">> {
  tag?: boolean; // 是否是标签展示
  isShow?: boolean; // 是否显示在表格当中
  search?: SearchProps | undefined; // 搜索项配置
  enum?: EnumProps[] | ((params?: any) => Promise<any>); // 枚举类型（字典）
  isFilterEnum?: boolean; // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
  fieldNames?: FieldNamesProps; // 指定 label && value && children 的 key 值
  headerRender?: (scope: HeaderRenderScope<T>) => VNode; // 自定义表头内容渲染（tsx语法）
  render?: (scope: RenderScope<T>) => VNode | string; // 自定义单元格内容渲染（tsx语法）
  _children?: ColumnProps<T>[]; // 多级表头
}

export type ProTableInstance = Omit<InstanceType<typeof ProTable>, keyof ComponentPublicInstance | keyof ProTableProps>;
