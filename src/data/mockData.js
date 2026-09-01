// BSmart E-Commerce Comprehensive Mock Data

export const HERO_BANNERS = [
  {
    id: 1,
    title: "8.8 GREAT SALE — KITCHEN ESSENTIALS",
    subtitle: "Cook smarter with amazing deals",
    discountText: "UP TO 60% OFF",
    buttonText: "Shop Sale Now",
    bgGradient: "linear-gradient(135deg, #FF0055 0%, #FF5722 50%, #FFA000 100%)",
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    category: "Kitchen & Home"
  },
  {
    id: 2,
    title: "BSMART AI SHOPPING ASSISTANT",
    subtitle: "Ask in Bangla or English — I'll find, compare & explain options",
    discountText: "AI POWERED",
    buttonText: "Try Habib AI",
    bgGradient: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    category: "Smart Tech"
  },
  {
    id: 3,
    title: "DIGITAL SHEBA & UTILITIES",
    subtitle: "Mobile top-up, bill pay, game diamonds & vouchers instantly!",
    discountText: "INSTANT CASHBACK",
    buttonText: "Explore Sheba",
    bgGradient: "linear-gradient(135deg, #059669 0%, #10B981 50%, #3B82F6 100%)",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    category: "Digital Sheba"
  }
];

export const QUICK_ACTIONS = [
  { id: "mall", title: "BSmart Mall", icon: "Building2", color: "#F57224", badge: "Official" },
  { id: "orders", title: "My Orders", icon: "PackageCheck", color: "#FF6B00", badge: "2 Active" },
  { id: "sheba", title: "Digital Sheba", icon: "Zap", color: "#6366F1", badge: "Top-Up" },
  { id: "mart", title: "BSmart Mart", icon: "ShoppingCart", color: "#10B981", badge: "Express" },
  { id: "rewards", title: "Rewards Hub", icon: "Coins", color: "#F59E0B", badge: "850 Coins" },
  { id: "compare", title: "Compare Hub", icon: "GitCompare", color: "#EC4899", badge: "Smart Tool" },
  { id: "live", title: "Live & Shorts", icon: "PlaySquare", color: "#EF4444", badge: "LIVE" },
  { id: "help", title: "Help Center", icon: "Headphones", color: "#06B6D4", badge: "24/7" }
];

export const FLASH_SALE_PRODUCTS = [
  {
    id: "prod-1",
    name: "AirBeat Pro ANC Wireless Headphones",
    store: "HamTam · OFFICIAL STORE",
    price: 1250,
    originalPrice: 1650,
    discountPercent: 24,
    rating: 4.8,
    reviewsCount: 2400,
    soldCount: "5.1k sold",
    soldPercent: 82,
    badgeText: "Best Seller",
    coinSavings: "Coin save ৳50",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Black", code: "#18181B" },
      { name: "White", code: "#F4F4F5" },
      { name: "Navy Blue", code: "#1E3A8A" },
      { name: "Crimson Red", code: "#DC2626" }
    ],
    features: [
      "360° Gaming Spatial Sound",
      "Noise-Reducing HD Mic",
      "Ultra-Low Latency (38ms)",
      "40 Hours Playtime",
      "Active Noise Cancellation (ANC)"
    ],
    perks: [
      "Buy 3 for Free Shipping (Capped at ৳150)",
      "Buy 10 and Get 1 Free Gift (till stock lasts)",
      "Free Returns within 14 days, no questions asked"
    ]
  },
  {
    id: "prod-2",
    name: "Compact Adjustable Dumbbell Set (20kg)",
    store: "Fitness Pro Store",
    price: 1299,
    originalPrice: 1732,
    discountPercent: 25,
    rating: 4.7,
    reviewsCount: 850,
    soldCount: "3.2k sold",
    soldPercent: 68,
    badgeText: "Flash Deal",
    coinSavings: "Coin save ৳30",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80",
    colors: [{ name: "Matte Black", code: "#27272A" }],
    features: ["Non-Slip Ergonomic Grip", "High-Density Iron Weights", "Quick Lock Mechanism"]
  },
  {
    id: "prod-3",
    name: "Flagship 5G Smartphone 256GB / 12GB RAM",
    store: "TechMart Global",
    price: 111111,
    originalPrice: 148148,
    discountPercent: 25,
    rating: 4.9,
    reviewsCount: 3100,
    soldCount: "2.2k sold",
    soldPercent: 91,
    badgeText: "Flagship",
    coinSavings: "Coin save ৳500",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Titanium Gray", code: "#64748B" },
      { name: "Phantom Black", code: "#09090B" }
    ],
    features: ["120Hz LTPO AMOLED", "200MP OIS Camera", "5000mAh 120W Fast Charge"]
  },
  {
    id: "prod-4",
    name: "Ultralight Breathable Running Sneakers",
    store: "SportX Official",
    price: 2299,
    originalPrice: 3536,
    discountPercent: 35,
    rating: 4.8,
    reviewsCount: 1950,
    soldCount: "5.2k sold",
    soldPercent: 75,
    badgeText: "Top Choice",
    coinSavings: "Coin save ৳40",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "White Orange", code: "#FF5722" },
      { name: "Cyan Black", code: "#06B6D4" }
    ],
    features: ["Nitrogen-Infused Cushion", "Breathable Mesh Upper", "Anti-Slip Rubber Sole"]
  }
];

