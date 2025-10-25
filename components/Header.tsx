import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 relative">
      <div className="flex items-center justify-center gap-3">
        <SparklesIcon className="w-10 h-10 text-teal-600" />
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-600">
          Asistente de Prompts AI
        </h1>
      </div>
      <p className="mt-2 text-lg text-stone-600">
        Crea prompts perfectos para modelos de texto e imagen.
      </p>
    </header>
  );
};

export default Header;