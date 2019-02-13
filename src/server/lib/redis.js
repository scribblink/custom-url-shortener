import redis from "redis";
import config from "../config";

const { host, port } = config;
const client = redis.createClient({host, port});

export default client;