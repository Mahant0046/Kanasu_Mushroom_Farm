import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Thermometer,
  Package,
  ShoppingCart,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/farm' },
    { icon: Thermometer, label: 'Farm Monitoring', path: '/admin/farm/monitoring' },
    { icon: Package, label: 'Catalog', path: '/admin/farm/catalog' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/farm/orders' },
    { icon: TrendingUp, label: 'Analytics', path: '/admin/farm/analytics' },
    { icon: Settings, label: 'Settings', path: '/admin/farm/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-organic-brown-900 text-white transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-organic-brown-800">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-organic-green-400" />
          {isOpen && (
            <span className="text-lg font-heading font-bold">Kanasu Farm</span>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-organic-brown-800 rounded-lg transition-colors"
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-organic-green-600 text-white'
                : 'hover:bg-organic-brown-800 text-gray-300'
            }`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span className="font-body">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-organic-brown-800 text-gray-300 transition-colors"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {isOpen && <span className="font-body">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
