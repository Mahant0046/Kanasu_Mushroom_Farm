import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Heart, Star, Leaf } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productsAPI, blogAPI } from '../services/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, blogsRes] = await Promise.all([
          productsAPI.getFeatured(),
          blogAPI.getFeatured()
        ]);
        setFeaturedProducts(productsRes.data.products || []);
        setFeaturedBlogs(blogsRes.data.blogs || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const benefits = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: '100% Organic',
      description: 'Chemical-free, naturally grown mushrooms'
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Fast Delivery',
      description: 'Farm to your door within 24 hours'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Quality Assured',
      description: 'Freshness guaranteed every time'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Health First',
      description: 'Rich in protein and nutrients'
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
              Farm Fresh • Organic • Premium Quality
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Fresh Organic Mushrooms<br />Delivered to Your Doorstep
            </h1>
            <p className="text-lg md:text-xl text-forest-100 mb-8 leading-relaxed">
              Experience the finest quality mushrooms grown with care at Kanasu Mushroom Farm. 
              100% organic, chemical-free, and harvested daily for maximum freshness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn-primary bg-white text-forest-700 hover:bg-earth-100 text-center px-8 py-4 rounded-lg font-semibold text-lg">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link to="/about" className="btn-outline border-2 border-white text-white hover:bg-white hover:text-forest-700 text-center px-8 py-4 rounded-lg font-semibold text-lg">
                Our Story
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-forest-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-earth-900 mb-4">Why Choose Kanasu?</h2>
            <p className="text-earth-600 max-w-2xl mx-auto">We're committed to delivering the finest quality mushrooms while supporting sustainable farming practices.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
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

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-earth-900 mb-4">Featured Products</h2>
            <p className="text-earth-600 max-w-2xl mx-auto">Hand-picked favorites from our farm, delivered fresh to your kitchen</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="btn-primary px-8 py-3 rounded-lg font-semibold">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 bg-forest-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-forest-600 font-semibold text-sm uppercase tracking-wide mb-2 block">Our Story</span>
              <h2 className="text-3xl font-display font-bold text-earth-900 mb-6">Growing Mushrooms with Love & Care</h2>
              <p className="text-earth-600 mb-6 leading-relaxed">
                Kanasu Mushroom Farm started with a simple dream: to provide fresh, organic mushrooms to our local community. What began as a small experimental setup has grown into a thriving farm serving customers across the region.
              </p>
              <p className="text-earth-600 mb-8 leading-relaxed">
                We grow our mushrooms using traditional methods combined with modern hygiene standards. Our substrate is prepared from organic agricultural waste, making our farming eco-friendly and sustainable.
              </p>
              <Link to="/about" className="btn-primary px-8 py-3 rounded-lg font-semibold">
                Learn More About Us
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1572782132197-79d85a8d16de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVzaHJvb21zfGVufDB8fDB8fHww?w=800&q=80" 
                alt="Mushroom Farm" 
                className="rounded-2xl shadow-lg w-full h-96 object-cover"
              />
              {/* <div className="absolute -bottom-6 -left-6 bg-forest-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">5+</div>
                <div className="text-forest-100 text-sm">Years of Excellence</div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Mushroom Types */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-forest-600 font-semibold text-sm uppercase tracking-wide mb-2 block">Our Varieties</span>
            <h2 className="text-3xl font-display font-bold text-earth-900 mb-4">Premium Mushroom Types</h2>
            <p className="text-earth-600 max-w-2xl mx-auto">Discover our range of carefully cultivated mushroom varieties</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Button Mushroom', image: 'https://images.pexels.com/photos/5950411/pexels-photo-5950411.jpeg?w=400&q=80', desc: 'Versatile & popular for everyday cooking' },
              { name: 'Oyster Mushroom', image: 'https://images.pexels.com/photos/2478418/pexels-photo-2478418.jpeg?w=400&q=80', desc: 'Delicate texture with subtle, savory flavor' },
              { name: 'Shiitake Mushroom', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFa503O8yHnDoK0gcnfmR5rUSgvnezyjfaKg&s?w=400&q=80', desc: 'Rich umami flavor, perfect for Asian dishes' },
              { name: 'Milky Mushroom', image: 'https://images.pexels.com/photos/6157027/pexels-photo-6157027.jpeg?w=400&q=80', desc: 'Ideal for Indian cuisine and curries' }
            ].map((type, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img 
                    src={type.image} 
                    alt={type.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  {type.name}
                </h3>
                <p className="text-earth-600 text-sm">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && (
        <section className="py-16 bg-forest-50">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-forest-600 font-semibold text-sm uppercase tracking-wide mb-2 block">Our Blog</span>
              <h2 className="text-3xl font-display font-bold text-earth-900 mb-4">Latest from the Farm</h2>
              <p className="text-earth-600 max-w-2xl mx-auto">Recipes, tips, and mushroom knowledge from our experts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredBlogs.slice(0, 3).map((blog) => (
                <Link key={blog._id} to={`/blog/${blog.slug}`} className="block group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      {blog.featuredImage ? (
                        <img 
                          src={blog.featuredImage} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-earth-100 flex items-center justify-center text-6xl">
                          📝
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-forest-600 font-medium uppercase tracking-wide">
                        {blog.category}
                      </span>
                      <h3 className="text-lg font-semibold text-earth-900 mt-2 mb-3 group-hover:text-forest-600 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-earth-600 text-sm line-clamp-2 mb-4">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-earth-500">
                        <span className="text-forest-600 font-medium">{blog.readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/blog" className="btn-primary px-8 py-3 rounded-lg font-semibold">
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-forest-50">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-semibold text-sm uppercase tracking-wide mb-2 block">Testimonials</span>
            <h2 className="text-4xl font-display font-bold text-earth-900 mb-4">What Our Customers Say</h2>
            <p className="text-earth-600 max-w-2xl mx-auto">Real stories from our happy mushroom lovers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Testimonial 1 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1">
              <div className="absolute -top-4 left-8 bg-forest-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                ⭐⭐⭐⭐⭐
              </div>
              <div className="mt-4 mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-earth-700 leading-relaxed italic">
                  "The freshness of Kanasu mushrooms is unmatched! I've been ordering for 6 months now and every single delivery has been perfect. Their button mushrooms are the best I've ever had."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-forest-400 to-forest-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  PM
                </div>
                <div>
                  <h4 className="font-semibold text-earth-900">Priya Menon</h4>
                  <p className="text-sm text-earth-500">Home Chef, Bangalore</p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 text-6xl text-forest-100 opacity-50 group-hover:opacity-100 transition-opacity">
                "
              </div>
            </div>

            {/* Testimonial 2 - Featured Center Card with Accordion Design */}
            <div className="relative bg-gradient-to-br from-forest-600 via-forest-700 to-earth-700 text-white rounded-2xl p-8 shadow-2xl transform -translate-y-4 md:-translate-y-8 transition-all duration-500 hover:-translate-y-6 md:hover:-translate-y-12">
              {/* Decorative border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-forest-400/30"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/5 to-transparent"></div>
              
              <div className="relative">
                {/* Accordion-style header */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-forest-700 px-6 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
                  <span className="text-amber-500">★</span>
                  Featured Review
                  <span className="text-amber-500">★</span>
                </div>
                
                <div className="mt-6 mb-6">
                  <div className="flex gap-1 mb-4 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-forest-100 leading-relaxed italic text-lg">
                    "As a restaurant owner, quality is everything. Kanasu Mushroom Farm has been our trusted supplier for 2 years. Their shiitake mushrooms are consistently excellent and our customers love the dishes we make with them."
                  </p>
                </div>
                
                <div className="flex items-center gap-4 justify-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl ring-4 ring-amber-400/30">
                    RK
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">Rajesh Kumar</h4>
                    <p className="text-sm text-forest-200">Restaurant Owner, Chennai</p>
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 text-7xl text-white opacity-20">
                  "
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1">
              <div className="absolute -top-4 left-8 bg-forest-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                ⭐⭐⭐⭐⭐
              </div>
              <div className="mt-4 mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-earth-700 leading-relaxed italic">
                  "I discovered Kanasu during the lockdown and haven't looked back since! Their milky mushrooms are perfect for my curry recipes. The subscription service is so convenient and the prices are very reasonable."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-forest-400 to-forest-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  AS
                </div>
                <div>
                  <h4 className="font-semibold text-earth-900">Anita Sharma</h4>
                  <p className="text-sm text-earth-500">Food Blogger, Mumbai</p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 text-6xl text-forest-100 opacity-50 group-hover:opacity-100 transition-opacity">
                "
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-forest-600 mb-2">5000+</div>
                <div className="text-earth-600 text-sm">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-forest-600 mb-2">4.9/5</div>
                <div className="text-earth-600 text-sm">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-forest-600 mb-2">98%</div>
                <div className="text-earth-600 text-sm">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-forest-600 mb-2">5+ Years</div>
                <div className="text-earth-600 text-sm">Serving Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-forest-600 via-forest-700 to-earth-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container relative text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Experience Fresh Mushrooms?
          </h2>
          <p className="text-lg text-forest-100 mb-10 max-w-2xl mx-auto">
            Join thousands of happy customers enjoying our organic, farm-fresh mushrooms delivered directly to your doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="btn-primary bg-white text-forest-700 hover:bg-earth-100 px-8 py-4 rounded-lg font-semibold text-lg">
              Start Shopping Now
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
            <Link to="/contact" className="btn-outline border-2 border-white text-white hover:bg-white hover:text-forest-700 px-8 py-4 rounded-lg font-semibold text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Admin Login Link */}
      <div className="py-4 bg-earth-900 text-center">
        <Link
          to="/admin/login"
          className="text-earth-400 hover:text-white text-sm transition-colors"
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
