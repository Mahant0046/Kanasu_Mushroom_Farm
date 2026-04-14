import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, User, Calendar, Package, ThumbsUp, Trash2, CheckCircle, XCircle, AlertTriangle, Flag } from 'lucide-react';
import { reviewsAPI } from '../services/api';

const AdminReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchReview();
  }, [id]);

  const fetchReview = async () => {
    try {
      setLoading(true);
      const response = await reviewsAPI.getById(id);
      setReview(response.data.review);
    } catch (error) {
      setError('Failed to load review');
      console.error('Error fetching review:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        setUpdating(true);
        await reviewsAPI.delete(id);
        navigate('/admin/reviews');
      } catch (error) {
        setError('Failed to delete review');
        setUpdating(false);
      }
    }
  };

  const handleMarkHelpful = async () => {
    try {
      setUpdating(true);
      await reviewsAPI.markHelpful(id);
      setReview({ ...review, helpful: !review.helpful });
      setUpdating(false);
    } catch (error) {
      setError('Failed to update review');
      setUpdating(false);
    }
  };

  const handleApprove = async () => {
    try {
      setUpdating(true);
      await reviewsAPI.update(id, { approved: true });
      setReview({ ...review, approved: true });
      setUpdating(false);
    } catch (error) {
      setError('Failed to approve review');
      setUpdating(false);
    }
  };

  const handleReject = async () => {
    try {
      setUpdating(true);
      await reviewsAPI.update(id, { approved: false });
      setReview({ ...review, approved: false });
      setUpdating(false);
    } catch (error) {
      setError('Failed to reject review');
      setUpdating(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
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

  if (error || !review) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error || 'Review not found'}
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
            onClick={() => navigate('/admin/reviews')}
            className="p-2 text-earth-600 hover:text-earth-900 hover:bg-earth-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold text-earth-900 mb-2">
              Review Details
            </h1>
            <p className="text-earth-600">Review ID: {review._id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleMarkHelpful}
            disabled={updating}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{review.helpful ? 'Unmark Helpful' : 'Mark Helpful'}</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={updating}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
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
          {/* Review Content */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-forest-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-forest-600" />
                </div>
                <div>
                  <p className="font-semibold text-earth-900">{review.user?.name || 'Anonymous'}</p>
                  <p className="text-sm text-earth-600">{review.user?.email || 'No email'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(review.rating)}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-earth-900 mb-2">{review.title || 'No Title'}</h3>
              <p className="text-earth-700 whitespace-pre-wrap">{review.comment || 'No comment provided'}</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-earth-600">
              <Calendar className="h-4 w-4" />
              <span>{new Date(review.createdAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Product Information */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Product Information
            </h2>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-lg bg-earth-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                {review.product?.thumbnail || review.product?.images?.[0] ? (
                  <img
                    src={review.product?.thumbnail || review.product?.images?.[0]}
                    alt={review.product?.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Package className="h-8 w-8 text-earth-400" />
                )}
              </div>
              <div>
                <p className="font-semibold text-earth-900">{review.product?.name || 'Unknown Product'}</p>
                <p className="text-sm text-earth-600">
                  {review.product?.mushroomType} • {review.product?.productType}
                </p>
                <p className="text-sm text-earth-600">₹{review.product?.price}</p>
              </div>
            </div>
          </div>

          {/* Review Metadata */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Review Metadata
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-earth-600">Verified Purchase</label>
                <p className="text-earth-900">{review.verified ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-earth-600">Helpful Count</label>
                <p className="text-earth-900">{review.helpfulCount || 0}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-earth-600">Marked Helpful</label>
                <p className="text-earth-900">{review.helpful ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-earth-600">Created At</label>
                <p className="text-earth-900">{new Date(review.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Review Status */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Review Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-earth-700">Approved</span>
                {review.approved ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div className="border-t border-earth-200 pt-4">
                <p className="text-sm font-semibold text-earth-700 mb-2">Actions:</p>
                <div className="space-y-2">
                  <button
                    onClick={handleApprove}
                    disabled={updating}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Approve Review</span>
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={updating}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Reject Review</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Rating Breakdown
            </h2>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-20">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-earth-600">{star}</span>
                  </div>
                  <div className="flex-1 bg-earth-100 rounded-full h-2">
                    <div
                      className="bg-forest-600 h-2 rounded-full"
                      style={{ width: star === review.rating ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate(`/product/${review.product?.slug}`)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-forest-100 text-forest-700 rounded-lg hover:bg-forest-200 transition-colors"
              >
                <Package className="h-4 w-4" />
                <span>View Product</span>
              </button>
              <button
                onClick={() => navigate(`/admin/products/${review.product?._id}`)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-earth-100 text-earth-700 rounded-lg hover:bg-earth-200 transition-colors"
              >
                <Package className="h-4 w-4" />
                <span>Edit Product</span>
              </button>
              {review.verified === false && (
                <button
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Flag for Verification</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviewDetail;
