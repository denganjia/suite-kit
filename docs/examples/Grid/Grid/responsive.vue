<template>
	<Grid :gap="[20, 20]" :cols="24">
		<GridItem v-for="item in 10" :key="item" v-bind="responsive">
			<div class="box" :class="item % 2 == 0 ? 'light-3' : 'dark'"></div>
		</GridItem>
	</Grid>
	<hr />
	<Grid :gap="[20, 20]" :cols="{ xs: 1, sm: 2, md: 3, xl: 4, lg: 4 }">
		<GridItem v-for="item in 10" :key="item">
			<div class="box" :class="item % 2 == 0 ? 'light-3' : 'dark'"></div>
		</GridItem>
	</Grid>
</template>

<script setup lang="ts">
import { Grid, GridItem, Responsive, BreakPoint } from "@suite-kit/grid";
import { reactive } from "vue";
const responsive = reactive<Record<BreakPoint, Responsive>>({
	xs: {
		span: 24,
	},
	sm: {
		span: 12,
	},
	md: {
		span: 8,
	},
	lg: {
		span: 6,
	},
	xl: {
		span: 4,
	},
});
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
