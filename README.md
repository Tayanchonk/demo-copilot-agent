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

## Project Structure

```
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
```

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

## Live Demo

🌐 **[View Live Application](https://Tayanchonk.github.io/demo-copilot-agent/)**

This application is automatically deployed to GitHub Pages from the main branch.

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

## API Endpoints (Mock)

The application uses a mock service that simulates the following endpoints:

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## Data Models

### Product
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
