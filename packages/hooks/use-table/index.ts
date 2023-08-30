import { reactive, computed, toRefs, onBeforeMount } from "vue";

export declare namespace Table {
	export interface Pageable {
		pageNum: number;
		pageSize: number;
		total: number;
	}
	export interface StateProps {
		tableData: any[];
		pageable: Pageable;
		searchParam: {
			[key: string]: any;
		};
		searchInitParam: {
			[key: string]: any;
		};
		totalParam: {
			[key: string]: any;
		};
		icon?: {
			[key: string]: any;
		};
	}

	export interface DataCallBack {
		(data: any): { data: any[] } | { list: any[]; total: number; pageSize?: number; pageNum?: number };
	}
}
/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法 (必传)
 * @param {Object} initParam 获取数据初始化参数 (非必传，默认为{})
 * @param {Boolean} isPageable 是否有分页 (非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法 (非必传)
 * @param requestError
 * */
export const useTable = (
	api?: (params: any) => Promise<any>,
	initParam: object = {},
	isPageable: boolean = true,
	dataCallBack?: Table.DataCallBack,
	requestError?: (error: any) => void,
) => {
	const state = reactive<Table.StateProps>({
		// 表格数据
		tableData: [],
		// 分页数据
		pageable: {
			// 当前页数
			pageNum: 1,
			// 每页显示条数
			pageSize: 10,
			// 总条数
			total: 0,
		},
		// 查询参数(只包括查询)
		searchParam: {},
		// 初始化默认的查询参数
		searchInitParam: {},
		// 总参数(包含分页和查询参数)
		totalParam: {},
	});

	/**
	 * @description 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
	 * */
	const pageParam = computed({
		get: () => {
			return {
				pageNum: state.pageable.pageNum,
				pageSize: state.pageable.pageSize,
			};
		},
		set: (newVal: any) => {
			console.log("我是分页更新之后的值", newVal);
		},
	});

	// 分页参数
	const pagination = computed(() => {
		return isPageable ? pageParam.value : {};
	});
	// 初始化挂载前 将searchInitParam合并到totalParam
	// onBeforeMount(() => {
	// 	Object.assign(state.totalParam, state.searchInitParam);
	// });
	/**测试
	 * @description 获取表格数据
	 * @return void
	 * */
	const getTableList = async () => {
		if (!api) return;
		try {
			// 先把初始化参数和分页参数放到总参数里面
			Object.assign(state.totalParam, initParam, pagination.value);
			let { data } = await api({ ...state.searchInitParam, ...state.totalParam });
			dataCallBack && (data = dataCallBack(data));
			state.tableData = isPageable ? data.list : data;
			// 解构后台返回的分页数据 (如果有分页更新分页信息)
			if (isPageable) {
				const { pageNum, pageSize, total } = data;
				updatePageable({ pageNum, pageSize, total });
			}
		} catch (error) {
			requestError && requestError(error);
		}
	};

	/**
	 * @description 更新查询参数
	 * @return void
	 * */
	const updatedTotalParam = () => {
		state.totalParam = {};
		// 处理查询参数，可以给查询参数加自定义前缀操作
		let nowSearchParam: Table.StateProps["searchParam"] = {};
		// 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
		for (const [k, v] of Object.entries(state.searchParam)) {
			// * 某些情况下参数为 false/0 也应该携带参数
			if (!!v || v === false || v === 0) {
				nowSearchParam[k] = v;
			}
		}
		Object.assign(state.totalParam, nowSearchParam);
	};

	/**
	 * @description 更新分页信息
	 * @param {Object} pageable 后台返回的分页数据
	 * @return void
	 * */
	const updatePageable = (pageable: Table.Pageable) => {
		Object.assign(state.pageable, pageable);
	};

	/**
	 * @description 表格数据查询
	 * @return void
	 * */
	const search = () => {
		state.pageable.pageNum = 1;
		updatedTotalParam();
		getTableList();
	};

	/**
	 * @description 表格数据重置
	 * @return void
	 * */
	const reset = () => {
		state.pageable.pageNum = 1;
		state.searchParam = { ...state.searchInitParam };
		updatedTotalParam();
		getTableList();
	};

	/**
	 * @description 每页条数改变
	 * @param {Number} val 当前条数
	 * @return void
	 * */
	const handleSizeChange = (val: number) => {
		state.pageable.pageNum = 1;
		state.pageable.pageSize = val;
		getTableList();
	};

	/**
	 * @description 当前页改变
	 * @param {Number} val 当前页
	 * @return void
	 * */
	const handleCurrentChange = (val: number) => {
		state.pageable.pageNum = val;
		getTableList();
	};

	return {
		...toRefs(state),
		getTableList,
		search,
		reset,
		handleSizeChange,
		handleCurrentChange,
		updatedTotalParam,
	};
};
