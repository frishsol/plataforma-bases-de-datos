import { ArrowLeftRight, BookOpen, Database, History, KeyRound, Table2, Target } from 'lucide-react';
import type { BloqueAprende, Leccion, PasoObservacion } from '@/tipos/leccion';
import type { Pregunta } from '@/tipos/juego';
import { TABLA_MASCOTA, TABLA_MASCOTA_FISICA } from '@/datos/lecciones/tablasRelacionales';

const APRENDE: BloqueAprende[] = [
  {
    tipo: 'tarjetas-intro',
    titulo: '¿Qué es el modelo relacional?',
    tarjetas: [
      {
        icono: BookOpen,
        titulo: 'La idea fundamental',
        texto: 'Organiza la información mediante relaciones: conjuntos de tuplas descritas por atributos y sus dominios.',
      },
      {
        icono: History,
        titulo: 'Edgar F. Codd, 1970',
        texto: 'Codd propuso el modelo relacional en su artículo A Relational Model of Data for Large Shared Data Banks. Su trabajo impulsó una forma de describir los datos independiente de su almacenamiento físico.',
      },
      {
        icono: Table2,
        titulo: 'Relación y tabla',
        texto: 'Una tabla es la representación habitual de una relación. No son equivalentes exactos: SQL admite comportamientos como duplicados y valores NULL que requieren matices frente al modelo formal.',
      },
      {
        icono: KeyRound,
        titulo: 'Identificación y vínculos',
        texto: 'Las claves permiten identificar tuplas y establecer referencias entre relaciones, preservando reglas de integridad.',
      },
    ],
  },
  {
    tipo: 'destacado',
    titulo: 'Antes de comenzar: dos usos de la palabra cardinalidad',
    texto:
      'En una relación del modelo relacional, cardinalidad significa cantidad de tuplas. En el diagrama E-R, 1:1, 1:N y N:M describen cuántas ocurrencias participan en una asociación. No son la misma idea.',
  },
  {
    tipo: 'senales',
    titulo: 'Vocabulario del modelo relacional',
    senales: [
      { senal: 'Relación', indica: 'Conjunto de tuplas que obedecen un esquema', ejemplo: 'Mascota' },
      { senal: 'Tupla', indica: 'Combinación de valores, uno por atributo', ejemplo: '(1, 10, Luna, Gato, ...)' },
      { senal: 'Atributo', indica: 'Propiedad identificada por un nombre', ejemplo: 'especie' },
      { senal: 'Dominio', indica: 'Conjunto de valores permitidos', ejemplo: 'especie: {Perro, Gato}' },
      {
        senal: 'Esquema',
        indica: 'Definición de relación y atributos (con sus dominios)',
        ejemplo: 'Mascota(id_mascota, id_cliente, nombre, especie, fecha_nacimiento, peso)',
      },
      { senal: 'Instancia', indica: 'Tuplas presentes en un instante concreto', ejemplo: 'Las tres mascotas registradas hoy' },
      { senal: 'Grado', indica: 'Cantidad de atributos', ejemplo: 'Mascota tiene seis atributos' },
      { senal: 'Cardinalidad', indica: 'Cantidad de tuplas', ejemplo: 'Tres mascotas: cardinalidad 3' },
    ],
  },
  {
    tipo: 'destacado',
    titulo: 'Relación formal frente a tabla SQL',
    texto:
      'En el modelo formal, una relación es un conjunto: sus tuplas no se repiten y su orden no tiene significado. Una tabla SQL puede contener filas idénticas si no define una clave, y solo ORDER BY establece el orden de un resultado.',
  },
  {
    tipo: 'tarjetas-intro',
    titulo: 'NULL: el valor que más confunde',
    tarjetas: [
      {
        icono: Target,
        titulo: 'Qué significa',
        texto: 'Indica que un dato no está disponible o es desconocido. No es el número 0 ni una cadena vacía, y no pertenece al dominio del atributo.',
      },
      {
        icono: History,
        titulo: 'De dónde viene',
        texto: 'La formulación original de Codd (1970) no contemplaba valores ausentes. Las propuestas posteriores los incorporaron, y SQL los implementa como NULL.',
      },
      {
        icono: ArrowLeftRight,
        titulo: 'Cómo se trabaja',
        texto: 'Comparar con el signo = no sirve: NULL = NULL no es verdadero. Para detectar un valor ausente se usa IS NULL.',
      },
    ],
  },
  {
    tipo: 'comparativa-tablas',
    titulo: 'Modelo lógico y modelo físico: no son lo mismo',
    texto:
      'El esquema lógico expresa relaciones, atributos y claves; el físico concreta tipos, precisión y restricciones para un SGBD como MySQL.',
    logica: TABLA_MASCOTA,
    fisica: TABLA_MASCOTA_FISICA,
    diferencias: [
      'El modelo conceptual expresa entidades, atributos y asociaciones sin decidir una implementación particular.',
      'El modelo lógico relacional organiza relaciones, atributos, claves y referencias sin exigir tipos específicos de MySQL.',
      'El modelo físico especifica tipos de datos, tamaños, índices y demás detalles de implementación.',
    ],
  },
];

