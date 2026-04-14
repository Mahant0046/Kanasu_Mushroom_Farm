// Mock data for Farm Management Dashboard
export const farmData = {
  // KPI Metrics
  kpi: {
    totalSales: 245000,
    activeHarvestCycles: 12,
    pendingOrders: 34,
    todayHarvestYield: 156.5, // in kg
    totalRevenue: 285000,
  },

  // Revenue Chart Data (Production Yield vs Sales Revenue - Last 6 months)
  revenueChart: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    productionYield: [120, 145, 132, 158, 175, 165], // in kg
    salesRevenue: [38000, 45000, 41000, 52000, 58000, 55000], // in INR
  },

  // Environmental Sensor Data (Real-time simulation)
  environmental: {
    temperature: {
      current: 23.5,
      optimalMin: 22,
      optimalMax: 25,
      unit: '°C',
      status: 'optimal',
    },
    humidity: {
      current: 78,
      optimalMin: 70,
      optimalMax: 90,
      unit: '%',
      status: 'optimal',
    },
    co2: {
      current: 650,
      optimalMin: 400,
      optimalMax: 800,
      unit: 'ppm',
      status: 'optimal',
    },
  },

  // Mushroom Varieties with Growth Cycles
  mushroomVarieties: [
    {
      id: 1,
      name: 'Button Mushroom',
      type: 'fresh',
      category: 'button',
      growthCycleDays: 21,
      currentCycle: {
        id: 'CYC-001',
        startDate: '2024-03-15',
        harvestDate: '2024-04-05',
        status: 'harvesting',
        expectedYield: 45, // kg
        actualYield: 42.5,
      },
      inventory: {
        fresh: 120, // kg
        dried: 25, // kg
        powder: 15, // kg
        pickle: 30, // kg
      },
      batchTracking: [
        {
          batchId: 'BTN-2024-001',
          harvestDate: '2024-03-20',
          expiryDate: '2024-03-22',
          quantity: 25,
          status: 'fresh',
          expiryWarning: true, // 48 hours before expiry
        },
        {
          batchId: 'BTN-2024-002',
          harvestDate: '2024-03-21',
          expiryDate: '2024-03-23',
          quantity: 30,
          status: 'fresh',
          expiryWarning: false,
        },
      ],
    },
    {
      id: 2,
      name: 'Oyster Mushroom',
      type: 'fresh',
      category: 'oyster',
      growthCycleDays: 18,
      currentCycle: {
        id: 'CYC-002',
        startDate: '2024-03-18',
        harvestDate: '2024-04-05',
        status: 'growing',
        expectedYield: 35,
        actualYield: 0,
      },
      inventory: {
        fresh: 85,
        dried: 20,
        powder: 12,
        pickle: 18,
      },
      batchTracking: [
        {
          batchId: 'OYS-2024-001',
          harvestDate: '2024-03-22',
          expiryDate: '2024-03-24',
          quantity: 20,
          status: 'fresh',
          expiryWarning: false,
        },
      ],
    },
    {
      id: 3,
      name: 'Shiitake Mushroom',
      type: 'fresh',
      category: 'shiitake',
      growthCycleDays: 28,
      currentCycle: {
        id: 'CYC-003',
        startDate: '2024-03-10',
        harvestDate: '2024-04-07',
        status: 'growing',
        expectedYield: 28,
        actualYield: 0,
      },
      inventory: {
        fresh: 45,
        dried: 35,
        powder: 22,
        pickle: 15,
      },
      batchTracking: [
        {
          batchId: 'SHI-2024-001',
          harvestDate: '2024-03-19',
          expiryDate: '2024-03-21',
          quantity: 18,
          status: 'fresh',
          expiryWarning: true,
        },
      ],
    },
    {
      id: 4,
      name: 'Milky Mushroom',
      type: 'fresh',
      category: 'milky',
      growthCycleDays: 25,
      currentCycle: {
        id: 'CYC-004',
        startDate: '2024-03-12',
        harvestDate: '2024-04-06',
        status: 'growing',
        expectedYield: 32,
        actualYield: 0,
      },
      inventory: {
        fresh: 65,
        dried: 18,
        powder: 10,
        pickle: 22,
      },
      batchTracking: [],
    },
  ],

  // Orders Management Data
  orders: [
    {
      id: 'ORD-001',
      customer: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      variety: 'Button Mushroom',
      productType: 'fresh',
      quantity: 5, // kg
      totalAmount: 1250,
      paymentStatus: 'paid',
      fulfillmentStatus: 'processing',
      orderDate: '2024-03-22',
      deliveryDate: '2024-03-24',
      address: '123 Main St, Bangalore',
    },
    {
      id: 'ORD-002',
      customer: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      variety: 'Oyster Mushroom',
      productType: 'dried',
      quantity: 2, // kg
      totalAmount: 800,
      paymentStatus: 'paid',
      fulfillmentStatus: 'in-transit',
      orderDate: '2024-03-21',
      deliveryDate: '2024-03-23',
      address: '456 Oak Ave, Mumbai',
    },
    {
      id: 'ORD-003',
      customer: 'Amit Patel',
      email: 'amit.patel@email.com',
      variety: 'Shiitake Mushroom',
      productType: 'powder',
      quantity: 1, // kg
      totalAmount: 750,
      paymentStatus: 'pending',
      fulfillmentStatus: 'processing',
      orderDate: '2024-03-22',
      deliveryDate: '2024-03-25',
      address: '789 Pine Rd, Delhi',
    },
    {
      id: 'ORD-004',
      customer: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      variety: 'Mixed Variety Pack',
      productType: 'pickle',
      quantity: 3, // kg
      totalAmount: 1800,
      paymentStatus: 'paid',
      fulfillmentStatus: 'delivered',
      orderDate: '2024-03-20',
      deliveryDate: '2024-03-22',
      address: '321 Elm St, Hyderabad',
    },
    {
      id: 'ORD-005',
      customer: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      variety: 'Button Mushroom',
      productType: 'fresh',
      quantity: 10, // kg
      totalAmount: 2500,
      paymentStatus: 'paid',
      fulfillmentStatus: 'processing',
      orderDate: '2024-03-22',
      deliveryDate: '2024-03-24',
      address: '654 Maple Dr, Chennai',
    },
  ],

  // Logistics Tracking (Temperature-controlled shipping)
  logistics: [
    {
      trackingId: 'TRK-001',
      orderId: 'ORD-002',
      status: 'in-transit',
      currentLocation: 'Mumbai Distribution Center',
      destination: '456 Oak Ave, Mumbai',
      temperature: 4, // °C
      temperatureStatus: 'optimal', // optimal, warning, critical
      estimatedDelivery: '2024-03-23',
      lastUpdate: '2024-03-22 14:30',
    },
    {
      trackingId: 'TRK-002',
      orderId: 'ORD-004',
      status: 'delivered',
      currentLocation: '321 Elm St, Hyderabad',
      destination: '321 Elm St, Hyderabad',
      temperature: 5,
      temperatureStatus: 'optimal',
      estimatedDelivery: '2024-03-22',
      lastUpdate: '2024-03-22 10:15',
    },
  ],
};

export default farmData;
