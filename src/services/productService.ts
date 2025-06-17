import type { Product, CreateProductData, UpdateProductData, ApiResponse } from '../types';

// Mock data
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

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to generate random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

class MockProductService {
  private products: Product[] = [...mockProducts];

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

export const productService = new MockProductService();