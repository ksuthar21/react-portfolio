#!/bin/sh
# Convert full-size screenshots into 1000px-wide WebP thumbnails for public/images.
# Requires cwebp (brew install webp).
#
# Usage: sh scripts/optimize-images.sh <dir-with-png-or-jpg-sources>
set -e

SRC=${1:?usage: sh scripts/optimize-images.sh <source-dir>}
OUT=public/images

for f in "$SRC"/*.png "$SRC"/*.jpg "$SRC"/*.jpeg; do
  [ -f "$f" ] || continue
  name=$(basename "${f%.*}")
  cwebp -quiet -q 80 -resize 1000 0 -metadata none "$f" -o "$OUT/$name.webp"
  echo "$OUT/$name.webp"
done
