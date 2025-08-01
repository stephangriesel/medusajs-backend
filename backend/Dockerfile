# Use Node.js 20 to match the project's requirements
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package files FROM THE 'backend' SUBDIRECTORY
COPY backend/package.json backend/package-lock.json* ./

# Install ALL dependencies
RUN npm install

# Copy the rest of your backend source code FROM THE 'backend' SUBDIRECTORY
COPY backend/. .

# Run the build command for the server only
RUN npm run build

# Set the environment to production for the runtime
ENV NODE_ENV=production

# Expose the port the app will run on
EXPOSE 9000

# The command to start the application
CMD ["npm", "run", "start"]