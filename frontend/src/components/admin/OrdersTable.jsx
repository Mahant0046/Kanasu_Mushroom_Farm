const OrdersTable = ({ orders }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getFulfillmentColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'in-transit':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-heading font-semibold text-gray-900">
          Order Management
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-organic-cream-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-body uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-body uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-body uppercase tracking-wider">
                Variety
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-body uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-body uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-body uppercase tracking-wider">
                Fulfillment
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-body uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-semibold text-gray-900 font-body">{order.id}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-gray-900 font-body">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700 font-body">{order.variety}</span>
                  <p className="text-xs text-gray-500 capitalize">{order.productType}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900 font-body font-semibold">{order.quantity} kg</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(
                      order.paymentStatus
                    )}`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getFulfillmentColor(
                      order.fulfillmentStatus
                    )}`}
                  >
                    {order.fulfillmentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-organic-green-600 hover:text-organic-green-800 font-body text-sm font-semibold">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-gray-500 font-body">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
