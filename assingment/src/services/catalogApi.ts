import { brands } from "../data/brands";
import type { BrandCatalog, CatalogItem, ShopTab } from "../types/catalog";

const nearbyStores: CatalogItem[] = [
  { name: "Croma", logoUrl: "https://logo.clearbit.com/croma.com", iconDescription: "Croma nearby store", detail: "Croma store, Koramangala", websiteUrl: "https://croma.com" },
  { name: "Apple Premium Reseller", logoUrl: "https://logo.clearbit.com/imagineshop.in", iconDescription: "Apple nearby store", detail: "Apple reseller, Indiranagar", websiteUrl: "https://imagineshop.in" },
  { name: "Reliance Digital", logoUrl: "https://logo.clearbit.com/reliancedigital.in", iconDescription: "Reliance Digital nearby store", detail: "Reliance Digital, HSR Layout", websiteUrl: "https://reliancedigital.in" },
  { name: "Tanishq", logoUrl: "https://logo.clearbit.com/tanishq.co.in", iconDescription: "Tanishq nearby store", detail: "Tanishq showroom, MG Road", websiteUrl: "https://tanishq.co.in" },
];

const marketplace: CatalogItem[] = [
  { name: "iPhone 17 Pro", logoUrl: "https://logo.clearbit.com/apple.com", iconDescription: "iPhone product", detail: "From 3 months EMI", websiteUrl: "https://apple.com" },
  { name: "MacBook Pro", logoUrl: "https://logo.clearbit.com/apple.com", iconDescription: "MacBook product", detail: "From 6 months EMI", websiteUrl: "https://apple.com" },
  { name: "Google Pixel 10", logoUrl: "https://logo.clearbit.com/google.com", iconDescription: "Google Pixel product", detail: "From 3 months EMI", websiteUrl: "https://store.google.com" },
  { name: "OnePlus 13", logoUrl: "https://logo.clearbit.com/oneplus.com", iconDescription: "OnePlus product", detail: "From 3 months EMI", websiteUrl: "https://oneplus.com" },
];

const toCatalogItems = (catalog: BrandCatalog): CatalogItem[] =>
  Object.entries(catalog).map(([name, details]) => ({
    name,
    logoUrl: details.logoUrl,
    iconDescription: details.icon_description,
    detail: "No-cost EMIs available",
    websiteUrl: details.logoUrl.replace("https://logo.clearbit.com/", "https://"),
  }));

export async function fetchCatalog(tab: ShopTab): Promise<CatalogItem[]> {
  await new Promise((resolve) => window.setTimeout(resolve, 250));
  if (tab === "nearbyStores") return nearbyStores;
  if (tab === "marketplace") return marketplace;
  return toCatalogItems(brands);
}
