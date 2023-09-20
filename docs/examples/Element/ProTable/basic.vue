<template>
  <div class="table">
    <ProTable :columns="columns" :request-api="getDataApi"></ProTable>
  </div>
</template>

<script setup lang="ts">
import ProTable, { ColumnProps } from "@suite-kit/el-protable";
import { getDataApi } from "../../../fetch";
import { dayjs } from "element-plus";

const columns: ColumnProps[] = [
  { label: "姓名", prop: "name", search: { el: "text" } },
  { label: "年龄", prop: "age" },
  {
    label: "性别",
    prop: "gender",
    enum: [
      { label: "男", value: 1 },
      { label: "女", value: 0 },
    ],
    search: { el: "select" },
  },
  {
    label: "创建时间",
    prop: "createTime",
    render({ row }) {
      return dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss");
    },
    search: { el: "date-picker" },
  },
];
</script>
