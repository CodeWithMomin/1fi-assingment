import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product, EMIPlan, Order } from './models/models';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/1fi-marketplace';

const productsData = [
  {
    name: 'iPhone 15 Pro Max',
    description: '256GB — Advanced camera system with 48MP main camera and A17 Pro chip',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=300&fit=crop',
    ],
    originalPrice: 159999,
    discountedPrice: 129999,
    discount: 19,
    rating: 4.8,
    reviewCount: 1250,
    inStock: true,
    brand: 'Apple',
    variants: [
      {
        id: 'v1',
        name: 'Storage',
        options: [
          { id: 'opt1', label: '128GB', value: '128gb', priceAdjustment: -15000 },
          { id: 'opt2', label: '256GB', value: '256gb', priceAdjustment: 0 },
          { id: 'opt3', label: '512GB', value: '512gb', priceAdjustment: 20000 },
        ],
      },
    ],
    warranty: '1 year manufacturer warranty',
    delivery: 'Free delivery in 2–3 days',
  },
  {
    name: 'MacBook Pro 16"',
    description: 'M3 Pro — 16GB RAM, 512GB SSD, 140W fast charge',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    ],
    originalPrice: 139999,
    discountedPrice: 119999,
    discount: 14,
    rating: 4.7,
    reviewCount: 890,
    inStock: true,
    brand: 'Apple',
    variants: [
      {
        id: 'v2',
        name: 'Memory',
        options: [
          { id: 'opt4', label: '16GB', value: '16gb', priceAdjustment: 0 },
          { id: 'opt5', label: '24GB', value: '24gb', priceAdjustment: 15000 },
        ],
      },
    ],
    warranty: '2 years AppleCare',
    delivery: 'Free delivery in 3–5 days',
  },
  {
    name: 'Samsung Galaxy S25 Ultra',
    description: '512GB — Titanium with AI features and built-in S Pen',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf7ce3d0f?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf7ce3d0f?w=400&h=300&fit=crop',
    ],
    originalPrice: 134999,
    discountedPrice: 109999,
    discount: 18,
    rating: 4.6,
    reviewCount: 678,
    inStock: true,
    brand: 'Samsung',
    variants: [
      {
        id: 'v3',
        name: 'Color',
        options: [
          { id: 'opt6', label: 'Titanium Black', value: 'black', priceAdjustment: 0 },
          { id: 'opt7', label: 'Titanium Gray', value: 'gray', priceAdjustment: 0 },
        ],
      },
    ],
    warranty: '1 year Samsung care',
    delivery: 'Free delivery in 2–3 days',
  },
  {
    name: 'Google Pixel 10',
    description: '256GB — Pure Android Experience with Tensor G5 chip',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
    ],
    originalPrice: 79999,
    discountedPrice: 64999,
    discount: 19,
    rating: 4.5,
    reviewCount: 456,
    inStock: true,
    brand: 'Google',
    variants: [
      {
        id: 'v4',
        name: 'Storage',
        options: [
          { id: 'opt8', label: '128GB', value: '128gb', priceAdjustment: -10000 },
          { id: 'opt9', label: '256GB', value: '256gb', priceAdjustment: 0 },
        ],
      },
    ],
    warranty: '2 years Google warranty',
    delivery: 'Free delivery in 3–5 days',
  },
  {
    name: 'OnePlus 15',
    description: '256GB — 100W SUPERVOOC fast charging with Snapdragon 8 Elite',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=300&fit=crop',
    ],
    originalPrice: 49999,
    discountedPrice: 39999,
    discount: 20,
    rating: 4.5,
    reviewCount: 342,
    inStock: true,
    brand: 'OnePlus',
    variants: [
      {
        id: 'v5',
        name: 'RAM',
        options: [
          { id: 'opt10', label: '8GB', value: '8gb', priceAdjustment: 0 },
          { id: 'opt11', label: '12GB', value: '12gb', priceAdjustment: 4000 },
        ],
      },
    ],
    warranty: '1 year warranty',
    delivery: 'Free delivery in 3–5 days',
  },
  {
    name: 'iPad Pro 12.9"',
    description: 'M2 — 256GB with Apple Pencil Support and Liquid Retina XDR display',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1599519389527-1e5b0eb38308?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599519389527-1e5b0eb38308?w=400&h=300&fit=crop',
    ],
    originalPrice: 89999,
    discountedPrice: 74999,
    discount: 17,
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    brand: 'Apple',
    variants: [
      {
        id: 'v6',
        name: 'Storage',
        options: [
          { id: 'opt12', label: '128GB', value: '128gb', priceAdjustment: -10000 },
          { id: 'opt13', label: '256GB', value: '256gb', priceAdjustment: 0 },
        ],
      },
    ],
    warranty: '1 year AppleCare',
    delivery: 'Free delivery in 3–5 days',
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Premium Noise Canceling Wireless Headphones with 30h battery',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    ],
    originalPrice: 29999,
    discountedPrice: 24999,
    discount: 17,
    rating: 4.7,
    reviewCount: 512,
    inStock: true,
    brand: 'Sony',
    variants: [
      {
        id: 'v7',
        name: 'Color',
        options: [
          { id: 'opt14', label: 'Black', value: 'black', priceAdjustment: 0 },
          { id: 'opt15', label: 'Silver', value: 'silver', priceAdjustment: 0 },
        ],
      },
    ],
    warranty: '1 year Sony warranty',
    delivery: 'Free delivery in 2–3 days',
  },
  {
    name: 'Apple Watch Series 9',
    description: '45mm — Always-On Retina Display with blood oxygen and ECG sensors',
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    ],
    originalPrice: 41900,
    discountedPrice: 35990,
    discount: 14,
    rating: 4.6,
    reviewCount: 789,
    inStock: true,
    brand: 'Apple',
    variants: [
      {
        id: 'v8',
        name: 'Size',
        options: [
          { id: 'opt16', label: '41mm', value: '41mm', priceAdjustment: -4000 },
          { id: 'opt17', label: '45mm', value: '45mm', priceAdjustment: 0 },
        ],
      },
    ],
    warranty: '1 year AppleCare',
    delivery: 'Free delivery in 2–3 days',
  },
];

