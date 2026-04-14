import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Filter, Eye, Package, CheckCircle, XCircle, Clock, Download, RefreshCw } from 'lucide-react';
import { ordersAPI } from '../services/api';

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await ordersAPI.updateStatus(orderId, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'processing':
        return RefreshCw;
      case 'shipped':
        return Package;
      case 'delivered':
        return CheckCircle;
      case 'cancelled':
        return XCircle;
      default:
        return Clock;
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-earth-900 mb-2">
          Order Management
        </h1>
        <p className="text-earth-600">
          Manage and track customer orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {['all', 'pending', 'processing', 'shipped', 'delivered'].map((status) => (
          <div
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`bg-white rounded-xl p-4 border cursor-pointer transition-all ${
              filterStatus === status
                ? 'border-forest-500 shadow-md'
                : 'border-earth-100 hover:border-forest-300'
            }`}
          >
            <p className="text-sm text-earth-600 capitalize">{status}</p>
            <p className="text-2xl font-bold text-earth-900">
              {status === 'all'
                ? orders.length
                : orders.filter(o => o.status === status).length}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-earth-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by number, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all appearance-none bg-white"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-earth-100 overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart className="h-16 w-16 text-earth-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-earth-900 mb-2">
              No orders found
            </h3>
            <p className="text-earth-600">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Orders will appear here once customers start placing orders'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-earth-50 border-b border-earth-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth-100">
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <tr key={order._id} className="hover:bg-earth-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-earth-900">#{order.orderNumber}</p>
                        <p className="text-sm text-earth-500">{order._id.slice(-8)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-earth-900">{order.user?.name || 'Unknown'}</p>
                        <p className="text-sm text-earth-500">{order.user?.email || 'No email'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-earth-900">{order.items?.length || 0} items</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-earth-900">₹{order.total}</p>
                        {order.paymentMethod && (
                          <p className="text-sm text-earth-500">{order.paymentMethod}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          <StatusIcon className="h-3 w-3" />
                          <span className="capitalize">{order.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-earth-900">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-earth-500">
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => navigate(`/admin/orders/${order._id}`)}
                            className="p-2 text-earth-600 hover:text-forest-600 hover:bg-earth-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {order.status === 'pending' && (
                            <button
                              onClick={() => handleStatusUpdate(order._id, 'processing')}
                              className="p-2 text-earth-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Mark as Processing"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </button>
                          )}
                          {order.status === 'processing' && (
                            <button
                              onClick={() => handleStatusUpdate(order._id, 'shipped')}
                              className="p-2 text-earth-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Mark as Shipped"
                            >
                              <Package className="h-4 w-4" />
                            </button>
                          )}
                          {order.status === 'shipped' && (
                            <button
                              onClick={() => handleStatusUpdate(order._id, 'delivered')}
                              className="p-2 text-earth-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Mark as Delivered"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          {order.status !== 'cancelled' && order.status !== 'delivered' && (
                            <button
                              onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                              className="p-2 text-earth-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Cancel Order"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
