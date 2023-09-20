<template>
  <div class="table">
    <ProTable :columns="columns" :request-api="getDataApi"></ProTable>
  </div>
</template>

<script setup lang="ts">
import ProTable, { ColumnProps } from "@suite-kit/el-protable";
import { getDataApi } from "../../../fetch";

//模拟函数请求
const getGenderEnum = async () => {
  // 必须返回一个 {data:any}
  return {
    data: [
      { label: "男", value: 1 },
      { label: "女", value: 0 },
    ],
  };
};

const columns: ColumnProps[] = [
  { label: "姓名", prop: "name", search: { el: "text" } },
  { label: "年龄", prop: "age" },
  {
    label: "性别",
    prop: "gender",
    enum: getGenderEnum,
    search: { el: "select" },
  },
];
</script>
