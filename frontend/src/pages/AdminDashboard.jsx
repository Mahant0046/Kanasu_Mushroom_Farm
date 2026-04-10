import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, LogOut, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { productsAPI, ordersAPI } from '../services/api';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          productsAPI.getAll({ limit: 100 }),
          ordersAPI.getAll({ limit: 100 })
        ]);
        
        setStats({
          totalProducts: productsRes.data.total || 0,
          totalOrders: ordersRes.data.total || 0,
          totalRevenue: ordersRes.data.orders?.reduce((sum, o) => sum + o.total, 0) || 0
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticated, user, navigate]);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-50 py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-semibold text-earth-900">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-earth-600 hover:text-earth-900"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <Package className="h-8 w-8 text-forest-600" />
              <span className="text-3xl font-bold text-earth-900">{stats.totalProducts}</span>
            </div>
            <p className="text-earth-600 mt-2">Total Products</p>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <ShoppingCart className="h-8 w-8 text-forest-600" />
              <span className="text-3xl font-bold text-earth-900">{stats.totalOrders}</span>
            </div>
            <p className="text-earth-600 mt-2">Total Orders</p>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <TrendingUp className="h-8 w-8 text-forest-600" />
              <span className="text-3xl font-bold text-earth-900">₹{stats.totalRevenue}</span>
            </div>
            <p className="text-earth-600 mt-2">Total Revenue</p>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-earth-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="btn-primary text-left">
              Add New Product
            </button>
            <button className="btn-outline text-left">
              View All Orders
            </button>
          </div>
          <p className="text-earth-500 text-sm mt-4">
            Full admin management features coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
