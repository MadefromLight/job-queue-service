# Job Queue Service

TypeScript background-job processing service using Redis and BullMQ.

## Architecture
Client -> Express API -> BullMQ -> Redis -> Worker -> Processor

The API accepts work and returns a job ID immediately. A separate worker consumes jobs asynchronously with retries and exponential backoff.

## Demonstrates
- REST job submission/status APIs
- Redis-backed durable queues
- Worker concurrency
- Retry and backoff policies
- Graceful worker shutdown
- Zod validation
- Docker Compose
- GitHub Actions CI

## Quick start
```bash
docker compose up -d
npm install
npm run dev
# in another terminal
npm run worker
```

API: http://localhost:3001

Routes: `GET /health`, `POST /api/jobs`, `GET /api/jobs/:id`.

Example payload:
```json
{"type":"notification","payload":{"message":"Hello from the worker"}}
```

## Tests
```bash
npm test
npm run build
```
