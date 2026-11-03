import { BookOpen, History, KeyRound, Table2 } from 'lucide-react';
import type { BloqueAprende, Leccion, PasoObservacion } from '@/tipos/leccion';

// Esta lección solo utiliza variantes de BloqueAprende, VisualPaso y Pregunta
// que ya existen en DataModelLab. No cambia el evaluador ni el progreso.
const APRENDE: BloqueAprende[] = [
  {
    tipo: 'tarjetas-intro',
    titulo: '¿Qué es el modelo relacional?',
    tarjetas: [
      { icono: BookOpen, titulo: 'La idea fundamental', texto: 'Organiza la información mediante relaciones: conjuntos de tuplas descritas por atributos y sus dominios.' },
      { icono: History, titulo: 'Edgar F. Codd, 1970', texto: 'Codd propuso el modelo relacional en su artículo A Relational Model of Data for Large Shared Data Banks. Su trabajo impulsó una forma de describir los datos independiente de su almacenamiento físico.' },
      { icono: Table2, titulo: 'Relación y tabla', texto: 'Una tabla es la representación habitual de una relación. No son equivalentes exactos: SQL admite comportamientos como duplicados y valores NULL que requieren matices frente al modelo formal.' },
      { icono: KeyRound, titulo: 'Identificación y vínculos', texto: 'Las claves permiten identificar tuplas y establecer referencias entre relaciones, preservando reglas de integridad.' },
    ],
  },
  {
    tipo: 'destacado',
    titulo: 'Antes de comenzar: dos usos de la palabra cardinalidad',
    texto: 'En una relación del modelo relacional, cardinalidad significa cantidad de tuplas. En el diagrama E-R, 1:1, 1:N y N:M describen cuántas ocurrencias participan en una asociación. No son la misma idea.',
  },
  {
    tipo: 'senales',
    titulo: 'Vocabulario del modelo relacional',
    senales: [
      { senal: 'Relación', indica: 'Conjunto de tuplas que obedecen un esquema', ejemplo: 'Mascota' },
      { senal: 'Tupla', indica: 'Combinación de valores, uno por atributo', ejemplo: '(1, 10, Luna, Gato, ...)' },
      { senal: 'Atributo', indica: 'Propiedad identificada por un nombre', ejemplo: 'especie' },
      { senal: 'Dominio', indica: 'Conjunto de valores permitidos', ejemplo: 'especie: {Perro, Gato}' },
      { senal: 'Esquema', indica: 'Definición de relación y atributos (con sus dominios)', ejemplo: 'Mascota(id_mascota, id_cliente, nombre, especie, fecha_nacimiento, peso)' },
      { senal: 'Instancia', indica: 'Tuplas presentes en un instante concreto', ejemplo: 'Las cuatro mascotas registradas hoy' },
      { senal: 'Grado', indica: 'Cantidad de atributos', ejemplo: 'Mascota tiene seis atributos' },
      { senal: 'Cardinalidad', indica: 'Cantidad de tuplas', ejemplo: 'Cuatro mascotas: cardinalidad 4' },
    ],
  },
  {
    tipo: 'tarjetas-intro',
    titulo: 'Claves que necesitas reconocer',
    tarjetas: [
      { icono: KeyRound, titulo: 'Superclave y candidata', texto: 'Una superclave identifica tuplas de manera única; una clave candidata es una superclave mínima, sin atributos sobrantes.' },
      { icono: KeyRound, titulo: 'Primaria y alternativa', texto: 'La clave primaria es la candidata elegida para identificar cada tupla. Las demás candidatas son alternativas.' },
      { icono: KeyRound, titulo: 'Foránea', texto: 'Un atributo o conjunto de atributos que referencia una clave válida de otra relación. Sus valores no tienen por qué ser únicos.' },
      { icono: KeyRound, titulo: 'Compuesta', texto: 'Una clave formada por más de un atributo. Por ejemplo, (id_estancia, id_servicio) cuando un servicio se registra como máximo una vez por estancia.' },
    ],
  },
  {
    tipo: 'destacado',
    titulo: 'Relación formal frente a tabla SQL',
    texto: 'En el modelo formal las tuplas no se repiten y su orden no tiene significado. SQL puede admitir filas duplicadas y usa NULL para representar información ausente o desconocida; solo ORDER BY garantiza el orden solicitado en un resultado.',
  },
  {
    tipo: 'comparativa-tablas',
    titulo: 'Modelo lógico y modelo físico: no son lo mismo',
    texto: 'El esquema lógico expresa relaciones, atributos y claves; el físico concreta tipos, precisión y restricciones para un SGBD como MySQL.',
    logica: {
      nombre: 'Lógico: Mascota',
      columnas: ['id_mascota (PK)', 'id_cliente (FK)', 'nombre', 'especie'],
      filas: [['1', '10', 'Luna', 'Gato'], ['2', '10', 'Max', 'Perro']],
    },
    fisica: {
      nombre: 'Físico: Mascota en MySQL (ejemplo)',
      columnas: ['id_mascota INT PK', 'id_cliente INT FK', 'nombre VARCHAR(80)', 'especie VARCHAR(10)'],
      filas: [['1', '10', 'Luna', 'Gato'], ['2', '10', 'Max', 'Perro']],
    },
    diferencias: [
      'El modelo conceptual expresa entidades, atributos y asociaciones sin decidir una implementación particular.',
      'El modelo lógico relacional organiza relaciones, atributos, claves y referencias sin exigir tipos específicos de MySQL.',
      'El modelo físico especifica tipos de datos, tamaños, índices y demás detalles de implementación.',
    ],
  },
];

