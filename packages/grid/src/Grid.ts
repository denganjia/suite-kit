import {
	defineComponent,
	h,
	computed,
	ref,
	inject,
	PropType,
	Ref,
	getCurrentInstance,
	provide,
	onBeforeMount,
	onMounted,
	onActivated,
	onDeactivated,
	onUnmounted,
	VNode,
	VNodeArrayChildren,
	watch,
} from "vue";
import { BreakPoint } from "./type";

export type GridProps = {
	cols?: number | Record<BreakPoint, number>;
	collapsed?: boolean;
	collapsedRows?: number;
	gap?: [number, number] | number;
};
export const gridProps = {
	cols: { type: [Object, Number] as PropType<Record<BreakPoint, number> | Number>, default: {} as any },
	collapsed: { type: Boolean, default: false },
	collapsedRows: { type: Number, default: 1 },
	gap: { type: [Array, Number] as PropType<number[] | number>, default: 0 },
} as const;

export default defineComponent({
	__Grid__: true,
	name: "Grid",
	props: gridProps,
	setup(props, { slots, expose }) {
		// 注入 gap 间距
		provide("gap", Array.isArray(props.gap) ? props.gap[0] : props.gap);

		// 注入响应式断点
		let breakPoint = ref<BreakPoint>("xl");
		provide("breakPoint", breakPoint);
		// 要开始折叠的 index
		const hiddenIndex = ref(-1);
		// 注入 cols
		const gridCols = computed(() => {
			// @ts-ignore
			if (typeof props.cols === "object") return props.cols[breakPoint.value] ?? props.cols;
			return props.cols;
		});
		provide("cols", gridCols);
		// 监听屏幕变化
		const resize = (e: UIEvent) => {
			let width = (e.target as Window).innerWidth;
			switch (!!width) {
				case width < 768:
					breakPoint.value = "xs";
					break;
				case width >= 768 && width < 992:
					breakPoint.value = "sm";
					break;
				case width >= 992 && width < 1200:
					breakPoint.value = "md";
					break;
				case width >= 1200 && width < 1920:
					breakPoint.value = "lg";
					break;
				case width >= 1920:
					breakPoint.value = "xl";
					break;
			}
		};
		const cloneSlots = slots.default!();
		const findIndex = () => {
			let fields: VNodeArrayChildren = [];
			let suffix: VNode | null = null;
			cloneSlots.forEach((slot: any) => {
				// suffix
				if (typeof slot.type === "object" && slot.type.name === "GridItem") {
					if (slot.props?.suffix !== undefined) {
						suffix = slot;
					} else {
						fields.push(slot);
					}
				}
				// slot children
				if (typeof slot.type === "symbol" && Array.isArray(slot.children)) fields.push(...slot.children);
			});
			fields.forEach((field: any, index: number) => {
				field.props.privateShow = index % 2 == 0;
			});
			console.log(fields);

			// 计算 suffix 所占用的列
			let suffixCols = 0;
			if (suffix) {
				suffixCols =
					((suffix as VNode).props![breakPoint.value]?.span ?? (suffix as VNode).props?.span ?? 1) +
					((suffix as VNode).props![breakPoint.value]?.offset ?? (suffix as VNode).props?.offset ?? 0);
			}
			try {
				let find = false;
				fields.reduce((prev = 0, current, index) => {
					prev +=
						((current as VNode)!.props![breakPoint.value]?.span ?? (current as VNode)!.props?.span ?? 1) +
						((current as VNode)!.props![breakPoint.value]?.offset ?? (current as VNode)!.props?.offset ?? 0);
					if (Number(prev) > props.collapsedRows * gridCols.value - suffixCols) {
						hiddenIndex.value = index;
						find = true;
						throw "find it";
					}
					return prev;
				}, 0);
				if (!find) hiddenIndex.value = -1;
			} catch (e) {
				// console.warn(e);
			}
		};
		onBeforeMount(() => props.collapsed && findIndex());
		onMounted(() => {
			resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent);
			window.addEventListener("resize", resize);
		});
		onActivated(() => {
			resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent);
			window.addEventListener("resize", resize);
		});
		onUnmounted(() => {
			window.removeEventListener("resize", resize);
		});
		onDeactivated(() => {
			window.removeEventListener("resize", resize);
		});
		// 断点变化时 执行 findIndex
		watch(
			() => breakPoint.value,
			() => {
				if (props.collapsed) findIndex();
			},
		);
		// 监听 collapsed
		watch(
			() => props.collapsed,
			value => {
				if (value) return findIndex();
				hiddenIndex.value = -1;
			},
		);
		// 设置间距
		const gridGap = computed(() => {
			if (typeof props.gap === "number") return `${props.gap}px`;
			if (Array.isArray(props.gap)) return `${props.gap[1]}px ${props.gap[0]}px`;
			return "unset";
		});

		// 设置 style
		const style = computed(() => {
			return {
				display: "grid",
				gridGap: gridGap.value,
				gridTemplateColumns: `repeat(${gridCols.value}, minmax(0, 1fr))`,
			};
		});
		expose({ breakPoint });

		return () => h("div", { style: style.value }, cloneSlots);
	},
});
