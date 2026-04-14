import { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, AlertTriangle, CheckCircle } from 'lucide-react';

const LiveEnvironmentWidget = ({ data }) => {
  const [sensorData, setSensorData] = useState(data);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temperature: {
          ...prev.temperature,
          current: parseFloat((prev.temperature.current + (Math.random() - 0.5) * 0.5).toFixed(1)),
          status: prev.temperature.current >= 22 && prev.temperature.current <= 25 ? 'optimal' : 'warning',
        },
        humidity: {
          ...prev.humidity,
          current: Math.round(prev.humidity.current + (Math.random() - 0.5) * 3),
          status: prev.humidity.current >= 70 && prev.humidity.current <= 90 ? 'optimal' : 'warning',
        },
        co2: {
          ...prev.co2,
          current: Math.round(prev.co2.current + (Math.random() - 0.5) * 20),
          status: prev.co2.current >= 400 && prev.co2.current <= 800 ? 'optimal' : 'warning',
        },
      }));
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    return status === 'optimal' ? 'text-green-600' : 'text-orange-600';
  };

  const getStatusBg = (status) => {
    return status === 'optimal' ? 'bg-green-100' : 'bg-orange-100';
  };

  const getStatusIcon = (status) => {
    return status === 'optimal' ? CheckCircle : AlertTriangle;
  };

  const metrics = [
    {
      label: 'Temperature',
      value: sensorData.temperature.current,
      unit: sensorData.temperature.unit,
      optimal: `${sensorData.temperature.optimalMin}-${sensorData.temperature.optimalMax}°C`,
      icon: Thermometer,
      status: sensorData.temperature.status,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Humidity',
      value: sensorData.humidity.current,
      unit: sensorData.humidity.unit,
      optimal: `${sensorData.humidity.optimalMin}-${sensorData.humidity.optimalMax}%`,
      icon: Droplets,
      status: sensorData.humidity.status,
      color: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
    },
    {
      label: 'CO2 Level',
      value: sensorData.co2.current,
      unit: sensorData.co2.unit,
      optimal: `${sensorData.co2.optimalMin}-${sensorData.co2.optimalMax} ppm`,
      icon: Wind,
      status: sensorData.co2.status,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-gray-900">
          Environmental Monitoring
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="font-body">Live</span>
          <span className="font-body">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="relative p-6 rounded-xl border-2 transition-all hover:shadow-md"
            style={{
              borderColor: metric.status === 'optimal' ? '#10B981' : '#F59E0B',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.color} p-3 rounded-lg`}>
                <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
              </div>
              <div className={`${getStatusBg(metric.status)} px-3 py-1 rounded-full flex items-center space-x-1`}>
                {(() => {
                  const Icon = getStatusIcon(metric.status);
                  return <Icon className={`h-4 w-4 ${getStatusColor(metric.status)}`} />;
                })()}
                <span className={`text-xs font-semibold ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
            </div>

            <div className="mb-2">
              <p className="text-3xl font-bold text-gray-900 font-heading">
                {metric.value}
                <span className="text-lg text-gray-500 ml-1">{metric.unit}</span>
              </p>
              <p className="text-sm text-gray-500 font-body">{metric.label}</p>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-body">
                Optimal: <span className="font-semibold text-gray-700">{metric.optimal}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-organic-cream-100 rounded-lg">
        <p className="text-sm text-gray-600 font-body">
          <strong className="text-organic-brown-700">Note:</strong> Sensor data updates every 5 seconds. 
          Values outside optimal range will trigger automated alerts.
        </p>
      </div>
    </div>
  );
};

export default LiveEnvironmentWidget;
