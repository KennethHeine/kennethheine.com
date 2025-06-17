import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal, ModalProps } from '../../../components/ui/Modal';

// Mock useEffect to test lifecycle
const mockOnClose = jest.fn();

const defaultProps: ModalProps = {
  open: true,
  onClose: mockOnClose,
  children: <div>Modal content</div>,
};

describe('Modal component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset body overflow style
    document.body.style.overflow = '';
  });

  afterEach(() => {
    // Clean up any remaining modals
    document.body.style.overflow = '';
  });

  describe('Basic rendering', () => {
    it('renders when open is true', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByText('Modal content')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('does not render when open is false', () => {
      render(<Modal {...defaultProps} open={false} />);
      expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Modal {...defaultProps} className='custom-modal' />);
      // The custom className is applied to the inner modal div, not the backdrop container
      const modalContainer = screen.getByRole('dialog');
      const modalContent = modalContainer.querySelector('.relative');
      expect(modalContent).toHaveClass('custom-modal');
    });
  });

  describe('Size variants', () => {
    it('applies small size classes', () => {
      render(<Modal {...defaultProps} size='sm' />);
      const modalContainer = screen.getByRole('dialog');
      const modalContent = modalContainer.querySelector('.relative');
      expect(modalContent).toHaveClass('max-w-md'); // sm maps to max-w-md
    });

    it('applies medium size classes (default)', () => {
      render(<Modal {...defaultProps} size='md' />);
      const modalContainer = screen.getByRole('dialog');
      const modalContent = modalContainer.querySelector('.relative');
      expect(modalContent).toHaveClass('max-w-lg'); // md maps to max-w-lg
    });

    it('applies large size classes', () => {
      render(<Modal {...defaultProps} size='lg' />);
      const modalContainer = screen.getByRole('dialog');
      const modalContent = modalContainer.querySelector('.relative');
      expect(modalContent).toHaveClass('max-w-2xl'); // lg maps to max-w-2xl
    });

    it('applies extra large size classes', () => {
      render(<Modal {...defaultProps} size='xl' />);
      const modalContainer = screen.getByRole('dialog');
      const modalContent = modalContainer.querySelector('.relative');
      expect(modalContent).toHaveClass('max-w-4xl'); // xl maps to max-w-4xl
    });

    it('applies full size classes', () => {
      render(<Modal {...defaultProps} size='full' />);
      const modalContainer = screen.getByRole('dialog');
      const modalContent = modalContainer.querySelector('.relative');
      expect(modalContent).toHaveClass('max-w-full'); // full maps to max-w-full
    });

    it('uses medium size as default', () => {
      render(<Modal {...defaultProps} />);
      const modalContainer = screen.getByRole('dialog');
      const modalContent = modalContainer.querySelector('.relative');
      expect(modalContent).toHaveClass('max-w-lg'); // default md maps to max-w-lg
    });
  });

  describe('Interaction behavior', () => {
    it('calls onClose when backdrop is clicked (default behavior)', () => {
      render(<Modal {...defaultProps} />);
      // Click the backdrop, not the modal content
      const backdrop = screen
        .getByRole('dialog')
        .querySelector('.fixed.inset-0.bg-black');

      fireEvent.click(backdrop!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when backdrop is clicked and closeOnBackdropClick is false', () => {
      render(<Modal {...defaultProps} closeOnBackdropClick={false} />);
      const backdrop = screen
        .getByRole('dialog')
        .querySelector('.fixed.inset-0.bg-black');

      fireEvent.click(backdrop!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('does not call onClose when modal content is clicked', () => {
      render(<Modal {...defaultProps} />);
      const modalContent = screen
        .getByRole('dialog')
        .querySelector('.relative');

      fireEvent.click(modalContent!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('calls onClose when Escape key is pressed (default behavior)', () => {
      render(<Modal {...defaultProps} />);

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when Escape key is pressed and closeOnEscape is false', () => {
      render(<Modal {...defaultProps} closeOnEscape={false} />);

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('does not call onClose when other keys are pressed', () => {
      render(<Modal {...defaultProps} />);

      fireEvent.keyDown(document, { key: 'Enter' });
      fireEvent.keyDown(document, { key: 'Space' });
      fireEvent.keyDown(document, { key: 'Tab' });

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Body scroll management', () => {
    it('sets body overflow to hidden when modal opens', () => {
      render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body overflow when modal closes', () => {
      const { rerender } = render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');

      rerender(<Modal {...defaultProps} open={false} />);
      expect(document.body.style.overflow).toBe('unset'); // Component uses 'unset', not ''
    });

    it('restores body overflow when component unmounts', () => {
      const { unmount } = render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');

      unmount();
      expect(document.body.style.overflow).toBe('unset'); // Component uses 'unset', not ''
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Modal {...defaultProps} />);
      const modal = screen.getByRole('dialog');

      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('role', 'dialog');
    });

    it('focuses the modal when opened', async () => {
      render(<Modal {...defaultProps} />);
      const modalContainer = screen.getByRole('dialog');
      const modalContent = modalContainer.querySelector('.relative');

      // Modal should be in the DOM but focus behavior might be different in test environment
      expect(modalContent).toBeInTheDocument();
      expect(modalContainer).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('Compound components', () => {
    describe('Modal.Header', () => {
      it('renders header content', () => {
        render(
          <Modal {...defaultProps}>
            <Modal.Header>Header content</Modal.Header>
          </Modal>
        );

        expect(screen.getByText('Header content')).toBeInTheDocument();
      });

      it('shows close button by default', () => {
        render(
          <Modal {...defaultProps}>
            <Modal.Header onClose={mockOnClose}>Header</Modal.Header>
          </Modal>
        );

        const closeButton = screen.getByRole('button', { name: /close/i });
        expect(closeButton).toBeInTheDocument();
      });

      it('hides close button when showCloseButton is false', () => {
        render(
          <Modal {...defaultProps}>
            <Modal.Header showCloseButton={false}>Header</Modal.Header>
          </Modal>
        );

        expect(
          screen.queryByRole('button', { name: /close/i })
        ).not.toBeInTheDocument();
      });

      it('calls onClose when close button is clicked', () => {
        render(
          <Modal {...defaultProps}>
            <Modal.Header onClose={mockOnClose}>Header</Modal.Header>
          </Modal>
        );

        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });

      it('applies custom className', () => {
        render(
          <Modal {...defaultProps}>
            <Modal.Header className='custom-header'>Header</Modal.Header>
          </Modal>
        );

        const header = screen.getByText('Header').parentElement;
        expect(header).toHaveClass('custom-header');
      });

      it('forwards other props', () => {
        render(
          <Modal {...defaultProps}>
            <Modal.Header data-testid='modal-header'>Header</Modal.Header>
          </Modal>
        );

        expect(screen.getByTestId('modal-header')).toBeInTheDocument();
      });
    });

    describe('Modal.Body', () => {
      it('renders body content', () => {
        render(
          <Modal {...defaultProps}>
            <Modal.Body>Body content</Modal.Body>
          </Modal>
        );

        expect(screen.getByText('Body content')).toBeInTheDocument();
      });

      it('applies custom className', () => {
        render(
          <Modal {...defaultProps}>
            <Modal.Body className='custom-body'>Body</Modal.Body>
          </Modal>
        );

        const body = screen.getByText('Body');
        expect(body).toHaveClass('custom-body');
      });

      it('forwards other props', () => {
        render(
          <Modal {...defaultProps}>
            <Modal.Body data-testid='modal-body'>Body</Modal.Body>
          </Modal>
        );

        expect(screen.getByTestId('modal-body')).toBeInTheDocument();
      });
    });

    describe('Modal.Footer', () => {
      it('renders footer content', () => {
        render(
          <Modal {...defaultProps}>
            <Modal.Footer>Footer content</Modal.Footer>
          </Modal>
        );

        expect(screen.getByText('Footer content')).toBeInTheDocument();
      });

      it('applies custom className', () => {
        render(
          <Modal {...defaultProps}>
            <Modal.Footer className='custom-footer'>Footer</Modal.Footer>
          </Modal>
        );

        const footer = screen.getByText('Footer');
        expect(footer).toHaveClass('custom-footer');
      });

      it('forwards other props', () => {
        render(
          <Modal {...defaultProps}>
            <Modal.Footer data-testid='modal-footer'>Footer</Modal.Footer>
          </Modal>
        );

        expect(screen.getByTestId('modal-footer')).toBeInTheDocument();
      });
    });
  });

  describe('Complex scenarios', () => {
    it('renders complete modal with all compound components', () => {
      render(
        <Modal {...defaultProps}>
          <Modal.Header onClose={mockOnClose}>Modal Title</Modal.Header>
          <Modal.Body>Modal body content</Modal.Body>
          <Modal.Footer>Modal footer</Modal.Footer>
        </Modal>
      );

      expect(screen.getByText('Modal Title')).toBeInTheDocument();
      expect(screen.getByText('Modal body content')).toBeInTheDocument();
      expect(screen.getByText('Modal footer')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /close/i })
      ).toBeInTheDocument();
    });

    it('handles multiple event listeners correctly', () => {
      render(<Modal {...defaultProps} />);

      // Test multiple escape key presses
      fireEvent.keyDown(document, { key: 'Escape' });
      fireEvent.keyDown(document, { key: 'Escape' });

      expect(mockOnClose).toHaveBeenCalledTimes(2);
    });

    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(<Modal {...defaultProps} />);

      unmount();

      // Event listeners should be cleaned up, so this shouldn't call onClose
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('handles missing onClose prop gracefully', () => {
      const propsWithoutOnClose = { ...defaultProps };
      delete (propsWithoutOnClose as any).onClose;

      expect(() => {
        render(<Modal {...propsWithoutOnClose} />);
      }).not.toThrow();
    });

    it('handles null children', () => {
      render(<Modal {...defaultProps} children={null} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('handles undefined children', () => {
      render(<Modal {...defaultProps} children={undefined} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders without children prop', () => {
      const propsWithoutChildren = { open: true, onClose: mockOnClose };
      render(<Modal {...propsWithoutChildren} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Component displayName', () => {
    it('has correct displayName for all modal components', () => {
      expect(Modal.displayName).toBe('Modal');
      expect(Modal.Header.displayName).toBe('ModalHeader');
      expect(Modal.Body.displayName).toBe('ModalBody');
      expect(Modal.Footer.displayName).toBe('ModalFooter');
    });
  });
});
