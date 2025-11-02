import { TextPromptData, ImagePromptData, PromptType, AlternativePrompts } from '../types';

// NOTE: Gemini API logic has been moved to backend serverless functions (/api/*).
// The frontend now calls these functions instead of Google's API directly.
// This is to protect the API key and allow the app to be deployed on services like Vercel.

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
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rawPrompt, generateAlternatives }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
            throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error generating improved prompts:", error);
        throw new Error("No se pudieron generar los prompts mejorados. Verifica tu conexión e inténtalo de nuevo.");
    }
};

export const refinePrompt = async (
    promptToRefine: string,
    instruction: string,
): Promise<string> => {
    try {
        const response = await fetch('/api/refine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ promptToRefine, instruction }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
            throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }

        return await response.text();
    } catch (error) {
        console.error("Error refining prompt:", error);
        throw new Error("No se pudo refinar el prompt. Verifica tu conexión e inténtalo de nuevo.");
    }
};
