
import { GoogleGenAI, Type } from "@google/genai";
import { TextPromptData, ImagePromptData, PromptType, AlternativePrompts } from '../types';

const model = 'gemini-2.5-flash';

const buildTextPrompt = (data: TextPromptData): string => {
    let prompt = `Actúa como un ${data.producerRole}. `;
    prompt += `El objetivo es crear un ${data.format} sobre "${data.objective}". `;
    prompt += `El texto va dirigido a ${data.audience}. `;
    prompt += `El tono debe ser ${data.tone}. `;
    prompt += `El contexto es: ${data.context}. `;
    if (data.length) prompt += `La extensión aproximada es de ${data.length}. `;
    if (data.depth) prompt += `El nivel de profundidad debe ser ${data.depth}. `;
    if (data.constraints) prompt += `Restricciones: ${data.constraints}. `;
    if (data.example) prompt += `Usa un estilo similar a este ejemplo: "${data.example}".`;
    return prompt.trim();
};

const buildImagePrompt = (data: ImagePromptData): string => {
    let prompt = `${data.subject}`;
    if (data.action) prompt += `, ${data.action}`;
    if (data.context) prompt += `, ${data.context}`;
    if (data.environment) prompt += `, en ${data.environment}`;
    if (data.lighting) prompt += `, con iluminación ${data.lighting}`;
    prompt += `. El estilo visual es ${data.style}`;
    if (data.camera && data.camera !== 'Ninguna (por defecto)') prompt += `, usando una cámara ${data.camera}`;
    prompt += `. El nivel de detalle es ${data.detailLevel}`;
    prompt += `. La relación de aspecto es ${data.aspectRatio}`;
    if (data.negativePrompt) prompt += `. Prompt negativo: ${data.negativePrompt}`;
    return prompt.trim();
};

export const generateRawPrompt = (data: TextPromptData | ImagePromptData, type: PromptType): string => {
    if (type === PromptType.TEXT) {
        return buildTextPrompt(data as TextPromptData);
    } else {
        return buildImagePrompt(data as ImagePromptData);
    }
};

export const generateImprovedPrompts = async (
    rawPrompt: string,
    generateAlternatives: boolean,
): Promise<{ mainPrompt: string; alternativePrompts: AlternativePrompts | null }> => {
    // FIX: Switched to process.env.API_KEY and removed getApiKey function to fix TypeScript error and align with guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: userPrompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        return {
            mainPrompt: result.mainPrompt,
            alternativePrompts: result.alternatives || null,
        };

    } catch (error) {
        console.error("Error generating improved prompts:", error);
        if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('API_KEY'))) {
            throw new Error("API key no válida. Por favor, verifica la clave en tus variables de entorno.");
        }
        throw new Error("No se pudieron generar los prompts mejorados. Verifica tu conexión e inténtalo de nuevo.");
    }
};

export const refinePrompt = async (
    promptToRefine: string,
    instruction: string,
): Promise<string> => {
    // FIX: Switched to process.env.API_KEY to align with guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = `Eres un asistente experto en "prompt engineering". Tu tarea es modificar un prompt existente basándote en una instrucción específica del usuario. Aplica la instrucción de la forma más fiel y efectiva posible. Devuelve únicamente el prompt modificado, sin explicaciones adicionales.`;

    const userPrompt = `Aquí está el prompt que quiero refinar:\n\n"${promptToRefine}"\n\nEsta es la instrucción para refinarlo:\n\n"${instruction}"`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: userPrompt,
            config: {
                systemInstruction,
            },
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error refining prompt:", error);
        if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('API_KEY'))) {
            throw new Error("API key no válida. Por favor, verifica la clave en tus variables de entorno.");
        }
        throw new Error("No se pudo refinar el prompt. Verifica tu conexión e inténtalo de nuevo.");
    }
};
