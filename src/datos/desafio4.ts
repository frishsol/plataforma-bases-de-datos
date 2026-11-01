import { Layers } from 'lucide-react';
import type { Desafio, Pregunta } from '@/tipos/juego';

const preguntaPrimeraFormaNormal: Pregunta = {
  id: 'd4-1fn-celda',
  tipo: 'opcion-unica',
  enunciado:
    'Si la columna telefonos_cliente guarda "5512345678, 5598765432" dentro de una sola celda, ¿la tabla cumple la primera forma normal (1FN)?',
  opciones: [
    { id: 'si-nombres', texto: 'Sí, porque todas las columnas tienen nombre' },
    { id: 'no-varios', texto: 'No, porque la celda contiene varios valores' },
    { id: 'si-clave', texto: 'Sí, porque la tabla tiene clave primaria' },
    { id: 'no-fk', texto: 'No, porque falta una clave foránea' },
  ],
  correcta: 'no-varios',
  explicacionesOpciones: {
    'si-nombres': 'No basta con tener nombres de columna: cada celda debe tener un solo valor.',
    'no-varios': 'Correcto: la 1FN exige valores atómicos. Hay que separar cada teléfono en su propia fila.',
    'si-clave': 'La clave primaria no corrige celdas con varios valores.',
    'no-fk': 'El problema no es una clave foránea, sino varios valores dentro de una misma celda.',
  },
  explicacion:
    'Primera forma normal (1FN): cada celda contiene un solo valor y no hay grupos repetidos. Por eso los teléfonos deben guardarse en filas separadas o en su propia tabla.',
};

const clavePrimariaR: Pregunta = {
  id: 'd4-clave-r',
  tipo: 'opcion-unica',
  enunciado: 'Según las dependencias funcionales, ¿cuál es la clave primaria de la tabla R?',
  opciones: [
    { id: 'id-estancia', texto: 'id_estancia' },
    { id: 'id-servicio', texto: 'id_servicio' },
    { id: 'compuesta', texto: '(id_estancia, id_servicio)' },
    { id: 'id-mascota', texto: 'id_mascota' },
  ],
  correcta: 'compuesta',
  explicacionesOpciones: {
    'id-estancia': 'No: id_estancia no determina el precio cobrado de cada servicio.',
    'id-servicio': 'No: id_servicio por sí solo no determina la estancia.',
    compuesta: 'Correcto: solo esta combinación determina todos los atributos de cada fila.',
    'id-mascota': 'No: una mascota puede tener varias estancias y varios servicios.',
  },
  explicacion:
    'La clave debe determinar todos los atributos de la fila. Una pareja de identificadores que aparece junta se llama clave compuesta.',
};

const dependenciasParciales: Pregunta = {
  id: 'd4-dependencias-parciales',
  tipo: 'clasificacion',
  enunciado:
    'Clasifica cada atributo según de qué parte de la clave depende. Esto nos ayuda a encontrar dependencias parciales.',
  categorias: [
    { id: 'estancia', texto: 'Solo de id_estancia' },
    { id: 'servicio', texto: 'Solo de id_servicio' },
    { id: 'completa', texto: 'De toda la clave' },
  ],
  elementos: [
    { id: 'fecha-entrada', texto: 'fecha_entrada', correcta: 'estancia', explicacion: 'Cada estancia tiene su propia fecha de entrada: depende solo de id_estancia.' },
    { id: 'numero-espacio', texto: 'numero_espacio', correcta: 'estancia', explicacion: 'El espacio se asigna a la estancia, no al servicio.' },
    { id: 'id-mascota', texto: 'id_mascota', correcta: 'estancia', explicacion: 'Cada estancia pertenece a una mascota: depende de id_estancia.' },
    { id: 'nombre-servicio', texto: 'nombre_servicio', correcta: 'servicio', explicacion: 'El nombre lo define el servicio, sin importar la estancia.' },
    { id: 'precio-cobrado', texto: 'precio_cobrado', correcta: 'completa', explicacion: 'El precio depende de la combinación de estancia y servicio.' },
  ],
  explicacion:
    'Una dependencia parcial ocurre cuando un atributo depende solo de una parte de una clave compuesta. Hay que separarla en otra tabla para llegar a 2FN.',
};

const tablasEn2FN: Pregunta = {
  id: 'd4-tablas-2fn',
  tipo: 'seleccion-multiple',
  enunciado: 'Para eliminar las dependencias parciales (2FN), ¿qué tablas se obtienen? Selecciona todas las correctas.',
  opciones: [
    {
      id: 'estancia',
      texto: 'Estancia(id_estancia, fecha_entrada, numero_espacio, id_mascota, nombre_mascota, especie_mascota, id_cliente, nombre_cliente)',
    },
    { id: 'servicio', texto: 'Servicio(id_servicio, nombre_servicio)' },
    { id: 'intermedia', texto: 'EstanciaServicio(id_estancia, id_servicio, precio_cobrado)' },
    { id: 'servicio-precio', texto: 'Servicio(id_servicio, nombre_servicio, precio_cobrado)' },
  ],
  correctas: ['estancia', 'servicio', 'intermedia'],
  explicacionesOpciones: {
    estancia: 'Correcto: su clave es solo id_estancia, así que ya no hay dependencias parciales. Lo transitivo se resuelve en 3FN.',
    servicio: 'Correcto: nombre_servicio depende solo de id_servicio, así que se separa.',
    intermedia: 'Correcto: el precio depende de la pareja estancia-servicio, así que va en la tabla intermedia.',
    'servicio-precio': 'No: el precio cobrado no depende solo del servicio, sino de cada estancia.',
  },
  explicacion:
    'Para 2FN, cada atributo no clave debe depender de toda la clave. Por eso se separan las partes que dependen solo de una parte.',
};

