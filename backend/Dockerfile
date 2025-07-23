# Use the full Node.js 18 image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install ALL dependencies (including dev dependencies needed for the build)
RUN npm install

# Copy the rest of your application source code
COPY . .

# Run the build command. This creates the 'dist' directory. Allocates up to 4GB of memory specifically for the build script
RUN npm run build
# --- DEBUG STEP ---
# List the contents of the 'dist' directory to find the main file.
RUN echo "--- Listing contents of dist directory ---" && ls -la dist

# Set the environment to production for the runtime
ENV NODE_ENV=production

# Expose the port the app will run on
EXPOSE 9000

# The command to start the application
# CMD ["npm", "run", "start"]
# Debug uncomment the next line
CMD ["sh", "-c", "echo '--- Printing Environment Variables ---' && printenv && echo '--- Starting Medusa ---' && npm run start"]