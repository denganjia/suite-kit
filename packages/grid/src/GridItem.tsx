import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
	__GRID_ITEM__: true,
	name: "GridItem",
	props: {
		span: {
			type: Number,
			default: 1,
		},
	},
	setup() {
		const self = getCurrentInstance!();
		return {
			self,
		};
	},
	render() {
		console.log(this.$attrs, this.$props);
		// @ts-ignore
		return <div style={{ display: this.$attrs.privateShow === false ? "none" : "" }}>{this.$slots.default?.()}</div>;
	},
});
