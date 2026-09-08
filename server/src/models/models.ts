import mongoose, { Schema, Document } from 'mongoose';

export interface IVariantOption {
  id: string;
  label: string;
  value: string;
  priceAdjustment?: number;
}

export interface IVariant {
  id: string;
  name: string;
  options: IVariantOption[];
}

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
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

export interface IEMIPlan extends Document {
  _id: mongoose.Types.ObjectId;
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

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  userId: string;
  productId: string;
  selectedVariants: Map<string, string>;
  emiPlanId: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  monthlyAmount: number;
  tenureMonths: number;
  createdAt: Date;
  updatedAt: Date;
}

const variantOptionSchema = new Schema<IVariantOption>(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
    priceAdjustment: { type: Number, default: 0 },
  },
  { _id: false }
);

const variantSchema = new Schema<IVariant>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    options: { type: [variantOptionSchema], required: true },
  },
  { _id: false }
);

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Electronics', 'Accessories', 'Wearables', 'Gaming', 'Audio'],
    },
    image: { type: String, required: true },
    images: [{ type: String }],
    originalPrice: { type: Number, required: true, min: 0 },
    discountedPrice: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, min: 0, max: 100 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    inStock: { type: Boolean, default: true },
    brand: { type: String, required: true },
    variants: { type: [variantSchema], default: [] },
    warranty: { type: String, default: '1 year manufacturer warranty' },
    delivery: { type: String, default: 'Free delivery in 3–5 days' },
  },
  { timestamps: true }
);

const emiPlanSchema = new Schema<IEMIPlan>(
  {
    productId: { type: String, required: true, ref: 'Product' },
    tenure: { type: Number, required: true, enum: [3, 6, 12, 24] },
    monthlyAmount: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    interestRate: { type: Number, default: 0, min: 0 },
    processingFee: { type: Number, default: 0, min: 0 },
    features: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true, ref: 'Product' },
    selectedVariants: { type: Map, of: String, default: {} },
    emiPlanId: { type: String, required: true, ref: 'EMIPlan' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    totalAmount: { type: Number, required: true, min: 0 },
    monthlyAmount: { type: Number, required: true, min: 0 },
    tenureMonths: { type: Number, required: true },
  },
  { timestamps: true }
);

productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
emiPlanSchema.index({ productId: 1, tenure: 1 });
orderSchema.index({ userId: 1, createdAt: -1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);
export const EMIPlan = mongoose.model<IEMIPlan>('EMIPlan', emiPlanSchema);
export const Order = mongoose.model<IOrder>('Order', orderSchema);
