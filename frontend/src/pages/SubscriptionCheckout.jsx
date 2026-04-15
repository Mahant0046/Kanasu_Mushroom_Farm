import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, MapPin, Calendar, Truck, AlertCircle, Lock } from 'lucide-react';
import { subscriptionsAPI, productsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { validateShippingAddress, getNormalizedState } from '../utils/addressValidation';

const SubscriptionCheckout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [deliveryFrequency, setDeliveryFrequency] = useState('weekly');
  const [deliveryDay, setDeliveryDay] = useState('saturday');
  
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchProducts();
    // Load saved subscription data from localStorage if available
    const savedData = localStorage.getItem('subscriptionData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setSelectedProducts(data.selectedProducts || []);
      setDeliveryFrequency(data.deliveryFrequency || 'weekly');
      setDeliveryDay(data.deliveryDay || 'saturday');
    }
  }, [isAuthenticated, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const toggleProduct = (product) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.product === product._id);
      if (exists) {
        return prev.filter(p => p.product !== product._id);
      } else {
        return [...prev, { product: product._id, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, delta) => {
    setSelectedProducts(prev => {
      return prev.map(p => {
        if (p.product === productId) {
          const newQuantity = Math.max(1, p.quantity + delta);
          return { ...p, quantity: newQuantity };
        }
        return p;
      });
    });
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, selected) => {
      const product = products.find(p => p._id === selected.product);
      return total + (product ? product.price * selected.quantity : 0);
    }, 0);
  };

  const getShippingFee = () => {
    const subtotal = calculateTotal();
    return subtotal >= 300 ? 0 : 40;
  };

  const getTotal = () => {
    return calculateTotal() + getShippingFee();
  };

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (selectedProducts.length === 0) {
      setError('Please select at least one product');
      return false;
    }
    
    const validation = validateShippingAddress(shippingAddress);
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
      return false;
    }
    
    return true;
  };

  const handleFieldBlur = (fieldName) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    const validation = validateShippingAddress(shippingAddress);
    setValidationErrors(validation.errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Normalize state name
    const normalizedState = getNormalizedState(shippingAddress.state);
    const finalAddress = normalizedState 
      ? { ...shippingAddress, state: normalizedState }
      : shippingAddress;

    setLoading(true);
    setError('');

    try {
      const subscriptionData = {
        items: selectedProducts,
        deliveryFrequency,
        deliveryDay,
        shippingAddress: finalAddress,
        paymentMethod,
        notes: ''
      };

      const response = await subscriptionsAPI.create(subscriptionData);
      
      // Clear saved data
      localStorage.removeItem('subscriptionData');
      
      navigate('/my-subscriptions', { 
        state: { 
          success: true, 
          message: 'Subscription created successfully!' 
        } 
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create subscription');
      console.error('Error creating subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-forest-50 py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-earth-900 mb-2">Complete Your Subscription</h1>
          <p className="text-earth-600">Review and finalize your mushroom subscription</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Products */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-display font-bold text-earth-900 mb-4">
                Selected Products
              </h2>
              
              {selectedProducts.length === 0 ? (
                <div className="text-center py-8 text-earth-600">
                  <p>No products selected</p>
                  <button
                    type="button"
                    onClick={() => navigate('/subscriptions')}
                    className="mt-4 text-forest-600 font-semibold hover:underline"
                  >
                    Go back to select products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedProducts.map((selected) => {
                    const product = products.find(p => p._id === selected.product);
                    if (!product) return null;
                    return (
                      <div key={selected.product} className="flex items-center gap-4 p-4 bg-forest-50 rounded-xl">
                        {product.thumbnail ? (
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-earth-100 rounded-lg flex items-center justify-center text-3xl">
                            🍄
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-earth-900">{product.name}</h3>
                          <p className="text-sm text-earth-600">₹{product.price}/{product.weight?.value || '100'}{product.weight?.unit || 'g'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(selected.product, -1)}
                            className="w-8 h-8 rounded-full bg-forest-600 text-white flex items-center justify-center hover:bg-forest-700"
                          >
                            -
                          </button>
                          <span className="font-semibold w-8 text-center">{selected.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(selected.product, 1)}
                            className="w-8 h-8 rounded-full bg-forest-600 text-white flex items-center justify-center hover:bg-forest-700"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleProduct(product)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <AlertCircle className="h-5 w-5" />
                        </button>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => navigate('/subscriptions')}
                    className="w-full py-3 border-2 border-forest-600 text-forest-600 rounded-lg font-semibold hover:bg-forest-50 transition-colors"
                  >
                    Add More Products
                  </button>
                </div>
              )}
            </div>

            {/* Delivery Schedule */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-display font-bold text-earth-900 mb-4">
                Delivery Schedule
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Delivery Frequency
                  </label>
                  <select
                    value={deliveryFrequency}
                    onChange={(e) => setDeliveryFrequency(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-earth-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    <Truck className="h-4 w-4 inline mr-2" />
                    Preferred Delivery Day
                  </label>
                  <select
                    value={deliveryDay}
                    onChange={(e) => setDeliveryDay(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-earth-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100"
                  >
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-display font-bold text-earth-900 mb-4">
                <MapPin className="h-5 w-5 inline mr-2" />
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleAddressChange}
                    onBlur={() => handleFieldBlur('name')}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 transition-all ${
                      touchedFields.name && validationErrors.name
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-earth-200 focus:border-forest-600 focus:ring-forest-100'
                    }`}
                    placeholder="Enter your full name"
                    required
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
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleAddressChange}
                    onBlur={() => handleFieldBlur('phone')}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 transition-all ${
                      touchedFields.phone && validationErrors.phone
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-earth-200 focus:border-forest-600 focus:ring-forest-100'
                    }`}
                    placeholder="Enter phone number"
                    required
                  />
                  {touchedFields.phone && validationErrors.phone && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleAddressChange}
                    onBlur={() => handleFieldBlur('zipCode')}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 transition-all ${
                      touchedFields.zipCode && validationErrors.zipCode
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-earth-200 focus:border-forest-600 focus:ring-forest-100'
                    }`}
                    placeholder="Enter ZIP code"
                    required
                  />
                  {touchedFields.zipCode && validationErrors.zipCode && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.zipCode}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleAddressChange}
                    onBlur={() => handleFieldBlur('street')}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 transition-all ${
                      touchedFields.street && validationErrors.street
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-earth-200 focus:border-forest-600 focus:ring-forest-100'
                    }`}
                    placeholder="Enter street address"
                    required
                  />
                  {touchedFields.street && validationErrors.street && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.street}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    onBlur={() => handleFieldBlur('city')}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 transition-all ${
                      touchedFields.city && validationErrors.city
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-earth-200 focus:border-forest-600 focus:ring-forest-100'
                    }`}
                    placeholder="Enter city"
                    required
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
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                    onBlur={() => handleFieldBlur('state')}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 transition-all ${
                      touchedFields.state && validationErrors.state
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-earth-200 focus:border-forest-600 focus:ring-forest-100'
                    }`}
                    placeholder="Enter state"
                    required
                  />
                  {touchedFields.state && validationErrors.state && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.state}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-display font-bold text-earth-900 mb-4">
                <CreditCard className="h-5 w-5 inline mr-2" />
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-forest-400 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-forest-600"
                  />
                  <div>
                    <p className="font-semibold text-earth-900">Cash on Delivery</p>
                    <p className="text-sm text-earth-600">Pay when you receive your order</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-forest-400 transition-colors opacity-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-forest-600"
                    disabled
                  />
                  <div>
                    <p className="font-semibold text-earth-900">Online Payment</p>
                    <p className="text-sm text-earth-600">Credit/Debit Card, UPI, Net Banking (Coming Soon)</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-display font-bold text-earth-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-earth-600">Subtotal</span>
                  <span className="font-semibold text-earth-900">₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-earth-600">Shipping</span>
                  <span className={`font-semibold ${getShippingFee() === 0 ? 'text-green-600' : 'text-earth-900'}`}>
                    {getShippingFee() === 0 ? 'FREE' : `₹${getShippingFee()}`}
                  </span>
                </div>
                <div className="border-t border-earth-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-earth-900">Total</span>
                    <span className="text-forest-600">₹{getTotal()}</span>
                  </div>
                  <p className="text-xs text-earth-600 mt-1">
                    per {deliveryFrequency === 'weekly' ? 'week' : deliveryFrequency === 'bi-weekly' ? '2 weeks' : 'month'}
                  </p>
                </div>
              </div>

              <div className="bg-forest-50 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-forest-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-earth-700">
                    <p className="font-semibold mb-1">Subscription Benefits</p>
                    <ul className="space-y-1">
                      <li>• Pause or cancel anytime</li>
                      <li>• Free shipping on orders above ₹300</li>
                      <li>• Fresh mushrooms delivered weekly</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || selectedProducts.length === 0}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                  loading || selectedProducts.length === 0
                    ? 'bg-earth-200 text-earth-400 cursor-not-allowed'
                    : 'bg-forest-600 text-white hover:bg-forest-700 shadow-lg'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Confirm Subscription
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-earth-600">
                  By confirming, you agree to our subscription terms and conditions
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionCheckout;
