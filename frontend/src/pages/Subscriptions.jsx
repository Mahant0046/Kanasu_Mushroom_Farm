import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Leaf, Clock, Truck, ArrowRight, Star } from 'lucide-react';
import { productsAPI, subscriptionsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Subscriptions = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [deliveryFrequency, setDeliveryFrequency] = useState('weekly');
  const [deliveryDay, setDeliveryDay] = useState('saturday');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
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

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Save subscription data to localStorage
    localStorage.setItem('subscriptionData', JSON.stringify({
      selectedProducts,
      deliveryFrequency,
      deliveryDay
    }));
    navigate('/subscription-checkout');
  };

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals',
      price: '₹199',
      period: '/week',
      features: [
        '1-2 mushroom varieties',
        'Weekly delivery',
        'Free shipping above ₹300',
        'COD payment',
        'Pause anytime'
      ],
      popular: false,
      color: 'from-earth-100 to-earth-50'
    },
    {
      name: 'Family',
      description: 'Ideal for families',
      price: '₹499',
      period: '/week',
      features: [
        '3-4 mushroom varieties',
        'Weekly delivery',
        'Free shipping always',
        'Online payment available',
        'Priority delivery',
        'Pause anytime'
      ],
      popular: true,
      color: 'from-forest-500 to-forest-600'
    },
    {
      name: 'Premium',
      description: 'For mushroom enthusiasts',
      price: '₹799',
      period: '/week',
      features: [
        '5+ mushroom varieties',
        'Weekly delivery',
        'Free express shipping',
        'Exclusive varieties',
        'Priority support',
        'Custom delivery day'
      ],
      popular: false,
      color: 'from-earth-100 to-earth-50'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-forest-600 via-forest-700 to-earth-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1604909052743-94e838986d24?w=1920&q=80" 
            alt="Fresh Mushrooms" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-block bg-forest-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Subscribe & Save • Fresh Weekly • Cancel Anytime
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Fresh Mushrooms<br />Delivered Weekly
            </h1>
            <p className="text-lg md:text-xl text-forest-100 mb-8 leading-relaxed">
              Never run out of fresh mushrooms again. Choose your favorite varieties, 
              set your delivery schedule, and enjoy organic goodness at your doorstep every week.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Subscription Plans */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-semibold text-sm uppercase tracking-wide mb-2 block">
              Subscription Plans
            </span>
            <h2 className="text-4xl font-display font-bold text-earth-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-earth-600 max-w-2xl mx-auto">
              Flexible plans to suit every need. All plans include free shipping and can be paused or cancelled anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-forest-500 to-forest-700 text-white shadow-2xl transform scale-105'
                    : 'bg-gradient-to-b from-earth-50 to-white border-2 border-earth-100 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-400 text-earth-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-display font-bold mb-2 ${plan.popular ? 'text-white' : 'text-earth-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-4 ${plan.popular ? 'text-forest-100' : 'text-earth-600'}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-forest-600'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg ${plan.popular ? 'text-forest-200' : 'text-earth-600'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-amber-400' : 'text-forest-600'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-white' : 'text-earth-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                    plan.popular
                      ? 'bg-white text-forest-700 hover:bg-earth-100 shadow-lg'
                      : 'bg-forest-600 text-white hover:bg-forest-700'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Subscription Builder */}
      <section className="py-20 bg-forest-50">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-semibold text-sm uppercase tracking-wide mb-2 block">
              Build Your Own
            </span>
            <h2 className="text-4xl font-display font-bold text-earth-900 mb-4">
              Custom Subscription
            </h2>
            <p className="text-earth-600 max-w-2xl mx-auto">
              Pick your favorite mushroom varieties and create a personalized subscription plan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Selection */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-display font-bold text-earth-900 mb-6">
                  Select Your Mushrooms
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => {
                    const selected = selectedProducts.find(p => p.product === product._id);
                    return (
                      <div
                        key={product._id}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          selected
                            ? 'border-forest-600 bg-forest-50'
                            : 'border-earth-200 hover:border-forest-400'
                        }`}
                        onClick={() => toggleProduct(product)}
                      >
                        <div className="flex items-center gap-4">
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
                            <h4 className="font-semibold text-earth-900">{product.name}</h4>
                            <p className="text-sm text-earth-600">
                              ₹{product.price}/{product.weight?.value || '100'}{product.weight?.unit || 'g'}
                            </p>
                          </div>
                          <div className="text-forest-600">
                            {selected ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(product._id, -1);
                                  }}
                                  className="w-8 h-8 rounded-full bg-forest-600 text-white flex items-center justify-center hover:bg-forest-700"
                                >
                                  -
                                </button>
                                <span className="font-semibold">{selected.quantity}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(product._id, 1);
                                  }}
                                  className="w-8 h-8 rounded-full bg-forest-600 text-white flex items-center justify-center hover:bg-forest-700"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full border-2 border-forest-600 flex items-center justify-center">
                                <Check className="h-4 w-4 text-forest-600" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Subscription Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
                <h3 className="text-2xl font-display font-bold text-earth-900 mb-6">
                  Subscription Details
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
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

                  <div className="border-t border-earth-200 pt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-earth-600">Subtotal</span>
                      <span className="font-semibold text-earth-900">₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-earth-600">Shipping</span>
                      <span className={`font-semibold ${getShippingFee() === 0 ? 'text-green-600' : 'text-earth-900'}`}>
                        {getShippingFee() === 0 ? 'FREE' : `₹${getShippingFee()}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-earth-200 pt-2">
                      <span className="text-earth-900">Total</span>
                      <span className="text-forest-600">₹{getTotal()}/{deliveryFrequency === 'weekly' ? 'week' : deliveryFrequency === 'bi-weekly' ? '2 weeks' : 'month'}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToCheckout}
                    disabled={selectedProducts.length === 0 || !isAuthenticated}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                      selectedProducts.length === 0 || !isAuthenticated
                        ? 'bg-earth-200 text-earth-400 cursor-not-allowed'
                        : 'bg-forest-600 text-white hover:bg-forest-700 shadow-lg'
                    }`}
                  >
                    {isAuthenticated ? 'Proceed to Checkout' : 'Login to Subscribe'}
                  </button>

                  {!isAuthenticated && (
                    <p className="text-center text-sm text-earth-600">
                      <Link to="/login" className="text-forest-600 font-semibold hover:underline">
                        Login
                      </Link>
                      {' '}to create your subscription
                    </p>
                  )}

                  <div className="flex items-center justify-center gap-6 text-sm text-earth-600 pt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Pause anytime</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      <span>Free shipping</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-semibold text-sm uppercase tracking-wide mb-2 block">
              Why Subscribe?
            </span>
            <h2 className="text-4xl font-display font-bold text-earth-900 mb-4">
              Benefits of Subscription
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="h-8 w-8" />,
                title: 'Fresh & Organic',
                description: 'Harvested fresh from our farm and delivered to your doorstep'
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: 'Flexible Schedule',
                description: 'Choose your delivery frequency and preferred day'
              },
              {
                icon: <Truck className="h-8 w-8" />,
                title: 'Free Delivery',
                description: 'Free shipping on all subscriptions above ₹300'
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: 'Save Money',
                description: 'Subscribe and save up to 20% on regular prices'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-forest-100 text-forest-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-earth-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-forest-600 via-forest-700 to-earth-700 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Ready to Start Your Subscription?
          </h2>
          <p className="text-lg text-forest-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers enjoying fresh, organic mushrooms delivered weekly.
          </p>
          <button className="bg-white text-forest-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-earth-100 transition-colors">
            Subscribe Now
            <ArrowRight className="ml-2 h-5 w-5 inline" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Subscriptions;
