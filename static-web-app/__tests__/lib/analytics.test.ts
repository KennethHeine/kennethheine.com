/** @jest-environment-options {"url":"https://kennethheine.com/"} */

import {
  ApplicationInsights,
  type ITelemetryItem,
} from '@microsoft/applicationinsights-web';
import { analyticsPage, canTrackHost, startAnalytics } from '@/lib/analytics';
import config from '@/analytics.json';
import { utlDisableStorage } from '@microsoft/applicationinsights-core-js';
import { createRequire } from 'node:module';

jest.mock('@microsoft/applicationinsights-core-js', () => ({
  utlDisableStorage: jest.fn(),
}));

jest.mock('@microsoft/applicationinsights-web', () => ({
  ApplicationInsights: jest.fn(),
}));

const originalConnectionString = config.connectionString;
const sdk = {
  loadAppInsights: jest.fn(),
  addTelemetryInitializer: jest.fn(),
  trackPageView: jest.fn(),
  trackEvent: jest.fn(),
  flush: jest.fn(),
  unload: jest.fn(),
};
const constructor = jest.mocked(ApplicationInsights);
let initialize: (item: ITelemetryItem) => boolean | void;

beforeEach(() => {
  jest.clearAllMocks();
  jest.replaceProperty(process.env, 'NODE_ENV', 'production');
  config.connectionString =
    'InstrumentationKey=11111111-1111-4111-8111-111111111111;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com/';
  constructor.mockImplementation(() => sdk as unknown as ApplicationInsights);
  sdk.addTelemetryInitializer.mockImplementation(fn => {
    initialize = fn;
  });
  window.history.replaceState({}, '', '/');
});

afterEach(() => {
  config.connectionString = originalConnectionString;
  document.body.innerHTML = '';
  jest.restoreAllMocks();
});

it.each(['kennethheine.com', 'www.kennethheine.com'])(
  'allows production host %s',
  host => {
    expect(canTrackHost(host)).toBe(true);
  }
);

it.each([
  'localhost',
  '127.0.0.1',
  'preview.azurestaticapps.net',
  'kennethheine.com.example.org',
  'preview.kennethheine.com',
])('excludes %s', host => {
  expect(canTrackHost(host)).toBe(false);
});

it.each(['development', 'test'] as const)(
  'does not initialize in %s',
  async environment => {
    jest.replaceProperty(process.env, 'NODE_ENV', environment);
    expect(await startAnalytics()).toBeNull();
    expect(constructor).not.toHaveBeenCalled();
  }
);

it.each(['', 'invalid'])(
  'does not initialize without a valid connection string (%s)',
  async connection => {
    config.connectionString = connection;
    expect(await startAnalytics()).toBeNull();
    expect(constructor).not.toHaveBeenCalled();
  }
);

it('honors Do Not Track and Global Privacy Control', async () => {
  Object.defineProperty(navigator, 'doNotTrack', {
    configurable: true,
    value: '1',
  });
  expect(await startAnalytics()).toBeNull();
  Object.defineProperty(navigator, 'doNotTrack', {
    configurable: true,
    value: undefined,
  });
  Object.defineProperty(navigator, 'globalPrivacyControl', {
    configurable: true,
    value: true,
  });
  expect(await startAnalytics()).toBeNull();
  Object.defineProperty(navigator, 'globalPrivacyControl', {
    configurable: true,
    value: undefined,
  });
  expect(constructor).not.toHaveBeenCalled();
});

it('disables browser persistence, automatic collection and remote SDK configuration', async () => {
  const client = await startAnalytics();
  expect(constructor.mock.calls[0][0].config).toMatchObject({
    cookieCfg: { enabled: false },
    disableCookiesUsage: true,
    isStorageUseDisabled: true,
    enableSessionStorageBuffer: false,
    disableAjaxTracking: true,
    disableFetchTracking: true,
    disableExceptionTracking: true,
    enableAutoRouteTracking: false,
    featureOptIn: { sdkStats: { mode: 2, blockCdnCfg: true } },
    extensionConfig: {
      AppInsightsCfgSyncPlugin: { syncMode: 0, blkCdnCfg: true },
    },
  });
  expect(
    jest.mocked(utlDisableStorage).mock.invocationCallOrder[0]
  ).toBeLessThan(constructor.mock.invocationCallOrder[0]);
  client?.dispose();
});

