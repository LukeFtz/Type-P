import Redis from "ioredis";

const redis = new Redis({
  port: 9832, // Redis port
  host: "34.204.50.121", // Redis host
  password: "*&bn432Qw",
});

export const connectToRedisServer = () => {
  console.log("redis");
};
