import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Package, X, Plus, Save, ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';
import { productsAPI, categoriesAPI } from '../../services/api';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    compareAtPrice: '',
    category: '',
    stock: '',
    images: [],
    featured: false,
    isActive: true,
    nutritionInfo: {
      calories: '',
      protein: '',
      fiber: '',
      vitamins: ''
    },
    growingInfo: {
      difficulty: '',
      growthTime: '',
      temperature: '',
      humidity: ''
    }
  });

  const [imageUrls, setImageUrls] = useState(['']);

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      const product = response.data.product;
      
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        description: product.description || '',
        price: product.price || '',
        compareAtPrice: product.compareAtPrice || '',
        category: product.category?._id || '',
        stock: product.stock || '',
        images: product.images || [],
        featured: product.featured || false,
        isActive: product.isActive !== false,
        nutritionInfo: product.nutritionInfo || {
          calories: '',
          protein: '',
          fiber: '',
          vitamins: ''
        },
        growingInfo: product.growingInfo || {
          difficulty: '',
          growthTime: '',
          temperature: '',
          humidity: ''
        }
      });
      
      setImageUrls(product.images?.length ? [...product.images, ''] : ['']);
    } catch (error) {
      setError('Failed to load product');
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
    setFormData(prev => ({
      ...prev,
      images: newUrls.filter(url => url.trim() !== '')
    }));
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageField = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    setFormData(prev => ({
      ...prev,
      images: newUrls.filter(url => url.trim() !== '')
    }));
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : undefined,
        stock: parseInt(formData.stock),
        images: formData.images.filter(url => url.trim() !== '')
      };

      if (isEdit) {
        await productsAPI.update(id, payload);
      } else {
        await productsAPI.create(payload);
      }

      navigate('/admin/products');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save product');
      console.error('Error saving product:', error);
    } finally {
      setSubmitting(false);
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
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-earth-600">
              {isEdit ? 'Update product information' : 'Create a new mushroom product'}
            </p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center space-x-2 bg-forest-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-5 w-5" />
          <span>{submitting ? 'Saving...' : 'Save Product'}</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl p-6 border border-earth-100">
              <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
                Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    required
                    placeholder="e.g., Button Mushrooms"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="button-mushrooms"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe the product..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl p-6 border border-earth-100">
              <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
                Product Images
              </h2>
              <div className="space-y-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                      />
                    </div>
                    {imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="flex items-center space-x-2 text-forest-600 hover:text-forest-700 font-semibold"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Another Image</span>
                </button>
              </div>
            </div>

            {/* Nutrition Information */}
            <div className="bg-white rounded-xl p-6 border border-earth-100">
              <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
                Nutrition Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Calories (per 100g)
                  </label>
                  <input
                    type="text"
                    name="nutritionInfo.calories"
                    value={formData.nutritionInfo.calories}
                    onChange={handleChange}
                    placeholder="e.g., 22 kcal"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Protein (g)
                  </label>
                  <input
                    type="text"
                    name="nutritionInfo.protein"
                    value={formData.nutritionInfo.protein}
                    onChange={handleChange}
                    placeholder="e.g., 3.1g"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Fiber (g)
                  </label>
                  <input
                    type="text"
                    name="nutritionInfo.fiber"
                    value={formData.nutritionInfo.fiber}
                    onChange={handleChange}
                    placeholder="e.g., 1g"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Vitamins
                  </label>
                  <input
                    type="text"
                    name="nutritionInfo.vitamins"
                    value={formData.nutritionInfo.vitamins}
                    onChange={handleChange}
                    placeholder="e.g., B, D, Selenium"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Growing Information */}
            <div className="bg-white rounded-xl p-6 border border-earth-100">
              <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
                Growing Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Difficulty
                  </label>
                  <input
                    type="text"
                    name="growingInfo.difficulty"
                    value={formData.growingInfo.difficulty}
                    onChange={handleChange}
                    placeholder="e.g., Easy"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Growth Time
                  </label>
                  <input
                    type="text"
                    name="growingInfo.growthTime"
                    value={formData.growingInfo.growthTime}
                    onChange={handleChange}
                    placeholder="e.g., 2-3 weeks"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Temperature
                  </label>
                  <input
                    type="text"
                    name="growingInfo.temperature"
                    value={formData.growingInfo.temperature}
                    onChange={handleChange}
                    placeholder="e.g., 20-25°C"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Humidity
                  </label>
                  <input
                    type="text"
                    name="growingInfo.humidity"
                    value={formData.growingInfo.humidity}
                    onChange={handleChange}
                    placeholder="e.g., 80-90%"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing & Inventory */}
            <div className="bg-white rounded-xl p-6 border border-earth-100">
              <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
                Pricing & Inventory
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Compare At Price (₹)
                  </label>
                  <input
                    type="number"
                    name="compareAtPrice"
                    value={formData.compareAtPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl p-6 border border-earth-100">
              <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
                Category
              </h2>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all appearance-none bg-white"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="bg-white rounded-xl p-6 border border-earth-100">
              <h2 className="text-xl font-display font-semibold text-earth-900 mb-4">
                Status
              </h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-5 h-5 text-forest-600 border-gray-300 rounded focus:ring-forest-600"
                  />
                  <span className="text-earth-900 font-medium">Active</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 text-forest-600 border-gray-300 rounded focus:ring-forest-600"
                  />
                  <span className="text-earth-900 font-medium">Featured Product</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
