import React, { useState } from 'react';
import { SavedPromptItem, PromptType } from '../types';
import TextIcon from './icons/TextIcon';
import ImageIcon from './icons/ImageIcon';
import TrashIcon from './icons/TrashIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';
import DownloadIcon from './icons/DownloadIcon';

interface SavedPromptsProps {
  prompts: SavedPromptItem[];
  onDelete: (id: number) => void;
}

const SavedPrompts: React.FC<SavedPromptsProps> = ({ prompts, onDelete }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpandedId(prevId => (prevId === id ? null : id));
  };

  const handleCopy = (prompt: string, id: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (prompt: string, title: string) => {
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

  if (prompts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
            <BookmarkIcon className="w-6 h-6 text-teal-600"/>
            Prompts Guardados
        </h2>
      </div>
      <div className="space-y-3">
        {prompts.map((item) => {
            const isExpanded = expandedId === item.id;
            const isCopied = copiedId === item.id;
            return (
              <div key={item.id} className="bg-white border border-stone-200 rounded-lg shadow-sm hover:shadow-md hover:border-teal-400 transition-all duration-200">
                <div className="group flex items-center justify-between p-3">
                    <div
                        onClick={() => handleToggle(item.id)}
                        className="flex items-center gap-4 text-left flex-grow min-w-0 cursor-pointer"
                        aria-expanded={isExpanded}
                        aria-controls={`prompt-content-${item.id}`}
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
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item.id);
                        }}
                        className="ml-4 p-2 rounded-full text-stone-400 hover:bg-red-100 hover:text-red-600 transition-colors flex-shrink-0"
                        aria-label={`Borrar prompt guardado: ${item.title}`}
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
                {isExpanded && (
                    <div id={`prompt-content-${item.id}`} className="px-4 pb-3 border-t border-stone-200">
                      <p className="mt-2 text-stone-700 font-mono text-sm whitespace-pre-wrap bg-stone-50 p-3 rounded-md border border-stone-200">{item.prompt}</p>
                      <div className="flex justify-end items-center gap-2 mt-2">
                        <button
                          onClick={() => handleDownload(item.prompt, item.title)}
                          className="inline-flex items-center gap-2 px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-stone-700 bg-stone-200 hover:bg-stone-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-400"
                        >
                          <DownloadIcon className="w-4 h-4" />
                          Descargar
                        </button>
                        <button
                          onClick={() => handleCopy(item.prompt, item.id)}
                          className="inline-flex items-center gap-2 px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          disabled={isCopied}
                        >
                          {isCopied ? <CheckIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />}
                          {isCopied ? 'Copiado' : 'Copiar'}
                        </button>
                      </div>
                    </div>
                )}
              </div>
            )
        })}
      </div>
    </div>
  );
};

export default SavedPrompts;
