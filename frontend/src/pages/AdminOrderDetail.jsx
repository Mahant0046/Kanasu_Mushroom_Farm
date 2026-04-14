import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, User, MapPin, Phone, Mail, CreditCard, Truck, CheckCircle, XCircle, Clock, AlertCircle, DollarSign, Calendar } from 'lucide-react';
import { ordersAPI } from '../services/api';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getById(id);
      setOrder(response.data.order);
    } catch (error) {
      setError('Failed to load order');
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (status) => {
    try {
      setUpdating(true);
      await ordersAPI.updateStatus(id, { status });
      setOrder({ ...order, status });
    } catch (error) {
      setError('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const updatePaymentStatus = async (paymentStatus) => {
    try {
      setUpdating(true);
      await ordersAPI.updatePaymentStatus(id, { paymentStatus });
      setOrder({ ...order, paymentStatus });
    } catch (error) {
      setError('Failed to update payment status');
    } finally {
      setUpdating(false);
    }
  };

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

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      case 'refunded':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
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

  if (error || !order) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error || 'Order not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/orders')}
            className="p-2 text-earth-600 hover:text-earth-900 hover:bg-earth-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold text-earth-900 mb-2">
              Order #{order.orderNumber || order._id}
            </h1>
            <p className="text-earth-600">Order ID: {order._id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateOrderStatus('cancelled')}
            disabled={updating || order.status === 'cancelled'}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <XCircle className="h-4 w-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Order Items
            </h2>
            <div className="space-y-4">
              {order.items && order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-earth-50 rounded-lg">
                  <div className="h-16 w-16 rounded-lg bg-earth-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {item.product?.thumbnail || item.product?.images?.[0] ? (
                      <img
                        src={item.product?.thumbnail || item.product?.images?.[0]}
                        alt={item.product?.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Package className="h-8 w-8 text-earth-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-earth-900">{item.product?.name}</p>
                    <p className="text-sm text-earth-600">
                      {item.mushroomType} • {item.productType}
                    </p>
                    <p className="text-sm text-earth-600">
                      Quantity: {item.quantity} • Price: ₹{item.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-earth-900">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Customer Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-earth-600 mt-1" />
                <div>
                  <p className="font-semibold text-earth-900">{order.user?.name}</p>
                  <p className="text-sm text-earth-600">{order.user?.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-earth-600 mt-1" />
                <p className="text-earth-900">{order.shippingAddress?.phone}</p>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-earth-600 mt-1" />
                <div>
                  <p className="text-earth-900">{order.shippingAddress?.street}</p>
                  <p className="text-earth-900">{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                  <p className="text-earth-900">{order.shippingAddress?.zipCode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Order Timeline
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-earth-600 mt-1" />
                <div>
                  <p className="font-semibold text-earth-900">Order Placed</p>
                  <p className="text-sm text-earth-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {order.updatedAt && order.updatedAt !== order.createdAt && (
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-earth-600 mt-1" />
                  <div>
                    <p className="font-semibold text-earth-900">Last Updated</p>
                    <p className="text-sm text-earth-600">
                      {new Date(order.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Status */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Order Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-earth-700">Current Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="border-t border-earth-200 pt-4">
                <p className="text-sm font-semibold text-earth-700 mb-2">Update Status:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateOrderStatus('pending')}
                    disabled={updating}
                    className="px-3 py-2 text-sm rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors disabled:opacity-50"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => updateOrderStatus('processing')}
                    disabled={updating}
                    className="px-3 py-2 text-sm rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors disabled:opacity-50"
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => updateOrderStatus('shipped')}
                    disabled={updating}
                    className="px-3 py-2 text-sm rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    Shipped
                  </button>
                  <button
                    onClick={() => updateOrderStatus('delivered')}
                    disabled={updating}
                    className="px-3 py-2 text-sm rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                  >
                    Delivered
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Payment Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-earth-700">Payment Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus?.charAt(0).toUpperCase() + order.paymentStatus?.slice(1) || 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-earth-700 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Method
                </span>
                <span className="text-earth-900 capitalize">{order.paymentMethod || 'N/A'}</span>
              </div>
              <div className="border-t border-earth-200 pt-4">
                <p className="text-sm font-semibold text-earth-700 mb-2">Update Payment:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updatePaymentStatus('pending')}
                    disabled={updating}
                    className="px-3 py-2 text-sm rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors disabled:opacity-50"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => updatePaymentStatus('paid')}
                    disabled={updating}
                    className="px-3 py-2 text-sm rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                  >
                    Paid
                  </button>
                  <button
                    onClick={() => updatePaymentStatus('failed')}
                    disabled={updating}
                    className="px-3 py-2 text-sm rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                  >
                    Failed
                  </button>
                  <button
                    onClick={() => updatePaymentStatus('refunded')}
                    disabled={updating}
                    className="px-3 py-2 text-sm rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors disabled:opacity-50"
                  >
                    Refunded
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-earth-700">Subtotal</span>
                <span className="text-earth-900">₹{order.subtotal || order.totalAmount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-earth-700">Shipping</span>
                <span className="text-earth-900">₹{order.shippingCost || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-earth-700">Tax</span>
                <span className="text-earth-900">₹{order.tax || 0}</span>
              </div>
              {order.discount && (
                <div className="flex items-center justify-between">
                  <span className="text-earth-700">Discount</span>
                  <span className="text-green-600">-₹{order.discount}</span>
                </div>
              )}
              <div className="border-t border-earth-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-earth-900 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Total
                  </span>
                  <span className="text-2xl font-bold text-earth-900">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-white rounded-xl p-6 border border-earth-100">
              <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
                Order Notes
              </h2>
              <p className="text-earth-700">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
