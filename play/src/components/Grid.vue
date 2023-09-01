<template>
	<el-button type="primary" @click="click">{{ collapsed ? "展开" : "折叠" }}</el-button>
	<p></p>
	<GridTsx :gap="[20, 20]" :cols="24" :collapsed="collapsed" :collapsed-rows="1">
		<template v-for="item in 10" :key="item">
			<GridItemTsx :span="item % 2 == 0 ? 8 : 4">
				<div class="box" :class="item % 2 == 0 ? 'light-3' : 'dark'"></div>
			</GridItemTsx>
		</template>
		<GridItemTsx :span="2" :suffix="true">
			<div class="box"></div>
		</GridItemTsx>
	</GridTsx>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElButton } from "element-plus";
import { GridItemTsx, GridTsx } from "@suite-kit/grid";
const collapsed = ref(true);
const offset = ref(1);
const click = () => {
	collapsed.value = !collapsed.value;
	offset.value++;
};
</script>

<style scoped lang="scss">
.box {
	width: 100%;
	height: 32px;
	background-color: var(--el-color-success);
}
.light-3 {
	background-color: var(--el-color-primary-light-3);
}
.dark {
	background-color: var(--el-color-primary-dark-2);
}
</style>
