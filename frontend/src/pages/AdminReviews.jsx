import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Trash2, Eye } from 'lucide-react';
import { reviewsAPI } from '../services/api';

const AdminReviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch all products first, then get reviews for each
        // This is a workaround since there's no admin endpoint to get all reviews
        const response = await fetch('http://localhost:5000/api/reviews/all', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setReviews(data.reviews || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await reviewsAPI.delete(reviewId);
      setReviews(reviews.filter(r => r._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
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
          Manage Reviews
        </h1>
        <p className="text-earth-600">{reviews.length} reviews</p>
      </div>

      {reviews.length === 0 ? (
        <div className="card p-12 text-center">
          <Star className="h-16 w-16 text-earth-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-earth-900 mb-2">
            No reviews yet
          </h3>
          <p className="text-earth-600">
            Reviews will appear here once customers start reviewing products.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-earth-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-earth-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-semibold text-earth-900 mb-2">
                    {review.user?.name || 'Anonymous User'}
                  </h4>
                  <p className="text-earth-700 mb-3">{review.comment}</p>
                  <p className="text-sm text-earth-500">
                    Product: {review.product?.name || 'Unknown'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate(`/admin/reviews/${review._id}`)}
                    className="p-2 text-earth-600 hover:text-forest-600 hover:bg-earth-50 rounded-lg transition-colors"
                    title="View Review"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="p-2 text-earth-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
