import { galleryFor, mediaFor } from "../src/data/media";
import { products } from "../src/data/products";
import { shopListings } from "../src/data/shop";

const missing: string[] = [];
const unreachable: string[] = [];
const checked = new Set<string>();

async function assertReachable(label: string, src: string | undefined) {
  if (!src) {
    missing.push(label);
    return;
  }
  if (src.startsWith("/")) return;
  if (checked.has(src)) return;
  checked.add(src);
  try {
    const response = await fetch(src, { method: "HEAD" });
    if (!response.ok) unreachable.push(`${label} → ${response.status} ${src}`);
  } catch (error) {
    unreachable.push(`${label} → ${error instanceof Error ? error.message : "fetch failed"} ${src}`);
  }
}

async function main() {
  const chips = shopListings[0]?.chips ?? [];

  for (const chip of chips) {
    const src = mediaFor(chip.href, chip.label);
    await assertReachable(`category: ${chip.label} (${chip.href})`, src);
  }

  for (const product of products) {
    const src = product.image ?? mediaFor(product.href, product.slug, product.name);
    await assertReachable(`product: ${product.name} (${product.slug})`, src);
    for (const gallerySrc of galleryFor(product.slug, product.name)) {
      await assertReachable(`gallery: ${product.name} (${product.slug})`, gallerySrc);
    }
  }

  if (missing.length || unreachable.length) {
    const lines = [
      ...missing.map((item) => `- missing mapping: ${item}`),
      ...unreachable.map((item) => `- unreachable: ${item}`),
    ];
    console.error(`Shop image audit failed (${lines.length}):\n${lines.join("\n")}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    `Checked ${chips.length} category images, ${products.length} product images, and ${checked.size} remote URLs. None missing.`,
  );
}

void main();
