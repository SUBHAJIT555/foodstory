import Image from "next/image";
import type { CSSProperties } from "react";

type FramedMediaProps = {
  alt: string;
  sizes: string;
  src?: string;
  tone?: "cream" | "charcoal" | "fig";
  className?: string;
  imageStyle?: CSSProperties;
  priority?: boolean;
};

const sources = {
  cream: "/home/placeholder.svg",
  charcoal: "/home/placeholder-dark.svg",
  fig: "/home/placeholder-fig.svg",
} as const;

export function FramedMedia({
  alt,
  sizes,
  src,
  tone = "cream",
  className = "object-cover",
  imageStyle,
  priority = false,
}: FramedMediaProps) {
  return (
    <Image
      src={src ?? sources[tone]}
      alt={alt}
      fill
      className={className}
      style={imageStyle}
      sizes={sizes}
      priority={priority}
    />
  );
}
