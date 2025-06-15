#!/usr/bin/env python3
import os
import shutil
from pathlib import Path

# Projektverzeichnis (relativ zum Skriptstandort)
project_root = Path(__file__).resolve().parent
src_dir = project_root / "src"
public_images_dir = project_root / "public" / "images"

# Bildformate, die erkannt und migriert werden
image_extensions = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"]

# Erstelle Zielverzeichnis, falls nicht vorhanden
public_images_dir.mkdir(parents=True, exist_ok=True)

# Bilder finden und migrieren
migrated = []
for path in src_dir.rglob("*"):
    if path.suffix.lower() in image_extensions:
        target = public_images_dir / path.name
        shutil.copy2(path, target)
        migrated.append((path, target))

# Zusammenfassung
print(f"✅ {len(migrated)} Bilder migriert:")
for src, dst in migrated:
    print(f" - {src.relative_to(project_root)} → {dst.relative_to(project_root)}")
