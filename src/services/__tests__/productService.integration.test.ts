import { productService } from '../productService';
import type { CreateProductData, UpdateProductData } from '../../types';

// Mock Math.random to control error simulation
const originalMathRandom = Math.random;

describe('ProductService Integration Tests', () => {
  beforeEach(() => {
    // Reset Math.random to avoid random errors
    Math.random = jest.fn(() => 0.5);
  });

  afterEach(() => {
    Math.random = originalMathRandom;
    jest.clearAllMocks();
  });

  describe('Real ProductService Instance', () => {
    it('should have initial mock products', async () => {
      const result = await productService.getAllProducts();
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(5); // Based on mockProducts
      expect(result.data[0].name).toBe('Laptop Pro');
    });

    it('should create a new product', async () => {
      const newProduct: CreateProductData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Test',
        inStock: true,
      };

      const result = await productService.createProduct(newProduct);
      
      expect(result.success).toBe(true);
      expect(result.data.name).toBe('Test Product');
      expect(result.data.id).toBeDefined();
    });

    it('should get product by ID', async () => {
      const result = await productService.getProductById('1');
      
      expect(result.success).toBe(true);
      expect(result.data.id).toBe('1');
      expect(result.data.name).toBe('Laptop Pro');
    });

    it('should update a product', async () => {
      const updateData: UpdateProductData = {
        id: '1',
        name: 'Updated Laptop',
        price: 1399.99,
      };

      const result = await productService.updateProduct(updateData);
      
      expect(result.success).toBe(true);
      expect(result.data.name).toBe('Updated Laptop');
      expect(result.data.price).toBe(1399.99);
    });

    it('should delete a product', async () => {
      const result = await productService.deleteProduct('2');
      
      expect(result.success).toBe(true);
      expect(result.data).toBeUndefined();
    });

    it('should handle network error in getAllProducts', async () => {
      // Mock Math.random to trigger network error (< 0.1)
      Math.random = jest.fn(() => 0.05);

      await expect(productService.getAllProducts()).rejects.toThrow(
        'Network error: Failed to fetch products'
      );
    });

    it('should handle server error in createProduct', async () => {
      // Mock Math.random to trigger server error (< 0.05)
      Math.random = jest.fn(() => 0.01);

      const newProduct: CreateProductData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Test',
        inStock: true,
      };

      await expect(productService.createProduct(newProduct)).rejects.toThrow(
        'Server error: Failed to create product'
      );
    });

    it('should handle validation error in createProduct', async () => {
      const invalidProduct: CreateProductData = {
        name: '', // Empty name should trigger validation error
        description: 'Test Description',
        price: 99.99,
        category: 'Test',
        inStock: true,
      };

      await expect(productService.createProduct(invalidProduct)).rejects.toThrow(
        'Product name is required'
      );
    });

    it('should handle not found error in getProductById', async () => {
      await expect(productService.getProductById('999')).rejects.toThrow(
        'Product with id 999 not found'
      );
    });

    it('should handle not found error in updateProduct', async () => {
      const updateData: UpdateProductData = {
        id: '999',
        name: 'Non-existent Product',
      };

      await expect(productService.updateProduct(updateData)).rejects.toThrow(
        'Product with id 999 not found'
      );
    });

    it('should handle server error in updateProduct', async () => {
      // Mock Math.random to trigger server error (< 0.05)
      Math.random = jest.fn(() => 0.01);

      const updateData: UpdateProductData = {
        id: '1',
        name: 'Updated Product',
      };

      await expect(productService.updateProduct(updateData)).rejects.toThrow(
        'Server error: Failed to update product'
      );
    });

    it('should handle not found error in deleteProduct', async () => {
      await expect(productService.deleteProduct('999')).rejects.toThrow(
        'Product with id 999 not found'
      );
    });

    it('should handle server error in deleteProduct', async () => {
      // Mock Math.random to trigger server error (< 0.05)
      Math.random = jest.fn(() => 0.01);

      await expect(productService.deleteProduct('1')).rejects.toThrow(
        'Server error: Failed to delete product'
      );
    });
  });
});