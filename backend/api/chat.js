const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const systemInstruction = `
You are the AI assistant for Ankit's portfolio website.

Answer questions about Ankit using ONLY the portfolio data provided.

Never invent information about Ankit.

If requested information is not present in the portfolio data, respond:
"That information isn't mentioned in Ankit's portfolio."

Keep answers concise and professional.
`;

module.exports = async function handler(req, res) {

    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { message, history, portfolio } = req.body || {};

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

        const portfolioContext = JSON.stringify(
            portfolio,
            null,
            2
        );

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
            contents,
            config: {
                systemInstruction
            }
        });

        return res.status(200).json({
            reply: response.text
        });

    } catch (error) {

        console.error("Gemini API Error:", error);

        return res.status(500).json({
            error: error.message || "Something went wrong"
        });
    }
};