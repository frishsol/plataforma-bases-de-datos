import { KeyRound, Link2, ShieldCheck } from 'lucide-react';
import type { BloqueAprende, Leccion, PasoObservacion } from '@/tipos/leccion';
import type { Pregunta } from '@/tipos/juego';
import {
  TABLA_CLIENTE,
  TABLA_EMPLEADO_COMPLEMENTARIO,
  TABLA_ESTANCIA,
  TABLA_ESTANCIA_SERVICIO,
  TABLA_MASCOTA,
  TABLA_SERVICIO,
} from '@/datos/lecciones/tablasRelacionales';

const APRENDE: BloqueAprende[] = [
  {
    tipo: 'tarjetas-intro',
    titulo: 'Claves que necesitas reconocer',
    tarjetas: [
      {
        icono: KeyRound,
        titulo: 'Superclave y candidata',
        texto: 'Una superclave identifica tuplas de manera única; una clave candidata es una superclave mínima, sin atributos sobrantes.',
      },
      {
        icono: KeyRound,
        titulo: 'Primaria y alternativa',
        texto: 'La clave primaria es la candidata elegida para identificar cada tupla. Las demás candidatas son alternativas.',
      },
      {
        icono: KeyRound,
        titulo: 'Foránea',
        texto: 'Un atributo o conjunto de atributos que referencia una clave válida de otra relación. Sus valores no tienen por qué ser únicos.',
      },
      {
        icono: KeyRound,
        titulo: 'Compuesta',
        texto: 'Una clave formada por más de un atributo. Por ejemplo, (id_estancia, id_servicio) cuando un servicio se registra como máximo una vez por estancia.',
      },
    ],
  },
  {
    tipo: 'tarjetas-intro',
    titulo: 'Dos reglas de integridad',
    tarjetas: [
      {
        icono: ShieldCheck,
        titulo: 'Integridad de entidad',
        texto: 'La clave primaria identifica cada tupla: no puede contener NULL y no puede repetirse. Ejemplo: id_mascota en Mascota.',
        etiqueta: 'Regla 1',
      },
      {
        icono: Link2,
        titulo: 'Integridad referencial',
        texto: 'Todo valor de una clave foránea debe existir en la clave a la que apunta. Si la clave foránea es opcional, puede valer NULL cuando no hay referencia.',
        etiqueta: 'Regla 2',
      },
    ],
  },
  {
    tipo: 'destacado',
    titulo: 'Clave foránea obligatoria u opcional',
    texto:
      'En Hotel Patitas, id_cliente en Mascota es obligatoria: cada mascota pertenece a un solo cliente, así que nunca puede ser NULL. Una clave foránea opcional aparece en el ejemplo complementario de Empleado, que no forma parte del caso.',
  },
  {
    tipo: 'destacado',
    titulo: 'Una clave foránea dentro de la clave primaria',
    texto:
      'En EstanciaServicio, id_estancia e id_servicio forman la clave primaria. Como parte de esa clave, ninguna de las dos puede ser NULL.',
  },
];

const ESTANCIA_INVALIDA = {
  ...TABLA_ESTANCIA,
  filas: [...TABLA_ESTANCIA.filas, ['103', '9', '2026-10-20', '2026-10-22', 'C2']],
};

const OBSERVA: PasoObservacion[] = [
  {
    titulo: 'Paso 1: la clave primaria identifica cada fila',
    explicacion:
      'En Cliente, id_cliente identifica a cada cliente sin repetirse. En Servicio, id_servicio cumple el mismo papel. Ninguno de los dos puede quedar vacío.',
    visual: { tipo: 'tablas', tablas: [TABLA_CLIENTE, TABLA_SERVICIO] },
  },
  {
    titulo: 'Paso 2: una clave foránea apunta a una clave primaria',
    explicacion:
      'Cada mascota pertenece a un solo cliente. Por eso id_cliente en Mascota es obligatoria y debe coincidir con un id_cliente existente en Cliente.',
    visual: { tipo: 'tablas', tablas: [TABLA_CLIENTE, TABLA_MASCOTA] },
  },
  {
    titulo: 'Paso 3: una referencia inexistente se rechaza',
    explicacion:
      'La estancia 103 apunta a la mascota 9, que no existe. La base de datos rechaza esa fila porque incumple la integridad referencial.',
    visual: { tipo: 'tablas', tablas: [ESTANCIA_INVALIDA] },
  },
  {
    titulo: 'Paso 4: una clave foránea opcional puede ser NULL',
    explicacion:
      'Ejemplo complementario, fuera de Hotel Patitas: Rosa Vega no tiene supervisor, así que id_supervisor vale NULL. Ese NULL es válido porque la clave foránea es opcional.',
    visual: { tipo: 'tablas', tablas: [TABLA_EMPLEADO_COMPLEMENTARIO] },
  },
  {
    titulo: 'Paso 5: una clave foránea dentro de la clave primaria',
    explicacion:
      'En EstanciaServicio, id_estancia e id_servicio forman la clave primaria. Ninguna puede ser NULL, así que cada combinación queda identificada.',
    visual: { tipo: 'tablas', tablas: [TABLA_ESTANCIA_SERVICIO] },
  },
];

