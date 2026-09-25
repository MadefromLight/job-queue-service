import {Queue} from "bullmq";import {env} from "./config/env";
export type JobPayload={type:"notification"|"report"|"webhook";payload:Record<string,unknown>};
const redis=new URL(env.REDIS_URL);
export const connection={host:redis.hostname,port:Number(redis.port)||6379,password:redis.password||undefined,maxRetriesPerRequest:null};
export const jobQueue=new Queue<JobPayload>(env.QUEUE_NAME,{connection,defaultJobOptions:{attempts:3,backoff:{type:"exponential",delay:1000},removeOnComplete:100,removeOnFail:200}});