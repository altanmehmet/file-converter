# DEPLOYMENT_RENDER.md

## Render Web Service (Docker kullanmadan)
- Root Directory: `file-converter-app`
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Environment: `NODE_ENV=production`, `NEXT_TELEMETRY_DISABLED=1`
- Port: `3000`

## Render Docker deploy
- Root Directory: `file-converter-app`
- Dockerfile: `Dockerfile`
- Exposed port: `3000`

## Onerilen env
- `ENCRYPTION_PASSWORD`
- `ENCRYPTION_SALT`
- `NEXT_PUBLIC_SITE_URL`

## Post-deploy checklist
1. `GET /` -> 200
2. `POST /api/upload` test
3. `POST /api/convert` test
4. `GET /api/job/:id` polling
5. `GET /api/download/:jobId` indirme
