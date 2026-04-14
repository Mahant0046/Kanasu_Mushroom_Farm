const RevenueChart = ({ data }) => {
  const { labels, productionYield, salesRevenue } = data;

  const maxValue = Math.max(...productionYield, ...salesRevenue.map(v => v / 100));
  const chartHeight = 300;
  const chartWidth = 800;
  const padding = 60;
  const barWidth = 30;
  const gap = 20;

  const getY = (value) => {
    return chartHeight - padding - (value / maxValue) * (chartHeight - 2 * padding);
  };

  const getX = (index, series) => {
    const seriesOffset = series === 'production' ? 0 : barWidth + 5;
    return padding + index * (2 * barWidth + gap + 5) + seriesOffset;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-heading font-semibold text-gray-900 mb-6">
        Production Yield vs Sales Revenue (Last 6 Months)
      </h3>
      
      <div className="overflow-x-auto">
        <svg width={chartWidth} height={chartHeight} className="mx-auto">
          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding + ratio * (chartHeight - 2 * padding);
            return (
              <line
                key={ratio}
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4"
              />
            );
          })}

          {/* Y-Axis Labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const value = Math.round(ratio * maxValue);
            const y = padding + ratio * (chartHeight - 2 * padding);
            return (
              <text
                key={ratio}
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs fill-gray-500 font-body"
              >
                {value}
              </text>
            );
          })}

          {/* Production Yield Bars */}
          {labels.map((label, index) => (
            <g key={`prod-${index}`}>
              <rect
                x={getX(index, 'production')}
                y={getY(productionYield[index])}
                width={barWidth}
                height={padding + (productionYield[index] / maxValue) * (chartHeight - 2 * padding) - getY(productionYield[index])}
                fill="#2D5A27"
                rx="4"
              />
              <text
                x={getX(index, 'production') + barWidth / 2}
                y={getY(productionYield[index]) - 8}
                textAnchor="middle"
                className="text-xs fill-organic-green-600 font-semibold font-body"
              >
                {productionYield[index]}
              </text>
            </g>
          ))}

          {/* Sales Revenue Bars */}
          {labels.map((label, index) => (
            <g key={`sales-${index}`}>
              <rect
                x={getX(index, 'sales')}
                y={getY(salesRevenue[index] / 100)}
                width={barWidth}
                height={padding + (salesRevenue[index] / 100 / maxValue) * (chartHeight - 2 * padding) - getY(salesRevenue[index] / 100)}
                fill="#5C4033"
                rx="4"
              />
              <text
                x={getX(index, 'sales') + barWidth / 2}
                y={getY(salesRevenue[index] / 100) - 8}
                textAnchor="middle"
                className="text-xs fill-organic-brown-600 font-semibold font-body"
              >
                {salesRevenue[index] / 100}
              </text>
            </g>
          ))}

          {/* X-Axis Labels */}
          {labels.map((label, index) => (
            <text
              key={label}
              x={getX(index, 'production') + barWidth + gap / 2}
              y={chartHeight - padding + 20}
              textAnchor="middle"
              className="text-xs fill-gray-600 font-body font-semibold"
            >
              {label}
            </text>
          ))}

          {/* Legend */}
          <g transform="translate(padding, chartHeight - 20)">
            <rect x={0} y={0} width={16} height={16} fill="#2D5A27" rx="4" />
            <text x={24} y={13} className="text-xs fill-gray-700 font-body">Production (kg)</text>
            
            <rect x={150} y={0} width={16} height={16} fill="#5C4033" rx="4" />
            <text x={174} y={13} className="text-xs fill-gray-700 font-body">Revenue (x100)</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default RevenueChart;
