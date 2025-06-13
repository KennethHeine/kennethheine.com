import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { CodeBlock } from '../../../components/mdx/CodeBlock';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

describe('CodeBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders code block with pre element', () => {
    render(
      <CodeBlock className='language-javascript'>
        console.log('Hello, world!');
      </CodeBlock>
    );

    const preElement = screen.getByText("console.log('Hello, world!');");
    expect(preElement.closest('pre')).toBeInTheDocument();
  });

  it('shows copy button on hover', () => {
    render(<CodeBlock>const test = &apos;code&apos;;</CodeBlock>);

    const copyButton = screen.getByLabelText('Copy code');
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).toHaveClass('opacity-0');
  });

  it('copies code content to clipboard when copy button is clicked', async () => {
    const codeContent = 'console.log(&apos;Hello, world!&apos;);';
    render(<CodeBlock>{codeContent}</CodeBlock>);

    const copyButton = screen.getByLabelText('Copy code');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(codeContent);
    });
  });

  it('shows success state after successful copy', async () => {
    render(<CodeBlock>test code</CodeBlock>);

    const copyButton = screen.getByLabelText('Copy code');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Code copied')).toBeInTheDocument();
    });
  });

  it('resets success state after timeout', async () => {
    jest.useFakeTimers();

    render(<CodeBlock>test code</CodeBlock>);

    const copyButton = screen.getByLabelText('Copy code');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Code copied')).toBeInTheDocument();
    });

    // Fast-forward time by 2 seconds using act
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Copy code')).toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it('handles JSX children correctly', async () => {
    render(
      <CodeBlock>
        <span>const test = &apos;nested content&apos;;</span>
      </CodeBlock>
    );

    const copyButton = screen.getByLabelText('Copy code');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "const test = 'nested content';"
      );
    });
  });

  it('handles complex nested JSX structure', async () => {
    render(
      <CodeBlock>
        <div>
          <span>line 1</span>
          <span>line 2</span>
        </div>
      </CodeBlock>
    );

    const copyButton = screen.getByLabelText('Copy code');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'line 1line 2'
      );
    });
  });

  it('handles copy failure gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(
      new Error('Clipboard API failed')
    );

    render(<CodeBlock>test code</CodeBlock>);

    const copyButton = screen.getByLabelText('Copy code');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to copy code:',
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it('applies custom className to pre element', () => {
    render(
      <CodeBlock className='custom-class language-typescript'>
        typescript code
      </CodeBlock>
    );

    const preElement = screen.getByText('typescript code');
    expect(preElement).toHaveClass('custom-class', 'language-typescript');
  });

  it('passes through additional props to pre element', () => {
    render(
      <CodeBlock data-testid='custom-pre' aria-label='Code example'>
        test code
      </CodeBlock>
    );

    const preElement = screen.getByTestId('custom-pre');
    expect(preElement).toHaveAttribute('aria-label', 'Code example');
  });
});
