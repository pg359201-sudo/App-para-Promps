import React, { useState } from 'react';
import { PromptType } from '../types';
import SparklesIcon from './icons/SparklesIcon';

interface PastePromptFormProps {
  onStartRefine: (prompt: string, type: PromptType) => void;
}

const PastePromptForm: React.FC<PastePromptFormProps> = ({ onStartRefine }) => {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<PromptType>(PromptType.TEXT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      alert('Por favor, pega o escribe un prompt.');
      return;
    }
    onStartRefine(prompt, type);
  };

  return (
    <div className="p-4 rounded-lg bg-white border border-stone-200">
      <h2 className="text-xl font-semibold mb-4 text-center text-teal-600">¿Ya tienes un prompt?</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pastedPrompt" className="sr-only">
            Tu prompt
          </label>
          <textarea
            id="pastedPrompt"
            name="pastedPrompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Pega tu prompt aquí, para editarlo"
            className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2 text-center">Tipo de prompt:</label>
          <div className="flex justify-center gap-4">
            <label className="flex items-center text-stone-700 cursor-pointer">
              <input type="radio" name="promptType" value={PromptType.TEXT} checked={type === PromptType.TEXT} onChange={() => setType(PromptType.TEXT)} className="form-radio h-4 w-4 text-teal-600 bg-stone-100 border-stone-300 focus:ring-teal-500" />
              <span className="ml-2">Texto</span>
            </label>
            <label className="flex items-center text-stone-700 cursor-pointer">
              <input type="radio" name="promptType" value={PromptType.IMAGE} checked={type === PromptType.IMAGE} onChange={() => setType(PromptType.IMAGE)} className="form-radio h-4 w-4 text-teal-600 bg-stone-100 border-stone-300 focus:ring-teal-500" />
              <span className="ml-2">Imagen</span>
            </label>
          </div>
        </div>

        <div className="text-center pt-2">
          <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-white transition-transform transform hover:scale-105">
            <SparklesIcon className="w-5 h-5" />
            Empezar a Refinar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PastePromptForm;