const dependenciaTransitiva: Pregunta = {
  id: 'd4-transitiva',
  tipo: 'opcion-unica',
  enunciado:
    'En la tabla Estancia (ya en 2FN), ¿qué dependencia es transitiva y viola la tercera forma normal (3FN)?',
  opciones: [
    { id: 'fecha', texto: 'id_estancia → fecha_entrada' },
    { id: 'mascota', texto: 'id_mascota → nombre_mascota, especie_mascota, id_cliente' },
    { id: 'numero', texto: 'id_estancia → numero_espacio' },
    { id: 'directa', texto: 'id_estancia → id_mascota' },
  ],
  correcta: 'mascota',
  explicacionesOpciones: {
    fecha: 'No: es una dependencia directa de la clave, no pasa por otro atributo.',
    mascota: 'Correcto: id_estancia determina id_mascota, y id_mascota determina los datos de la mascota. Esos datos deben ir en su propia tabla.',
    numero: 'No: es directa; el espacio pertenece a la estancia.',
    directa: 'No: es la relación que conecta la estancia con su mascota, y debe permanecer.',
  },
  explicacion:
    'Una dependencia transitiva ocurre cuando un atributo no clave depende de otro atributo no clave. En 3FN esos datos se separan en otra tabla.',
};

const descomposicion3FN: Pregunta = {
  id: 'd4-descomposicion-3fn',
  tipo: 'opcion-unica',
  enunciado: '¿Cuál es el conjunto de tablas que cumple la tercera forma normal (3FN) para estos datos?',
  opciones: [
    {
      id: 'correcta',
      texto:
        'Estancia(id_estancia, fecha_entrada, numero_espacio, id_mascota), Mascota(id_mascota, nombre_mascota, especie_mascota, id_cliente), Cliente(id_cliente, nombre_cliente), Servicio(id_servicio, nombre_servicio), EstanciaServicio(id_estancia, id_servicio, precio_cobrado)',
    },
    {
      id: 'precio-en-estancia',
      texto:
        'Estancia(id_estancia, fecha_entrada, numero_espacio, id_mascota, precio_cobrado), Mascota(id_mascota, nombre_mascota, especie_mascota, id_cliente), Cliente(id_cliente, nombre_cliente), Servicio(id_servicio, nombre_servicio)',
    },
    {
      id: 'sin-separar',
      texto:
        'Estancia(id_estancia, fecha_entrada, numero_espacio, id_mascota, nombre_mascota, especie_mascota, id_cliente, nombre_cliente), Servicio(id_servicio, nombre_servicio), EstanciaServicio(id_estancia, id_servicio, precio_cobrado)',
    },
  ],
  correcta: 'correcta',
  explicacionesOpciones: {
    correcta: 'Correcto: cada tabla tiene dependencias solo de su clave, y las relaciones quedan en tablas propias.',
    'precio-en-estancia': 'No: el precio depende de cada pareja estancia-servicio, no solo de la estancia. Además falta la tabla Servicio con su tabla intermedia.',
    'sin-separar': 'No: todavía quedan dependencias transitivas dentro de Estancia.',
  },
  explicacion:
    'Un modelo en 3FN separa cada grupo de datos en la tabla donde su clave lo determina directamente. Así se evitan repeticiones y actualizaciones inconsistentes.',
};

export const DESAFIO_4: Desafio = {
  id: 4,
  titulo: 'Normalización hasta 3FN',
  subtitulo: 'Ordena los datos para evitar repeticiones',
  icono: Layers,
  instrucciones:
    'Analiza la tabla R de registros de estancias y sus dependencias funcionales. Aplica primero la 1FN, luego la 2FN y por último la 3FN.',
  contexto: {
    titulo: 'Tabla no normalizada R y dependencias funcionales',
    lineas: [
      'R(id_estancia, id_servicio, fecha_entrada, numero_espacio, id_mascota, nombre_mascota, especie_mascota, id_cliente, nombre_cliente, nombre_servicio, precio_cobrado)',
      '',
      'Dependencias funcionales:',
      'id_estancia → fecha_entrada, numero_espacio, id_mascota',
      'id_mascota → nombre_mascota, especie_mascota, id_cliente',
      'id_cliente → nombre_cliente',
      'id_servicio → nombre_servicio',
      'id_estancia, id_servicio → precio_cobrado',
    ],
  },
  preguntas: [
    preguntaPrimeraFormaNormal,
    clavePrimariaR,
    dependenciasParciales,
    tablasEn2FN,
    dependenciaTransitiva,
    descomposicion3FN,
  ],
};
