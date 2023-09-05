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
	setup(props) {
		const { cols, gap, overflow } = inject("responsive", {
			cols: ref(4),
			gap: 0,
			overflow: ref(false),
		});
		return {
			driveStyle(breakPoint: string) {
				const span = typeof props.span === "object" ? props.span[breakPoint as BreakPoint] ?? 1 : props.span;
				const offset = typeof props.offset === "object" ? props.offset[breakPoint as BreakPoint] ?? 0 : props.offset;
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
			overflow: overflow,
		};
	},
	render() {
		// @ts-ignore
		return (
			<div
				style={{
					display: this.$attrs.privateShow === false ? "none" : "",
					...this.driveStyle(this.$attrs.breakPoint as BreakPoint),
				}}>
				{this.$slots.default?.({ overflow: this.overflow })}
			</div>
		);
	},
});
