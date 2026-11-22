export const initialProducts = [
  {
    id: 1,
    name: 'Laptop',
    price: 650,
    category: 'Computers',
    image: '💻',
    specs: '15.6" FHD • 16GB RAM • 512GB SSD',
    description: 'High-performance laptop engineered for productivity, coding, and multitasking.',
  },
  {
    id: 2,
    name: 'Mouse',
    price: 15,
    category: 'Accessories',
    image: '🖱️',
    specs: 'Wireless 2.4GHz • Ergonomic • 1600 DPI',
    description: 'Ergonomic silent optical mouse with precision sensor and long battery life.',
  },
  {
    id: 3,
    name: 'Keyboard',
    price: 25,
    category: 'Accessories',
    image: '⌨️',
    specs: 'Tenkeyless • Tactile Switches • RGB Backlight',
    description: 'Durable mechanical-feel keyboard designed for comfortable daily typing.',
  },
  {
    id: 4,
    name: 'Monitor',
    price: 120,
    category: 'Display',
    image: '🖥️',
    specs: '24" IPS • 1080p Full HD • 75Hz Refresh',
    description: 'Crisp IPS display with ultra-thin bezels and vibrant color reproduction.',
  },
];

export const shippingOptions = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    time: '2-3 Business Days',
    cost: 5.0,
    icon: '📦',
  },
  {
    id: 'express',
    name: 'Express Delivery',
    time: 'Next Day / Within 24h',
    cost: 15.0,
    icon: '⚡',
  },
  {
    id: 'pickup',
    name: 'Store Pickup',
    time: 'Available Today',
    cost: 0.0,
    icon: '🏬',
  },
];
