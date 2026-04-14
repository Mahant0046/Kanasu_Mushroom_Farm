import { IndianRupee, Sprout, ShoppingCart, Package } from 'lucide-react';

const StatGrid = ({ kpi }) => {
  const stats = [
    {
      title: 'Total Sales',
      value: `₹${kpi.totalSales.toLocaleString()}`,
      icon: IndianRupee,
      color: 'bg-organic-green-100',
      iconColor: 'text-organic-green-600',
      trend: '+12.5%',
      trendColor: 'text-green-600',
    },
    {
      title: 'Active Harvest Cycles',
      value: kpi.activeHarvestCycles,
      icon: Sprout,
      color: 'bg-organic-brown-100',
      iconColor: 'text-organic-brown-600',
      trend: '+2',
      trendColor: 'text-green-600',
    },
    {
      title: 'Pending Orders',
      value: kpi.pendingOrders,
      icon: ShoppingCart,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      trend: '+5',
      trendColor: 'text-orange-600',
    },
    {
      title: "Today's Harvest Yield",
      value: `${kpi.todayHarvestYield} kg`,
      icon: Package,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trend: '+8.2%',
      trendColor: 'text-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            <span className={`text-sm font-semibold ${stat.trendColor}`}>
              {stat.trend}
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-body mb-1">{stat.title}</h3>
          <p className="text-2xl font-bold text-gray-900 font-heading">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatGrid;
