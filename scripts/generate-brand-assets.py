"""Generate outlined foodstory wordmarks and app icons from brand fonts."""

from __future__ import annotations

import math
import tempfile
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from PIL import Image, ImageDraw, ImageFont
import uharfbuzz as hb

ROOT = Path(__file__).resolve().parents[1]
FONT_DIR = Path(tempfile.gettempdir()) / "fs-brand"
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"

INK = "#1C1C1C"
INK_SOFT = "#38383A"
WHITE = "#FFFFFF"
BRAND = "#A0383F"
FOOTER_BG = "#38383A"

WORD = "foodstory"
TAG = "COME FIND YOURSELF"


def freeze(src: Path, dest: Path, weight: float) -> Path:
    font = TTFont(src)
    if "fvar" in font:
        font = instancer.instantiateVariableFont(font, {"wght": weight})
    font.save(dest)
    return dest


def shape_text(font_path: Path, text: str, tracking: float = 0) -> tuple[list[str], list[float], float]:
    data = font_path.read_bytes()
    face = hb.Face(data)
    font = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf)
    infos = buf.glyph_infos
    positions = buf.glyph_positions
    names = []
    advances = []
    x = 0.0
    for info, pos in zip(infos, positions):
        names.append(font.get_glyph_name(info.codepoint))
        advances.append((x + pos.x_offset, pos.y_offset, pos.x_advance + tracking))
        x += pos.x_advance + tracking
    if advances:
        x -= tracking
    return names, advances, x


def glyph_path(glyph_set, name: str, scale: float, dx: float, dy: float) -> str:
    pen = SVGPathPen(glyph_set)
    tpen = TransformPen(pen, (scale, 0, 0, -scale, dx, dy))
    glyph_set[name].draw(tpen)
    return pen.getCommands()


def glyph_bounds(glyph_set, name: str, scale: float, dx: float, dy: float):
    pen = BoundsPen(glyph_set)
    tpen = TransformPen(pen, (scale, 0, 0, -scale, dx, dy))
    glyph_set[name].draw(tpen)
    return pen.bounds


def lockup_paths(
    display_font: Path,
    sans_font: Path,
    fill: str,
    word_size: float,
    tag_size: float,
    gap: float,
    pad_x: float,
    pad_y: float,
    stacked: bool = False,
) -> tuple[str, int, int]:
    display = TTFont(display_font)
    sans = TTFont(sans_font)
    upm_d = display["head"].unitsPerEm
    upm_s = sans["head"].unitsPerEm
    scale_d = word_size / upm_d
    scale_s = tag_size / upm_s
    g_d = display.getGlyphSet()
    g_s = sans.getGlyphSet()

    names, advances, word_w = shape_text(display_font, WORD)
    word_w *= scale_d

    tag_names, tag_adv, tag_nat_u = shape_text(sans_font, TAG)
    tag_nat = tag_nat_u * scale_s
    letters = max(len(TAG) - 1, 1)
    extra = max(word_w - tag_nat, 0)
    track_font = extra / letters / scale_s
    tag_names, tag_adv, tag_w_units = shape_text(sans_font, TAG, tracking=track_font)
    tag_w = tag_w_units * scale_s

    word_x = 0.0
    word_y = 0.0
    word_box = None
    for name, (gx, gy, _adv) in zip(names, advances):
        b = glyph_bounds(g_d, name, scale_d, word_x + gx * scale_d, word_y - gy * scale_d)
        if b:
            word_box = b if word_box is None else (
                min(word_box[0], b[0]),
                min(word_box[1], b[1]),
                max(word_box[2], b[2]),
                max(word_box[3], b[3]),
            )

    tag_y = (word_box[3] if word_box else 0) + gap
    content_w = max(word_w, tag_w)
    word_x = (content_w - word_w) / 2 if stacked else 0.0
    tag_x = (content_w - tag_w) / 2 if stacked else 0.0

    parts = []
    boxes = []
    for name, (gx, gy, _adv) in zip(names, advances):
        dx, dy = word_x + gx * scale_d, word_y - gy * scale_d
        d = glyph_path(g_d, name, scale_d, dx, dy)
        if d:
            parts.append(f'<path d="{d}" fill="{fill}"/>')
            b = glyph_bounds(g_d, name, scale_d, dx, dy)
            if b:
                boxes.append(b)
    for name, (gx, gy, _adv) in zip(tag_names, tag_adv):
        dx, dy = tag_x + gx * scale_s, tag_y - gy * scale_s
        d = glyph_path(g_s, name, scale_s, dx, dy)
        if d:
            parts.append(f'<path d="{d}" fill="{fill}"/>')
            b = glyph_bounds(g_s, name, scale_s, dx, dy)
            if b:
                boxes.append(b)

    min_x = min(b[0] for b in boxes) - pad_x
    min_y = min(b[1] for b in boxes) - pad_y
    max_x = max(b[2] for b in boxes) + pad_x
    max_y = max(b[3] for b in boxes) + pad_y
    width = math.ceil(max_x - min_x)
    height = math.ceil(max_y - min_y)

    body = "\n  ".join(parts)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{min_x:.2f} {min_y:.2f} {width} {height}" '
        f'width="{width}" height="{height}" role="img" aria-label="foodstory">\n'
        f"  {body}\n"
        f"</svg>\n"
    )
    return svg, width, height


