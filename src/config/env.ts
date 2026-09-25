import "dotenv/config";import {z} from "zod";
const schema=z.object({NODE_ENV:z.enum(["development","test","production"]).default("development"),PORT:z.coerce.number().int().positive().default(3001),REDIS_URL:z.string().url().default("redis://localhost:6379"),QUEUE_NAME:z.string().min(1).default("portfolio-jobs")});
export const env=schema.parse(process.env);