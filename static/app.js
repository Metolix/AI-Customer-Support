const messages = document.getElementById("messages");
const input = document.getElementById("message");
const send = document.getElementById("send");
const form = document.getElementById("chat-form");
const typing = document.getElementById("typing");
const suggestions = document.querySelectorAll("[data-prompt]");

let history = [];
let isSending = false;

function renderAssistant(text) {
    if (window.marked && window.DOMPurify) {
        return DOMPurify.sanitize(marked.parse(text));
    }

    const safe = document.createElement("div");
    safe.textContent = text;
    return safe.innerHTML.replace(/\n/g, "<br>");
}

function addMessage(text, role) {
    const element = document.createElement("div");
    element.className = `message ${role}`;

    const label = document.createElement("div");
    label.className = "message-label";
    label.textContent = role === "assistant" ? "LUXE / ASSISTANT" : "YOU";
    element.appendChild(label);

    const body = document.createElement("div");
    body.innerHTML = role === "assistant"
        ? renderAssistant(text)
        : "";
    if (role === "user") body.textContent = text;
    element.appendChild(body);

    messages.appendChild(element);
    messages.scrollTop = messages.scrollHeight;
}

function setBusy(busy) {
    isSending = busy;
    send.disabled = busy;
    input.disabled = busy;
    typing.hidden = !busy;
}

function autoResize() {
    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 132)}px`;
}

async function sendMessage(text = input.value.trim()) {
    if (!text || isSending) return;

    addMessage(text, "user");
    history.push({ role: "user", content: text });

    input.value = "";
    autoResize();
    setBusy(true);

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: text,
                history: history.slice(-10)
            })
        });

        let data;
        try {
            data = await response.json();
        } catch {
            throw new Error("Invalid server response.");
        }

        if (!response.ok) {
            throw new Error(data.detail || "Something went wrong.");
        }

        addMessage(data.response, "assistant");
        history.push({ role: "assistant", content: data.response });
    } catch (error) {
        addMessage(
            "I’m unable to respond right now. Please contact Luxe Hair Studio directly.",
            "assistant"
        );
    } finally {
        setBusy(false);
        input.focus();
    }
}

form.addEventListener("submit", event => {
    event.preventDefault();
    sendMessage();
});

input.addEventListener("input", autoResize);

input.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
        event.preventDefault();
        form.requestSubmit();
    }
});

suggestions.forEach(button => {
    button.addEventListener("click", () => {
        const prompt = button.dataset.prompt;
        input.value = prompt;
        autoResize();
        sendMessage(prompt);
    });
});

autoResize();
