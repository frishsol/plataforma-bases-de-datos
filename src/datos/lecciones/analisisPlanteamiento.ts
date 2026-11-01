import { Database, FileText, Search, ShieldCheck } from 'lucide-react';
import type { BloqueAprende, Leccion, PasoObservacion, SegmentoPlanteamiento } from '@/tipos/leccion';

const PLANTEAMIENTO_BIBLIOTECA: SegmentoPlanteamiento[] = [
  { texto: 'La biblioteca de la colonia presta libros a sus socios. ' },
  { texto: 'Cada socio se registra con su nombre y su número de credencial', categoria: 'necesidad' },
  { texto: ', y ' },
  { texto: 'solo puede tener hasta tres libros prestados a la vez', categoria: 'regla' },
  { texto: '. ' },
  { texto: 'Cada préstamo guarda la fecha en que se entregó el libro y la fecha de devolución', categoria: 'necesidad' },
  { texto: '. ' },
  {
    texto: 'Si un libro se devuelve con retraso, el socio no puede pedir otro hasta pagar la multa',
    categoria: 'regla',
  },
  { texto: '. ' },
  { texto: 'La bibliotecaria quiere pintar las paredes del local de un color más alegre', categoria: 'irrelevante' },
  { texto: '.' },
];

const PASOS_ANALISIS: PasoObservacion[] = [
  {
    titulo: 'Paso 1: las necesidades de información',
    explicacion:
      'Son los datos que el sistema debe guardar o mostrar. Aquí el texto dice qué se registra de cada socio y de cada préstamo: nombre, número de credencial y fechas. Sin ellos no podríamos llevar el control de la biblioteca.',
    visual: { tipo: 'planteamiento', segmentos: PLANTEAMIENTO_BIBLIOTECA, resalta: 'necesidad' },
  },
  {
    titulo: 'Paso 2: las reglas de negocio',
    explicacion:
      'Son condiciones que la biblioteca impone sobre sus datos y sus acciones. Aquí hay un límite (hasta tres libros a la vez) y una consecuencia (no pedir otro libro hasta pagar la multa). Estas reglas no se guardan como datos, pero determinan qué información debe poder registrarse.',
    visual: { tipo: 'planteamiento', segmentos: PLANTEAMIENTO_BIBLIOTECA, resalta: 'regla' },
  },
  {
    titulo: 'Paso 3: lo que no afecta al diseño',
    explicacion:
      'El color de las paredes no cambia qué datos se guardan ni cómo se usan. Dejarlo fuera evita diseñar información que nadie necesita. Si una frase no altera los datos ni sus reglas, no entra en el análisis.',
    visual: { tipo: 'planteamiento', segmentos: PLANTEAMIENTO_BIBLIOTECA, resalta: 'irrelevante' },
  },
];

const BLOQUES_APRENDE: BloqueAprende[] = [
  {
    tipo: 'tarjetas-intro',
    titulo: 'Antes de diseñar: entender el problema',
    tarjetas: [
      {
        icono: FileText,
        titulo: '¿Qué es un planteamiento?',
        texto:
          'El texto que describe lo que necesita una organización: quién participa, qué información maneja y qué condiciones debe cumplir.',
      },
      {
        icono: Search,
        titulo: '¿Por qué analizarlo primero?',
        texto:
          'Si se diseña sin leer con calma, se olvidan datos o se inventan reglas. Corregir una base de datos ya construida cuesta mucho más que leer el texto dos veces.',
      },
      {
        icono: Database,
        titulo: 'Necesidades de información',
        texto:
          'Son los datos que el sistema debe guardar o mostrar para que la organización funcione. Se reconocen porque el texto dice qué se registra o qué se necesita consultar.',
      },
      {
        icono: ShieldCheck,
        titulo: 'Reglas de negocio',
        texto:
          'Son las condiciones que la organización impone sobre sus datos y sus acciones, como límites, plazos o prohibiciones.',
      },
    ],
  },
  {
    tipo: 'destacado',
    titulo: 'Cómo leer un planteamiento',
    texto:
      'Lee el texto completo antes de clasificar nada. Después, pregúntate por cada frase: ¿dice qué datos hay que guardar?, ¿impone una condición?, ¿o no cambia nada del diseño?',
  },
  {
    tipo: 'senales',
    titulo: 'Pistas para distinguir cada parte',
    senales: [
      {
        senal: 'Dice qué se registra o se consulta',
        indica: 'Necesidad de información',
        ejemplo: '"cada socio se registra con su nombre"',
      },
      {
        senal: 'Usa límites, plazos o prohibiciones: "solo", "hasta", "no puede", "como máximo"',
        indica: 'Regla de negocio',
        ejemplo: '"hasta tres libros prestados a la vez"',
      },
      {
        senal: 'Habla de detalles que no cambian los datos ni sus reglas',
        indica: 'No relevante para el diseño',
        ejemplo: '"el color de las paredes"',
      },
    ],
  },
  {
    tipo: 'destacado',
    titulo: 'Por qué las reglas también importan',
    texto:
      'Una regla de negocio no aparece como una tabla, pero determina qué datos necesitamos y cómo se relacionan. Por eso no se descarta al analizar el planteamiento.',
  },
];

