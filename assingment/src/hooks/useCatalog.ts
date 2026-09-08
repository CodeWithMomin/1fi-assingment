import { useEffect, useState } from "react";
import { fetchCatalog } from "../services/catalogApi";
import type { CatalogItem, ShopTab } from "../types/catalog";

export function useCatalog(tab: ShopTab) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestNumber, setRequestNumber] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchCatalog(tab)
      .then((nextItems) => {
        if (!cancelled) setItems(nextItems);
      })
      .catch(() => {
        if (!cancelled) setError("We couldn't load this catalog. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tab, requestNumber]);

  return { items, isLoading, error, retry: () => setRequestNumber((value) => value + 1) };
}