const PRACTICA: Pregunta[] = [
  {
    id: 'mc-clave-servicio',
    tipo: 'opcion-unica',
    enunciado: 'Servicio tiene nombre y precio. ¿Qué atributo conviene como clave primaria?',
    opciones: [
      { id: 'nombre', texto: 'nombre' },
      { id: 'id', texto: 'id_servicio' },
      { id: 'precio', texto: 'precio' },
    ],
    correcta: 'id',
    explicacionesOpciones: {
      nombre: 'Dos servicios podrían llamarse igual, o el nombre podría cambiar.',
      id: 'Correcto: un identificador único y estable, sin significado de negocio.',
      precio: 'El precio cambia con el tiempo y varios servicios pueden costar lo mismo.',
    },
    explicacion: 'La clave primaria debe identificar cada tupla sin repetirse.',
    pista: 'Busca el atributo que nunca se repite y que no cambia con el tiempo.',
  },
  {
    id: 'mc-superclaves-mascota',
    tipo: 'seleccion-multiple',
    enunciado: 'Selecciona las superclaves de Mascota, sabiendo que id_mascota identifica cada tupla.',
    opciones: [
      { id: 'id', texto: 'id_mascota' },
      { id: 'id-nombre', texto: '(id_mascota, nombre)' },
      { id: 'nombre', texto: 'nombre' },
      { id: 'nombre-especie', texto: '(nombre, especie)' },
    ],
    correctas: ['id', 'id-nombre'],
    explicacionesOpciones: {
      id: 'Correcto: id_mascota ya identifica cada tupla por sí solo.',
      'id-nombre': 'Correcto: añadir atributos a una superclave sigue siendo una superclave.',
      nombre: 'No: varias mascotas pueden llamarse Luna.',
      'nombre-especie': 'No: dos gatos llamados Luna cumplirían la misma combinación.',
    },
    explicacion: 'Una superclave identifica tuplas; la candidata es la superclave mínima.',
    pista: 'Pregúntate si la combinación identifica cada mascota sin duda.',
  },
  {
    id: 'mc-referencia-inexistente',
    tipo: 'opcion-unica',
    enunciado: 'En Estancia aparece id_mascota = 9, y no existe ninguna mascota con ese identificador. ¿Qué regla se incumple?',
    opciones: [
      { id: 'entidad', texto: 'Integridad de entidad' },
      { id: 'referencial', texto: 'Integridad referencial' },
      { id: 'ninguna', texto: 'Ninguna: la fila es válida' },
    ],
    correcta: 'referencial',
    explicacionesOpciones: {
      entidad: 'La integridad de entidad trata de la clave primaria, no de una referencia a otra tabla.',
      referencial: 'Correcto: la clave foránea debe apuntar a una clave primaria existente.',
      ninguna: 'Una clave foránea obligatoria que apunta a la nada no es válida.',
    },
    explicacion: 'La integridad referencial exige que cada valor de una clave foránea exista en la tabla referenciada.',
    pista: 'La fila hace referencia a algo que no existe en otra tabla.',
  },
  {
    id: 'mc-clasifica-integridad',
    tipo: 'clasificacion',
    enunciado: 'Clasifica cada situación según la regla que aplica.',
    categorias: [
      { id: 'entidad', texto: 'Integridad de entidad' },
      { id: 'referencial', texto: 'Integridad referencial' },
      { id: 'valida', texto: 'Ninguna: el registro es válido' },
    ],
    elementos: [
      {
        id: 'dos-id-2',
        texto: 'Dos mascotas con id_mascota = 2',
        correcta: 'entidad',
        explicacion: 'La clave primaria no puede repetirse: cada mascota necesita su propio identificador.',
      },
      {
        id: 'id-vacio',
        texto: 'Mascota con id_mascota vacío',
        correcta: 'entidad',
        explicacion: 'La clave primaria no puede contener NULL.',
      },
      {
        id: 'mascota-inexistente',
        texto: 'Estancia que apunta a una mascota inexistente',
        correcta: 'referencial',
        explicacion: 'La clave foránea debe coincidir con una clave primaria existente.',
      },
      {
        id: 'sin-supervisor',
        texto: 'Empleado sin supervisor, con id_supervisor en NULL (clave foránea opcional)',
        correcta: 'valida',
        explicacion: 'Como la clave foránea es opcional, el NULL es válido.',
      },
    ],
    explicacion: 'Las dos reglas se aplican de forma distinta: una protege la clave primaria y otra las referencias.',
    pista: 'Pregúntate si el problema está en una clave primaria o en una referencia a otra tabla.',
  },
  {
    id: 'mc-fk-en-clave-primaria',
    tipo: 'opcion-unica',
    enunciado: 'En EstanciaServicio, ¿puede id_servicio ser NULL?',
    opciones: [
      { id: 'si-sin-servicios', texto: 'Sí, si la estancia no tiene servicios' },
      { id: 'no', texto: 'No, forma parte de la clave primaria' },
      { id: 'si-precio-cero', texto: 'Sí, siempre que precio_cobrado sea 0' },
    ],
    correcta: 'no',
    explicacionesOpciones: {
      'si-sin-servicios': 'No: una estancia sin servicios simplemente no tiene filas en EstanciaServicio.',
      no: 'Correcto: una parte de la clave primaria nunca puede ser NULL.',
      'si-precio-cero': 'El precio no tiene relación con la clave primaria.',
    },
    explicacion: 'Una clave primaria compuesta exige que todas sus columnas tengan valor.',
    pista: 'Recuerda la regla de integridad de entidad.',
  },
];

export const LECCION_RELACIONAL_CLAVES: Leccion = {
  id: 'm1-t3-2-claves-integridad',
  titulo: 'Claves e integridad',
  objetivo:
    'Reconoce claves candidatas, primarias y foráneas, y aplica las reglas de integridad de entidad y referencial, incluidas las claves foráneas opcionales.',
  aprende: APRENDE,
  observa: OBSERVA,
  practica: PRACTICA,
};
