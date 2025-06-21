# Contributing to Demo Copilot Agent

Thank you for your interest in contributing to the Demo Copilot Agent project! This document provides detailed guidelines for contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
Examples of behavior that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Recommended Tools
- **VS Code Extensions**:
  - TypeScript and JavaScript Language Features
  - ESLint
  - Tailwind CSS IntelliSense
  - Auto Rename Tag
  - Bracket Pair Colorizer

### Initial Setup

1. **Fork the repository**
   ```bash
   # Visit https://github.com/Tayanchonk/demo-copilot-agent and click Fork
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/demo-copilot-agent.git
   cd demo-copilot-agent
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/Tayanchonk/demo-copilot-agent.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Development Process

### Workflow
1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow coding standards
   - Add/update tests as needed
   - Update documentation

3. **Test your changes**
   ```bash
   npm run lint        # Check code style
   npm run build       # Ensure build works
   npm run preview     # Test production build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring
- `test/description` - Test additions/improvements

## Coding Standards

### TypeScript Guidelines
- **Use strict typing**: Avoid `any` type
- **Prefer interfaces over types** for object shapes
- **Use proper naming conventions**:
  - PascalCase for components and types
  - camelCase for variables and functions
  - SCREAMING_SNAKE_CASE for constants

```typescript
// Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const getUserById = async (id: string): Promise<UserProfile> => {
  // implementation
};

// Avoid
const getUserById = async (id: any): Promise<any> => {
  // implementation
};
```

### React Component Guidelines

#### Functional Components
```typescript
// Good
interface ProductCardProps {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="product-card">
      {/* component content */}
    </div>
  );
};

export default ProductCard;
```

#### Hooks Usage
```typescript
// Good
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState<boolean>(false);

// Use custom hooks for complex logic
const useProductManagement = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  
  const fetchProducts = useCallback(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);
  
  return { products, fetchProducts };
};
```

### CSS/Styling Guidelines

#### Tailwind CSS Best Practices
```typescript
// Good - Responsive and semantic classes
<div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md sm:flex-row sm:space-y-0 sm:space-x-6">
  <img className="w-full h-48 object-cover rounded-md sm:w-32 sm:h-32" />
  <div className="flex-1">
    <h3 className="text-lg font-semibold text-gray-900">Product Name</h3>
    <p className="text-gray-600 mt-1">Product description</p>
  </div>
</div>

// Avoid - Inline styles and non-responsive design
<div style={{display: 'flex', padding: '24px'}}>
  <img style={{width: '128px', height: '128px'}} />
</div>
```

### File Organization

#### Directory Structure
```
src/
├── components/
│   ├── forms/
│   │   └── ProductForm/
│   │       ├── index.ts
│   │       ├── ProductForm.tsx
│   │       └── ProductForm.test.tsx
│   ├── layout/
│   └── ui/
├── pages/
├── services/
├── store/
├── types/
└── utils/
```

#### Import Organization
```typescript
// 1. External libraries
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Internal utilities and types
import { Product, CreateProductData } from '../types';
import { formatPrice } from '../utils/formatters';

// 3. Components
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// 4. Relative imports
import './ProductForm.css';
```

### Error Handling

#### Async Operations
```typescript
// Good
const handleCreateProduct = async (data: CreateProductData) => {
  try {
    setLoading(true);
    await dispatch(createProduct(data)).unwrap();
    toast.success('Product created successfully');
    navigate('/products');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create product';
    toast.error(message);
  } finally {
    setLoading(false);
  }
};
```

#### Component Error Boundaries
```typescript
// Good - Graceful error handling
const ProductList: React.FC = () => {
  const { products, loading, error } = useAppSelector(state => state.products);
  
  if (error) {
    return (
      <div className="error-container">
        <p>Failed to load products: {error}</p>
        <Button onClick={() => dispatch(fetchProducts())}>
          Retry
        </Button>
      </div>
    );
  }
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

## Pull Request Process

### Before Submitting
1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run quality checks**
   ```bash
   npm run lint
   npm run build
   npm run preview
   ```

3. **Test thoroughly**
   - Manual testing of all affected functionality
   - Cross-browser testing
   - Mobile/responsive testing
   - Error scenario testing

### PR Template
When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing
- [ ] Mobile testing

## Screenshots (if applicable)
Include screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or discussed)
```

### Review Process
1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** by reviewers (if needed)
4. **Approval** and merge

## Issue Guidelines

### Bug Reports
Use the bug report template:

```markdown
**Describe the Bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]

**Additional Context**
Any other context about the problem.
```

### Feature Requests
Use the feature request template:

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context or screenshots about the feature request.
```

## Testing

### Manual Testing Checklist
- [ ] All CRUD operations work correctly
- [ ] Form validation works properly
- [ ] Loading states display correctly
- [ ] Error messages are user-friendly
- [ ] Responsive design works on mobile
- [ ] Navigation works correctly
- [ ] Toast notifications appear
- [ ] Accessibility features work

### Browser Testing
Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Testing
Test on:
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Various screen sizes (320px to 1920px)

## Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Include usage examples in comments
- Document component props thoroughly
- Explain business logic and algorithms

### README Updates
When adding features:
- Update feature list
- Add usage examples
- Update API documentation
- Add troubleshooting entries if needed

### Inline Comments
```typescript
/**
 * Calculates the total price including tax and discounts
 * 
 * @param basePrice - The base price of the product
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @param discountPercent - Discount percentage (e.g., 10 for 10%)
 * @returns The final price after tax and discount
 * 
 * @example
 * ```typescript
 * const finalPrice = calculateTotalPrice(100, 0.08, 10);
 * // Returns 97.2 (100 - 10% discount + 8% tax)
 * ```
 */
const calculateTotalPrice = (
  basePrice: number, 
  taxRate: number, 
  discountPercent: number
): number => {
  const discountAmount = basePrice * (discountPercent / 100);
  const discountedPrice = basePrice - discountAmount;
  const tax = discountedPrice * taxRate;
  return discountedPrice + tax;
};
```

## Questions?

If you have questions about contributing:
1. Check existing issues and discussions
2. Create a new issue with the "question" label
3. Reach out to maintainers

Thank you for contributing to Demo Copilot Agent! 🚀