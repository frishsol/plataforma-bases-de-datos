import { Table2 } from 'lucide-react';
import type { Desafio, Pregunta } from '@/tipos/juego';

const clavePrimariaCliente: Pregunta = {
  id: 'd3-pk-cliente',
  tipo: 'opcion-unica',
  enunciado: '¿Cuál es la clave primaria más adecuada para la tabla Cliente?',
  opciones: [
    { id: 'nombre', texto: 'nombre' },
    { id: 'telefono', texto: 'telefono' },
    { id: 'id-cliente', texto: 'id_cliente' },
    { id: 'domicilio', texto: 'domicilio' },
  ],
  correcta: 'id-cliente',
  explicacionesOpciones: {
    nombre: 'No: dos clientes pueden llamarse igual, así que no identifica una fila de forma única.',
    telefono: 'No: un cliente puede tener varios teléfonos y estos pueden cambiar.',
    'id-cliente': 'Correcto: es un identificador único que no cambia y no depende de otros datos.',
    domicilio: 'No: es compuesto, puede cambiar y varios clientes podrían vivir en el mismo lugar.',
  },
  explicacion:
    'La clave primaria identifica cada fila de forma única y estable. Por eso se usa un identificador como id_cliente.',
};

const claveForaneaMascota: Pregunta = {
  id: 'd3-fk-mascota',
  tipo: 'opcion-unica',
  enunciado:
    'En la relación 1:N entre Cliente y Mascota (un cliente tiene muchas mascotas), ¿dónde va la clave foránea?',
  opciones: [
    { id: 'en-cliente', texto: 'En Cliente, como id_mascota' },
    { id: 'en-mascota', texto: 'En Mascota, como id_cliente' },
    { id: 'ambas', texto: 'En ambas tablas' },
    { id: 'intermedia', texto: 'En una tabla intermedia' },
  ],
  correcta: 'en-mascota',
  explicacionesOpciones: {
    'en-cliente': 'No: un cliente tendría que guardar muchos id_mascota, y eso rompe las reglas de una tabla.',
    'en-mascota': 'Correcto: cada mascota guarda el id del único cliente al que pertenece.',
    ambas: 'No: con una sola clave foránea del lado de muchos basta para representar la relación.',
    intermedia: 'No: una relación 1:N no necesita tabla intermedia; solo la necesitan las N:M.',
  },
  explicacion:
    'En una relación 1:N, la clave foránea siempre va en el lado de muchos y apunta al lado de uno.',
};

const tablaEstancia: Pregunta = {
  id: 'd3-tabla-estancia',
  tipo: 'opcion-unica',
  enunciado: '¿Cuál es la forma correcta de la tabla Estancia en el modelo relacional?',
  opciones: [
    {
      id: 'con-id-mascota',
      texto: 'Estancia(id_estancia PK, fecha_entrada, fecha_salida, numero_espacio, id_mascota FK)',
    },
    {
      id: 'con-id-cliente',
      texto: 'Estancia(id_estancia PK, fecha_entrada, fecha_salida, numero_espacio, id_cliente FK)',
    },
    {
      id: 'pk-mascota',
      texto: 'Estancia(id_mascota PK, fecha_entrada, fecha_salida, numero_espacio)',
    },
    {
      id: 'con-nombre',
      texto: 'Estancia(id_estancia PK, fecha_entrada, fecha_salida, numero_espacio, nombre_mascota)',
    },
  ],
  correcta: 'con-id-mascota',
  explicacionesOpciones: {
    'con-id-mascota': 'Correcto: cada estancia tiene su propia clave y apunta a la mascota a la que pertenece.',
    'con-id-cliente': 'No: la estancia pertenece a una mascota. Llegar al cliente pasa por la mascota.',
    'pk-mascota': 'No: una mascota tiene varias estancias, así que id_mascota no puede ser clave primaria aquí.',
    'con-nombre': 'No: los nombres se repiten y no identifican la mascota; hay que usar su id.',
  },
  explicacion:
    'Cada entidad se convierte en una tabla con su clave primaria. La clave foránea de la relación 1:N va en el lado de muchos.',
};

