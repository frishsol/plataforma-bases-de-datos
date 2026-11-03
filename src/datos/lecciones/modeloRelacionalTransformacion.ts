import { ArrowLeftRight, Database, ShieldCheck, Layers, KeyRound, Target } from 'lucide-react';
import type { BloqueAprende, Leccion, PasoObservacion } from '@/tipos/leccion';
import type { Pregunta } from '@/tipos/juego';
import {
  TABLA_CLIENTE,
  TABLA_ESTANCIA,
  TABLA_ESTANCIA_SERVICIO,
  TABLA_MASCOTA,
  TABLA_PASAPORTE_COMPLEMENTARIO,
  TABLA_PERSONA_COMPLEMENTARIO,
  TABLA_SERVICIO,
  TABLA_TELEFONO_CLIENTE,
} from '@/datos/lecciones/tablasRelacionales';

const APRENDE: BloqueAprende[] = [
  {
    tipo: 'tarjetas-intro',
    titulo: 'Entidades y atributos',
    tarjetas: [
      {
        icono: Layers,
        titulo: 'Entidad fuerte',
        texto: 'Cada entidad se convierte en una tabla y su identificador pasa a ser la clave primaria. Ejemplo: Servicio(id_servicio).',
      },
      {
        icono: Layers,
        titulo: 'Atributo compuesto',
        texto: 'Se separa en columnas, una por cada parte. Ejemplo: domicilio_calle, domicilio_numero y domicilio_colonia.',
      },
      {
        icono: Database,
        titulo: 'Atributo multivalor',
        texto: 'No cabe en una sola celda: se crea una tabla aparte con una fila por cada valor. Ejemplo: ClienteTelefono.',
      },
      {
        icono: Target,
        titulo: 'Atributo derivado',
        texto: 'No se guarda: se calcula cuando hace falta. Ejemplo: la edad se obtiene a partir de fecha_nacimiento.',
      },
    ],
  },
  {
    tipo: 'tarjetas-intro',
    titulo: 'Relaciones',
    tarjetas: [
      {
        icono: KeyRound,
        titulo: 'Uno a muchos (1:N)',
        texto: 'La clave primaria del lado 1 se copia como clave foránea en el lado N. Ejemplo: id_cliente en Mascota.',
      },
      {
        icono: ArrowLeftRight,
        titulo: 'Muchos a muchos (N:M)',
        texto: 'Se crea una tabla intermedia cuya clave primaria compuesta incluye las claves de ambos lados. Los atributos de la relación, como precio_cobrado, son columnas de esa tabla.',
      },
      {
        icono: ShieldCheck,
        titulo: 'Uno a uno (1:1)',
        texto: 'La clave foránea va en una de las dos tablas y se marca como única, para que cada registro se relacione con uno solo. Ejemplo complementario abajo.',
      },
    ],
  },
  {
    tipo: 'destacado',
    titulo: 'Ejemplo complementario 1:1 (fuera de Hotel Patitas)',
    texto:
      'Las reglas de Hotel Patitas no incluyen relaciones 1:1. Para ilustrarla usamos Persona y Pasaporte: cada persona tiene un solo pasaporte y cada pasaporte pertenece a una sola persona.',
  },
];

