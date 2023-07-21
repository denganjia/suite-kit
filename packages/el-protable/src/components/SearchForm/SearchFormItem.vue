<template>
  <component
      :is="rendered_component"
      v-bind="{ ...handleSearchProps, ...placeholder, searchParam: _searchParam, clearable }"
      v-model.trim="_searchParam[column.search?.key ?? handleProp(column.prop!)]"
      :data="column.search?.el === 'tree-select' ? columnEnum : []"
      :options="['cascader', 'select-v2'].includes(column.search?.el!) ? columnEnum : []"
  >
    <template v-if="column.search?.el === 'cascader'" #default="{ data }">
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="column.search?.el === 'select'">
      <el-option
          v-for="(col, index) in columnEnum"
          :key="index"
          :label="col[fieldNames.label]"
          :value="col[fieldNames.value]"
      ></el-option>
    </template>
    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts">
import {computed, inject, ref} from "vue";
import {ColumnProps} from "../../index.d";
import {
  ElInput,
  ElInputNumber,
  ElSelect,
  ElSelectV2,
  ElTreeSelect,
  ElCascader,
  ElDatePicker,
  ElTimePicker,
  ElTimeSelect,
  ElSwitch,
  ElSlider,
  ElOption
} from "element-plus";

defineOptions({
  name: "ElProTableSearchFormItem"
})

const fields = {
  "el-input": ElInput,
  "el-input-number": ElInputNumber,
  "el-select": ElSelect,
  "el-select-v2": ElSelectV2,
  "el-tree-select": ElTreeSelect,
  "el-cascader": ElCascader,
  "el-date-picker": ElDatePicker,
  "el-time-picker": ElTimePicker,
  "el-time-select": ElTimeSelect,
  "el-switch": ElSwitch,
  "el-slider": ElSlider,
};

const rendered_component = computed(() => {
  if (props.column.render) return props.column.render;
  else return fields[`el-${props.column.search?.el}`];
});

function handleProp(prop: string) {
  const propArr = prop.split(".");
  if (propArr.length == 1) return prop;
  return propArr[propArr.length - 1];
}

interface SearchFormItem {
  column: ColumnProps;
  searchParam: { [key: string]: any };
}

const props = defineProps<SearchFormItem>();

// Re receive SearchParam
const _searchParam = computed(() => props.searchParam);

// 判断 fieldNames 设置 label && value && children 的 key 值
const fieldNames = computed(() => {
  return {
    label: props.column.fieldNames?.label ?? "label",
    value: props.column.fieldNames?.value ?? "value",
    children: props.column.fieldNames?.children ?? "children",
  };
});

// 接收 enumMap (el 为 select-v2 需单独处理 enumData)
const enumMap = inject("enumMap", ref(new Map()));
const columnEnum = computed(() => {
  let enumData = enumMap.value.get(props.column.prop);
  if (!enumData) return [];
  if (props.column.search?.el === "select-v2" && props.column.fieldNames) {
    enumData = enumData.map((item: { [key: string]: any }) => {
      return {...item, label: item[fieldNames.value.label], value: item[fieldNames.value.value]};
    });
  }
  return enumData;
});

// 处理透传的 searchProps (el 为 tree-select、cascader 的时候需要给下默认 label && value && children)
const handleSearchProps = computed(() => {
  const label = fieldNames.value.label;
  const value = fieldNames.value.value;
  const children = fieldNames.value.children;
  const searchEl = props.column.search?.el;
  let searchProps = props.column.search?.props ?? {};
  if (searchEl === "tree-select") {
    searchProps = {...searchProps, props: {...searchProps.props, label, children}, nodeKey: value};
  }
  if (searchEl === "cascader") {
    searchProps = {...searchProps, props: {...searchProps.props, label, value, children}};
  }
  return searchProps;
});

// 处理默认 placeholder
const placeholder = computed(() => {
  const search = props.column.search;
  if (["datetimerange", "daterange", "monthrange"].includes(search?.props?.type) || search?.props?.isRange) {
    return {rangeSeparator: "至", startPlaceholder: "开始时间", endPlaceholder: "结束时间"};
  }
  const placeholder = search?.props?.placeholder ?? (search?.el?.includes("input") ? "请输入" : "请选择");
  return {placeholder};
});

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
  const search = props.column.search;
  return search?.props?.clearable || search?.defaultValue == null || false;
});
</script>
../..