export const CATEGORIES = [
  { id: "cat-1", name: "Electronics & Tech", icon: "Laptop", count: "12,450+ items" },
  { id: "cat-2", name: "Fashion & Apparel", icon: "Shirt", count: "45,000+ items" },
  { id: "cat-3", name: "Kitchen & Home", icon: "CookingPot", count: "8,900+ items" },
  { id: "cat-4", name: "Digital Sheba", icon: "Smartphone", count: "Instant delivery" },
  { id: "cat-5", name: "Health & Fitness", icon: "Dumbbell", count: "3,200+ items" },
  { id: "cat-6", name: "Beauty & Personal Care", icon: "Sparkles", count: "15,800+ items" },
  { id: "cat-7", name: "Groceries & Mart", icon: "Apple", count: "Delivery in 2 hrs" },
  { id: "cat-8", name: "Gaming & Entertainment", icon: "Gamepad2", count: "Codes & Hardware" }
];

export const COMPARE_ITEMS = [
  {
    id: "cmp-1",
    name: "FastSpeed NVMe SSD 128GB",
    variant: "M.2 PCIe 4.0",
    price: 3480,
    rating: 4.7,
    reviewsCount: 86,
    delivery: "Tomorrow (Dhaka)",
    seller: "BSmart Mall Verified",
    warranty: "12 Months Official",
    returnPeriod: "14 Days Free Return",
    readSpeed: "3500 MB/s",
    durability: "High (No Moving Parts)",
    powerUsage: "Low (2.5W)",
    badge: "Best Value",
    image: "https://images.unsplash.com/photo-1597872240959-29aea88c9287?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cmp-2",
    name: "DataVault Mechanical HDD 128GB",
    variant: "3.5\" SATA III",
    price: 2880,
    rating: 4.2,
    reviewsCount: 128,
    delivery: "In 4 Days",
    seller: "Verified Tech Seller",
    warranty: "6 Months Seller",
    returnPeriod: "7 Days Return",
    readSpeed: "150 MB/s",
    durability: "Moderate (Mechanical Disk)",
    powerUsage: "Medium (6.5W)",
    badge: "Budget Option",
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=600&q=80"
  }
];

