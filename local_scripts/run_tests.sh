#!/bin/bash

set -e

TEST_FILTER=$1

echo "Running tests."
cd ../tests

for f in *.py; do 
    if [[ -z "$1" ]]; then
        echo "Running $f test suite..."
        python "$f";
    fi
    if [[ $f == *"$TEST_FILTER"* ]]; then
        echo "Running $f test suite..."
        python "$f"; 
    fi
done
