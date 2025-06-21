/**
 * @fileoverview Product Service - Mock API service for product CRUD operations
 * 
 * This service simulates a real REST API with realistic delays, error scenarios,
 * and data persistence during the session. It provides all CRUD operations
 * for product management with proper error handling and response formatting.
 * 
 * @author Demo Copilot Agent Team
 * @version 1.0.0
 */

import type { Product, CreateProductData, UpdateProductData, ApiResponse } from '../types';

/**
 * Mock product data for development and testing
 * Contains sample products with realistic data structure
 */
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    category: 'Electronics',
    inStock: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones',
    price: 299.99,
    category: 'Electronics',
    inStock: true,
    createdAt: '2024-01-16T09:30:00Z',
    updatedAt: '2024-01-16T09:30:00Z',
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Automatic drip coffee maker with timer',
    price: 89.99,
    category: 'Home & Kitchen',
    inStock: false,
    createdAt: '2024-01-17T14:15:00Z',
    updatedAt: '2024-01-17T14:15:00Z',
  },
  {
    id: '4',
    name: 'Running Shoes',
    description: 'Comfortable running shoes with excellent cushioning',
    price: 129.99,
    category: 'Sports',
    inStock: true,
    createdAt: '2024-01-18T11:45:00Z',
    updatedAt: '2024-01-18T11:45:00Z',
  },
  {
    id: '5',
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness',
    price: 45.99,
    category: 'Home & Office',
    inStock: true,
    createdAt: '2024-01-19T16:20:00Z',
    updatedAt: '2024-01-19T16:20:00Z',
  },
];

/**
 * Simulates network delay for realistic API behavior
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the specified delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates a random unique identifier for new products
 * @returns A random string ID
 */
const generateId = () => Math.random().toString(36).substr(2, 9);

/**
 * Mock Product Service Class
 * 
 * Simulates a REST API service with all CRUD operations for products.
 * Includes realistic features like:
 * - Network delays (500-1000ms)
 * - Random error scenarios (5-10% failure rate)
 * - Data validation
 * - Proper response formatting
 * - Session-persistent data storage
 */
class MockProductService {
  /** Private in-memory storage for products during session */
  private products: Product[] = [...mockProducts];

  /**
   * Retrieves all products from the mock database
   * 
   * @returns Promise<ApiResponse<Product[]>> - Array of all products with metadata
   * @throws Error when simulated network failure occurs (10% chance)
   * 
   * @example
   * ```typescript
   * const response = await productService.getAllProducts();
   * console.log(response.data); // Array of products
   * ```
   */

  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    await delay(800); // Simulate network delay
    
    // Simulate occasional network error
    if (Math.random() < 0.1) {
      throw new Error('Network error: Failed to fetch products');
    }

    return {
      data: [...this.products],
      message: 'Products fetched successfully',
      success: true,
    };
  }

  /**
   * Retrieves a single product by its unique identifier
   * 
   * @param id - The unique product identifier
   * @returns Promise<ApiResponse<Product>> - Single product with metadata
   * @throws Error when product with given ID is not found
   * 
   * @example
   * ```typescript
   * const response = await productService.getProductById('1');
   * console.log(response.data.name); // Product name
   * ```
   */
  async getProductById(id: string): Promise<ApiResponse<Product>> {
    await delay(500);
    
    const product = this.products.find(p => p.id === id);
    
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return {
      data: product,
      message: 'Product fetched successfully',
      success: true,
    };
  }

  /**
   * Creates a new product in the mock database
   * 
   * @param productData - Product creation data (without id, timestamps)
   * @returns Promise<ApiResponse<Product>> - Created product with generated ID and timestamps
   * @throws Error when validation fails or simulated server error occurs (5% chance)
   * 
   * @example
   * ```typescript
   * const newProduct = await productService.createProduct({
   *   name: 'New Product',
   *   description: 'A great product',
   *   price: 99.99,
   *   category: 'Electronics',
   *   inStock: true
   * });
   * ```
   */
  async createProduct(productData: CreateProductData): Promise<ApiResponse<Product>> {
    await delay(1000);
    
    // Simulate validation error
    if (!productData.name.trim()) {
      throw new Error('Product name is required');
    }
    
    // Simulate occasional server error
    if (Math.random() < 0.05) {
      throw new Error('Server error: Failed to create product');
    }

    const newProduct: Product = {
      id: generateId(),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.products.push(newProduct);

    return {
      data: newProduct,
      message: 'Product created successfully',
      success: true,
    };
  }

  /**
   * Updates an existing product in the mock database
   * 
   * @param productData - Product update data including ID and fields to update
   * @returns Promise<ApiResponse<Product>> - Updated product with new timestamp
   * @throws Error when product with given ID is not found or server error occurs (5% chance)
   * 
   * @example
   * ```typescript
   * const updated = await productService.updateProduct({
   *   id: '1',
   *   name: 'Updated Product Name',
   *   price: 199.99
   * });
   * ```
   */
  async updateProduct(productData: UpdateProductData): Promise<ApiResponse<Product>> {
    await delay(800);
    
    const index = this.products.findIndex(p => p.id === productData.id);
    
    if (index === -1) {
      throw new Error(`Product with id ${productData.id} not found`);
    }

    // Simulate occasional server error
    if (Math.random() < 0.05) {
      throw new Error('Server error: Failed to update product');
    }

    const updatedProduct: Product = {
      ...this.products[index],
      ...productData,
      updatedAt: new Date().toISOString(),
    };

    this.products[index] = updatedProduct;

    return {
      data: updatedProduct,
      message: 'Product updated successfully',
      success: true,
    };
  }

  /**
   * Deletes a product from the mock database
   * 
   * @param id - The unique identifier of the product to delete
   * @returns Promise<ApiResponse<void>> - Success response with no data
   * @throws Error when product with given ID is not found or server error occurs (5% chance)
   * 
   * @example
   * ```typescript
   * await productService.deleteProduct('1');
   * console.log('Product deleted successfully');
   * ```
   */
  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    await delay(600);
    
    const index = this.products.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }

    // Simulate occasional server error
    if (Math.random() < 0.05) {
      throw new Error('Server error: Failed to delete product');
    }

    this.products.splice(index, 1);

    return {
      data: undefined,
      message: 'Product deleted successfully',
      success: true,
    };
  }
}

/**
 * Singleton instance of the MockProductService
 * 
 * This is the main export that should be used throughout the application
 * for all product-related API operations.
 * 
 * @example
 * ```typescript
 * import { productService } from '../services/productService';
 * const products = await productService.getAllProducts();
 * ```
 */
export const productService = new MockProductService();