export const DIGITAL_SHEBA_DATA = {
  vouchers: [
    { id: "v1", name: "Foodpanda Voucher", discount: "৳100 OFF", price: 100, color: "#E21B70", logo: "Utensils" },
    { id: "v2", name: "Uber Eats Voucher", discount: "৳150 OFF", price: 150, color: "#06C167", logo: "Car" },
    { id: "v3", name: "Star Cineplex Ticket", discount: "৳200 Value", price: 200, color: "#EAB308", logo: "Film" }
  ],
  games: [
    { id: "g1", name: "Free Fire 100+10 Diamonds", price: 100, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=500&q=80" },
    { id: "g2", name: "PUBG Mobile 60 UC", price: 150, image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=500&q=80" },
    { id: "g3", name: "Mobile Legends 86 Diamonds", price: 100, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=500&q=80" }
  ],
  subscriptions: [
    { id: "s1", name: "Netflix Premium (1 Month)", price: 250, color: "#E50914", logo: "Tv" },
    { id: "s2", name: "YouTube Premium (1 Month)", price: 159, color: "#FF0000", logo: "Youtube" },
    { id: "s3", name: "Spotify Premium (1 Month)", price: 180, color: "#1DB954", logo: "Music" }
  ]
};

export const REWARDS_TASKS = [
  { id: "t1", title: "Place & complete 1 order", reward: "30 Coins", progress: "10 / 30", completed: false },
  { id: "t2", title: "Daily App Check-in", reward: "50 Coins", progress: "Claim Ready!", completed: true, claimable: true },
  { id: "t3", title: "Play BSmart Spin & Win", reward: "Up to 50 Coins", progress: "20 / 50", completed: false },
  { id: "t4", title: "Watch Live Stream (5 mins)", reward: "15 Coins", progress: "0 / 5 mins", completed: false }
];

export const SAMPLE_AI_PRESETS = [
  "Tea under ৳1,000",
  "Compare SSD vs HDD",
  "Best wireless headphones",
  "Track order #BS-948271",
  "Top digital goods vouchers"
];

export const ACTIVE_ORDER_DATA = {
  orderId: "BS-948271",
  date: "Sep 03, 2026",
  estimatedDelivery: "Sep 05, 2026 by 4:00 PM",
  statusStep: 3, // 1: Placed, 2: Confirmed, 3: In Transit, 4: Out for Delivery, 5: Delivered
  courier: "BSmart Express Priority",
  trackingNumber: "BSE-8829471920-DH",
  items: [
    {
      name: "AirBeat Pro ANC Wireless Headphones",
      qty: 1,
      price: 1250,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80"
    }
  ],
  timeline: [
    { title: "Order Placed", time: "Sep 03, 08:30 AM", status: "completed" },
    { title: "Payment Verified (bKash)", time: "Sep 03, 08:32 AM", status: "completed" },
    { title: "Package Handed over to BSmart Express Hub", time: "Sep 03, 01:15 PM", status: "current" },
    { title: "Out for Delivery (Dhaka Central)", time: "Expected Sep 04", status: "upcoming" },
    { title: "Delivered to Recipient", time: "Expected Sep 05", status: "upcoming" }
  ]
};

// --- RETAILER DASHBOARD MOCK DATA ---
export const RETAILER_METRICS = {
  storeName: "HamTam Electronics & Gadgets Store",
  verifiedBadge: "BSmart Gold Retailer",
  monthlyRevenue: 485000,
  revenueGrowth: "+18.4%",
  totalOrders: 1420,
  avgOrderValue: 3415,
  activeListings: 84,
  returnRate: "1.8%",
  customerRating: 4.85
};

export const RETAILER_SALES_TREND = [
  { month: "Jan", sales: 320000, orders: 940 },
  { month: "Feb", sales: 350000, orders: 1020 },
  { month: "Mar", sales: 410000, orders: 1200 },
  { month: "Apr (Eid)", sales: 620000, orders: 1850 },
  { month: "May", sales: 380000, orders: 1110 },
  { month: "Jun", sales: 430000, orders: 1280 },
  { month: "Jul", sales: 450000, orders: 1340 },
  { month: "Aug (8.8)", sales: 680000, orders: 1980 },
  { month: "Sep", sales: 485000, orders: 1420 }
];

// 10-Year Macro Data for Bangladesh E-Commerce Market (2016-2026)
export const TEN_YEAR_HISTORICAL_DATA = [
  { year: "2016", ecomGrowth: 100, consumerDemandIndex: 42, mobilePenetration: 38, avgInflation: 5.5, b2bVolumeIndex: 30 },
  { year: "2017", ecomGrowth: 135, consumerDemandIndex: 48, mobilePenetration: 45, avgInflation: 5.7, b2bVolumeIndex: 42 },
  { year: "2018", ecomGrowth: 180, consumerDemandIndex: 56, mobilePenetration: 54, avgInflation: 5.6, b2bVolumeIndex: 58 },
  { year: "2019", ecomGrowth: 240, consumerDemandIndex: 65, mobilePenetration: 62, avgInflation: 5.5, b2bVolumeIndex: 75 },
  { year: "2020", ecomGrowth: 390, consumerDemandIndex: 82, mobilePenetration: 75, avgInflation: 5.7, b2bVolumeIndex: 110 },
  { year: "2021", ecomGrowth: 520, consumerDemandIndex: 95, mobilePenetration: 81, avgInflation: 6.1, b2bVolumeIndex: 160 },
  { year: "2022", ecomGrowth: 680, consumerDemandIndex: 112, mobilePenetration: 86, avgInflation: 7.7, b2bVolumeIndex: 220 },
  { year: "2023", ecomGrowth: 840, consumerDemandIndex: 128, mobilePenetration: 89, avgInflation: 9.0, b2bVolumeIndex: 290 },
  { year: "2024", ecomGrowth: 1050, consumerDemandIndex: 146, mobilePenetration: 92, avgInflation: 8.5, b2bVolumeIndex: 370 },
  { year: "2025", ecomGrowth: 1320, consumerDemandIndex: 168, mobilePenetration: 95, avgInflation: 7.8, b2bVolumeIndex: 460 },
  { year: "2026 (Now)", ecomGrowth: 1650, consumerDemandIndex: 195, mobilePenetration: 97, avgInflation: 6.9, b2bVolumeIndex: 580 }
];

// --- WHOLESALER DASHBOARD MOCK DATA ---
export const WHOLESALER_METRICS = {
  companyName: "Apex Global Wholesale Bangladesh Ltd.",
  verifiedBadge: "BSmart Enterprise Wholesaler",
  grossBulkSales: 2850000,
  growthRate: "+24.8%",
  bulkShipments: 380,
  verifiedRetailers: 142,
  warehouseStorage: "84% Full",
  avgMargin: "16.5%"
};

export const WHOLESALER_REGIONAL_DISTRIBUTION = [
  { region: "Dhaka Central", shipments: 185, volumeValue: 1380000 },
  { region: "Chittagong Port Zone", shipments: 92, volumeValue: 720000 },
  { region: "Sylhet Hub", shipments: 58, volumeValue: 450000 },
  { region: "Rajshahi North", shipments: 45, volumeValue: 300000 }
];

export const WHOLESALER_TOP_RETAILERS = [
  { name: "HamTam Electronics", ordersThisMonth: 18, totalVolume: "৳4,85,000", creditTerm: "15 Days Net" },
  { name: "Dhaka Tech Hub", ordersThisMonth: 14, totalVolume: "৳3,90,000", creditTerm: "30 Days Net" },
  { name: "Chittagong Mart", ordersThisMonth: 12, totalVolume: "৳3,20,000", creditTerm: "Prepaid" },
  { name: "Sylhet Digital Sheba", ordersThisMonth: 9, totalVolume: "৳2,40,000", creditTerm: "15 Days Net" }
];

