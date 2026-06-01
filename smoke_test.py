from pathlib import Path

ROOT = Path(__file__).resolve().parent

required_files = [
    ROOT / "index.html",
    ROOT / "styles.css",
    ROOT / "app.js",
    ROOT / "README.md",
]

for path in required_files:
    assert path.exists(), f"Missing required file: {path.name}"

html = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "styles.css").read_text(encoding="utf-8")
js = (ROOT / "app.js").read_text(encoding="utf-8")

checks = {
    "stylesheet linked": '<link rel="stylesheet" href="./styles.css"' in html,
    "script linked": '<script src="./app.js"></script>' in html,
    "interactive demo section": 'id="demo"' in html and 'id="chatWindow"' in html,
    "builder section": 'id="builder"' in html and 'id="generate"' in html and 'id="output"' in html,
    "pricing section": '₦15,000' in html,
    "flows defined": 'const flows' in js and 'food:' in js and 'fashion:' in js and 'beauty:' in js,
    "builder defined": 'function buildFlow' in js and 'WHATSAPP SALES ASSISTANT DEMO' in js,
    "copy scripts": 'copy-btn' in html and 'navigator.clipboard.writeText' in js,
    "responsive css": '@media (min-width: 760px)' in css,
}

failed = [name for name, ok in checks.items() if not ok]
if failed:
    raise SystemExit("Smoke test failed: " + ", ".join(failed))

print("Smoke test passed: merged demo structure, scripts, and styles are present.")
