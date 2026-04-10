import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productsAPI, categoriesAPI } from '../services/api';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category = searchParams.get('category');
  const mushroomType = searchParams.get('mushroomType');
  const productType = searchParams.get('productType');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort') || 'createdAt';
  const order = searchParams.get('order') || 'desc';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          productsAPI.getAll({
            category,
            mushroomType,
            productType,
            search,
            sort,
            order
          }),
          categoriesAPI.getAll()
        ]);
        setProducts(productsRes.data.products || []);
        setCategories(categoriesRes.data.categories || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, mushroomType, productType, search, sort, order]);

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const mushroomTypes = ['button', 'oyster', 'shiitake', 'milky'];
  const productTypes = ['fresh', 'dried', 'powder', 'pickle', 'grow-kit'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
      </div>
    );
  }

  const hasActiveFilters = category || mushroomType || productType || search;

  return (
    <div className="py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-semibold text-earth-900 mb-2">
            Shop
          </h1>
          <p className="text-earth-600">
            {products.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="card p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-earth-900">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-forest-600 hover:text-forest-700 flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-earth-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search || ''}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="input pl-10"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Category
                </label>
                <select
                  value={category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="input"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mushroom Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Mushroom Type
                </label>
                <select
                  value={mushroomType || ''}
                  onChange={(e) => handleFilterChange('mushroomType', e.target.value)}
                  className="input"
                >
                  <option value="">All Types</option>
                  {mushroomTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Product Type
                </label>
                <select
                  value={productType || ''}
                  onChange={(e) => handleFilterChange('productType', e.target.value)}
                  className="input"
                >
                  <option value="">All Types</option>
                  {productTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Sort By
                </label>
                <select
                  value={`${sort}-${order}`}
                  onChange={(e) => {
                    const [s, o] = e.target.value.split('-');
                    handleFilterChange('sort', s);
                    handleFilterChange('order', o);
                  }}
                  className="input"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden mb-4 btn-outline w-full flex items-center justify-center"
            >
              <Filter className="h-5 w-5 mr-2" />
              {filtersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>

            {products.length === 0 ? (
              <div className="card p-12 text-center">
                <div className="text-6xl mb-4">🍄</div>
                <h3 className="text-xl font-semibold text-earth-900 mb-2">
                  No products found
                </h3>
                <p className="text-earth-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
