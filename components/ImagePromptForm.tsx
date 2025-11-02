import React, { useState } from 'react';
import { ASPECT_RATIOS, DETAIL_LEVELS, CAMERA_MODELS } from '../constants';
import { ImagePromptData } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import InfoTooltip from './InfoTooltip';

interface ImagePromptFormProps {
  onGenerate: (data: ImagePromptData, generateAlternatives: boolean, title: string) => void;
}

const ImagePromptForm: React.FC<ImagePromptFormProps> = ({ onGenerate }) => {
  const [data, setData] = useState<ImagePromptData>({
    subject: '',
    action: '',
    context: '',
    environment: '',
    lighting: '',
    style: '',
    camera: CAMERA_MODELS[0].value,
    detailLevel: DETAIL_LEVELS[0],
    aspectRatio: ASPECT_RATIOS[0],
    negativePrompt: '',
  });
  const [generateAlternatives, setGenerateAlternatives] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.subject.trim() || !data.style.trim()) {
        alert("Por favor, completa los campos 'Sujeto principal' y 'Estilo visual'.");
        return;
    }
    onGenerate(data, generateAlternatives, data.subject);
  };

  return (
    <div className="p-4 rounded-lg bg-white border border-stone-200 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-teal-600">2. Describe la imagen que quieres crear</h2>
      <p className="text-center text-sm text-stone-600 mb-4">
        Usa los campos para construir tu prompt de imagen. Los detalles marcan la diferencia.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
            Sujeto principal
            <InfoTooltip text="El elemento central de tu imagen. Ej: 'un astronauta', 'un zorro rojo', 'una ciudad futurista'." />
          </label>
          <input type="text" name="subject" id="subject" value={data.subject} onChange={handleChange} placeholder="Ej: un gato con un sombrero de mago" className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="action" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
              Acción (opcional)
              <InfoTooltip text="¿Qué está haciendo el sujeto? Ej: 'leyendo un libro', 'corriendo por un campo', 'flotando en el espacio'." />
            </label>
            <input type="text" name="action" id="action" value={data.action} onChange={handleChange} placeholder="Ej: leyendo un libro antiguo" className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800" />
          </div>
          <div>
            <label htmlFor="context" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
                Contexto adicional (opcional)
                <InfoTooltip text="Detalles que añaden historia o atmósfera. Ej: 'con una expresión de sorpresa', 'rodeado de mariposas brillantes'." />
            </label>
            <input type="text" name="context" id="context" value={data.context} onChange={handleChange} placeholder="Ej: rodeado de pociones humeantes" className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="environment" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
                Entorno / Lugar (opcional)
                <InfoTooltip text="El lugar donde se desarrolla la escena. Ej: 'un bosque encantado', 'una metrópolis cyberpunk', 'una playa al atardecer'." />
              </label>
              <input type="text" name="environment" id="environment" value={data.environment} onChange={handleChange} placeholder="Ej: una biblioteca polvorienta" className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800" />
            </div>
            <div>
              <label htmlFor="lighting" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
                Iluminación (opcional)
                <InfoTooltip text="Describe cómo se ilumina la escena. Ej: 'luz de neón', 'iluminación cinematográfica', 'luz suave y difusa', 'hora dorada'." />
              </label>
              <input type="text" name="lighting" id="lighting" value={data.lighting} onChange={handleChange} placeholder="Ej: luz de velas" className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800" />
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="style" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
              Estilo visual
              <InfoTooltip text="Describe el estilo artístico. Sé creativo y combina ideas. <br/><br/><b>Ejemplos:</b><br/>- <b>Estilos:</b> Fotorrealista, Acuarela, Impresionismo, Arte Pop, Estilo Ghibli.<br/>- <b>Artistas:</b> Al estilo de Van Gogh, inspirado en Tim Burton.<br/>- <b>Técnicas:</b> Arte conceptual, Pixel art, Larga exposición, Doble exposición.<br/>- <b>Combinado:</b> 'Arte conceptual de ciencia ficción con estética Art Deco'." />
            </label>
            <input type="text" name="style" id="style" value={data.style} onChange={handleChange} placeholder="Ej: Fotorrealista, estilo Ghibli..." className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800" required />
          </div>
          <div>
            <label htmlFor="camera" className="block text-sm font-semibold text-stone-700 mb-1">Cámara / Lente</label>
            <select name="camera" id="camera" value={data.camera} onChange={handleChange} className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800">
              {CAMERA_MODELS.map(c => <option key={c.value} value={c.value}>{c.name} {c.description}</option>)}
            </select>
          </div>
        </div>
        
        <div>
           <label className="block text-sm font-semibold text-stone-700 mb-2">Nivel de detalle</label>
           <div className="flex items-center space-x-4">
              {DETAIL_LEVELS.map(level => (
                  <label key={level} className="flex items-center text-stone-700">
                      <input type="radio" name="detailLevel" value={level} checked={data.detailLevel === level} onChange={handleRadioChange} className="form-radio h-4 w-4 text-teal-600 bg-stone-100 border-stone-300 focus:ring-teal-500" />
                      <span className="ml-2">{level}</span>
                  </label>
              ))}
           </div>
        </div>

        <div>
           <label className="block text-sm font-semibold text-stone-700 mb-2">Relación de aspecto (Aspect Ratio)</label>
           <div className="flex flex-wrap items-center gap-2">
              {ASPECT_RATIOS.map(ratio => (
                  <label key={ratio} className="flex items-center text-stone-700 px-3 py-1 rounded-full border-2 cursor-pointer transition-colors" style={{borderColor: data.aspectRatio === ratio ? '#14b8a6' : '#d6d3d1', backgroundColor: data.aspectRatio === ratio ? '#f0fdfa' : '#f5f5f4'}}>
                      <input type="radio" name="aspectRatio" value={ratio} checked={data.aspectRatio === ratio} onChange={handleRadioChange} className="sr-only" />
                      <span className="font-mono text-sm">{ratio}</span>
                  </label>
              ))}
           </div>
        </div>

        <div>
          <label htmlFor="negativePrompt" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
            Añade lo que NO quieres ver (opcional)
            <InfoTooltip text="Describe lo que <b>NO</b> quieres ver en la imagen. Ej: 'manos mal dibujadas', 'texto', 'marcas de agua', 'desenfocado'." />
          </label>
          <input type="text" name="negativePrompt" id="negativePrompt" value={data.negativePrompt} onChange={handleChange} placeholder="Ej: borroso, mala calidad, texto" className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800" />
        </div>

        <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={generateAlternatives} onChange={(e) => setGenerateAlternatives(e.target.checked)} className="h-5 w-5 rounded bg-stone-100 border-stone-300 text-teal-600 focus:ring-teal-500" />
                <span className="text-stone-700">Ofrecer 3 versiones alternativas (claridad, creatividad y precisión) con Gemini</span>
            </label>
        </div>

        <div className="text-center pt-4">
          <button 
            type="submit" 
            className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-white transition-transform transform hover:scale-105"
          >
            <SparklesIcon className="w-5 h-5"/>
            Generar Prompt
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImagePromptForm;