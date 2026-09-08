export type BrandDetails = {
  icon_description: string;
  logoUrl: string;
};

export type BrandCatalog = Record<string, BrandDetails>;

export type CatalogItem = {
  name: string;
  logoUrl: string;
  iconDescription: string;
  detail: string;
  websiteUrl: string;
};

export type ShopTab = "topBrands" | "nearbyStores" | "marketplace";
