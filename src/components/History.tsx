import React from 'react';
import { SavedPromptItem, PromptType } from '../types';
import TextIcon from './icons/TextIcon';
import ImageIcon from './icons/ImageIcon';
import TrashIcon from './icons/TrashIcon';

interface HistoryProps {
  history: SavedPromptItem[];
  onSelect: (item: SavedPromptItem) => void;
  onDelete: (id: number) => void;
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onSelect, onDelete, onClear }) => {
  if (history.length === 0) {
    return null; // No mostrar el componente si no hay historial
  }

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-stone-800">Historial</h2>
        <button
          onClick={onClear}
          className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
          aria-label="Limpiar todo el historial"
        >
          Limpiar historial
        </button>
      </div>
      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between p-3 bg-white border border-stone-200 rounded-lg shadow-sm hover:shadow-md hover:border-teal-400 transition-all duration-200"
          >
            <button
              onClick={() => onSelect(item)}
              className="flex items-center gap-4 text-left flex-grow min-w-0"
              aria-label={`Ver prompt: ${item.title}`}
            >
              {item.promptType === PromptType.TEXT ? (
                <TextIcon className="w-6 h-6 text-stone-500 flex-shrink-0" />
              ) : (
                <ImageIcon className="w-6 h-6 text-stone-500 flex-shrink-0" />
              )}
              <div className="min-w-0">
                <p className="font-semibold text-stone-800 truncate group-hover:text-teal-600">{item.title}</p>
                <p className="text-xs text-stone-500">{item.timestamp}</p>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevenir que onSelect se dispare
                onDelete(item.id);
              }}
              className="ml-4 p-2 rounded-full text-stone-400 hover:bg-red-100 hover:text-red-600 transition-colors flex-shrink-0"
              aria-label={`Borrar prompt: ${item.title}`}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
