import { defineComponent, h, computed, ref, inject, PropType, Ref, getCurrentInstance } from "vue";
import { BreakPoint, Responsive } from "./type";
interface GridItemVNodeProps {
	privateShow?: boolean;
}
export const gridItemProps = {
	span: { type: Number, default: 1 },
	offset: { type: Number, default: 0 },
	suffix: { type: Boolean, default: false },
	xs: {
		type: Object as PropType<Responsive>,
	},
	sm: {
		type: Object as PropType<Responsive>,
	},
	md: {
		type: Object as PropType<Responsive>,
	},
	lg: {
		type: Object as PropType<Responsive>,
	},
	xl: {
		type: Object as PropType<Responsive>,
	},
	// private props
	privateShow: { type: Boolean, default: true },
} as const;
export default defineComponent({
	__Grid_Item__: true,
	name: "GridItem",
	props: gridItemProps,
	setup(props, { slots, attrs }) {
		const self = getCurrentInstance();

		const breakPoint = inject<Ref<BreakPoint>>("breakPoint", ref("xl"));
		const gap = inject("gap", 0);
		const cols = inject("cols", ref(4));
		const style = computed(() => {
			let span = props[breakPoint.value]?.span ?? props.span;
			let offset = props[breakPoint.value]?.offset ?? props.offset;
			if (props.suffix) {
				return {
					gridColumnStart: cols.value - span - offset + 1,
					gridColumnEnd: `span ${span + offset}`,
					marginLeft: offset !== 0 ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})` : "unset",
				};
			} else {
				return {
					gridColumn: `span ${span + offset > cols.value ? cols.value : span + offset}/span ${
						span + offset > cols.value ? cols.value : span + offset
					}`,
					marginLeft: offset !== 0 ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})` : "unset",
				};
			}
		});

		return () =>
			// @ts-ignore
			h("div", { style: { ...style.value, display: self?.vnode.props.privateShow ? "" : "none" } }, slots.default());
	},
});
