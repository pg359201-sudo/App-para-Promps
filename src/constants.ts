// Text prompt options
export const TONES = ['Formal', 'Inspirador', 'Académico', 'Técnico', 'Narrativo', 'Conversacional', 'Humorístico'];
export const DEPTH_LEVELS = ['Básico', 'Intermedio', 'Avanzado'];

// Image prompt options
export const ASPECT_RATIOS = ['1:1', '16:9', '9:16', '4:3', '3:4'];
export const DETAIL_LEVELS = ['Medio', 'Alto'];

export interface CameraOption {
  value: string;
  name: string;
  description: string;
}

export const CAMERA_MODELS: CameraOption[] = [
  { value: 'Ninguna (por defecto)', name: 'Ninguna', description: '(por defecto)' },
  { value: 'Canon EOS R5 (Fotografía y video profesional versátil)', name: 'Canon EOS R5', description: '(Fotografía y video profesional versátil)' },
  { value: 'Sony Alpha A7R IV (Alta resolución y detalle extremo)', name: 'Sony Alpha A7R IV', description: '(Alta resolución y detalle extremo)' },
  { value: 'Nikon Z7 II (Precisión en retrato y paisaje)', name: 'Nikon Z7 II', description: '(Precisión en retrato y paisaje)' },
  { value: 'Fujifilm GFX 100S (Fotografía artística y publicitaria)', name: 'Fujifilm GFX 100S', description: '(Fotografía artística y publicitaria)' },
  { value: 'Leica M11 (Fotografía callejera y documental)', name: 'Leica M11', description: '(Fotografía callejera y documental)' },
  { value: 'Hasselblad X2D 100C (Moda y retrato de lujo)', name: 'Hasselblad X2D 100C', description: '(Moda y retrato de lujo)' },
  { value: 'iPhone 15 Pro (Contenido móvil y redes sociales)', name: 'iPhone 15 Pro', description: '(Contenido móvil y redes sociales)' },
  { value: 'Google Pixel 8 Pro (Fotografía creativa con IA)', name: 'Google Pixel 8 Pro', description: '(Fotografía creativa con IA)' },
  { value: 'Cámara de cine ARRI Alexa (Cine profesional)', name: 'Cámara de cine ARRI Alexa', description: '(Cine profesional)' },
  { value: 'Cámara analógica 35mm (Fotografía artística vintage)', name: 'Cámara analógica 35mm', description: '(Fotografía artística vintage)' },
  { value: 'Lente 50mm f/1.4 (Retratos y escenas naturales)', name: 'Lente 50mm f/1.4', description: '(Retratos y escenas naturales)' },
  { value: 'Lente 85mm f/1.2 (Retratos con gran desenfoque)', name: 'Lente 85mm f/1.2', description: '(Retratos con gran desenfoque)' },
  { value: 'Teleobjetivo 70-200mm (Deportes, fauna y retratos lejanos)', name: 'Teleobjetivo 70-200mm', description: '(Deportes, fauna y retratos lejanos)' },
];