# API.md

Base path: `/api`

## `POST /api/upload`
Multipart form-data field: `files` (multi)

Response `200`:
```json
{
  "uploaded": [
    {
      "id": "uuid",
      "name": "file.pdf",
      "size": 12345,
      "ext": ".pdf",
      "mimeType": "application/pdf"
    }
  ]
}
```

## `POST /api/convert`
Body:
```json
{
  "presetId": "pdf_compress",
  "fileIds": ["upload-id-1"],
  "options": { "level": "medium" },
  "ttlMinutes": 10
}
```

Response `200`:
```json
{ "jobs": [ { "id": "job-id", "status": "waiting" } ] }
```

## `GET /api/job/:id`
Response:
```json
{
  "job": {
    "id": "job-id",
    "status": "processing",
    "progress": 40,
    "logs": [],
    "outputFiles": [
      {
        "name": "out.pdf",
        "size": 1000,
        "mimeType": "application/pdf",
        "downloadUrl": "/api/download/job-id?file=out.pdf"
      }
    ]
  }
}
```

## `DELETE /api/job/:id`
Response:
```json
{ "ok": true }
```

## `POST /api/job/:id/retry`
Response:
```json
{ "ok": true }
```

## `GET /api/download/:jobId`
- Tek output varsa dosya direkt doner.
- Birden fazla output varsa ZIP doner.
- `?file=<name>` ile spesifik output indirilebilir.

## `GET /api/download-zip?jobIds=id1,id2`
- Tamamlanmis job outputlarini tek ZIP dosyasi olarak dondurur.
