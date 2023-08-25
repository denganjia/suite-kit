<template>
  <div class="table">
    <ProTable :columns="columns" :data="data"></ProTable>
  </div>
</template>

<script setup lang="ts">
import ProTable from "@suite-kit/el-protable";
import { ColumnProps } from "@suite-kit/el-protable";
import { dayjs } from "element-plus";

const data = Array(20)
  .fill(undefined)
  .map((_, index) => {
    return {
      name: `张三` + index,
      age: index + 1,
      gender: index % 2,
      createTime: dayjs(),
    };
  });

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
