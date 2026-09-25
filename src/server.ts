import {app} from "./app";import {env} from "./config/env";
const server=app.listen(env.PORT,()=>console.log(`Job Queue API listening on http://localhost:${env.PORT}`));
function shutdown(signal:string){console.log(`${signal} received; shutting down API`);server.close(()=>process.exit(0));}
process.on("SIGTERM",()=>shutdown("SIGTERM"));process.on("SIGINT",()=>shutdown("SIGINT"));