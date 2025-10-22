import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import PromptTypeSelector from './components/PromptTypeSelector';
import TextPromptForm from './components/TextPromptForm';
import ImagePromptForm from './components/ImagePromptForm';
import PromptOutput from './components/PromptOutput';
import History from './components/History';
import SavedPrompts from './components/SavedPrompts';
import PastePromptForm from './components/PastePromptForm';

import { 
  PromptType, 
  TextPromptData, 
  ImagePromptData, 
  AlternativePrompts, 
  SavedPromptItem 
} from './types';

import { generateRawPrompt, generateImprovedPrompts, refinePrompt } from './services/geminiService';

type PromptKey = 'raw' | 'main' | 'claridad' | 'creatividad' | 'precision';

const App: React.FC = () => {
  const [promptType, setPromptType] = useState<PromptType | null>(null);
  
  const [rawPrompt, setRawPrompt] = useState<string | null>(null);
  const [mainPrompt, setMainPrompt] = useState<string | null>(null);
  const [alternativePrompts, setAlternativePrompts] = useState<AlternativePrompts | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refiningKey, setRefiningKey] = useState<PromptKey | null>(null);

  const [currentPromptData, setCurrentPromptData] = useState<TextPromptData | ImagePromptData | null>(null);
  
  const [history, setHistory] = useState<SavedPromptItem[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<SavedPromptItem[]>([]);
  
  const resultsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('promptHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
      const storedSaved = localStorage.getItem('savedPrompts');
      if (storedSaved) {
        setSavedPrompts(JSON.parse(storedSaved));
      }
    } catch (e) {
      console.error("Failed to parse from localStorage", e);
    }
  }, []);
  
  useEffect(() => {
    if ((rawPrompt || mainPrompt || error) && !isLoading) {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [rawPrompt, mainPrompt, error, isLoading]);

  const addToHistory = (newItem: Omit<SavedPromptItem, 'id' | 'timestamp'>) => {
    setHistory(prev => {
      const newHistoryItem: SavedPromptItem = {
        ...newItem,
        id: Date.now(),
        timestamp: new Date().toLocaleString('es-ES'),
      };
      const updatedHistory = [newHistoryItem, ...prev].slice(0, 10); // Keep last 10
      localStorage.setItem('promptHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  const handlePromptTypeSelect = (type: PromptType) => {
    setPromptType(type);
  };
  
  const handleReset = () => {
    setPromptType(null);
    setRawPrompt(null);
    setMainPrompt(null);
    setAlternativePrompts(null);
    setError(null);
    setCurrentPromptData(null);
    setIsLoading(false);
  };

  const handleGenerate = async (data: TextPromptData | ImagePromptData, generateAlternatives: boolean, title: string) => {
    setIsLoading(true);
    setError(null);
    setRawPrompt(null);
    setMainPrompt(null);
    setAlternativePrompts(null);
    
    if (!promptType) return;
    
    setCurrentPromptData(data);

    try {
      const generatedRawPrompt = generateRawPrompt(data, promptType);
      setRawPrompt(generatedRawPrompt);

      const { mainPrompt: improvedPrompt, alternativePrompts: alternatives } = await generateImprovedPrompts(generatedRawPrompt, generateAlternatives);
      setMainPrompt(improvedPrompt);
      setAlternativePrompts(alternatives);

      addToHistory({
        title,
        prompt: improvedPrompt,
        promptType,
        data,
        alternatives
      });

    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStartRefiningPastedPrompt = (prompt: string, type: PromptType) => {
    setPromptType(type);
    setRawPrompt(prompt);
    setMainPrompt(null);
    setAlternativePrompts(null);
    setError(null);
    const partialData = type === PromptType.TEXT 
        ? { objective: prompt.slice(0, 50) } as Partial<TextPromptData> 
        : { subject: prompt.slice(0, 50) } as Partial<ImagePromptData>;
    setCurrentPromptData(partialData as any);
  };

  const getPromptByKey = (key: PromptKey): string | null => {
    switch(key) {
      case 'raw': return rawPrompt;
      case 'main': return mainPrompt;
      case 'claridad': return alternativePrompts?.claridad || null;
      case 'creatividad': return alternativePrompts?.creatividad || null;
      case 'precision': return alternativePrompts?.precision || null;
      default: return null;
    }
  };

  const handleRefine = async (key: PromptKey, instruction: string) => {
    const promptToRefine = getPromptByKey(key);
    if (!promptToRefine) {
      setError("No se encontró el prompt para refinar.");
      return;
    }
    setRefiningKey(key);
    setError(null);
    try {
      const refined = await refinePrompt(promptToRefine, instruction);
      
      switch(key) {
        case 'raw': setRawPrompt(refined); break;
        case 'main': setMainPrompt(refined); break;
        case 'claridad': setAlternativePrompts(p => p ? { ...p, claridad: refined } : null); break;
        case 'creatividad': setAlternativePrompts(p => p ? { ...p, creatividad: refined } : null); break;
        case 'precision': setAlternativePrompts(p => p ? { ...p, precision: refined } : null); break;
      }
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred during refinement.');
    } finally {
      setRefiningKey(null);
    }
  };

  const handleSelectFromHistory = (item: SavedPromptItem) => {
    setPromptType(item.promptType);
    setCurrentPromptData(item.data);
    setMainPrompt(item.prompt);
    setAlternativePrompts(item.alternatives || null);
    
    if(item.data && Object.keys(item.data).length > 1) { // Check if data is more than just partial
      const generatedRawPrompt = generateRawPrompt(item.data, item.promptType);
      setRawPrompt(generatedRawPrompt);
    } else {
      setRawPrompt(null);
    }
    
    setError(null);
    window.scrollTo(0, 0);
  };
  
  const handleDeleteFromHistory = (id: number) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('promptHistory', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('promptHistory');
  };

  const handleDeleteSaved = (id: number) => {
    setSavedPrompts(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('savedPrompts', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="bg-stone-100 min-h-screen font-sans">
      <main className="max-w-4xl mx-auto p-4 md:p-6">
        <Header />
        
        {!promptType ? (
          <>
            <PromptTypeSelector onSelect={handlePromptTypeSelect} />
            <div className="my-6 flex items-center text-center">
                <div className="flex-grow border-t border-stone-300"></div>
                <span className="flex-shrink mx-4 text-stone-500 font-semibold">O</span>
                <div className="flex-grow border-t border-stone-300"></div>
            </div>
            <PastePromptForm onStartRefine={handleStartRefiningPastedPrompt} />
          </>
        ) : (
          <div>
            <button 
              onClick={handleReset}
              className="mb-4 text-sm font-semibold text-teal-600 hover:text-teal-800"
            >
              &larr; Volver a empezar
            </button>
            
            {/* Show form only when we are just starting from scratch */}
            {!rawPrompt && !mainPrompt && !isLoading && !error && (
              <>
                {promptType === PromptType.TEXT && <TextPromptForm onGenerate={handleGenerate} />}
                {promptType === PromptType.IMAGE && <ImagePromptForm onGenerate={handleGenerate} />}
              </>
            )}
          </div>
        )}

        <div ref={resultsRef}>
          <PromptOutput
            rawPrompt={rawPrompt}
            mainPrompt={mainPrompt}
            alternativePrompts={alternativePrompts}
            isLoading={isLoading}
            error={error}
            onRefine={handleRefine}
            refiningKey={refiningKey}
          />
        </div>

        <SavedPrompts prompts={savedPrompts} onDelete={handleDeleteSaved} />

        <History 
          history={history}
          onSelect={handleSelectFromHistory}
          onDelete={handleDeleteFromHistory}
          onClear={handleClearHistory}
        />
      </main>
    </div>
  );
};

export default App;