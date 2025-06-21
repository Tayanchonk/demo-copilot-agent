import { configureStore } from '@reduxjs/toolkit';
import productsReducer, {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  clearError,
  clearSelectedProduct,
} from '../productsSlice';
import type { ProductsState, CreateProductData, UpdateProductData } from '../../types';

// Mock the productService
jest.mock('../../services/productService', () => ({
  productService: {
    getAllProducts: jest.fn(),
    getProductById: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
  },
}));

import { productService } from '../../services/productService';

const mockProductService = productService as jest.Mocked<typeof productService>;

// Type for our test store
type TestStore = ReturnType<typeof configureStore<{
  products: ProductsState;
}>>;

describe('Products Slice', () => {
  let store: TestStore;

  const mockProduct = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    category: 'Test',
    inStock: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  const mockProducts = [mockProduct];

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = store.getState().products;
      expect(state).toEqual({
        products: [],
        loading: false,
        error: null,
        selectedProduct: null,
      });
    });
  });

  describe('Reducers', () => {
    it('should clear error', () => {
      // First set an error state
      store.dispatch({ type: 'products/fetchProducts/rejected', payload: 'Test error' });
      expect(store.getState().products.error).toBe('Test error');

      // Then clear it
      store.dispatch(clearError());
      expect(store.getState().products.error).toBeNull();
    });

    it('should clear selected product', () => {
      // First set a selected product
      store.dispatch({ type: 'products/fetchProductById/fulfilled', payload: mockProduct });
      expect(store.getState().products.selectedProduct).toEqual(mockProduct);

      // Then clear it
      store.dispatch(clearSelectedProduct());
      expect(store.getState().products.selectedProduct).toBeNull();
    });
  });

  describe('fetchProducts async thunk', () => {
    it('should handle successful fetch', async () => {
      mockProductService.getAllProducts.mockResolvedValueOnce({
        data: mockProducts,
        message: 'Success',
        success: true,
      });

      await store.dispatch(fetchProducts());

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.products).toEqual(mockProducts);
    });

    it('should handle fetch error', async () => {
      const errorMessage = 'Network error';
      mockProductService.getAllProducts.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(fetchProducts());

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.products).toEqual([]);
    });

    it('should handle non-Error rejection', async () => {
      mockProductService.getAllProducts.mockRejectedValueOnce('String error');

      await store.dispatch(fetchProducts());

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to fetch products');
      expect(state.products).toEqual([]);
    });

    it('should set loading state during pending', () => {
      mockProductService.getAllProducts.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      store.dispatch(fetchProducts());

      const state = store.getState().products;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('fetchProductById async thunk', () => {
    it('should handle successful fetch by ID', async () => {
      mockProductService.getProductById.mockResolvedValueOnce({
        data: mockProduct,
        message: 'Success',
        success: true,
      });

      await store.dispatch(fetchProductById('1'));

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.selectedProduct).toEqual(mockProduct);
    });

    it('should handle fetch by ID error', async () => {
      const errorMessage = 'Product not found';
      mockProductService.getProductById.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(fetchProductById('999'));

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.selectedProduct).toBeNull();
    });

    it('should handle non-Error rejection for fetch by ID', async () => {
      mockProductService.getProductById.mockRejectedValueOnce('String error');

      await store.dispatch(fetchProductById('1'));

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to fetch product');
    });
  });

  describe('createProduct async thunk', () => {
    const newProductData: CreateProductData = {
      name: 'New Product',
      description: 'New Description',
      price: 199.99,
      category: 'New',
      inStock: true,
    };

    const createdProduct = {
      id: '2',
      ...newProductData,
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
    };

    it('should handle successful product creation', async () => {
      mockProductService.createProduct.mockResolvedValueOnce({
        data: createdProduct,
        message: 'Created',
        success: true,
      });

      await store.dispatch(createProduct(newProductData));

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.products).toContain(createdProduct);
    });

    it('should handle product creation error', async () => {
      const errorMessage = 'Validation failed';
      mockProductService.createProduct.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(createProduct(newProductData));

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    it('should handle non-Error rejection for create', async () => {
      mockProductService.createProduct.mockRejectedValueOnce('String error');

      await store.dispatch(createProduct(newProductData));

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to create product');
    });
  });

  describe('updateProduct async thunk', () => {
    const updateData: UpdateProductData = {
      id: '1',
      name: 'Updated Product',
      price: 149.99,
    };

    const updatedProduct = {
      ...mockProduct,
      ...updateData,
      updatedAt: '2024-01-02T00:00:00Z',
    };

    beforeEach(() => {
      // Set initial state with products
      store.dispatch({ type: 'products/fetchProducts/fulfilled', payload: [mockProduct] });
    });

    it('should handle successful product update', async () => {
      mockProductService.updateProduct.mockResolvedValueOnce({
        data: updatedProduct,
        message: 'Updated',
        success: true,
      });

      await store.dispatch(updateProduct(updateData));

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.products[0]).toEqual(updatedProduct);
    });

    it('should update selectedProduct if it matches updated product', async () => {
      // Set selected product first
      store.dispatch({ type: 'products/fetchProductById/fulfilled', payload: mockProduct });

      mockProductService.updateProduct.mockResolvedValueOnce({
        data: updatedProduct,
        message: 'Updated',
        success: true,
      });

      await store.dispatch(updateProduct(updateData));

      const state = store.getState().products;
      expect(state.selectedProduct).toEqual(updatedProduct);
    });

    it('should handle product update error', async () => {
      const errorMessage = 'Update failed';
      mockProductService.updateProduct.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(updateProduct(updateData));

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    it('should handle non-Error rejection for update', async () => {
      mockProductService.updateProduct.mockRejectedValueOnce('String error');

      await store.dispatch(updateProduct(updateData));

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to update product');
    });

    it('should not update product if not found in products array', async () => {
      const nonExistentUpdate: UpdateProductData = {
        id: '999',
        name: 'Non-existent',
      };

      const nonExistentProduct = {
        id: '999',
        name: 'Non-existent',
        description: 'Test',
        price: 99,
        category: 'Test',
        inStock: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      };

      mockProductService.updateProduct.mockResolvedValueOnce({
        data: nonExistentProduct,
        message: 'Updated',
        success: true,
      });

      await store.dispatch(updateProduct(nonExistentUpdate));

      const state = store.getState().products;
      expect(state.products).toHaveLength(1);
      expect(state.products[0]).toEqual(mockProduct); // Original product unchanged
    });
  });

  describe('deleteProduct async thunk', () => {
    beforeEach(() => {
      // Set initial state with products
      store.dispatch({ type: 'products/fetchProducts/fulfilled', payload: [mockProduct] });
    });

    it('should handle successful product deletion', async () => {
      mockProductService.deleteProduct.mockResolvedValueOnce({
        data: undefined,
        message: 'Deleted',
        success: true,
      });

      await store.dispatch(deleteProduct('1'));

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.products).toHaveLength(0);
    });

    it('should clear selectedProduct if it matches deleted product', async () => {
      // Set selected product first
      store.dispatch({ type: 'products/fetchProductById/fulfilled', payload: mockProduct });

      mockProductService.deleteProduct.mockResolvedValueOnce({
        data: undefined,
        message: 'Deleted',
        success: true,
      });

      await store.dispatch(deleteProduct('1'));

      const state = store.getState().products;
      expect(state.selectedProduct).toBeNull();
    });

    it('should not clear selectedProduct if it does not match deleted product', async () => {
      const otherProduct = { ...mockProduct, id: '2' };
      
      // Set selected product and products array
      store.dispatch({ type: 'products/fetchProductById/fulfilled', payload: otherProduct });
      store.dispatch({ 
        type: 'products/fetchProducts/fulfilled', 
        payload: [mockProduct, otherProduct] 
      });

      mockProductService.deleteProduct.mockResolvedValueOnce({
        data: undefined,
        message: 'Deleted',
        success: true,
      });

      await store.dispatch(deleteProduct('1'));

      const state = store.getState().products;
      expect(state.selectedProduct).toEqual(otherProduct);
      expect(state.products).toHaveLength(1);
      expect(state.products[0]).toEqual(otherProduct);
    });

    it('should handle product deletion error', async () => {
      const errorMessage = 'Delete failed';
      mockProductService.deleteProduct.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(deleteProduct('1'));

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.products).toHaveLength(1); // Product should still be there
    });

    it('should handle non-Error rejection for delete', async () => {
      mockProductService.deleteProduct.mockRejectedValueOnce('String error');

      await store.dispatch(deleteProduct('1'));

      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to delete product');
    });
  });
});