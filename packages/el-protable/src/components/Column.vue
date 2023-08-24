<script lang="tsx">
import {inject, ref, useSlots, defineComponent, PropType} from "vue";
import {ColumnProps, RenderScope, HeaderRenderScope} from "../types";
import {filterEnum, formatValue, handleProp, handleRowAccordingToProp} from "@suite-kit/utils";
import {ElTableColumn} from "element-plus";

export default defineComponent((props) => {

  const slots = useSlots();
  const enumMap = inject("enumMap", ref(new Map()));
  // 渲染表格数据
  const renderCellData = (item: ColumnProps, scope: RenderScope<any>) => {
    return enumMap.value.get(item.prop) && item.isFilterEnum
        ? filterEnum(handleRowAccordingToProp(scope.row, item.prop!), enumMap.value.get(item.prop)!, item.fieldNames)
        : formatValue(handleRowAccordingToProp(scope.row, item.prop!));
  };

// 获取 tag 类型
  const getTagType = (item: ColumnProps, scope: RenderScope<any>) => {
    return filterEnum(
        handleRowAccordingToProp(scope.row, item.prop!),
        enumMap.value.get(item.prop),
        item.fieldNames,
        "tag",
    );
  };
  const RenderTableColumn = (item: ColumnProps) => {
    if (item.isShow)
      return (
          <ElTableColumn
              {...item}
              align={item.align ?? "center"}
              showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== "operation"}>
            {{
              default: (scope: RenderScope<any>) => {
                if (item._children) return item._children.map((child: any) => RenderTableColumn(child));
                if (item.render) return item.render(scope);
                if (slots[handleProp(item.prop!)]) return slots[handleProp(item.prop!)]!(scope);
                if (item.tag) return <el-tag type={getTagType(item, scope)}>{renderCellData(item, scope)}</el-tag>;
                return renderCellData(item, scope);
              },
              header: (scope: HeaderRenderScope<any>) => {
                if (item.headerRender) return item.headerRender(scope);
                if (slots[`${handleProp(item.prop!)}Header`]) return slots[`${handleProp(item.prop!)}Header`]!(scope);
                return item.label;
              },
            }}
          </ElTableColumn>
      );
  };
  return () => {
    return RenderTableColumn(props.column)
  }
}, {
  name: "ElProTableColumn",
  props: {
    column: {
      type: Object as PropType<ColumnProps>,
      required: true
    }
  }
})
</script>

