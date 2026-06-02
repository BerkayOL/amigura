from __future__ import annotations

from pathlib import Path


def normalize_desktop(text: str) -> str:
    # Replace mojibake / placeholder separators that came from legacy encodings.
    # Keep the source file ASCII-only (use escapes) so it runs regardless of editor encoding.
    em_dash = "\u2014"
    bullet = "\u2022"

    text = text.replace(
        "Amigura ? Desktop & large tablet (?769px)",
        f"Amigura {em_dash} Desktop & large tablet (?769px)",
    )
    text = text.replace(
        "/* Hero ? full viewport beat, larger type */",
        f"/* Hero {em_dash} full viewport beat, larger type */",
    )
    text = text.replace(
        "/* Trust bar ? horizontal marquee (same rhythm as mobile) */",
        f"/* Trust bar {em_dash} horizontal marquee (same rhythm as mobile) */",
    )
    text = text.replace('content: "?";', f'content: "{bullet}";')
    text = text.replace(
        "/* Products ? 3-column showcase on desktop */",
        f"/* Products {em_dash} 3-column showcase on desktop */",
    )
    text = text.replace(
        "/* Atelier strip ? larger tiles, clear horizontal scroll */",
        f"/* Atelier strip {em_dash} larger tiles, clear horizontal scroll */",
    )
    text = text.replace(
        "/* Wide screens ? still 2 product columns for a focused catalog */",
        f"/* Wide screens {em_dash} still 2 product columns for a focused catalog */",
    )

    # Fix a few Turkish words inside comments that got lossy-converted.
    text = text.replace(
        "/* 4 ?r?n: son sat?rdaki tek kart? ortala */",
        "/* 4 \u00FCr\u00FCn: son sat\u0131rdaki tek kart\u0131 ortala */",
    )
    text = text.replace(
        "/* Mobile drawer/backdrop must never cover desktop (?zel Sipari? blank screen fix) */",
        "/* Mobile drawer/backdrop must never cover desktop (\u00D6zel Sipari\u015F blank screen fix) */",
    )

    return (
        text.replace("Ö", "\u00D6")
        .replace("Sipari\u00BA", "Sipari\u015F")
        .replace("Sipari?", "Sipari\u015F")
        .replace("sat\u0131rrdaki", "sat\u0131rdaki")
        .replace("sat?", "sat\u0131r")
        .replace("kart?", "kart\u0131")
    )


def normalize_mobile(text: str) -> str:
    en_dash = "\u2013"
    em_dash = "\u2014"
    text = text.replace(
        "Amigura ? Mobile viewport system (phones & small tablets)",
        f"Amigura {em_dash} Mobile viewport system (phones & small tablets)",
    )
    text = text.replace(
        "Loaded after style.css. Targets 320px?768px and notched devices.",
        f"Loaded after style.css. Targets 320px{en_dash}768px and notched devices.",
    )
    return text


def decode_legacy(b: bytes) -> str:
    for enc in ("utf-8", "cp1254", "iso-8859-9", "cp1252"):
        try:
            return b.decode(enc)
        except UnicodeDecodeError:
            continue
    return b.decode("utf-8", errors="replace")


def main() -> int:
    files = {
        Path("css/desktop.css"): normalize_desktop,
        Path("css/mobile.css"): normalize_mobile,
    }
    for path, normalizer in files.items():
        b = path.read_bytes()
        newline = "\r\n" if b"\r\n" in b else "\n"
        text = decode_legacy(b)
        text = normalizer(text)
        path.write_text(text, encoding="utf-8", newline=newline)
        # sanity: should decode as utf-8 now
        path.read_bytes().decode("utf-8")
        print(f"{path}: normalized -> UTF-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

