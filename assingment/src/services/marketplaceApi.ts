const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3001';

export type VariantOption = {
  id: string;
  label: string;
  value: string;
  priceAdjustment?: number;
};

export type Variant = {
  id: string;
  name: string;
  options: VariantOption[];
};

export type Product = {
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
  variants: Variant[];
  warranty: string;
  delivery: string;
  brand: string;
};

export type EMIPlan = {
  _id: string;
  productId: string;
  tenure: number;
  monthlyAmount: number;
  totalAmount: number;
  interestRate: number;
  processingFee: number;
  features: string[];
  isActive: boolean;
};

export type CreateOrderPayload = {
  userId: string;
  productId: string;
  emiPlanId: string;
  selectedVariants?: Record<string, string>;
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message ?? `Request failed: ${res.status}`);
  }
  return json as T;
}

export async function fetchProducts(search?: string): Promise<Product[]> {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  const qs = params.toString();
  const result = await apiFetch<{ success: boolean; data: Product[] }>(
    `/api/products${qs ? `?${qs}` : ''}`
  );
  return result.data;
}

export async function fetchProduct(id: string): Promise<Product> {
  const result = await apiFetch<{ success: boolean; data: Product }>(`/api/products/${id}`);
  return result.data;
}

export async function fetchEMIPlans(productId: string): Promise<EMIPlan[]> {
  const result = await apiFetch<{ success: boolean; data: EMIPlan[] }>(
    `/api/products/${productId}/emi-plans`
  );
  return result.data;
}

export async function createOrder(payload: CreateOrderPayload) {
  const result = await apiFetch<{ success: boolean; data: unknown }>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return result.data;
}

export async function fetchUserOrders(userId: string) {
  const result = await apiFetch<{ success: boolean; data: unknown[] }>(
    `/api/orders/${userId}`
  );
  return result.data;
}
