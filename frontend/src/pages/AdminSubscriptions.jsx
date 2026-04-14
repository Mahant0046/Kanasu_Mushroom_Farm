import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, User, Calendar, Check, X, Pause, Play, Eye } from 'lucide-react';
import { subscriptionsAPI } from '../services/api';

const AdminSubscriptions = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await subscriptionsAPI.getAll();
        setSubscriptions(response.data.subscriptions || []);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);

  const handlePause = async (subscriptionId) => {
    try {
      await subscriptionsAPI.pause(subscriptionId);
      setSubscriptions(subscriptions.map(s => 
        s._id === subscriptionId ? { ...s, status: 'paused' } : s
      ));
    } catch (error) {
      console.error('Error pausing subscription:', error);
    }
  };

  const handleResume = async (subscriptionId) => {
    try {
      await subscriptionsAPI.resume(subscriptionId);
      setSubscriptions(subscriptions.map(s => 
        s._id === subscriptionId ? { ...s, status: 'active' } : s
      ));
    } catch (error) {
      console.error('Error resuming subscription:', error);
    }
  };

  const handleCancel = async (subscriptionId) => {
    if (!window.confirm('Are you sure you want to cancel this subscription?')) return;

    try {
      await subscriptionsAPI.cancel(subscriptionId);
      setSubscriptions(subscriptions.map(s => 
        s._id === subscriptionId ? { ...s, status: 'cancelled' } : s
      ));
    } catch (error) {
      console.error('Error cancelling subscription:', error);
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
      default:
        return 'bg-earth-100 text-earth-700';
    }
  };

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
          Manage Subscriptions
        </h1>
        <p className="text-earth-600">{subscriptions.length} subscriptions</p>
      </div>

      {subscriptions.length === 0 ? (
        <div className="card p-12 text-center">
          <Package className="h-16 w-16 text-earth-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-earth-900 mb-2">
            No subscriptions yet
          </h3>
          <p className="text-earth-600">
            Subscriptions will appear here once customers start subscribing.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <div key={subscription._id} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(subscription.status)}`}>
                      {subscription.status}
                    </span>
                    <span className="text-sm text-earth-500">
                      #{subscription.subscriptionNumber}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-earth-400" />
                      <div>
                        <p className="text-xs text-earth-500">Customer</p>
                        <p className="text-sm font-medium text-earth-900">
                          {subscription.user?.name || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-earth-400" />
                      <div>
                        <p className="text-xs text-earth-500">Items</p>
                        <p className="text-sm font-medium text-earth-900">
                          {subscription.items?.length || 0}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-earth-400" />
                      <div>
                        <p className="text-xs text-earth-500">Frequency</p>
                        <p className="text-sm font-medium text-earth-900 capitalize">
                          {subscription.frequency}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-earth-500">Total</p>
                      <p className="text-sm font-semibold text-earth-900">
                        ₹{subscription.total}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-earth-600">
                    <p>Shipping: {subscription.shippingAddress?.street}, {subscription.shippingAddress?.city}</p>
                    <p className="text-xs text-earth-500 mt-1">
                      Next delivery: {subscription.nextDeliveryDate ? new Date(subscription.nextDeliveryDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate(`/admin/subscriptions/${subscription._id}`)}
                    className="p-2 text-earth-600 hover:text-forest-600 hover:bg-earth-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  {subscription.status === 'active' && (
                    <>
                      <button
                        onClick={() => handlePause(subscription._id)}
                        className="p-2 text-earth-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Pause Subscription"
                      >
                        <Pause className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleCancel(subscription._id)}
                        className="p-2 text-earth-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Cancel Subscription"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  {subscription.status === 'paused' && (
                    <button
                      onClick={() => handleResume(subscription._id)}
                      className="p-2 text-earth-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Resume Subscription"
                    >
                      <Play className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSubscriptions;
