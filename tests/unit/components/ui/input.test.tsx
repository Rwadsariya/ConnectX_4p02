import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/ui/input';

describe('Input', () => {
  it('should render correctly with default props', () => {
    render(<Input />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('flex h-9 w-full rounded-md border');
    expect(input).toHaveAttribute('type', 'text');
  });
  
  it('should apply custom className', () => {
    render(<Input className="custom-class" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });
  
  it('should render with different input types', () => {
    const { rerender } = render(<Input type="email" />);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toHaveAttribute('type', 'email');
    
    rerender(<Input type="password" />);
    const passwordInput = screen.getByTestId('input');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    rerender(<Input type="number" />);
    const numberInput = screen.getByTestId('input');
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveAttribute('type', 'number');
  });
  
  it('should handle value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('test value');
  });
  
  it('should handle placeholder text', () => {
    render(<Input placeholder="Enter your name" />);
    
    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
  });
  
  it('should forward refs to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
  
  it('should apply disabled state correctly', () => {
    render(<Input disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed');
    expect(input).toHaveClass('disabled:opacity-50');
  });
  
  it('should apply required attribute correctly', () => {
    render(<Input required />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });
  
  it('should apply readonly attribute correctly', () => {
    render(<Input readOnly />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });
  
  it('should apply autocomplete attribute correctly', () => {
    render(<Input autoComplete="username" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autocomplete', 'username');
  });
}); 