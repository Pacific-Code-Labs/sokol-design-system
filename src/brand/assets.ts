/** Bundler-resolved approved masters. Hosts may override these with CMS media URLs. */
export const SOKOL_BRAND_ASSETS = {
  logoUrl: new URL("./assets/sokol_l1_primary.svg", import.meta.url).href,
  logoUrlDark: new URL("./assets/sokol_l2_reverse.svg", import.meta.url).href,
  markUrl: new URL("./assets/sokol_l3_symbol.svg", import.meta.url).href,
  faviconUrl: new URL("./assets/favicon.svg", import.meta.url).href,
  appleTouchIconUrl: new URL("./assets/apple-touch-icon-180.png", import.meta.url).href,
  socialCardUrl: {
    es: new URL("./assets/social-card-es.png", import.meta.url).href,
    en: new URL("./assets/social-card-en.png", import.meta.url).href,
  },
} as const;
