# Use Node.js 20 to match the project's requirements
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package files from the current directory (which is /backend)
COPY package.json package-lock.json* ./

# Install ALL dependencies
RUN npm install

# Copy the rest of the source code from the current directory
COPY . .

# Make the startup script executable
RUN chmod +x ./start.sh

# Run the build command for the server only
RUN npm run build

# Set the environment to production for the runtime
ENV NODE_ENV=production

# Expose the port the app will run on
EXPOSE 9000

# The command to start the application using our script
CMD ["./start.sh"]