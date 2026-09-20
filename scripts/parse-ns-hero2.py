import re

html = open(r"d:\Own\digitz-creative\tmp-neversettle.html", encoding="utf-8", errors="ignore").read()

# Find hero title area
for needle in ["That move the world", "That Move", "move the world", "home-hero", "hero-heading", "Building"]:
    i = html.find(needle)
    print(needle, i)

i = html.lower().find("that move the world")
print("\nCHUNK:\n")
print(html[max(0, i - 2500) : i + 800])
