const GA_ID: string | undefined = process.env.VUE_APP_GA_ID;
const SITE_HOST = 'dishuk.github.io';

type ContactMethod = 'email' | 'github' | 'linkedin';

export default class AnalyticsUtils {
  // Only the deployed site reports; dev server and `make preview` (localhost) stay silent.
  public static readonly enabled: boolean = !!GA_ID && window.location.hostname === SITE_HOST;

  private static lastUrl: string = document.referrer;

  public static init(): void {
    if (!this.enabled) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // gtag.js expects the real `arguments` object, not an array
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };

    const debug = new URLSearchParams(window.location.search).has('ga_debug');

    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted',
    });
    window.gtag('js', new Date());
    // Page views are sent from the router only (see router.ts)
    window.gtag('config', GA_ID, {
      send_page_view: false,
      allow_google_signals: false,
      ...(debug ? { debug_mode: true } : {}),
    });

    const script = document.createElement('script');

    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    document.addEventListener('click', this.onClick, { capture: true });
  }

  public static trackPageView(location: string, title: string): void {
    window.gtag?.('event', 'page_view', {
      page_location: location,
      page_title: title,
      page_referrer: this.lastUrl,
    });
    this.lastUrl = location;
  }

  public static trackEvent(name: string, params: Record<string, unknown> = {}): void {
    window.gtag?.('event', name, params);
  }

  private static onClick = (event: MouseEvent): void => {
    const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    const method = anchor ? AnalyticsUtils.contactMethod(anchor) : undefined;

    if (anchor && method) {
      AnalyticsUtils.trackEvent('contact_click', { method, link_url: anchor.href });
    }
  };

  private static contactMethod(anchor: HTMLAnchorElement): ContactMethod | undefined {
    if (anchor.protocol === 'mailto:') {
      return 'email';
    }

    if (/(^|\.)github\.com$/.test(anchor.hostname)) {
      return 'github';
    }

    if (/(^|\.)linkedin\.com$/.test(anchor.hostname)) {
      return 'linkedin';
    }

    return undefined;
  }
}
