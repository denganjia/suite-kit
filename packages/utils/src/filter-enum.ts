type FieldNamesProps = {
	label: string;
	value: string;
	children?: string;
};
import { findItemNested } from "./find-item-nested";
/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames label && value && children 的 key 值
 * @param {String} type 过滤类型（目前只有 tag）
 * @returns {String}
 * */
export function filterEnum(callValue: any, enumData?: any, fieldNames?: FieldNamesProps, type?: "tag") {
	const value = fieldNames?.value ?? "value";
	const label = fieldNames?.label ?? "label";
	const children = fieldNames?.children ?? "children";
	let filterData: { [key: string]: any } = {};
	// 判断 enumData 是否为数组
	if (Array.isArray(enumData)) filterData = findItemNested(enumData, callValue, value, children);
	// 判断是否输出的结果为 tag 类型
	if (type == "tag") {
		return filterData?.tagType ? filterData.tagType : "";
	} else {
		return filterData ? filterData[label] : "--";
	}
}
