import StatGrid from '../components/admin/StatGrid';
import RevenueChart from '../components/admin/RevenueChart';
import LiveEnvironmentWidget from '../components/admin/LiveEnvironmentWidget';
import OrdersTable from '../components/admin/OrdersTable';
import farmData from '../data/farmData';

const FarmDashboard = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-organic-brown-900 mb-2">
          Farm Management Dashboard
        </h1>
        <p className="text-gray-600 font-body">
          Monitor your mushroom farm operations in real-time
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-8">
        <StatGrid kpi={farmData.kpi} />
      </div>

      {/* Charts and Environmental Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <RevenueChart data={farmData.revenueChart} />
        <LiveEnvironmentWidget data={farmData.environmental} />
      </div>

      {/* Orders Table */}
      <div>
        <OrdersTable orders={farmData.orders} />
      </div>
    </div>
  );
};

export default FarmDashboard;
