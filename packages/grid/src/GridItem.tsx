import { PropType, defineComponent, inject, ref } from "vue";
import { BreakPoint } from "./type";
export default defineComponent({
	__GRID_ITEM__: true,
	name: "GridItem",
	props: {
		span: {
			type: [Object, Number] as PropType<Partial<Record<BreakPoint, number>> | number>,
			default: 1,
		},
		offset: {
			type: [Object, Number] as PropType<Partial<Record<BreakPoint, number>> | number>,
			default: 0,
		},
		suffix: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { attrs }) {
		const { breakPoint } = attrs;
		const { cols, gap } = inject("responsive", {
			cols: ref(4),
			gap: 0,
		});
		return {
			driveStyle() {
				const span = typeof props.span === "object" ? props.span[breakPoint as BreakPoint] ?? props.span : props.span;
				const offset =
					typeof props.offset === "object" ? props.offset[breakPoint as BreakPoint] ?? props.offset : props.offset;
				const gridColumnStart = cols.value - span - offset + 1;
				const gridColumnEnd = `span ${span + offset > cols.value ? cols.value : span + offset}`;
				const marginLeft = offset !== 0 ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})` : "unset";

				if (props.suffix) {
					return {
						gridColumnStart,
						gridColumnEnd,
						marginLeft,
					};
				} else {
					return {
						gridColumn: `${gridColumnEnd}/span ${span + offset > cols.value ? cols.value : span + offset}`,
						marginLeft,
					};
				}
			},
		};
	},
	render() {
		// @ts-ignore
		return (
			<div style={{ display: this.$attrs.privateShow === false ? "none" : "", ...this.driveStyle() }}>
				{this.$slots.default?.()}
			</div>
		);
	},
});
