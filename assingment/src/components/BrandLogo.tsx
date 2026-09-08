import { ArrowUp } from "lucide-react";

type BrandLogoProps = {
  small?: boolean;
};

export function BrandLogo({ small = false }: BrandLogoProps) {
  return (
    <span className={`p-2 brand-mark${small ? " brand-mark-small" : ""}`}>
        <ArrowUp size={8} strokeWidth={2.2}/> Fi</span>
  );
}

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
