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
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [inStockOnly, setInStockOnly] = useState(false);

  const category = searchParams.get('category');
  const mushroomType = searchParams.get('mushroomType');
  const productType = searchParams.get('productType');
  const search = searchParams.get('search');
  const inStock = searchParams.get('inStock');
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
            inStock,
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
  }, [category, mushroomType, productType, search, inStock, sort, order]);

  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (priceRange.min) params.set('minPrice', priceRange.min);
    else params.delete('minPrice');
    if (priceRange.max) params.set('maxPrice', priceRange.max);
    else params.delete('maxPrice');
    setSearchParams(params);
  };

  const handleInStockToggle = () => {
    setInStockOnly(!inStockOnly);
    handleFilterChange('inStock', !inStockOnly ? 'true' : '');
  };

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
    <div>
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-forest-600 to-earth-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1604909052743-94e838986d24?w=1920&q=80" 
            alt="Fresh Mushrooms" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Shop Fresh Mushrooms</h1>
          <p className="text-forest-100 text-lg max-w-2xl">
            Explore our wide range of organic, farm-fresh mushrooms and mushroom products
          </p>
        </div>
      </div>

      <div className="py-8 bg-white">
        <div className="container">
          {/* Quick Category Links */}
          {categories.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-3">
              <button
                onClick={() => handleFilterChange('category', '')}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  !category 
                    ? 'bg-forest-600 text-white shadow-md' 
                    : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
                }`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleFilterChange('category', cat.slug)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    category === cat.slug 
                      ? 'bg-forest-600 text-white shadow-md' 
                      : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Header with Sort */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-earth-900">
                {category ? categories.find(c => c.slug === category)?.name : 'All Products'}
              </h2>
              <p className="text-earth-600">
                {products.length} products found
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={`${sort}-${order}`}
                onChange={(e) => {
                  const [s, o] = e.target.value.split('-');
                  handleFilterChange('sort', s);
                  handleFilterChange('order', o);
                }}
                className="input px-4 py-2 text-sm"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:w-72 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white border border-earth-200 rounded-xl p-6 sticky top-24 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-earth-900">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm font-semibold text-forest-600 hover:text-forest-700 flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-earth-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={search || ''}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="input pl-10 border-earth-200"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Category
                  </label>
                  <select
                    value={category || ''}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="input border-earth-200"
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
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Mushroom Type
                  </label>
                  <select
                    value={mushroomType || ''}
                    onChange={(e) => handleFilterChange('mushroomType', e.target.value)}
                    className="input border-earth-200"
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
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Product Type
                  </label>
                  <select
                    value={productType || ''}
                    onChange={(e) => handleFilterChange('productType', e.target.value)}
                    className="input border-earth-200"
                  >
                    <option value="">All Types</option>
                    {productTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Price Range (₹)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      className="input border-earth-200 text-sm"
                    />
                    <span className="text-earth-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      className="input border-earth-200 text-sm"
                    />
                  </div>
                  <button
                    onClick={handlePriceFilter}
                    className="mt-2 w-full btn-primary text-sm py-2"
                  >
                    Apply Price Filter
                  </button>
                </div>

                {/* In Stock Toggle */}
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={handleInStockToggle}
                      className="w-5 h-5 text-forest-600 rounded border-earth-300 focus:ring-forest-500"
                    />
                    <span className="ml-3 text-sm font-medium text-earth-700">In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="lg:hidden mb-4 btn-primary w-full flex items-center justify-center py-3 font-semibold"
              >
                <Filter className="h-5 w-5 mr-2" />
                {filtersOpen ? 'Hide Filters' : 'Show Filters'}
                {hasActiveFilters && (
                  <span className="ml-2 bg-white text-forest-600 text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </button>

              {products.length === 0 ? (
                <div className="bg-white border border-earth-200 rounded-2xl p-12 text-center">
                  <div className="w-24 h-24 bg-forest-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-5xl">🍄</span>
                  </div>
                  <h3 className="text-2xl font-bold text-earth-900 mb-3">
                    No products found
                  </h3>
                  <p className="text-earth-600 mb-8 max-w-md mx-auto">
                    We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                  </p>
                  <button onClick={clearFilters} className="btn-primary px-8 py-3 font-semibold">
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
