import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Truck, Shield, Heart, Star } from 'lucide-react';
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
      <section className="relative bg-gradient-to-br from-forest-600 via-forest-700 to-earth-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-9xl">🍄</div>
          <div className="absolute bottom-20 right-10 text-9xl">🍄</div>
          <div className="absolute top-1/2 left-1/2 text-9xl">🍄</div>
        </div>
        <div className="container relative py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Nature's Finest Mushrooms, Farm to Your Door
            </h1>
            <p className="text-lg md:text-xl text-forest-100 mb-8">
              Fresh, organic mushrooms grown with love. Experience the difference of farm-fresh quality in every bite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn-primary bg-white text-forest-700 hover:bg-earth-100">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-forest-700">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-forest-600 mb-4 flex justify-center">
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
      <section className="py-16 bg-forest-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Our most popular fresh picks</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="btn-outline">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Our Farm Story</h2>
              <p className="text-earth-600 mb-6">
                Kanasu Mushroom Farm started with a simple dream: to provide fresh, organic mushrooms to our local community. What began as a small experimental setup has grown into a thriving farm serving customers across the region.
              </p>
              <p className="text-earth-600 mb-8">
                We grow our mushrooms using traditional methods combined with modern hygiene standards. Our substrate is prepared from organic agricultural waste, making our farming eco-friendly and sustainable.
              </p>
              <Link to="/about" className="btn-primary">
                Read Our Story
              </Link>
            </div>
            <div className="bg-earth-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <span className="text-9xl">🌱</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mushroom Types */}
      <section className="py-16 bg-forest-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Mushroom Varieties</h2>
            <p className="section-subtitle">Explore our range of premium mushrooms</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Button', emoji: '🍄', desc: 'Versatile & popular' },
              { name: 'Oyster', emoji: '🍄', desc: 'Delicate & flavorful' },
              { name: 'Shiitake', emoji: '🍄', desc: 'Rich & umami-packed' },
              { name: 'Milky', emoji: '🍄', desc: 'Perfect for Indian cuisine' }
            ].map((type, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow">
                <span className="text-6xl mb-4 block">{type.emoji}</span>
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
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="section-title">From Our Blog</h2>
              <p className="section-subtitle">Recipes, tips, and mushroom knowledge</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredBlogs.slice(0, 3).map((blog) => (
                <Link key={blog._id} to={`/blog/${blog.slug}`} className="block group">
                  <div className="card overflow-hidden">
                    <div className="aspect-video bg-earth-100 flex items-center justify-center text-6xl">
                      📝
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-forest-600 font-medium uppercase">
                        {blog.category}
                      </span>
                      <h3 className="text-lg font-semibold text-earth-900 mt-2 mb-3 group-hover:text-forest-600 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-earth-600 text-sm line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="mt-4 flex items-center text-sm text-earth-500">
                        <Star className="h-4 w-4 mr-1" />
                        {blog.readingTime} min read
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/blog" className="btn-outline">
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-forest-600 to-earth-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Experience Fresh Mushrooms?
          </h2>
          <p className="text-lg text-forest-100 mb-8">
            Join thousands of happy customers enjoying our organic, farm-fresh mushrooms
          </p>
          <Link to="/shop" className="btn-primary bg-white text-forest-700 hover:bg-earth-100">
            Start Shopping Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
