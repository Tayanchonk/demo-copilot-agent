import type {
  Product,
  CreateProductData,
  UpdateProductData,
  ProductsState,
  ApiResponse,
} from '../index';

describe('Type Definitions', () => {
  describe('Product interface', () => {
    it('should validate Product type structure', () => {
      const product: Product = {
        id: '1',
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Test',
        inStock: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      expect(product.id).toBe('1');
      expect(product.name).toBe('Test Product');
      expect(product.price).toBe(99.99);
      expect(product.inStock).toBe(true);
      expect(typeof product.createdAt).toBe('string');
      expect(typeof product.updatedAt).toBe('string');
    });
  });

  describe('CreateProductData interface', () => {
    it('should validate CreateProductData type structure', () => {
      const createData: CreateProductData = {
        name: 'New Product',
        description: 'New Description',
        price: 199.99,
        category: 'New',
        inStock: false,
      };

      expect(createData.name).toBe('New Product');
      expect(createData.price).toBe(199.99);
      expect(createData.inStock).toBe(false);
      // Should not have id, createdAt, updatedAt
      expect('id' in createData).toBe(false);
      expect('createdAt' in createData).toBe(false);
      expect('updatedAt' in createData).toBe(false);
    });
  });

  describe('UpdateProductData interface', () => {
    it('should validate UpdateProductData type structure', () => {
      const updateData: UpdateProductData = {
        id: '1',
        name: 'Updated Product',
        price: 149.99,
      };

      expect(updateData.id).toBe('1');
      expect(updateData.name).toBe('Updated Product');
      expect(updateData.price).toBe(149.99);
    });

    it('should allow partial updates', () => {
      const partialUpdate: UpdateProductData = {
        id: '1',
        price: 99.99,
      };

      expect(partialUpdate.id).toBe('1');
      expect(partialUpdate.price).toBe(99.99);
      expect(partialUpdate.name).toBeUndefined();
    });

    it('should require id field', () => {
      const updateData: UpdateProductData = {
        id: '1',
      };

      expect(updateData.id).toBe('1');
    });
  });

  describe('ProductsState interface', () => {
    it('should validate ProductsState type structure', () => {
      const state: ProductsState = {
        products: [],
        loading: false,
        error: null,
        selectedProduct: null,
      };

      expect(Array.isArray(state.products)).toBe(true);
      expect(typeof state.loading).toBe('boolean');
      expect(state.error).toBeNull();
      expect(state.selectedProduct).toBeNull();
    });

    it('should handle state with data', () => {
      const product: Product = {
        id: '1',
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Test',
        inStock: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      const state: ProductsState = {
        products: [product],
        loading: true,
        error: 'Test error',
        selectedProduct: product,
      };

      expect(state.products).toHaveLength(1);
      expect(state.loading).toBe(true);
      expect(state.error).toBe('Test error');
      expect(state.selectedProduct).toEqual(product);
    });
  });

  describe('ApiResponse interface', () => {
    it('should validate ApiResponse type structure with Product data', () => {
      const product: Product = {
        id: '1',
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Test',
        inStock: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      const response: ApiResponse<Product> = {
        data: product,
        message: 'Success',
        success: true,
      };

      expect(response.data).toEqual(product);
      expect(response.message).toBe('Success');
      expect(response.success).toBe(true);
    });

    it('should validate ApiResponse type structure with Product array', () => {
      const products: Product[] = [];

      const response: ApiResponse<Product[]> = {
        data: products,
        message: 'Products fetched',
        success: true,
      };

      expect(Array.isArray(response.data)).toBe(true);
      expect(response.message).toBe('Products fetched');
      expect(response.success).toBe(true);
    });

    it('should validate ApiResponse type structure with void data', () => {
      const response: ApiResponse<void> = {
        data: undefined,
        message: 'Deleted successfully',
        success: true,
      };

      expect(response.data).toBeUndefined();
      expect(response.message).toBe('Deleted successfully');
      expect(response.success).toBe(true);
    });
  });
});