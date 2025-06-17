import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold hover:text-blue-200 transition-colors"
            >
              Product Manager
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`hover:text-blue-200 transition-colors ${
                isActive('/') ? 'border-b-2 border-blue-200' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`hover:text-blue-200 transition-colors ${
                isActive('/products') ? 'border-b-2 border-blue-200' : ''
              }`}
            >
              Products
            </Link>
            <Link
              to="/products/create"
              className={`bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md transition-colors ${
                isActive('/products/create') ? 'bg-blue-400' : ''
              }`}
            >
              Add Product
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;