import { viteBundler } from "@vuepress/bundler-vite";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { path } from "@vuepress/utils";
import container from "markdown-it-container";
import { defineUserConfig } from "vuepress";
import { plumeTheme } from "vuepress-theme-plume";

export default defineUserConfig({
  base: "/",
  lang: "en-US",
  title: "Granary",
  description:
    "A Raft consensus implementation in Zig, backing a replicated key-value store",

  head: [
    [
      "meta",
      {
        name: "description",
        content:
          "Granary is a Raft consensus implementation in Zig, backing a replicated key-value store. A research project for learning Zig and implementing Raft from the paper.",
      },
    ],
    ["link", { rel: "icon", type: "image/png", href: "/images/specht.png" }],
  ],

  bundler: viteBundler(),
  shouldPrefetch: false,

  extendsMarkdown: (md) => {
    md.use(container, "terminal", {
      validate: (params: string) => {
        const info = params.trim();
        return /^terminal(?:\s+.*)?$/.test(info);
      },
      render: (tokens: any[], idx: number) => {
        const token = tokens[idx];
        if (token.nesting === 1) {
          const info = token.info.trim();
          const rest = info.replace(/^terminal\s*/, "");
          const attrs: Record<string, string> = {};
          const attrRegex = /(\w+)=((?:\"[^\"]*\")|(?:'[^']*')|(?:[^\s]+))/g;
          let consumed = "";
          let m: RegExpExecArray | null;
          while ((m = attrRegex.exec(rest)) !== null) {
            const key = m[1];
            let val = m[2];
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            attrs[key] = val;
            consumed += m[0] + " ";
          }
          const positional = rest.replace(consumed, "").trim();
          const titleRaw = attrs.title ?? positional ?? "";
          const title = titleRaw ? md.utils.escapeHtml(titleRaw) : "";
          const titleAttr = title ? ` title=\"${title}\"` : "";
          return `\n<Terminal${titleAttr}>\n`;
        }
        return `\n</Terminal>\n`;
      },
    });
  },

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
  ],

  theme: plumeTheme({
    docsRepo: "https://github.com/spechtlabs/granary",
    docsDir: "docs",
    docsBranch: "main",

    editLink: true,
    lastUpdated: false,
    contributors: false,

    article: "/article/",

    cache: "filesystem",
    search: { provider: "local" },

    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          icon: "mdi:book-open-page-variant",
          prefix: "/guide/",
          items: [
            { text: "Overview", link: "overview", icon: "mdi:eye" },
            { text: "Architecture", link: "architecture", icon: "mdi:sitemap" },
            { text: "Getting Started", link: "getting-started", icon: "mdi:rocket-launch" },
          ],
        },
        {
          text: "Reference",
          icon: "mdi:book",
          items: [
            { text: "WAL Binary Format", link: "/references/wal-format", icon: "mdi:file-code" },
          ],
        },
      ],
      "/references/": [
        {
          text: "Reference",
          icon: "mdi:book",
          prefix: "/references/",
          items: [
            { text: "WAL Binary Format", link: "wal-format", icon: "mdi:file-code" },
          ],
        },
      ],
    },

    /**
     * markdown
     * @see https://theme-plume.vuejs.press/config/markdown/
     */
    markdown: {
      collapse: true,
      timeline: true,
      plot: true,
      //   abbr: true,         // 启用 abbr 语法  *[label]: content
      //   annotation: true,   // 启用 annotation 语法  [+label]: content
      //   pdf: true,          // 启用 PDF 嵌入 @[pdf](/xxx.pdf)
      //   caniuse: true,      // 启用 caniuse 语法  @[caniuse](feature_name)
      //   plot: true,         // 启用隐秘文本语法 !!xxxx!!
      //   bilibili: true,     // 启用嵌入 bilibili视频 语法 @[bilibili](bid)
      //   youtube: true,      // 启用嵌入 youtube视频 语法 @[youtube](video_id)
      //   artPlayer: true,    // 启用嵌入 artPlayer 本地视频 语法 @[artPlayer](url)
      //   audioReader: true,  // 启用嵌入音频朗读功能 语法 @[audioReader](url)
      //   icons: true,        // 启用内置图标语法  :[icon-name]:
      //   codepen: true,      // 启用嵌入 codepen 语法 @[codepen](user/slash)
      //   replit: true,       // 启用嵌入 replit 语法 @[replit](user/repl-name)
      //   codeSandbox: true,  // 启用嵌入 codeSandbox 语法 @[codeSandbox](id)
      //   jsfiddle: true,     // 启用嵌入 jsfiddle 语法 @[jsfiddle](user/id)
      //   npmTo: true,        // 启用 npm-to 容器  ::: npm-to
      //   demo: true,         // 启用 demo 容器  ::: demo
      repl: {
        // 启用 代码演示容器
        go: true, // ::: go-repl
        rust: true, // ::: rust-repl
        //     kotlin: true,     // ::: kotlin-repl
      },
      //   math: {             // 启用数学公式
      //     type: 'katex',
      //   },
      //   chartjs: true,      // 启用 chart.js
      //   echarts: true,      // 启用 ECharts
      mermaid: true, // 启用 mermaid
      //   flowchart: true,    // 启用 flowchart
      image: {
        figure: true, // 启用 figure
        lazyload: true, // 启用图片懒加载
        mark: true, // 启用图片标记
        size: true, // 启用图片大小
      },
      //   include: true,      // 在 Markdown 文件中导入其他 markdown 文件内容
      //   imageSize: 'local', // 启用 自动填充 图片宽高属性，避免页面抖动
    },

    watermark: false,
  }),
});
