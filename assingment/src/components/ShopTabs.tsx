import type { ShopTab } from "../types/catalog";

type ShopTabsProps = {
  activeTab: ShopTab;
  onChange: (tab: ShopTab) => void;
};

const tabs: Array<[ShopTab, string]> = [
  ["topBrands", "Top Brands"],
  ["nearbyStores", "Nearby Stores"],
  ["marketplace", "1Fi Marketplace"],
];

export function ShopTabs({ activeTab, onChange }: ShopTabsProps) {
  return (
    <div className="slider" role="tablist" aria-label="Shop catalog filters">
      {tabs.map(([value, label]) => (
        <button
          key={value}
          className={activeTab === value ? "active" : ""}
          onClick={() => onChange(value)}
          aria-selected={activeTab === value}
          role="tab"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
