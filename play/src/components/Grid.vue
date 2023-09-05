<template>
	<el-button type="primary" @click="click">{{ collapsed ? "展开" : "折叠" }}</el-button>
	<p></p>
	<Grid :gap="[20, 20]" :cols="{ xl: 24, lg: 24, md: 12, sm: 8, xs: 1 }" :collapsed="collapsed" :collapsed-rows="1">
		<GridItem :span="{ xl: 4, lg: 4, md: 3, sm: 2, xs: 1 }" suffix #="{ overflow }">
			<div class="box" @click="click">
				{{ overflow ? "展开" : "折叠" }}
			</div>
		</GridItem>
		<template v-for="item in 6" :key="item">
			<GridItem :span="4" :offset="0">
				<div class="box" :class="item % 2 == 0 ? 'light-3' : 'dark'">
					{{ item }}
				</div>
			</GridItem>
		</template>
	</Grid>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElButton } from "element-plus";
import { GridItem, Grid } from "@suite-kit/grid";
const collapsed = ref(false);
const click = () => {
	collapsed.value = !collapsed.value;
};
</script>

<style scoped lang="scss">
.box {
	width: 100%;
	height: 32px;
	background-color: var(--el-color-success);
	line-height: 32px;
	text-align: center;
}
.light-3 {
	background-color: var(--el-color-primary-light-3);
}
.dark {
	background-color: var(--el-color-primary-dark-2);
}
</style>
