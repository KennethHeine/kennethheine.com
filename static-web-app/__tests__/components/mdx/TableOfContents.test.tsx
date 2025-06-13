import { render, screen, fireEvent } from '@testing-library/react';
import { TableOfContents } from '../../../components/mdx/TableOfContents';
import { TocItem } from '../../../lib/mdx';

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
});

describe('TableOfContents', () => {
  const mockTocItems: TocItem[] = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'getting-started', title: 'Getting Started', level: 2 },
    { id: 'prerequisites', title: 'Prerequisites', level: 3 },
    { id: 'advanced-topics', title: 'Advanced Topics', level: 2 },
    { id: 'performance', title: 'Performance', level: 3 },
    { id: 'security', title: 'Security', level: 3 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock getElementById
    document.getElementById = jest.fn().mockReturnValue({
      scrollIntoView: mockScrollIntoView,
    });
  });

  it('renders table of contents with default title', () => {
    render(<TableOfContents items={mockTocItems} />);

    expect(screen.getByText('Table of Contents')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'Table of contents'
    );
  });

  it('renders custom title', () => {
    render(<TableOfContents items={mockTocItems} title='On This Page' />);

    expect(screen.getByText('On This Page')).toBeInTheDocument();
  });

  it('renders all TOC items as buttons', () => {
    render(<TableOfContents items={mockTocItems} />);

    mockTocItems.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.title)).toHaveAttribute('type', 'button');
    });
  });

  it('handles click on TOC item', () => {
    render(<TableOfContents items={mockTocItems} />);

    const introductionButton = screen.getByText('Introduction');
    fireEvent.click(introductionButton);

    expect(document.getElementById).toHaveBeenCalledWith('introduction');
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('handles click when element does not exist', () => {
    document.getElementById = jest.fn().mockReturnValue(null);

    render(<TableOfContents items={mockTocItems} />);

    const introductionButton = screen.getByText('Introduction');
    fireEvent.click(introductionButton);

    expect(document.getElementById).toHaveBeenCalledWith('introduction');
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(
      <TableOfContents items={mockTocItems} className='custom-toc-class' />
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('custom-toc-class');
  });

  it('renders nothing when items array is empty', () => {
    const { container } = render(<TableOfContents items={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when items is undefined', () => {
    const { container } = render(<TableOfContents items={undefined as any} />);

    expect(container.firstChild).toBeNull();
  });

  it('applies appropriate margin for different heading levels', () => {
    const items: TocItem[] = [
      { id: 'h1', title: 'H1 Heading', level: 1 },
      { id: 'h2', title: 'H2 Heading', level: 2 },
      { id: 'h3', title: 'H3 Heading', level: 3 },
      { id: 'h4', title: 'H4 Heading', level: 4 },
    ];

    render(<TableOfContents items={items} />);

    const h1Item = screen.getByText('H1 Heading').closest('li');
    const h2Item = screen.getByText('H2 Heading').closest('li');
    const h3Item = screen.getByText('H3 Heading').closest('li');
    const h4Item = screen.getByText('H4 Heading').closest('li');

    // Level 1 should have ml-0 (level - 1) * 3 = 0
    expect(h1Item).toHaveClass('ml-0');
    // Level 2 should have ml-3 (level - 1) * 3 = 3
    expect(h2Item).toHaveClass('ml-3');
    // Level 3 should have ml-6 (level - 1) * 3 = 6
    expect(h3Item).toHaveClass('ml-6');
    // Level 4 should have ml-9 (level - 1) * 3 = 9
    expect(h4Item).toHaveClass('ml-9');
  });

  it('handles unique keys for items with same id', () => {
    const itemsWithDuplicates: TocItem[] = [
      { id: 'intro', title: 'Introduction 1', level: 1 },
      { id: 'intro', title: 'Introduction 2', level: 1 },
    ];

    render(<TableOfContents items={itemsWithDuplicates} />);

    expect(screen.getByText('Introduction 1')).toBeInTheDocument();
    expect(screen.getByText('Introduction 2')).toBeInTheDocument();
  });

  it('supports keyboard interaction', () => {
    render(<TableOfContents items={mockTocItems} />);

    const introductionButton = screen.getByText('Introduction');

    // Button should be focusable
    introductionButton.focus();
    expect(document.activeElement).toBe(introductionButton);

    // Should trigger click on Space or Enter
    fireEvent.click(introductionButton);
    expect(document.getElementById).toHaveBeenCalledWith('introduction');
  });

  it('has proper accessibility attributes', () => {
    render(<TableOfContents items={mockTocItems} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Table of contents');

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    mockTocItems.forEach(item => {
      const button = screen.getByText(item.title);
      expect(button).toHaveAttribute('type', 'button');
    });
  });
});
