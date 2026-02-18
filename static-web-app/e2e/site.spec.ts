import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should load all main pages via direct navigation', async ({ page }) => {
    // Test Home page
    await page.goto('/');
    await expect(page).toHaveTitle(/Home|Kenneth Heine/i);

    // Test About page
    await page.goto('/about');
    await expect(page).toHaveURL(/\/about\/?$/);
    await expect(page.locator('h1').first()).toBeVisible();

    // Test Contact page
    await page.goto('/contact');
    await expect(page).toHaveURL(/\/contact\/?$/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should have navigation elements', async ({ page }) => {
    await page.goto('/');

    // Check that navigation exists (either desktop or mobile)
    const hasDesktopNav = await page.locator('nav#main-navigation').isVisible();
    const hasMobileMenuButton = await page
      .locator('button[aria-label*="menu"]')
      .isVisible();

    // At least one navigation method should exist
    expect(hasDesktopNav || hasMobileMenuButton).toBeTruthy();
  });
});

test.describe('Home Page', () => {
  test('should load home page with key elements', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Home|Kenneth Heine/i);

    // Check for main content
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();

    // Check for footer
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('/');

    // Check meta description exists
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });
});

test.describe('About Page', () => {
  test('should load about page with content', async ({ page }) => {
    await page.goto('/about');

    // Check page has loaded
    await expect(page).toHaveURL(/\/about\/?$/);

    // Check for main heading
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Check main content is present
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });
});

test.describe('Contact Page', () => {
  test('should load contact page with content', async ({ page }) => {
    await page.goto('/contact');

    // Check page has loaded
    await expect(page).toHaveURL(/\/contact\/?$/);

    // Check for main heading
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Check main content is present
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });

  test('should not have Calendly widget', async ({ page }) => {
    await page.goto('/contact');

    // Calendly widget should not be present
    const calendlyWidget = page.locator('.calendly-inline-widget');
    await expect(calendlyWidget).not.toBeAttached();
  });

  test('should have email contact option', async ({ page }) => {
    await page.goto('/contact');

    // Check that email fallback link is present
    const emailLink = page.locator('a[href="mailto:kenneth@kscloud.io"]');
    await expect(emailLink).toBeVisible();
  });
});

test.describe('Theme Toggle', () => {
  test('should have theme toggle functionality', async ({ page }) => {
    await page.goto('/');

    // Find theme toggle button
    const themeToggle = page
      .locator('button[aria-label*="theme"], button[aria-label*="mode"]')
      .first();

    // Theme toggle should exist
    await expect(themeToggle).toBeVisible();

    // Capture initial theme state from the <html> element
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');

    // Click should trigger a theme change without error
    await themeToggle.click();

    if (
      initialClass === null ||
      initialClass === undefined ||
      initialClass === ''
    ) {
      // If there was no class before, we expect some class to be set after toggling
      await expect(html).toHaveAttribute('class', /.+/);
    } else {
      // Otherwise we expect the class list to change (e.g. toggling "dark" mode)
      await expect(html).not.toHaveAttribute('class', initialClass);
    }
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check that there's at least one heading
    const headings = page.locator('h1, h2, h3');
    const count = await headings.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');

    // Check all images have alt attributes
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Alt can be empty string for decorative images, but attribute must exist
      expect(alt).not.toBeNull();
    }
  });

  test('should have skip links for keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Check for skip links (common accessibility pattern)
    // The site should have at least one skip link to main content
    const count = await page.locator('a[href="#main-content"]').count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Responsive Design', () => {
  test('should display correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Page should load correctly
    await expect(page).toHaveTitle(/Home|Kenneth Heine/i);

    // Main content should be visible
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Page should load correctly
    await expect(page).toHaveTitle(/Home|Kenneth Heine/i);

    // Main content should be visible
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });

  test('should display correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    // Page should load correctly
    await expect(page).toHaveTitle(/Home|Kenneth Heine/i);

    // Main content should be visible
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load home page within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load within 10 seconds (generous for CI environments)
    expect(loadTime).toBeLessThan(10000);
  });
});

test.describe('404 Page', () => {
  test('should show 404 page for non-existent routes', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist-12345');

    // Should return 404 status or show not found content
    // Static sites may return 200 with custom 404 content
    const content = await page.content();
    const is404 =
      response?.status() === 404 ||
      content.toLowerCase().includes('not found') ||
      content.toLowerCase().includes('404');

    expect(is404).toBeTruthy();
  });
});
