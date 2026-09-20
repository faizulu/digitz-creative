import re

css = open(r"d:\Own\digitz-creative\tmp-ns.css", encoding="utf-8", errors="ignore").read()
for name in ["Elometha", "span-heading-script", "heading-script", "Tasaorbiter"]:
    idx = css.find(name)
    print(name, "idx", idx)
    if idx >= 0:
        print(css[max(0, idx - 80) : idx + 220])
        print("---")
