import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Edit, Trash2, Search, Filter, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import { productsAPI } from '../services/api';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll({ includeInactive: true });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (productId, currentStatus) => {
    try {
      await productsAPI.update(productId, { isActive: !currentStatus });
      fetchProducts();
    } catch (error) {
      console.error('Error toggling product status:', error);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(productId);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.slug?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'active' && product.isActive) ||
                         (filterStatus === 'inactive' && !product.isActive);
    return matchesSearch && matchesFilter;
  });

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
        <div>
          <h1 className="text-3xl font-display font-bold text-earth-900 mb-2">
            Product Management
          </h1>
          <p className="text-earth-600">
            Manage your mushroom products and inventory
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/products/new')}
          className="flex items-center space-x-2 bg-forest-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-earth-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
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
              <option value="all">All Products</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-earth-100 overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="h-16 w-16 text-earth-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-earth-900 mb-2">
              No products found
            </h3>
            <p className="text-earth-600 mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first product'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button
                onClick={() => navigate('/admin/products/new')}
                className="inline-flex items-center space-x-2 bg-forest-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Product</span>
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-earth-50 border-b border-earth-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth-100">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-earth-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-lg bg-earth-100 flex items-center justify-center overflow-hidden">
                          {(product.images?.[0] || product.thumbnail) ? (
                            <img
                              src={product.images?.[0] || product.thumbnail}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Package className="h-6 w-6 text-earth-400" />
                          )}
                        </div>
                        <div>
                          <button
                            onClick={() => navigate(`/admin/products/${product._id}`)}
                            className="font-semibold text-earth-900 hover:text-forest-600 transition-colors"
                          >
                            {product.name}
                          </button>
                          <p className="text-sm text-earth-500">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-forest-100 text-forest-700">
                        {product.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-earth-900">₹{product.price}</p>
                      {product.compareAtPrice && (
                        <p className="text-sm text-earth-500 line-through">₹{product.compareAtPrice}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className={`font-semibold ${product.stock < 10 ? 'text-red-600' : 'text-earth-900'}`}>
                        {product.stock}
                      </p>
                      {product.stock < 10 && (
                        <p className="text-xs text-red-500">Low stock</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(product._id, product.isActive)}
                        className="flex items-center space-x-1"
                      >
                        {product.isActive ? (
                          <ToggleRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-gray-400" />
                        )}
                        <span className={`text-sm ${product.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => navigate(`/admin/products/${product._id}`)}
                          className="p-2 text-earth-600 hover:text-forest-600 hover:bg-earth-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                          className="p-2 text-earth-600 hover:text-forest-600 hover:bg-earth-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-earth-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
