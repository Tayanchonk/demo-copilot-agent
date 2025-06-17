import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
            <button 
              className="text-white hover:text-blue-200"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`block py-2 px-3 rounded hover:bg-blue-500 transition-colors ${
                  isActive('/') ? 'bg-blue-500' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`block py-2 px-3 rounded hover:bg-blue-500 transition-colors ${
                  isActive('/products') ? 'bg-blue-500' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/products/create"
                className={`block py-2 px-3 rounded bg-blue-500 hover:bg-blue-400 transition-colors ${
                  isActive('/products/create') ? 'bg-blue-400' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Add Product
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;