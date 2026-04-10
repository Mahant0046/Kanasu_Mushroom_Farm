import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="py-16">
        <div className="container">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-display font-semibold text-earth-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-earth-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/shop" className="btn-primary">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const shippingFee = cartTotal >= 500 ? 0 : 50;
  const total = cartTotal + shippingFee;

  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-3xl font-display font-semibold text-earth-900 mb-8">
          Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="card p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-earth-50 rounded-lg overflow-hidden flex-shrink-0">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">
                        🍄
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <Link
                        to={`/shop/${item.slug}`}
                        className="font-semibold text-earth-900 hover:text-forest-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <p className="text-earth-600 text-sm mb-3">
                      ₹{item.price}
                      {item.weight && ` • ${item.weight.value}${item.weight.unit}`}
                    </p>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="p-2 rounded-lg border border-earth-200 hover:border-forest-500 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-2 rounded-lg border border-earth-200 hover:border-forest-500 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <span className="ml-auto font-semibold text-earth-900">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
              >
                Clear Cart
              </button>
              <Link to="/shop" className="btn-outline text-sm py-2 px-4">
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card p-6 sticky top-20">
              <h2 className="text-xl font-display font-semibold text-earth-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-earth-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-earth-600">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="border-t border-earth-200 pt-4 flex justify-between text-lg font-semibold text-earth-900">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {cartTotal < 500 && (
                <div className="bg-forest-50 text-forest-700 p-4 rounded-lg mb-6 text-sm">
                  <ShoppingBag className="h-5 w-5 inline mr-2" />
                  Add ₹{500 - cartTotal} more for free shipping!
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full btn-primary"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </button>

              <div className="mt-6 text-center">
                <p className="text-xs text-earth-500 mb-2">
                  Secure checkout powered by SSL
                </p>
                <div className="flex justify-center space-x-2">
                  <div className="w-12 h-8 bg-earth-100 rounded"></div>
                  <div className="w-12 h-8 bg-earth-100 rounded"></div>
                  <div className="w-12 h-8 bg-earth-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