const OBSERVA: PasoObservacion[] = [
  {
    titulo: 'Paso 1: entidades fuertes',
    explicacion:
      'Cada entidad fuerte se convierte en una tabla. Servicio tiene identificador propio, así que su tabla usa id_servicio como clave primaria.',
    visual: { tipo: 'tablas', tablas: [TABLA_SERVICIO] },
  },
  {
    titulo: 'Paso 2: atributos compuestos y multivalores',
    explicacion:
      'El domicilio se separa en tres columnas. Los teléfonos, que pueden ser varios por cliente, se guardan en ClienteTelefono, con una fila por número.',
    visual: { tipo: 'tablas', tablas: [TABLA_CLIENTE, TABLA_TELEFONO_CLIENTE] },
  },
  {
    titulo: 'Paso 3: el atributo derivado no se almacena',
    explicacion: 'La edad no se guarda como columna: se calcula con fecha_nacimiento cuando se necesita.',
    visual: {
      tipo: 'resultado',
      grupos: [
        { tipo: 'atributo', elementos: ['edad: derivada de fecha_nacimiento'] },
        { tipo: 'entidad', elementos: ['Mascota conserva fecha_nacimiento'] },
        { tipo: 'relacion', elementos: ['La edad se calcula; no ocupa columna'] },
      ],
    },
  },
  {
    titulo: 'Paso 4: relación 1:N con clave foránea',
    explicacion:
      'Cliente 1:N Mascota: la clave primaria del lado 1 (id_cliente) se copia como clave foránea en Mascota, que es el lado N.',
    visual: { tipo: 'tablas', tablas: [TABLA_MASCOTA] },
  },
  {
    titulo: 'Paso 5: relación 1:N entre Mascota y Estancia',
    explicacion:
      'Una mascota puede tener varias estancias, pero cada estancia corresponde a una sola mascota. Por eso id_mascota se copia en Estancia.',
    visual: { tipo: 'tablas', tablas: [TABLA_ESTANCIA] },
  },
  {
    titulo: 'Paso 6: relación N:M con tabla intermedia',
    explicacion:
      'Una estancia incluye varios servicios y un servicio aparece en varias estancias. EstanciaServicio usa ambas claves como clave primaria compuesta y guarda precio_cobrado.',
    visual: { tipo: 'tablas', tablas: [TABLA_ESTANCIA_SERVICIO] },
  },
  {
    titulo: 'Paso 7: relación 1:1 (ejemplo complementario)',
    explicacion:
      'Cada persona tiene un solo pasaporte y cada pasaporte pertenece a una sola persona. La clave foránea id_persona va en Pasaporte, marcada como única. Este ejemplo no forma parte de Hotel Patitas.',
    visual: { tipo: 'tablas', tablas: [TABLA_PERSONA_COMPLEMENTARIO, TABLA_PASAPORTE_COMPLEMENTARIO] },
  },
  {
    titulo: 'Paso 8: esquema completo de Hotel Patitas',
    explicacion: 'Así queda el esquema relacional completo del caso, con cada clave identificada.',
    visual: {
      tipo: 'resultado',
      grupos: [
        {
          tipo: 'entidad',
          elementos: [
            'Cliente(id_cliente PK, nombre, domicilio_calle, domicilio_numero, domicilio_colonia)',
            'Servicio(id_servicio PK, nombre, precio)',
          ],
        },
        {
          tipo: 'atributo',
          elementos: [
            'Mascota(id_mascota PK, id_cliente FK, nombre, especie, fecha_nacimiento, peso)',
            'Estancia(id_estancia PK, id_mascota FK, fecha_entrada, fecha_salida, numero_espacio)',
          ],
        },
        {
          tipo: 'relacion',
          elementos: [
            'ClienteTelefono(id_cliente PK/FK, telefono PK)',
            'EstanciaServicio(id_estancia PK/FK, id_servicio PK/FK, precio_cobrado)',
          ],
        },
      ],
    },
  },
];