const generateEMIPlans = (productId: string, price: number) => [
  {
    productId,
    tenure: 3,
    monthlyAmount: Math.round(price / 3),
    totalAmount: Math.round(price / 3) * 3,
    interestRate: 0,
    processingFee: 0,
    features: ['0% Interest', 'No Processing Fee', 'Pay in 3 months'],
    isActive: true,
  },
  {
    productId,
    tenure: 6,
    monthlyAmount: Math.round((price * 1.03) / 6),
    totalAmount: Math.round((price * 1.03) / 6) * 6,
    interestRate: 3,
    processingFee: 0,
    features: ['3% Interest Rate', 'No Processing Fee', 'Flexible 6-month tenure'],
    isActive: true,
  },
  {
    productId,
    tenure: 12,
    monthlyAmount: Math.round((price * 1.08) / 12),
    totalAmount: Math.round((price * 1.08) / 12) * 12,
    interestRate: 8,
    processingFee: 199,
    features: ['8% Interest Rate', '199 Processing Fee'],
    isActive: true,
  },
  {
    productId,
    tenure: 24,
    monthlyAmount: Math.round((price * 1.15) / 24),
    totalAmount: Math.round((price * 1.15) / 24) * 24,
    interestRate: 15,
    processingFee: 299,
    features: ['15% Interest Rate', '299 Processing Fee'],
    isActive: true,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);

    await Promise.all([
      Product.deleteMany({}),
      EMIPlan.deleteMany({}),
      Order.deleteMany({}),
    ]);

    const products = await Product.insertMany(productsData);

    const emiPlanDocs = products.flatMap((product) =>
      generateEMIPlans(product._id.toString(), product.discountedPrice)
    );
    const emiPlans = await EMIPlan.insertMany(emiPlanDocs);

    const sampleOrders = [
      {
        userId: 'user-001',
        productId: products[0]._id.toString(),
        selectedVariants: { Storage: '256gb' },
        emiPlanId: emiPlans[0]._id.toString(),
        status: 'confirmed',
        totalAmount: products[0].discountedPrice,
        monthlyAmount: Math.round(products[0].discountedPrice / 3),
        tenureMonths: 3,
      },
      {
        userId: 'user-002',
        productId: products[1]._id.toString(),
        selectedVariants: { Memory: '24gb' },
        emiPlanId: emiPlans[6]._id.toString(),
        status: 'pending',
        totalAmount: products[1].discountedPrice,
        monthlyAmount: Math.round((products[1].discountedPrice * 1.08) / 12),
        tenureMonths: 12,
      },
    ];

    await Order.insertMany(sampleOrders);

    console.log('Seeding complete');
    console.log(`Products: ${products.length}`);
    console.log(`EMI Plans: ${emiPlans.length}`);
    console.log(`Orders: ${sampleOrders.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
