<template>
	<Grid :gap="[20, 20]" :cols="24">
		<GridItem v-for="item in 8" :key="item" :span="item % 2 == 0 ? 8 : 4">
			<div class="box" :class="item % 2 == 0 ? 'light-3' : 'dark'"> {{ item }}</div>
		</GridItem>
	</Grid>
</template>

<script setup lang="ts">
import { Grid, GridItem } from "@suite-kit/grid";
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
