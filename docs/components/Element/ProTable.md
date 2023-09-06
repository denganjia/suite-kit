---
---

# ProTable 超级表格

将搜索表单、表格主体、分页组件封装在一起的超级表格，最少只需要传递一个函数和一个列配置即可生成带搜索表单、表格主体、分页的组件

## 安装

```sh
yarn add @suite-kit/el-protable
# or
npm i @suite-kit/el-protable
```

## 基础用法

如果没有什么特殊要求，给组件传递一个请求函数`request-api`和`columns`就能生成一个基础表格
:::demo
Element/ProTable/basic
:::

## 使用本地数据

如果不想使用`request-api`，你可以直接传递`data`属性，数据会直接传递到`el-table`上

:::tip
使用本地数据时，表格搜索功能不再生效
:::

:::demo
Element/ProTable/data
:::

## 自定义表格渲染

如果需要自定义表格渲染，可以在 column 上传递`headerRender`和`render`属性，或者使用[插槽](#插槽)

对于表格操作列，推荐的`prop`名称是 operation

:::demo
Element/ProTable/render
:::

## 自定义搜索项

如果需要自定义搜索项，可以在`column.search`上传递`render`属性。非不得已的情况下，不推荐自定义搜索项，因为无论是使用`h`
函数还是使用`jsx`对新手都极不友好

:::demo
Element/ProTable/renderForm
:::

## 响应式搜索表单

搜索表单使用[`@suite-kit/Grid`](/components/Grid/Grid)构建，支持响应式。

默认响应式配置是`{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }`，一个搜索项占一列，可以根据需要自行配置，同时可设置`order`
来改变搜索项展示的顺序，默认是按照 columns 的顺序展示

:::demo
Element/ProTable/responsive
:::

## 使用函数式 enum

对于一些需要使用字段或者枚举值来格式化的数据来说，enum 除了可以传确切的值意外，还可以使用一个函数

::: tip
如果要使用函数，请注意函数的返回值**必须**是一个对象，且 enum 数据要在对象的 data 属性中
:::

::: demo
Element/ProTable/enumFunction
:::

## 下拉框远程搜索

远程搜索请参考[el-select 远程搜索](https://element-plus.org/zh-CN/component/select.html#%E8%BF%9C%E7%A8%8B%E6%90%9C%E7%B4%A2)。

:::demo
Element/ProTable/remoteSearch
:::

## 搜索项联动

某些情况下，你可能需要类似于省市区联动搜索，推荐使用[el-cascader](https://element-plus.org/zh-CN/component/cascader.html#cascader-%E7%BA%A7%E8%81%94%E9%80%89%E6%8B%A9%E5%99%A8)，也可以按照下方的示例自己实现搜索框联动

:::demo
Element/ProTable/searchLinkage
:::

## 搜索项默认值为后端数据

某些特殊情况下，你的某个下拉搜索项的默认值可能是从后端获取的

将`request-auto`设置`false`，在`onMounted`中拿到ProTable实例的`enumMap`后手动给`searchInitParam`和`searchParam`赋值再手动调用`getTableList`

:::demo
Element/ProTable/defaultValue
:::

## 行拖动

只需要给column加一列`{type:"drag"}`就可以生成一条用来拖动的列

拖动排序，改变的**只是**dom结构，并**不会**改变表格数据，可以监听`drag-sort`事件

::: demo
Element/ProTable/drag
:::

## 属性

::: tip
`@suite-kit/ElProTable`扩展了`ElTable`，对于`ElTable`的属性在`@suite-kit/ElProTable`内部使用`$attrs`
传递给`ElTable`组件，所以在`@suite-kit/ElProTable`
组件上没有类型提示。参考[ElTable](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7)
:::

| 属性名       | 说明                                                                                                                        | 类型                                                                                                            | 默认值                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| columns      | 表格列配置                                                                                                                  | [`ColumnsProps`](#columnsprops)[]                                                                               | ——                                      |
| data         | 表格数据，优先级要高于`request-api`                                                                                         | `any[]`                                                                                                         |                                         |
| requestApi   | 数据源                                                                                                                      | `(params:any)=>Promise<any>`                                                                                    |                                         |
| requestAuto  | 是否在组件加载后自动执行请求（`request-api`）                                                                               | `boolean`                                                                                                       | `true`                                  |
| requestError | `request-api`请求错误回调                                                                                                   | `(params: any) => void`                                                                                         |                                         |
| dataCallback | 返回数据的回调函数，可以对数据进行处理                                                                                      | `(data: any)=> ({ data: any[] } \| { list: any[]; total: number; pageSize?: number; pageNum?: number });`       |                                         |
| title        | 表格标题                                                                                                                    | `string`                                                                                                        |                                         |
| pagination   | 分页器的配置，可根据`el-pagination`传入相同的配置                                                                           | [`PaginationConfig`](https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7) \| `boolean;` | `true`                                  |
| initParam    | 初始化请求参数，会传递给`request-api`。如果想在`initPrams`数据变化时自动刷新表格数据，`initPrams`需要是`reactive`创建的代理 | `any`                                                                                                           |                                         |
| border       | 同`ElTable`的`border`                                                                                                       | `boolean`                                                                                                       | `true`                                  |
| toolButton   | 表格顶部右侧工具栏，可以传递布尔值来控制显示隐藏，也可以额传入一个 string[]来控制具体的某一个                               | `['refresh','setting','search'] \| boolean`                                                                     | `true`                                  |
| rowKey       | 同`ElTable`的`row-key`                                                                                                      | `string`                                                                                                        | `id`                                    |
| searchCol    | 表格搜索项每列占比配置                                                                                                      | `number \| Record<BreakPoint, number>`                                                                         | `{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }` |

## 插槽

| 插槽                | 说明|
| ------------------- | ----- |
| default             | `ElTable`默认插槽|
| append              | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。                                           |
| empty               | 当数据为空时自定义的内容|
| tableHeader         | 表格头部左侧区域插槽|
| toolButton          | 表格头部右侧区域插槽|
| `column.prop`       | 表格列具名插槽。示例：如果有个列的 prop 属性是`type`，那`suite-kit/ElProTable`中也会有一个 `<slot name="type"></slot>`的插槽|
| `column.prop`Header | 表格列表头部分具名插槽。示例：如果有个列的 prop 属性是`type`，那`suite-kit/ElProTable`中也会有一个 `<slot name="typeHeader"></slot>`的插槽。推荐使用[headerRender](#columnsprops)|     |
| pagination          | 分页器|

## 事件

:::tip
`suite-kit/ElProTable`继承了`ElTable`中除`selection-change`
外的所有事件。参考[Table 事件](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)
:::
以下是`suite-kit/ElProTable`独有事件

| 事件名    | 说明                                       | 参数                     |
| --------- | ------------------------------------------ | ------------------------ |
| search    | 搜索时触发                                 |                          |
| refresh   | 刷新时触发                                 |                          |
| request   | 请求数据时触发，在使用`data`时**不会触发** |                          |
| reset     | 重置搜索表单数据后触发                     |                          |
| drag-sort | 拖拽排序后触发                             | (newIndex,oldIndex,data) |

## 实例

以下是通过 ref 获取到`suite-kit/ElProTable`的实例的属性

你可以从`@suite-kit/el-protable`中导入`ProTableInstance`类型

| 名称                | 描述                                                                                           | 类型                                                |
| ------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| element             | 内部`el-table`的实例                                                                           | `Ref<InstanceType<typeof ElTable>>`                 |
| enumMap             | 收集的字典                                                                                     | `Ref<Map<string,{[key:string]:any}[]>>`             |
| tableData           | 表格数据                                                                                       | `any[]`                                             |
| pageable            | 分页配置                                                                                       | `{pageNum: number;pageSize: number;total: number;}` |
| searchParam         | 搜索表单绑定值                                                                                 | `{[key:string]:any}`                                |
| searchInitParam     | 初始化搜索参数                                                                                 | `{[key:string]:any}`                                |
| getTableList        | 手动调用传入的`request-api`，未执行`search`之前只会携带`searchInitParam`，不会携带搜索表单数据 | `()=>void`                                          |
| search              | 主要用于将搜索表单的数据合并到总搜索参数中再执行`getTableList`                                 | `()=>void`                                          |
| rest                | 重置搜索表单，将所有参数还原（如果有），再执行`getTableList`                                   | `()=>void`                                          |
| handleSizeChange    | 手动设置分页器每页条数                                                                         | `(val:number)=>void`                                |
| handleCurrentChange | 手动设置分页器当前页                                                                           | `(val:number)=>void`                                |
| clearSelection      | 清空表格所选数据，其实就是 el-table 的 clearSelection                                          | `()=>void`                                          |
| isSelected          | 当前是否有选择的数据                                                                           | `Ref<boolean>`                                      |
| selectedList        | 选择的数据                                                                                     | `Ref<any[]>`                                        |
| selectedListIds     | 选择的数据的`row-key`，row-key 默认是`id`                                                      | `Ref<string[]>`                                     |

## ColumnsProps

::: tip
`ColumnProps`包含了`ElTableColumn`中除`children`,`renderCell`,`renderHeader`,`type`
外所有的属性，参考[Table-column 属性](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7)

**所有属性均为非必传**
:::

| 属性名       | 描述                                                                         | 类型                                                                                          |
| ------------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| type         | 列类型                                                                       | `"index"` \| `"selection"` \| `"expand"` \| `"drag"`                                          |
| tag          | 数据是否通过`el-tag`渲染，需要配合`enum`使用                                 | `boolean`                                                                                     |
| isShow       | 是否在表格显示当前列                                                         | `boolean \| Ref<boolean>`                                                                     |
| search       | 搜索配置                                                                     | [`SearchProps`](#searchprops)                                                                 |
| enum         | 枚举字典                                                                     | [`EnumProps`](#typescript)[] \| `((params?: any) => Promise<{data:any}>) \| Ref<EnumProps[]>` |
| isFilterEnum | 当前单元格值是否根据 `enum` 格式化，默认为`true`                             | `boolean`                                                                                     |
| fieldNames   | 指定从`enum`中获取`label`、`value`、`children`的属性值                       | `{label:string,value:string,children?:string}`                                                |
| headerRender | 自定义表头渲染，优先级**高于**插槽                                           | `({column,$index})=>VNode`                                                                    |
| render       | 自定义单元格渲染，也可以在组件上使用同`prop`名称具名插槽，优先级**高于**插槽 | `({column,$index})=>VNode`                                                                    |
| \_children   | 多级表头                                                                     | [`ColumnProps`](#columnsprops)[]                                                              |

## SearchProps

搜索项配置

| 属性名       | 描述                                      | 类型                                  |
| ------------ | ----------------------------------------- | ------------------------------------- |
| el           | 要渲染的表单组件                          | [`SearchType`](#typescript)           |
| props        | 传递给表单组件的属性，参考 Element 官网   | `any`                                 |
| key          | 指定绑定值的名称，默认是 Columns 的`prop` | `srting`                              |
| order        | 搜索项排序从大到小                        | `number`                              |
| span         | 搜索项所占用的列数(grid 布局)，默认 **1** 列  | `number \| { xs: number, sm: number, md: number, lg: number, xl: number }`                              |
| offset       | 搜索项左侧偏移列数                        | `number \| { xs: number, sm: number, md: number, lg: number, xl: number }`                              |
| defaultValue | 搜索项默认值                              | `any`                                 |
| render       | 自定义搜索内容渲染（tsx/h）               | `(scope: SearchRenderScope) => VNode` |

## Typescript

:::details 点我查看 TS 类型代码

```ts

export type BreakPoint = "xs" | "sm" | "md" | "lg" | "xl";

export type SearchProps = {
 el?: SearchType; // 渲染的输入组件
 props?: any; // 输入组件的属性，根据 element plus 官方文档来传递，该属性所有值会透传到搜索组件
 key?: string; // 当搜索项 key 不为 prop 属性时，可通过 key 指定
 order?: number; // 搜索项排序（从大到小）
 span?: number | Record<BreakPoint, number>; // 搜索项所占用的列数，默认为1列
 offset?: number | Record<BreakPoint, number>; // 搜索字段左侧偏移列数
 defaultValue?: any; // 搜索项默认值
 render?: (scope: SearchRenderScope) => VNode; // 自定义搜索内容渲染（tsx/h）
}
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

export interface EnumProps {
 label?: string; // 选项框显示的文字
 value?: string | number | boolean | any[]; // 选项框值
 disabled?: boolean; // 是否禁用此选项
 tagType?: "success" | "info" | "warning" | "danger"; // 当ColumnsProps上的tag为true时，此选项会指定 el-tag 显示类型
 children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
 [key: string]: any; // 其他属性
}

export interface ColumnProps<T = any>
 extends Partial<Omit<TableColumnCtx<T>, "children" | "renderCell" | "renderHeader" | "type">> {
 type?: "index" | "selection" | "expand" | "drag";
 tag?: boolean; // 是否是标签展示
 isShow?: boolean | Ref<boolean>; // 是否显示在表格当中
 search?: SearchProps; // 搜索项配置
 enum?: EnumProps[] | ((params?: any) => Promise<any>) | Ref<EnumProps[]>; // 枚举类型（字典）
 isFilterEnum?: boolean; // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
 fieldNames?: FieldNamesProps; // 指定 label && value && children 的 key 值
 headerRender?: (scope: HeaderRenderScope<T>) => VNode; // 自定义表头内容渲染（tsx/h）
 render?: (scope: RenderScope<T>) => VNode | string; // 自定义单元格内容渲染（tsx/h）
 _children?: ColumnProps<T>[]; // 多级表头 为了和ElTable的children属性做区分，否则会有问题
}
```

:::
