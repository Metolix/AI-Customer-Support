# Configuration

Configuration is controlled by environment variables so the same code can be deployed for different businesses.

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `GROQ_API_KEY` | Yes | — | Server-side Groq API key |
| `GROQ_MODEL` | No | `openai/gpt-oss-20b` | Groq model ID |
| `COMPANY_INFO_FILE` | No | `data/company_info.txt` | Business knowledge file |
| `CORS_ORIGINS` | No | `http://localhost:8000` | Comma-separated allowed origins |
| `RATE_LIMIT` | No | `30/minute` | Per-client chat limit |
| `MAX_MESSAGE_LENGTH` | No | `2000` | Maximum customer message length |
| `MAX_HISTORY_MESSAGES` | No | `10` | Maximum history entries accepted |
| `MAX_HISTORY_MESSAGE_LENGTH` | No | `4000` | Maximum history message length |
| `ENABLE_PROMPT_GUARD` | No | `false` | Reserved optional secondary guard |

## Business knowledge

The example knowledge file is intentionally plain text. Replace it with accurate information about the business.

A useful file should cover:

- Business name and contact details
- Location
- Opening hours
- Services
- Prices and pricing rules
- Booking process
- Cancellation/refund policies
- Accessibility
- Frequently asked questions
- Explicit limitations

Do not put secrets, passwords, API keys, customer records, or other confidential material into the knowledge file.

## Model selection

The model is configurable because provider model availability changes over time. Check Groq's current supported-model list before selecting a model for production.

Do not hard-code a provider API key into frontend code.
