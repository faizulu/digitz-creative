"""Rebuild light-theme logos — clean edges, no MinFilter damage."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "logo-original.png"
OUT_FULL = ROOT / "public" / "logo-light.png"
OUT_NAV = ROOT / "public" / "logo-nav.png"


def flood_clear(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()

    def dark_bg(r: int, g: int, b: int, a: int) -> bool:
        if a < 12:
            return True
        return r < 58 and g < 62 and b < 90 and (r + g + b) < 170

    seen = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(h):
        q.append((0, y))
        q.append((w - 1, y))

    while q:
        x, y = q.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or seen[y][x]:
            continue
        seen[y][x] = True
        r, g, b, a = px[x, y]
        if not dark_bg(r, g, b, a):
            continue
        px[x, y] = (0, 0, 0, 0)
        q.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
    return img


def scrub_halo(img: Image.Image) -> Image.Image:
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            lum = (r + g + b) / 3
            chroma = max(abs(r - g), abs(g - b), abs(r - b))
            # Soft pale fringe only — keep colorful anti-alias
            if a < 120 and lum > 160 and chroma < 28:
                px[x, y] = (0, 0, 0, 0)
            elif a < 70 and lum > 130 and chroma < 35:
                px[x, y] = (0, 0, 0, 0)
    return img


def recolor_tagline(img: Image.Image) -> Image.Image:
    px = img.load()
    w, h = img.size
    y0 = int(h * 0.60)
    for y in range(y0, h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 18:
                continue
            if r > 155 and g > 155 and b > 155 and abs(r - g) < 40 and abs(g - b) < 40:
                px[x, y] = (55, 55, 55, a)
    return img


def bbox(img: Image.Image, amin: int = 16):
    px = img.load()
    w, h = img.size
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            if px[x, y][3] >= amin:
                found = True
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)
    if not found:
        return (0, 0, w, h)
    p = 2
    return max(0, minx - p), max(0, miny - p), min(w, maxx + 1 + p), min(h, maxy + 1 + p)


def main() -> None:
    img = Image.open(SRC).convert("RGBA")
    img = flood_clear(img)
    img = scrub_halo(img)
    img = recolor_tagline(img)
    img = scrub_halo(img)
    img = img.crop(bbox(img))
    img.save(OUT_FULL, optimize=True)
    print("full", img.size)

    w, h = img.size
    nav = img.crop((0, 0, w, int(h * 0.68)))
    nav = scrub_halo(nav)
    nav = nav.crop(bbox(nav))
    # Keep high-res source; CSS scales it down crisply
    nav.save(OUT_NAV, optimize=True)
    print("nav", nav.size)


if __name__ == "__main__":
    main()
