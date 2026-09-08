/**
 * Mongoose Models for 1Fi Marketplace
 */

import mongoose, { Schema, Document } from 'mongoose';

// Product Variant Interface
export interface IVariant {
  id: string;
  name: string;
  options: {
    id: string;
    label: string;
    value: string;
  }[];
}

// Product Interface
export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  images: string[];
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  variants: IVariant[];
  warranty: string;
  delivery: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}

// EMI Plan Interface
export interface IEMIPlan extends Document {
  _id: string;
  productId: string;
  tenure: number;
  monthlyAmount: number;
  totalAmount: number;
  interestRate: number;
  processingFee: number;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Order Interface
export interface IOrder extends Document {
  _id: string;
  userId: string;
  productId: string;
  selectedVariants: Record<string, string>;
  emiPlanId: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  monthlyAmount: number;
  tenureMonths: number;
  createdAt: Date;
  updatedAt: Date;
}

// Product Schema
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Electronics', 'Accessories', 'Wearables', 'Gaming', 'Audio'],
    },
    image: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    discountedPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    brand: {
      type: String,
      required: true,
    },
    variants: [
      {
        id: String,
        name: String,
        options: [
          {
            id: String,
            label: String,
            value: String,
          },
        ],
      },
    ],
    warranty: {
      type: String,
      default: '1 year',
    },
    delivery: {
      type: String,
      default: 'Free delivery in 3-5 days',
    },
  },
  { timestamps: true }
);

// EMI Plan Schema
const emiPlanSchema = new Schema<IEMIPlan>(
  {
    productId: {
      type: String,
      required: true,
      ref: 'Product',
    },
    tenure: {
      type: Number,
      required: true,
      enum: [3, 6, 12, 24],
    },
    monthlyAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    interestRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    processingFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    features: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Order Schema
const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
      ref: 'Product',
    },
    selectedVariants: {
      type: Map,
      of: String,
      default: {},
    },
    emiPlanId: {
      type: String,
      required: true,
      ref: 'EMIPlan',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    monthlyAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    tenureMonths: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Create Indexes
productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text' });
emiPlanSchema.index({ productId: 1, tenure: 1 });
orderSchema.index({ userId: 1, createdAt: -1 });

// Models
export const Product = mongoose.model<IProduct>('Product', productSchema);
export const EMIPlan = mongoose.model<IEMIPlan>('EMIPlan', emiPlanSchema);
export const Order = mongoose.model<IOrder>('Order', orderSchema);