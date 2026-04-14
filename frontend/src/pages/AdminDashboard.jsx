import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, TrendingUp, Star, RefreshCw, ArrowRight } from 'lucide-react';
import { productsAPI, ordersAPI } from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold text-earth-900">
          Admin Dashboard
        </h1>
        <p className="text-earth-600">
          Overview of your e-commerce platform
        </p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate('/admin/reviews')}
          className="card p-6 text-left hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-forest-100 p-3 rounded-lg group-hover:bg-forest-200 transition-colors">
              <Star className="h-6 w-6 text-forest-600" />
            </div>
            <ArrowRight className="h-5 w-5 text-earth-400 group-hover:text-forest-600 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-earth-900 mb-2">Manage Reviews</h3>
          <p className="text-earth-600 text-sm">
            View and manage customer product reviews
          </p>
        </button>

        <button
          onClick={() => navigate('/admin/subscriptions')}
          className="card p-6 text-left hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-earth-100 p-3 rounded-lg group-hover:bg-earth-200 transition-colors">
              <RefreshCw className="h-6 w-6 text-earth-600" />
            </div>
            <ArrowRight className="h-5 w-5 text-earth-400 group-hover:text-forest-600 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-earth-900 mb-2">Manage Subscriptions</h3>
          <p className="text-earth-600 text-sm">
            View and manage customer subscriptions
          </p>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
