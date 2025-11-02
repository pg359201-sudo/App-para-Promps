export enum PromptType {
  TEXT = 'text',
  IMAGE = 'image',
}

export interface AlternativePrompts {
  claridad: string;
  creatividad: string;
  precision: string;
}

export interface TextPromptData {
  objective: string;
  producerRole: string;
  tone: string;
  format: string;
  audience: string;
  depth: string;
  length: string;
  constraints: string;
  context: string;
  example: string;
}

export interface ImagePromptData {
  subject: string;
  action: string;
  context: string;
  environment: string;
  lighting: string;
  style: string;
  camera: string;
  detailLevel: string;
  aspectRatio: string;
  negativePrompt: string;
}

export interface SavedPromptItem {
    id: number;
    title: string;
    prompt: string;
    promptType: PromptType;
    timestamp: string;
    data: TextPromptData | ImagePromptData;
    alternatives?: AlternativePrompts | null;
}