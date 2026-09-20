import re

html = open(r"d:\Own\digitz-creative\tmp-neversettle.html", encoding="utf-8", errors="ignore").read()

# Find all h3 with svg near typed words
matches = list(re.finditer(r'<h3[^>]*>[\s\S]*?</h3>', html))
print("h3 count", len(matches))
for m in matches[:12]:
    chunk = m.group(0)
    if "<svg" in chunk.lower() or "path" in chunk.lower():
        # get aria/title/class
        cls = re.search(r'class="([^"]*)"', chunk)
        print("H3", cls.group(1) if cls else "", "len", len(chunk))
        # first path snippet
        p = re.search(r'<svg[\s\S]{0,200}', chunk)
        print(p.group(0)[:180] if p else "no svg start")
        print("---")

# save one full word svg for inspection
for m in matches:
    if "<svg" in m.group(0) and "paint0_linear" in m.group(0):
        open(r"d:\Own\digitz-creative\tmp-word.svg", "w", encoding="utf-8").write(m.group(0))
        print("saved word svg wrapper, bytes", len(m.group(0)))
        break
