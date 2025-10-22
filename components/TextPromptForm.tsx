import React, { useState } from 'react';
import { DEPTH_LEVELS } from '../constants';
import { TextPromptData } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import InfoTooltip from './InfoTooltip';

interface TextPromptFormProps {
  onGenerate: (data: TextPromptData, generateAlternatives: boolean, title: string) => void;
}

const TextPromptForm: React.FC<TextPromptFormProps> = ({ onGenerate }) => {
  const [data, setData] = useState<TextPromptData>({
    objective: '',
    producerRole: '',
    tone: '',
    format: '',
    audience: '',
    depth: DEPTH_LEVELS[0],
    length: '',
    constraints: '',
    context: '',
    example: '',
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
    if (!data.producerRole.trim() || !data.objective.trim() || !data.context.trim() || !data.audience.trim() || !data.tone.trim() || !data.format.trim()) {
        alert("Por favor, completa los campos 'Define el rol de la IA', 'Objetivo', 'Proporciona contexto', 'Especifica la audiencia', 'Tono' y 'Formato'.");
        return;
    }
    onGenerate(data, generateAlternatives, data.objective);
  };

  return (
    <div className="p-4 rounded-lg bg-white border border-stone-200 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-teal-600">2. Completar campos a continuación</h2>
      <p className="text-center text-sm text-stone-600 mb-4">
        Rellena los siguientes campos para construir tu prompt de texto. Sé lo más detallado posible para obtener los mejores resultados.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="objective" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
            Objetivo del texto
            <InfoTooltip text="Define el propósito principal de tu texto. Sé específico sobre el tema." />
          </label>
          <input type="text" name="objective" id="objective" value={data.objective} onChange={handleChange} placeholder="Ej: un post para un blog de viajes describiendo una ruta económica de 3 días por Kioto" className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800" required />
        </div>
        
        <div>
          <label htmlFor="producerRole" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
            Define el rol de la IA
            <InfoTooltip text="Indica qué 'personalidad' o rol debe adoptar la IA. Ej: 'un experto en marketing', 'un guionista de comedia'." />
          </label>
          <input type="text" name="producerRole" id="producerRole" value={data.producerRole} onChange={handleChange} placeholder="Ej: un blogger de viajes experto en Japón, especializado en viajes de bajo presupuesto" className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800" required />
        </div>
        
        <div>
            <label htmlFor="context" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
                Proporciona contexto
                <InfoTooltip text="Ofrece información de fondo crucial. Ej: 'Es parte de una serie sobre startups', 'El público no conoce los términos técnicos'." />
            </label>
            <textarea
                name="context"
                id="context"
                value={data.context}
                onChange={handleChange}
                placeholder="Ej: Este post es el primero de una serie de 5 sobre 'Japón con mochila'. Debe ser inspirador y práctico."
                className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800"
                rows={2}
                required
            />
        </div>

        <div>
          <label htmlFor="audience" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
            Especifica la audiencia
            <InfoTooltip text="Describe a quién va dirigido el texto. Esto afecta el lenguaje y tono. Ej: 'inversores experimentados', 'estudiantes de secundaria'." />
          </label>
          <input type="text" name="audience" id="audience" value={data.audience} onChange={handleChange} placeholder="Ej: Jóvenes universitarios (18-25 años) que viajan por primera vez a Asia y tienen un presupuesto diario estricto." className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="tone" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
                Especifica el Tono
                <InfoTooltip text="La emoción o actitud del texto. Ej: 'profesional pero cercano', 'urgente y persuasivo'." />
            </label>
            <input type="text" name="tone" id="tone" value={data.tone} onChange={handleChange} placeholder="Ej: Cercano, inspirador y lleno de consejos prácticos" className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800" required />
          </div>
          <div>
            <label htmlFor="format" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
                Formato
                <InfoTooltip text="Describe la estructura final del contenido. Ej: 'un post para blog', 'un email formal', 'un guion de video'." />
            </label>
            <input type="text" name="format" id="format" value={data.format} onChange={handleChange} placeholder="Ej: Un post de blog con una introducción, un itinerario día por día y una conclusión con un resumen de gastos." className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800" required />
          </div>
          <div>
            <label htmlFor="length" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
                Extensión (opcional)
                <InfoTooltip text="Define la longitud deseada. Ej: '800 palabras', '3 párrafos', 'un guion de 5 minutos'." />
            </label>
            <input type="text" name="length" id="length" value={data.length} onChange={handleChange} placeholder="Ej: Aproximadamente 1200 palabras" className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800" />
          </div>
        </div>

        <div>
            <label htmlFor="constraints" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
                Añade restricciones (opcional)
                <InfoTooltip text="Establece reglas o límites. Ej: 'no usar lenguaje técnico', 'evitar mencionar precios'." />
            </label>
            <textarea
                name="constraints"
                id="constraints"
                value={data.constraints}
                onChange={handleChange}
                placeholder="Ej: No incluir restaurantes de lujo ni transporte en taxi. Enfocarse en pases de autobús y metro."
                className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800"
                rows={2}
            />
        </div>

        <div>
            <label htmlFor="example" className="flex items-center text-sm font-semibold text-stone-700 mb-1">
                Incluir un Ejemplo (opcional)
                <InfoTooltip text="Proporciona un fragmento que muestre el estilo o tono que buscas.<br/><br/><b>Ejemplos:</b><br/>- <b>Narrativo:</b> 'La niebla se aferraba al muelle...'<br/>- <b>Técnico:</b> 'El protocolo TCP/IP funciona en cuatro capas...'<br/>- <b>Marketing:</b> 'Descubre la revolución del descanso...'" />
            </label>
            <textarea
                name="example"
                id="example"
                value={data.example}
                onChange={handleChange}
                placeholder="Ej: 'Kioto, la antigua capital imperial, es un tesoro de templos serenos y jardines zen. En nuestro primer día, nos perdimos por las calles de Gion...'"
                className="w-full bg-stone-100 border border-stone-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-800"
                rows={2}
            />
        </div>

        <div>
           <label className="flex items-center text-sm font-semibold text-stone-700 mb-2">
                Nivel de profundidad
                <InfoTooltip text="Elige cuán detallada y compleja debe ser la información. Básico (introductorio), Intermedio (análisis), Avanzado (para expertos)." />
           </label>
           <div className="flex items-center space-x-4">
              {DEPTH_LEVELS.map(level => (
                  <label key={level} className="flex items-center text-stone-700">
                      <input type="radio" name="depth" value={level} checked={data.depth === level} onChange={handleRadioChange} className="form-radio h-4 w-4 text-teal-600 bg-stone-100 border-stone-300 focus:ring-teal-500" />
                      <span className="ml-2">{level}</span>
                  </label>
              ))}
           </div>
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

export default TextPromptForm;