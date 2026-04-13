import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Calendar, Tag } from 'lucide-react';
import { blogAPI } from '../services/api';

const Blog = () => {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (slug) {
          const blogRes = await blogAPI.getBySlug(slug);
          setSelectedBlog(blogRes.data.blog);
        } else {
          const [blogsRes, categoriesRes] = await Promise.all([
            blogAPI.getAll(selectedCategory ? { category: selectedCategory } : {}),
            blogAPI.getCategories()
          ]);
          setBlogs(blogsRes.data.blogs || []);
          setCategories(categoriesRes.data.categories || []);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, selectedCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
      </div>
    );
  }

  // Single blog post view
  if (selectedBlog) {
    return (
      <div className="py-8">
        <div className="container max-w-4xl">
          {/* Breadcrumb */}
          <nav className="text-sm text-earth-600 mb-8">
            <a href="/" className="hover:text-forest-600">Home</a>
            <span className="mx-2">/</span>
            <a href="/blog" className="hover:text-forest-600">Blog</a>
            <span className="mx-2">/</span>
            <span className="text-earth-900">{selectedBlog.title}</span>
          </nav>

          {/* Blog Header */}
          <div className="mb-8">
            <span className="text-xs font-medium text-forest-600 bg-forest-50 px-3 py-1 rounded-full uppercase">
              {selectedBlog.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-earth-900 mt-4 mb-4">
              {selectedBlog.title}
            </h1>
            <div className="flex items-center space-x-6 text-sm text-earth-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(selectedBlog.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {selectedBlog.readingTime} min read
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                {selectedBlog.views} views
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {selectedBlog.featuredImage && (
            <div className="aspect-video bg-earth-100 rounded-2xl overflow-hidden mb-8">
              <img
                src={selectedBlog.featuredImage}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none text-earth-700">
            <div className="whitespace-pre-line">{selectedBlog.content}</div>
          </div>

          {/* Tags */}
          {selectedBlog.tags && selectedBlog.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-earth-200">
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-earth-600" />
                {selectedBlog.tags.map((tag, index) => (
                  <span key={index} className="text-sm text-forest-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          {selectedBlog.comments && selectedBlog.comments.length > 0 && (
            <div className="mt-12 pt-8 border-t border-earth-200">
              <h3 className="text-2xl font-display font-semibold text-earth-900 mb-6">
                Comments ({selectedBlog.comments.length})
              </h3>
              <div className="space-y-6">
                {selectedBlog.comments.map((comment, index) => (
                  <div key={index} className="bg-earth-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-earth-900">
                        {comment.name}
                      </span>
                      <span className="text-sm text-earth-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-earth-600">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Blog listing view
  return (
    <div className="py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-semibold text-earth-900 mb-4">
            Our Blog
          </h1>
          <p className="text-earth-600 max-w-2xl mx-auto">
            Discover recipes, health benefits, growing guides, and everything about mushrooms
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === ''
                ? 'bg-forest-600 text-white'
                : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-forest-600 text-white'
                  : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-earth-900 mb-2">
              No articles found
            </h3>
            <p className="text-earth-600">
              Try selecting a different category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <a
                key={blog._id}
                href={`/blog/${blog.slug}`}
                className="block group"
              >
                <div className="card overflow-hidden">
                  <div className="aspect-video bg-earth-100 flex items-center justify-center text-6xl">
                    <img 
                          src={blog.featuredImage} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-forest-600 bg-forest-50 px-3 py-1 rounded-full uppercase">
                      {blog.category}
                    </span>
                    <h3 className="text-lg font-semibold text-earth-900 mt-3 mb-2 group-hover:text-forest-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-earth-600 text-sm line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-earth-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {blog.readingTime} min
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
