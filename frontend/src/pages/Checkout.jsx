import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';
import { validateShippingAddress, getNormalizedState } from '../utils/addressValidation';
import { MapPin, CreditCard, Package, Truck, Check, RefreshCw, Lock, ChevronRight, ShoppingBag, AlertCircle } from 'lucide-react';

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

  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

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

    // Validate shipping address
    const validation = validateShippingAddress(formData.shippingAddress);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setTouchedFields({
        name: true,
        phone: true,
        street: true,
        city: true,
        state: true,
        zipCode: true
      });
      return;
    }

    // Normalize state name
    const normalizedState = getNormalizedState(formData.shippingAddress.state);
    if (normalizedState) {
      setFormData({
        ...formData,
        shippingAddress: {
          ...formData.shippingAddress,
          state: normalizedState
        }
      });
    }

    setLoading(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          product: item._id,
          quantity: item.quantity
        })),
        shippingAddress: normalizedState 
          ? { ...formData.shippingAddress, state: normalizedState }
          : formData.shippingAddress,
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

  const handleFieldBlur = (fieldName) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    const validation = validateShippingAddress(formData.shippingAddress);
    setValidationErrors(validation.errors);
  };

  return (
    <div className="min-h-screen bg-forest-50 py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-earth-900 mb-2">Checkout</h1>
          <p className="text-earth-600">Complete your order details</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-forest-600 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <span className="ml-2 font-semibold text-forest-600">Cart</span>
            </div>
            <ChevronRight className="h-5 w-5 text-earth-300" />
            <div className="flex items-center">
              <div className="w-10 h-10 bg-forest-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <span className="ml-2 font-semibold text-forest-600">Checkout</span>
            </div>
            <ChevronRight className="h-5 w-5 text-earth-300" />
            <div className="flex items-center">
              <div className="w-10 h-10 bg-earth-200 text-earth-400 rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <span className="ml-2 text-earth-400">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-forest-100 p-2 rounded-lg">
                    <MapPin className="h-6 w-6 text-forest-600" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-earth-900">
                    Shipping Address
                  </h2>
                </div>

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
                      onBlur={() => handleFieldBlur('name')}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 transition-all ${
                        touchedFields.name && validationErrors.name
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                          : 'border-earth-200 focus:border-forest-600 focus:ring-forest-100'
                      }`}
                    />
                    {touchedFields.name && validationErrors.name && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.name}
                      </p>
                    )}
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
                      onBlur={() => handleFieldBlur('phone')}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 transition-all ${
                        touchedFields.phone && validationErrors.phone
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                          : 'border-earth-200 focus:border-forest-600 focus:ring-forest-100'
                      }`}
                    />
                    {touchedFields.phone && validationErrors.phone && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.phone}
                      </p>
                    )}
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
                    onBlur={() => handleFieldBlur('street')}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 transition-all ${
                      touchedFields.street && validationErrors.street
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-earth-200 focus:border-forest-600 focus:ring-forest-100'
                    }`}
                  />
                  {touchedFields.street && validationErrors.street && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.street}
                    </p>
                  )}
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
                      onBlur={() => handleFieldBlur('city')}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 transition-all ${
                        touchedFields.city && validationErrors.city
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                          : 'border-earth-200 focus:border-forest-600 focus:ring-forest-100'
                      }`}
                    />
                    {touchedFields.city && validationErrors.city && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.city}
                      </p>
                    )}
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
                      onBlur={() => handleFieldBlur('state')}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 transition-all ${
                        touchedFields.state && validationErrors.state
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                          : 'border-earth-200 focus:border-forest-600 focus:ring-forest-100'
                      }`}
                    />
                    {touchedFields.state && validationErrors.state && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.state}
                      </p>
                    )}
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
                      onBlur={() => handleFieldBlur('zipCode')}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 transition-all ${
                        touchedFields.zipCode && validationErrors.zipCode
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                          : 'border-earth-200 focus:border-forest-600 focus:ring-forest-100'
                      }`}
                    />
                    {touchedFields.zipCode && validationErrors.zipCode && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.zipCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-forest-100 p-2 rounded-lg">
                    <CreditCard className="h-6 w-6 text-forest-600" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-earth-900">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer hover:border-forest-400 transition-all">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-5 h-5 text-forest-600"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-earth-900">Cash on Delivery</p>
                      <p className="text-sm text-earth-600">Pay when you receive your order</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer opacity-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-5 h-5 text-forest-600"
                      disabled
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-earth-900">Online Payment</p>
                      <p className="text-sm text-earth-600">Credit/Debit Card, UPI, Net Banking (Coming Soon)</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-xl font-display font-bold text-earth-900 mb-6">
                  Order Notes (Optional)
                </h2>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-earth-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
                  placeholder="Any special instructions for your order..."
                />
              </div>

              {/* Subscription Upsell */}
              <div className="bg-gradient-to-r from-forest-600 to-forest-700 rounded-2xl p-8 shadow-lg text-white">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                    <RefreshCw className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Subscribe & Save!</h3>
                    <p className="text-forest-100 mb-4">
                      Never run out of fresh mushrooms. Subscribe and get regular deliveries with exclusive discounts.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate('/subscriptions')}
                      className="bg-white text-forest-700 px-6 py-3 rounded-lg font-semibold hover:bg-forest-50 transition-colors flex items-center gap-2"
                    >
                      View Subscription Plans
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-forest-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-forest-700 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Place Order
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-forest-100 p-2 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-forest-600" />
                </div>
                <h2 className="text-2xl font-display font-bold text-earth-900">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-4 p-3 bg-forest-50 rounded-xl">
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          🍄
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-earth-900 text-sm line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-earth-600 text-sm">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <span className="font-bold text-forest-600">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-earth-200 pt-4 space-y-3">
                <div className="flex justify-between text-earth-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-earth-600 items-center">
                  <span>Shipping</span>
                  <span className={`font-semibold ${shippingFee === 0 ? 'text-green-600' : ''}`}>
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-earth-900 pt-3 border-t border-earth-200">
                  <span>Total</span>
                  <span className="text-forest-600">₹{total}</span>
                </div>
              </div>

              {cartTotal < 500 && (
                <div className="mt-4 bg-amber-50 border-2 border-amber-200 text-amber-800 p-4 rounded-xl text-sm flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Add ₹{500 - cartTotal} more for free shipping!
                </div>
              )}

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-earth-200">
                <h4 className="font-semibold text-earth-900 mb-3">Order Benefits</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-earth-600">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Quality guaranteed or money back</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-earth-600">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Secure payment with COD</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-earth-600">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Fast delivery across Chennai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
