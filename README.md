# Product Manager - React CRUD Application

A modern React TypeScript CRUD application for managing products, built with Vite, Redux Toolkit, Tailwind CSS, and featuring toast notifications.

## Features

- ✅ **Complete CRUD Operations**: Create, Read, Update, Delete products
- ✅ **Redux Toolkit**: State management with async thunks
- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **Tailwind CSS**: Responsive and modern styling
- ✅ **Toast Notifications**: User feedback for all operations
- ✅ **Form Validation**: React Hook Form with validation
- ✅ **Mock API**: Simulated backend with delays and error handling
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **React Router**: Client-side navigation
- ✅ **Loading States**: Visual feedback during async operations
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Unit Testing**: Comprehensive Jest test suite with >98% coverage

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Testing**: Jest with ts-jest
- **Development**: ESLint, TypeScript

## Architecture Overview

### Application Architecture

The application follows a modern React architecture pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────┐
│                    Browser                          │
│  ┌───────────────────────────────────────────────┐  │
│  │              React App                        │  │
│  │  ┌─────────────┐  ┌──────────────────────┐   │  │
│  │  │   Pages     │  │     Components       │   │  │
│  │  │ (Routes)    │  │   (UI, Forms, etc)   │   │  │
│  │  └─────────────┘  └──────────────────────┘   │  │
│  │           │                    │              │  │
│  │           └────────┬───────────┘              │  │
│  │                    │                          │  │
│  │  ┌─────────────────▼─────────────────────┐   │  │
│  │  │         Redux Store                   │   │  │
│  │  │  ┌─────────────────────────────────┐  │   │  │
│  │  │  │     Products Slice              │  │   │  │
│  │  │  │ (State + Async Thunks)          │  │   │  │
│  │  │  └─────────────────────────────────┘  │   │  │
│  │  └─────────────────┬─────────────────────┘   │  │
│  │                    │                          │  │
│  │  ┌─────────────────▼─────────────────────┐   │  │
│  │  │       Service Layer                   │   │  │
│  │  │    (Mock Product Service)             │   │  │
│  │  └─────────────────┬─────────────────────┘   │  │
│  └──────────────────────────────────────────────┘  │
│                       │                             │
└───────────────────────┼─────────────────────────────┘
                        │
                ┌───────▼────────┐
                │   Mock API     │
                │ (In-Memory DB) │
                └────────────────┘
```

### State Management Flow

```
User Action → Component Event → Redux Action → Async Thunk → Service → Mock API
                                      ↓
User Interface ← Component Update ← State Change ← Reducer ← Response ← ←─┘
```

### Component Hierarchy

```
App
├── Layout
│   ├── Header (Navigation)
│   ├── Main Content (React Router Outlet)
│   └── Footer
├── Home (Landing Page)
├── ProductList (CRUD Operations)
├── ProductDetail (View Single Product)
├── CreateProduct (Form for New Products)
├── EditProduct (Form for Updates)
└── NotFound (404 Page)
```

### Data Flow Patterns

1. **Read Operations**: Component → useAppSelector → Redux State → UI Update
2. **Write Operations**: Component → useAppDispatch → Async Thunk → Service → API → State Update
3. **Error Handling**: Service Error → Async Thunk Rejection → Error State → Toast Notification
4. **Loading States**: Thunk Pending → Loading State → UI Spinner → Completion → Normal State

## Project Structure

```

