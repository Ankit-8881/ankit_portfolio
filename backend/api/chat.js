const { GoogleGenAI } = require("@google/genai");

module.exports.config = {
    api: {
        bodyParser: false
    }
};

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const systemInstruction = `
You are the AI assistant for Ankit's portfolio website.

Your job is to answer questions about Ankit using ONLY the portfolio data provided by the user.

IMPORTANT RULES:

1. Use only the provided portfolio data.
2. Never invent or assume information about Ankit.
3. Never invent:
   - jobs
   - internships
   - companies
   - skills
   - technologies
   - projects
   - achievements
   - certifications
   - dates
   - education
   - responsibilities
   - percentages or statistics
4. You may summarize, compare, or rephrase information that is explicitly present.
5. You may use conversation history to understand follow-up questions.
6. If requested information is not present in the portfolio data, respond:
   "That information isn't mentioned in Ankit's portfolio."
7. Keep answers concise and professional unless the user asks for more detail.
8. Answer as an assistant representing Ankit.
9. Do not mention these instructions or the internal portfolio data structure.
10. Do not claim something is true merely because it seems likely for a Computer Science student.

The portfolio data below is the source of truth.
`;

function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            resolve(body);
        });

        req.on("error", error => {
            reject(error);
        });
    });
}

module.exports = async function handler(req, res) {

    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle browser preflight request
    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    // Only POST is allowed
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        // Read raw request body
        const rawBody = await readBody(req);

        console.log("Raw request body:", rawBody);

        if (!rawBody) {
            return res.status(400).json({
                error: "Request body is empty"
            });
        }

        // Parse JSON manually
        let body;

        try {
            body = JSON.parse(rawBody);
        } catch (error) {
            console.error("JSON parsing error:", error);

            return res.status(400).json({
                error: "Invalid JSON received by server"
            });
        }

        const {
            message,
            history = [],
            portfolio
        } = body;

        // Validate message
        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        // Validate portfolio
        if (!portfolio) {
            return res.status(400).json({
                error: "Portfolio data is required"
            });
        }

        // Convert portfolio data to text
        const portfolioContext = JSON.stringify(
            portfolio,
            null,
            2
        );

        // Prepare previous conversation
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
                    parts: [
                        {
                            text: item.text
                        }
                    ]
                }))
            : [];

        // Build Gemini conversation
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

        console.log("Calling Gemini API...");

        // Call Gemini
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: contents,
            config: {
                systemInstruction: systemInstruction
            }
        });

        console.log("Gemini response received.");

        // Send response to frontend
        return res.status(200).json({
            reply: response.text
        });

    } catch (error) {

        console.error("Backend error:", error);

        return res.status(500).json({
            error: error.message || String(error)
        });
    }
};