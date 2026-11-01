import type { BloqueAprende, Leccion, PasoObservacion } from '@/tipos/leccion';
import type { SimboloChen } from '@/tipos/simbolosChen';
import { DIAGRAMAS_HOTEL_PATITAS } from './diagramaHotelPatitas';
import { DIAGRAMA_CLIENTE_MASCOTA } from './diagramaClienteMascota';
import { ATRIBUTOS_HOTEL_PATITAS } from './atributosHotelPatitas';
import { DIAGRAMA_IDENTIFICADORA } from './diagramaIdentificadora';
import { BLOQUES_INTRODUCCION_ER, PRACTICA_INTRODUCCION_ER } from './introduccionModeloER';

const SIMBOLOS_ENTIDADES: SimboloChen[] = [
  {
    id: 'entidad-fuerte',
    nombre: 'Entidad fuerte',
    figura: 'entidad-fuerte',
    significado: 'Existe por sí misma y tiene su propio identificador.',
    comoSeDibuja: ['Se dibuja con un rectángulo sencillo.', 'El nombre va en singular y con mayúscula inicial: Mascota, no mascotas.'],
    cuandoUsar: 'Para cualquier cosa de la que guardamos datos propios y que se puede distinguir sin depender de otra.',
    ejemplo: 'Cliente: existe aunque todavía no tenga mascotas registradas.',
  },
  {
    id: 'entidad-debil',
    nombre: 'Entidad débil',
    figura: 'entidad-debil',
    significado: 'Depende de otra entidad para identificarse. No tiene una clave propia completa.',
    comoSeDibuja: ['Se dibuja con un rectángulo doble.', 'Se une a su entidad propietaria con una relación identificadora.'],
    cuandoUsar: 'Cuando la entidad no tiene sentido sin otra. Si una entidad tiene su propia clave, no es débil.',
    ejemplo: 'Vacuna de una mascota: se identifica por un número dentro de la mascota a la que pertenece.',
  },
  {
    id: 'entidad-asociativa',
    nombre: 'Entidad asociativa',
    figura: 'entidad-asociativa',
    significado: 'Surge de una relación N:M y guarda datos propios de esa unión.',
    comoSeDibuja: ['Se dibuja como un rectángulo que contiene un rombo.'],
    cuandoUsar:
      'Cuando una relación N:M necesita guardar datos propios. Se distingue de la débil: la asociativa une dos entidades fuertes, mientras que la débil depende de una sola y tiene rectángulo doble.',
    ejemplo: 'Servicio contratado: asocia una Estancia con un Servicio y registra el precio_cobrado de esa contratación.',
    variante:
      "Algunas variantes de Chen la unen al rombo con línea discontinua. En Crow's Foot es una sola caja entre las dos entidades.",
  },
];

const SIMBOLOS_RELACIONES: SimboloChen[] = [
  {
    id: 'relacion',
    nombre: 'Relación',
    figura: 'relacion',
    significado: 'Asociación entre dos o más entidades.',
    comoSeDibuja: ['Se dibuja con un rombo.', 'Se nombra con un verbo: posee, tiene, contrata.'],
    cuandoUsar: 'Cada vez que dos entidades se asocian de forma que interesa registrar.',
    ejemplo: 'Cliente posee Mascota.',
  },
  {
    id: 'relacion-identificadora',
    nombre: 'Relación identificadora',
    figura: 'relacion-identificadora',
    significado: 'Une una entidad débil con la entidad fuerte de la que depende.',
    comoSeDibuja: ['Se dibuja con un rombo doble.', 'La entidad débil participa de forma total: se une con línea doble.'],
    cuandoUsar: 'Solo entre una entidad débil y su propietaria. Entre dos entidades fuertes se usa un rombo sencillo.',
    ejemplo: 'Vacuna pertenece a Mascota: sin mascota, la vacuna no tiene sentido.',
    variante:
      "En Crow's Foot la dependencia se muestra con una línea continua, y la relación no identificadora con una discontinua.",
  },
];

