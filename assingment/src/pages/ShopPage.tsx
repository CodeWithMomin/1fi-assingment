import { useState } from "react";
import { BrandLogo } from "../components/BrandLogo";
import { CatalogItemRow } from "../components/CatalogItemRow";
import { ShopTabs } from "../components/ShopTabs";
import { MarketplaceView } from "../components/MarketplaceView";
import { useCatalog } from "../hooks/useCatalog";
import type { ShopTab } from "../types/catalog";
import shopBanner from "../../UIdesigns/shop-page 1536x1024.webp";
import { ChartNoAxesCombined, House, ReceiptIndianRupee, Search, Store, UserRound } from "lucide-react";

type ShopPageProps = {
  onHome: () => void;
};

export function ShopPage({ onHome }: ShopPageProps) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<ShopTab>("topBrands");
  const { items, isLoading, error, retry } = useCatalog(activeTab);
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="shop-screen">
      <header className="shop-header">
        <button
          className="mobile-icon"
          onClick={onHome}
          aria-label="Back to home"
        >
          ←
        </button>
        <BrandLogo small />
        <div className="shop-heading">
          <span className="eyebrow">SHOP WITH YOUR INVESTMENTS</span>
          <h1>Choose a brand</h1>
        </div>
        <button className="logout-button" onClick={onHome}>
          Log out
        </button>
      </header>
      <img className="shop-hero-image" src={shopBanner} alt="Shop today, pay later using mutual funds" />
      <ShopTabs activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === "marketplace" ? <MarketplaceView /> : (
      <>
      <label className="search-box">
        <span><Search size={14} strokeWidth={2.2}/></span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search online stores..."
        />
      </label>
      <section className="brand-list" aria-live="polite" aria-label={`${activeTab} results`}>
        {isLoading && <p className="catalog-status">Loading catalog...</p>}
        {!isLoading && error && <div className="catalog-status catalog-error"><p>{error}</p><button onClick={retry}>Try again</button></div>}
        {!isLoading && !error && filteredItems.length === 0 && <p className="catalog-status">No matching results.</p>}
        {!isLoading && !error && filteredItems.map((item, index) => <CatalogItemRow item={item} index={index} key={item.name} />)}
      </section>
      </>
      )}

      <nav className="bottom-nav">
        <button onClick={onHome}>
          <span><House/></span>Home
        </button>
        <button className="selected">
          <span><Store/></span>Shop
        </button>
        <button>
          <span><ReceiptIndianRupee/></span>EMI Offers
        </button>
        <button>
          <span><ChartNoAxesCombined/></span>Limit
        </button>
        <button>
          <span><UserRound/></span>Profile
        </button>
      </nav>
    </main>
  );
}
