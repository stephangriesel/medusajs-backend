console.log("--- Starting Environment Variable Test ---");

const dbUrl = process.env.DATABASE_URL;
const redisUrl = process.env.REDIS_URL;

console.log(`DATABASE_URL is: ${dbUrl}`);
console.log(`REDIS_URL is: ${redisUrl}`);

if (dbUrl && redisUrl) {
  console.log("--- Test SUCCESS: Both variables were found. ---");
} else {
  console.error("--- Test FAILED: One or more variables are missing. ---");
}