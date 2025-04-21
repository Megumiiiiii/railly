import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import oneHunterThemeVercelLight2024 from "./public/theme/one-hunter-vercel-light.json";
import oneHunterThemeVercelDark2024 from "./public/theme/one-hunter-vercel-dark.json";
import vercel from "@astrojs/vercel/serverless";


export default defineConfig({
  site: "https://www.zerdrop.fun",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: oneHunterThemeVercelLight2024,
        dark: oneHunterThemeVercelDark2024,
      },
      defaultColor: "light",
      cssVariablePrefix: "--shiki-",
      langs: [],
      transformers: [
        {
          line(node, line) {
            node.properties["data-line"] = line;
            this.addClassToHast(node, "line");
          },
        },
      ],
    },
  },
  output: "server",
  adapter: vercel(),
});
