import ProTable, { ProTableProps } from "./ProTable.vue";
import "./style.scss";
export default ProTable;

import { ComponentPublicInstance } from "vue";

export * from "./types";
export type ProTableInstance = Omit<InstanceType<typeof ProTable>, keyof ComponentPublicInstance | keyof ProTableProps>;
