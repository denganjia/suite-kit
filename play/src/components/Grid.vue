<template>
	<el-button type="primary" @click="click">{{ collapsed ? "展开" : "折叠" }}</el-button>
	<p></p>
	<GridTsx :gap="[20, 20]" :cols="24" :collapsed="collapsed" :collapsed-rows="1">
		<template v-for="item in 10" :key="item">
			<GridItemTsx :span="item % 2 == 0 ? 8 : 4">
				<div class="box" :class="item % 2 == 0 ? 'light-3' : 'dark'"></div>
			</GridItemTsx>
		</template>
		<GridItem :span="2" :suffix="true">
			<div class="box light-3"></div>
		</GridItem>
	</GridTsx>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElButton } from "element-plus";
import { GridItem, GridItemTsx, GridTsx } from "@suite-kit/grid";
const collapsed = ref(true);
const click = () => {
	collapsed.value = !collapsed.value;
};
</script>

<style scoped lang="scss">
.box {
	width: 100%;
	height: 32px;
}
.light-3 {
	background-color: var(--el-color-primary-light-3);
}
.dark {
	background-color: var(--el-color-primary-dark-2);
}
</style>
