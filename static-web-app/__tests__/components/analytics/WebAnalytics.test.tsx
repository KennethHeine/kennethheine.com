/** @jest-environment-options {"url":"https://kennethheine.com/"} */

import { render } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { ScriptProps } from 'next/script';
import {
  WebAnalytics,
  canTrackHost,
} from '@/components/analytics/WebAnalytics';
import config from '@/analytics.json';

jest.mock('next/script', () => ({
  __esModule: true,
  default: function MockScript({ strategy, ...props }: ScriptProps) {
    return <script {...props} data-strategy={strategy} />;
  },
}));

const configuredToken = config.cloudflareToken;
const testToken = '0123456789abcdef0123456789abcdef';

beforeEach(() => {
  jest.replaceProperty(process.env, 'NODE_ENV', 'production');
  config.cloudflareToken = testToken;
});

afterEach(() => {
  config.cloudflareToken = configuredToken;
  jest.restoreAllMocks();
});

describe('browser analytics isolation', () => {
  it.each(['kennethheine.com', 'www.kennethheine.com'])(
    'allows the production host %s',
    hostname => expect(canTrackHost(hostname)).toBe(true)
  );

  it.each([
    'localhost',
    '127.0.0.1',
    'white-sand-00ffc7403.7.azurestaticapps.net',
    'white-sand-00ffc7403-401.westeurope.7.azurestaticapps.net',
    'kennethheine.com.example.org',
    'preview.kennethheine.com',
  ])('excludes development and preview host %s', hostname => {
    expect(canTrackHost(hostname)).toBe(false);
  });

  it.each(['development', 'test'] as const)(
    'excludes %s builds',
    environment => {
      jest.replaceProperty(process.env, 'NODE_ENV', environment);
      expect(canTrackHost('kennethheine.com')).toBe(false);
      const { container } = render(<WebAnalytics />);
      expect(container.querySelector('script')).toBeNull();
    }
  );

  it.each(['', 'paste-token-here', `${testToken}x`])(
    'loads no script without a valid public token (%s)',
    token => {
      config.cloudflareToken = token;
      expect(canTrackHost('kennethheine.com')).toBe(false);
      const { container } = render(<WebAnalytics />);
      expect(container.querySelector('script')).toBeNull();
    }
  );

  it('does not emit an external script before the browser host is checked', () => {
    expect(renderToStaticMarkup(<WebAnalytics />)).toBe('');
  });

  it('loads one deferred beacon and leaves SPA tracking to Cloudflare', () => {
    const { container, rerender } = render(<WebAnalytics />);
    rerender(<WebAnalytics />);
    const scripts = container.querySelectorAll('script');
    expect(scripts).toHaveLength(1);
    expect(scripts[0]).toHaveAttribute(
      'src',
      'https://static.cloudflareinsights.com/beacon.min.js'
    );
    expect(scripts[0]).toHaveAttribute('data-strategy', 'afterInteractive');
    expect(scripts[0]).toHaveAttribute('type', 'module');
    expect(scripts[0]).toHaveAttribute('crossorigin', 'anonymous');
    expect(
      JSON.parse(scripts[0].getAttribute('data-cf-beacon') ?? '{}')
    ).toEqual({
      token: testToken,
    });
  });
});
