<template>
	<Grid :gap="[20, 20]">
		<GridItem v-for="item in 10" :key="item">
			<div class="box" :class="item % 2 == 0 ? 'light-3' : 'dark'"></div>
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
}
.light-3 {
	background-color: var(--el-color-primary-light-3);
}
.dark {
	background-color: var(--el-color-primary-dark-2);
}
</style>
