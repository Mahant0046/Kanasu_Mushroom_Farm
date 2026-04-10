import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, LogOut, MapPin, Phone, Mail, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await ordersAPI.getMyOrders();
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-700',
    'confirmed': 'bg-blue-100 text-blue-700',
    'processing': 'bg-purple-100 text-purple-700',
    'shipped': 'bg-indigo-100 text-indigo-700',
    'delivered': 'bg-green-100 text-green-700',
    'cancelled': 'bg-red-100 text-red-700'
  };

  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-3xl font-display font-semibold text-earth-900 mb-8">
          My Account
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-earth-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-earth-900">{user?.name}</h2>
                  <p className="text-sm text-earth-600">{user?.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-forest-50 text-forest-700'
                      : 'text-earth-600 hover:bg-earth-50'
                  }`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>My Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-forest-50 text-forest-700'
                      : 'text-earth-600 hover:bg-earth-50'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Profile Details</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-display font-semibold text-earth-900 mb-6">
                  My Orders
                </h2>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="card p-12 text-center">
                    <Package className="h-16 w-16 text-earth-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-earth-900 mb-2">
                      No orders yet
                    </h3>
                    <p className="text-earth-600 mb-6">
                      Start shopping to see your orders here
                    </p>
                    <button
                      onClick={() => navigate('/shop')}
                      className="btn-primary"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="card p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <p className="font-semibold text-earth-900">
                              Order #{order.orderNumber}
                            </p>
                            <p className="text-sm text-earth-600">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize mt-2 md:mt-0 inline-block ${
                            statusColors[order.status] || 'bg-earth-100 text-earth-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>

                        <div className="flex gap-4 mb-4">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div key={index} className="w-16 h-16 bg-earth-50 rounded-lg overflow-hidden">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl">
                                  🍄
                                </div>
                              )}
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-16 h-16 bg-earth-50 rounded-lg flex items-center justify-center text-earth-600">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-earth-100">
                          <span className="text-earth-600">
                            {order.items.length} items
                          </span>
                          <span className="font-semibold text-earth-900">
                            ₹{order.total}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-display font-semibold text-earth-900 mb-6">
                  Profile Details
                </h2>

                <div className="card p-6 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-earth-100 rounded-full flex items-center justify-center">
                      <User className="h-10 w-10 text-earth-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-earth-900 text-lg">
                        {user?.name}
                      </h3>
                      <p className="text-earth-600">{user?.email}</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-earth-100">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-5 w-5 text-earth-600 mt-1" />
                      <div>
                        <p className="text-sm text-earth-500">Email</p>
                        <p className="text-earth-900">{user?.email}</p>
                      </div>
                    </div>

                    {user?.phone && (
                      <div className="flex items-start space-x-4">
                        <Phone className="h-5 w-5 text-earth-600 mt-1" />
                        <div>
                          <p className="text-sm text-earth-500">Phone</p>
                          <p className="text-earth-900">{user.phone}</p>
                        </div>
                      </div>
                    )}

                    {user?.address && Object.values(user.address).some(v => v) && (
                      <div className="flex items-start space-x-4">
                        <MapPin className="h-5 w-5 text-earth-600 mt-1" />
                        <div>
                          <p className="text-sm text-earth-500">Address</p>
                          <p className="text-earth-900">
                            {user.address.street && `${user.address.street}, `}
                            {user.address.city && `${user.address.city}, `}
                            {user.address.state && `${user.address.state} `}
                            {user.address.zipCode && `- ${user.address.zipCode}`}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
