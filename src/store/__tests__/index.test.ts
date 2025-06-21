import { store } from '../index';
import type { RootState, AppDispatch } from '../index';

describe('Store Configuration', () => {
  describe('Store Instance', () => {
    it('should create store with correct initial state', () => {
      const state = store.getState();
      
      expect(state.products).toBeDefined();
      expect(state.products.loading).toBe(false);
      expect(state.products.error).toBeNull();
      expect(state.products.products).toEqual([]);
      expect(state.products.selectedProduct).toBeNull();
    });

    it('should have dispatch function', () => {
      expect(typeof store.dispatch).toBe('function');
    });

    it('should have getState function', () => {
      expect(typeof store.getState).toBe('function');
    });

    it('should have subscribe function', () => {
      expect(typeof store.subscribe).toBe('function');
    });
  });

  describe('Type Exports', () => {
    it('should export RootState type correctly', () => {
      const state: RootState = store.getState();
      
      expect(state.products).toBeDefined();
      expect(typeof state.products.loading).toBe('boolean');
      expect(Array.isArray(state.products.products)).toBe(true);
    });

    it('should export AppDispatch type correctly', () => {
      const dispatch: AppDispatch = store.dispatch;
      
      expect(typeof dispatch).toBe('function');
    });
  });

  describe('Store Functionality', () => {
    it('should allow dispatching actions', () => {
      // Dispatch a simple action to test functionality
      store.dispatch({ type: 'products/clearError' });
      
      const newState = store.getState();
      expect(newState.products.error).toBeNull();
    });

    it('should maintain state consistency', () => {
      const state1 = store.getState();
      const state2 = store.getState();
      
      expect(state1).toBe(state2); // Same reference
    });
  });
});