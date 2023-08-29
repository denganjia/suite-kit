import vueJsx from "@vitejs/plugin-vue-jsx";
import { MarkdownTransform } from "./plugins/markdown-transform";
import type { UserConfig } from "vitepress";
import { mdPlugin } from "./plugins/mdPlugin";
import Components from "unplugin-vue-components/vite";

export const config: UserConfig = {
  // site-level options
  title: "Suite Kit",
  description:
    "Some high-level components of commonly used component libraries",

  themeConfig: {
    // theme-level options
    footer: {
      message: "MIT License.",
      copyright: "Copyright © 2023 Suite Kit",
    },
    nav: [
      { text: "指南", link: "/guide/", activeMatch: "/guide" },
      {
        text: "组件",
        link: "/components/Element/ProTable",
        activeMatch: "/components",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          collapsible: true,
          items: [
            { text: "介绍", link: "/guide/introduce" },
            { text: "开始", link: "/guide/" },
          ],
        },
        {
          text: "进阶",
          collapsible: true,
        },
      ],
      "/components/": [
        {
          text: "Element Plus",
          collapsible: true,
          items: [{ text: "ProTable", link: "/components/Element/ProTable" }],
        },
        {
          text: "Grid",
          link: "/components/Grid",
        },
      ],
    },
  },
  vite: {
    // @ts-ignore
    plugins: [
      Components({
        dirs: [".vitepress/vitepress/components"],
        allowOverrides: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
      vueJsx(),
      MarkdownTransform(),
    ],
  },
  markdown: {
    config: (md) => mdPlugin(md),
  },
};

export default config;
