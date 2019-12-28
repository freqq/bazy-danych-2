#!/bin/bash

set -e

SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function airport_start() (
    echo "Starting AirportApp."

    cd ${SOURCE_DIR}/application

    #./gradlew docker:sm-backend:appInstall
    ./gradlew docker:sm-frontend:appInstall

    cd -
    echo "AirportApp started."
)

airport_start
