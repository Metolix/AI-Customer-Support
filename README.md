# AI Customer Support

An embeddable AI customer-support widget with a FastAPI backend, Groq inference, configurable business knowledge, input validation, rate limiting, and a simple one-script website integration.

The goal is simple: **put an AI support chat on a website without rebuilding the application from scratch.**

## What it includes

- One-script website embed
- FastAPI backend
- Groq model support
- Business-specific knowledge from a plain text file
- Configurable CORS
- Per-client rate limiting
- Prompt-injection input checks
- Bounded conversation history
- No API key exposed to the browser
- Health endpoint
- Automated tests
- GitHub Actions CI
- Security, contribution, deployment, and configuration documentation
- MIT license

## Quick start

### 1. Clone the repository

```bash
git clone https://github.com/Metolix/AI-Customer-Support.git
cd AI-Customer-Support
```

### 2. Create an environment

Python 3.10+ is supported.

```bash
python -m venv .venv
```

Windows:

```powershell
.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source .venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure the environment

Copy `.env.example` to `.env` and add your Groq API key.

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Never put `GROQ_API_KEY` in frontend JavaScript.

### 5. Add your business information

Replace `data/company_info.txt` with your own business information, or point `COMPANY_INFO_FILE` at another file.

Keep the information factual. The assistant is intentionally instructed not to invent missing business details.

### 6. Configure your website origin

For local development:

```env
CORS_ORIGINS=http://localhost:8000
```

For production:

```env
CORS_ORIGINS=https://example.com,https://www.example.com
```

### 7. Start the server

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Open `http://localhost:8000` to see the included demo.

## Add it to an existing website

Once the backend is deployed, add this single script before `</body>`:

```html
<script
  src="https://YOUR-WIDGET-HOST/widget.js"
  data-api-url="https://YOUR-API-HOST"
  data-title="AI Support"
  data-greeting="Hi. How can I help?"
></script>
```

That is the only frontend code required.

The widget uses Shadow DOM so its UI styles are isolated from the host website. The API key stays on the server.

See [docs/INSTALLATION.md](docs/INSTALLATION.md) for the complete integration guide.

## Configuration

All runtime configuration is environment-based. See [docs/CONFIGURATION.md](docs/CONFIGURATION.md).

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for production deployment guidance.

## Security

Read [SECURITY.md](SECURITY.md) and [docs/SECURITY.md](docs/SECURITY.md) before exposing the API publicly. This project is a starting point, not a guarantee that an AI system is secure or factually correct.

## Development

Run the test suite:

```bash
pytest
```

The CI workflow runs the same tests on pushes and pull requests.

## Repository structure

```text
app/                  FastAPI application and AI logic
data/                 Example business knowledge
static/               Demo UI and embeddable widget
tests/                Automated tests
docs/                 Installation, configuration, security, deployment
.github/              CI, dependency updates, issue/PR templates
```

## License

MIT. See [LICENSE](LICENSE).

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) first.
