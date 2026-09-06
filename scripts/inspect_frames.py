"""Inspect the non-destructive hero frame source and emit its project manifest.

Usage (from the project root):
  python scripts/inspect_frames.py "D:\\frams\\Man_portrait_video_transition_202608111914_frames"
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError as exc:
    raise SystemExit("Install Pillow to inspect frame dimensions: pip install Pillow") from exc


def main() -> None:
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(r"D:\frams\Man_portrait_video_transition_202608111914_frames")
    frames = sorted(
        [path for path in source.iterdir() if path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}],
        key=lambda path: int(re.search(r"(\d+)$", path.stem).group(1)),
    )
    if not frames:
        raise SystemExit(f"No image frames found in {source}")
    indices = [int(re.search(r"(\d+)$", path.stem).group(1)) for path in frames]
    dimensions = sorted({Image.open(path).size for path in frames})
    missing = [index for index in range(indices[0], indices[-1] + 1) if index not in indices]
    manifest = {
        "prefix": "/media/hero-sequence/frame_",
        "extension": ".jpg",
        "padding": 3,
        "start": indices[0],
        "end": indices[-1],
        "missing": missing,
        "count": len(frames),
        "dimensions": {"width": dimensions[0][0], "height": dimensions[0][1]},
    }
    target = Path("data/hero-sequence.json")
    target.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"source": str(source), "weight_bytes": sum(path.stat().st_size for path in frames), **manifest}, indent=2))


if __name__ == "__main__":
    main()
