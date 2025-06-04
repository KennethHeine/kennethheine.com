import { render, screen } from '@testing-library/react';
import SkillBadge from '../components/SkillBadge';

describe('SkillBadge component', () => {
  it('renders skill name correctly', () => {
    render(<SkillBadge skill='React' />);

    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<SkillBadge skill='TypeScript' />);

    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass(
      'inline-flex',
      'items-center',
      'px-3',
      'py-1',
      'rounded-full',
      'text-sm',
      'font-medium'
    );
  });

  it('renders with different skill names', () => {
    const skills = ['JavaScript', 'Next.js', 'Tailwind CSS', 'Node.js'];

    skills.forEach(skill => {
      const { rerender } = render(<SkillBadge skill={skill} />);
      expect(screen.getByText(skill)).toBeInTheDocument();
      rerender(<div />); // Clear for next iteration
    });
  });
});
