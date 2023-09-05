<template>
	<Grid :gap="[20, 20]" :cols="24">
		<GridItem v-for="item in 8" :key="item" v-bind="responsive">
			<div class="box" :class="item % 2 == 0 ? 'light-3' : 'dark'">{{ item }}</div>
		</GridItem>
	</Grid>
	<hr />
	<Grid :gap="[20, 20]" :cols="{ xs: 1, sm: 2, md: 3, xl: 4, lg: 4 }">
		<GridItem v-for="item in 8" :key="item">
			<div class="box" :class="item % 2 == 0 ? 'light-3' : 'dark'">{{ item }}</div>
		</GridItem>
	</Grid>
</template>

<script setup lang="ts">
import { Grid, GridItem, BreakPoint } from "@suite-kit/grid";
import { reactive } from "vue";
const responsive = reactive<{ span: { [K in BreakPoint]: number } }>({
	span: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4 },
});
</script>

<style scoped lang="scss">
.box {
	width: 100%;
	height: 32px;
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
