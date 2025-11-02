import React, { useState } from 'react';
import { AlternativePrompts } from '../types';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';
import SparklesIcon from './icons/SparklesIcon';
import DownloadIcon from './icons/DownloadIcon';
import RefineModal from './RefineModal';

type PromptKey = 'raw' | 'main' | 'claridad' | 'creatividad' | 'precision';

interface PromptOutputProps {
  rawPrompt: string | null;
  mainPrompt: string | null;
  alternativePrompts: AlternativePrompts | null;
  isLoading: boolean;
  error: string | null;
  onRefine: (key: PromptKey, instruction: string) => Promise<void>;
  refiningKey: PromptKey | null;
}

const PromptCard: React.FC<{
  title: string;
  prompt: string;
  borderColor: string;
  isRefining: boolean;
  onRefine: (instruction: string) => Promise<void>;
}> = ({ title, prompt, borderColor, isRefining, onRefine }) => {
  const [copied, setCopied] = useState(false);
  const [isRefineModalOpen, setIsRefineModalOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const filename = `${slug || 'prompt'}.txt`;
    const blob = new Blob([prompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRefineSubmit = async (instruction: string) => {
    await onRefine(instruction);
    setIsRefineModalOpen(false);
  };

  return (
    <>
      <div className={`bg-stone-50 rounded-lg p-4 border-l-4 ${borderColor} relative transition-opacity ${isRefining ? 'opacity-50' : 'opacity-100'}`}>
        {isRefining && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          </div>
        )}
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-lg text-stone-800">{title}</h4>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRefineModalOpen(true)}
              className="p-2 rounded-md bg-stone-200 hover:bg-teal-100 text-stone-500 hover:text-teal-600 transition"
              aria-label="Refinar prompt"
            >
              <SparklesIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-md bg-stone-200 hover:bg-stone-300 text-stone-500 hover:text-stone-800 transition"
              aria-label="Descargar prompt"
            >
              <DownloadIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-md bg-stone-200 hover:bg-stone-300 text-stone-500 hover:text-stone-800 transition"
              aria-label="Copiar prompt"
            >
              {copied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <ClipboardIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <p className="text-stone-700 font-mono text-sm whitespace-pre-wrap">{prompt}</p>
      </div>
      {isRefineModalOpen && (
        <RefineModal
          onClose={() => setIsRefineModalOpen(false)}
          onSubmit={handleRefineSubmit}
        />
      )}
    </>
  );
};

const PromptOutput: React.FC<PromptOutputProps> = ({ rawPrompt, mainPrompt, alternativePrompts, isLoading, error, onRefine, refiningKey }) => {
  if (isLoading) {
    return (
      <div className="mt-6 p-6 rounded-lg bg-white border border-stone-200 flex flex-col items-center justify-center text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mb-4"></div>
        <p className="text-lg font-semibold text-stone-700">Generando prompts con IA...</p>
        <p className="text-stone-500">Esto puede tomar unos segundos.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-6 rounded-lg bg-red-50 border border-red-300 text-center">
        <h3 className="text-lg font-semibold text-red-700">Ocurrió un error</h3>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    );
  }

  if (!rawPrompt && !mainPrompt) {
    return null;
  }

  return (
    <div className="mt-6 space-y-6">
      <h3 className="text-2xl font-bold text-stone-900 text-center">✨ Resultados del Prompt ✨</h3>

      {rawPrompt && (
        <PromptCard 
          title="Prompt Básico (Directo del formulario)" 
          prompt={rawPrompt} 
          borderColor="border-stone-400"
          isRefining={refiningKey === 'raw'}
          onRefine={(instruction) => onRefine('raw', instruction)}
        />
      )}

      {mainPrompt && (
        <PromptCard 
          title="Prompt Principal (Mejorado por IA)" 
          prompt={mainPrompt} 
          borderColor="border-teal-500"
          isRefining={refiningKey === 'main'}
          onRefine={(instruction) => onRefine('main', instruction)}
        />
      )}

      {alternativePrompts && (
        <div>
           <h3 className="text-xl font-bold text-center text-stone-900 mt-8 mb-4 flex items-center justify-center gap-2">
            <SparklesIcon className="w-6 h-6 text-teal-500"/>
            Versiones Alternativas (por Gemini)
            <SparklesIcon className="w-6 h-6 text-teal-500"/>
           </h3>
          <div className="space-y-4">
            <PromptCard 
                title="Máxima Fidelidad (Literal)" 
                prompt={alternativePrompts.claridad} 
                borderColor="border-cyan-500"
                isRefining={refiningKey === 'claridad'}
                onRefine={(instruction) => onRefine('claridad', instruction)}
            />
            <PromptCard 
                title="Interpretación Artística (Creativo)" 
                prompt={alternativePrompts.creatividad} 
                borderColor="border-emerald-500"
                isRefining={refiningKey === 'creatividad'}
                onRefine={(instruction) => onRefine('creatividad', instruction)}
            />
            <PromptCard 
                title="Enfoque Técnico (Detallado)" 
                prompt={alternativePrompts.precision} 
                borderColor="border-teal-500"
                isRefining={refiningKey === 'precision'}
                onRefine={(instruction) => onRefine('precision', instruction)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptOutput;
