import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import middleware, { config } from '@/middleware';

// Mock dependencies
jest.mock('@clerk/nextjs/server', () => ({
  clerkMiddleware: jest.fn((fn) => fn),
  createRouteMatcher: jest.fn((routes) => {
    return (request: any) => {
      // Simple implementation for testing
      const path = request.url || '';
      return routes.some((route: string) => {
        const regex = new RegExp(route.replace('(.*)', '.*'));
        return regex.test(path);
      });
    };
  }),
}));

describe('Middleware', () => {
  let mockAuth: any;
  let mockReq: any;

  beforeEach(() => {
    mockAuth = {
      protect: jest.fn().mockResolvedValue(undefined),
    };
    mockReq = {
      url: '',
    };
    jest.clearAllMocks();
  });

  it('should protect routes that match protected patterns', async () => {
    // Test dashboard route
    mockReq.url = '/dashboard';
    await middleware(mockAuth, mockReq);
    expect(mockAuth.protect).toHaveBeenCalled();

    // Reset and test payment route
    jest.clearAllMocks();
    mockReq.url = '/api/payment';
    await middleware(mockAuth, mockReq);
    expect(mockAuth.protect).toHaveBeenCalled();

    // Reset and test callback route
    jest.clearAllMocks();
    mockReq.url = '/callback/instagram';
    await middleware(mockAuth, mockReq);
    expect(mockAuth.protect).toHaveBeenCalled();
  });

  it('should not protect routes that do not match protected patterns', async () => {
    // Test non-protected route
    mockReq.url = '/login';
    await middleware(mockAuth, mockReq);
    expect(mockAuth.protect).not.toHaveBeenCalled();

    // Test another non-protected route
    jest.clearAllMocks();
    mockReq.url = '/';
    await middleware(mockAuth, mockReq);
    expect(mockAuth.protect).not.toHaveBeenCalled();
  });

  it('should have the correct config for Next.js middleware', () => {
    expect(config).toHaveProperty('matcher');
    expect(config.matcher).toBeInstanceOf(Array);
    expect(config.matcher.length).toBe(2);
    
    // Check that it handles static files correctly
    expect(config.matcher[0]).toMatch(/\(\?\!/);
    
    // Check that it always runs for API routes
    expect(config.matcher[1]).toBe('/(api|trpc)(.*)');
  });
}); 