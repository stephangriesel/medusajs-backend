export default {
  projectConfig: {
    database_type: "postgres",
    database_url: process.env.DATABASE_URL,
    
    store_cors: process.env.STORE_CORS,
    admin_cors: process.env.ADMIN_CORS,
    
    http: {
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    },
  },
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
};