demo-copilot-agent/
├── .github/              # GitHub Actions and workflows
│   └── workflows/        # CI/CD pipeline for deployment
├── public/              # Static assets and favicon
├── src/                 # Application source code
│   ├── components/      # Reusable React components
│   │   ├── forms/       # Form components (ProductForm)
│   │   ├── layout/      # Layout components (Header, Footer, Layout)
│   │   └── ui/          # UI components (Button, LoadingSpinner, ConfirmDialog)
│   ├── hooks/           # Custom React hooks (typed Redux hooks)
│   ├── pages/           # Page components and routing
│   │   ├── products/    # Product-related pages (List, Detail, Create, Edit)
│   │   ├── Home.tsx     # Landing page
│   │   └── NotFound.tsx # 404 error page
│   ├── services/        # API service layer
│   │   └── productService.ts # Mock API implementation
│   ├── store/           # Redux Toolkit store and slices
│   │   ├── index.ts     # Store configuration
│   │   └── productsSlice.ts # Products state management
│   ├── types/           # TypeScript type definitions
│   │   ├── index.ts     # Re-exports
│   │   └── product.ts   # Product-related types
│   ├── utils/           # Utility functions and helpers
│   ├── App.tsx          # Root component with routing
│   └── main.tsx         # Application entry point
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite build configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── eslint.config.js     # ESLint configuration
=======
src/
├── components/
│   ├── forms/           # Form components
│   ├── layout/          # Layout components (Header, Footer, Layout)
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
│   └── __tests__/       # Hook tests
├── pages/               # Page components
│   └── products/        # Product-related pages
├── services/            # API service layer (mock)
│   └── __tests__/       # Service tests
├── store/               # Redux store and slices
│   └── __tests__/       # Store and slice tests
├── types/               # TypeScript type definitions
│   └── __tests__/       # Type validation tests
└── utils/               # Utility functions
    └── __tests__/       # Utility function tests


## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd demo-copilot-agent
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages
- `npm run test` - Run Jest unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Testing

This project includes comprehensive unit tests using Jest with the following coverage:

- **ProductService**: Tests for all CRUD operations, error handling, and validation
- **Redux Store**: Tests for async thunks, reducers, and state management
- **Utility Functions**: Tests for formatters and helper functions
- **TypeScript Types**: Tests to ensure type safety and structure

#### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode (automatically re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

#### Test Coverage

The project maintains **>98% test coverage** across:
- Functions: 98%+ coverage
- Lines: 99%+ coverage
- Branches: 100% coverage
- Statements: 98%+ coverage

Coverage reports are generated in the `coverage/` directory and include:
- Terminal output with coverage summary
- HTML report (`coverage/lcov-report/index.html`)
- LCOV format for CI/CD integration

### Development Workflow

#### Setting Up Development Environment

1. **Fork and Clone**: Fork the repository and clone your fork
2. **Install Dependencies**: Run `npm install` to install all packages
3. **Environment Setup**: The app works out of the box with no environment variables needed
4. **Start Development**: Run `npm run dev` to start the development server

#### Development Process

1. **Create Feature Branch**: `git checkout -b feature/your-feature-name`
2. **Make Changes**: Implement your feature or fix
3. **Test Changes**: 
   - Run `npm run lint` to check code style
   - Run `npm run build` to ensure production build works
   - Test functionality in browser at `http://localhost:5173`
4. **Commit Changes**: Use conventional commit messages
5. **Push and PR**: Push your branch and create a pull request

#### Code Style and Standards

- **TypeScript**: All new code should be written in TypeScript with proper typing
- **ESLint**: Follow the existing ESLint configuration (automatically enforced)
- **Component Structure**: Use functional components with hooks
- **State Management**: Use Redux Toolkit for global state, local state for component-specific data
- **Styling**: Use Tailwind CSS classes, maintain responsive design principles
- **File Organization**: Follow the existing folder structure and naming conventions

#### Testing Your Changes

```bash
# Lint your code
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview

# Test the development server
npm run dev
```

### Configuration Options

#### Build Configuration (vite.config.ts)

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/demo-copilot-agent/', // GitHub Pages base path
})
```

#### Tailwind Configuration (tailwind.config.js)

The project uses Tailwind CSS v4 with PostCSS integration. Custom styling can be added through:
- Additional Tailwind utility classes
- Custom CSS in component files
- Global styles in `src/index.css`

#### TypeScript Configuration

- **tsconfig.json**: Main TypeScript configuration
- **tsconfig.app.json**: Application-specific settings
- **tsconfig.node.json**: Build tool configuration

#### ESLint Configuration (eslint.config.js)

Configured for:
- React 18+ with hooks rules
- TypeScript support
- React Refresh for development

#### Deployment Configuration

Automatic deployment to GitHub Pages via GitHub Actions:
- Triggers on push to `main` branch
- Builds the application using `npm run build`
- Deploys to GitHub Pages
- Available at: https://tayanchonk.github.io/demo-copilot-agent/

## Live Demo

🌐 **[View Live Application](https://Tayanchonk.github.io/demo-copilot-agent/)**

This application is automatically deployed to GitHub Pages from the main branch.

## Usage Examples

### Basic Application Usage

#### 1. Viewing Products
Navigate to the Products page to see all available products:
- Click "Products" in the navigation menu
- Browse through the product list
- Each product shows name, price, category, and stock status
- Use the responsive grid layout on different screen sizes

#### 2. Creating a New Product
Add a new product to the catalog:
1. Navigate to Products → "Add Product" button
2. Fill out the product form:
   - **Name**: Enter product name (required)
   - **Description**: Add detailed description
   - **Price**: Set price in decimal format (e.g., 99.99)
   - **Category**: Choose from available categories
   - **In Stock**: Toggle inventory status
3. Click "Create Product"
4. Success notification will appear
5. Redirected to product list with new product visible

#### 3. Editing Products
Update existing product information:
1. Navigate to product detail page
2. Click "Edit" button
3. Modify any product fields
4. Click "Update Product"
5. Changes are saved and reflected immediately

#### 4. Deleting Products
Remove products from the catalog:
1. Navigate to product detail page or product list
2. Click "Delete" button
3. Confirm deletion in the dialog
4. Product is removed from the list

### Developer Usage Examples

#### Using the Service Layer
```typescript
// Import the product service
import { productService } from '../services/productService';