it('shares one core module with the SDK so the pre-initialization storage switch applies', () => {
  const sdkRequire = createRequire(
    require.resolve('@microsoft/applicationinsights-web/package.json')
  );
  expect(
    sdkRequire.resolve('@microsoft/applicationinsights-core-js/package.json')
  ).toBe(
    require.resolve('@microsoft/applicationinsights-core-js/package.json')
  );
});

it('records route changes once, including a return to a previous page', async () => {
  const client = await startAnalytics();
  for (const path of ['/', '/', '/about', '/about/', '/'])
    client?.pageView(path);
  expect(sdk.trackPageView.mock.calls.map(([page]) => page.uri)).toEqual([
    'https://kennethheine.com/',
    'https://kennethheine.com/about/',
    'https://kennethheine.com/',
  ]);
  client?.dispose();
});

it('records only marked contact channels, including nested icons, and removes listeners', async () => {
  document.body.innerHTML =
    '<a data-analytics-contact="email"><span id="icon">email</span></a><a data-analytics-contact="linkedin">linkedin</a><a data-analytics-contact="other">other</a><a>unmarked</a>';
  const client = await startAnalytics();
  document.getElementById('icon')?.click();
  document.querySelectorAll('a').forEach(link => link.click());
  document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(
    sdk.trackEvent.mock.calls.map(([event]) => event.properties.channel)
  ).toEqual(['email', 'email', 'linkedin']);
  expect(sdk.flush).toHaveBeenCalledTimes(3);
  client?.dispose();
  document.getElementById('icon')?.click();
  expect(sdk.trackEvent).toHaveBeenCalledTimes(3);
  expect(sdk.unload).toHaveBeenCalledTimes(1);
});

it('removes raw URLs, referrer paths, unknown properties and user/session identifiers', async () => {
  jest
    .spyOn(document, 'referrer', 'get')
    .mockReturnValue('https://example.org/private?email=secret');
  const client = await startAnalytics();
  const item: ITelemetryItem = {
    name: 'Pageview',
    baseType: 'PageviewData',
    baseData: {
      name: 'private title',
      uri: 'https://kennethheine.com/about/?email=secret',
      refUri: 'https://example.org/private?email=secret',
      properties: { path: '/about/', secret: 'private' },
    },
    ext: {
      trace: { name: '/private?token=secret' },
      user: { id: 'user' },
      app: { sesId: 'session' },
    },
  };
  expect(initialize(item)).not.toBe(false);
  expect(item.baseData?.properties).toEqual({
    path: '/about/',
    referrerHost: 'example.org',
    verification: 'false',
  });
  expect(JSON.stringify(item)).not.toMatch(/secret|private|sesId|"user"/);
  expect(item.baseData?.uri).toBe('https://kennethheine.com/about/');
  client?.dispose();
});

it('marks deliberate verification traffic and drops unsupported telemetry', async () => {
  window.history.replaceState({}, '', '/?analytics_test=1');
  const client = await startAnalytics();
  for (const item of [
    { name: 'empty' },
    { name: 'error', baseType: 'ExceptionData', baseData: {} },
    { name: 'event', baseType: 'EventData', baseData: { name: 'Other' } },
    {
      name: 'event',
      baseType: 'EventData',
      baseData: { name: 'ContactClick', properties: { channel: 'unknown' } },
    },
  ]) {
    expect(initialize(item)).toBe(false);
  }
  const item: ITelemetryItem = {
    name: 'event',
    baseType: 'EventData',
    baseData: { name: 'ContactClick', properties: { channel: 'email' } },
  };
  initialize(item);
  expect(item.baseData?.properties).toEqual({
    channel: 'email',
    path: '/',
    referrerHost: 'direct',
    verification: 'true',
  });
  client?.dispose();
});

it('masks unknown paths rather than recording user-supplied URL content', () => {
  expect(analyticsPage('/private-person-name')).toEqual({
    path: '/404/',
    name: 'Page not found',
  });
});

it('does not break the site when SDK initialization fails', async () => {
  constructor.mockImplementationOnce(() => {
    throw new Error('blocked');
  });
  expect(await startAnalytics()).toBeNull();
});