const SIMBOLOS_ATRIBUTOS: SimboloChen[] = [
  {
    id: 'atributo-simple',
    nombre: 'Atributo simple',
    figura: 'atributo-simple',
    significado: 'Dato indivisible que describe a una entidad o relación.',
    comoSeDibuja: ['Se dibuja con un óvalo sencillo.', 'Tiene un solo valor por ocurrencia.'],
    cuandoUsar: 'Para un dato que describe a la entidad y no se divide, repite ni calcula.',
    ejemplo: 'nombre de una Mascota.',
  },
  {
    id: 'atributo-clave',
    nombre: 'Atributo identificador (clave)',
    figura: 'atributo-clave',
    significado: 'Distingue de forma única cada ocurrencia de la entidad.',
    comoSeDibuja: ['Se dibuja con un óvalo y el nombre subrayado.', 'Cada entidad fuerte necesita al menos uno.'],
    cuandoUsar: 'Para el dato que distingue a cada ocurrencia, como un número de cliente.',
    ejemplo: 'id_mascota identifica a cada Mascota sin repetirse.',
    variante: 'En tablas y en otras notaciones la clave se marca con PK (clave primaria) en lugar de subrayado.',
  },
  {
    id: 'atributo-compuesto',
    nombre: 'Atributo compuesto',
    figura: 'atributo-compuesto',
    significado: 'Se puede dividir en partes con significado propio.',
    comoSeDibuja: ['El óvalo principal se conecta con líneas a un óvalo por cada componente.'],
    cuandoUsar: 'Cuando interesa guardar las partes por separado. Si solo importa el conjunto, basta con un atributo simple.',
    ejemplo: 'domicilio de un Cliente, formado por calle, número y colonia.',
  },
  {
    id: 'atributo-multivalor',
    nombre: 'Atributo multivalor',
    figura: 'atributo-multivalor',
    significado: 'Una misma ocurrencia puede tener varios valores para ese dato.',
    comoSeDibuja: ['Se dibuja con un óvalo doble.', 'Al pasar a tablas, cada valor va en un registro aparte.'],
    cuandoUsar: 'Cuando una misma ocurrencia puede tener cero, uno o varios valores para el mismo dato.',
    ejemplo: 'teléfono: un cliente puede registrar varios números.',
  },
  {
    id: 'atributo-derivado',
    nombre: 'Atributo derivado',
    figura: 'atributo-derivado',
    significado: 'Se calcula a partir de otros datos, así que no hace falta guardarlo.',
    comoSeDibuja: ['Se dibuja con un óvalo de línea discontinua.'],
    cuandoUsar: 'Cuando el valor puede calcularse con otro dato y guardarlo lo podría desactualizar.',
    ejemplo: 'edad, calculada a partir de fecha_nacimiento.',
    variante: 'En UML se marca con una barra (/) delante del nombre.',
  },
];

const SIMBOLOS_CONEXIONES: SimboloChen[] = [
  {
    id: 'linea-total',
    nombre: 'Participación total',
    figura: 'linea-total',
    significado: 'Todas las ocurrencias de la entidad deben participar en la relación.',
    comoSeDibuja: ['Se dibuja con línea doble entre la entidad y la relación.', 'Indica un mínimo de 1 en esa entidad.'],
    cuandoUsar: 'Cuando la regla de negocio obliga, por ejemplo "toda mascota pertenece a un cliente".',
    ejemplo: 'Toda Mascota pertenece a un Cliente.',
  },
  {
    id: 'linea-parcial',
    nombre: 'Participación parcial',
    figura: 'linea-parcial',
    significado: 'Algunas ocurrencias de la entidad pueden no participar en la relación.',
    comoSeDibuja: ['Se dibuja con línea simple.', 'Indica un mínimo de 0 en esa entidad.'],
    cuandoUsar: 'Cuando la regla permite que no exista la relación, por ejemplo un cliente que aún no tiene mascotas.',
    ejemplo: 'Un Cliente puede no tener mascotas todavía.',
  },
];