const MASCOTA_CON_NULL = {
  ...TABLA_MASCOTA,
  filas: [...TABLA_MASCOTA.filas.slice(0, 2), ['3', '11', 'Nube', 'Gato', '2023-01-20', 'NULL']],
};


const OBSERVA: PasoObservacion[] = [
  {
    titulo: 'Paso 1: una entidad se convierte en una tabla',
    explicacion:
      'La entidad Mascota del modelo E-R pasa a ser una relación, que en la práctica es una tabla. Cada mascota registrada ocupa una fila, llamada tupla.',
    visual: {
      tipo: 'tabla-interactiva',
      tabla: TABLA_MASCOTA,
    },
  },
  {
    titulo: 'Paso 2: atributos y dominios',
    explicacion:
      'Cada columna es un atributo. El dominio es el conjunto de valores permitidos: en Hotel Patitas, especie solo puede ser Perro o Gato.',
    visual: {
      tipo: 'resultado',
      grupos: [
        {
          tipo: 'atributo',
          etiqueta: 'Dominios',
          elementos: [
            'especie: dominio {Perro, Gato}',
            'peso: número decimal',
            'fecha_nacimiento: fecha válida',
          ],
        },
        {
          tipo: 'entidad',
          etiqueta: 'Grado de la relación',
          elementos: [
            'Mascota tiene seis atributos: su grado es 6',
          ],
        },
        {
          tipo: 'relacion',
          etiqueta: 'Esquema relacional',
          elementos: [
            'Esquema: Mascota(id_mascota, id_cliente, nombre, especie, fecha_nacimiento, peso)',
          ],
        },
      ],
    },
  },
  {
    titulo: 'Paso 3: esquema e instancia',
    explicacion:
      'El esquema es la definición de la relación y permanece igual mientras no se modifique su estructura. La instancia contiene las tuplas presentes en un momento determinado. En este ejemplo hay tres mascotas registradas, por lo que la cardinalidad es 3.',
    visual: {
      tipo: 'resultado',
      grupos: [
        {
          tipo: 'entidad',
          etiqueta: 'Esquema',
          elementos: [
            'Define los atributos y sus dominios.',
            'Permanece igual mientras no se modifique la estructura.',
          ],
        },
        {
          tipo: 'atributo',
          etiqueta: 'Instancia',
          elementos: [
            'Contiene 3 tuplas en este ejemplo.',
            'Cambia cuando se registran o eliminan mascotas.',
          ],
        },
        {
          tipo: 'relacion',
          etiqueta: 'Grado y cardinalidad',
          elementos: [
            'Grado: 6 atributos.',
            'Cardinalidad: 3 tuplas.',
          ],
        },
      ],
    },
  },
  {
    titulo: 'Paso 4: NULL es una marca, no un valor',
    explicacion:
      'Ejemplo ilustrativo: si el peso de Nube todavía no se ha capturado, SQL muestra NULL. No equivale a 0 ni a una cadena vacía, por eso las consultas lo tratan de forma distinta.',
    visual: {
      tipo: 'tablas',
      tablas: [MASCOTA_CON_NULL],
    },
  },
  {
    titulo: 'Paso 5: formal frente a SQL',
    explicacion:
      'En el modelo relacional formal, las tuplas no se repiten porque una relación es un conjunto. En SQL, una tabla puede contener filas duplicadas si no existen restricciones que lo impidan. Una clave primaria garantiza la identificación única de sus filas.',
    visual: {
      tipo: 'resultado',
      grupos: [
        {
          tipo: 'entidad',
          etiqueta: 'Modelo formal',
          elementos: [
            'Una relación es un conjunto de tuplas.',
            'No admite tuplas repetidas.',
          ],
        },
        {
          tipo: 'atributo',
          etiqueta: 'Tabla SQL',
          elementos: [
            'Una tabla puede contener filas idénticas si no existen restricciones que lo impidan.',
            'La clave primaria impide duplicados en las columnas que la conforman.',
          ],
        },
        {
          tipo: 'relacion',
          etiqueta: 'En común',
          elementos: [
            'Los datos se organizan mediante atributos y registros.',
            'Las tablas SQL permiten implementar estructuras inspiradas en el modelo relacional.',
          ],
        },
      ],
    },
  },
];


