import { AUTOMATION, TRIGGER } from '@/redux/slices/automation';

describe('Automation Redux Slice', () => {
  let initialState: ReturnType<typeof AUTOMATION.getInitialState>;

  beforeEach(() => {
    initialState = AUTOMATION.getInitialState();
  });

  it('should have the correct initial state', () => {
    expect(initialState).toEqual({
      trigger: {
        type: undefined,
        keyword: undefined,
        types: [],
        keywords: [],
      },
    });
  });

  it('should handle TRIGGER action correctly when adding a new type', () => {
    const action = TRIGGER({ trigger: { type: 'COMMENT' } });
    const state = AUTOMATION.reducer(initialState, action);
    
    expect(state.trigger?.types).toEqual(['COMMENT']);
  });

  it('should handle TRIGGER action correctly when removing an existing type', () => {
    // First add a type
    let state = AUTOMATION.reducer(initialState, TRIGGER({ trigger: { type: 'COMMENT' } }));
    
    // Then remove it by triggering the same type
    state = AUTOMATION.reducer(state, TRIGGER({ trigger: { type: 'COMMENT' } }));
    
    expect(state.trigger?.types).toEqual([]);
  });

  it('should handle TRIGGER action correctly with multiple types', () => {
    let state = AUTOMATION.reducer(initialState, TRIGGER({ trigger: { type: 'COMMENT' } }));
    state = AUTOMATION.reducer(state, TRIGGER({ trigger: { type: 'DM' } }));
    
    expect(state.trigger?.types).toEqual(['COMMENT', 'DM']);
  });
}); 