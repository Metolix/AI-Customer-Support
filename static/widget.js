(() => {
  "use strict";

  const script = document.currentScript;
  const apiUrl = (script?.dataset.apiUrl || window.AI_SUPPORT_API_URL || "").replace(/\/$/, "");

  if (!apiUrl) {
    console.error("[AI Customer Support] Missing data-api-url on the widget script.");
    return;
  }

  const config = {
    title: script.dataset.title || "AI Support",
    greeting: script.dataset.greeting || "Hi. How can I help?",
    placeholder: script.dataset.placeholder || "Ask a question...",
    accent: script.dataset.accent || "#111111",
    position: script.dataset.position || "right",
  };

  const host = document.createElement("div");
  host.setAttribute("data-ai-support-widget", "");
  document.body.appendChild(host);
  const root = host.attachShadow({ mode: "closed" });

  const style = document.createElement("style");
  style.textContent = `
    :host { all: initial; }
    .launcher {
      position: fixed; bottom: 24px; ${config.position}: 24px; z-index: 2147483647;
      width: 56px; height: 56px; border: 0; border-radius: 50%;
      background: ${config.accent}; color: #fff; cursor: pointer;
      box-shadow: 0 10px 30px rgba(0,0,0,.18); font: 600 14px system-ui,sans-serif;
    }
    .panel {
      position: fixed; bottom: 92px; ${config.position}: 24px; z-index: 2147483647;
      width: min(380px, calc(100vw - 32px)); height: min(620px, calc(100vh - 124px));
      display: none; flex-direction: column; overflow: hidden;
      background: #fff; color: #111; border: 1px solid #ddd; border-radius: 18px;
      box-shadow: 0 20px 60px rgba(0,0,0,.2); font: 15px/1.5 system-ui,sans-serif;
    }
    .panel.open { display: flex; }
    .header { padding: 16px 18px; background: ${config.accent}; color: #fff; }
    .title { font-weight: 700; }
    .messages { flex: 1; overflow-y: auto; padding: 16px; background: #f7f7f8; }
    .message { max-width: 84%; margin: 0 0 12px; padding: 10px 12px; border-radius: 14px; white-space: pre-wrap; overflow-wrap: anywhere; }
    .assistant { background: #fff; border: 1px solid #e4e4e4; }
    .user { margin-left: auto; background: ${config.accent}; color: #fff; }
    .input { display: flex; gap: 8px; padding: 12px; border-top: 1px solid #ddd; }
    textarea { min-width: 0; flex: 1; resize: none; padding: 10px; border: 1px solid #ccc; border-radius: 10px; font: inherit; }
    button.send { border: 0; border-radius: 10px; padding: 0 14px; background: ${config.accent}; color: #fff; cursor: pointer; }
    button:disabled { opacity: .6; cursor: default; }
    .close { float: right; border: 0; background: transparent; color: inherit; cursor: pointer; font-size: 20px; }
  `;

  const panel = document.createElement("section");
  panel.className = "panel";
  panel.setAttribute("aria-label", config.title);
  panel.innerHTML = `
    <header class="header"><button class="close" aria-label="Close">×</button><div class="title">${escapeHtml(config.title)}</div></header>
    <div class="messages" role="log" aria-live="polite"></div>
    <form class="input"><textarea maxlength="2000" rows="1" placeholder="${escapeHtml(config.placeholder)}"></textarea><button class="send" type="submit">Send</button></form>
  `;

  const launcher = document.createElement("button");
  launcher.className = "launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-label", `Open ${config.title}`);
  launcher.textContent = "Chat";

  root.append(style, launcher, panel);

  const messages = panel.querySelector(".messages");
  const form = panel.querySelector(".input");
  const textarea = panel.querySelector("textarea");
  const send = panel.querySelector(".send");
  const close = panel.querySelector(".close");
  const history = [];

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[char]));
  }

  function addMessage(text, role) {
    const item = document.createElement("div");
    item.className = `message ${role}`;
    item.textContent = text;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage(text) {
    if (!text || send.disabled) return;
    addMessage(text, "user");
    history.push({ role: "user", content: text });
    textarea.value = "";
    send.disabled = true;

    try {
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(-10) })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || data.response || "Request failed");
      addMessage(data.response, "assistant");
      history.push({ role: "assistant", content: data.response });
    } catch {
      addMessage("I’m unable to respond right now. Please contact the business directly.", "assistant");
    } finally {
      send.disabled = false;
      textarea.focus();
    }
  }

  launcher.addEventListener("click", () => {
    panel.classList.add("open");
    launcher.hidden = true;
    if (!messages.children.length) addMessage(config.greeting, "assistant");
    textarea.focus();
  });

  close.addEventListener("click", () => {
    panel.classList.remove("open");
    launcher.hidden = false;
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    sendMessage(textarea.value.trim());
  });

  textarea.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
})();