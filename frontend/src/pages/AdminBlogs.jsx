import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Edit, Trash2, Search, Filter, Eye, ToggleLeft, ToggleRight, Calendar } from 'lucide-react';
import { blogAPI } from '../services/api';

const AdminBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAll({ includeInactive: true });
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (blogId, currentStatus) => {
    try {
      await blogAPI.update(blogId, { published: !currentStatus });
      fetchBlogs();
    } catch (error) {
      console.error('Error toggling blog status:', error);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogAPI.delete(blogId);
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.slug?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'active' && blog.published) ||
                         (filterStatus === 'inactive' && !blog.published);
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-earth-900 mb-2">
            Blog Management
          </h1>
          <p className="text-earth-600">
            Manage your blog posts and articles
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/blogs/new')}
          className="flex items-center space-x-2 bg-forest-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Blog Post</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-earth-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-forest-600 focus:ring-4 focus:ring-forest-100 transition-all appearance-none bg-white"
            >
              <option value="all">All Blogs</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-xl border border-earth-100 overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="h-16 w-16 text-earth-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-earth-900 mb-2">
              No blog posts found
            </h3>
            <p className="text-earth-600 mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first blog post'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button
                onClick={() => navigate('/admin/blogs/new')}
                className="inline-flex items-center space-x-2 bg-forest-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Blog Post</span>
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-earth-50 border-b border-earth-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Blog Post
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-earth-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth-100">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-earth-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <button
                          onClick={() => navigate(`/admin/blogs/${blog._id}`)}
                          className="font-semibold text-earth-900 hover:text-forest-600 transition-colors"
                        >
                          {blog.title}
                        </button>
                        <p className="text-sm text-earth-500">{blog.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-forest-100 text-forest-700">
                        {blog.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-earth-400" />
                        <span className="text-sm text-earth-700">
                          {new Date(blog.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-earth-900">{blog.views || 0}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(blog._id, blog.published)}
                        className="flex items-center space-x-1"
                      >
                        {blog.published ? (
                          <ToggleRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-gray-400" />
                        )}
                        <span className={`text-sm ${blog.published ? 'text-green-600' : 'text-gray-400'}`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => navigate(`/admin/blogs/${blog._id}`)}
                          className="p-2 text-earth-600 hover:text-forest-600 hover:bg-earth-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/blogs/${blog._id}/edit`)}
                          className="p-2 text-earth-600 hover:text-forest-600 hover:bg-earth-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 text-earth-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;
