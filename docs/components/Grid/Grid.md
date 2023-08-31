# Grid布局组件

使用`display:grid`实现的网格布局系统，默认栅栏列数是`({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })`

:::warning 警告
`Grid`组件的子元素只能是`GridItem`
:::

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

Grid组件默认生成的响应式列数是**4**列，可传入`cols`手动设置，除了传入一个固定的数字外，也可传入响应式配置

:::demo
Grid/Grid/responsive
:::

## 折叠

设置`collapsed`来控制折叠状态，设置`collapsedRows`控制折叠后的行数
:::demo
Grid/Grid/collapsed
:::

## Grid属性

## GridItem属性
