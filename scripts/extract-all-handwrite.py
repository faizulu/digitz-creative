import re
from pathlib import Path

html = open(r"d:\Own\digitz-creative\tmp-neversettle.html", encoding="utf-8", errors="ignore").read()
out_dir = Path(r"d:\Own\digitz-creative\src\assets\handwrite")
out_dir.mkdir(parents=True, exist_ok=True)

# h3 class names used as word keys
matches = list(re.finditer(r'<h3 class="([^"]+)">([\s\S]*?)</h3>', html))
saved = []
for m in matches:
    name = m.group(1).strip().split()[0]
    inner = m.group(2)
    svg = re.search(r"<svg[\s\S]*?</svg>", inner)
    if not svg:
        continue
    content = svg.group(0)
    # normalize obvious viewBoxes later in component
    path = out_dir / f"{name}.svg"
    path.write_text(content, encoding="utf-8")
    saved.append((name, len(content)))

print("saved", saved)
