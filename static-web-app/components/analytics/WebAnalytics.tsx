'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { startAnalytics, type SiteAnalytics } from '@/lib/analytics';

/** Root-layout observer: one page view per route, including client navigation. */
export function WebAnalytics() {
  const pathname = usePathname();
  const [client, setClient] = useState<SiteAnalytics | null>(null);

  useEffect(() => {
    let mounted = true;
    let active: SiteAnalytics | null = null;
    void startAnalytics().then(instance => {
      if (!mounted) {
        instance?.dispose();
        return;
      }
      active = instance;
      setClient(instance);
    });
    return () => {
      mounted = false;
      active?.dispose();
    };
  }, []);

  useEffect(() => {
    client?.pageView(pathname);
  }, [client, pathname]);

  return null;
}