// Fetch all products
const fetchProducts = async () => {
  try {
    const response = await productService.getAllProducts();
    console.log(response.data); // Array of products
  } catch (error) {
    console.error('Failed to fetch products:', error.message);
  }
};

// Create a new product
const createProduct = async () => {
  try {
    const productData = {
      name: 'New Smartphone',
      description: 'Latest model with advanced features',
      price: 599.99,
      category: 'Electronics',
      inStock: true
    };
    
    const response = await productService.createProduct(productData);
    console.log('Created product:', response.data);
  } catch (error) {
    console.error('Failed to create product:', error.message);
  }
};
```

#### Using Redux in Components
```typescript
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts, createProduct } from '../store/productsSlice';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(state => state.products);
  
  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  // Handle product creation
  const handleCreateProduct = async (productData: CreateProductData) => {
    try {
      await dispatch(createProduct(productData)).unwrap();
      toast.success('Product created successfully!');
    } catch (error) {
      toast.error(`Failed to create product: ${error}`);
    }
  };
  
  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && <div className="error">Error: {error}</div>}
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

#### Form Handling with React Hook Form
```typescript
import { useForm } from 'react-hook-form';
import { CreateProductData } from '../types';

const ProductForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateProductData>();
  
  const onSubmit = async (data: CreateProductData) => {
    // Handle form submission
    await handleCreateProduct(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name', { required: 'Product name is required' })}
        placeholder="Product Name"
      />
      {errors.name && <span>{errors.name.message}</span>}
      
      <input
        {...register('price', { 
          required: 'Price is required',
          min: { value: 0, message: 'Price must be positive' }
        })}
        type="number"
        step="0.01"
        placeholder="Price"
      />
      {errors.price && <span>{errors.price.message}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
};
```

#### Custom Hooks Usage
```typescript
// Custom hook for product management
const useProductManagement = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error, selectedProduct } = useAppSelector(
    state => state.products
  );
  
  const fetchProducts = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  const selectProduct = useCallback((id: string) => {
    dispatch(fetchProductById(id));
  }, [dispatch]);
  
  const clearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);
  
  return {
    products,
    loading,
    error,
    selectedProduct,
    fetchProducts,
    selectProduct,
    clearError
  };
};

// Using the custom hook in a component
const ProductManagement: React.FC = () => {
  const {
    products,
    loading,
    error,
    fetchProducts,
    clearError
  } = useProductManagement();
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={clearError}>Clear Error</button>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    );
  }
  
  return (
    <div>
      {loading ? <LoadingSpinner /> : <ProductGrid products={products} />}
    </div>
  );
};
```

#### Styling with Tailwind CSS
```typescript
// Responsive product card component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            product.inStock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {product.category}
          </span>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            View Details
          </button>
          <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
```

## Features Overview

### Product Management
- **List View**: Display all products with pagination-ready layout
- **Detail View**: Comprehensive product information
- **Create Form**: Add new products with validation
- **Edit Form**: Update existing products
- **Delete**: Remove products with confirmation

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful error messages
- **Toast Notifications**: Success and error feedback
- **Form Validation**: Real-time validation with helpful messages

