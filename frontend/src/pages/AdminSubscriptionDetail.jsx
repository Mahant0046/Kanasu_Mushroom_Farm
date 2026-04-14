import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Package, CreditCard, MapPin, Pause, Play, XCircle, CheckCircle, AlertCircle, RefreshCw, DollarSign, Clock } from 'lucide-react';
import { subscriptionsAPI } from '../services/api';

const AdminSubscriptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, [id]);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      const response = await subscriptionsAPI.getById(id);
      setSubscription(response.data.subscription);
    } catch (error) {
      setError('Failed to load subscription');
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePause = async () => {
    try {
      setUpdating(true);
      await subscriptionsAPI.pause(id);
      setSubscription({ ...subscription, status: 'paused' });
      setUpdating(false);
    } catch (error) {
      setError('Failed to pause subscription');
      setUpdating(false);
    }
  };

  const handleResume = async () => {
    try {
      setUpdating(true);
      await subscriptionsAPI.resume(id);
      setSubscription({ ...subscription, status: 'active' });
      setUpdating(false);
    } catch (error) {
      setError('Failed to resume subscription');
      setUpdating(false);
    }
  };

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel this subscription?')) {
      try {
        setUpdating(true);
        await subscriptionsAPI.cancel(id);
        setSubscription({ ...subscription, status: 'cancelled' });
        setUpdating(false);
      } catch (error) {
        setError('Failed to cancel subscription');
        setUpdating(false);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'expired':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-blue-100 text-blue-700';
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

  if (error || !subscription) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error || 'Subscription not found'}
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
            onClick={() => navigate('/admin/subscriptions')}
            className="p-2 text-earth-600 hover:text-earth-900 hover:bg-earth-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold text-earth-900 mb-2">
              Subscription #{subscription.subscriptionNumber || subscription._id}
            </h1>
            <p className="text-earth-600">Subscription ID: {subscription._id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {subscription.status === 'active' && (
            <button
              onClick={handlePause}
              disabled={updating}
              className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Pause className="h-4 w-4" />
              <span>Pause</span>
            </button>
          )}
          {subscription.status === 'paused' && (
            <button
              onClick={handleResume}
              disabled={updating}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="h-4 w-4" />
              <span>Resume</span>
            </button>
          )}
          {subscription.status !== 'cancelled' && subscription.status !== 'expired' && (
            <button
              onClick={handleCancel}
              disabled={updating}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          )}
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
          {/* Subscription Details */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Subscription Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-earth-600">Plan Type</label>
                <p className="text-earth-900 capitalize">{subscription.planType || 'Standard'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-earth-600">Frequency</label>
                <p className="text-earth-900 capitalize">{subscription.frequency || 'Monthly'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-earth-600">Delivery Day</label>
                <p className="text-earth-900 capitalize">{subscription.deliveryDay || 'Monday'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-earth-600">Quantity</label>
                <p className="text-earth-900">{subscription.quantity || 1} items</p>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Product Information
            </h2>
            <div className="space-y-4">
              {subscription.items && subscription.items.map((item, index) => (
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
                      {item.product?.mushroomType} • {item.product?.productType}
                    </p>
                    <p className="text-sm text-earth-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-earth-900">₹{item.price}</p>
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
                  <p className="font-semibold text-earth-900">{subscription.user?.name}</p>
                  <p className="text-sm text-earth-600">{subscription.user?.email}</p>
                  <p className="text-sm text-earth-600">{subscription.user?.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-earth-600 mt-1" />
                <div>
                  <p className="text-earth-900">{subscription.shippingAddress?.street}</p>
                  <p className="text-earth-900">{subscription.shippingAddress?.city}, {subscription.shippingAddress?.state}</p>
                  <p className="text-earth-900">{subscription.shippingAddress?.zipCode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery History */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Delivery History
            </h2>
            <div className="space-y-3">
              {subscription.deliveryHistory && subscription.deliveryHistory.length > 0 ? (
                subscription.deliveryHistory.map((delivery, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-earth-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-earth-600" />
                      <div>
                        <p className="font-semibold text-earth-900">{new Date(delivery.date).toLocaleDateString()}</p>
                        <p className="text-sm text-earth-600">{delivery.status}</p>
                      </div>
                    </div>
                    {delivery.status === 'delivered' && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-earth-600 text-center py-4">No delivery history yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Subscription Status */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Subscription Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-earth-700">Current Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}>
                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                </span>
              </div>
              {subscription.status === 'active' && (
                <div className="flex items-center space-x-2 text-sm text-earth-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Subscription is active and running</span>
                </div>
              )}
              {subscription.status === 'paused' && (
                <div className="flex items-center space-x-2 text-sm text-earth-600 bg-yellow-50 p-3 rounded-lg">
                  <Pause className="h-4 w-4 text-yellow-600" />
                  <span>Subscription is paused</span>
                </div>
              )}
              {subscription.status === 'cancelled' && (
                <div className="flex items-center space-x-2 text-sm text-earth-600 bg-red-50 p-3 rounded-lg">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span>Subscription has been cancelled</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Payment Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-earth-700 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Monthly Amount
                </span>
                <span className="font-bold text-earth-900">₹{subscription.amount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-earth-700 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Method
                </span>
                <span className="text-earth-900 capitalize">{subscription.paymentMethod || 'Card'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-earth-700 flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Next Billing
                </span>
                <span className="text-earth-900">
                  {subscription.nextBillingDate ? new Date(subscription.nextBillingDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Timeline
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-earth-600 mt-1" />
                <div>
                  <p className="font-semibold text-earth-900">Started On</p>
                  <p className="text-sm text-earth-600">
                    {new Date(subscription.startDate).toLocaleString()}
                  </p>
                </div>
              </div>
              {subscription.endDate && (
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-earth-600 mt-1" />
                  <div>
                    <p className="font-semibold text-earth-900">Ends On</p>
                    <p className="text-sm text-earth-600">
                      {new Date(subscription.endDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-earth-600 mt-1" />
                <div>
                  <p className="font-semibold text-earth-900">Last Updated</p>
                  <p className="text-sm text-earth-600">
                    {new Date(subscription.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {subscription.notes && (
            <div className="bg-white rounded-xl p-6 border border-earth-100">
              <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
                Notes
              </h2>
              <p className="text-earth-700">{subscription.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptionDetail;
