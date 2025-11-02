import React from 'react';
import { PromptType } from '../types';
import TextIcon from './icons/TextIcon';
import ImageIcon from './icons/ImageIcon';

interface PromptTypeSelectorProps {
  onSelect: (type: PromptType) => void;
}

const PromptTypeSelector: React.FC<PromptTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="p-3 rounded-lg bg-white border border-stone-200">
      <h2 className="text-lg font-semibold mb-3 text-center text-teal-600">1. ¿Qué tipo de prompt quieres crear?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          onClick={() => onSelect(PromptType.TEXT)}
          className="group flex flex-row items-center justify-center p-6 gap-4 bg-stone-50 rounded-lg border-2 border-stone-300 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300 transform hover:scale-105"
        >
          <TextIcon className="w-8 h-8 text-stone-500 group-hover:text-teal-600 transition-colors" />
          <span className="text-lg font-bold text-stone-700 group-hover:text-stone-900 transition-colors">Texto</span>
        </button>
        <button
          onClick={() => onSelect(PromptType.IMAGE)}
          className="group flex flex-row items-center justify-center p-6 gap-4 bg-stone-50 rounded-lg border-2 border-stone-300 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300 transform hover:scale-105"
        >
          <ImageIcon className="w-8 h-8 text-stone-500 group-hover:text-teal-600 transition-colors" />
          <span className="text-lg font-bold text-stone-700 group-hover:text-stone-900 transition-colors">Imagen</span>
        </button>
      </div>
    </div>
  );
};

export default PromptTypeSelector;