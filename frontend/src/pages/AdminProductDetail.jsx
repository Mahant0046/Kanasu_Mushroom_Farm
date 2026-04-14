import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Package, DollarSign, Box, Star, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { productsAPI } from '../services/api';

const AdminProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      setProduct(response.data.product);
    } catch (error) {
      setError('Failed to load product');
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await productsAPI.delete(id);
      navigate('/admin/products');
    } catch (error) {
      setError('Failed to delete product');
      setDeleting(false);
    }
  };

  const toggleActive = async () => {
    try {
      const updatedProduct = { ...product, isActive: !product.isActive };
      await productsAPI.update(id, updatedProduct);
      setProduct(updatedProduct);
    } catch (error) {
      setError('Failed to update product status');
    }
  };

  const toggleFeatured = async () => {
    try {
      const updatedProduct = { ...product, featured: !product.featured };
      await productsAPI.update(id, updatedProduct);
      setProduct(updatedProduct);
    } catch (error) {
      setError('Failed to update featured status');
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

  if (error || !product) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error || 'Product not found'}
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
            onClick={() => navigate('/admin/products')}
            className="p-2 text-earth-600 hover:text-earth-900 hover:bg-earth-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold text-earth-900 mb-2">
              {product.name}
            </h1>
            <p className="text-earth-600">Product ID: {product._id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(`/admin/products/${id}/edit`)}
            className="flex items-center space-x-2 bg-forest-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-forest-700 transition-colors"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
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
          {/* Product Images */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Product Images
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                ))
              ) : product.thumbnail ? (
                <div className="col-span-2">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="col-span-2 bg-earth-50 rounded-lg h-48 flex items-center justify-center text-earth-400">
                  No images available
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-earth-600">Slug</label>
                <p className="text-earth-900">{product.slug}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-earth-600">Description</label>
                <p className="text-earth-900 whitespace-pre-wrap">{product.description}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-earth-600">Category</label>
                <p className="text-earth-900">{product.category?.name || 'Uncategorized'}</p>
              </div>
            </div>
          </div>

          {/* Nutrition Information */}
          {product.nutritionInfo && (
            <div className="bg-white rounded-xl p-6 border border-earth-100">
              <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
                Nutrition Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-earth-600">Calories</label>
                  <p className="text-earth-900">{product.nutritionInfo.calories || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-earth-600">Protein</label>
                  <p className="text-earth-900">{product.nutritionInfo.protein || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-earth-600">Fiber</label>
                  <p className="text-earth-900">{product.nutritionInfo.fiber || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-earth-600">Vitamins</label>
                  <p className="text-earth-900">{product.nutritionInfo.vitamins || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Growing Information */}
          {product.growingInfo && (
            <div className="bg-white rounded-xl p-6 border border-earth-100">
              <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
                Growing Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-earth-600">Difficulty</label>
                  <p className="text-earth-900">{product.growingInfo.difficulty || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-earth-600">Growth Time</label>
                  <p className="text-earth-900">{product.growingInfo.growthTime || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-earth-600">Temperature</label>
                  <p className="text-earth-900">{product.growingInfo.temperature || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-earth-600">Humidity</label>
                  <p className="text-earth-900">{product.growingInfo.humidity || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-earth-700">Active</span>
                <button
                  onClick={toggleActive}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                    product.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {product.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  <span>{product.isActive ? 'Visible' : 'Hidden'}</span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-earth-700">Featured</span>
                <button
                  onClick={toggleFeatured}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                    product.featured
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Star className={`h-4 w-4 ${product.featured ? 'fill-current' : ''}`} />
                  <span>{product.featured ? 'Featured' : 'Regular'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Pricing
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-earth-700 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Price
                </span>
                <span className="text-2xl font-bold text-earth-900">₹{product.price}</span>
              </div>
              {product.compareAtPrice && (
                <div className="flex items-center justify-between">
                  <span className="text-earth-700">Compare At</span>
                  <span className="text-lg text-earth-500 line-through">₹{product.compareAtPrice}</span>
                </div>
              )}
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Inventory
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-earth-700 flex items-center">
                <Box className="h-4 w-4 mr-2" />
                Stock
              </span>
              <div className="text-right">
                <span className={`text-2xl font-bold ${product.stock < 10 ? 'text-red-600' : 'text-earth-900'}`}>
                  {product.stock}
                </span>
                {product.stock < 10 && (
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Low stock
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Product Type */}
          <div className="bg-white rounded-xl p-6 border border-earth-100">
            <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Product Type
            </h2>
            <div className="space-y-2">
              {product.mushroomType && (
                <div>
                  <label className="text-sm font-semibold text-earth-600">Mushroom Type</label>
                  <p className="text-earth-900 capitalize">{product.mushroomType}</p>
                </div>
              )}
              {product.productType && (
                <div>
                  <label className="text-sm font-semibold text-earth-600">Product Type</label>
                  <p className="text-earth-900 capitalize">{product.productType}</p>
                </div>
              )}
              {product.weight && (
                <div>
                  <label className="text-sm font-semibold text-earth-600">Weight</label>
                  <p className="text-earth-900">{product.weight.value} {product.weight.unit}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-display font-semibold text-earth-900 mb-4">
              Delete Product
            </h3>
            <p className="text-earth-600 mb-6">
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="px-4 py-2 border border-gray-300 rounded-lg text-earth-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductDetail;