const transformarNM: Pregunta = {
  id: 'd3-transformar-nm',
  tipo: 'opcion-unica',
  enunciado: '¿Cómo se transforma la relación N:M entre Estancia y Servicio?',
  opciones: [
    {
      id: 'intermedia',
      texto: 'Creando una tabla intermedia EstanciaServicio con las claves de ambas tablas y el precio cobrado',
    },
    { id: 'fk-estancia', texto: 'Agregando id_servicio como clave foránea dentro de Estancia' },
    { id: 'lista', texto: 'Guardando una lista de servicios dentro de la tabla Estancia' },
    { id: 'fk-servicio', texto: 'Agregando id_estancia como clave foránea dentro de Servicio' },
  ],
  correcta: 'intermedia',
  explicacionesOpciones: {
    intermedia: 'Correcto: la tabla intermedia guarda cada pareja estancia-servicio, junto con su precio cobrado.',
    'fk-estancia': 'No: así cada estancia solo podría tener un servicio.',
    lista: 'No: guardar varios valores en una celda rompe la primera forma normal, que veremos en el Desafío 4.',
    'fk-servicio': 'No: así cada servicio solo podría pertenecer a una estancia.',
  },
  explicacion:
    'Una relación N:M no se puede representar con una sola clave foránea. Se resuelve con una tabla intermedia que tiene dos claves foráneas.',
};

const contenidoIntermedia: Pregunta = {
  id: 'd3-contenido-intermedia',
  tipo: 'seleccion-multiple',
  enunciado: 'Selecciona todo lo que debe tener la tabla intermedia EstanciaServicio.',
  opciones: [
    { id: 'pk-compuesta', texto: 'Clave primaria compuesta por id_estancia e id_servicio' },
    { id: 'fk-estancia', texto: 'Clave foránea id_estancia que apunta a Estancia' },
    { id: 'fk-servicio', texto: 'Clave foránea id_servicio que apunta a Servicio' },
    { id: 'precio', texto: 'Atributo precio_cobrado' },
    { id: 'pk-solo-servicio', texto: 'Clave primaria formada solo por id_servicio' },
    { id: 'nombre-servicio', texto: 'Atributo nombre_servicio' },
  ],
  correctas: ['pk-compuesta', 'fk-estancia', 'fk-servicio', 'precio'],
  explicacionesOpciones: {
    'pk-compuesta': 'Correcto: cada pareja estancia-servicio aparece una sola vez.',
    'fk-estancia': 'Correcto: enlaza la tabla con Estancia.',
    'fk-servicio': 'Correcto: enlaza la tabla con Servicio.',
    precio: 'Correcto: el precio cobrado pertenece a cada pareja estancia-servicio.',
    'pk-solo-servicio': 'No: un mismo servicio aparece en muchas estancias, así que no puede identificar una fila.',
    'nombre-servicio': 'No: el nombre ya está en la tabla Servicio; aquí solo se usa su clave.',
  },
  explicacion:
    'La tabla intermedia es el puente de la N:M. Su clave primaria combina las dos claves foráneas y añade los datos propios de la relación.',
};

export const DESAFIO_3: Desafio = {
  id: 3,
  titulo: 'Modelo relacional',
  subtitulo: 'Convierte el diagrama en tablas con claves',
  icono: Table2,
  instrucciones:
    'Cada entidad se convierte en una tabla. La clave primaria (PK) identifica cada fila y la clave foránea (FK) conecta tablas. Las relaciones N:M necesitan una tabla intermedia.',
  preguntas: [clavePrimariaCliente, claveForaneaMascota, tablaEstancia, transformarNM, contenidoIntermedia],
};
