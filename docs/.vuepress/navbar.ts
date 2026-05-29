import { defineNavbarConfig } from "vuepress-theme-plume";

export const navbar = defineNavbarConfig([
  { text: "Home", link: "/", icon: "mdi:home" },

  {
    text: "Guide",
    icon: "mdi:book-open-page-variant",
    items: [
      { text: "Overview", link: "/guide/overview", icon: "mdi:eye" },
      {
        text: "Architecture",
        link: "/guide/architecture",
        icon: "mdi:sitemap",
      },
      {
        text: "Getting Started",
        link: "/guide/getting-started",
        icon: "mdi:rocket-launch",
      },
    ],
  },

  {
    text: "Reference",
    icon: "mdi:book",
    items: [
      {
        text: "WAL Binary Format",
        link: "/references/wal-format",
        icon: "mdi:file-code",
      },
    ],
  },

  {
    text: "More",
    icon: "mdi:dots-horizontal",
    items: [
      {
        text: "Releases",
        link: "https://github.com/spechtlabs/granary/releases",
        target: "_blank",
        rel: "noopener noreferrer",
        icon: "mdi:tag",
      },
      {
        text: "Report an Issue",
        link: "https://github.com/spechtlabs/granary/issues/new/choose",
        target: "_blank",
        rel: "noopener noreferrer",
        icon: "mdi:bug-outline",
      },
    ],
  },
]);
