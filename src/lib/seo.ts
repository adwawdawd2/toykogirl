export type SeoConfig = {
  title: string;
  description: string;
  path: string;
};

export const SEO_SITE_NAME = "东京23区女子图鉴";
export const SEO_LOCALE = "zh_CN";
export const SEO_DEFAULT_DESCRIPTION = "详细介绍东京23区女性刻板印象与区域人设观察。";

// 当前由 routeSeo + <SeoHead /> 统一管理各路由 head；若后续引入 SSR，可迁移到 react-helmet-async。
const siteUrl = (import.meta.env.VITE_SITE_URL ?? "https://tokyo23-girls.example.com").replace(/\/$/, "");

export const buildSeoUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
};

export const routeSeo: Record<string, SeoConfig> = {
  "/": {
    title: SEO_SITE_NAME,
    description: SEO_DEFAULT_DESCRIPTION,
    path: "/",
  },
  "/404": {
    title: "页面未找到 | 东京23区女子图鉴",
    description: "抱歉，您访问的页面不存在，请返回东京23区女子图鉴首页继续浏览。",
    path: "/404",
  },
};
