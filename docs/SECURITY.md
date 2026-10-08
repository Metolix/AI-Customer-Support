# Security

AI customer support has two different security problems: normal application security and model-specific risks.

## Current protections

- API keys are server-side only.
- Customer messages are length-limited.
- Conversation history is bounded.
- Only `user` and `assistant` history roles are accepted.
- Obvious prompt-injection attempts are rejected before the model call.
- API requests are rate-limited.
- CORS origins are configurable.
- Assistant output is returned as text; the included widget uses `textContent`, not HTML rendering.
- The repository ignores `.env`.

## Prompt injection

Prompt injection cannot be solved reliably by a keyword blocklist alone. The project therefore treats the blocklist as one layer, not as a complete security boundary.

Do not connect an LLM directly to privileged tools or sensitive systems without additional authorization, validation, isolation, and monitoring.

## Data handling

Do not send sensitive customer information to the model unless you have assessed the legal, privacy, contractual, and provider requirements for your use case.

The example application does not store conversations in a database.

## Production checklist

- [ ] Use HTTPS.
- [ ] Restrict `CORS_ORIGINS`.
- [ ] Keep the Groq key in a server-side secret manager or platform secret.
- [ ] Set a rate limit appropriate for expected traffic and cost.
- [ ] Replace the example company data.
- [ ] Review privacy and retention requirements.
- [ ] Add authentication or another abuse-control mechanism if the endpoint is not meant to be public.
- [ ] Monitor model failures, abuse, latency, and provider errors.
- [ ] Test prompt-injection and data-exfiltration scenarios before launch.
- [ ] Keep dependencies updated.
- [ ] Enable GitHub security features for the repository.

For security reports, follow [SECURITY.md](../SECURITY.md).
