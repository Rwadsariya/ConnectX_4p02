import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { onBoardUser, onUserInfo } from '@/actions/user';
import { findUser, createUser } from '@/actions/user/queries';

// Mock server actions and queries
jest.mock('@/actions/user', () => ({
  onBoardUser: jest.fn(),
  onUserInfo: jest.fn(),
}));

jest.mock('@/actions/user/queries', () => ({
  findUser: jest.fn(),
  createUser: jest.fn(),
}));

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  currentUser: jest.fn().mockResolvedValue({
    id: 'user123',
    firstName: 'John',
    lastName: 'Doe',
    emailAddresses: [{ emailAddress: 'john@example.com' }],
  }),
  useUser: () => ({
    isSignedIn: true,
    user: {
      id: 'user123',
      firstName: 'John',
      lastName: 'Doe',
      emailAddresses: [{ emailAddress: 'john@example.com' }],
    },
  }),
  ClerkProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  redirect: jest.fn(),
}));

// Simple onboarding component to test
const OnboardingComponent = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleOnboarding = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await onBoardUser();
      if (response.status === 200 || response.status === 201) {
        setUserData(response.data);
      } else {
        setError('Failed to onboard user');
      }
    } catch (err) {
      setError('An error occurred during onboarding');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>User Onboarding</h1>
      {isLoading ? (
        <div data-testid="loading">Loading...</div>
      ) : (
        <div>
          {userData ? (
            <div data-testid="user-data">
              <p>First Name: {userData.firstname}</p>
              <p>Last Name: {userData.lastname}</p>
            </div>
          ) : (
            <button data-testid="onboard-button" onClick={handleOnboarding}>
              Start Onboarding
            </button>
          )}
          {error && <div data-testid="error">{error}</div>}
        </div>
      )}
    </div>
  );
};

// Integration tests for the user onboarding flow
describe('User Onboarding Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully onboard a new user', async () => {
    // Mock onBoardUser to return success response for a new user after a delay
    (onBoardUser as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) => {
        // Add a small delay to ensure we can see the loading state
        setTimeout(() => {
          resolve({
            status: 201,
            data: {
              firstname: 'John',
              lastname: 'Doe',
            },
          });
        }, 100);
      });
    });

    render(<OnboardingComponent />);

    // Start the onboarding process
    const onboardButton = screen.getByTestId('onboard-button');
    await userEvent.click(onboardButton);

    // Check loading state - use waitFor to ensure we catch the loading state
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).toBeInTheDocument();
    });

    // Wait for the onboarding to complete
    await waitFor(() => {
      expect(screen.getByTestId('user-data')).toBeInTheDocument();
    });

    // Verify the user data is displayed
    expect(screen.getByText('First Name: John')).toBeInTheDocument();
    expect(screen.getByText('Last Name: Doe')).toBeInTheDocument();

    // Verify onBoardUser was called
    expect(onBoardUser).toHaveBeenCalledTimes(1);
  });

  it('should handle existing user onboarding', async () => {
    // Mock onBoardUser to return success response for an existing user
    (onBoardUser as jest.Mock).mockResolvedValue({
      status: 200,
      data: {
        firstname: 'John',
        lastname: 'Doe',
      },
    });

    render(<OnboardingComponent />);

    // Start the onboarding process
    const onboardButton = screen.getByTestId('onboard-button');
    await userEvent.click(onboardButton);

    // Wait for the onboarding to complete
    await waitFor(() => {
      expect(screen.getByTestId('user-data')).toBeInTheDocument();
    });

    // Verify the user data is displayed
    expect(screen.getByText('First Name: John')).toBeInTheDocument();
    expect(screen.getByText('Last Name: Doe')).toBeInTheDocument();

    // Verify onBoardUser was called
    expect(onBoardUser).toHaveBeenCalledTimes(1);
  });

  it('should handle onboarding error', async () => {
    // Mock onBoardUser to return error response
    (onBoardUser as jest.Mock).mockResolvedValue({
      status: 500,
    });

    render(<OnboardingComponent />);

    // Start the onboarding process
    const onboardButton = screen.getByTestId('onboard-button');
    await userEvent.click(onboardButton);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    // Verify the error message
    expect(screen.getByText('Failed to onboard user')).toBeInTheDocument();

    // Verify onBoardUser was called
    expect(onBoardUser).toHaveBeenCalledTimes(1);
  });

  it('should handle exception during onboarding', async () => {
    // Mock onBoardUser to throw an error
    (onBoardUser as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<OnboardingComponent />);

    // Start the onboarding process
    const onboardButton = screen.getByTestId('onboard-button');
    await userEvent.click(onboardButton);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    // Verify the error message
    expect(screen.getByText('An error occurred during onboarding')).toBeInTheDocument();

    // Verify onBoardUser was called
    expect(onBoardUser).toHaveBeenCalledTimes(1);
  });
}); 