### Mock Data Service
- Simulates real API behavior with delays
- Includes error scenarios for testing
- Persistent data during session
- Realistic response times

## Component Documentation

### Core Components

#### Layout Components
- **Layout** (`src/components/layout/Layout.tsx`): Main layout wrapper with header and footer
- **Header** (`src/components/layout/Header.tsx`): Navigation bar with branding and menu
- **Footer** (`src/components/layout/Footer.tsx`): Site footer with links and copyright

#### UI Components
- **Button** (`src/components/ui/Button.tsx`): Reusable button with variants (primary, secondary, danger)
- **LoadingSpinner** (`src/components/ui/LoadingSpinner.tsx`): Loading indicator for async operations
- **ConfirmDialog** (`src/components/ui/ConfirmDialog.tsx`): Modal for confirmation actions

#### Form Components
- **ProductForm** (`src/components/forms/ProductForm.tsx`): Reusable form for create/edit operations
  - Uses React Hook Form for validation
  - Supports all product fields with proper validation
  - Handles both create and update modes

#### Page Components
- **Home** (`src/pages/Home.tsx`): Landing page with app overview
- **ProductList** (`src/pages/products/ProductList.tsx`): Main product listing with CRUD actions
- **ProductDetail** (`src/pages/products/ProductDetail.tsx`): Detailed product view
- **CreateProduct** (`src/pages/products/CreateProduct.tsx`): New product creation page
- **EditProduct** (`src/pages/products/EditProduct.tsx`): Product editing page
- **NotFound** (`src/pages/NotFound.tsx`): 404 error page for invalid routes

### State Management

#### Redux Store Structure
```typescript
RootState {
  products: {
    products: Product[];        // Array of all products
    loading: boolean;          // Loading state for async operations
    error: string | null;      // Error message if any operation fails
    selectedProduct: Product | null; // Currently selected product for details/edit
  }
}
```

#### Available Actions
- `fetchProducts()` - Load all products from API
- `fetchProductById(id)` - Load specific product by ID
- `createProduct(data)` - Create new product
- `updateProduct(data)` - Update existing product
- `deleteProduct(id)` - Delete product by ID
- `clearError()` - Clear error state
- `clearSelectedProduct()` - Clear selected product

### Hooks

#### Custom Redux Hooks
- **useAppDispatch**: Typed version of useDispatch for Redux actions
- **useAppSelector**: Typed version of useSelector for state access

## API Documentation (Mock Service)

### Base Configuration
- **Base URL**: Mock service (no actual HTTP requests)
- **Response Format**: All responses follow the `ApiResponse<T>` interface
- **Delays**: Realistic network delays (500-1000ms)
- **Error Rate**: 5-10% simulated failure rate for testing

### Endpoints

#### GET /products
Fetch all products from the mock database.

**Response:**
```typescript
ApiResponse<Product[]> {
  data: Product[];
  message: string;
  success: boolean;
}
```

**Example Response:**
```json
{
  "data": [
    {
      "id": "1",
      "name": "Laptop Pro",
      "description": "High-performance laptop for professionals",
      "price": 1299.99,
      "category": "Electronics",
      "inStock": true,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "message": "Products fetched successfully",
  "success": true
}
```

#### GET /products/:id
Fetch a single product by ID.

**Parameters:**
- `id` (string): Product ID

**Response:**
```typescript
ApiResponse<Product>
```

**Errors:**
- Product not found: `Product with id {id} not found`

#### POST /products
Create a new product.

**Request Body:**
```typescript
CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}
```

**Response:**
```typescript
ApiResponse<Product> // Product with generated ID and timestamps
```

**Validation:**
- `name` is required and cannot be empty

#### PUT /products/:id
Update an existing product.

**Parameters:**
- `id` (string): Product ID

**Request Body:**
```typescript
UpdateProductData {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  inStock?: boolean;
}
```

**Response:**
```typescript
ApiResponse<Product> // Updated product with new updatedAt timestamp
```

#### DELETE /products/:id
Delete a product by ID.

**Parameters:**
- `id` (string): Product ID

**Response:**
```typescript
ApiResponse<void> {
  data: undefined;
  message: "Product deleted successfully";
  success: true;
}
```

**Errors:**
- Product not found: `Product with id {id} not found`

### Error Handling