const SIMBOLOS_CARDINALIDADES: SimboloChen[] = [
  {
    id: 'cardinalidad-1-1',
    nombre: 'Cardinalidad 1:1',
    figura: 'cardinalidad-1-1',
    significado: 'Una ocurrencia de una entidad se relaciona con una sola de la otra.',
    comoSeDibuja: ['Se escribe un 1 junto a cada entidad.'],
    cuandoUsar: 'Es poco frecuente. Úsala cuando la regla limita a un solo registro por lado, como un pasaporte vigente por persona.',
    ejemplo: 'Una Persona posee como máximo un Pasaporte vigente del tipo considerado, y cada Pasaporte pertenece a una sola Persona.',
  },
  {
    id: 'cardinalidad-1-n',
    nombre: 'Cardinalidad 1:N',
    figura: 'cardinalidad-1-n',
    significado: 'Una ocurrencia de una entidad se relaciona con muchas de la otra.',
    comoSeDibuja: [
      'El 1 va junto a la entidad que aparece una sola vez por cada ocurrencia de la otra.',
      'La N va junto a la entidad que puede aparecer varias veces.',
    ],
    cuandoUsar: 'Es la más común: un cliente con muchas mascotas, una mascota con muchas estancias.',
    ejemplo: 'Un Cliente puede registrar varias Mascotas, y cada Mascota pertenece a un único Cliente.',
  },
  {
    id: 'cardinalidad-n-m',
    nombre: 'Cardinalidad N:M',
    figura: 'cardinalidad-n-m',
    significado: 'Muchas ocurrencias de una entidad se relacionan con muchas de la otra.',
    comoSeDibuja: ['Se escriben N y M junto a cada entidad.'],
    cuandoUsar: 'Cuando muchas ocurrencias de cada lado se relacionan. Al pasar a tablas necesita una tabla intermedia.',
    ejemplo: 'Una Estancia puede contratar varios Servicios, y un Servicio puede aparecer en varias Estancias.',
  },
];

