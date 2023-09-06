# Grid布局组件

使用`display:grid`实现的网格布局组件，默认栅栏列数是`24`

:::warning 警告
`Grid`组件的子元素只能是`GridItem`
:::

:::tip 提示
`Grid`组件内部使用的断点是参照[`El-Layout`](https://element-plus.org/zh-CN/component/layout.html#col-attributes)设计的
:::

## 安装

```sh
yarn add @suite-kit/el-protable
# or
npm i @suite-kit/el-protable
```

## 基础用法

::: demo
Grid/Grid/basic
:::

## 间隔

可以传递数组精准控制两个方向的间距，也可以传递一个数字同时设置两个方向的间距

::: demo
Grid/Grid/gap
:::

## 偏移

设置`offset`来控制GridItem的偏移量，也可以设置**响应式**的`offset`

:::demo
Grid/Grid/offset
:::

## 响应式列数

Grid组件默认生成的响应式列数是**24**列，可传入`cols`手动设置，除了传入一个固定的数字外，也可传入响应式配置

:::demo
Grid/Grid/responsive
:::

## 折叠

设置`collapsed`来控制折叠状态，设置`collapsedRows`控制折叠后的行数
:::demo
Grid/Grid/collapsed
:::

## Grid属性

| 参数      | 说明                                                         | 类型                                                     | 默认值     |
| --------- | ------------------------------------------------------------ | -------------------------------------------------------- | ---------- |
| cols      | 栅栏列数                                           | `number \| { xs: number, sm: number, md: number, lg: number, xl: number }` | 24|
| collapsed  | 是否折叠                                                     | `boolean`                                                | false      |
| collapsedRows | 折叠后行数                                                  | `number`                                                 | 1         |
| gap | 栅栏间距                                                  | `number \| [xGap:number,yGap:number]`| 0|

## GridItem属性

| 参数 | 说明 | 类型 | 默认值|
| --- | --- | --- | --- |
| span | 占据的列数 | `number\|Record<'xs'\|'sm'\|'md'\|'lg'\|'xl'>` | 1 |
| offset | 栅栏偏移量 | `number\|Record<'xs'\|'sm'\|'md'\|'lg'\|'xl'>` | 0 |
| suffix | 是否后缀 | `boolean` | `false` |
