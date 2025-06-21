import { useAppDispatch, useAppSelector } from '../redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../store/productsSlice';

describe('Redux Hooks', () => {
  describe('useAppDispatch', () => {
    it('should be a function that returns typed dispatch', () => {
      // This is a simple test to ensure the hook is properly exported
      expect(typeof useAppDispatch).toBe('function');
    });
  });

  describe('useAppSelector', () => {
    it('should be a function that provides typed selector', () => {
      // This is a simple test to ensure the hook is properly exported
      expect(typeof useAppSelector).toBe('function');
    });
  });

  describe('Hook Types', () => {
    it('should properly type the store state and dispatch', () => {
      const store = configureStore({
        reducer: {
          products: productsReducer,
        },
      });

      // Test that the types are correctly inferred
      const state = store.getState();
      const dispatch = store.dispatch;

      expect(state.products).toBeDefined();
      expect(state.products.loading).toBe(false);
      expect(state.products.products).toEqual([]);
      expect(state.products.error).toBeNull();
      expect(state.products.selectedProduct).toBeNull();
      expect(typeof dispatch).toBe('function');
    });
  });
});