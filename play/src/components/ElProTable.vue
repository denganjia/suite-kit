<template>
  <ProTable :request-api="fetchData" :columns="columns" border></ProTable>
</template>
<script setup lang="ts">
import ProTable from "@suite-kit/el-protable"
import type {ProTableInstance, ColumnProps} from "@suite-kit/el-protable/index.d"
import {fetchData} from "../fetch"


const columns: ColumnProps[] = [
  {label: "姓名", prop: "name", search: {el: "input"}},
  {label: "年龄", prop: "age", search: {el: "input-number"}},
  {label: "时间", prop: "date", search: {el: "date-picker", props: {"value-format": "x"}}},
  {
    label: "性别", prop: "gender", search: {el: "select"},
    enum: [
      {label: "男", value: 1},
      {label: "女", value: 0},
    ]
  }
]
</script>


<style scoped>

</style>
