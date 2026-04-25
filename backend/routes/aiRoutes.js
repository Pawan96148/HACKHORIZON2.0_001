const express = require("express");
const fetch = require("node-fetch"); // ✅ IMPORTANT

const router = express.Router();

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "You are a legal assistant AI." },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        // ✅ SEND CLEAN RESPONSE
        res.json({
            reply: data.choices?.[0]?.message?.content || "No response"
        });

    } catch (err) {
        console.error("AI ERROR:", err);
        res.status(500).json({ error: "AI error" });
    }
});

module.exports = router;