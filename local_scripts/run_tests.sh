#!/bin/bash

set -e

echo "Running tests."

cd ../tests
for f in *.py; do 
    echo "Running $f test suite..."
    python "$f"; 
done