The mock service simulates various error scenarios:
- **Network Errors** (10% chance on GET requests)
- **Server Errors** (5% chance on POST/PUT/DELETE requests)
- **Validation Errors** (Invalid data in requests)
- **Not Found Errors** (Invalid product IDs)

All errors are thrown as JavaScript Error objects with descriptive messages.

## API Endpoints (Mock)

The application uses a mock service that simulates the following endpoints:

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## Data Models

### Core Types

#### Product
Main entity representing a product in the system.
```typescript
interface Product {
  id: string;           // Unique identifier (auto-generated)
  name: string;         // Product name (required, non-empty)
  description: string;  // Product description
  price: number;        // Price in decimal format (e.g., 99.99)
  category: string;     // Product category
  inStock: boolean;     // Inventory status
  createdAt: string;    // ISO 8601 timestamp of creation
  updatedAt: string;    // ISO 8601 timestamp of last update
}
```

#### CreateProductData
Data required to create a new product (excludes auto-generated fields).
```typescript
interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}
```

#### UpdateProductData
Data for updating an existing product (all fields optional except ID).
```typescript
interface UpdateProductData extends Partial<CreateProductData> {
  id: string;           // Required: ID of product to update
}
```

#### ProductsState
Redux state shape for product management.
```typescript
interface ProductsState {
  products: Product[];              // Array of all products
  loading: boolean;                // Loading state for async operations
  error: string | null;            // Error message (null when no error)
  selectedProduct: Product | null; // Currently selected product
}
```

#### ApiResponse
Standardized response format for all API operations.
```typescript
interface ApiResponse<T> {
  data: T;              // Response payload
  message: string;      // Success/error message
  success: boolean;     // Operation success status
}
```

### Redux Types

#### RootState
Complete application state type.
```typescript
type RootState = {
  products: ProductsState;
}
```

#### AppDispatch
Typed dispatch function including async thunk support.
```typescript
type AppDispatch = typeof store.dispatch;
```

## Troubleshooting

### Common Issues

#### Development Server Issues

**Problem**: `npm run dev` fails to start
**Solutions**:
1. Ensure Node.js version 18+ is installed: `node --version`
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
4. Check if port 5173 is available or change port in `vite.config.ts`

**Problem**: TypeScript errors during development
**Solutions**:
1. Restart TypeScript server in your IDE
2. Run `npx tsc --noEmit` to check for type errors
3. Ensure all dependencies are properly installed
4. Check `tsconfig.json` configuration

#### Build Issues

**Problem**: `npm run build` fails
**Solutions**:
1. Fix any TypeScript errors: `npx tsc --noEmit`
2. Fix any ESLint errors: `npm run lint`
3. Clear Vite cache: `rm -rf dist && npm run build`
4. Check Vite configuration in `vite.config.ts`

**Problem**: Build succeeds but app doesn't work in production
**Solutions**:
1. Check base path configuration for GitHub Pages deployment
2. Verify that all assets are correctly referenced
3. Test locally with `npm run preview`
4. Check browser console for errors

#### Runtime Issues

**Problem**: White screen or app not loading
**Solutions**:
1. Check browser console for JavaScript errors
2. Verify that the correct base path is configured
3. Ensure all required environment variables are set
4. Check network tab for failed resource loading

**Problem**: API calls not working
**Solutions**:
1. Check browser console for network errors
2. Verify service layer implementation
3. Check Redux DevTools for action dispatching
4. Ensure proper error handling in components

**Problem**: State management issues
**Solutions**:
1. Install Redux DevTools browser extension
2. Check action dispatching and state updates
3. Verify proper use of `useAppSelector` and `useAppDispatch`
4. Check for proper async thunk implementation

#### Styling Issues

**Problem**: Tailwind CSS classes not applying
**Solutions**:
1. Check `tailwind.config.js` configuration
2. Verify PostCSS configuration
3. Restart development server after config changes
4. Check for CSS conflicts or specificity issues

**Problem**: Responsive design not working
**Solutions**:
1. Test with browser developer tools device simulation
2. Verify Tailwind responsive class usage (`sm:`, `md:`, `lg:`, etc.)
3. Check viewport meta tag in `index.html`
4. Test on actual devices when possible

### Performance Issues

