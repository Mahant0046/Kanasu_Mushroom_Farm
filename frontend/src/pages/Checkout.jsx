import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    shippingAddress: {
      name: user?.name || '',
      phone: user?.phone || '',
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || ''
    },
    paymentMethod: 'cod',
    notes: ''
  });

  const shippingFee = cartTotal >= 500 ? 0 : 50;
  const total = cartTotal + shippingFee;

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          product: item._id,
          quantity: item.quantity
        })),
        shippingAddress: formData.shippingAddress,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes
      };

      await ordersAPI.create(orderData);
      clearCart();
      navigate('/profile');
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-3xl font-display font-semibold text-earth-900 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Address */}
              <div className="card p-6">
                <h2 className="text-xl font-display font-semibold text-earth-900 mb-6">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shippingAddress.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        shippingAddress: { ...formData.shippingAddress, name: e.target.value }
                      })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.shippingAddress.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        shippingAddress: { ...formData.shippingAddress, phone: e.target.value }
                      })}
                      className="input"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shippingAddress.street}
                    onChange={(e) => setFormData({
                      ...formData,
                      shippingAddress: { ...formData.shippingAddress, street: e.target.value }
                    })}
                    className="input"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shippingAddress.city}
                      onChange={(e) => setFormData({
                        ...formData,
                        shippingAddress: { ...formData.shippingAddress, city: e.target.value }
                      })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shippingAddress.state}
                      onChange={(e) => setFormData({
                        ...formData,
                        shippingAddress: { ...formData.shippingAddress, state: e.target.value }
                      })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shippingAddress.zipCode}
                      onChange={(e) => setFormData({
                        ...formData,
                        shippingAddress: { ...formData.shippingAddress, zipCode: e.target.value }
                      })}
                      className="input"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card p-6">
                <h2 className="text-xl font-display font-semibold text-earth-900 mb-6">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {['cod', 'online', 'upi'].map((method) => (
                    <label key={method} className="flex items-center p-4 border border-earth-200 rounded-lg cursor-pointer hover:border-forest-500 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="mr-3"
                      />
                      <span className="font-medium text-earth-900 capitalize">
                        {method === 'cod' ? 'Cash on Delivery' : method.toUpperCase()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Notes */}
              <div className="card p-6">
                <h2 className="text-xl font-display font-semibold text-earth-900 mb-6">
                  Order Notes (Optional)
                </h2>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input"
                  placeholder="Any special instructions for your order..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card p-6 sticky top-20">
              <h2 className="text-xl font-display font-semibold text-earth-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <div className="w-16 h-16 bg-earth-50 rounded-lg overflow-hidden flex-shrink-0">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">
                          🍄
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-earth-900 text-sm line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-earth-600 text-xs">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <span className="font-semibold text-earth-900">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-earth-200 pt-4 space-y-3">
                <div className="flex justify-between text-earth-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-earth-600">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-earth-900 pt-3 border-t border-earth-200">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {cartTotal < 500 && (
                <div className="mt-4 bg-forest-50 text-forest-700 p-4 rounded-lg text-sm">
                  Add ₹{500 - cartTotal} more for free shipping!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
