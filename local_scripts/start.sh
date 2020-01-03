#!/bin/bash

set -e

SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function airport_start() (
    echo "Starting Airline Application."

    cd ${SOURCE_DIR}/../application

    docker-compose rm &&
    docker-compose pull &&
    docker-compose build --no-cache &&
    docker-compose up -d --force-recreate 
    
    cd -
    echo "Airline Application started."
)

airport_start
