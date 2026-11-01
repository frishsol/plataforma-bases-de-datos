import { Link2 } from 'lucide-react';
import type { Desafio, Opcion, Pregunta } from '@/tipos/juego';

const OPCIONES_CARDINALIDAD: Opcion[] = [
  { id: '1:1', texto: '1:1' },
  { id: '1:N', texto: '1:N' },
  { id: 'N:M', texto: 'N:M' },
];

const cardinalidadClienteMascota: Pregunta = {
  id: 'd2-cliente-mascota',
  tipo: 'opcion-unica',
  enunciado:
    'Un cliente puede tener varias mascotas, y cada mascota pertenece a un único cliente. ¿Qué cardinalidad tiene la relación Cliente – Mascota?',
  opciones: OPCIONES_CARDINALIDAD,
  correcta: '1:N',
  explicacionesOpciones: {
    '1:1': 'No: un cliente puede tener varias mascotas, así que del lado del cliente hay muchas.',
    '1:N': 'Correcto: un cliente (1) tiene muchas mascotas (N), y cada mascota tiene un solo cliente.',
    'N:M': 'No: N:M aplica cuando varios de un lado se relacionan con varios del otro. Aquí cada mascota tiene un solo dueño.',
  },
  explicacion:
    'Lee la relación en los dos sentidos. "Un cliente tiene varias mascotas" indica muchas del lado de la mascota; "cada mascota pertenece a un cliente" indica uno del lado del cliente.',
};

const cardinalidadMascotaEstancia: Pregunta = {
  id: 'd2-mascota-estancia',
  tipo: 'opcion-unica',
  enunciado:
    'Una mascota puede tener varias estancias, y cada estancia corresponde a una sola mascota. ¿Qué cardinalidad tiene la relación Mascota – Estancia?',
  opciones: OPCIONES_CARDINALIDAD,
  correcta: '1:N',
  explicacionesOpciones: {
    '1:1': 'No: una mascota puede regresar al hotel muchas veces, así que tiene varias estancias.',
    '1:N': 'Correcto: una mascota (1) puede tener muchas estancias (N), y cada estancia es de una sola mascota.',
    'N:M': 'No: cada estancia pertenece a una única mascota, así que no hay muchos a muchos.',
  },
  explicacion:
    'Cuando del lado de una entidad aparecen muchos registros y del otro lado solo uno, la relación es 1:N.',
};

const cardinalidadEstanciaServicio: Pregunta = {
  id: 'd2-estancia-servicio',
  tipo: 'opcion-unica',
  enunciado:
    'Una estancia puede incluir varios servicios, y un servicio puede contratarse en distintas estancias. ¿Qué cardinalidad tiene la relación Estancia – Servicio?',
  opciones: OPCIONES_CARDINALIDAD,
  correcta: 'N:M',
  explicacionesOpciones: {
    '1:1': 'No: una estancia tiene varios servicios y un servicio aparece en varias estancias.',
    '1:N': 'No: del lado del servicio también hay muchas estancias, así que no es uno a muchos.',
    'N:M': 'Correcto: muchos servicios por estancia y muchas estancias por servicio forman una relación N:M.',
  },
  explicacion:
    'Cuando en ambos sentidos hay muchos registros, la relación es N:M. Este tipo de relación necesitará una tabla intermedia en el Desafío 3.',
};

const cardinalidadMicrochip: Pregunta = {
  id: 'd2-mascota-microchip',
  tipo: 'opcion-unica',
  enunciado:
    'Supón que el hotel registra un microchip por mascota: cada mascota tiene exactamente un microchip y cada microchip identifica a una sola mascota. ¿Qué cardinalidad tiene Mascota – Microchip?',
  opciones: OPCIONES_CARDINALIDAD,
  correcta: '1:1',
  explicacionesOpciones: {
    '1:1': 'Correcto: uno a uno en ambos sentidos.',
    '1:N': 'No: cada microchip identifica solo a una mascota, así que del lado del microchip hay uno.',
    'N:M': 'No: no hay varios de un lado relacionados con varios del otro.',
  },
  explicacion:
    'La relación 1:1 se da cuando cada registro de una entidad corresponde a exactamente un registro de la otra, y viceversa.',
};

const precioCobrado: Pregunta = {
  id: 'd2-precio-cobrado',
  tipo: 'opcion-unica',
  enunciado:
    'El precio cobrado depende de la combinación de una estancia con un servicio concreto. ¿Dónde debe registrarse?',
  opciones: [
    { id: 'estancia', texto: 'En la entidad Estancia' },
    { id: 'servicio', texto: 'En la entidad Servicio' },
    { id: 'relacion', texto: 'En la relación entre Estancia y Servicio' },
    { id: 'mascota', texto: 'En la entidad Mascota' },
  ],
  correcta: 'relacion',
  explicacionesOpciones: {
    estancia: 'No: una misma estancia incluye varios servicios, cada uno con su propio precio.',
    servicio: 'No: un mismo servicio se cobra distinto en cada estancia, así que no es un dato fijo del servicio.',
    relacion: 'Correcto: el precio pertenece a cada pareja estancia-servicio, por eso es un atributo de la relación.',
    mascota: 'No: la mascota no determina el precio de cada servicio contratado.',
  },
  explicacion:
    'Un atributo que depende de dos entidades a la vez pertenece a la relación entre ellas, no a una sola.',
};

const relacionesNM: Pregunta = {
  id: 'd2-relaciones-nm',
  tipo: 'seleccion-multiple',
  enunciado: 'Selecciona las frases que describen una relación N:M.',
  opciones: [
    { id: 'libro', texto: 'Un libro tiene un solo autor, y un autor puede escribir varios libros.' },
    { id: 'estudiantes', texto: 'Un estudiante se inscribe en varias materias, y cada materia tiene varios estudiantes.' },
    { id: 'pais', texto: 'Un país tiene un solo presidente, y un presidente gobierna un solo país.' },
    { id: 'estancia-servicio', texto: 'Una estancia incluye varios servicios, y un servicio aparece en varias estancias.' },
  ],
  correctas: ['estudiantes', 'estancia-servicio'],
  explicacionesOpciones: {
    libro: 'Es 1:N: del lado del libro solo hay un autor.',
    estudiantes: 'Correcto: muchos a muchos en ambos sentidos.',
    pais: 'Es 1:1: uno a uno en ambos sentidos.',
    'estancia-servicio': 'Correcto: es la relación del caso Hotel Patitas entre estancias y servicios.',
  },
  explicacion:
    'Una relación N:M tiene muchos registros en ambos lados. Revisa en cada frase si hay "un solo" en algún sentido.',
};

export const DESAFIO_2: Desafio = {
  id: 2,
  titulo: 'Relaciones y cardinalidades',
  subtitulo: 'Descubre cuántos se relacionan con cuántos',
  icono: Link2,
  instrucciones:
    'Lee cada situación y elige la cardinalidad. Recuerda leer la relación en los dos sentidos: "un cliente tiene varias mascotas" y "cada mascota tiene un cliente".',
  preguntas: [
    cardinalidadClienteMascota,
    cardinalidadMascotaEstancia,
    cardinalidadEstanciaServicio,
    cardinalidadMicrochip,
    precioCobrado,
    relacionesNM,
  ],
};
