import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-earth-100">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-forest-600 text-white p-2 rounded-lg group-hover:bg-forest-700 transition-colors">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-display font-bold text-earth-900 block leading-tight">
                Kanasu
              </span>
              <span className="text-xs text-earth-500 font-medium tracking-wide uppercase">
                Mushroom Farm
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-forest-100 text-forest-700'
                    : 'text-earth-600 hover:bg-earth-50 hover:text-forest-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 text-earth-600 hover:text-forest-600 hover:bg-earth-50 rounded-lg transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-forest-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <Link
                to="/profile"
                className="p-3 text-earth-600 hover:text-forest-600 hover:bg-earth-50 rounded-lg transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn-primary text-sm py-2.5 px-5 font-semibold"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 text-earth-600 hover:bg-earth-50 rounded-lg transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-earth-100 bg-earth-50 -mx-4 px-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold ${
                    isActive(link.path)
                      ? 'bg-forest-600 text-white'
                      : 'text-earth-700 hover:bg-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-3 pt-4 border-t border-earth-200">
                <button
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsOpen(false);
                  }}
                  className="relative p-3 bg-white rounded-lg text-earth-600 shadow-sm"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-forest-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 bg-white rounded-lg text-earth-700 shadow-sm"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-semibold">Profile</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary text-sm py-3 px-5 font-semibold"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
