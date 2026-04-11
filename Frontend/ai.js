const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");

const API_KEY = "YOUR_API_KEY_HERE"; // 🔥 put your Gemini API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

let chatHistory = [];

/* Create message */
function createMessage(text, className) {
  const div = document.createElement("div");
  div.classList.add("message", className);

  div.innerHTML = `<div class="message-text">${text}</div>`;
  return div;
}

/* Send message */
async function sendMessage(e) {
  e.preventDefault();

  const userText = messageInput.value.trim();
  if (!userText) return;

  // Show user message
  chatBody.appendChild(createMessage(userText, "user-message"));
  messageInput.value = "";

  // Scroll
  chatBody.scrollTop = chatBody.scrollHeight;

  // Show loading
  const loading = createMessage("Typing...", "bot-message");
  chatBody.appendChild(loading);

  // Add to history
  chatHistory.push({
    role: "user",
    parts: [{ text: userText }]
  });

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ contents: chatHistory })
    });

    const data = await res.json();

    const botText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    loading.querySelector(".message-text").innerText = botText;

    chatHistory.push({
      role: "model",
      parts: [{ text: botText }]
    });

  } catch (err) {
    loading.querySelector(".message-text").innerText = "Error ❌";
    console.error(err);
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}

/* Events */
document.querySelector(".chat-form").addEventListener("submit", sendMessage);

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 768) {
    sendMessage(e);
  }
});

/* Toggle chatbot */
chatbotToggler.onclick = () => {
  document.body.classList.toggle("show-chatbot");
};

closeChatbot.onclick = () => {
  document.body.classList.remove("show-chatbot");
};