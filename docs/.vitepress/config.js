import sidebar from "./config/sidebar";
// import navbar from "./config/navbar";
import { defineConfig } from "vitepress";

export default defineConfig({
  base: "https://github.com/YoRenChen/YoRenChen.github.io",
  lang: "zh-CN",
  title: "Yoren",
  lastUpdated: true,
  head: [["link", { rel: "icon", type: "image/jpeg", href: "/logo.jpeg" }]],
  themeConfig: {
    // logo: "/logo.jpeg",
    sidebar,
    // nav: [{ text: "gihub", link: "https://github.com/YoRenChen" }],
    socialLinks: [{ icon: "github", link: "https://github.com/YoRenChen" }],
    footer: {
      message: "MIT License.",
      copyright: `Copyright © ${new Date().getFullYear()}-present Evan You`,
    },
    lastUpdatedText: "Updated Date",
    docFooter: {
      prev: "Pagina prior",
      next: "Proxima pagina",
    },
  },
  cleanUrls: "without-subfolders",
  markdown: {
    // anchor: {
    //   permalink: anchor.permalink.headerLink(),
    // },
    // toc: { level: [1, 2] },
    // config: (md) => {
    //   // use more markdown-it plugins!
    //   md.use(require("markdown-it-xxx"));
    // },
  },
});
