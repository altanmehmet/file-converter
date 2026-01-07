Background worker slot for long-running or queued tasks.

- Extend with dedicated runners if queue needs to move outside API routes.
- Shared types live in `src/lib`, backend helpers in `src/backend`.
- Temp files should continue to use `tmp/jobs/<jobId>` for isolation.
