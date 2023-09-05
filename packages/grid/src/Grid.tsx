import { defineComponent, computed, cloneVNode, vShow, provide } from "vue";
import { useBreakpoints } from "@vueuse/core";
import type { ComputedRef, PropType, VNode } from "vue";
import { flatten } from "../utils/flatten";
import { getSlot } from "../utils/get-slot";
import { getResponsive } from "../utils/get-responsive";
import { BreakPoint } from "./type";
import { isNodeVShowFalse } from "../utils/is-node-v-show-false";
import { onMounted } from "vue";
export default defineComponent({
	name: "SuiteKitGrid",
	props: {
		gap: { type: [Array, Number] as PropType<[number, number] | number>, default: [0, 0] },
		cols: { type: [Object, Number] as PropType<Record<BreakPoint, number> | number>, default: 4 },
		collapsed: { type: Boolean, default: false },
		collapsedRows: { type: Number, default: 1 },
		responsive: { type: String as PropType<"self" | "screen">, default: "screen" },
	},
	setup(props, { expose }) {
		const { gap, cols } = props;

		onMounted(() => {});
		// 注入响应式断点
		const breakPoints = useBreakpoints({
			sm: 768,
			md: 992,
			lg: 1200,
			xl: 1600,
		});
		// 设置间距
		const gridGap = computed(() => {
			if (typeof gap === "number") return `${gap}px`;
			if (Array.isArray(gap)) return `${gap[1]}px ${gap[0]}px`;
			return "unset";
		});
		//获取当前断点
		const breakPoint: ComputedRef<BreakPoint> = computed<any>(() => {
			//@ts-ignore
			let currents = breakPoints.current().value;
			if (currents.length > 0) return currents[currents.length - 1];
			if (breakPoints.isSmaller("sm")) return "xs";
			if (breakPoints.isGreater("xl")) return "xl";
			return "lg";
		});
		const gridCols = computed(() => {
			return typeof cols === "object" ? cols[breakPoint.value] ?? cols : cols;
		});
		provide("responsive", {
			cols: gridCols,
			gap: Array.isArray(gap) ? gap[0] : gap,
		});
		expose({ breakPoint });
		return {
			style: computed(() => {
				return {
					display: "grid",
					gridGap: gridGap.value,
					gridTemplateColumns: `repeat(${gridCols.value}, minmax(0, 1fr))`,
				};
			}),
			breakPoint: breakPoint,
			cols: gridCols,
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
			const { collapsed, collapsedRows, cols, breakPoint } = this;
			// 计算折叠情况下最多展示多少个span
			let collapsedSpanFlag = computed(() => {
				return collapsedRows * cols;
			});

			// 存储子元素占用的列（span + offset）
			let childSpanCache = 0;

			let suffixNode: VNode | null = null;
			rawChildren.forEach(child => {
				if ((child?.type as any)?.__GRID_ITEM__ !== true) return;

				if (isNodeVShowFalse(child)) {
					const clonedNode = cloneVNode(child);
					clonedNode.props = { ...(clonedNode.props || {}), privateShow: false };
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

				const { span, offset } = getResponsive(child.props, breakPoint);

				childSpanCache += span + offset;
				let { span: suffixSpan, offset: suffixOffset } = getResponsive(suffixNode?.props, breakPoint);
				if (collapsed && childSpanCache > collapsedSpanFlag.value - suffixSpan - suffixOffset) {
					clonedChild.props = { ...(clonedChild.props || {}), privateShow: false };
				}
				if (span === 0) return;
				childrenAndRawSpan.push({
					child: clonedChild,
					rawChildSpan: span,
				});
			});
			if (suffixNode) {
				(suffixNode as VNode).props = { ...((suffixNode as VNode).props || {}), breakPoint: breakPoint };
			}
			return (
				<div style={this.style}>
					{childrenAndRawSpan.map(({ child }, idx) => {
						child.props = {
							...child.props,
							breakPoint,
						};
						return child;
					})}
					{suffixNode}
				</div>
			);
		};
		return renderContent();
	},
});