**Problem**: Slow loading or poor performance
**Solutions**:
1. Use React DevTools Profiler to identify bottlenecks
2. Check for unnecessary re-renders
3. Optimize images and assets
4. Consider code splitting for larger applications
5. Monitor bundle size with `npm run build`

### Deployment Issues

**Problem**: GitHub Pages deployment fails
**Solutions**:
1. Check GitHub Actions workflow logs
2. Verify branch protection rules
3. Ensure proper base path in `vite.config.ts`
4. Check repository settings for Pages configuration

**Problem**: App works locally but not on GitHub Pages
**Solutions**:
1. Verify base path configuration matches repository name
2. Check for case-sensitive file path issues
3. Ensure all assets use relative paths
4. Test production build locally: `npm run build && npm run preview`

### Getting Help

If you encounter issues not covered here:

1. **Check Browser Console**: Look for error messages and warnings
2. **Check Redux DevTools**: Monitor state changes and actions
3. **Review Documentation**: Refer to official docs for dependencies
4. **Search Issues**: Check GitHub issues for similar problems
5. **Create Issue**: Submit a detailed bug report with reproduction steps

### Debug Mode

Enable additional debugging by:
1. Using React Developer Tools browser extension
2. Using Redux DevTools browser extension
3. Checking network requests in browser dev tools
4. Adding console.log statements in development
5. Using browser debugger and breakpoints

## Contributing

We welcome contributions to the demo-copilot-agent project! Here's how you can help improve the project.

### Ways to Contribute

- 🐛 **Bug Reports**: Report bugs and issues
- 🚀 **Feature Requests**: Suggest new features or improvements
- 📖 **Documentation**: Improve or add documentation
- 💻 **Code Contributions**: Submit bug fixes or new features
- 🎨 **Design**: Improve UI/UX design
- 🧪 **Testing**: Add or improve test coverage

### Getting Started

#### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/demo-copilot-agent.git
cd demo-copilot-agent

# Add the original repository as upstream
git remote add upstream https://github.com/Tayanchonk/demo-copilot-agent.git
```

#### 2. Set Up Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

#### 3. Create a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### Development Guidelines

#### Code Style
- **TypeScript**: All new code must be written in TypeScript
- **ESLint**: Follow the existing ESLint configuration
- **Formatting**: Use consistent formatting (consider using Prettier)
- **Naming**: Use descriptive names for variables, functions, and components

#### Component Guidelines
- Use functional components with hooks
- Follow the existing component structure
- Add proper TypeScript types for props
- Include JSDoc comments for complex components
- Ensure components are responsive (mobile-first design)

#### State Management
- Use Redux Toolkit for global state management
- Use local state (`useState`) for component-specific state
- Follow the existing async thunk patterns
- Handle loading and error states consistently

#### File Organization
```
src/
├── components/          # Reusable components
│   ├── forms/          # Form-specific components
│   ├── layout/         # Layout components
│   └── ui/             # Generic UI components
├── pages/              # Route components
├── services/           # API services
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Commit Guidelines

Use conventional commit messages:

```bash
# Features
git commit -m "feat: add product search functionality"

# Bug fixes
git commit -m "fix: resolve product deletion issue"

# Documentation
git commit -m "docs: update API documentation"

# Refactoring
git commit -m "refactor: improve component structure"

# Tests
git commit -m "test: add unit tests for ProductForm"
```

### Before Submitting

#### Quality Checks
```bash
# Run linting
npm run lint

# Build the project
npm run build

# Test the production build
npm run preview
```

#### Testing Your Changes
1. **Manual Testing**: Test all affected functionality manually
2. **Browser Testing**: Test in different browsers (Chrome, Firefox, Safari)
3. **Responsive Testing**: Test on different screen sizes
4. **Error Scenarios**: Test error handling and edge cases

### Pull Request Process

#### 1. Prepare Your PR

```bash
# Update your branch with latest changes
git fetch upstream
git rebase upstream/main

# Push your changes
git push origin feature/your-feature-name
```

#### 2. Create Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill out the PR template with:
   - Clear description of changes
   - List of features/fixes
   - Screenshots (if UI changes)
   - Testing steps

#### 3. PR Requirements

- ✅ All quality checks pass (linting, building)
- ✅ Code follows project conventions
- ✅ Changes are well documented
- ✅ No breaking changes (unless discussed)
- ✅ Responsive design maintained
- ✅ Accessibility considerations addressed

