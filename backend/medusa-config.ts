const { defineConfig } = require("@medusajs/medusa");

// This is the main configuration object for your Medusa backend
module.exports = defineConfig({
  projectConfig: {
    // It's recommended to keep this as 'postgres' for production
    database_type: "postgres",

    // These environment variables will be read from your Render dashboard settings
    store_cors: process.env.STORE_CORS,
    admin_cors: process.env.ADMIN_CORS,
    
    // You can add other project-level configurations here
  },

  // This section is for configuring Medusa's modules.
  // We are telling Medusa to use Redis for handling events and for caching.
  modules: {
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL
      },
    },
    cacheService: {
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL
      },
    },
  },

  plugins: [],
});