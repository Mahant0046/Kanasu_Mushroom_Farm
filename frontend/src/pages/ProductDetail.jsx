import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Plus, Minus, Truck, Shield, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productsAPI, reviewsAPI } from '../services/api';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await productsAPI.getBySlug(slug);
        setProduct(productRes.data.product);
        
        const reviewsRes = await reviewsAPI.getByProduct(productRes.data.product._id);
        setReviews(reviewsRes.data.reviews || []);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-semibold text-earth-900 mb-4">
          Product not found
        </h2>
        <Link to="/shop" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="text-sm text-earth-600 mb-8">
          <Link to="/" className="hover:text-forest-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-forest-600">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-earth-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-earth-50 rounded-2xl overflow-hidden mb-4">
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-9xl">
                  🍄
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-earth-50 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-medium text-forest-600 bg-forest-50 px-3 py-1 rounded-full capitalize">
                {product.mushroomType}
              </span>
              <span className="text-xs font-medium text-earth-600 bg-earth-100 px-3 py-1 rounded-full capitalize">
                {product.productType.replace('-', ' ')}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-semibold text-earth-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating.average)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-earth-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-earth-600">
                {product.rating.average} ({product.rating.count} reviews)
              </span>
            </div>

            <div className="mb-6">
              <p className="text-3xl font-bold text-earth-900">
                ₹{product.price}
              </p>
              {product.weight && (
                <p className="text-earth-600">
                  per {product.weight.value}{product.weight.unit}
                </p>
              )}
            </div>

            <p className="text-earth-600 mb-6">
              {product.description}
            </p>

            {product.stock <= product.lowStockThreshold && product.stock > 0 && (
              <div className="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-2 rounded-lg mb-6">
                Only {product.stock} items left in stock!
              </div>
            )}

            {product.stock === 0 && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-6">
                Out of Stock
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border border-earth-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-earth-50 transition-colors"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-16 text-center font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={product.stock === 0}
                  className="p-3 hover:bg-earth-50 transition-colors disabled:opacity-50"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-earth-50 rounded-lg">
                <Truck className="h-6 w-6 text-forest-600 mx-auto mb-2" />
                <p className="text-xs text-earth-600">Fast Delivery</p>
              </div>
              <div className="text-center p-4 bg-earth-50 rounded-lg">
                <Shield className="h-6 w-6 text-forest-600 mx-auto mb-2" />
                <p className="text-xs text-earth-600">Quality Assured</p>
              </div>
              <div className="text-center p-4 bg-earth-50 rounded-lg">
                <Leaf className="h-6 w-6 text-forest-600 mx-auto mb-2" />
                <p className="text-xs text-earth-600">100% Organic</p>
              </div>
            </div>

            {/* Nutrition Info */}
            {product.nutritionInfo && (
              <div className="mb-8">
                <h3 className="font-semibold text-earth-900 mb-3">Nutrition Information</h3>
                <div className="bg-earth-50 rounded-lg p-4 grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(product.nutritionInfo).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-earth-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Health Benefits */}
            {product.healthBenefits && product.healthBenefits.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-earth-900 mb-3">Health Benefits</h3>
                <ul className="space-y-2">
                  {product.healthBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-forest-600 mr-2">•</span>
                      <span className="text-earth-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Storage Instructions */}
            {product.storageInstructions && (
              <div>
                <h3 className="font-semibold text-earth-900 mb-3">Storage Instructions</h3>
                <p className="text-earth-600">{product.storageInstructions}</p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title">Customer Reviews</h2>
            <div className="space-y-6 mt-8">
              {reviews.map((review) => (
                <div key={review._id} className="card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-earth-900">
                          {review.user?.name || 'Anonymous'}
                        </span>
                        {review.isVerifiedPurchase && (
                          <span className="text-xs text-forest-600 bg-forest-50 px-2 py-1 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-earth-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-earth-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {review.title && (
                    <h4 className="font-semibold text-earth-900 mb-2">
                      {review.title}
                    </h4>
                  )}
                  <p className="text-earth-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
