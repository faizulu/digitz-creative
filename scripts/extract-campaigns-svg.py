import re

html = open(r"d:\Own\digitz-creative\tmp-neversettle.html", encoding="utf-8", errors="ignore").read()
matches = list(re.finditer(r'<h3 class="campaigns">([\s\S]*?)</h3>', html))
if not matches:
    matches = list(re.finditer(r'<h3[^>]*class="[^"]*campaigns[^"]*"[^>]*>([\s\S]*?)</h3>', html))
print("matches", len(matches))
if matches:
    inner = matches[0].group(1).strip()
    # Prefer just the svg
    svg = re.search(r"<svg[\s\S]*?</svg>", inner)
    content = svg.group(0) if svg else inner
    out = r"d:\Own\digitz-creative\public\handwrite-campaigns.svg"
    open(out, "w", encoding="utf-8").write(content)
    print("wrote", out, "bytes", len(content))
    print(content[:300])
else:
    # fallback: find by nearby
    i = html.find('class="campaigns"')
    print("idx", i)
    print(html[i : i + 400])