const PRACTICA: Pregunta[] = [
  {
    id: 'mr-grado',
    tipo: 'opcion-unica',
    enunciado: 'Si Mascota tiene seis atributos, ¿cuál es su grado?',
    opciones: [
      { id: '4', texto: '4' },
      { id: '6', texto: '6' },
      { id: 'n', texto: 'Depende de cuántas mascotas existan' },
    ],
    correcta: '6',
    explicacionesOpciones: {
      '4': 'Ese valor no cuenta todos los atributos.',
      '6': 'Correcto: grado es el número de atributos.',
      n: 'El número de tuplas determina la cardinalidad, no el grado.',
    },
    explicacion: 'Grado y cardinalidad son propiedades distintas de una relación.',
    pista: 'Cuenta las columnas, no las filas.',
  },
  {
    id: 'mr-tupla',
    tipo: 'opcion-unica',
    enunciado: '¿Qué representa una tupla en Mascota?',
    opciones: [
      { id: 'fila', texto: 'Una combinación de valores para todos los atributos de una mascota' },
      { id: 'columna', texto: 'Una columna como especie' },
      { id: 'dominio', texto: 'El conjunto de valores permitidos para especie' },
    ],
    correcta: 'fila',
    explicacionesOpciones: {
      fila: 'Correcto: la tupla contiene un valor por atributo.',
      columna: 'Una columna representa un atributo.',
      dominio: 'Un dominio especifica valores permitidos.',
    },
    explicacion: 'La representación habitual de una tupla es una fila.',
    pista: 'Piensa en el registro completo de Luna.',
  },
  {
    id: 'mr-cardinalidad',
    tipo: 'opcion-unica',
    enunciado: 'Si la relación Mascota contiene tres tuplas, su cardinalidad es...',
    opciones: [
      { id: 'tres', texto: '3' },
      { id: 'seis', texto: '6' },
      { id: 'uno-a-n', texto: '1:N' },
    ],
    correcta: 'tres',
    explicacionesOpciones: {
      tres: 'Correcto: la cardinalidad formal cuenta tuplas.',
      seis: 'Seis corresponde al grado, no a la cantidad de tuplas.',
      'uno-a-n': '1:N expresa una cardinalidad de asociación E-R.',
    },
    explicacion: 'La cardinalidad de una relación cuenta sus tuplas.',
    pista: 'En este contexto se cuentan filas.',
  },
  {
    id: 'mr-dominio',
    tipo: 'opcion-unica',
    enunciado: 'En Hotel Patitas, ¿cuál de estos valores está fuera del dominio de especie?',
    opciones: [
      { id: 'gato', texto: 'Gato' },
      { id: 'perro', texto: 'Perro' },
      { id: 'conejo', texto: 'Conejo' },
    ],
    correcta: 'conejo',
    explicacionesOpciones: {
      gato: 'Gato sí pertenece al dominio: el hotel hospeda gatos.',
      perro: 'Perro sí pertenece al dominio: el hotel hospeda perros.',
      conejo: 'Correcto: el hotel solo hospeda perros y gatos, así que el dominio no incluye conejos.',
    },
    explicacion: 'El dominio de un atributo es el conjunto de valores que puede tomar.',
    pista: 'Revisa a qué tipo de animales ofrece hospedaje el hotel.',
  },
  {
    id: 'mr-clasifica-formal',
    tipo: 'clasificacion',
    enunciado: 'Clasifica cada afirmación según corresponda al modelo formal, a SQL o a ambos.',
    categorias: [
      { id: 'formal', texto: 'Modelo formal' },
      { id: 'sql', texto: 'SQL' },
      { id: 'ambos', texto: 'Ambos' },
    ],
    elementos: [
      {
        id: 'tuplas-unicas',
        texto: 'Las tuplas de una relación no se repiten',
        correcta: 'formal',
        explicacion: 'En el modelo formal una relación es un conjunto: no admite tuplas repetidas.',
      },
      {
        id: 'filas-repetidas',
        texto: 'Una tabla puede contener filas idénticas si no tiene clave',
        correcta: 'sql',
        explicacion: 'SQL permite duplicados. Una clave primaria evita que se repitan las filas.',
      },
      {
        id: 'dominio',
        texto: 'Cada atributo tiene un dominio de valores permitidos',
        correcta: 'ambos',
        explicacion: 'El dominio existe en ambos: en SQL se expresa con tipos de dato y restricciones.',
      },
      {
        id: 'null',
        texto: 'NULL representa un dato ausente o desconocido',
        correcta: 'sql',
        explicacion: 'NULL es una característica de SQL. La formulación original de Codd no lo contemplaba.',
      },
    ],
    explicacion: 'Las tuplas son conjuntos en el modelo formal; los duplicados y NULL son propios de SQL.',
    pista: 'Pregúntate si la afirmación habla de conjuntos, de filas o de ambos.',
  },
  {
    id: 'mr-null-sql',
    tipo: 'seleccion-multiple',
    enunciado: 'Selecciona las afirmaciones correctas sobre NULL en SQL.',
    opciones: [
      { id: 'desconocido', texto: 'Indica que un dato no está disponible o es desconocido' },
      { id: 'cero', texto: 'Es equivalente al número 0' },
      { id: 'is-null', texto: 'Para detectarlo se usa la condición IS NULL' },
      { id: 'igual', texto: 'NULL = NULL da como resultado verdadero' },
    ],
    correctas: ['desconocido', 'is-null'],
    explicacionesOpciones: {
      desconocido: 'Correcto: NULL representa ausencia de dato o un valor desconocido.',
      cero: 'No: 0 es un valor real; NULL significa que falta el dato.',
      'is-null': 'Correcto: IS NULL es la forma de comprobar si un valor falta.',
      igual: 'No: con = la comparación con NULL da desconocido, no verdadero.',
    },
    explicacion: 'NULL no es un valor como los demás: representa ausencia de dato.',
    pista: 'Piensa en un dato de una mascota que todavía no se ha registrado.',
  },
];

export const LECCION_RELACIONAL_FUNDAMENTOS: Leccion = {
  id: 'm1-t3-1-fundamentos-relacionales',
  titulo: 'Fundamentos del modelo relacional',
  objetivo:
    'Distingue relación, tupla, atributo, dominio, esquema e instancia, y diferencia el modelo formal de las tablas SQL, incluido el manejo de NULL.',
  aprende: APRENDE,
  observa: OBSERVA,
  practica: PRACTICA,
};
