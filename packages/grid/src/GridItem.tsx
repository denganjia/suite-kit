import { defineComponent } from "vue";

export default defineComponent({
	__GRID_ITEM__: true,
	name: "GridItem",
	setup() {},
	render() {
		return <div>{this.$slots.default?.()}</div>;
	},
});
