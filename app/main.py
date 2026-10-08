from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, ConfigDict, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from .ai import generate_response
from .config import (
    CORS_ORIGINS,
    MAX_HISTORY_MESSAGE_LENGTH,
    MAX_HISTORY_MESSAGES,
    MAX_MESSAGE_LENGTH,
    RATE_LIMIT,
)
from .security import check_input

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(
    title="AI Customer Support",
    description="Embeddable AI customer support backed by Groq.",
    version="1.0.0",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class HistoryMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    role: str
    content: str = Field(min_length=1, max_length=MAX_HISTORY_MESSAGE_LENGTH)


class ChatRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    message: str = Field(min_length=1, max_length=MAX_MESSAGE_LENGTH)
    history: list[HistoryMessage] = Field(default_factory=list, max_length=MAX_HISTORY_MESSAGES)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/chat")
@limiter.limit(RATE_LIMIT)
def chat(request: Request, payload: ChatRequest):
    allowed, error = check_input(payload.message)

    if not allowed:
        return JSONResponse(status_code=400, content={"response": error})

    safe_history = [
        {"role": item.role, "content": item.content}
        for item in payload.history
        if item.role in ("user", "assistant")
    ]
    safe_history.append({"role": "user", "content": payload.message})

    try:
        answer = generate_response(safe_history)
    except Exception:
        return JSONResponse(
            status_code=503,
            content={"detail": "The support assistant is temporarily unavailable."},
        )

    if not answer:
        return JSONResponse(
            status_code=503,
            content={"detail": "The support assistant returned an empty response."},
        )

    return {"response": answer}


BASE_DIR = Path(__file__).resolve().parent.parent
app.mount("/", StaticFiles(directory=BASE_DIR / "static", html=True), name="static")
