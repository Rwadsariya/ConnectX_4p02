# Testing Documentation

This directory contains tests for the Slide application. The tests are organized into the following categories:

- `unit`: Unit tests for individual components, functions, and utilities
- `integration`: Integration tests for testing interactions between multiple components
- `e2e`: End-to-end tests for testing full user workflows

## Setup

Before running the tests, you need to set up the test environment:

```bash
node tests/setup-test-env.js
```

This script will install any missing dependencies and create the necessary configuration files.

## Running Tests

To run the tests, use the following commands:

```bash
# Run all tests
pnpm test

# Run tests in watch mode (useful during development)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

## Test Structure

The tests follow a specific structure:

```
tests/
├── unit/                  # Unit tests
│   ├── components/        # Component tests
│   ├── lib/               # Utility function tests
│   ├── redux/             # Redux state management tests
│   └── actions/           # Server action tests
├── integration/           # Integration tests
└── e2e/                   # End-to-end tests
```

## Writing Tests

When writing tests, follow these guidelines:

1. **Unit Tests**: Test individual functions and components in isolation. Mock external dependencies.
2. **Integration Tests**: Test interactions between multiple components or functions. Minimize mocking.
3. **E2E Tests**: Test full user workflows from end to end.

### Testing Utilities

The project uses the following testing utilities:

- **Jest**: Testing framework
- **React Testing Library**: For testing React components
- **Mock Service Worker**: For mocking API requests

### Naming Conventions

- Test files should be named `*.test.ts` or `*.test.tsx`
- Test descriptions should clearly describe what is being tested
- Test cases should follow the Arrange-Act-Assert pattern

### Example

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    // Arrange
    render(<MyComponent />);

    // Act
    const element = screen.getByText('Expected Text');

    // Assert
    expect(element).toBeInTheDocument();
  });
});
```

## Troubleshooting

If you encounter issues running the tests, check the following:

1. Make sure all dependencies are installed: `pnpm install`
2. Make sure the test environment is set up: `node tests/setup-test-env.js`
3. Check for TypeScript errors: `pnpm tsc --noEmit` 