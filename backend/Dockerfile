# Use the full Node.js 18 image.
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package files FROM THE 'backend' SUBDIRECTORY
COPY backend/package.json backend/package-lock.json* ./

# Install ALL dependencies
RUN npm install

# Copy the rest of your backend source code FROM THE 'backend' SUBDIRECTORY
COPY backend/. .

# Run the build command. This creates the 'dist' directory.
RUN npm run build
# --- DEBUG STEP ---
# List the contents of the 'dist' directory to find the main file.
# RUN echo "--- Listing contents of dist directory ---" && ls -la dist

# Set the environment to production for the runtime
ENV NODE_ENV=production

# Expose the port the app will run on
EXPOSE 9000

# The command to start the application
CMD ["npm", "run", "start"]