const PRACTICA: Pregunta[] = [
  {
    id: 'mr-fk',
    tipo: 'opcion-unica',
    enunciado: 'Cliente 1:N Mascota. ¿Dónde debe colocarse id_cliente como clave foránea?',
    opciones: [
      { id: 'cliente', texto: 'En Cliente' },
      { id: 'mascota', texto: 'En Mascota' },
      { id: 'servicio', texto: 'En Servicio' },
    ],
    correcta: 'mascota',
    explicacionesOpciones: {
      cliente: 'Cliente es el lado 1 de la asociación.',
      mascota: 'Correcto: la FK se coloca en el lado N.',
      servicio: 'Servicio no participa en esa asociación.',
    },
    explicacion: 'Una asociación 1:N se representa colocando la FK en la relación del lado muchos.',
    pista: '¿Cuál de las entidades puede aparecer muchas veces para un mismo Cliente?',
  },
  {
    id: 'mr-nm',
    tipo: 'opcion-unica',
    enunciado: 'Estancia N:M Servicio con precio_cobrado. ¿Qué esquema permite registrar cada combinación?',
    opciones: [
      { id: 'asociativa', texto: 'EstanciaServicio(id_estancia FK, id_servicio FK, precio_cobrado)' },
      { id: 'en-estancia', texto: 'Estancia(id_estancia, id_servicio, precio_cobrado) con un solo id_servicio' },
      { id: 'en-servicio', texto: 'Servicio(id_servicio, id_estancia, precio_cobrado) con un solo id_estancia' },
    ],
    correcta: 'asociativa',
    explicacionesOpciones: {
      asociativa: 'Correcto: una relación adicional representa las combinaciones N:M.',
      'en-estancia': 'Una sola FK no permite múltiples servicios por estancia.',
      'en-servicio': 'Una sola FK no permite múltiples estancias por servicio.',
    },
    explicacion: 'La relación adicional puede contener el atributo precio_cobrado.',
    pista: 'Una N:M necesita representar pares de identificadores.',
  },
  {
    id: 'mr-multivaluado',
    tipo: 'opcion-unica',
    enunciado: 'Un Cliente puede tener varios teléfonos. ¿Cómo se representa ese atributo multivaluado?',
    opciones: [
      { id: 'lista', texto: 'Varios teléfonos separados por comas en una celda' },
      { id: 'otra', texto: 'Una relación ClienteTelefono(id_cliente, telefono)' },
      { id: 'solo', texto: 'Guardar únicamente el primer teléfono' },
    ],
    correcta: 'otra',
    explicacionesOpciones: {
      lista: 'No conviene acumular múltiples valores en una columna.',
      otra: 'Correcto: una relación adicional permite cualquier cantidad de teléfonos.',
      solo: 'Se perderían los demás teléfonos.',
    },
    explicacion: 'El diseño relacional representa los atributos multivaluados mediante una relación adicional.',
    pista: 'Piensa en cómo almacenar varias ocurrencias sin listas dentro de una celda.',
  },
  {
    id: 'mt-clasifica-transformacion',
    tipo: 'clasificacion',
    enunciado: 'Clasifica cada elemento del diagrama E-R según cómo se transforma en el modelo relacional.',
    categorias: [
      { id: 'tabla', texto: 'Tabla propia' },
      { id: 'columna', texto: 'Columna en una tabla existente' },
      { id: 'intermedia', texto: 'Tabla intermedia' },
    ],
    elementos: [
      {
        id: 'servicio',
        texto: 'Entidad Servicio',
        correcta: 'tabla',
        explicacion: 'Una entidad fuerte se convierte en su propia tabla.',
      },
      {
        id: 'domicilio',
        texto: 'Atributo compuesto domicilio',
        correcta: 'columna',
        explicacion: 'Sus partes se guardan como columnas de la tabla Cliente.',
      },
      {
        id: 'telefono',
        texto: 'Atributo multivalor teléfono',
        correcta: 'tabla',
        explicacion: 'Un atributo multivalor necesita una tabla aparte: ClienteTelefono.',
      },
      {
        id: 'estancia-servicio',
        texto: 'Relación N:M entre Estancia y Servicio',
        correcta: 'intermedia',
        explicacion: 'Las relaciones N:M se representan con una tabla intermedia.',
      },
      {
        id: 'cliente-mascota',
        texto: 'Relación 1:N entre Cliente y Mascota',
        correcta: 'columna',
        explicacion: 'La clave foránea id_cliente se añade como columna en Mascota.',
      },
    ],
    explicacion: 'Cada elemento del E-R tiene una forma propia de convertirse en tabla o columna.',
    pista: 'Pregúntate si el elemento necesita una tabla propia, una columna o una tabla que una dos entidades.',
  },
  {
    id: 'mt-uno-a-uno',
    tipo: 'opcion-unica',
    enunciado: 'Ejemplo complementario: Persona 1:1 Pasaporte. ¿Dónde se coloca la clave foránea?',
    opciones: [
      { id: 'pasaporte-unica', texto: 'En Pasaporte, marcada como única' },
      { id: 'persona-lista', texto: 'En Persona, como lista de pasaportes' },
      { id: 'intermedia', texto: 'En una tabla intermedia obligatoria' },
      { id: 'ambas', texto: 'En ambas tablas' },
    ],
    correcta: 'pasaporte-unica',
    explicacionesOpciones: {
      'pasaporte-unica': 'Correcto: la FK en un lado, con restricción de unicidad, garantiza la relación uno a uno.',
      'persona-lista': 'Una lista de pasaportes en Persona no es un valor válido en una columna y contradice el 1:1.',
      intermedia: 'Una tabla intermedia se usa para N:M, no para 1:1.',
      ambas: 'Poner la FK en ambos lados duplica la información y no es necesario.',
    },
    explicacion: 'En una relación 1:1, la clave foránea va en una tabla y se marca como única.',
    pista: 'Piensa en cuántas filas de Pasaporte pueden apuntar a una misma persona.',
  },
  {
    id: 'mt-edad',
    tipo: 'opcion-unica',
    enunciado: 'La edad de una mascota cambia cada año. ¿Cómo debe tratarse?',
    opciones: [
      { id: 'columna', texto: 'Guardarla como columna' },
      { id: 'calcular', texto: 'Calcularla a partir de fecha_nacimiento' },
      { id: 'telefono', texto: 'Guardarla en ClienteTelefono' },
    ],
    correcta: 'calcular',
    explicacionesOpciones: {
      columna: 'Guardarla obligaría a actualizarla cada año y podría quedar desfasada.',
      calcular: 'Correcto: es un atributo derivado y se obtiene cuando hace falta.',
      telefono: 'ClienteTelefono guarda teléfonos, no datos de la mascota.',
    },
    explicacion: 'Los atributos derivados no se almacenan porque pueden calcularse a partir de otros datos.',
    pista: 'Un dato que se puede calcular con otro atributo no necesita columna propia.',
  },
];

export const LECCION_RELACIONAL_TRANSFORMACION: Leccion = {
  id: 'm1-t3-3-transformacion-relacional',
  titulo: 'Transformación del E-R al relacional',
  objetivo:
    'Transforma entidades, atributos compuestos, multivalores y derivados, y relaciones 1:N, N:M y 1:1, en tablas y claves foráneas.',
  aprende: APRENDE,
  observa: OBSERVA,
  practica: PRACTICA,
};
