#!/bin/bash
BUILD_TYPE=$1
DO_SENTRY=$2
SENTRY_AUTH_TOKEN=$3

# This script builds the react-add-in in a container running an isolated
# node installation. All this does is map the current directory as
# /build in the container and invoke build.sh.
function usage ()
{
  echo 'Usage:' $0 '<dev/release> <sentry?yes/no> <sentry_auth_token>'
  echo 'This script runs the js-addin build in a docker container to ensure node isolation'
  exit
}

# Echo usage if there are no arguments supplied
if [  $# -eq 0 ]
then
  usage
fi

# Terminate on any error
set -e

docker run \
    --rm \
    --volume "${PWD}:/build" \
    --user $(id -u) \
    node:7.4.0 \
    "/build/build.sh" \
    ${BUILD_TYPE} \
    ${DO_SENTRY} \
    ${SENTRY_AUTH_TOKEN} \
