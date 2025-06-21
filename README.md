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

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Development**: ESLint, TypeScript

## Project Structure

```
src/
├── components/
│   ├── forms/           # Form components
│   ├── layout/          # Layout components (Header, Footer, Layout)
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
├── pages/               # Page components
│   └── products/        # Product-related pages
├── services/            # API service layer (mock)
├── store/               # Redux store and slices
├── types/               # TypeScript type definitions
└── utils/               # Utility functions

# Configuration Files
├── netlify.toml         # Netlify deployment configuration
├── vite.config.ts       # Vite build configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── eslint.config.js     # ESLint configuration
└── public/
    └── _redirects       # Netlify redirect rules for React Router
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

## Deployment

This application supports deployment to both GitHub Pages and Netlify.

### GitHub Pages Deployment

🌐 **[View Live Application](https://Tayanchonk.github.io/demo-copilot-agent/)**

The application is automatically deployed to GitHub Pages from the main branch using GitHub Actions.

### Netlify Deployment

#### Prerequisites
- A [Netlify account](https://netlify.com) (free tier available)
- Access to this GitHub repository

#### Setup Instructions

1. **Connect Repository to Netlify**
   - Log in to your Netlify account
   - Click "New site from Git"
   - Choose GitHub and authorize Netlify
   - Select the `Tayanchonk/demo-copilot-agent` repository

2. **Configure Build Settings**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node.js version:** `18` (configured in `netlify.toml`)

3. **Environment Variables**
   - No custom environment variables are required for basic deployment
   - The application automatically detects Netlify environment via the `NETLIFY` environment variable

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your application
   - You'll receive a random subdomain URL (e.g., `amazing-app-123456.netlify.app`)

#### Features Included

- ✅ **Automatic Deployment**: Pushes to the main branch trigger new deployments
- ✅ **React Router Support**: `_redirects` file ensures client-side routing works
- ✅ **Performance Optimized**: Proper caching headers for static assets
- ✅ **Security Headers**: HTTPS by default with security headers configured
- ✅ **Environment Detection**: Application automatically adapts routing for Netlify

#### Custom Domain (Optional)

To use a custom domain:
1. Go to your Netlify site dashboard
2. Navigate to "Domain management"
3. Click "Add custom domain"
4. Follow the DNS configuration instructions

#### Continuous Deployment

The application is configured for continuous deployment:
- Changes pushed to the main branch automatically trigger new builds
- Build status is visible in the Netlify dashboard
- Failed builds will not be deployed, ensuring site stability

## Live Demo

🌐 **[View Live Application on GitHub Pages](https://Tayanchonk.github.io/demo-copilot-agent/)**

The application is available on multiple platforms:
- **GitHub Pages**: Automatically deployed from the main branch
- **Netlify**: Ready for deployment with the configuration provided above

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
