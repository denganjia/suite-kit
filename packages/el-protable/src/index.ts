import { ComponentPublicInstance } from "vue";
import ProTable from "./index.vue";
import { ProTableProps } from "./types";
import "./style.scss";


export default ProTable;
export * from "./types";
export type ProTableInstance = Omit<InstanceType<typeof ProTable>, keyof ComponentPublicInstance | keyof ProTableProps>;
