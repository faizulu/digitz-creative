from PIL import Image

for name in ("logo-original.png", "logo-light.png", "logo-nav.png"):
    img = Image.open(rf"d:\Own\digitz-creative\public\{name}").convert("RGBA")
    w, h = img.size
    px = img.load()
    transparent = 0
    opaque = 0
    samples = []
    for y in range(0, h, max(1, h // 20)):
        for x in range(0, w, max(1, w // 20)):
            r, g, b, a = px[x, y]
            if a < 10:
                transparent += 1
            else:
                opaque += 1
            if len(samples) < 8 and (x < 40 or y < 40):
                samples.append(((x, y), (r, g, b, a)))
    print(name, "size", img.size, "mode", img.mode, "transparent_samples", transparent, "opaque_samples", opaque)
    print("  corner", px[2, 2], px[w // 2, 2], px[2, h // 2])
    # count near-white opaque pixels
    whiteish = 0
    darkish = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 20:
                continue
            if r > 200 and g > 200 and b > 200:
                whiteish += 1
            if r < 60 and g < 60 and b < 60:
                darkish += 1
    print("  opaque near-white", whiteish, "opaque near-black", darkish)
