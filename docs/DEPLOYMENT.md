# Deployment

The application is a normal FastAPI service, so it can run on any platform that supports Python and a long-running ASGI process.

## Production command

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

If your platform does not provide `$PORT`, use the port required by that platform.

## Required environment

At minimum:

```env
GROQ_API_KEY=...
GROQ_MODEL=openai/gpt-oss-20b
CORS_ORIGINS=https://yourwebsite.com
```

## Health checks

Configure your hosting platform to check:

```
GET /health
```

A healthy service returns HTTP 200 and:

```json
{"status":"ok"}
```

## Frontend hosting

The embeddable file is `static/widget.js`. It can be served by the same FastAPI app or by a static/CDN host.

If it is served by the same backend, the simplest setup is:

```html
<script
  src="https://YOUR-API-HOST/widget.js"
  data-api-url="https://YOUR-API-HOST"
></script>
```

## Scaling

The application is stateless apart from its business knowledge file, so multiple instances can run behind a load balancer. The built-in rate limiter uses the client's address and is intended for basic protection; a distributed production deployment may require a shared rate-limit backend and stronger abuse controls.
