<script setup lang="ts">
import {
  ElDivider,
  ElTooltip,
  ElIcon,
  ElCollapseTransition,
  ElMessage,
} from "element-plus";
import { computed, getCurrentInstance, ref } from "vue";
import { isClient, useClipboard, useToggle } from "@vueuse/core";
import { CaretTop, Hide, CopyDocument } from "@element-plus/icons-vue";
import Example from "./demo/vp-example.vue";
import SourceCode from "./demo/vp-source-code.vue";

const props = defineProps<{
  demos: object;
  source: string;
  path: string;
  rawSource: string;
  description?: string;
}>();

const vm = getCurrentInstance()!;

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
});

const [sourceVisible, toggleSourceVisible] = useToggle();

const sourceCodeRef = ref<HTMLButtonElement>();
const formatPathDemos = computed(() => {
  const demos = {};
  Object.keys(props.demos).forEach((key) => {
    demos[key.replace("../../examples/", "").replace(".vue", "")] =
      props.demos[key].default;
  });

  return demos;
});

const decodedDescription = computed(() =>
  decodeURIComponent(props.description!)
);

const onSourceVisibleKeydown = (e: KeyboardEvent) => {
  if (["Enter", "Space"].includes(e.code)) {
    e.preventDefault();
    toggleSourceVisible(false);
    sourceCodeRef.value?.focus();
  }
};

const copyCode = async () => {
  if (!isSupported) {
    ElMessage.error("copy-error");
  }
  try {
    await copy();
    ElMessage.success("copy-success");
  } catch (e: any) {
    ElMessage.error(e.message);
  }
};
</script>

<template>
  <!-- <ClientOnly> -->
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <Example :file="path" :demo="formatPathDemos[path]" />
      <ElDivider class="m-0" />
      <div class="op-btns">
        <ElTooltip
          :content="'copy-code'"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]"
        >
          <ElIcon
            :size="16"
            :aria-label="'copy-code'"
            class="op-btn"
            tabindex="0"
            role="button"
            @click="copyCode"
            @keydown.prevent.enter="copyCode"
            @keydown.prevent.space="copyCode"
          >
            <CopyDocument></CopyDocument>
          </ElIcon>
        </ElTooltip>
        <ElTooltip
          :content="'view-source'"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]"
        >
          <button
            ref="sourceCodeRef"
            :aria-label="sourceVisible ? 'hide-source' : 'view-source'"
            class="reset-btn el-icon op-btn"
            @click="toggleSourceVisible()"
          >
            <ElIcon :size="16">
              <Hide></Hide>
            </ElIcon>
          </button>
        </ElTooltip>
      </div>

      <ElCollapseTransition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </ElCollapseTransition>

      <Transition name="el-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          tabindex="0"
          role="button"
          @click="toggleSourceVisible(false)"
          @keydown="onSourceVisibleKeydown"
        >
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>{{ "hide-source" }}</span>
        </div>
      </Transition>
    </div>
  <!-- </ClientOnly> -->
</template>

<style scoped lang="scss">
.example {
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);

  .m-0 {
    margin: 0;
  }

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
