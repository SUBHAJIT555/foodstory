import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** Standard homepage column: 80rem / 1280px, 12px gutter, 8px from lg. */
export function PageContainer({ children, className = "", as: Tag = "div" }: ContainerProps) {
  return <Tag className={`page-container ${className}`}>{children}</Tag>;
}

/** Step Into band: full-bleed below lg, 1440px from lg. */
export function WideContainer({ children, className = "", as: Tag = "div" }: ContainerProps) {
  return <Tag className={`wide-container ${className}`}>{children}</Tag>;
}
