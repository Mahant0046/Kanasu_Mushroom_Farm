import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Package, Pause, Play, X, Edit, Check, AlertCircle } from 'lucide-react';
import { subscriptionsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const MySubscriptions = () => {
  const { isAuthenticated } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscriptions();
    }
  }, [isAuthenticated]);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await subscriptionsAPI.getMySubscriptions();
      setSubscriptions(response.data.subscriptions || []);
    } catch (error) {
      setError('Failed to load subscriptions');
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePause = async (subscriptionId) => {
    try {
      await subscriptionsAPI.pause(subscriptionId);
      fetchSubscriptions();
    } catch (error) {
      setError('Failed to pause subscription');
      console.error('Error pausing subscription:', error);
    }
  };

  const handleResume = async (subscriptionId) => {
    try {
      await subscriptionsAPI.resume(subscriptionId);
      fetchSubscriptions();
    } catch (error) {
      setError('Failed to resume subscription');
      console.error('Error resuming subscription:', error);
    }
  };

  const handleCancel = async (subscriptionId) => {
    if (window.confirm('Are you sure you want to cancel this subscription? This action cannot be undone.')) {
      try {
        await subscriptionsAPI.cancel(subscriptionId);
        fetchSubscriptions();
      } catch (error) {
        setError('Failed to cancel subscription');
        console.error('Error cancelling subscription:', error);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-700', icon: <Check className="h-4 w-4" /> },
      paused: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: <Pause className="h-4 w-4" /> },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: <X className="h-4 w-4" /> },
      completed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: <Check className="h-4 w-4" /> }
    };
    const config = statusConfig[status] || statusConfig.active;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getFrequencyLabel = (frequency) => {
    const labels = {
      weekly: 'Every Week',
      'bi-weekly': 'Every 2 Weeks',
      monthly: 'Every Month'
    };
    return labels[frequency] || frequency;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-forest-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-earth-900 mb-4">Please Login</h2>
          <p className="text-earth-600 mb-6">You need to login to view your subscriptions</p>
          <Link to="/login" className="btn-primary px-6 py-3 rounded-lg font-semibold">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest-50 py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-earth-900 mb-2">My Subscriptions</h1>
          <p className="text-earth-600">Manage your mushroom subscriptions</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {/* Subscriptions List */}
        {subscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <Package className="h-16 w-16 text-earth-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-earth-900 mb-2">No Subscriptions Yet</h3>
            <p className="text-earth-600 mb-6">Start subscribing to get fresh mushrooms delivered to your doorstep</p>
            <Link to="/subscriptions" className="btn-primary px-6 py-3 rounded-lg font-semibold">
              Browse Subscription Plans
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {subscriptions.map((subscription) => (
              <div key={subscription._id} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Subscription Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <span className="text-sm text-earth-500">Subscription #{subscription.subscriptionNumber}</span>
                        <div className="flex items-center gap-3 mt-1">
                          <h3 className="text-xl font-bold text-earth-900">
                            {getFrequencyLabel(subscription.deliveryFrequency)}
                          </h3>
                          {getStatusBadge(subscription.status)}
                        </div>
                      </div>
                    </div>

                    {/* Delivery Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-forest-600" />
                        <div>
                          <p className="text-sm text-earth-500">Delivery Day</p>
                          <p className="font-medium text-earth-900 capitalize">
                            {subscription.deliveryDay}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-forest-600" />
                        <div>
                          <p className="text-sm text-earth-500">Next Delivery</p>
                          <p className="font-medium text-earth-900">
                            {subscription.nextDeliveryDate
                              ? new Date(subscription.nextDeliveryDate).toLocaleDateString()
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-forest-600" />
                        <div>
                          <p className="text-sm text-earth-500">Delivery To</p>
                          <p className="font-medium text-earth-900">
                            {subscription.shippingAddress.city}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="mb-4">
                      <p className="text-sm text-earth-500 mb-2">Items</p>
                      <div className="flex flex-wrap gap-2">
                        {subscription.items.map((item, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 bg-forest-50 text-earth-700 px-3 py-1 rounded-full text-sm"
                          >
                            <Package className="h-4 w-4" />
                            {item.name} x {item.quantity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-forest-50 rounded-lg p-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-earth-600">Subtotal</span>
                        <span className="font-medium text-earth-900">₹{subscription.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-earth-600">Shipping</span>
                        <span className={`font-medium ${subscription.shippingFee === 0 ? 'text-green-600' : 'text-earth-900'}`}>
                          {subscription.shippingFee === 0 ? 'FREE' : `₹${subscription.shippingFee}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t border-earth-200 pt-2 mt-2">
                        <span className="text-earth-900">Total</span>
                        <span className="text-forest-600">₹{subscription.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 lg:w-48">
                    {subscription.status === 'active' && (
                      <>
                        <button
                          onClick={() => handlePause(subscription._id)}
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors font-medium"
                        >
                          <Pause className="h-4 w-4" />
                          Pause
                        </button>
                        <button
                          onClick={() => handleCancel(subscription._id)}
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </button>
                      </>
                    )}
                    {subscription.status === 'paused' && (
                      <button
                        onClick={() => handleResume(subscription._id)}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                      >
                        <Play className="h-4 w-4" />
                        Resume
                      </button>
                    )}
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-forest-100 text-forest-700 rounded-lg hover:bg-forest-200 transition-colors font-medium">
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-earth-200 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-forest-600">{subscription.totalDeliveries || 0}</p>
                    <p className="text-sm text-earth-600">Total Deliveries</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-forest-600">{subscription.completedDeliveries || 0}</p>
                    <p className="text-sm text-earth-600">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-forest-600">
                      {new Date(subscription.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-earth-600">Started On</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-forest-600">
                      {subscription.endDate ? new Date(subscription.endDate).toLocaleDateString() : 'Active'}
                    </p>
                    <p className="text-sm text-earth-600">End Date</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {subscriptions.length > 0 && (
          <div className="mt-12 text-center">
            <Link to="/subscriptions" className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg">
              Create New Subscription
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubscriptions;