// Observa reutiliza el componente de pasos existente: no es todavía la
// tabla interactiva solicitada; esa mejora se incorporará por separado.
const OBSERVA: PasoObservacion[] = [
  {
    titulo: 'Paso 1: identificar las entidades de Hotel Patitas',
    explicacion: 'Del modelo conceptual obtenemos Cliente, Mascota, Estancia y Servicio. Cada una tendrá una relación con atributos propios.',
    visual: { tipo: 'resultado', grupos: [
      { tipo: 'entidad', elementos: ['Cliente', 'Mascota', 'Estancia', 'Servicio'] },
      { tipo: 'atributo', elementos: ['Cliente: id_cliente, nombre', 'Mascota: id_mascota, nombre, especie, fecha_nacimiento, peso'] },
      { tipo: 'relacion', elementos: ['Cliente 1:N Mascota', 'Mascota 1:N Estancia', 'Estancia N:M Servicio'] },
    ] },
  },
  {
    titulo: 'Paso 2: convertir entidades y atributos',
    explicacion: 'Las entidades fuertes dan lugar a relaciones; sus identificadores pasan a ser claves primarias. Los atributos simples se incorporan al esquema.',
    visual: { tipo: 'resultado', grupos: [
      { tipo: 'entidad', elementos: ['Cliente(id_cliente PK, nombre)', 'Mascota(id_mascota PK, nombre, especie, fecha_nacimiento, peso)'] },
      { tipo: 'atributo', elementos: ['Estancia(id_estancia PK, fecha_entrada, fecha_salida)', 'Servicio(id_servicio PK, nombre, precio)'] },
      { tipo: 'relacion', elementos: ['Aún falta representar las asociaciones con claves foráneas.'] },
    ] },
  },
  {
    titulo: 'Paso 3: representar Cliente 1:N Mascota',
    explicacion: 'La clave id_cliente de Cliente se incorpora como clave foránea en Mascota, el lado N. No se guardan listas de mascotas en una columna de Cliente.',
    visual: { tipo: 'resultado', grupos: [
      { tipo: 'entidad', elementos: ['Cliente(id_cliente PK, nombre)'] },
      { tipo: 'relacion', elementos: ['1 Cliente → muchas Mascotas'] },
      { tipo: 'atributo', elementos: ['Mascota(id_mascota PK, id_cliente FK, nombre, especie, fecha_nacimiento, peso)'] },
    ] },
  },
  {
    titulo: 'Paso 4: representar Mascota 1:N Estancia',
    explicacion: 'Una mascota puede tener varias estancias. Por ello, id_mascota se incorpora como clave foránea en Estancia.',
    visual: { tipo: 'resultado', grupos: [
      { tipo: 'entidad', elementos: ['Mascota(id_mascota PK, id_cliente FK, ...)'] },
      { tipo: 'relacion', elementos: ['1 Mascota → muchas Estancias'] },
      { tipo: 'atributo', elementos: ['Estancia(id_estancia PK, id_mascota FK, fecha_entrada, fecha_salida)'] },
    ] },
  },
  {
    titulo: 'Paso 5: representar Estancia N:M Servicio',
    explicacion: 'Creamos la relación adicional EstanciaServicio. Sus dos claves foráneas pueden formar una clave primaria compuesta si cada servicio solo se registra una vez por estancia. precio_cobrado corresponde a cada contratación.',
    visual: { tipo: 'resultado', grupos: [
      { tipo: 'entidad', elementos: ['Estancia(id_estancia PK, id_mascota FK, ...)', 'Servicio(id_servicio PK, nombre, precio)'] },
      { tipo: 'relacion', elementos: ['Estancia N:M Servicio'] },
      { tipo: 'atributo', elementos: ['EstanciaServicio(id_estancia PK/FK, id_servicio PK/FK, precio_cobrado)'] },
    ] },
  },
  {
    titulo: 'Paso 6: tratar atributos especiales',
    explicacion: 'Un domicilio compuesto puede separarse en calle, número y colonia; los teléfonos multivaluados requieren otra relación; edad suele calcularse desde fecha_nacimiento y no almacenarse.',
    visual: { tipo: 'resultado', grupos: [
      { tipo: 'entidad', elementos: ['Cliente(id_cliente PK, nombre, domicilio_calle, domicilio_numero, domicilio_colonia)'] },
      { tipo: 'atributo', elementos: ['ClienteTelefono(id_cliente PK/FK, telefono PK)', 'Mascota(..., fecha_nacimiento, ...)'] },
      { tipo: 'relacion', elementos: ['La edad es derivada; no hace falta almacenarla como columna.'] },
    ] },
  },
];