export const LECCION_ANALISIS_PLANTEAMIENTO: Leccion = {
  id: 'm1-l1-analisis-planteamiento',
  titulo: 'Análisis de un planteamiento',
  objetivo:
    'Aprende a interpretar las necesidades de información y las reglas de negocio antes de comenzar el diseño de una base de datos.',
  aprende: BLOQUES_APRENDE,
  observa: PASOS_ANALISIS,
  practica: [
    {
      id: 'l1-primer-paso',
      tipo: 'opcion-unica',
      enunciado: 'Al recibir un planteamiento nuevo, ¿qué conviene hacer primero?',
      opciones: [
        { id: 'tablas', texto: 'Crear de inmediato las tablas con claves foráneas' },
        { id: 'identificar', texto: 'Leer el planteamiento completo e identificar la información y las reglas' },
        { id: 'sql', texto: 'Escribir las consultas SQL que usará la aplicación' },
        { id: 'dibujar', texto: 'Dibujar el diagrama con todos los datos, sin leer el texto completo' },
      ],
      correcta: 'identificar',
      explicacionesOpciones: {
        tablas: 'Todavía no: antes hay que entender qué datos existen y qué reglas los limitan.',
        identificar: 'Correcto: el análisis del texto es el paso previo a cualquier modelo.',
        sql: 'Todavía no: las consultas dependen de un modelo ya diseñado.',
        dibujar: 'No: dibujar sin leer el texto completo suele omitir datos o reglas importantes.',
      },
      explicacion: 'Leer el planteamiento completo y separar sus partes es el primer paso de cualquier diseño.',
      pista: 'Piensa en lo que hay que entender antes de modelar.',
    },
    {
      id: 'l1-clasificacion-gimnasio',
      tipo: 'clasificacion',
      enunciado:
        'Lee este planteamiento de un gimnasio: "Cada miembro del gimnasio se inscribe con su DNI y su correo. Cada clase tiene un horario y un instructor. Ninguna clase puede tener más de 12 personas. Un miembro no puede inscribirse en más de dos clases a la vez. El gerente quiere cambiar el logo de la app en primavera." Clasifica cada frase.',
      categorias: [
        { id: 'necesidad', texto: 'Necesidad de información' },
        { id: 'regla', texto: 'Regla de negocio' },
        { id: 'irrelevante', texto: 'No relevante para el diseño' },
      ],
      elementos: [
        {
          id: 'miembro-datos',
          texto: 'Cada miembro se inscribe con su DNI y su correo',
          correcta: 'necesidad',
          explicacion: 'Son datos que el gimnasio debe guardar de cada miembro.',
        },
        {
          id: 'clase-datos',
          texto: 'Cada clase tiene un horario y un instructor',
          correcta: 'necesidad',
          explicacion: 'Son datos propios de cada clase que el sistema debe registrar.',
        },
        {
          id: 'cupo',
          texto: 'Ninguna clase puede tener más de 12 personas',
          correcta: 'regla',
          explicacion: 'Es un límite que el sistema debe respetar al inscribir a alguien.',
        },
        {
          id: 'limite-inscripcion',
          texto: 'No puede inscribirse en más de dos clases a la vez',
          correcta: 'regla',
          explicacion: 'Es una condición que el gimnasio impone sobre las inscripciones.',
        },
        {
          id: 'logo',
          texto: 'El gerente quiere cambiar el logo de la app en primavera',
          correcta: 'irrelevante',
          explicacion: 'No cambia qué datos se guardan ni sus reglas, así que no entra en el diseño.',
        },
      ],
      explicacion:
        'Lo que describe datos que hay que guardar es una necesidad de información. Lo que limita lo que se puede hacer es una regla de negocio.',
      pista: 'Pregúntate si la frase dice qué datos guardar, qué límite se impone o si no afecta a los datos.',
    },
    {
      id: 'l1-regla-gimnasio',
      tipo: 'opcion-unica',
      enunciado: 'Según el mismo planteamiento del gimnasio, ¿cuál de estas frases es una regla de negocio?',
      opciones: [
        { id: 'datos-miembro', texto: 'Cada miembro se inscribe con su DNI y su correo' },
        { id: 'horario', texto: 'Cada clase tiene un horario y un instructor' },
        { id: 'limite', texto: 'No puede inscribirse en más de dos clases a la vez' },
        { id: 'logo', texto: 'El gerente quiere cambiar el logo de la app en primavera' },
      ],
      correcta: 'limite',
      explicacionesOpciones: {
        'datos-miembro': 'No: es un dato que el gimnasio debe guardar, no una condición.',
        horario: 'No: son datos que se registran de cada clase.',
        limite: 'Correcto: es un límite que el negocio impone sobre las inscripciones.',
        logo: 'No: no afecta a los datos ni a sus reglas.',
      },
      explicacion: 'Las reglas de negocio son condiciones, límites o prohibiciones que la organización impone.',
      pista: 'Busca la frase que pone un límite o una prohibición.',
    },
  ],
};
