/**
 * 🏛️ NagrikNetra AI Assistant - Groq Powered (via Backend)
 */

const API_URL = "https://hackhorizon2-0-001.onrender.com"; // ✅ Ek jagah define kar diya
const chatBody = document.getElementById("chat-body");
const messageInput = document.querySelector(".message-input");
const chatForm = document.querySelector(".chat-form");

const fullName = localStorage.getItem('userName') || "Citizen";

function createMessage(text, className) {
    const div = document.createElement("div");
    div.classList.add("message", className);
    const botIcon = className === "bot-message" ? '<div class="bot-avatar"><span class="material-symbols-rounded">robot_2</span></div>' : '';
    div.innerHTML = `${botIcon}<div class="message-text">${text}</div>`;
    return div;
}

/**
 * CORE: Send & Receive Message via Backend
 */
async function sendMessage(e) {
    if (e) e.preventDefault();
    const userText = messageInput.value.trim();
    if (!userText) return;

    chatBody.appendChild(createMessage(userText, "user-message"));
    messageInput.value = "";
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

    const loadingMsg = createMessage("NagrikNetra is analyzing legal database...", "bot-message");
    chatBody.appendChild(loadingMsg);

    try {
        // ✅ FIXED: Localhost hata kar API_URL laga diya
        const response = await fetch(`${API_URL}/ai/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();
        await typeText(loadingMsg.querySelector(".message-text"), data.reply);

    } catch (err) {
        console.error("AI Error:", err);
        loadingMsg.querySelector(".message-text").innerHTML = "⚠️ Connection Error. Backend not responding.";
    }
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
}

async function typeText(element, text) {
    element.innerHTML = "";
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
            i++;
            setTimeout(typing, 15);
        }
    }
    typing();
}

chatForm.addEventListener("submit", sendMessage);
messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) sendMessage(e);
});

// FILE UPLOAD
const fileUploadBtn = document.getElementById("file-upload");
const fileInput = document.getElementById("file-input");

fileUploadBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;

    chatBody.appendChild(createMessage("📄 Image uploaded. Extracting text...", "user-message"));
    const loadingMsg = createMessage("🔍 Analyzing document...", "bot-message");
    chatBody.appendChild(loadingMsg);

    try {
        const result = await Tesseract.recognize(file, "eng+hin");
        const extractedText = result.data.text;

        if (!extractedText.trim()) {
            loadingMsg.querySelector(".message-text").innerHTML = "⚠️ Couldn't detect text in image.";
            return;
        }

        // ✅ FIXED: userText ki jagah extractedText bhej rahe hain
        const response = await fetch(`${API_URL}/ai/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: extractedText }) 
        });

        const data = await response.json();
        loadingMsg.querySelector(".message-text").innerHTML = data.reply.replace(/\n/g, "<br>");

    } catch (err) {
        console.error(err);
        loadingMsg.querySelector(".message-text").innerHTML = "⚠️ Error analyzing image.";
    }
});