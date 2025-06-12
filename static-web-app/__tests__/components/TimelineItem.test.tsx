import { render, screen } from '@testing-library/react';
import { TimelineItem } from '../../components/ui/TimelineItem';

interface TimelineItemProps {
  item: {
    year: string;
    title: string;
    company: string;
    description: string;
  };
  index: number;
}

describe('TimelineItem component', () => {
  const defaultProps: TimelineItemProps = {
    item: {
      year: '2023',
      title: 'Senior Developer',
      company: 'Tech Company',
      description: 'Working on amazing projects with cutting-edge technology.',
    },
    index: 0,
  };

  it('renders timeline item with all props', () => {
    render(<TimelineItem {...defaultProps} />);

    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText('Tech Company')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Working on amazing projects with cutting-edge technology.'
      )
    ).toBeInTheDocument();
  });

  it('applies correct styling for even index (left alignment)', () => {
    const evenProps = { ...defaultProps, index: 0 };
    const { container } = render(<TimelineItem {...evenProps} />);

    // Even index should have sm:justify-start for left alignment
    const timelineItem = container.querySelector('.sm\\:justify-start');
    expect(timelineItem).toBeInTheDocument();
  });

  it('applies correct styling for odd index (right alignment)', () => {
    const oddProps = { ...defaultProps, index: 1 };
    const { container } = render(<TimelineItem {...oddProps} />);

    // Odd index should have sm:justify-end for right alignment
    const timelineItem = container.querySelector('.sm\\:justify-end');
    expect(timelineItem).toBeInTheDocument();
  });

  it('renders semantic HTML structure', () => {
    render(<TimelineItem {...defaultProps} />);

    // Should have time element for the year
    const timeElement = screen.getByText('2023');
    expect(timeElement.tagName.toLowerCase()).toBe('time');

    // Should have h3 element for the title
    const titleElement = screen.getByText('Senior Developer');
    expect(titleElement.tagName.toLowerCase()).toBe('h3');
  });

  it('applies brand color classes', () => {
    const { container } = render(<TimelineItem {...defaultProps} />);

    // Check for brand color classes
    expect(container.querySelector('.bg-brand-500')).toBeInTheDocument();
    expect(container.querySelector('.text-brand-600')).toBeInTheDocument();
  });

  it('includes proper accessibility attributes', () => {
    render(<TimelineItem {...defaultProps} />);

    // Time element should have proper datetime attribute
    const timeElement = screen.getByText('2023');
    expect(timeElement).toHaveAttribute('dateTime', '2023');
  });

  it('handles long descriptions properly', () => {
    const longDescriptionProps = {
      ...defaultProps,
      item: {
        ...defaultProps.item,
        description:
          'This is a very long description that should wrap properly and be displayed correctly in the timeline component without breaking the layout or causing any visual issues.',
      },
    };

    render(<TimelineItem {...longDescriptionProps} />);

    expect(
      screen.getByText(/This is a very long description/)
    ).toBeInTheDocument();
  });
});
