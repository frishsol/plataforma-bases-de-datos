import { Eye, CircleHelp, Target, User } from 'lucide-react';
import type { BloqueAprende } from '@/tipos/leccion';
import type { Pregunta } from '@/tipos/juego';

export const BLOQUES_INTRODUCCION_ER: BloqueAprende[] = [
  {
    tipo: 'tarjetas-intro',
    titulo: 'Antes de empezar: el modelo entidad-relación',
    tarjetas: [
      {
        icono: CircleHelp,
        titulo: '¿Qué es el modelo entidad-relación?',
        texto:
          'Una forma de describir qué información guarda una base de datos y cómo se conecta. Su dibujo, el diagrama E-R, se crea antes de las tablas.',
      },
      {
        icono: Target,
        titulo: '¿Para qué sirve?',
        texto:
          'Para responder qué cosas existen, qué datos tiene cada una y cómo se relacionan, y acordar el diseño antes de programar.',
      },
      {
        icono: User,
        titulo: '¿Quién fue Peter Chen?',
        texto:
          'Peter Pin-Shan Chen propuso el modelo entidad-relación en el artículo "The Entity-Relationship Model: Toward a Unified View of Data".',
        etiqueta: '1976',
      },
      {
        icono: Eye,
        titulo: '¿Qué es la notación de Chen?',
        texto:
          'Es el conjunto de símbolos con los que se dibuja el modelo: rectángulos, rombos, óvalos y líneas, cada uno con una forma distinta. En este módulo la usamos en todas las lecciones porque es muy visual.',
      },
    ],
  },
  {
    tipo: 'destacado',
    titulo: 'Tres conceptos del modelo',
    texto:
      'El modelo entidad-relación se basa en entidades, atributos y relaciones. Para dibujarlos con la notación de Chen usamos cuatro elementos gráficos.',
  },
  {
    tipo: 'elementos-graficos',
    titulo: 'Los cuatro elementos gráficos básicos del diagrama E-R',
    elementos: [
      {
        nombre: 'Entidad',
        figura: 'entidad-fuerte',
        definicion: 'Algo de lo que queremos guardar datos propios y que se distingue de otras cosas.',
        ejemplo: 'Mascota, Cliente, Estancia.',
        tono: 'entidad',
      },
      {
        nombre: 'Atributo',
        figura: 'atributo-simple',
        definicion: 'Una característica que describe a una entidad.',
        ejemplo: 'nombre de una Mascota.',
        tono: 'atributo',
      },
      {
        nombre: 'Relación',
        figura: 'relacion',
        definicion: 'Una asociación entre entidades, normalmente expresada con un verbo.',
        ejemplo: 'Un Cliente tiene Mascotas.',
        tono: 'relacion',
      },
      {
        nombre: 'Línea',
        figura: 'linea-conexion',
        definicion:
          'La línea conecta los elementos del diagrama E-R. Sirve para unir entidades con relaciones y atributos con el elemento al que pertenecen.',
        ejemplo: 'La entidad Cliente se conecta con la relación "tiene".',
        tono: 'linea',
      },
    ],
  },
  {
    tipo: 'destacado',
    titulo: 'Sobre las líneas',
    texto:
      'Las líneas son recursos gráficos, no un cuarto concepto del modelo. Solo conectan entidades, atributos y relaciones.',
  },
  {
    tipo: 'senales',
    titulo: 'Señales en el texto',
    senales: [
      { senal: 'Sustantivo con datos propios', indica: 'Entidad', ejemplo: '"cliente", "estancia"' },
      { senal: 'Dato que describe a algo', indica: 'Atributo', ejemplo: '"peso de la mascota"' },
      { senal: 'Verbo que une dos entidades', indica: 'Relación', ejemplo: '"pertenece a", "tiene"' },
      {
        senal: 'Palabras de cantidad: "cada", "varias", "un solo"',
        indica: 'Pista para la cardinalidad (más adelante en este tema)',
        ejemplo: '"una mascota puede tener varias estancias"',
      },
    ],
  },
  {
    tipo: 'destacado',
    titulo: 'Regla clave',
    texto:
      'Antes de dibujar, pregúntate: ¿esto tiene datos propios que queremos guardar por separado? Si es así, es una entidad. Si solo describe a otra cosa, es un atributo.',
  },
  {
    tipo: 'comparativa-notaciones',
    titulo: 'Otras notaciones: otra forma de dibujar lo mismo',
    texto:
      'La notación de Chen no es la única. Abajo se ve la misma relación "Cliente tiene Mascota" en Chen y en pata de gallo (Crow\'s Foot). Los conceptos son idénticos; cambia solo el dibujo.',
    otras: [
      {
        nombre: "Crow's Foot (pata de gallo)",
        descripcion: 'Muy usada en herramientas profesionales. No dibuja rombos: la cardinalidad aparece al final de la línea.',
      },
      {
        nombre: 'UML',
        descripcion: 'Usada en diagramas de clases. Las entidades son cajas con secciones y la cardinalidad se escribe como 1 o *.',
      },
      {
        nombre: 'Barker',
        descripcion: 'Parecida a la pata de gallo, pero escribe el nombre de la relación sobre la línea.',
      },
    ],
  },
];