const BLOQUES_SIMBOLOGIA: BloqueAprende[] = [
  {
    tipo: 'destacado',
    titulo: 'Cada concepto tiene su forma',
    texto:
      'En la notación de Chen, la forma de un símbolo indica qué es. Al leer un diagrama no hace falta leer cada palabra: el rectángulo es una entidad, el rombo una relación y el óvalo un dato. Aquí verás los símbolos de lo más básico a lo más específico.',
  },
  {
    tipo: 'simbolos',
    titulo: 'Tipos de entidades',
    descripcion: 'Fuerte, débil y asociativa. Cada una tiene su propio dibujo y una regla distinta.',
    simbolos: SIMBOLOS_ENTIDADES,
  },
  {
    tipo: 'comparativa-figuras',
    titulo: 'Entidad débil frente a entidad asociativa',
    elementos: [
      {
        titulo: 'Entidad débil',
        figura: 'entidad-debil',
        descripcion: 'Depende de otra entidad para identificarse. Se une a su propietaria con una relación identificadora.',
        ejemplo: 'Vacuna de una Mascota.',
      },
      {
        titulo: 'Entidad asociativa',
        figura: 'entidad-asociativa',
        descripcion: 'Nace de una relación N:M y permite que la asociación tenga datos propios.',
        ejemplo: 'Servicio contratado, con su precio_cobrado.',
      },
    ],
  },
  {
    tipo: 'simbolos',
    titulo: 'Tipos de relaciones',
    descripcion: 'La relación normal asocia entidades. La identificadora une una entidad débil con su propietaria.',
    simbolos: SIMBOLOS_RELACIONES,
  },
  {
    tipo: 'destacado',
    titulo: 'No confundir',
    texto:
      'El rombo doble es una relación identificadora. El rectángulo que contiene un rombo es una entidad asociativa. Son símbolos distintos con significados distintos.',
  },
  {
    tipo: 'ejemplo-diagrama',
    titulo: 'Ejemplo demostrativo: relación identificadora',
    descripcion: 'Una Vacuna (entidad débil) depende de la Mascota (entidad fuerte) a la que pertenece.',
    diagrama: DIAGRAMA_IDENTIFICADORA,
    pasos: [
      'Dibuja la entidad fuerte Mascota con un rectángulo sencillo.',
      'Dibuja la entidad débil Vacuna con un rectángulo doble.',
      'Une ambas con el rombo doble "tiene": es la relación identificadora.',
      'Marca la participación total de Vacuna con línea doble.',
    ],
    lectura:
      'Una vacuna no tiene un identificador completo por sí sola: se distingue por un número dentro de su mascota. Sin la relación identificadora no sabríamos a qué mascota pertenece cada vacuna.',
  },
  {
    tipo: 'simbolos',
    titulo: 'Tipos de atributos y su representación',
    descripcion: 'Cada tipo tiene su propio dibujo. Después podrás clasificar estos atributos de Hotel Patitas.',
    simbolos: SIMBOLOS_ATRIBUTOS,
  },
  {
    tipo: 'actividad-atributos',
    titulo: 'Actividad: clasifica los atributos',
    descripcion: 'Selecciona un atributo, elige su clasificación y observa cómo cambia su representación. Puedes corregirla cuantas veces quieras.',
    atributos: ATRIBUTOS_HOTEL_PATITAS,
  },
  {
    tipo: 'simbolos',
    titulo: 'Líneas de conexión y participación',
    descripcion:
      'Una línea une entidades con relaciones y atributos con el elemento al que pertenecen. Su trazo indica si la participación es obligatoria (doble) u opcional (simple).',
    simbolos: SIMBOLOS_CONEXIONES,
  },
  {
    tipo: 'comparativa-figuras',
    titulo: 'Participación total frente a parcial',
    elementos: [
      {
        titulo: 'Participación parcial',
        figura: 'participacion-parcial',
        descripcion: 'Algunas instancias de la entidad pueden no participar en la relación.',
        ejemplo: 'Un Cliente puede no tener Mascotas todavía.',
      },
      {
        titulo: 'Participación total',
        figura: 'participacion-total',
        descripcion: 'Todas las instancias de la entidad deben participar en la relación.',
        ejemplo: 'Toda Mascota pertenece a un Cliente.',
      },
    ],
  },
  {
    tipo: 'comparativa-figuras',
    titulo: 'Cardinalidad frente a participación',
    elementos: [
      {
        titulo: 'Cardinalidad',
        figura: 'cardinalidad-1-n',
        descripcion: 'Cuántas instancias pueden relacionarse. Responde a "¿cuántas?".',
        ejemplo: 'Un Cliente tiene muchas Mascotas, pero cada Mascota tiene un solo Cliente.',
      },
      {
        titulo: 'Participación',
        figura: 'participacion-total',
        descripcion: 'Si la participación es obligatoria u opcional. Responde a "¿es obligatorio?".',
        ejemplo: 'Toda Mascota debe tener un Cliente (línea doble).',
      },
    ],
  },
  {
    tipo: 'simbolos',
    titulo: 'Cardinalidades',
    descripcion:
      'La cardinalidad indica el máximo de ocurrencias que pueden relacionarse en cada extremo: 1, N o M. No dice por sí sola si la participación es obligatoria: eso lo muestra la línea doble o simple.',
    simbolos: SIMBOLOS_CARDINALIDADES,
  },
  {
    tipo: 'ejemplo-diagrama',
    titulo: 'Mini ejemplo: un diagrama completo',
    descripcion: 'Cliente tiene Mascota, con atributos y una cardinalidad 1:N.',
    diagrama: DIAGRAMA_CLIENTE_MASCOTA,
    pasos: [
      'Dibuja dos entidades fuertes: Cliente y Mascota.',
      'Une ambas con el rombo de la relación: tiene.',
      'Cuelga los atributos de cada entidad. El identificador va subrayado.',
      'Escribe la cardinalidad: 1 junto a Cliente y N junto a Mascota.',
    ],
    lectura: 'Un cliente puede tener muchas mascotas (N), y cada mascota pertenece a un solo cliente (1).',
  },
  {
    tipo: 'destacado',
    titulo: 'Recuerda',
    texto:
      'Al cambiar de herramienta o de notación, el dibujo puede cambiar, pero el concepto es el mismo: una entidad sigue siendo una entidad aunque se dibuje distinta.',
  },
];

