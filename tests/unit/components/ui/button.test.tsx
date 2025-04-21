import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, buttonVariants } from '@/components/ui/button';

describe('Button', () => {
  it('should render correctly with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('should render with different variants', () => {
    const { rerender } = render(<Button variant="destructive">Destructive</Button>);
    
    let button = screen.getByRole('button', { name: 'Destructive' });
    expect(button).toHaveClass('bg-destructive');
    
    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole('button', { name: 'Outline' });
    expect(button).toHaveClass('border-input');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByRole('button', { name: 'Secondary' });
    expect(button).toHaveClass('bg-secondary');
    
    rerender(<Button variant="ghost">Ghost</Button>);
    button = screen.getByRole('button', { name: 'Ghost' });
    expect(button).toHaveClass('hover:bg-accent');
    
    rerender(<Button variant="link">Link</Button>);
    button = screen.getByRole('button', { name: 'Link' });
    expect(button).toHaveClass('text-primary');
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<Button size="default">Default</Button>);
    
    let button = screen.getByRole('button', { name: 'Default' });
    expect(button).toHaveClass('h-9 px-4 py-2');
    
    rerender(<Button size="sm">Small</Button>);
    button = screen.getByRole('button', { name: 'Small' });
    expect(button).toHaveClass('h-8');
    
    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole('button', { name: 'Large' });
    expect(button).toHaveClass('h-10');
    
    rerender(<Button size="icon">Icon</Button>);
    button = screen.getByRole('button', { name: 'Icon' });
    expect(button).toHaveClass('w-9');
  });

  it('should handle click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should forward refs correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Test</Button>);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.textContent).toBe('Ref Test');
  });

  it('should render as a different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="https://example.com">Link Button</a>
      </Button>
    );
    
    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveClass('bg-primary');
  });

  it('should render with custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    
    const button = screen.getByRole('button', { name: 'Custom' });
    expect(button).toHaveClass('custom-class');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    
    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();
  });
}); 