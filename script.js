async function sendMessage() {
  const input = document.getElementById("user-input");
  const spinner = document.getElementById("spinner");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";
  spinner.classList.remove("hidden");

  try {
    const res = await fetch("https://Shakeel676-mozi-ai-backend.hf.space/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    appendMessage("bot", data.response);
  } catch (err) {
    appendMessage("bot", "⚠️ Error: Could not reach the server.");
  } finally {
    spinner.classList.add("hidden");
  }
}

function appendMessage(role, text) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.className = `message ${role}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send on Enter
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});
