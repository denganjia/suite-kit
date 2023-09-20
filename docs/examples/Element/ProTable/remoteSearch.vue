<template>
  <div class="table">
    <ProTable :columns="columns" :request-api="getDataApi"></ProTable>
  </div>
</template>

<script setup lang="ts">
import ProTable, { ColumnProps } from "@suite-kit/el-protable";
import { getDataApi } from "../../../fetch";
import { ref } from "vue";
const nameList = ref([
  { label: "张三", value: "张三" },
  { label: "李四", value: "李四" },
  { label: "王五", value: "王五" },
  { label: "赵六", value: "赵六" },
  { label: "田七", value: "田七" },
  { label: "王麻子", value: "王麻子" },
  { label: "李二狗", value: "李二狗" },
  { label: "张三丰", value: "张三丰" },
  { label: "王二麻子", value: "王二麻子" },
]);
const options = ref<any>([]);
const remoteMethod = (query: string) => {
  options.value.length = 0;
  if (query) {
    setTimeout(() => {
      options.value = nameList.value.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      );
    }, 200);
  }
};
const columns: ColumnProps[] = [
  {
    label: "姓名",
    prop: "name",
    enum: options,
    search: {
      el: "select",
      props: {
        remote: true,
        filterable: true,
        remoteMethod,
      },
    },
    isFilterEnum: false,
  },
  { label: "年龄", prop: "age" },
];
</script>
