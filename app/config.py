import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent


def _csv_env(name: str, default: str = "") -> list[str]:
    return [item.strip() for item in os.getenv(name, default).split(",") if item.strip()]


GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")
COMPANY_INFO_FILE = Path(os.getenv("COMPANY_INFO_FILE", str(BASE_DIR / "data" / "company_info.txt")))

CORS_ORIGINS = _csv_env("CORS_ORIGINS", "http://localhost:8000")
RATE_LIMIT = os.getenv("RATE_LIMIT", "30/minute")
MAX_MESSAGE_LENGTH = int(os.getenv("MAX_MESSAGE_LENGTH", "2000"))
MAX_HISTORY_MESSAGES = int(os.getenv("MAX_HISTORY_MESSAGES", "10"))
MAX_HISTORY_MESSAGE_LENGTH = int(os.getenv("MAX_HISTORY_MESSAGE_LENGTH", "4000"))
ENABLE_PROMPT_GUARD = os.getenv("ENABLE_PROMPT_GUARD", "false").lower() == "true"

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is not configured. Copy .env.example to .env and add your key.")

if not COMPANY_INFO_FILE.exists():
    raise RuntimeError(f"Company information file not found: {COMPANY_INFO_FILE}")
