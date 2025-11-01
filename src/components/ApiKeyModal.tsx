import React, { useState } from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface ApiKeyModalProps {
  onSave: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-100 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-stone-200 animate-fade-in-up">
        <div className="text-center">
            <SparklesIcon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-stone-800">Configura tu API Key</h2>
            <p className="mt-2 text-stone-600">
              Para usar esta aplicación, necesitas una API Key de Google Gemini.
            </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-semibold text-stone-700 mb-1">
              Tu API Key de Gemini
            </label>
            <input
              id="apiKey"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Pega tu API Key aquí"
              className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800"
              required
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Guardar y Continuar
          </button>
        </form>
        <div className="mt-4 text-center">
            <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-teal-600 hover:underline"
            >
                ¿No tienes una clave? Consíguela en Google AI Studio
            </a>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
