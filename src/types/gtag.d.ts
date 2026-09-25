declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
  }
}

export {};
