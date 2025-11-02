import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { promptToRefine, instruction } = req.body;

        if (!promptToRefine || !instruction) {
            return res.status(400).json({ error: 'Missing promptToRefine or instruction in request body' });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = 'gemini-2.5-flash';

        const systemInstruction = `Eres un asistente experto en "prompt engineering". Tu tarea es modificar un prompt existente basándote en una instrucción específica del usuario. Aplica la instrucción de la forma más fiel y efectiva posible. Devuelve únicamente el prompt modificado, sin explicaciones adicionales.`;

        const userPrompt = `Aquí está el prompt que quiero refinar:\n\n"${promptToRefine}"\n\nEsta es la instrucción para refinarlo:\n\n"${instruction}"`;

        const response = await ai.models.generateContent({
            model: model,
            contents: userPrompt,
            config: {
                systemInstruction,
            },
        });

        // Set content type to text/plain
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send(response.text.trim());

    } catch (error) {
        console.error("Error in /api/refine:", error);
        res.status(500).json({ error: "Failed to refine prompt.", details: error.message });
    }
}
