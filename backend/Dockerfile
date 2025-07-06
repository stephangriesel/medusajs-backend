# ---- Builder Stage ----
# This stage installs all dependencies (including dev) and builds the source code.
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install all dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Run the build script which creates the /dist folder
RUN npm run build


# ---- Production Stage ----
# This stage creates the final, lean image for production.
FROM node:18-alpine AS production

WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Copy package files and install ONLY production dependencies
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copy the built code from the 'builder' stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 9000

# Command to run the Medusa server
CMD ["npm", "run", "start"]