#!/bin/bash
BUILD_TYPE=$1
DO_SENTRY=$2
SENTRY_AUTH_TOKEN=$3

# default to building env:dev
if [[ -z "${BUILD_TYPE}" ]];
then
    BUILD_TYPE=dev
fi
echo "build type = ${BUILD_TYPE}"

# default to not upload to Sentry
if [[ -z "${DO_SENTRY}" ]];
then
    DO_SENTRY=no
fi
echo "uploading to sentry = ${DO_SENTRY}"

# change to script directory
# http://stackoverflow.com/questions/3349105/how-to-set-current-working-directory-to-the-directory-of-the-script
cd "${0%/*}"

npm install

RELEASE_ID="$(node_modules/sentry-cli-binary/bin/sentry-cli releases --org vena propose-version | cut -c1-7)"
echo "release id = ${RELEASE_ID}"
if [[ "${BUILD_TYPE}" = "release" ]]
then
    # Make the release build
    node_modules/gulp/bin/gulp.js make-release --env ${BUILD_TYPE} --release-id ${RELEASE_ID}
else [[ "${BUILD_TYPE}" = "dev" ]]
    # Make the dev build
    node_modules/gulp/bin/gulp.js make-dev --env ${BUILD_TYPE} --release-id ${RELEASE_ID}
fi

if [[ "${DO_SENTRY}" = "yes" ]]
then
    if [[ -z "${SENTRY_AUTH_TOKEN}" ]]
    then
        echo "Cannot upload to Sentry"
        echo "SENTRY_AUTH_TOKEN is not set"
    else
        # Sentry auth token needs project:releases permissions
        if [[ "${BUILD_TYPE}" = "release" ]]
        then
            # Delete any artifacts if the release already exists (release will overwrite, but dev won't)
            echo "If the release already exists, delete its files"
            node_modules/sentry-cli-binary/bin/sentry-cli --auth-token ${SENTRY_AUTH_TOKEN} releases --org react-boilerplate --project react-add-in files "${RELEASE_ID}" delete --all
        fi
        # Create a sentry release
        node_modules/sentry-cli-binary/bin/sentry-cli --auth-token ${SENTRY_AUTH_TOKEN} releases --org react-boilerplate --project react-add-in new "${RELEASE_ID}"
        # Upload source and source maps to sentry
        node_modules/sentry-cli-binary/bin/sentry-cli --auth-token ${SENTRY_AUTH_TOKEN} releases --org react-boilerplate --project react-add-in files "${RELEASE_ID}" upload-sourcemaps ./build/static
        # Finalize the new release
        node_modules/sentry-cli-binary/bin/sentry-cli --auth-token ${SENTRY_AUTH_TOKEN} releases --org react-boilerplate --project react-add-in finalize "${RELEASE_ID}"
    fi
fi

exit 0