const PASOS_CONSTRUCCION: PasoObservacion[] = [
  {
    titulo: 'Paso 1: las entidades',
    explicacion:
      'Empezamos por lo que el hotel quiere guardar: Cliente, Mascota y Estancia. Cada una es una entidad fuerte porque tiene datos propios.',
    visual: { tipo: 'diagrama', diagrama: DIAGRAMAS_HOTEL_PATITAS.entidades },
  },
  {
    titulo: 'Paso 2: las relaciones y sus cardinalidades',
    explicacion:
      'Los rombos conectan las entidades con un verbo. Un Cliente posee varias Mascotas (1 y N), y una Mascota tiene varias Estancias (1 y N).',
    visual: { tipo: 'diagrama', diagrama: DIAGRAMAS_HOTEL_PATITAS.relaciones },
  },
  {
    titulo: 'Paso 3: los atributos',
    explicacion:
      'Cada dato cuelga de la entidad a la que describe. El identificador se subraya; el teléfono, que puede tener varios valores, lleva óvalo doble.',
    visual: { tipo: 'diagrama', diagrama: DIAGRAMAS_HOTEL_PATITAS.atributos },
  },
  {
    titulo: 'Paso 4: la participación',
    explicacion:
      'La línea doble indica participación total: toda Mascota pertenece a un Cliente y toda Estancia tiene una Mascota. La línea simple indica que un Cliente puede no tener Mascotas todavía.',
    visual: { tipo: 'diagrama', diagrama: DIAGRAMAS_HOTEL_PATITAS.participacion },
  },
];

