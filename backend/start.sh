#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Run Migrations
echo "--- Running database migrations ---"
npm run migrate

# Start the server
echo "--- Starting Medusa server ---"
npm run start