import type { CatalogItem } from "../types/catalog";

type CatalogItemRowProps = {
  item: CatalogItem;
  index: number;
};

export function CatalogItemRow({ item, index }: CatalogItemRowProps) {
  return (
    <a className="brand-row" href={item.websiteUrl} target="_blank" rel="noreferrer" aria-label={`Open ${item.name} website`}>
      <img
        src={item.logoUrl}
        alt={`${item.name} logo`}
        className={`merchant-logo merchant-${index % 10}`}
        loading="lazy"
        onError={(event) => event.currentTarget.classList.add("logo-load-failed")}
      />
      <span className="fallback-text" aria-hidden="true">{item.name.slice(0, 2)}</span>
      <span className="brand-info"><strong>{item.name}</strong><small>{item.detail}</small></span>
      <span className="row-arrow" aria-hidden="true">›</span>
    </a>
  );
}
