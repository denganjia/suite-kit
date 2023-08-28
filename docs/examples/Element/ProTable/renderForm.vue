<template>
  <div class="table">
    <ProTable :columns="columns" :request-api="getDataApi"></ProTable>
  </div>
</template>

<script setup lang="tsx">
import ProTable from "@suite-kit/el-protable";
import { ColumnProps, SearchRenderScope } from "@suite-kit/el-protable";
import { getDataApi } from "../../../fetch";
import { dayjs, ElAutocomplete } from "element-plus";
import { onMounted, ref } from "vue";

const restaurants = ref<RestaurantItem[]>([]);
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value;
  cb(results);
};
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};
const loadAll = () => {
  return [
    { value: "vue", link: "https://github.com/vuejs/vue" },
    { value: "element", link: "https://github.com/ElemeFE/element" },
    { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
    { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
    { value: "vuex", link: "https://github.com/vuejs/vuex" },
    { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
    { value: "babel", link: "https://github.com/babel/babel" },
  ];
};

const handleSelect = (item: RestaurantItem) => {
  console.log(item);
};

onMounted(() => {
  restaurants.value = loadAll();
});

const columns: ColumnProps[] = [
  {
    label: "姓名",
    prop: "name",
    search: {
      // 使用自己的渲染函数
      render(scope: SearchRenderScope) {
        return (
          <ElAutocomplete
            modelValue={scope.searchParam["name"]}
            fetchSuggestions={querySearch}
            placeholder="请输入姓名"
            onSelect={handleSelect}
            onUpdateModelValue={(value: string) => {
              scope.searchParam["name"] = value;
            }}
          ></ElAutocomplete>
        );
      },
    },
  },
  { label: "年龄", prop: "age" },
  {
    label: "性别",
    prop: "gender",
    enum: [
      { label: "男", value: 1 },
      { label: "女", value: 0 },
    ],
    search: {
      // 使用默认预设
      el: "select",
    },
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
