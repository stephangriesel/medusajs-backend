#!/bin/sh
set -e

# Define the direct path to the Medusa CLI
MEDUSA_CMD="./node_modules/.bin/medusa"

# Run Migrations directly
echo "--- Running database migrations ---"
$MEDUSA_CMD db:migrate

# Start the server directly
echo "--- Starting Medusa server ---"
$MEDUSA_CMD start