# Installation

This guide covers the fastest path from a fresh clone to a live support widget.

## Architecture

The project has two pieces:

1. **Backend** — FastAPI receives chat requests and calls Groq using the server-side API key.
2. **Widget** — `static/widget.js` runs on the customer's website and sends requests to the backend.

The browser never needs the Groq key.

## Local installation

Follow the Quick Start in the root README.

Then verify:

```bash
curl http://localhost:8000/health
```

Expected:

```json
{"status":"ok"}
```

## Website installation

Deploy the backend somewhere reachable over HTTPS. The widget file must also be hosted from a URL accessible by the customer's browser.

Add:

```html
<script
  src="https://YOUR-WIDGET-HOST/widget.js"
  data-api-url="https://YOUR-API-HOST"
></script>
```

### Optional widget settings

```html
<script
  src="https://YOUR-WIDGET-HOST/widget.js"
  data-api-url="https://YOUR-API-HOST"
  data-title="Acme Support"
  data-greeting="Hi! How can we help?"
  data-placeholder="Ask us anything..."
  data-accent="#111111"
  data-position="right"
></script>
```

Supported settings:

| Attribute | Purpose | Default |
| --- | --- | --- |
| `data-api-url` | Backend base URL | Required |
| `data-title` | Widget title | AI Support |
| `data-greeting` | First assistant message | Hi. How can I help? |
| `data-placeholder` | Input placeholder | Ask a question... |
| `data-accent` | Accent color | #111111 |
| `data-position` | `left` or `right` | right |

## CORS

Set `CORS_ORIGINS` to the exact origins where the widget will be used.

Example:

```env
CORS_ORIGINS=https://example.com,https://www.example.com
```

An origin includes the scheme and optional port. A path such as `/support` is not part of an origin.

## Common website platforms

The integration is ordinary JavaScript, so it can be added through a site's custom HTML/code-injection mechanism. If a platform strips script tags, use that platform's documented custom-code or plugin mechanism rather than changing the widget.

## Troubleshooting

### Widget appears but messages fail

Check:

- `data-api-url` points to the backend, not the widget file.
- The backend is reachable over HTTPS.
- The website origin is present in `CORS_ORIGINS`.
- `/health` returns `{"status":"ok"}`.
- `GROQ_API_KEY` is configured on the server.

### CORS errors

The browser's Origin must exactly match one of the configured origins. Check the browser developer console and the server's environment.

### The AI gives an outdated answer

Update the business information file and redeploy/restart the backend. The knowledge source is loaded by the application and is not automatically synced with a business website.
