import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/shop/${product.slug}`} className="block group">
      <div className="card overflow-hidden">
        <div className="relative aspect-square bg-earth-50 overflow-hidden">
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-earth-300">
              <span className="text-4xl">🍄</span>
            </div>
          )}
          {product.stock <= product.lowStockThreshold && product.stock > 0 && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
              Low Stock
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
          {product.featured && (
            <div className="absolute top-2 right-2 bg-forest-600 text-white text-xs px-2 py-1 rounded">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-4">
          <p className="text-xs text-forest-600 font-medium mb-1 capitalize">
            {product.mushroomType} • {product.productType.replace('-', ' ')}
          </p>
          <h3 className="font-semibold text-earth-900 mb-2 line-clamp-2 group-hover:text-forest-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-1 mb-3">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-earth-600">
              {product.rating.average} ({product.rating.count})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-earth-900">
                ₹{product.price}
              </p>
              {product.weight && (
                <p className="text-xs text-earth-500">
                  {product.weight.value}{product.weight.unit}
                </p>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`p-2 rounded-lg transition-colors ${
                product.stock === 0
                  ? 'bg-earth-100 text-earth-400 cursor-not-allowed'
                  : 'bg-forest-600 text-white hover:bg-forest-700'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
