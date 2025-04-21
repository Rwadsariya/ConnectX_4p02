import React, { useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

// Mock the entire auth flow
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
  useAuth: jest.fn(),
  SignIn: ({ redirectUrl }: { redirectUrl: string }) => (
    <div data-testid="sign-in-component">
      <input data-testid="email-input" type="email" placeholder="Email" />
      <input data-testid="password-input" type="password" placeholder="Password" />
      <button data-testid="sign-in-button">Sign In</button>
      <div>Redirect URL: {redirectUrl}</div>
    </div>
  ),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Import the pages we want to test
// Note: In a real test, you would import the actual components
// This is a simplified example
const SignInPage = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (isSignedIn) {
      router.replace('/dashboard');
    }
  }, [isSignedIn, router]);

  return (
    <div>
      <h1>Sign In</h1>
      <div data-testid="clerk-sign-in">
        {/* This would be the Clerk SignIn component */}
        <input data-testid="email-input" type="email" placeholder="Email" />
        <input data-testid="password-input" type="password" placeholder="Password" />
        <button data-testid="sign-in-button">Sign In</button>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (!isSignedIn) {
      router.replace('/sign-in');
    }
  }, [isSignedIn, router]);

  return (
    <div>
      <h1>Dashboard</h1>
      <div data-testid="dashboard-content">Dashboard Content</div>
    </div>
  );
};

// Import auth related functions from our app
import { useUser, useAuth } from '@clerk/nextjs';

describe('Authentication Flow', () => {
  const mockRouter = { push: jest.fn(), replace: jest.fn() };
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });
  
  it('should redirect to dashboard when user is authenticated', async () => {
    // Mock the user as authenticated
    (useUser as jest.Mock).mockReturnValue({
      isSignedIn: true,
      user: {
        id: 'user123',
        firstName: 'Test',
        lastName: 'User',
        emailAddresses: [{ emailAddress: 'test@example.com' }],
      },
    });
    
    (useAuth as jest.Mock).mockReturnValue({
      isSignedIn: true,
      userId: 'user123',
    });
    
    // Render the sign-in page
    render(<SignInPage />);
    
    // The user is already authenticated, so we should be redirected to the dashboard
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/dashboard');
    });
  });
  
  it('should show sign-in form when user is not authenticated', async () => {
    // Mock the user as not authenticated
    (useUser as jest.Mock).mockReturnValue({
      isSignedIn: false,
      user: null,
    });
    
    (useAuth as jest.Mock).mockReturnValue({
      isSignedIn: false,
      userId: null,
    });
    
    // Render the sign-in page
    render(<SignInPage />);
    
    // The sign-in form should be shown
    expect(screen.getByTestId('clerk-sign-in')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
  });
  
  it('should redirect to sign-in when accessing protected page while not authenticated', async () => {
    // Mock the user as not authenticated
    (useUser as jest.Mock).mockReturnValue({
      isSignedIn: false,
      user: null,
    });
    
    (useAuth as jest.Mock).mockReturnValue({
      isSignedIn: false,
      userId: null,
    });
    
    // Render the dashboard page (which is protected)
    render(<DashboardPage />);
    
    // We should be redirected to the sign-in page
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/sign-in');
    });
  });
  
  it('should allow access to dashboard when authenticated', async () => {
    // Mock the user as authenticated
    (useUser as jest.Mock).mockReturnValue({
      isSignedIn: true,
      user: {
        id: 'user123',
        firstName: 'Test',
        lastName: 'User',
        emailAddresses: [{ emailAddress: 'test@example.com' }],
      },
    });
    
    (useAuth as jest.Mock).mockReturnValue({
      isSignedIn: true,
      userId: 'user123',
    });
    
    // Render the dashboard page
    render(<DashboardPage />);
    
    // We should see the dashboard content
    expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
  });
}); 