export const PRACTICA_INTRODUCCION_ER: Pregunta[] = [
  {
    id: 'l1-relacion',
    tipo: 'opcion-unica',
    enunciado: 'En la frase "Cada mascota pertenece a un cliente", ¿qué es "pertenece a"?',
    opciones: [
      { id: 'entidad', texto: 'Entidad' },
      { id: 'atributo', texto: 'Atributo' },
      { id: 'relacion', texto: 'Relación' },
      { id: 'cardinalidad', texto: 'Cardinalidad' },
    ],
    correcta: 'relacion',
    explicacionesOpciones: {
      entidad: 'No: una entidad tiene datos propios. "Pertenece a" solo conecta dos cosas.',
      atributo: 'No: un atributo describe a una entidad. "Pertenece a" no describe nada, conecta.',
      relacion: 'Correcto: es un verbo que asocia la mascota con el cliente.',
      cardinalidad: 'No: la cardinalidad indica cuántos elementos participan. Aquí solo se nombra la conexión.',
    },
    explicacion: 'Los verbos que unen dos entidades representan relaciones.',
    pista: 'Busca el verbo de la frase: es lo que une a la mascota con el cliente.',
  },
  {
    id: 'l1-entidades',
    tipo: 'seleccion-multiple',
    enunciado:
      'Lee el texto: "Cada paciente tiene un nombre, una especie y un peso. Cada consulta registra una fecha y un diagnóstico, y se realiza a un solo paciente." Selecciona los candidatos a entidad.',
    opciones: [
      { id: 'paciente', texto: 'paciente' },
      { id: 'nombre', texto: 'nombre' },
      { id: 'especie', texto: 'especie' },
      { id: 'peso', texto: 'peso' },
      { id: 'consulta', texto: 'consulta' },
      { id: 'fecha', texto: 'fecha' },
      { id: 'diagnostico', texto: 'diagnóstico' },
    ],
    correctas: ['paciente', 'consulta'],
    explicacionesOpciones: {
      paciente: 'Correcto: se describe con datos propios y se guarda como registro independiente.',
      nombre: 'No: es un dato que describe al paciente, así que es un atributo.',
      especie: 'No: es un atributo del paciente.',
      peso: 'No: es un atributo del paciente.',
      consulta: 'Correcto: cada consulta es un hecho con datos propios (fecha, diagnóstico).',
      fecha: 'No: es un atributo de la consulta.',
      diagnostico: 'No: es un atributo de la consulta.',
    },
    explicacion: 'Las entidades son los sustantivos con datos propios. Los datos que las describen son atributos.',
    pista: 'Pregúntate, para cada palabra, si describe algo o si es ella misma algo de lo que guardamos datos.',
  },
  {
    id: 'l1-clasificacion',
    tipo: 'clasificacion',
    enunciado: 'Clasifica cada elemento de la frase "Cada consulta registra una fecha y se realiza a un paciente".',
    categorias: [
      { id: 'entidad', texto: 'Entidad' },
      { id: 'atributo', texto: 'Atributo' },
      { id: 'relacion', texto: 'Relación' },
    ],
    elementos: [
      {
        id: 'consulta',
        texto: 'Consulta',
        correcta: 'entidad',
        explicacion: 'Es un hecho con datos propios que el sistema guarda por separado.',
      },
      {
        id: 'fecha',
        texto: 'Fecha',
        correcta: 'atributo',
        explicacion: 'Describe a la consulta: es un atributo.',
      },
      {
        id: 'se-realiza-a',
        texto: 'se realiza a',
        correcta: 'relacion',
        explicacion: 'Es un verbo que une consulta con paciente: es una relación.',
      },
      {
        id: 'paciente',
        texto: 'Paciente',
        correcta: 'entidad',
        explicacion: 'Tiene datos propios y se guarda por separado: es una entidad.',
      },
    ],
    explicacion:
      'Los datos con vida propia son entidades, lo que las describe son atributos y lo que las une son relaciones.',
    pista: 'Los verbos suelen ser relaciones. Los datos que describen a algo suelen ser atributos.',
  },
];
