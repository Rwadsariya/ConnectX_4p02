import { onCurrentUser, onBoardUser, onUserInfo, onSubscribe } from '@/actions/user';
import { findUser, createUser, updateSubscription } from '@/actions/user/queries';
import { refreshToken } from '@/lib/fetch';
import { updateIntegration } from '@/actions/integrations/queries';
import { stripe } from '@/lib/stripe';

// Mock the necessary modules
jest.mock('@clerk/nextjs/server', () => ({
  currentUser: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('@/actions/user/queries', () => ({
  findUser: jest.fn(),
  createUser: jest.fn(),
  updateSubscription: jest.fn(),
}));

jest.mock('@/lib/fetch', () => ({
  refreshToken: jest.fn(),
}));

jest.mock('@/actions/integrations/queries', () => ({
  updateIntegration: jest.fn(),
}));

jest.mock('@/lib/stripe', () => ({
  stripe: {
    checkout: {
      sessions: {
        retrieve: jest.fn(),
      },
    },
  },
}));

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

describe('User Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('onCurrentUser', () => {
    it('should return the current user if authenticated', async () => {
      const mockUser = { id: 'user123', name: 'Test User' };
      (currentUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await onCurrentUser();
      expect(result).toEqual(mockUser);
      expect(currentUser).toHaveBeenCalled();
      expect(redirect).not.toHaveBeenCalled();
    });

    it('should redirect to sign-in if no user found', async () => {
      (currentUser as jest.Mock).mockResolvedValue(null);

      await onCurrentUser();
      expect(currentUser).toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledWith('/sign-in');
    });
  });

  describe('onBoardUser', () => {
    const mockUser = {
      id: 'user123',
      firstName: 'John',
      lastName: 'Doe',
      emailAddresses: [{ emailAddress: 'john@example.com' }],
    };

    it('should return existing user data if user is found', async () => {
      (currentUser as jest.Mock).mockResolvedValue(mockUser);
      (findUser as jest.Mock).mockResolvedValue({
        firstname: 'John',
        lastname: 'Doe',
        integrations: [],
      });

      const result = await onBoardUser();
      expect(result).toEqual({
        status: 200,
        data: {
          firstname: 'John',
          lastname: 'Doe',
        },
      });
      expect(findUser).toHaveBeenCalledWith(mockUser.id);
      expect(createUser).not.toHaveBeenCalled();
    });

    it('should create a new user if not found', async () => {
      (currentUser as jest.Mock).mockResolvedValue(mockUser);
      (findUser as jest.Mock).mockResolvedValue(null);
      (createUser as jest.Mock).mockResolvedValue({
        firstname: 'John',
        lastname: 'Doe',
      });

      const result = await onBoardUser();
      expect(result).toEqual({
        status: 201,
        data: {
          firstname: 'John',
          lastname: 'Doe',
        },
      });
      expect(findUser).toHaveBeenCalledWith(mockUser.id);
      expect(createUser).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.firstName,
        mockUser.lastName,
        mockUser.emailAddresses[0].emailAddress
      );
    });

    it('should handle errors', async () => {
      (currentUser as jest.Mock).mockResolvedValue(mockUser);
      (findUser as jest.Mock).mockRejectedValue(new Error('Database error'));

      const result = await onBoardUser();
      expect(result).toEqual({ status: 500 });
    });

    it('should refresh token if expiration is less than 5 days', async () => {
      const today = new Date();
      const fourDaysLater = new Date(today);
      fourDaysLater.setDate(today.getDate() + 4);

      (currentUser as jest.Mock).mockResolvedValue(mockUser);
      (findUser as jest.Mock).mockResolvedValue({
        firstname: 'John',
        lastname: 'Doe',
        integrations: [
          {
            id: 'integration123',
            token: 'old-token',
            expiresAt: fourDaysLater,
          },
        ],
      });

      (refreshToken as jest.Mock).mockResolvedValue({
        access_token: 'new-token',
      });

      (updateIntegration as jest.Mock).mockResolvedValue(true);

      await onBoardUser();
      
      expect(refreshToken).toHaveBeenCalledWith('old-token');
      expect(updateIntegration).toHaveBeenCalled();
      expect(updateIntegration.mock.calls[0][0]).toBe('new-token');
    });
  });

  describe('onUserInfo', () => {
    const mockUser = { id: 'user123' };

    it('should return user profile if found', async () => {
      const mockProfile = { id: 'user123', name: 'John Doe' };
      (currentUser as jest.Mock).mockResolvedValue(mockUser);
      (findUser as jest.Mock).mockResolvedValue(mockProfile);

      const result = await onUserInfo();
      expect(result).toEqual({ status: 200, data: mockProfile });
      expect(findUser).toHaveBeenCalledWith(mockUser.id);
    });

    it('should return 404 if profile not found', async () => {
      (currentUser as jest.Mock).mockResolvedValue(mockUser);
      (findUser as jest.Mock).mockResolvedValue(null);

      const result = await onUserInfo();
      expect(result).toEqual({ status: 404 });
      expect(findUser).toHaveBeenCalledWith(mockUser.id);
    });

    it('should handle errors', async () => {
      (currentUser as jest.Mock).mockResolvedValue(mockUser);
      (findUser as jest.Mock).mockRejectedValue(new Error('Database error'));

      const result = await onUserInfo();
      expect(result).toEqual({ status: 500 });
    });
  });

  describe('onSubscribe', () => {
    const mockUser = { id: 'user123' };
    const sessionId = 'session123';

    it('should update subscription if session is valid', async () => {
      (currentUser as jest.Mock).mockResolvedValue(mockUser);
      (stripe.checkout.sessions.retrieve as jest.Mock).mockResolvedValue({
        customer: 'customer123',
      });
      (updateSubscription as jest.Mock).mockResolvedValue(true);

      const result = await onSubscribe(sessionId);
      expect(result).toEqual({ status: 200 });
      expect(stripe.checkout.sessions.retrieve).toHaveBeenCalledWith(sessionId);
      expect(updateSubscription).toHaveBeenCalledWith(mockUser.id, {
        customerId: 'customer123',
        plan: 'PRO',
      });
    });

    it('should return 401 if subscription update fails', async () => {
      (currentUser as jest.Mock).mockResolvedValue(mockUser);
      (stripe.checkout.sessions.retrieve as jest.Mock).mockResolvedValue({
        customer: 'customer123',
      });
      (updateSubscription as jest.Mock).mockResolvedValue(false);

      const result = await onSubscribe(sessionId);
      expect(result).toEqual({ status: 401 });
    });

    it('should return 404 if session not found', async () => {
      (currentUser as jest.Mock).mockResolvedValue(mockUser);
      (stripe.checkout.sessions.retrieve as jest.Mock).mockResolvedValue(null);

      const result = await onSubscribe(sessionId);
      expect(result).toEqual({ status: 404 });
    });

    it('should handle errors', async () => {
      (currentUser as jest.Mock).mockResolvedValue(mockUser);
      (stripe.checkout.sessions.retrieve as jest.Mock).mockRejectedValue(
        new Error('Stripe error')
      );

      const result = await onSubscribe(sessionId);
      expect(result).toEqual({ status: 500 });
    });
  });
}); 