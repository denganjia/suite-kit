import * as path from "path";
import { resolve } from "path";
import glob from "fast-glob";

import type { Plugin } from "vite";

type Append = Record<"headers" | "footers" | "scriptSetups", string[]>;

let compPaths: string[] = [];

export function MarkdownTransform(): Plugin {
  return {
    name: "suite-kit-md-transform",
    enforce: "pre",
    async buildStart() {
      const pattern = `examples/`;
      compPaths = await glob(pattern, {
        cwd: resolve(__dirname, "..", ".."),
        absolute: true,
        onlyDirectories: true,
      });
      console.log(compPaths);
    },

    async transform(code, id) {
      if (!id.endsWith(".md") || !id.includes("components")) return;
      let dirnames = path.dirname(id).split("/");
      const componentId =
        dirnames[dirnames.length - 1] + "/" + path.basename(id, ".md");
      const append: Append = {
        headers: [],
        footers: [],
        scriptSetups: [
          `const demos = import.meta.globEager('../../examples/${componentId}/*.vue')`,
        ],
      };
      code = transformVpScriptSetup(code, append);
      if (compPaths.some((compPath) => id.startsWith(compPath))) {
        code = transformComponentMarkdown(id, componentId, code, append);
      }
      return combineMarkdown(
        code,
        [combineScriptSetup(append.scriptSetups), ...append.headers],
        append.footers
      );
    },
  };
}
const combineScriptSetup = (codes: string[]) =>
  `\n<script setup>
${codes.join("\n")}
</script>
`;

const combineMarkdown = (
  code: string,
  headers: string[],
  footers: string[]
) => {
  const frontmatterEnds = code.indexOf("---\n\n");
  const firstHeader = code.search(/\n#{1,6}\s.+/);
  const sliceIndex =
    firstHeader < 0
      ? frontmatterEnds < 0
        ? 0
        : frontmatterEnds + 4
      : firstHeader;

  if (headers.length > 0)
    code =
      code.slice(0, sliceIndex) + headers.join("\n") + code.slice(sliceIndex);
  code += footers.join("\n");

  return `${code}\n`;
};

const vpScriptSetupRE =
  /<vp-script\s(.*\s)?setup(\s.*)?>([\s\S]*)<\/vp-script>/;

const transformVpScriptSetup = (code: string, append: Append) => {
  const matches = code.match(vpScriptSetupRE);
  if (matches) code = code.replace(matches[0], "");
  const scriptSetup = matches?.[3] ?? "";
  if (scriptSetup) append.scriptSetups.push(scriptSetup);
  return code;
};

const transformComponentMarkdown = (
  id: string,
  componentId: string,
  code: string
) => {
  return code;
};
