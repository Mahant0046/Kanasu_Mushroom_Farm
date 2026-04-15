import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
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
    { name: 'Subscriptions', path: '/subscriptions' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-earth-100">
      {/* Side Stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-forest-400 via-forest-500 to-forest-600"></div>
      <div className="container pl-4">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-forest-400 to-forest-600 rounded-full blur-xl opacity-75 group-hover:opacity-95 transition-opacity duration-300 scale-110"></div>
              <div className="relative bg-gradient-to-br from-forest-50 to-white p-3 mt-4 rounded-full shadow-xl group-hover:shadow-2xl transition-all duration-500 border-2 border-forest-400 group-hover:border-forest-500">
                <img 
                  src="/cropped_circle_logo.png" 
                  alt="Kanasu Mushroom Farm" 
                  className="h-24 w-25 object-cover rounded-full" 
                />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-3 rounded-lg text-base font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-forest-100 text-forest-700'
                    : 'text-earth-700 hover:bg-earth-50 hover:text-earth-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Social Media Links */}
            <div className="flex items-center space-x-2 pr-4 border-r border-earth-200">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-earth-600 hover:text-forest-600 hover:bg-earth-50 rounded-lg transition-colors group"
              >
                <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-earth-600 hover:text-forest-600 hover:bg-earth-50 rounded-lg transition-colors group"
              >
                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-earth-600 hover:text-forest-600 hover:bg-earth-50 rounded-lg transition-colors group"
              >
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>

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
                {/* Social Media Links Mobile */}
                <div className="flex items-center space-x-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-lg text-earth-600 shadow-sm hover:text-forest-600 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-lg text-earth-600 shadow-sm hover:text-forest-600 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-lg text-earth-600 shadow-sm hover:text-forest-600 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>

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
