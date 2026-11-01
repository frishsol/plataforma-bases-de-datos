import { ArrowLeftRight, Database, ListChecks, Target } from 'lucide-react';
import type { BloqueAprende, Leccion, PasoObservacion } from '@/tipos/leccion';
import type { Pregunta } from '@/tipos/juego';

const BLOQUES_APRENDE: BloqueAprende[] = [
  {
    tipo: 'tarjetas-intro',
    titulo: 'Tres preguntas para entender el modelo físico',
    tarjetas: [
      {
        icono: Database,
        titulo: '¿Qué es?',
        texto: 'La especificación que describe cómo se guardarán las tablas en un sistema gestor concreto, en este caso MySQL.',
        etiqueta: 'Definición',
      },
      {
        icono: Target,
        titulo: '¿Para qué sirve?',
        texto: 'Permite crear la base de datos sin ambigüedades: cada campo tiene un nombre exacto, un tipo, una longitud y sus restricciones.',
      },
      {
        icono: ArrowLeftRight,
        titulo: '¿En qué se diferencia?',
        texto: 'El lógico dice qué datos existen y cómo se relacionan. El físico decide cómo se almacenan.',
      },
      {
        icono: ListChecks,
        titulo: 'Qué veremos',
        texto: 'Tipos de datos, longitudes y precisión, claves y restricciones, construcción de una tabla y práctica.',
      },
    ],
  },
  {
    tipo: 'destacado',
    titulo: 'Regla de oro',
    texto:
      'El modelo lógico no cambia según el gestor que uses. El modelo físico sí, porque depende de las posibilidades de MySQL u otro sistema.',
  },
  {
    tipo: 'comparativa-tablas',
    titulo: 'Mismo contenido, dos niveles de detalle',
    texto: 'Así se ve la tabla Mascota de Hotel Patitas en el modelo lógico y en el modelo físico.',
    logica: {
      nombre: 'Mascota',
      columnas: ['Campo', 'Clave'],
      filas: [
        ['id_mascota', 'Primaria'],
        ['nombre', '—'],
        ['especie', '—'],
        ['fecha_nacimiento', '—'],
      ],
    },
    fisica: {
      nombre: 'Mascota',
      columnas: ['Campo', 'Tipo de dato', 'Clave'],
      filas: [
        ['id_mascota', 'INT', 'PRIMARY KEY'],
        ['nombre', 'VARCHAR(50)', '—'],
        ['especie', 'VARCHAR(30)', '—'],
        ['fecha_nacimiento', 'DATE', '—'],
      ],
    },
    diferencias: [
      'El modelo lógico describe la tabla con sus campos y claves, sin tipos de dato.',
      'El modelo físico asigna a cada campo un tipo y, cuando corresponde, una longitud: INT, VARCHAR(50), DATE.',
      'El modelo físico escribe la clave primaria con la forma que entiende MySQL.',
      'Las longitudes VARCHAR(50) y VARCHAR(30) son decisiones de diseño. Se justifican en el subtema 4.3.',
    ],
  },
];

const PASOS_OBSERVA: PasoObservacion[] = [
  {
    titulo: 'Partimos del modelo lógico',
    explicacion: 'Tenemos la tabla Mascota con sus campos, pero todavía no sabemos qué tipo de dato guarda cada uno.',
    visual: {
      tipo: 'frase',
      resalta: 'entidad',
      segmentos: [
        { texto: 'La tabla ' },
        { texto: 'Mascota', tipo: 'entidad' },
        { texto: ' tiene los campos id_mascota, nombre, especie y fecha_nacimiento.' },
      ],
    },
  },
  {
    titulo: 'Asignamos un tipo a cada campo',
    explicacion:
      'El nombre y la especie son texto, así que usan VARCHAR. La fecha de nacimiento se guarda como DATE. El identificador es un número entero, INT.',
    visual: {
      tipo: 'resultado',
      grupos: [
        {
          tipo: 'atributo',
          elementos: ['id_mascota → INT', 'nombre → VARCHAR(50)', 'especie → VARCHAR(30)', 'fecha_nacimiento → DATE'],
        },
      ],
    },
  },
  {
    titulo: 'Marcamos la clave primaria',
    explicacion: 'id_mascota identifica a cada mascota sin repetirse, así que se convierte en la clave primaria.',
    visual: {
      tipo: 'frase',
      resalta: 'atributo',
      segmentos: [
        { texto: 'El campo ' },
        { texto: 'id_mascota', tipo: 'atributo' },
        { texto: ' se marca como PRIMARY KEY porque identifica a cada mascota sin repetirse.' },
      ],
    },
  },
];

const PRACTICA: Pregunta[] = [
  {
    id: 'mf1-que-aporta',
    tipo: 'opcion-unica',
    enunciado: '¿Qué información aporta el modelo físico que no aparece en el modelo lógico?',
    opciones: [
      { id: 'entidades', texto: 'Las entidades del problema' },
      { id: 'tipos', texto: 'Tipos de dato y longitudes' },
      { id: 'cardinalidades', texto: 'Las cardinalidades' },
      { id: 'atributos', texto: 'Los atributos de cada tabla' },
    ],
    correcta: 'tipos',
    explicacionesOpciones: {
      entidades: 'No: las entidades pertenecen al modelo conceptual y se conservan en el lógico.',
      tipos: 'Correcto: el modelo físico asigna a cada campo un tipo de dato y, si corresponde, una longitud.',
      cardinalidades: 'No: las cardinalidades ya se definieron antes y no son información física.',
      atributos: 'No: los campos ya aparecen en el modelo lógico. Lo que cambia es su detalle.',
    },
    explicacion: 'El modelo lógico define qué campos existen. El físico define cómo se guarda cada uno.',
    pista: 'Piensa en lo que MySQL necesita saber para crear una columna y que el modelo lógico todavía no dice.',
  },
  {
    id: 'mf-cambio-gestor',
    tipo: 'opcion-unica',
    enunciado: 'Si decides usar otro gestor de bases de datos en lugar de MySQL, ¿qué modelo habría que adaptar?',
    opciones: [
      { id: 'logico', texto: 'Solo el modelo lógico' },
      { id: 'fisico', texto: 'Solo el modelo físico' },
      { id: 'ambos', texto: 'Los dos por igual' },
      { id: 'ninguno', texto: 'Ninguno de los dos' },
    ],
    correcta: 'fisico',
    explicacionesOpciones: {
      logico: 'No: el modelo lógico describe los datos y sus relaciones sin depender del gestor.',
      fisico: 'Correcto: el modelo físico depende del sistema concreto, así que es el que se adapta.',
      ambos: 'No: el lógico no depende del gestor. Solo el físico se ajusta a cada sistema.',
      ninguno: 'No: cada gestor tiene tipos y reglas propias, y el modelo físico debe respetarlas.',
    },
    explicacion: 'El modelo lógico es independiente del sistema. El modelo físico se escribe para un gestor concreto.',
    pista: 'Pregúntate cuál de los dos modelos conoce los nombres exactos de los tipos de dato.',
  },
];

export const LECCION_MODELO_FISICO_INTRO: Leccion = {
  id: 'm1-t4-1-que-es-modelo-fisico',
  titulo: '¿Qué es el modelo físico?',
  objetivo: 'Entender qué es el modelo físico, para qué sirve y en qué se diferencia del modelo lógico.',
  aprende: BLOQUES_APRENDE,
  observa: PASOS_OBSERVA,
  practica: PRACTICA,
};
