#!/bin/bash

set -e

echo "Running tests."

cd ../tests
for f in *.py; do python "$f"; done
