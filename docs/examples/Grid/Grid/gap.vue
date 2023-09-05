<template>
	<div>
		<el-space size="large">
			<div style="width: 200px">
				<el-form-item label="横向间距">
					<el-input-number :max="100" :min="0" v-model="gap.x"></el-input-number>
				</el-form-item>
			</div>
			<div style="width: 200px">
				<el-form-item label="纵向间距">
					<el-input-number :max="100" :min="0" v-model="gap.y"></el-input-number>
				</el-form-item>
			</div>
		</el-space>
		<Grid :gap="[gap.x, gap.y]">
			<GridItem v-for="item in 8" :key="item" :span="6">
				<div class="box" :class="item % 2 == 0 ? 'light-3' : 'dark'"> {{ item }}</div>
			</GridItem>
		</Grid>
		<hr />
		<el-space size="large">
			<div style="width: 200px">
				<el-form-item label="间距">
					<el-input-number :max="100" :min="0" v-model="gap.total"></el-input-number>
				</el-form-item>
			</div>
		</el-space>
		<Grid :gap="gap.total">
			<GridItem v-for="item in 8" :key="item" :span="6">
				<div class="box" :class="item % 2 == 0 ? 'light-3' : 'dark'"> {{ item }}</div>
			</GridItem>
		</Grid>
	</div>
</template>

<script setup lang="ts">
import { Grid, GridItem } from "@suite-kit/grid";
import { ElFormItem, ElSpace, ElInputNumber } from "element-plus";
import { reactive } from "vue";

const gap = reactive({
	x: 20,
	y: 20,
	total: 20,
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
