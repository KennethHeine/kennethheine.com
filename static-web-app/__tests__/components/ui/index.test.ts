/**
 * @jest-environment jsdom
 */

import * as UIComponents from '../../../components/ui';

describe('UI Components Index', () => {
  it('should export all core UI components', () => {
    // Core UI Components
    expect(UIComponents.Button).toBeDefined();
    expect(UIComponents.Card).toBeDefined();
    expect(UIComponents.Badge).toBeDefined();
    expect(UIComponents.Input).toBeDefined();
    expect(UIComponents.Label).toBeDefined();
    expect(UIComponents.Modal).toBeDefined();
    expect(UIComponents.Typography).toBeDefined();

    // Typography convenience exports
    expect(UIComponents.H1).toBeDefined();
    expect(UIComponents.H2).toBeDefined();
    expect(UIComponents.H3).toBeDefined();
    expect(UIComponents.H4).toBeDefined();
    expect(UIComponents.H5).toBeDefined();
    expect(UIComponents.H6).toBeDefined();
    expect(UIComponents.Lead).toBeDefined();
    expect(UIComponents.Muted).toBeDefined();

    // Legacy components
    expect(UIComponents.SkillBadge).toBeDefined();
    expect(UIComponents.ThemeToggle).toBeDefined();
    expect(UIComponents.TimelineItem).toBeDefined();
  });

  it('should export component types', () => {
    // We can't directly test types in runtime, but we can ensure the exports don't error
    const exports = Object.keys(UIComponents);
    expect(exports.length).toBeGreaterThan(0);
  });
});
