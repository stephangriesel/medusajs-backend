# ---- Base Stage ----
FROM node:18-alpine AS base
WORKDIR /app

# ---- Dependencies Stage ----
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# ---- Build Stage ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build the Medusa project for production
RUN npm run build

# ---- Production Stage ----
FROM base AS production
ENV NODE_ENV=production

# Copy built files and production node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 9000

# Command to run the Medusa server
CMD ["npm", "run", "start"]