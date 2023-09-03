import { defineComponent, getCurrentInstance, computed, ref, cloneVNode, vShow, Fragment } from "vue";
import type { PropType, VNode } from "vue";
import { flatten } from "../utils/flatten";
import { getSlot } from "../utils/get-slot";
import { BreakPoint } from "./type";
import { isNodeVShowFalse } from "../utils/is-node-v-show-false";
export default defineComponent({
	name: "SuiteKitGrid",
	props: {
		gap: { type: [Array, Number] as PropType<[number, number] | number>, default: [0, 0] },
		cols: { type: [Object, Number] as PropType<Record<BreakPoint, number> | number>, default: 4 },
		collapsed: { type: Boolean, default: false },
		collapsedRows: { type: Number, default: 1 },
		responsive: { type: String as PropType<"self" | "screen">, default: "screen" },
	},
	setup(props) {
		// 注入响应式断点
		let breakPoint = ref<BreakPoint>("xl");
		const self = getCurrentInstance()!;
		// 设置间距
		const gridGap = computed(() => {
			if (typeof props.gap === "number") return `${props.gap}px`;
			if (Array.isArray(props.gap)) return `${props.gap[1]}px ${props.gap[0]}px`;
			return "unset";
		});
		const gridCols = computed(() => {
			if (typeof props.cols === "object") return props.cols[breakPoint.value] ?? props.cols;
			return props.cols;
		});
		return {
			style: computed(() => {
				return {
					display: "grid",
					gridGap: gridGap.value,
					gridTemplateColumns: `repeat(${gridCols.value}, minmax(0, 1fr))`,
				};
			}),
		};
	},
	render() {
		const renderContent = () => {
			// render will be called twice when mounted, I can't figure out why
			// 2 jobs will be pushed into job queues with same id, and then be flushed
			const rawChildren = flatten(getSlot(this));

			const childrenAndRawSpan: Array<{
				child: VNode;
				rawChildSpan: number;
			}> = [];
			const { collapsed, collapsedRows, cols } = this;

			const showHideIndex = collapsed ? 3 : -1;

			let suffixNode: VNode | null = null;
			rawChildren.forEach(child => {
				if ((child?.type as any)?.__GRID_ITEM__ !== true) return;

				if (isNodeVShowFalse(child)) {
					const clonedNode = cloneVNode(child);
					if (clonedNode.props) {
						clonedNode.props.privateShow = false;
					} else {
						clonedNode.props = { privateShow: false };
					}
					childrenAndRawSpan.push({
						child: clonedNode,
						rawChildSpan: 0,
					});
					return;
				}
				if (child.props?.suffix === true) {
					suffixNode = cloneVNode(child);
					return;
				}
				// We don't want v-show to control display, so we need to stripe it
				// here, nor it may mess child's style
				child.dirs = child.dirs?.filter(({ dir }) => dir !== vShow) || null;

				if (child.dirs?.length === 0) {
					child.dirs = null;
				}
				const clonedChild = cloneVNode(child);

				const rawChildSpan = Number((clonedChild.props?.span as string | number | undefined) ?? 1);

				if (rawChildSpan === 0) return;
				childrenAndRawSpan.push({
					child: clonedChild,
					rawChildSpan,
				});
			});

			return (
				<div style={this.style}>
					{childrenAndRawSpan.map(({ child }, idx) => {
						if (showHideIndex >= 0 && idx >= showHideIndex) {
							child.props = { ...child.props, privateShow: false };
						}
						return child;
					})}
					<>{suffixNode}</>
				</div>
			);
		};
		// return <div style={this.style}>{this.$slots.default!()}</div>;
		return renderContent();
	},
});
