import { MobileMenu, SkipLinks } from '../../../components/navigation';

describe('Navigation index exports', () => {
  it('exports MobileMenu component', () => {
    expect(MobileMenu).toBeDefined();
    expect(typeof MobileMenu).toBe('function');
  });

  it('exports SkipLinks component', () => {
    expect(SkipLinks).toBeDefined();
    expect(typeof SkipLinks).toBe('function');
  });
});
