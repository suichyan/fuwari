import type {
  ExpressiveCodeConfig,
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
  title: "Sui Blog",
  subtitle: "Ciallo～(∠・ω< )⌒★",
  description:
    "记录技术成长路上的思考与实践，分享编程开发、技术探索和问题解决的心得体会。在这里，你可以找到实用的技术教程、开发经验总结、以及各种有趣的技术发现。让我们一起在代码的世界里不断学习，持续进步。",
  lang: "zh_CN", // Language code, e.g. 'en', 'zh-CN', 'ja', etc.
  themeColor: {
    hue: 260, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: true, // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: "assets/images/banner-nacho.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: true, // Display the credit text of the banner image
      text: "甘城なつき/Nachoneko💤", // Credit text to be displayed
      url: "https://x.com/amsrntk3", // (Optional) URL link to the original artwork or artist's page
    },
  },
  toc: {
    enable: true, // Display the table of contents on the right side of the post
    depth: 2, // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [
    // Leave this array empty to use the default favicon
    {
      src: "/favicon/favicon-nekoya-32.png", // Path of the favicon, relative to the /public directory
      sizes: "32x32", // (Optional) Size of the favicon, set only if you have favicons of different sizes
    },
    {
      src: "/favicon/favicon-nekoya-128.png",
      sizes: "128x128",
    },
  ],
};

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    {
      name: "友情链接",
      url: "/friends/",
      external: false,
    },
    LinkPreset.About,
    {
      name: "其他",
      url: "#",
      external: false,
      children: [
        {
          name: "常用脚本&资源",
          url: "/scripts/",
          external: false,
        },
      ],
    },
  ],
};

export const profileConfig: ProfileConfig = {
  avatar: "assets/images/sui.PNG", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: "Sui",
  bio: "Ciallo～(∠・ω< )⌒★",
  links: [
    // {
    // 	name: "Twitter",
    // 	icon: "fa6-brands:twitter", // Visit https://icones.js.org/ for icon codes
    // 	// You will need to install the corresponding icon set if it's not already included
    // 	// `pnpm add @iconify-json/<icon-set-name>`
    // 	url: "https://twitter.com",
    // },
    // {
    // 	name: "Steam",
    // 	icon: "fa6-brands:steam",
    // 	url: "https://store.steampowered.com",
    // },
    {
      name: "GitHub",
      icon: "fa6-brands:github",
      url: "https://github.com/suichyan",
    },
    // {
    // 	name: "Mail",
    // 	icon: "fa6-solid:envelope",
    // 	url: "mailto:i@hiwer.cn",
    // },
  ],
};

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: "CC BY-NC-SA 4.0",
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
  // Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
  // Please select a dark theme, as this blog theme currently only supports dark background color
  theme: "github-dark",
};
