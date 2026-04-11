/**
 * 🏛️ NagrikNetra AI Assistant - Groq Powered (Free Tier)
 * Layout: Standalone Webpage
 */

const chatBody = document.getElementById("chat-body");
const messageInput = document.querySelector(".message-input");
const chatForm = document.querySelector(".chat-form");

// 🔑 APNI GROQ API KEY YAHAN PASTE KARO (gsk_...)
const GROQ_API_KEY = "YAHAN_GROQ_KEY_PASTE_KARO"; 

// Get User's First Name from localStorage
const fullName = localStorage.getItem('userName') || "Citizen";
const firstName = fullName.split(' ')[0];

/**
 * UI: Create Message Element
 */
function createMessage(text, className) {
    const div = document.createElement("div");
    div.classList.add("message", className);
    
    const botIcon = className === "bot-message" ? '<div class="bot-avatar"><span class="material-symbols-rounded">robot_2</span></div>' : '';
    
    div.innerHTML = `
        ${botIcon}
        <div class="message-text">${text}</div>
    `;
    return div;
}

/**
 * CORE: Send & Receive Message via Groq
 */
async function sendMessage(e) {
    if (e) e.preventDefault();

    const userText = messageInput.value.trim();
    if (!userText) return;

    // 1. Show User Message
    chatBody.appendChild(createMessage(userText, "user-message"));
    messageInput.value = "";
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

    // 2. Show "Analyzing..." State
    const loadingMsg = createMessage("NagrikNetra is analyzing legal database...", "bot-message");
    chatBody.appendChild(loadingMsg);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

    try {
        // Groq API Call
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // Top tier model, fast & smart
                messages: [
                    { 
                        role: "system", 
                        content: `You are NagrikNetra AI, a specialized Legal & Government Procedure Assistant for Indian citizens. 
                        Help ${firstName} understand government procedures, RTI, FIR, and citizen rights. 
                        Keep answers concise, professional, and explain legal terms in simple Hindi/English.` 
                    },
                    { role: "user", content: userText }
                ],
                temperature: 0.7,
                max_tokens: 2048
            })
        });

        const data = await response.json();

        if (data.error) throw new Error(data.error.message);

        const botResponse = data.choices[0].message.content;

        // 3. Update Loading Message with AI Response
        loadingMsg.querySelector(".message-text").innerHTML = botResponse.replace(/\n/g, "<br>");

    } catch (err) {
        console.error("AI Error:", err);
        loadingMsg.querySelector(".message-text").innerHTML = "⚠️ Connection Error. Please ensure your Groq API key is valid.";
    }

    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
}

/**
 * EVENT LISTENERS
 */
chatForm.addEventListener("submit", sendMessage);

// Enter Key to Send (Desktop)
messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        sendMessage(e);
    }
});