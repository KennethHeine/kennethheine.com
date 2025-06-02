import { render, screen } from '@testing-library/react'
import { Container } from '@/components/ui'

describe('Container component', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <div>Test content</div>
      </Container>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies default CSS classes', () => {
    const { container } = render(
      <Container>
        <div>Test content</div>
      </Container>
    )

    const containerElement = container.firstChild as HTMLElement
    expect(containerElement).toHaveClass('mx-auto', 'max-w-7xl', 'px-4', 'sm:px-6', 'lg:px-8')
  })

  it('accepts additional className prop', () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Test content</div>
      </Container>
    )

    const containerElement = container.firstChild as HTMLElement
    expect(containerElement).toHaveClass('custom-class')
  })

  it('renders as different HTML elements when "as" prop is provided', () => {
    const { container } = render(
      <Container as="section">
        <div>Test content</div>
      </Container>
    )

    expect(container.firstChild?.nodeName).toBe('SECTION')
  })
})
