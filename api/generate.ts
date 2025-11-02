import { GoogleGenAI, Type } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Esta es una función serverless de Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { rawPrompt, generateAlternatives } = req.body;

        if (!rawPrompt) {
            return res.status(400).json({ error: 'Missing rawPrompt in request body' });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = 'gemini-2.5-flash';

        const systemInstruction = `Eres un experto en "prompt engineering" para modelos de IA generativa. Tu tarea es mejorar el siguiente prompt de usuario para que sea más efectivo, claro y detallado.
        Analiza el prompt del usuario y genera una versión principal mejorada.
        Si se solicita, genera también tres versiones alternativas, cada una con un enfoque específico y claro:
        1.  **Máxima Fidelidad (claridad)**: Una versión que traduce la idea del usuario de la forma más literal y directa posible, eliminando ambigüedades para obtener un resultado predecible y fiel a la visión original.
        2.  **Interpretación Artística (creatividad)**: Una versión que le da a la IA más libertad creativa, sugiriendo elementos imaginativos o inesperados para un resultado más sorprendente y artístico.
        3.  **Enfoque Técnico (precision)**: Una versión que se centra en los detalles técnicos de la composición, como el tipo de cámara, la iluminación específica o la estructura de la imagen/texto, para usuarios que buscan un control granular.
        
        Devuelve la respuesta en formato JSON.`;

        const userPrompt = `Mejora el siguiente prompt: "${rawPrompt}". 
        ${generateAlternatives ? 'Además, genera las 3 versiones alternativas (claridad, creatividad, precisión).' : 'No generes versiones alternativas.'}`;

        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                mainPrompt: { type: Type.STRING, description: 'La versión principal y mejorada del prompt.' },
                ...(generateAlternatives && {
                    alternatives: {
                        type: Type.OBJECT,
                        properties: {
                            claridad: { type: Type.STRING, description: 'Versión para "Máxima Fidelidad (Literal)".' },
                            creatividad: { type: Type.STRING, description: 'Versión para "Interpretación Artística (Creativo)".' },
                            precision: { type: Type.STRING, description: 'Versión para "Enfoque Técnico (Detallado)".' },
                        },
                        required: ['claridad', 'creatividad', 'precision']
                    }
                })
            },
            required: ['mainPrompt']
        };

        const response = await ai.models.generateContent({
            model: model,
            contents: userPrompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text?.trim();
        if (!jsonText) {
            throw new Error("Received empty text response from Gemini.");
        }
        const result = JSON.parse(jsonText);
        
        res.status(200).json({
            mainPrompt: result.mainPrompt,
            alternativePrompts: result.alternatives || null,
        });

    } catch (error) {
        console.error("Error in /api/generate:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ error: "Failed to generate improved prompts.", details: errorMessage });
    }
}