export const LECCION_SIMBOLOGIA_CHEN: Leccion = {
  id: 'm1-simbologia-chen',
  titulo: 'Simbología de la notación de Chen',
  objetivo:
    'Entender qué es el modelo entidad-relación, reconocer cada símbolo de la notación de Chen y construir un diagrama completo paso a paso.',
  aprende: [...BLOQUES_INTRODUCCION_ER, ...BLOQUES_SIMBOLOGIA],
  observa: PASOS_CONSTRUCCION,
  practica: [
    ...PRACTICA_INTRODUCCION_ER,
    {
      id: 's-debil',
      tipo: 'opcion-unica',
      enunciado: '¿Qué símbolo representa una entidad débil en la notación de Chen?',
      opciones: [
        { id: 'rectangulo', texto: 'Rectángulo sencillo' },
        { id: 'doble-rectangulo', texto: 'Rectángulo doble' },
        { id: 'rombo-doble', texto: 'Rombo doble' },
        { id: 'ovalo', texto: 'Óvalo con el nombre subrayado' },
      ],
      correcta: 'doble-rectangulo',
      explicacionesOpciones: {
        rectangulo: 'No: el rectángulo sencillo es una entidad fuerte, que existe por sí misma.',
        'doble-rectangulo': 'Correcto: el rectángulo doble indica que la entidad depende de otra.',
        'rombo-doble': 'No: el rombo doble es una relación identificadora, no una entidad.',
        ovalo: 'No: el óvalo representa un atributo, no una entidad.',
      },
      explicacion: 'La entidad débil usa un rectángulo doble y se conecta a su entidad fuerte con una relación identificadora.',
      pista: 'Piensa en las entidades que no tienen sentido sin otra entidad.',
    },
    {
      id: 's-total',
      tipo: 'opcion-unica',
      enunciado: 'Quieres indicar que toda Mascota debe pertenecer a un Cliente. ¿Qué símbolo usas en la línea entre Mascota y "posee"?',
      opciones: [
        { id: 'simple', texto: 'Línea simple' },
        { id: 'doble', texto: 'Línea doble' },
        { id: 'discontinua', texto: 'Línea discontinua' },
        { id: 'sin-linea', texto: 'No se dibuja línea' },
      ],
      correcta: 'doble',
      explicacionesOpciones: {
        simple: 'No: la línea simple indica participación parcial, es decir, que puede no participar.',
        doble: 'Correcto: la línea doble indica que todas las mascotas participan en la relación.',
        discontinua: 'No: la línea discontinua se usa en asociativas, no para indicar participación.',
        'sin-linea': 'No: la línea siempre está presente; lo que cambia es su tipo.',
      },
      explicacion: 'La línea doble expresa participación total: cada ocurrencia de la entidad debe estar en la relación.',
      pista: 'Pregúntate si toda mascota debe tener un cliente, o si puede existir una sin cliente.',
    },
    {
      id: 's-atributos',
      tipo: 'clasificacion',
      enunciado: 'Clasifica cada dato según el símbolo de atributo que le corresponde.',
      categorias: [
        { id: 'clave', texto: 'Clave (subrayado)' },
        { id: 'multivalor', texto: 'Multivalor (óvalo doble)' },
        { id: 'derivado', texto: 'Derivado (óvalo discontinuo)' },
        { id: 'compuesto', texto: 'Compuesto (con partes)' },
      ],
      elementos: [
        {
          id: 'id-cliente',
          texto: 'id_cliente',
          correcta: 'clave',
          explicacion: 'Identifica de forma única a cada cliente, así que se subraya.',
        },
        {
          id: 'telefonos',
          texto: 'Teléfonos de un cliente',
          correcta: 'multivalor',
          explicacion: 'Un cliente puede tener varios teléfonos: es multivalor.',
        },
        {
          id: 'edad',
          texto: 'Edad, calculada con la fecha de nacimiento',
          correcta: 'derivado',
          explicacion: 'Se calcula a partir de otro dato, así que se dibuja discontinuo.',
        },
        {
          id: 'direccion',
          texto: 'Dirección, con calle y ciudad',
          correcta: 'compuesto',
          explicacion: 'Se divide en partes con significado propio: es compuesto.',
        },
      ],
      explicacion:
        'Cada tipo de atributo tiene su propio dibujo: el subrayado identifica, el óvalo doble repite, el discontinuo calcula y las partes descomponen.',
      pista: 'Pregúntate si el dato identifica, se repite, se calcula o se divide.',
    },
    {
      id: 's-relacion-identificadora',
      tipo: 'seleccion-multiple',
      enunciado: 'Selecciona las afirmaciones correctas sobre la relación identificadora.',
      opciones: [
        { id: 'une-debil', texto: 'Une una entidad débil con la entidad fuerte de la que depende' },
        { id: 'rombo-doble', texto: 'Se dibuja con un rombo doble' },
        { id: 'fuertes', texto: 'Se usa siempre que dos entidades fuertes se relacionan' },
        { id: 'asociativa', texto: 'Es lo mismo que una entidad asociativa' },
      ],
      correctas: ['une-debil', 'rombo-doble'],
      explicacionesOpciones: {
        'une-debil': 'Correcto: es el vínculo que hace depender a la entidad débil de su propietaria.',
        'rombo-doble': 'Correcto: el rombo doble la distingue de una relación normal.',
        fuertes: 'No: entre entidades fuertes se usa una relación normal, con rombo sencillo.',
        asociativa: 'No: una asociativa es una entidad que nace de una relación N:M.',
      },
      explicacion: 'La relación identificadora es un rombo doble que une una entidad débil con su entidad fuerte.',
      pista: 'Piensa en qué entidad no puede existir sin otra.',
    },
    {
      id: 's-cardinalidad',
      tipo: 'opcion-unica',
      enunciado:
        'Un Cliente puede tener varias Mascotas, pero cada Mascota pertenece a un solo Cliente. ¿Qué cardinalidad describe la relación?',
      opciones: [
        { id: '1-1', texto: '1:1' },
        { id: '1-n', texto: '1:N' },
        { id: 'n-m', texto: 'N:M' },
        { id: '0-0', texto: '0:0' },
      ],
      correcta: '1-n',
      explicacionesOpciones: {
        '1-1': 'No: un cliente puede tener varias mascotas, así que no es uno a uno.',
        '1-n': 'Correcto: un cliente se relaciona con muchas mascotas, pero cada mascota con un solo cliente.',
        'n-m': 'No: cada mascota pertenece a un único cliente, así que no es muchos a muchos.',
        '0-0': 'No: 0:0 no es una cardinalidad válida en este contexto.',
      },
      explicacion: 'Cuando una entidad aparece muchas veces y la otra solo una vez, la relación es 1:N.',
      pista: 'Mira las palabras "varias" y "un solo". Indican cuántos participan en cada lado.',
    },
  ],
};
