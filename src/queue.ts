import {Queue} from "bullmq";import {env} from "./config/env";
export type JobPayload={type:"notification"|"report"|"webhook";payload:Record<string,unknown>};
export const connection={url:env.REDIS_URL,maxRetriesPerRequest:null};
export const jobQueue=new Queue<JobPayload>(env.QUEUE_NAME,{connection,defaultJobOptions:{attempts:3,backoff:{type:"exponential",delay:1000},removeOnComplete:100,removeOnFail:200}});