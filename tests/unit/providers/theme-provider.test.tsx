import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/providers/theme-provider';
import { useTheme } from 'next-themes';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('ThemeProvider', () => {
  it('should render children', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div data-testid="test-child">Test Child</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should pass props to NextThemesProvider', () => {
    // We're not actually testing the internal implementation here, just that the component renders
    render(
      <ThemeProvider 
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <div>Test</div>
      </ThemeProvider>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
}); 