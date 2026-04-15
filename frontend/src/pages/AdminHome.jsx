import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sprout, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  RefreshCw,
  FileText,
  ArrowRight,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react';

const AdminHome = () => {
  const sections = [
    {
      title: 'Overview',
      description: 'View overall platform statistics and performance metrics',
      icon: LayoutDashboard,
      path: '/admin',
      color: 'bg-forest-100 text-forest-700',
      stats: ['Products', 'Orders', 'Revenue']
    },
    {
      title: 'Farm Monitoring',
      description: 'Monitor mushroom growth, environmental conditions, and harvest cycles',
      icon: Sprout,
      path: '/admin/farm',
      color: 'bg-green-100 text-green-700',
      stats: ['Temperature', 'Humidity', 'CO2']
    },
    {
      title: 'Product Management',
      description: 'Manage mushroom varieties, inventory, and product listings',
      icon: Package,
      path: '/admin/products',
      color: 'bg-amber-100 text-amber-700',
      stats: ['Varieties', 'Stock', 'Categories']
    },
    {
      title: 'Order Management',
      description: 'Process and track customer orders and shipments',
      icon: ShoppingCart,
      path: '/admin/orders',
      color: 'bg-blue-100 text-blue-700',
      stats: ['Pending', 'Processing', 'Delivered']
    },
    {
      title: 'Reviews Management',
      description: 'Moderate and respond to customer product reviews',
      icon: MessageSquare,
      path: '/admin/reviews',
      color: 'bg-purple-100 text-purple-700',
      stats: ['Total', 'Average Rating', 'Pending']
    },
    {
      title: 'Subscriptions',
      description: 'Manage recurring subscription plans and customer subscriptions',
      icon: RefreshCw,
      path: '/admin/subscriptions',
      color: 'bg-orange-100 text-orange-700',
      stats: ['Active', 'Paused', 'Cancelled']
    },
    {
      title: 'Blog Management',
      description: 'Create and manage blog posts, articles, and content',
      icon: FileText,
      path: '/admin/blogs',
      color: 'bg-teal-100 text-teal-700',
      stats: ['Posts', 'Published', 'Drafts']
    }
  ];

  const quickStats = [
    { label: 'Total Products', value: '24', icon: Package, color: 'text-forest-600' },
    { label: 'Active Orders', value: '18', icon: ShoppingCart, color: 'text-amber-600' },
    { label: 'Total Reviews', value: '156', icon: MessageSquare, color: 'text-purple-600' },
    { label: 'Subscriptions', value: '42', icon: RefreshCw, color: 'text-orange-600' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-earth-900 mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-earth-600 text-lg">
          Manage your mushroom farm and e-commerce operations
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-earth-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-earth-900">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Admin Sections */}
      <div className="mb-8">
        <h2 className="text-2xl font-display font-semibold text-earth-900 mb-4">
          Admin Functions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <Link
              key={index}
              to={section.path}
              className="group bg-white rounded-xl p-6 border border-earth-100 shadow-sm hover:shadow-lg hover:border-forest-300 transition-all"
            >
              <div className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <section.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-display font-semibold text-earth-900 mb-2 group-hover:text-forest-600 transition-colors">
                {section.title}
              </h3>
              <p className="text-earth-600 text-sm mb-4">
                {section.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-earth-500">
                  {section.stats.map((stat, i) => (
                    <span key={i} className="bg-earth-50 px-2 py-1 rounded">
                      {stat}
                    </span>
                  ))}
                </div>
                <ArrowRight className="h-4 w-4 text-earth-400 group-hover:text-forest-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-forest-50 rounded-xl p-6 border border-forest-200">
        <h3 className="text-xl font-display font-semibold text-earth-900 mb-4 flex items-center space-x-2">
          <Activity className="h-5 w-5 text-forest-600" />
          <span>Quick Actions</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-white text-earth-900 py-3 px-4 rounded-lg font-semibold hover:bg-forest-600 hover:text-white transition-colors border border-earth-200">
            Add New Product
          </button>
          <button className="bg-white text-earth-900 py-3 px-4 rounded-lg font-semibold hover:bg-forest-600 hover:text-white transition-colors border border-earth-200">
            View All Orders
          </button>
          <button className="bg-white text-earth-900 py-3 px-4 rounded-lg font-semibold hover:bg-forest-600 hover:text-white transition-colors border border-earth-200">
            Generate Report
          </button>
          <button className="bg-white text-earth-900 py-3 px-4 rounded-lg font-semibold hover:bg-forest-600 hover:text-white transition-colors border border-earth-200">
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