def write_svg(path: Path, svg: str) -> None:
    path.write_text(svg, encoding="utf-8", newline="\n")
    print(f"wrote {path} ({path.stat().st_size} bytes)")


def mark_f_svg(font_path: Path, fill: str, size: int, pad: float) -> tuple[str, int, int]:
    font = TTFont(font_path)
    upm = font["head"].unitsPerEm
    scale = size / upm
    g = font.getGlyphSet()
    names, advances, w_u = shape_text(font_path, "f")
    w = w_u * scale
    hhea = font["hhea"]
    ascent = hhea.ascent * scale
    descent = abs(hhea.descent) * scale
    width = math.ceil(w + pad * 2)
    height = math.ceil(ascent + descent + pad * 2)
    y = pad + ascent
    x = pad
    parts = []
    for name, (gx, gy, _adv) in zip(names, advances):
        d = glyph_path(g, name, scale, x + gx * scale, y - gy * scale)
        if d:
            parts.append(f'<path d="{d}" fill="{fill}"/>')
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'width="{width}" height="{height}" role="img" aria-label="foodstory">\n'
        f"  {''.join(parts)}\n"
        f"</svg>\n"
    )
    return svg, width, height


def app_icon_svg(font_path: Path, canvas: int = 180) -> str:
    font = TTFont(font_path)
    upm = font["head"].unitsPerEm
    letter_size = canvas * 0.78
    scale = letter_size / upm
    g = font.getGlyphSet()
    names, advances, w_u = shape_text(font_path, "f")
    radius = canvas * 0.18
    # Draw at origin, then translate to center via viewBox-relative transform
    boxes = []
    paths = []
    for name, (gx, gy, _adv) in zip(names, advances):
        d = glyph_path(g, name, scale, gx * scale, -gy * scale)
        b = glyph_bounds(g, name, scale, gx * scale, -gy * scale)
        if d:
            paths.append(d)
        if b:
            boxes.append(b)
    min_x = min(b[0] for b in boxes)
    min_y = min(b[1] for b in boxes)
    max_x = max(b[2] for b in boxes)
    max_y = max(b[3] for b in boxes)
    gw, gh = max_x - min_x, max_y - min_y
    tx = (canvas - gw) / 2 - min_x
    ty = (canvas - gh) / 2 - min_y + canvas * 0.02
    parts = [
        f'<rect width="{canvas}" height="{canvas}" rx="{radius}" ry="{radius}" fill="{BRAND}"/>',
        f'<g transform="translate({tx:.2f} {ty:.2f})">',
    ]
    for d in paths:
        parts.append(f'  <path d="{d}" fill="{WHITE}"/>')
    parts.append("</g>")
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {canvas} {canvas}" '
        f'width="{canvas}" height="{canvas}" role="img" aria-label="foodstory">\n'
        f"  {chr(10).join(parts)}\n"
        f"</svg>\n"
    )


def apple_icon_png(font_path: Path, dest: Path, canvas: int = 180) -> None:
    img = Image.new("RGBA", (canvas, canvas), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    r = int(canvas * 0.18)
    draw.rounded_rectangle((0, 0, canvas - 1, canvas - 1), radius=r, fill=(160, 56, 63, 255))
    font = ImageFont.truetype(str(font_path), size=int(canvas * 0.78))
    bbox = draw.textbbox((0, 0), "f", font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (canvas - tw) / 2 - bbox[0]
    y = (canvas - th) / 2 - bbox[1] - canvas * 0.02
    draw.text((x, y), "f", font=font, fill=(255, 255, 255, 255))
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "PNG")
    print(f"wrote {dest}")


def main() -> None:
    playfair = freeze(FONT_DIR / "PlayfairDisplay.ttf", FONT_DIR / "Playfair-400.ttf", 400)
    outfit = freeze(FONT_DIR / "Outfit.ttf", FONT_DIR / "Outfit-400.ttf", 400)

    horizontal, w, h = lockup_paths(playfair, outfit, INK, 54, 7.4, 7, 2, 2, stacked=False)
    write_svg(PUBLIC / "wordmark.svg", horizontal)
    print(f"  horizontal dark {w}x{h}")

    inverse, iw, ih = lockup_paths(playfair, outfit, WHITE, 72, 10, 9, 2, 2, stacked=False)
    write_svg(PUBLIC / "wordmark-on-dark.svg", inverse)
    print(f"  horizontal inverse {iw}x{ih}")

    stacked, sw, sh = lockup_paths(playfair, outfit, INK, 54, 7.4, 12, 4, 4, stacked=True)
    write_svg(PUBLIC / "wordmark-stacked.svg", stacked)
    print(f"  stacked {sw}x{sh}")

    fav, fw, fh = mark_f_svg(playfair, INK, 48, 2)
    write_svg(PUBLIC / "favicon-letter.svg", fav)
    print(f"  letter favicon {fw}x{fh}")

    icon = app_icon_svg(playfair, 32)
    write_svg(PUBLIC / "icon.svg", icon)
    write_svg(APP / "icon.svg", icon)

    icon180 = app_icon_svg(playfair, 180)
    write_svg(PUBLIC / "icon-180.svg", icon180)

    apple_icon_png(playfair, APP / "apple-icon.png", 180)
    apple_icon_png(playfair, PUBLIC / "apple-icon.png", 180)

    sizes = {
        "header": (w, h),
        "footer": (iw, ih),
        "stacked": (sw, sh),
    }
    print("SIZES", sizes)


if __name__ == "__main__":
    main()
