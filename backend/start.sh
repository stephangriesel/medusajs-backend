#!/bin/sh
# Exit immediately if a command exits with a non-zero status.
set -e

# Wait for the database to be ready.
echo "--- Waiting for database to be ready ---"
sleep 20

# Run Migrations
echo "--- Running database migrations ---"
npm run migrate

# Start the server
echo "--- Starting Medusa server ---"
npm run start