import { act, render, waitFor } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { WebAnalytics } from '@/components/analytics/WebAnalytics';
import { startAnalytics, type SiteAnalytics } from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({ startAnalytics: jest.fn() }));
jest.mock('next/navigation', () => ({ usePathname: jest.fn() }));

const start = jest.mocked(startAnalytics);
const pathname = jest.mocked(usePathname);

beforeEach(() => {
  jest.clearAllMocks();
  pathname.mockReturnValue('/');
});

it('tracks initial and client navigation views without restarting the SDK', async () => {
  const client = { pageView: jest.fn(), dispose: jest.fn() };
  start.mockResolvedValue(client);
  const { rerender, unmount } = render(<WebAnalytics />);
  await waitFor(() => expect(client.pageView).toHaveBeenCalledWith('/'));
  pathname.mockReturnValue('/about/');
  rerender(<WebAnalytics />);
  expect(client.pageView).toHaveBeenLastCalledWith('/about/');
  expect(start).toHaveBeenCalledTimes(1);
  unmount();
  expect(client.dispose).toHaveBeenCalledTimes(1);
});

it('remains invisible and usable when analytics is disabled', async () => {
  start.mockResolvedValue(null);
  const { container } = render(<WebAnalytics />);
  await act(async () => {});
  expect(container).toBeEmptyDOMElement();
});

it('disposes an SDK that finishes loading after unmount without recording a view', async () => {
  let finish: (client: SiteAnalytics) => void = () => {};
  start.mockReturnValue(
    new Promise(resolve => {
      finish = resolve;
    })
  );
  const client = { pageView: jest.fn(), dispose: jest.fn() };
  const { unmount } = render(<WebAnalytics />);
  unmount();
  await act(async () => {
    finish(client);
  });
  expect(client.dispose).toHaveBeenCalledTimes(1);
  expect(client.pageView).not.toHaveBeenCalled();
});
