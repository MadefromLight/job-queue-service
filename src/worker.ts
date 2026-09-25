import {Worker} from "bullmq";import {connection,JobPayload} from "./queue";import {env} from "./config/env";
const worker=new Worker<JobPayload>(env.QUEUE_NAME,async job=>{
 await new Promise(r=>setTimeout(r,500));
 if(job.data.type==="notification")return {processed:true,kind:"notification",message:job.data.payload.message??"processed"};
 if(job.data.type==="report")return {processed:true,kind:"report",rows:Math.floor(Math.random()*1000)};
 return {processed:true,kind:"webhook",target:job.data.payload.url??null};
},{connection,concurrency:5});
worker.on("completed",job=>console.log(`Job ${job.id} completed`));
worker.on("failed",(job,error)=>console.error(`Job ${job?.id} failed:`,error.message));
async function shutdown(signal:string){console.log(`${signal} received; closing worker`);await worker.close();process.exit(0);}
process.on("SIGTERM",()=>void shutdown("SIGTERM"));process.on("SIGINT",()=>void shutdown("SIGINT"));