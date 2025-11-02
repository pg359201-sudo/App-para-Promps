import React, { useState, useEffect, useRef } from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface RefineModalProps {
  onClose: () => void;
  onSubmit: (instruction: string) => void;
}

const RefineModal: React.FC<RefineModalProps> = ({ onClose, onSubmit }) => {
  const [instruction, setInstruction] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    inputRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (instruction.trim()) {
      onSubmit(instruction.trim());
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
          <SparklesIcon className="w-6 h-6 text-teal-600" />
          Refinar Prompt
        </h3>
        <p className="text-stone-600 mb-4 text-sm">
          Escribe una instrucción para modificar el prompt. Por ejemplo: "hazlo más corto", "añade un toque de misterio" o "cambia el estilo a cyberpunk".
        </p>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Ej: Conviértelo en un haiku"
            className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800"
            required
          />
          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-md text-stone-700 bg-stone-100 hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Refinar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RefineModal;