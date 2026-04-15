import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, FileText, Calendar, Eye, MessageSquare, Clock, AlertCircle } from 'lucide-react';
import { blogAPI } from '../services/api';

const AdminBlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getById(id);
      setBlog(response.data.blog);
    } catch (error) {
      setError('Failed to load blog post');
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await blogAPI.delete(id);
      navigate('/admin/blogs');
    } catch (error) {
      setError('Failed to delete blog post');
      setDeleting(false);
    }
  };

  const toggleActive = async () => {
    try {
      const updatedBlog = { ...blog, published: !blog.published };
      await blogAPI.update(id, updatedBlog);
      setBlog(updatedBlog);
    } catch (error) {
      setError('Failed to update blog status');
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error || 'Blog post not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/blogs')}
            className="p-2 text-earth-600 hover:text-earth-900 hover:bg-earth-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold text-earth-900 mb-2">
              {blog.title}
            </h1>
            <p className="text-earth-600">Blog ID: {blog._id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(`/admin/blogs/${id}/edit`)}
            className="flex items-center space-x-2 bg-forest-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-forest-700 transition-colors"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Blog Card */}
          <div className="bg-white rounded-xl border border-earth-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-earth-900">Blog Content</h2>
              <button
                onClick={toggleActive}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  blog.published
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {blog.published ? 'Published' : 'Draft'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">Title</label>
                <p className="text-earth-900 font-semibold">{blog.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">Slug</label>
                <p className="text-earth-600">{blog.slug}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">Category</label>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-forest-100 text-forest-700">
                  {blog.category || 'Uncategorized'}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">Excerpt</label>
                <p className="text-earth-600">{blog.excerpt || 'No excerpt'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">Content</label>
                <div className="bg-earth-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <p className="text-earth-700 whitespace-pre-wrap">{blog.content}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          {blog.comments && blog.comments.length > 0 && (
            <div className="bg-white rounded-xl border border-earth-100 p-6">
              <h2 className="text-xl font-semibold text-earth-900 mb-6 flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Comments ({blog.comments.length})</span>
              </h2>
              <div className="space-y-4">
                {blog.comments.map((comment, index) => (
                  <div key={index} className="bg-earth-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-earth-900">{comment.name}</span>
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="bg-white rounded-xl border border-earth-100 p-6">
            <h2 className="text-xl font-semibold text-earth-900 mb-4">Statistics</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Eye className="h-5 w-5 text-forest-600" />
                  <span className="text-earth-700">Views</span>
                </div>
                <span className="font-semibold text-earth-900">{blog.views || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-forest-600" />
                  <span className="text-earth-700">Comments</span>
                </div>
                <span className="font-semibold text-earth-900">{blog.comments?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-forest-600" />
                  <span className="text-earth-700">Reading Time</span>
                </div>
                <span className="font-semibold text-earth-900">{blog.readingTime} min</span>
              </div>
            </div>
          </div>

          {/* Meta Information */}
          <div className="bg-white rounded-xl border border-earth-100 p-6">
            <h2 className="text-xl font-semibold text-earth-900 mb-4">Meta Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-earth-400" />
                <div>
                  <p className="text-sm text-earth-500">Published Date</p>
                  <p className="text-earth-900 font-medium">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-earth-400" />
                <div>
                  <p className="text-sm text-earth-500">Status</p>
                  <p className={`font-medium ${blog.published ? 'text-green-600' : 'text-gray-600'}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-earth-900 mb-4">Delete Blog Post</h3>
            <p className="text-earth-600 mb-6">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-earth-600 hover:text-earth-900 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogDetail;