export const LECCION_MODELO_RELACIONAL: Leccion = {
  id: 'm1-l3-modelo-relacional',
  titulo: 'Modelo relacional (lógico)',
  objetivo: 'Identifica relaciones, tuplas, atributos, dominios y claves, y transforma asociaciones del modelo E-R en esquemas relacionales mediante el caso Hotel Patitas.',
  aprende: APRENDE,
  observa: OBSERVA,
  practica: [
    {
      id: 'mr-grado', tipo: 'opcion-unica',
      enunciado: 'Si Mascota tiene seis atributos, ¿cuál es su grado?',
      opciones: [{ id: '4', texto: '4' }, { id: '6', texto: '6' }, { id: 'n', texto: 'Depende de cuántas mascotas existan' }],
      correcta: '6',
      explicacionesOpciones: { '4': 'Ese valor no cuenta todos los atributos.', '6': 'Correcto: grado es el número de atributos.', n: 'El número de tuplas determina la cardinalidad, no el grado.' },
      explicacion: 'Grado y cardinalidad son propiedades distintas de una relación.',
      pista: 'Cuenta las columnas, no las filas.',
    },
    {
      id: 'mr-tupla', tipo: 'opcion-unica',
      enunciado: '¿Qué representa una tupla en Mascota?',
      opciones: [{ id: 'fila', texto: 'Una combinación de valores para todos los atributos de una mascota' }, { id: 'columna', texto: 'Una columna como especie' }, { id: 'dominio', texto: 'El conjunto de valores permitidos para especie' }],
      correcta: 'fila',
      explicacionesOpciones: { fila: 'Correcto: la tupla contiene un valor por atributo.', columna: 'Una columna representa un atributo.', dominio: 'Un dominio especifica valores permitidos.' },
      explicacion: 'La representación habitual de una tupla es una fila.',
      pista: 'Piensa en el registro completo de Luna.',
    },
    {
      id: 'mr-cardinalidad', tipo: 'opcion-unica',
      enunciado: 'Si la relación Mascota contiene cuatro tuplas, su cardinalidad es...',
      opciones: [{ id: 'cuatro', texto: '4' }, { id: 'seis', texto: '6' }, { id: 'uno-a-n', texto: '1:N' }],
      correcta: 'cuatro',
      explicacionesOpciones: { cuatro: 'Correcto: la cardinalidad formal cuenta tuplas.', seis: 'Seis podría corresponder al grado.', 'uno-a-n': '1:N expresa una cardinalidad de asociación E-R.' },
      explicacion: 'La cardinalidad de una relación cuenta sus tuplas.',
      pista: 'En este contexto se cuentan filas.',
    },
    {
      id: 'mr-fk', tipo: 'opcion-unica',
      enunciado: 'Cliente 1:N Mascota. ¿Dónde debe colocarse id_cliente como clave foránea?',
      opciones: [{ id: 'cliente', texto: 'En Cliente' }, { id: 'mascota', texto: 'En Mascota' }, { id: 'servicio', texto: 'En Servicio' }],
      correcta: 'mascota',
      explicacionesOpciones: { cliente: 'Cliente es el lado 1 de la asociación.', mascota: 'Correcto: la FK se coloca en el lado N.', servicio: 'Servicio no participa en esa asociación.' },
      explicacion: 'Una asociación 1:N se representa colocando la FK en la relación del lado muchos.',
      pista: '¿Cuál de las entidades puede aparecer muchas veces para un mismo Cliente?',
    },
    {
      id: 'mr-nm', tipo: 'opcion-unica',
      enunciado: 'Estancia N:M Servicio con precio_cobrado. ¿Qué esquema permite registrar cada combinación?',
      opciones: [
        { id: 'asociativa', texto: 'EstanciaServicio(id_estancia FK, id_servicio FK, precio_cobrado)' },
        { id: 'en-estancia', texto: 'Estancia(id_estancia, id_servicio, precio_cobrado) con un solo id_servicio' },
        { id: 'en-servicio', texto: 'Servicio(id_servicio, id_estancia, precio_cobrado) con un solo id_estancia' },
      ],
      correcta: 'asociativa',
      explicacionesOpciones: { asociativa: 'Correcto: una relación adicional representa las combinaciones N:M.', 'en-estancia': 'Una sola FK no permite múltiples servicios por estancia.', 'en-servicio': 'Una sola FK no permite múltiples estancias por servicio.' },
      explicacion: 'La relación adicional puede contener el atributo precio_cobrado.',
      pista: 'Una N:M necesita representar pares de identificadores.',
    },
    {
      id: 'mr-multivaluado', tipo: 'opcion-unica',
      enunciado: 'Un Cliente puede tener varios teléfonos. ¿Cómo se representa ese atributo multivaluado?',
      opciones: [{ id: 'lista', texto: 'Varios teléfonos separados por comas en una celda' }, { id: 'otra', texto: 'Una relación ClienteTelefono(id_cliente, telefono)' }, { id: 'solo', texto: 'Guardar únicamente el primer teléfono' }],
      correcta: 'otra',
      explicacionesOpciones: { lista: 'No conviene acumular múltiples valores en una columna.', otra: 'Correcto: una relación adicional permite cualquier cantidad de teléfonos.', solo: 'Se perderían los demás teléfonos.' },
      explicacion: 'El diseño relacional representa los atributos multivaluados mediante una relación adicional.',
      pista: 'Piensa en cómo almacenar varias ocurrencias sin listas dentro de una celda.',
    },
  ],
};