#### 4. Review Process

1. **Automated Checks**: GitHub Actions will run linting and build
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged

### Issue Guidelines

#### Bug Reports

Include:
- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, Node.js version
- **Screenshots**: If applicable

#### Feature Requests

Include:
- **Problem**: What problem does this solve?
- **Solution**: Proposed solution or feature
- **Alternatives**: Alternative solutions considered
- **Use Cases**: Real-world use cases
- **Implementation**: Technical considerations (if any)

### Code Review Guidelines

#### For Reviewers
- Be constructive and respectful
- Focus on code quality and maintainability
- Check for security issues
- Verify accessibility compliance
- Test the changes locally when possible

#### For Contributors
- Respond to feedback promptly
- Ask questions if feedback is unclear
- Make requested changes in separate commits
- Update documentation as needed

### Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Follow the project's code of conduct
- Keep discussions focused and productive

### Recognition

Contributors will be recognized in:
- GitHub contributor list
- Release notes for significant contributions
- Project documentation
- Special recognition for ongoing contributors

## Accessibility & Performance

### Accessibility Features
- **Semantic HTML**: All components use proper HTML5 semantic elements
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements
- **Screen Reader Support**: ARIA labels and descriptions where needed
- **Color Contrast**: Tailwind CSS ensures WCAG-compliant color contrasts
- **Focus Management**: Clear focus indicators and proper tab order
- **Responsive Design**: Works across all device sizes and orientations

### Performance Optimizations
- **Code Splitting**: Vite automatically splits code for optimal loading
- **Tree Shaking**: Unused code is eliminated in production builds
- **Asset Optimization**: Images and static assets are optimized
- **Bundle Analysis**: Use `npm run build` to see bundle size analysis
- **Lazy Loading**: Components are loaded as needed
- **Caching Strategy**: Static assets are cached for improved performance

### Best Practices Implemented
- **React Best Practices**: Functional components, proper hooks usage, memoization where needed
- **TypeScript**: Full type safety throughout the application
- **Error Boundaries**: Graceful error handling and recovery
- **Loading States**: Clear feedback during async operations
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Mobile-First Design**: Responsive design prioritizes mobile experience

## Project Roadmap

### Current Version (v1.0)
- ✅ Complete CRUD operations for products
- ✅ Redux Toolkit state management
- ✅ TypeScript implementation
- ✅ Responsive design with Tailwind CSS
- ✅ Mock API with realistic behavior
- ✅ Comprehensive documentation

### Future Enhancements (Planned)
- 🔄 **Unit Testing**: Add comprehensive test suite with Jest and React Testing Library
- 🔄 **E2E Testing**: Implement Cypress or Playwright for end-to-end testing
- 🔄 **Real Backend**: Connect to actual REST API or GraphQL endpoint
- 🔄 **Authentication**: Add user login and role-based access control
- 🔄 **Search & Filtering**: Advanced product search and filtering capabilities
- 🔄 **Pagination**: Implement server-side pagination for large datasets
- 🔄 **Image Upload**: Add product image upload and management
- 🔄 **Internationalization**: Multi-language support (i18n)
- 🔄 **PWA Features**: Offline support and installable app
- 🔄 **Advanced Validation**: More sophisticated form validation rules
- 🔄 **Bulk Operations**: Multi-select and bulk actions for products
- 🔄 **Data Visualization**: Charts and analytics for product data
- 🔄 **Export/Import**: CSV/Excel export and import functionality

### Technical Improvements
- 🔄 **Performance**: Implement React.memo, useMemo, and useCallback optimizations
- 🔄 **Bundle Optimization**: Implement dynamic imports and code splitting
- 🔄 **Monitoring**: Add error tracking and performance monitoring
- 🔄 **CI/CD**: Enhanced GitHub Actions workflow with testing
- 🔄 **Security**: Implement security best practices and vulnerability scanning
- 🔄 **Documentation**: Add interactive API documentation with Swagger/OpenAPI

### How to Contribute to Roadmap
1. **Feature Requests**: Open an issue with the `enhancement` label
2. **Implementation**: Pick up any roadmap item and submit a PR
3. **Discussion**: Join discussions about prioritization and implementation
4. **Feedback**: Share your experience and suggest improvements

## License

This project is licensed under the MIT License.
