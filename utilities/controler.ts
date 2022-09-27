import { createClient } from "redis";

const client = createClient({
  url: "redis://34.204.50.121:9832",
  password: "*&bn432Qw",
});

client.on("error", (err) => console.log("Redis Client Error", err));

export const connectToRedisServer = async () => {
  await console.log(client.connect());
};
