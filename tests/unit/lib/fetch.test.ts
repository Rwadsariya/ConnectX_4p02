import { refreshToken, sendDM, sendPrivateMessage, generateTokens } from '@/lib/fetch';
import axios from 'axios';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

// Mock environment variables
const originalEnv = process.env;
beforeEach(() => {
  jest.resetAllMocks();
  process.env = {
    ...originalEnv,
    INSTAGRAM_BASE_URL: 'https://graph.instagram.com',
    INSTAGRAM_TOKEN_URL: 'https://api.instagram.com/oauth/access_token',
    INSTAGRAM_CLIENT_ID: 'test-client-id',
    INSTAGRAM_CLIENT_SECRET: 'test-client-secret',
    NEXT_PUBLIC_HOST_URL: 'https://example.com',
  };
});

afterEach(() => {
  process.env = originalEnv;
});

describe('Fetch Utilities', () => {
  describe('refreshToken', () => {
    it('should call the correct endpoint and return the data', async () => {
      const mockData = { access_token: 'new-token', expires_in: 5184000 };
      (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

      const result = await refreshToken('old-token');

      expect(axios.get).toHaveBeenCalledWith(
        'https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=old-token'
      );
      expect(result).toEqual(mockData);
    });

    it('should handle errors', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));

      await expect(refreshToken('old-token')).rejects.toThrow('API error');
    });
  });

  describe('sendDM', () => {
    it('should send a direct message with the correct parameters', async () => {
      const userId = 'user123';
      const receiverId = 'receiver456';
      const prompt = 'Hello, this is a test message';
      const token = 'test-token';

      const mockResponse = { data: { id: 'message123' } };
      (axios.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await sendDM(userId, receiverId, prompt, token);

      expect(axios.post).toHaveBeenCalledWith(
        'https://graph.instagram.com/v21.0/user123/messages',
        {
          recipient: {
            id: receiverId,
          },
          message: {
            text: prompt,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('sendPrivateMessage', () => {
    it('should send a private message with the correct parameters', async () => {
      const userId = 'user123';
      const receiverId = 'comment456';
      const prompt = 'Hello, this is a test comment reply';
      const token = 'test-token';

      const mockResponse = { data: { id: 'message123' } };
      (axios.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await sendPrivateMessage(userId, receiverId, prompt, token);

      expect(axios.post).toHaveBeenCalledWith(
        'https://graph.instagram.com/user123/messages',
        {
          recipient: {
            comment_id: receiverId,
          },
          message: {
            text: prompt,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('generateTokens', () => {
    it('should exchange code for tokens when permissions are available', async () => {
      // Mock fetch behavior
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          access_token: 'short-token',
          permissions: ['user_profile', 'user_media'],
        }),
      });

      // Mock axios behavior for long token
      const mockLongTokenResponse = {
        data: {
          access_token: 'long-token',
          expires_in: 5184000,
        },
      };
      (axios.get as jest.Mock).mockResolvedValue(mockLongTokenResponse);

      const result = await generateTokens('auth-code');

      // Verify FormData was created correctly (can't directly test FormData contents)
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.instagram.com/oauth/access_token',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
        })
      );

      // Verify axios call for long token
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=test-client-secret&access_token=short-token')
      );

      expect(result).toEqual(mockLongTokenResponse.data);
    });

    it('should not exchange for long token if no permissions are available', async () => {
      // Mock fetch behavior with no permissions
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          access_token: 'short-token',
          permissions: [],
        }),
      });

      const result = await generateTokens('auth-code');

      expect(global.fetch).toHaveBeenCalled();
      expect(axios.get).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
}); 