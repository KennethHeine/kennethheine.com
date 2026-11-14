import type { ITelemetryItem } from '@microsoft/applicationinsights-web';
import config from '@/analytics.json';

export interface SiteAnalytics {
  pageView(pathname: string): void;
  dispose(): void;
}

const pages: Record<string, string> = {
  '/': 'Home',
  '/about/': 'About',
  '/contact/': 'Contact',
};

export function analyticsPage(pathname: string) {
  const normalized = `${pathname.replace(/\/+$/, '')}/`;
  const path = Object.prototype.hasOwnProperty.call(pages, normalized)
    ? normalized
    : '/404/';
  return { path, name: pages[path] ?? 'Page not found' };
}

export function canTrackHost(hostname: string): boolean {
  return (
    process.env.NODE_ENV === 'production' &&
    /(?:^|;)InstrumentationKey=[\da-f-]{36}(?:;|$)/i.test(
      config.connectionString
    ) &&
    config.productionHosts.includes(hostname)
  );
}

function referringHost(referrer: string): string {
  try {
    return new URL(referrer).hostname || 'direct';
  } catch {
    return 'direct';
  }
}

export async function startAnalytics(): Promise<SiteAnalytics | null> {
  if (
    !canTrackHost(window.location.hostname) ||
    navigator.doNotTrack === '1' ||
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl
  ) {
    return null;
  }

  try {
    // Keep the SDK out of the initial page bundle and all preview/dev requests.
    const [{ ApplicationInsights }, { utlDisableStorage }] = await Promise.all([
      import('@microsoft/applicationinsights-web'),
      import('@microsoft/applicationinsights-core-js'),
    ]);
    // Disable storage before the properties plugin's startup probes can run.
    utlDisableStorage();
    const app = new ApplicationInsights({
      config: {
        connectionString: config.connectionString,
        disableCookiesUsage: true,
        cookieCfg: { enabled: false },
        isStorageUseDisabled: true,
        enableSessionStorageBuffer: false,
        disableAjaxTracking: true,
        disableFetchTracking: true,
        disableExceptionTracking: true,
        enableAutoRouteTracking: false,
        autoTrackPageVisitTime: false,
        loggingLevelTelemetry: 0,
        maxBatchInterval: 5000,
        eventsLimitInMem: 100,
        // Disable SDK diagnostics/configuration traffic outside our collector.
        featureOptIn: {
          sdkStats: { mode: 2, blockCdnCfg: true },
          SdkStats: { mode: 2, blockCdnCfg: true },
        },
        extensionConfig: {
          AppInsightsCfgSyncPlugin: { syncMode: 0, blkCdnCfg: true },
        },
      },
    });

    const referrerHost = referringHost(document.referrer);
    const verification =
      new URLSearchParams(window.location.search).get('analytics_test') === '1';

    app.loadAppInsights();
    app.addTelemetryInitializer((item: ITelemetryItem) => {
      const data = item.baseData;
      if (!data) return false;
      const isContact =
        item.baseType === 'EventData' && data.name === 'ContactClick';
      if (
        !isContact &&
        !['PageviewData', 'PageviewPerformanceData'].includes(
          item.baseType ?? ''
        )
      ) {
        return false;
      }
      const page = analyticsPage(
        data.properties?.path ?? window.location.pathname
      );
      const channel = data.properties?.channel;
      if (isContact && channel !== 'email' && channel !== 'linkedin')
        return false;
      data.properties = {
        path: page.path,
        referrerHost,
        verification: String(verification),
      };
      if (isContact) data.properties.channel = channel;
      else {
        data.name = page.name;
        data.uri = `https://kennethheine.com${page.path}`;
        data.url = data.uri;
        data.refUri =
          referrerHost === 'direct' ? '' : `https://${referrerHost}/`;
      }
      if (item.ext?.trace) item.ext.trace.name = page.path;
      // No user/session identifiers: reports count views and clicks, not people.
      if (item.ext?.user) delete item.ext.user;
      if (item.ext?.app) delete item.ext.app.sesId;
    });

    const contactClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const channel = event.target
        .closest('a[data-analytics-contact]')
        ?.getAttribute('data-analytics-contact');
      if (channel !== 'email' && channel !== 'linkedin') return;
      app.trackEvent({
        name: 'ContactClick',
        properties: {
          channel,
          path: analyticsPage(window.location.pathname).path,
        },
      });
      app.flush(true);
    };
    document.addEventListener('click', contactClick);
    let previousPath: string | null = null;

    return {
      pageView(pathname) {
        const page = analyticsPage(pathname);
        if (previousPath === page.path) return;
        previousPath = page.path;
        app.trackPageView({
          name: page.name,
          uri: `https://kennethheine.com${page.path}`,
          properties: { path: page.path },
        });
      },
      dispose() {
        document.removeEventListener('click', contactClick);
        app.unload(true);
      },
    };
  } catch {
    // A blocked or unavailable analytics bundle must not break the site.
    return null;
  }
}
