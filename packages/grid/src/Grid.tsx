import { defineComponent, getCurrentInstance, computed, ref, cloneVNode, vShow, provide } from "vue";
import { useBreakpoints } from "@vueuse/core";
import type { ComputedRef, PropType, VNode } from "vue";
import { flatten } from "../utils/flatten";
import { getSlot } from "../utils/get-slot";
import { getResponsive } from "../utils/get-responsive";
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
		// let breakPoint = ref<BreakPoint>("xl");
		const breakPoints = useBreakpoints({
			sm: 768,
			md: 992,
			lg: 1200,
			xl: 1600,
		});
		const self = getCurrentInstance()!;
		// 设置间距
		const gridGap = computed(() => {
			if (typeof props.gap === "number") return `${props.gap}px`;
			if (Array.isArray(props.gap)) return `${props.gap[1]}px ${props.gap[0]}px`;
			return "unset";
		});
		//
		const breakPoint: ComputedRef<BreakPoint> = computed<any>(() => {
			let currents = breakPoints.current().value;
			if (currents.length > 0) return currents[currents.length - 1];
			if (breakPoints.isSmaller("sm")) return "xs";
			if (breakPoints.isGreater("xl")) return "xl";
			return "lg";
		});
		const gridCols = computed(() => {
			if (typeof props.cols === "object") return props.cols[breakPoint.value] ?? props.cols;
			return props.cols;
		});
		provide("responsive", {
			cols: gridCols,
			gap: Array.isArray(props.gap) ? props.gap[0] : props.gap,
		});
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
			const { collapsed, collapsedRows } = this;
			// 计算折叠情况下最多展示多少个span
			let collapsedSpanFlag = computed(() => {
				return collapsedRows * this.cols;
			});

			// const hiddenIndex = collapsed ? 3 : -1;

			// 存储子元素占用的列（span + offset）
			let childSpanCache = 0;
			// 隐藏flag
			let hiddenFlag = false;
			let suffixNode: VNode | null = null;
			rawChildren.forEach(child => {
				if ((child?.type as any)?.__GRID_ITEM__ !== true) return;

				if (isNodeVShowFalse(child)) {
					const clonedNode = cloneVNode(child);
					clonedNode.props = { ...(clonedChild.props || {}), privateShow: false };
					childrenAndRawSpan.push({
						child: clonedNode,
						rawChildSpan: 0,
					});
					return;
				}
				if (child.props?.suffix === true) {
					suffixNode = cloneVNode(child);
					const { span, offset } = getResponsive(suffixNode.props, this.breakPoint);
					// collapsedSpanFlag -= span + offset;
					return;
				}

				// We don't want v-show to control display, so we need to stripe it
				// here, nor it may mess child's style
				child.dirs = child.dirs?.filter(({ dir }) => dir !== vShow) || null;

				if (child.dirs?.length === 0) {
					child.dirs = null;
				}
				const clonedChild = cloneVNode(child);

				const { span, offset } = getResponsive(child.props, this.breakPoint);

				if (hiddenFlag) {
					clonedChild.props = { ...(clonedChild.props || {}), privateShow: false };
				} else {
					console.log(childSpanCache, collapsedSpanFlag.value);

					if (collapsed && childSpanCache + span + offset >= collapsedSpanFlag.value - 4) {
						hiddenFlag = true;
					} else {
						childSpanCache += span + offset;
					}
				}
				if (span === 0) return;
				childrenAndRawSpan.push({
					child: clonedChild,
					rawChildSpan: span,
				});
			});

			return (
				<div style={this.style}>
					{childrenAndRawSpan.map(({ child }, idx) => {
						child.props = {
							...child.props,
							// privateShow: !(hiddenIndex >= 0 && idx >= hiddenIndex),
							breakPoint: this.breakPoint,
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
