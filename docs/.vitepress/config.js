import sidebar from "./config/sidebar";
// import navbar from "./config/navbar";
import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "Yoren",
  lastUpdated: true,
  head: [["link", { rel: "icon", type: "image/jpeg", href: "/logo.jpeg" }]],
  themeConfig: {
    // logo: "/logo.jpeg",
    sidebar,
    nav: [{ text: "文章", link: "/md/index" }],
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
});
