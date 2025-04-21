import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '@/components/global/loader';
import { Spinner } from '@/components/global/loader/spinner';

describe('Loader Component', () => {
  it('should render children when state is false', () => {
    render(
      <Loader state={false}>
        <div data-testid="child-content">Child Content</div>
      </Loader>
    );
    
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should render spinner when state is true', () => {
    render(
      <Loader state={true}>
        <div>Child Content</div>
      </Loader>
    );
    
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('Child Content')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <Loader state={true} className="custom-class">
        <div>Child Content</div>
      </Loader>
    );
    
    const loaderDiv = screen.getByRole('status').parentElement;
    expect(loaderDiv).toHaveClass('custom-class');
  });
});

describe('Spinner Component', () => {
  it('should render correctly with default color', () => {
    render(<Spinner />);
    
    const svgElement = screen.getByRole('status').querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    
    // Check that the path elements exist
    const pathElements = svgElement?.querySelectorAll('path');
    expect(pathElements?.length).toBe(2);
  });

  it('should render with custom color', () => {
    render(<Spinner color="#ff0000" />);
    
    const pathElements = screen.getByRole('status').querySelectorAll('path');
    
    // Check that the path elements have the custom color
    expect(pathElements[0]).toHaveAttribute('fill', '#ff0000');
    expect(pathElements[1]).toHaveAttribute('fill', '#ff0000');
  });
}); 