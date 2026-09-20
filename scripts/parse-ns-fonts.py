import re

css = open(r"d:\Own\digitz-creative\tmp-ns.css", encoding="utf-8", errors="ignore").read()
faces = re.findall(r"@font-face\{.*?\}", css)
print("faces", len(faces))
for f in faces:
    fam = re.search(r"font-family:([^;]+)", f)
    src = re.findall(r"url\(([^)]+)\)", f)
    print((fam.group(1) if fam else "?"), "|", src[:3])

html = open(r"d:\Own\digitz-creative\tmp-neversettle.html", encoding="utf-8", errors="ignore").read()
# look for svg files / handwritten
for pat in [
    r"https://cdn\.prod\.website-files\.com/[^\"']+\.svg",
    r"class=\"[^\"]*hand[^\"]*\"",
    r"class=\"[^\"]*script[^\"]*\"",
    r"data-w-id=\"[^\"]+\"",
]:
    hits = re.findall(pat, html, flags=re.I)
    print(pat, "->", len(hits))
    for h in hits[:15]:
        print(" ", h[:160])
