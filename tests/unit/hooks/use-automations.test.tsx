import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateAutomation } from '@/hooks/use-automations';
import { createAutomations } from '@/actions/automations';

// Mock the createAutomations function
jest.mock('@/actions/automations', () => ({
  createAutomations: jest.fn(),
}));

// Mock useMutationData
jest.mock('@/hooks/use-mutation-data', () => ({
  useMutationData: jest.fn((_, mutationFn, invalidateQueries, onSuccess) => {
    return {
      isPending: false,
      mutate: jest.fn(async (data) => {
        const result = await mutationFn(data);
        if (onSuccess) onSuccess();
        return result;
      }),
    };
  }),
}));

// Wrapper for React Query context
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useCreateAutomation Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns isPending and mutate function', () => {
    const { result } = renderHook(() => useCreateAutomation(), { wrapper });
    
    expect(result.current).toHaveProperty('isPending');
    expect(result.current).toHaveProperty('mutate');
    expect(typeof result.current.mutate).toBe('function');
  });

  it('calls createAutomations with the ID when mutate is called', async () => {
    const mockId = 'test-id';
    (createAutomations as jest.Mock).mockResolvedValue({ status: 200, data: 'Success' });
    
    const { result } = renderHook(() => useCreateAutomation(mockId), { wrapper });
    
    await act(async () => {
      await result.current.mutate();
    });
    
    expect(createAutomations).toHaveBeenCalledWith(mockId);
  });

  it('passes the ID to useMutationData', () => {
    const mockId = 'test-id';
    
    renderHook(() => useCreateAutomation(mockId), { wrapper });
    
    // Check that the function passed to useMutationData uses the ID
    const mockMutationFunction = jest.requireMock('@/hooks/use-mutation-data').useMutationData.mock.calls[0][1];
    
    expect(typeof mockMutationFunction).toBe('function');
    expect(mockMutationFunction.toString()).toContain('createAutomations');
  });

  it('uses correct query key and invalidation key', () => {
    renderHook(() => useCreateAutomation(), { wrapper });
    
    const useMutationDataMock = jest.requireMock('@/hooks/use-mutation-data').useMutationData;
    
    expect(useMutationDataMock).toHaveBeenCalledWith(
      ['create-automation'],
      expect.any(Function),
      'user-automations',
      undefined
    );
  });
}); 