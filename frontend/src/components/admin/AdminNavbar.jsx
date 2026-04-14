import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, LogOut, Menu, X, LayoutDashboard, MessageSquare, RefreshCw, Sprout, Package, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Farm Monitor', path: '/admin/farm', icon: Sprout },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Reviews', path: '/admin/reviews', icon: MessageSquare },
    { name: 'Subscriptions', path: '/admin/subscriptions', icon: RefreshCw },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-earth-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/admin" className="flex items-center space-x-3 group">
            <div className="bg-forest-600 text-white p-2 rounded-lg group-hover:bg-forest-700 transition-colors">
              <Leaf className="h-6 w-6" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-display font-bold text-earth-900 block leading-tight">
                Kanasu Admin
              </span>
              <span className="text-xs text-earth-500 font-medium tracking-wide uppercase">
                Management Dashboard
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-2 ${
                  isActive(link.path)
                    ? 'bg-forest-100 text-forest-700'
                    : 'text-earth-600 hover:bg-earth-50 hover:text-forest-600'
                }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-3">
            <span className="text-sm text-earth-600">
              Welcome, {user?.name || 'Admin'}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-earth-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-semibold">Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-earth-600 hover:bg-earth-50"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-earth-100 bg-white">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-2 ${
                  isActive(link.path)
                    ? 'bg-forest-100 text-forest-700'
                    : 'text-earth-600 hover:bg-earth-50'
                }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-earth-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-4 py-2 text-earth-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-semibold">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
