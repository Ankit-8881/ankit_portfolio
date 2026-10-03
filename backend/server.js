const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const systemInstruction = `
You are Ankit's professional portfolio assistant.

Your job is to answer questions about Ankit using ONLY the portfolio information provided.

Response rules:
1. Be concise and conversational.
2. Answer directly instead of repeating the question.
3. For technical questions, mention relevant technologies and explain their role briefly.
4. When discussing projects, mention:
   - project purpose
   - technologies used
   - key functionality
   - relevant outcome/impact if available
5. When discussing skills, group them logically.
6. Never invent experience, metrics, companies, responsibilities, or technologies.
7. If information is unavailable, say:
   "That information isn't mentioned in Ankit's portfolio."
8. For interview/recruiter questions, respond professionally and highlight only documented experience.

The portfolio data below is the source of truth.
`;

app.post("/api/chat", async (req, res) => {
    try {
        const { message, history, portfolio } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        if (!portfolio) {
            return res.status(400).json({
                error: "Portfolio data is required"
            });
        }

        // Convert the portfolio data into readable text for Gemini
        const portfolioContext = JSON.stringify(portfolio, null, 2);

        // Convert frontend conversation history into Gemini format
        const previousMessages = Array.isArray(history)
            ? history
                  .filter(
                      item =>
                          item &&
                          (item.role === "user" || item.role === "model") &&
                          typeof item.text === "string"
                  )
                  .slice(-10)
                  .map(item => ({
                      role: item.role,
                      parts: [{ text: item.text }]
                  }))
            : [];

        const contents = [
            ...previousMessages,
            {
                role: "user",
                parts: [
                    {
                        text: `
PORTFOLIO DATA:

${portfolioContext}

CURRENT USER QUESTION:

${message}
`
                    }
                ]
            }
        ];

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: contents,
            config: {
                systemInstruction: systemInstruction
            }
        });

        res.json({
            reply: response.text
        });

    } catch (error) {
        console.error("Gemini API Error:", error);

        res.status(error.status || 500).json({
            error: error.message || "Something went wrong"
        });
    }
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;