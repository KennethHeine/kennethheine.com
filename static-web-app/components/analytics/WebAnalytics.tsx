'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import config from '@/analytics.json';

export function canTrackHost(hostname: string): boolean {
  return (
    process.env.NODE_ENV === 'production' &&
    /^[a-f0-9]{32}$/i.test(config.cloudflareToken) &&
    config.productionHosts.includes(hostname)
  );
}

/** Load once in the root layout; Cloudflare handles client-side navigation. */
export function WebAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(canTrackHost(window.location.hostname));
  }, []);

  if (!enabled) return null;

  return (
    <Script
      id='cloudflare-web-analytics'
      src='https://static.cloudflareinsights.com/beacon.min.js'
      strategy='afterInteractive'
      type='module'
      crossOrigin='anonymous'
      data-cf-beacon={JSON.stringify({ token: config.cloudflareToken })}
    />
  );
}
