import re

html = open(r"d:\Own\digitz-creative\tmp-neversettle.html", encoding="utf-8", errors="ignore").read()
# Find hero script spans and nearby SVG
for label in ["span-heading-script", "Building", "Product", "Elometha"]:
    print(label, html.lower().count(label.lower()))

# Pull a chunk around first span-heading-script
i = html.find("span-heading-script")
print(html[i - 100 : i + 1200])
