import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  CircleHelp,
  CreditCard,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  fetchProducts,
  fetchEMIPlans,
  createOrder,
  type Product,
  type EMIPlan,
} from "../services/marketplaceApi";

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;


const DEMO_USER_ID = "user-demo";

export function MarketplaceView() {

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);


  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});


  const [emiPlans, setEmiPlans] = useState<EMIPlan[]>([]);
  const [emiLoading, setEmiLoading] = useState(false);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<EMIPlan | null>(null);


  const [productSearch, setProductSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);



  const loadProducts = useCallback(async (search?: string) => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const data = await fetchProducts(search);
      setProducts(data);
    } catch {
      setProductsError("Failed to load products. Is the backend running?");
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [loadProducts]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => loadProducts(productSearch || undefined), 300);
    return () => clearTimeout(timer);
  }, [productSearch, loadProducts]);



  const selectProduct = useCallback(async (product: Product) => {
    setSelectedProduct(product);
    setSelectedEmiPlan(null);
    setEmiPlans([]);
    setToast(null);

    // Default variant selections
    const defaults: Record<string, string> = {};
    for (const v of product.variants) {
      defaults[v.name] = v.options[0]?.value ?? "";
    }
    setSelectedVariants(defaults);

    setEmiLoading(true);
    try {
      const plans = await fetchEMIPlans(product._id);
      setEmiPlans(plans);
      setSelectedEmiPlan(plans[0] ?? null);
    } catch {
      setEmiPlans([]);
    } finally {
      setEmiLoading(false);
    }
  }, []);


  const selectedPrice = selectedProduct
    ? selectedProduct.discountedPrice +
    selectedProduct.variants.reduce((acc, variant) => {
      const chosen = variant.options.find(
        (opt) => opt.value === selectedVariants[variant.name]
      );
      return acc + (chosen?.priceAdjustment ?? 0);
    }, 0)
    : 0;



  const handleCheckout = async () => {
    if (!selectedProduct || !selectedEmiPlan) return;
    setCheckingOut(true);
    setToast("Preparing your EMI plan…");
    try {
      await createOrder({
        userId: DEMO_USER_ID,
        productId: selectedProduct._id,
        emiPlanId: selectedEmiPlan._id,
        selectedVariants,
      });
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => {
        setToast(
          `${selectedProduct.name} order placed! ${selectedEmiPlan.tenure}-month EMI confirmed.`
        );
      }, 600);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Checkout failed";
      setToast(`Error: ${msg}`);
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <section className="marketplace-view" aria-label="1Fi Marketplace">
      {/* ── Intro banner ─────────────────────────────────────────────────── */}
      <div className="marketplace-intro">
        <div className="marketplace-promo">
          <span className="marketplace-badge">0% interest plans available</span>
          <h2>Bring home your next upgrade.</h2>
          <p>
            Choose a product, pick a plan, and pay in simple monthly
            instalments.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("marketplace-products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore products <ArrowRight size={14} />
          </button>
        </div>
        <div className="marketplace-stats">
          <div>
            <small>INTEREST</small>
            <strong>0%</strong>
            <span>on select plans</span>
          </div>
          <div>
            <small>APPROVAL</small>
            <strong>24h</strong>
            <span>quick verification</span>
          </div>
          <div>
            <small>TENURE</small>
            <strong>24 mo</strong>
            <span>flexible repayment</span>
          </div>
          <div>
            <small>FUNDS</small>
            <strong>Invested</strong>
            <span>keep earning</span>
          </div>
        </div>
      </div>

      {/* ── Product grid heading ──────────────────────────────────────────── */}
      <div className="marketplace-heading">
        <div>
          <span className="eyebrow">CURATED FOR YOU</span>
          <h2>Featured products</h2>
        </div>
        <label className="marketplace-search">
          <Search size={13} />
          <input
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            placeholder="Search products"
          />
        </label>
      </div>

      {/* ── Product grid ─────────────────────────────────────────────────── */}
      <div className="product-grid" id="marketplace-products">
        {productsLoading && (
          <p className="catalog-status">
            <Loader2 size={16} className="spin" /> Loading products…
          </p>
        )}
        {!productsLoading && productsError && (
          <div className="catalog-status catalog-error">
            <p>{productsError}</p>
            <button onClick={() => loadProducts(productSearch || undefined)}>
              <RefreshCw size={13} /> Retry
            </button>
          </div>
        )}
        {!productsLoading && !productsError && products.length === 0 && (
          <p className="catalog-status">No products found.</p>
        )}
        {!productsLoading &&
          !productsError &&
          products.map((product) => (
            <article
              className={`product-card${selectedProduct?._id === product._id ? " selected" : ""}`}
              key={product._id}
              onClick={() => selectProduct(product)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectProduct(product);
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={selectedProduct?._id === product._id}
            >
              <span className="product-label">{product.discount}% OFF</span>
              <div className="product-art">
                <img src={product.image} alt={`${product.name} product`} />
              </div>
              <div className="product-copy">
                <strong>{product.name}</strong>
                <small>{product.description}</small>
                <b>{formatPrice(product.discountedPrice)}</b>
                <button
                  aria-label={`Select ${product.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectProduct(product);
                  }}
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
      </div>

      {/* ── Lower: selected product + EMI panel ──────────────────────────── */}
      <div className="marketplace-lower">
        <article
          className={`selected-product${selectedProduct ? " has-selection" : ""}`}
        >
          {!selectedProduct && (
            <div className="selection-empty">
              <h3>Select a product to continue</h3>
              <p>
                Choose a product above to view variants, pricing, and EMI
                options.
              </p>
            </div>
          )}
          {selectedProduct && (
            <>
              <div className="selected-product-heading">
                <div className="mini-device">
                  <img src={selectedProduct.image} alt="" />
                </div>
                <div>
                  <span>Selected product</span>
                  <h3>{selectedProduct.name}</h3>
                  <p>{selectedProduct.description}</p>
                </div>
                <b>{selectedProduct.discount}% OFF</b>
              </div>
              <div className="product-options">
                {/* Variant selectors */}
                {selectedProduct.variants.map((variant) => (
                  <div key={variant.id}>
                    <small>CHOOSE {variant.name.toUpperCase()}</small>
                    <div>
                      {variant.options.map((opt) => (
                        <button
                          key={opt.id}
                          className={
                            selectedVariants[variant.name] === opt.value
                              ? "selected"
                              : ""
                          }
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              [variant.name]: opt.value,
                            }))
                          }
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <p>
                      <Check size={13} /> {selectedProduct.warranty}
                    </p>
                    <p>
                      <Check size={13} /> {selectedProduct.delivery}
                    </p>
                  </div>
                ))}
                {/* Price */}
                <div className="today-price">
                  <small>Today's price</small>
                  <strong>{formatPrice(selectedPrice)}</strong>
                  <del>{formatPrice(selectedProduct.originalPrice)}</del>
                  <span>
                    You save{" "}
                    <b>
                      {formatPrice(
                        selectedProduct.originalPrice - selectedPrice
                      )}
                    </b>
                  </span>
                </div>
              </div>
            </>
          )}
        </article>

        {/* ── EMI panel ──────────────────────────────────────────────────── */}
        <aside className="emi-panel">
          <div className="emi-title">
            <span>
              <CreditCard size={14} /> YOUR EMI PLAN
            </span>
            <CircleHelp size={14} />
          </div>
          <h3>Choose how you pay</h3>
          <p>Backed by your mutual fund investments.</p>

          {emiLoading && (
            <p className="catalog-status">
              <Loader2 size={14} className="spin" /> Loading plans…
            </p>
          )}

          {!emiLoading && (
            <div className="tenure-grid">
              {emiPlans.length > 0
                ? emiPlans.map((plan) => (
                  <button
                    key={plan._id}
                    className={
                      selectedEmiPlan?._id === plan._id ? "selected" : ""
                    }
                    onClick={() => setSelectedEmiPlan(plan)}
                  >
                    {plan.tenure} months
                    <strong>
                      {selectedProduct
                        ? formatPrice(plan.monthlyAmount)
                        : "Select product"}
                    </strong>
                  </button>
                ))
                : [3, 6, 12].map((months) => (
                  <button key={months} disabled>
                    {months} months
                    <strong>—</strong>
                  </button>
                ))}
            </div>
          )}

          <dl>
            <div>
              <dt>Monthly instalment</dt>
              <dd>
                {selectedEmiPlan
                  ? formatPrice(selectedEmiPlan.monthlyAmount)
                  : "—"}
              </dd>
            </div>
            <div>
              <dt>Total amount</dt>
              <dd>
                {selectedEmiPlan
                  ? formatPrice(selectedEmiPlan.totalAmount)
                  : "—"}
              </dd>
            </div>
            <div>
              <dt>Interest rate</dt>
              <dd className={selectedEmiPlan?.interestRate === 0 ? "green" : ""}>
                {selectedEmiPlan !== null
                  ? `${selectedEmiPlan.interestRate}% p.a.`
                  : "—"}
              </dd>
            </div>
            <div>
              <dt>Processing fee</dt>
              <dd>
                {selectedEmiPlan
                  ? selectedEmiPlan.processingFee === 0
                    ? "Free"
                    : formatPrice(selectedEmiPlan.processingFee)
                  : "—"}
              </dd>
            </div>
            <div>
              <dt>Payable today</dt>
              <dd>₹0</dd>
            </div>
          </dl>

          <button
            className="checkout-button"
            disabled={!selectedProduct || !selectedEmiPlan || checkingOut}
            onClick={handleCheckout}
          >
            {checkingOut
              ? "Processing…"
              : selectedProduct
                ? "Proceed to checkout"
                : "Select a product first"}{" "}
            {!checkingOut && <ArrowRight size={14} />}
          </button>
          <small className="secure-note">
            <ShieldCheck size={12} /> Secure, transparent and backed by your
            investments
          </small>
        </aside>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <div className="marketplace-footer">
        <div>
          <span>SIMPLIFY BY DESIGN</span>
          <h3>Your investments stay invested.</h3>
          <p>
            Shop without disturbing your long-term goals. 1Fi helps you unlock
            the value of your investments for everyday purchases.
          </p>
        </div>
        {[
          ["01", "Pick a product"],
          ["02", "Select your EMI"],
          ["03", "Get it delivered"],
        ].map(([number, title]) => (
          <div className="guide-step" key={number}>
            <b>{number}</b>
            <strong>{title}</strong>
            <small>A quick, guided step</small>
          </div>
        ))}
      </div>

      {toast && (
        <div className="marketplace-toast" role="status" aria-live="polite">
          <ShieldCheck size={16} />
          {toast}
        </div>
      )}
    </section>
  );
}
