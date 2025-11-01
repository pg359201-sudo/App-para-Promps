import React, { useState } from 'react';
import InfoIcon from './icons/InfoIcon';

interface InfoTooltipProps {
  text: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-flex items-center ml-2"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      aria-label="Información adicional"
    >
      <InfoIcon className="w-4 h-4 text-stone-400 cursor-help hover:text-teal-600 transition-colors" />
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-60 p-3 bg-stone-800 text-white text-sm rounded-lg shadow-lg z-20 transition-opacity duration-300" role="tooltip">
          <p dangerouslySetInnerHTML={{ __html: text }} />
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-stone-800"></div>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
