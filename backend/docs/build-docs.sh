#!/bin/sh
set -eu

cd "$(dirname "$0")"
python3 -m venv .venv
. .venv/bin/activate
python3 -m pip install --disable-pip-version-check -r requirements.txt
python3 -m mkdocs build -f mkdocs.yml --site-dir ../site
