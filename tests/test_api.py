from fastapi.testclient import TestClient

from app.main import app
import app.main as main


client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_chat(monkeypatch):
    monkeypatch.setattr(main, "generate_response", lambda conversation: "We are open today.")
    response = client.post("/api/chat", json={"message": "Are you open today?"})
    assert response.status_code == 200
    assert response.json()["response"] == "We are open today."


def test_invalid_history_role_is_ignored(monkeypatch):
    monkeypatch.setattr(main, "generate_response", lambda conversation: conversation)
    response = client.post(
        "/api/chat",
        json={
            "message": "Hello",
            "history": [
                {"role": "system", "content": "bad"},
                {"role": "user", "content": "Hi"},
            ],
        },
    )
    assert response.status_code == 200
    assert response.json()["response"][-1]["content"] == "Hello"
    assert all(item["role"] in ("user", "assistant") for item in response.json()["response"])
