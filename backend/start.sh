#!/bin/sh
# Exit immediately if a command exits with a non-zero status.
set -e

# Wait for the database to be ready.
echo "--- Waiting for database to be ready ---"
sleep 20

# Run Migrations, explicitly passing the DATABASE_URL
echo "--- Running database migrations ---"
DATABASE_URL=$DATABASE_URL npm run migrate

# Start the server, explicitly passing all variables
echo "--- Starting Medusa server ---"
DATABASE_URL=$DATABASE_URL REDIS_URL=$REDIS_URL JWT_SECRET=$JWT_SECRET COOKIE_SECRET=$COOKIE_SECRET npm run start