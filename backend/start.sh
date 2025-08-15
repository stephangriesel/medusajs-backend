#!/bin/sh
set -e

# FOR TESTING: Start the server first to see if it can read the environment variables
echo "--- Starting Medusa server (TEST) ---"
DATABASE_URL=$DATABASE_URL REDIS_URL=$REDIS_URL JWT_SECRET=$JWT_SECRET COOKIE_SECRET=$COOKIE_SECRET npm run start

# This part will likely not be reached, which is okay for this test.
echo "--- Running database migrations ---"
DATABASE_URL=$DATABASE_URL npm run migrate