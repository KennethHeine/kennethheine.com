import robots from '../../app/robots';

// Crawlers need the exported pages AND /_next/static assets to render the site.
describe('robots.txt', () => {
  it('allows every crawler to fetch public content and rendering assets', () => {
    const data = robots();
    expect(data.rules).toEqual({ userAgent: '*', allow: '/' });
  });

  it('links to the production sitemap', () => {
    expect(robots().sitemap).toBe('https://kennethheine.com/sitemap.xml');
  });

  it('produces the same directives during each static build', () => {
    expect(robots()).toEqual(robots());
  });
});
