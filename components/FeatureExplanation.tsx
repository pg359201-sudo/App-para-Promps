import React from 'react';
import RefineIcon from './icons/RefineIcon';

const FeatureExplanation: React.FC = () => {
  return (
    <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded-r-lg my-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <RefineIcon className="h-6 w-6 text-teal-600" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-md font-bold text-teal-800">¡Nueva funcionalidad: Refina tu Prompt!</h3>
          <div className="mt-2 text-sm text-teal-700">
            <p>
              Usa el botón <span className="font-bold">"Refinar"</span> (<RefineIcon className="inline h-4 w-4" />) en cualquier prompt para ajustarlo con una simple instrucción. Pide que sea "más corto", "más divertido" o "al estilo de Van Gogh" y la IA lo modificará por ti.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureExplanation;