<template>
  <ProTable :request-api="api" :columns="columns"></ProTable>
</template>
<script setup lang="ts">
import ProTable from "@suite-kit/el-protable"
import type {ProTableInstance, ColumnProps} from "@suite-kit/el-protable/index.d"

const api = async (p: any) => {
  console.log(p)
  return {
    code: 200,
    data: {
      list: [
      ],
      total: 1
    }
  }
}
const columns: ColumnProps[] = [
  {label: "姓名", prop: "name", search: {el: "input"}}
]
</script>


<style scoped>

</style>
